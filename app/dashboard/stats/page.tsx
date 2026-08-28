"use client";

import {
  BookOpen,
  BookCheck,
  Clock,
  TrendingUp,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { fakeStatsOverview, fakeStatsProgress } from "@/lib/fake-data";
import { ApiDocsCard } from "@/components/api-docs-card";
import { PageHeader } from "@/components/shared/page-header";

const COLORS = ["#3f6942", "#7fa171", "#c7d9ba", "#b7905b"];

export default function StatsPage() {
  const overview = fakeStatsOverview;
  const progress = fakeStatsProgress;

  const pieData = [
    { name: "Terminés", value: overview.booksFinished },
    { name: "En cours", value: overview.booksInProgress },
    { name: "À lire", value: overview.booksToRead },
  ].filter((d) => d.value > 0);

  const chartData = progress.map((p) => ({
    date: new Date(p.date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    }),
    pages: p.pagesRead,
  }));

  const statCards = [
    {
      label: "Total Livres",
      value: overview.totalBooks,
      icon: BookOpen,
      color: "from-info/15 to-info/5",
      iconColor: "text-info",
    },
    {
      label: "Terminés",
      value: overview.booksFinished,
      icon: BookCheck,
      color: "from-success/15 to-success/5",
      iconColor: "text-success",
    },
    {
      label: "En cours",
      value: overview.booksInProgress,
      icon: Clock,
      color: "from-primary/15 to-primary/5",
      iconColor: "text-primary",
    },
    {
      label: "Pages lues",
      value: overview.totalPagesRead.toLocaleString(),
      icon: TrendingUp,
      color: "from-warning/15 to-warning/5",
      iconColor: "text-warning",
    },
    {
      label: "À lire",
      value: overview.booksToRead,
      icon: BookOpen,
      color: "from-accent/15 to-accent/5",
      iconColor: "text-accent",
    },
    {
      label: "Sessions totales",
      value: overview.totalSessions,
      icon: Calendar,
      color: "from-danger/15 to-danger/5",
      iconColor: "text-danger",
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Votre rythme" title="Statistiques de lecture" description="Observez votre progression sans perdre de vue le plaisir de lire." />

      {/* Overview cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="glass-strong rounded-2xl p-4 sm:p-5 card-hover">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-2`}>
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <p className="text-2xl font-bold text-text-primary">{card.value}</p>
            <p className="text-sm text-text-secondary">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Progress over time */}
        <div className="glass-strong rounded-2xl p-6">
          <h2 className="text-lg font-bold text-text-primary mb-4">
            Pages lues dans le temps
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPages" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3f6942" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#3f6942" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(63,105,66,0.12)" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#849080" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#849080" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid rgba(63,105,66,0.16)",
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(42,57,40,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="pages"
                  stroke="#3f6942"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPages)"
                  name="Pages lues"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution pie */}
        <div className="glass-strong rounded-2xl p-6">
          <h2 className="text-lg font-bold text-text-primary mb-4">
            Répartition des livres
          </h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid rgba(63,105,66,0.16)",
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(42,57,40,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {pieData.map((entry, i) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <span className="text-sm text-text-secondary">
                  {entry.name} ({entry.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* API Documentation */}
      <ApiDocsCard
        title="Endpoints API utilisés"
        subtitle="Requêtes effectuées depuis cette page"
        endpoints={[
          {
            method: "GET",
            path: "/stats/overview",
            description: "Vue d'ensemble des stats",
            when: "Au chargement de la page pour afficher les 6 cartes statistiques",
            response: JSON.stringify({ success: true, message: "Request completed successfully", data: { totalBooks: 12, booksFinished: 5, booksInProgress: 3, booksToRead: 4, totalPagesRead: 1250, totalSessions: 45 } }, null, 2),
          },
          {
            method: "GET",
            path: "/stats/progress",
            description: "Progression dans le temps",
            when: "Au chargement pour alimenter le graphique AreaChart (pages lues par jour)",
            response: JSON.stringify({ success: true, message: "Request completed successfully", data: [{ date: "2026-08-20T00:00:00.000Z", pagesRead: 45 }, { date: "2026-08-21T00:00:00.000Z", pagesRead: 32 }, { date: "2026-08-22T00:00:00.000Z", pagesRead: 58 }] }, null, 2),
          },
        ]}
      />
    </div>
  );
}

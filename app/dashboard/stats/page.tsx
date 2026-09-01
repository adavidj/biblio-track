"use client";

import { BookCheck, BookOpen, Clock3, Heart, Library, TrendingUp } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/shared/page-header";
import { useBookStore } from "@/lib/book-store";

const COLORS = ["#4c754a", "#91ad65", "#d7c27f"];
const tooltipStyle = { background: "#fffef9", border: "1px solid #dce4d7", borderRadius: 12, boxShadow: "0 8px 20px rgba(42,57,40,0.1)" };

export default function StatsPage() {
  const books = useBookStore((state) => state.books);
  const finished = books.filter((book) => book.status === "FINISHED");
  const inProgress = books.filter((book) => book.status === "IN_PROGRESS");
  const toRead = books.filter((book) => book.status === "TO_READ");
  const sessions = books.flatMap((book) => book.sessions);
  const totalPagesRead = books.reduce((total, book) => total + book.lastReadPage, 0);
  const favorites = books.filter((book) => book.isFavorite).length;
  const progressData = getProgressData(sessions);
  const distribution = [{ name: "Terminés", value: finished.length }, { name: "En cours", value: inProgress.length }, { name: "À lire", value: toRead.length }].filter((item) => item.value > 0);
  const statusData = [{ name: "À lire", total: toRead.length, fill: "#d7c27f" }, { name: "En cours", total: inProgress.length, fill: "#91ad65" }, { name: "Terminés", total: finished.length, fill: "#4c754a" }];
  const cards = [
    { label: "Livres", value: books.length, detail: "dans la bibliothèque", icon: Library, tone: "bg-[#eaf2e6] text-[#4d744b]" },
    { label: "En cours", value: inProgress.length, detail: "lectures actives", icon: BookOpen, tone: "bg-[#edf0e5] text-[#71804f]" },
    { label: "Terminés", value: finished.length, detail: "livres refermés", icon: BookCheck, tone: "bg-[#f5ece1] text-[#9c7144]" },
    { label: "Pages lues", value: totalPagesRead.toLocaleString(), detail: "progression cumulée", icon: TrendingUp, tone: "bg-[#e8f0ed] text-[#4c7868]" },
    { label: "Sessions", value: sessions.length, detail: "moments enregistrés", icon: Clock3, tone: "bg-[#eef0f6] text-[#5f6f93]" },
    { label: "Favoris", value: favorites, detail: "à recommander", icon: Heart, tone: "bg-[#fff0ed] text-[#b45e53]" },
  ];

  return <div className="space-y-8">
    <PageHeader eyebrow="Votre parcours" title="Statistiques" description="Des repères concrets pour suivre votre rythme et faire vivre votre bibliothèque." />
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">{cards.map(({ detail, icon: Icon, label, tone, value }) => <article className="min-w-0 rounded-2xl border border-[#dfe5da] bg-[#fffef9] p-4 shadow-[0_8px_22px_rgba(42,57,40,0.04)]" key={label}><div className="flex items-start justify-between gap-3"><span className={`grid size-10 place-items-center rounded-xl ${tone}`}><Icon aria-hidden="true" className="size-[18px]" /></span><span className="mt-1 h-1.5 w-8 rounded-full bg-[#e5ece1]" /></div><p className="mt-5 font-serif text-3xl tracking-[-0.045em] text-[#2d392c]">{value}</p><p className="mt-1 text-sm font-semibold text-[#455344]">{label}</p><p className="mt-0.5 text-xs text-[#849080]">{detail}</p></article>)}</section>
    <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
      <ChartCard description="Pages enregistrées jour après jour" title="Votre rythme de lecture"><ResponsiveContainer height="100%" width="100%"><AreaChart data={progressData}><defs><linearGradient id="pages" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#537a50" stopOpacity={0.3} /><stop offset="100%" stopColor="#537a50" stopOpacity={0} /></linearGradient></defs><XAxis axisLine={false} dataKey="date" tick={{ fill: "#7d897a", fontSize: 12 }} tickLine={false} /><YAxis allowDecimals={false} axisLine={false} tick={{ fill: "#7d897a", fontSize: 12 }} tickLine={false} /><Tooltip contentStyle={tooltipStyle} /><Area dataKey="pages" fill="url(#pages)" name="Pages lues" stroke="#537a50" strokeWidth={2.5} type="monotone" /></AreaChart></ResponsiveContainer></ChartCard>
      <article className="rounded-[1.75rem] border border-[#dce4d7] bg-[#fffef9] p-6 shadow-[0_12px_32px_rgba(42,57,40,0.04)]"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#72886d]">Bibliothèque</p><h2 className="mt-2 font-serif text-2xl text-[#2d3d2d]">Répartition des lectures</h2>{distribution.length ? <><div className="mt-3 h-48"><ResponsiveContainer height="100%" width="100%"><PieChart><Pie cx="50%" cy="50%" data={distribution} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={4}>{distribution.map((entry, index) => <Cell fill={COLORS[index]} key={entry.name} />)}</Pie><Tooltip contentStyle={tooltipStyle} /></PieChart></ResponsiveContainer></div><div className="space-y-2">{distribution.map((entry, index) => <div className="flex items-center justify-between text-sm" key={entry.name}><span className="flex items-center gap-2 text-[#657363]"><span className="size-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }} />{entry.name}</span><span className="font-semibold text-[#334332]">{entry.value}</span></div>)}</div></> : <EmptyChart />}</article>
    </section>
    <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <article className="rounded-[1.75rem] border border-[#d1dfca] bg-[#e7efe1] p-6 text-[#314432] shadow-[0_18px_36px_rgba(41,67,46,0.08)]"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5c7959]">En un regard</p><h2 className="mt-2 font-serif text-2xl">Votre bibliothèque avance.</h2><p className="mt-3 text-sm leading-6 text-[#607360]">{finished.length ? `${finished.length} livre${finished.length > 1 ? "s" : ""} terminé${finished.length > 1 ? "s" : ""}, ` : ""}{inProgress.length ? `${inProgress.length} lecture${inProgress.length > 1 ? "s" : ""} en cours.` : "choisissez un livre pour démarrer."}</p><div className="mt-8 space-y-5"><Distribution label="À lire" value={toRead.length} total={books.length} /><Distribution label="En cours" value={inProgress.length} total={books.length} /><Distribution label="Terminés" value={finished.length} total={books.length} /></div></article>
      <ChartCard description="Vos titres selon leur état actuel" title="Composition de la bibliothèque"><ResponsiveContainer height="100%" width="100%"><BarChart barSize={28} data={statusData}><XAxis axisLine={false} dataKey="name" tick={{ fill: "#7d897a", fontSize: 12 }} tickLine={false} /><YAxis allowDecimals={false} axisLine={false} tick={{ fill: "#7d897a", fontSize: 12 }} tickLine={false} /><Tooltip contentStyle={tooltipStyle} /><Bar dataKey="total" name="Livres" radius={[9, 9, 0, 0]}>{statusData.map((item) => <Cell fill={item.fill} key={item.name} />)}</Bar></BarChart></ResponsiveContainer></ChartCard>
    </section>
  </div>;
}

function getProgressData(sessions: Array<{ pagesRead: number; readAt: string }>) { return Array.from({ length: 7 }, (_, index) => { const date = new Date(); date.setDate(date.getDate() - (6 - index)); const pages = sessions.filter((session) => new Date(session.readAt).toDateString() === date.toDateString()).reduce((total, session) => total + session.pagesRead, 0); return { date: date.toLocaleDateString("fr-FR", { weekday: "short" }), pages }; }); }
function ChartCard({ children, description, title }: { children: React.ReactNode; description: string; title: string }) { return <article className="rounded-[1.75rem] border border-[#dce4d7] bg-[#fffef9] p-6 shadow-[0_12px_32px_rgba(42,57,40,0.04)]"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#72886d]">Analyse</p><h2 className="mt-2 font-serif text-2xl text-[#2d3d2d]">{title}</h2><p className="mt-1 text-sm text-[#748173]">{description}</p><div className="mt-5 h-64">{children}</div></article>; }
function EmptyChart() { return <div className="grid h-48 place-items-center text-center text-sm text-[#748173]">Ajoutez des livres pour voir leur répartition.</div>; }
function Distribution({ label, total, value }: { label: string; total: number; value: number }) { const percentage = total ? Math.round((value / total) * 100) : 0; return <div><div className="flex justify-between text-sm"><span>{label}</span><span className="font-semibold">{percentage}%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#c7d9c1]"><div className="h-full rounded-full bg-[#5c8758]" style={{ width: `${percentage}%` }} /></div></div>; }

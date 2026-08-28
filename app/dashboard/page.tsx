"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  BookCheck,
  Clock,
  Bookmark,
  TrendingUp,
  ArrowRight,
  Plus,
  Library,
} from "lucide-react";
import { fakeUser, fakeStatsOverview } from "@/lib/fake-data";
import { useBookStore } from "@/lib/book-store";
import { ApiDocsCard } from "@/components/api-docs-card";

export default function DashboardPage() {
  const { books } = useBookStore();
  const recentBooks = books.filter((b) => b.status === "IN_PROGRESS").slice(0, 4);

  const statCards = [
    {
      label: "Total Livres",
      value: fakeStatsOverview.totalBooks,
      icon: BookOpen,
      color: "from-info/15 to-info/5",
      iconColor: "text-info",
    },
    {
      label: "En cours",
      value: fakeStatsOverview.booksInProgress,
      icon: Clock,
      color: "from-primary/15 to-primary/5",
      iconColor: "text-primary",
    },
    {
      label: "Terminés",
      value: fakeStatsOverview.booksFinished,
      icon: BookCheck,
      color: "from-success/15 to-success/5",
      iconColor: "text-success",
    },
    {
      label: "Pages lues",
      value: fakeStatsOverview.totalPagesRead.toLocaleString(),
      icon: TrendingUp,
      color: "from-warning/15 to-warning/5",
      iconColor: "text-warning",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-1">
          Bonjour, {fakeUser.firstName} 👋
        </h1>
        <p className="text-text-secondary">
          Voici un résumé de votre progression de lecture
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="glass-strong rounded-2xl p-6 card-hover">
            <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${card.color} flex items-center justify-center mb-3`}>
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <p className="text-2xl font-bold text-text-primary">{card.value}</p>
            <p className="text-sm text-text-secondary">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/dashboard/search"
          className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter un livre
        </Link>
        <Link
          href="/dashboard/books"
          className="btn-secondary text-sm px-5 py-2.5 flex items-center gap-2"
        >
          <Library className="w-4 h-4" />
          Voir ma bibliothèque
        </Link>
      </div>

      {/* Recent books */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-text-primary">
            Livres en cours
          </h2>
          <Link
            href="/dashboard/books"
            className="text-sm font-medium text-primary hover:text-primary-dark flex items-center gap-1 transition-colors"
          >
            Voir tout
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentBooks.length === 0 ? (
          <div className="glass-strong rounded-2xl p-12 text-center">
            <Bookmark className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary mb-4">
              Aucun livre en cours de lecture
            </p>
            <Link
              href="/dashboard/search"
              className="btn-primary text-sm px-6 py-2.5 inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Commencer à lire
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentBooks.map((book) => {
              const progress = book.totalPages
                ? Math.round((book.lastReadPage / book.totalPages) * 100)
                : 0;

              return (
                <Link
                  key={book.id}
                  href={`/dashboard/books/${book.id}`}
                  className="glass-strong rounded-2xl p-5 card-hover group"
                >
                  <div className="w-full aspect-[3/4] rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4 overflow-hidden relative">
                    {book.coverUrl ? (
                      <Image
                        src={book.coverUrl}
                        alt={book.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-primary/30" />
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-text-primary text-sm truncate mb-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-text-muted truncate mb-3">
                    {book.author}
                  </p>

                  <div className="w-full bg-accent-light/30 rounded-full h-1.5 mb-1.5">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>
                      p. {book.lastReadPage} / {book.totalPages}
                    </span>
                    <span className="font-semibold text-primary">{progress}%</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      {/* API Documentation */}
      <ApiDocsCard
        title="Endpoints API utilisés"
        subtitle="Données chargées au montage de cette page"
        endpoints={[
          {
            method: "GET",
            path: "/books?status=IN_PROGRESS",
            description: "Livres en cours",
            when: "Au chargement du dashboard pour afficher les livres en cours de lecture",
            response: JSON.stringify({ success: true, message: "Request completed successfully", data: { data: [{ id: "uuid", title: "Les Misérables", author: "Victor Hugo", coverUrl: "https://...", status: "IN_PROGRESS", lastReadPage: 42, totalPages: 1900, genre: { id: "uuid", name: "Roman" } }], meta: { total: 3, page: 1, limit: 20, totalPages: 1 } } }, null, 2),
          },
          {
            method: "GET",
            path: "/stats/overview",
            description: "Statistiques globales",
            when: "Au chargement du dashboard pour afficher les 4 cartes stats (total, en cours, terminés, pages lues)",
            response: JSON.stringify({ success: true, message: "Request completed successfully", data: { totalBooks: 12, booksFinished: 5, booksInProgress: 3, booksToRead: 4, totalPagesRead: 1250, totalSessions: 45 } }, null, 2),
          },
        ]}
      />
    </div>
  );
}

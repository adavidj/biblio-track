"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Plus,
  Search,
  ChevronDown,
  Trash2,
} from "lucide-react";
import { fakeGenres } from "@/lib/fake-data";
import { useBookStore } from "@/lib/book-store";
import { ApiDocsCard } from "@/components/api-docs-card";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

const STATUS_OPTIONS = [
  { value: "", label: "Tous" },
  { value: "TO_READ", label: "À lire" },
  { value: "IN_PROGRESS", label: "En cours" },
  { value: "FINISHED", label: "Terminés" },
];

const STATUS_STYLES: Record<string, string> = {
  TO_READ: "badge-to-read",
  IN_PROGRESS: "badge-in-progress",
  FINISHED: "badge-finished",
};

const STATUS_LABELS: Record<string, string> = {
  TO_READ: "À lire",
  IN_PROGRESS: "En cours",
  FINISHED: "Terminé",
};

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [genreId, setGenreId] = useState("");
  const [page, setPage] = useState(1);
  const { books, removeBook } = useBookStore();
  const limit = 8;

  const filteredBooks = useMemo(() => {
    let result = books;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          (b.isbn && b.isbn.includes(q))
      );
    }
    if (status) {
      result = result.filter((b) => b.status === status);
    }
    if (genreId) {
      result = result.filter((b) => b.genre?.id === genreId);
    }
    return result;
  }, [books, search, status, genreId]);

  const totalPages = Math.ceil(filteredBooks.length / limit);
  const paginatedBooks = filteredBooks.slice(
    (page - 1) * limit,
    page * limit
  );

  const handleDelete = (id: string) => {
    if (confirm("Supprimer ce livre ?")) {
      removeBook(id);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Ma collection"
        title="Votre bibliothèque"
        description="Retrouvez, filtrez et reprenez chaque livre à votre rythme."
        actions={<Link href="/dashboard/search" className="inline-flex items-center gap-2 rounded-xl bg-[#314c35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#263e2b]"><Plus className="size-4" />Ajouter un livre</Link>}
      />

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#dfe5da] bg-[#fffef9] p-4 shadow-[0_8px_24px_rgba(42,57,40,0.04)] sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Rechercher par titre, auteur..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-text-primary placeholder:text-text-muted transition-all"
          />
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="appearance-none pl-4 pr-9 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-text-primary transition-all cursor-pointer"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={genreId}
              onChange={(e) => {
                setGenreId(e.target.value);
                setPage(1);
              }}
              className="appearance-none pl-4 pr-9 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-text-primary transition-all cursor-pointer"
            >
              <option value="">Tous genres</option>
              {fakeGenres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Books grid */}
      {paginatedBooks.length === 0 ? (
        <EmptyState icon={BookOpen} title="Aucun livre à afficher" description="Modifiez vos filtres ou ajoutez un premier livre à votre bibliothèque." action={<Link href="/dashboard/search" className="inline-flex items-center gap-2 rounded-xl bg-[#314c35] px-4 py-2.5 text-sm font-semibold text-white"><Plus className="size-4" />Ajouter un livre</Link>} />
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedBooks.map((book) => {
              const progress = book.totalPages
                ? Math.round((book.lastReadPage / book.totalPages) * 100)
                : 0;

              return (
                <div
                  key={book.id}
                  className="group relative rounded-2xl border border-[#e0e4db] bg-[#fffef9] p-4 shadow-[0_8px_24px_rgba(42,57,40,0.04)] transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(42,57,40,0.08)]"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(book.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-danger/20 z-10"
                  >
                    <Trash2 className="w-4 h-4 text-danger" />
                  </button>

                  <Link href={`/dashboard/books/${book.id}`}>
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

                    <span
                      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-lg mb-2 ${STATUS_STYLES[book.status] || ""}`}
                    >
                      {STATUS_LABELS[book.status] || book.status}
                    </span>

                    <h3 className="font-bold text-text-primary text-sm truncate mb-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-text-muted truncate mb-3">
                      {book.author}
                    </p>

                    {book.totalPages > 0 && (
                      <>
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
                      </>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                    page === i + 1
                      ? "bg-primary text-white"
                      : "bg-surface border border-border text-text-secondary hover:bg-surface-hover"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* API Documentation */}
      <ApiDocsCard
        title="Endpoints API utilisés"
        subtitle="Requêtes effectuées depuis cette page"
        endpoints={[
          {
            method: "GET",
            path: "/books?page=1&limit=20&search=...&status=...&genreId=...",
            description: "Liste des livres avec filtres",
            when: "Au chargement de la page, et à chaque changement de filtre (recherche, statut, genre) ou de page",
            response: JSON.stringify({ success: true, message: "Request completed successfully", data: { data: [{ id: "uuid", title: "Les Misérables", author: "Victor Hugo", coverUrl: "https://...", fileUrl: "https://...", status: "IN_PROGRESS", lastReadPage: 42, totalPages: 1900, genre: { id: "uuid", name: "Roman" }, createdAt: "2026-07-01T08:00:00.000Z" }], meta: { total: 12, page: 1, limit: 20, totalPages: 1 } } }, null, 2),
          },
          {
            method: "DELETE",
            path: "/books/:id",
            description: "Supprimer un livre",
            when: "Quand l'utilisateur clique sur le bouton trash sur une carte livre",
            response: JSON.stringify({ success: true, message: "Book deleted successfully" }, null, 2),
          },
        ]}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useBookStore } from "@/lib/book-store";

export default function ReadPage() {
  const params = useParams();
  const bookId = params.id as string;
  const { books } = useBookStore();
  const book = books.find((b) => b.id === bookId);

  const [currentPage, setCurrentPage] = useState(book?.lastReadPage || 0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!book) {
    return (
      <div className="text-center py-20">
        <BookOpen className="w-16 h-16 text-text-muted mx-auto mb-4" />
        <p className="text-text-secondary text-lg">Livre non trouvé</p>
      </div>
    );
  }

  const progress = book.totalPages
    ? Math.round((currentPage / book.totalPages) * 100)
    : 0;

  return (
    <div className={`space-y-6 ${isFullscreen ? "fixed inset-0 z-50 bg-background p-6" : ""}`}>
      <div className="flex items-center justify-between">
        <Link
          href={`/dashboard/books/${book.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au livre
        </Link>

        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-text-primary truncate max-w-xs">
            {book.title}
          </h1>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center hover:bg-surface-hover transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-text-secondary" />
            ) : (
              <Maximize2 className="w-4 h-4 text-text-secondary" />
            )}
          </button>
        </div>
      </div>

      {/* Reader area */}
      <div className="glass-strong rounded-2xl overflow-hidden">
        {book.fileUrl ? (
          <div className="w-full" style={{ height: isFullscreen ? "calc(100vh - 200px)" : "70vh" }}>
            <iframe
              src={`${book.fileUrl}#page=${currentPage}`}
              className="w-full h-full border-0"
              title={`Lecture: ${book.title}`}
            />
          </div>
        ) : book.readOnlineUrl ? (
          <div className="w-full" style={{ height: isFullscreen ? "calc(100vh - 200px)" : "70vh" }}>
            <iframe
              src={book.readOnlineUrl}
              className="w-full h-full border-0"
              title={`Lecture: ${book.title}`}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20" style={{ minHeight: isFullscreen ? "calc(100vh - 200px)" : "70vh" }}>
            <BookOpen className="w-16 h-16 text-text-muted mb-4" />
            <p className="text-text-secondary mb-2">Aucun contenu lisible disponible</p>
            <p className="text-sm text-text-muted mb-6">
              Ajoutez un fichier PDF ou un lien de lecture pour ce livre
            </p>
            <Link
              href={`/dashboard/books/${book.id}`}
              className="btn-primary text-sm px-6 py-2.5"
            >
              Retour au livre
            </Link>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage <= 0}
              className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center hover:bg-surface-hover transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5 text-text-secondary" />
            </button>

            <div className="flex items-center gap-2">
              <input
                type="number"
                value={currentPage}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  if (!isNaN(v)) setCurrentPage(v);
                }}
                className="w-20 text-center px-3 py-2 rounded-xl bg-surface border border-border text-sm font-bold text-text-primary"
                min={0}
                max={book.totalPages}
              />
              <span className="text-sm text-text-muted">/ {book.totalPages}</span>
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(book.totalPages, currentPage + 1))}
              disabled={currentPage >= book.totalPages}
              className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center hover:bg-surface-hover transition-colors disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>

        <div className="w-full bg-accent-light/30 rounded-full h-2 mb-2">
          <div
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-text-muted">
          <span>Page {currentPage}</span>
          <span className="font-semibold text-primary">{progress}%</span>
        </div>
      </div>

      <div className="flex gap-3">
        {book.fileUrl && (
          <a
            href={book.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm px-5 py-2.5 flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Ouvrir dans un nouvel onglet
          </a>
        )}
        {book.readOnlineUrl && (
          <a
            href={book.readOnlineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm px-5 py-2.5 flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Internet Archive
          </a>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Download,
  Plus,
  Check,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { fakeExternalSearchResults, fakeGenres } from "@/lib/fake-data";
import { useBookStore } from "@/lib/book-store";
import { ApiDocsCard } from "@/components/api-docs-card";
import { PageHeader } from "@/components/shared/page-header";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ExternalBook {
  title: string;
  author: string;
  description?: string;
  coverUrl?: string | null;
  totalPages?: number;
  isbn?: string;
  publisher?: string;
  publishedYear?: number;
  language?: string;
  externalSourceId: string;
  externalSource: string;
}

export default function SearchPage() {
  const { books, addBook } = useBookStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ExternalBook[]>([]);
  const [manualMode, setManualMode] = useState(false);
  const [manualForm, setManualForm] = useState({
    title: "",
    author: "",
    description: "",
    totalPages: "",
    isbn: "",
    publisher: "",
    publishedYear: "",
    language: "fr",
    genreId: "",
  });

  // Import state
  const [importingId, setImportingId] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<{
    title: string;
    id: string;
  } | null>(null);

  // Genre picker for each result
  const [genrePickers, setGenrePickers] = useState<Record<string, string>>({});

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const q = query.toLowerCase();
    const filtered = fakeExternalSearchResults.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        (b.isbn && b.isbn.includes(q)),
    );
    setResults(filtered.length > 0 ? filtered : fakeExternalSearchResults);
  };

  // ONE-CLICK IMPORT: POST /books/import-external { externalSourceId, externalSource, genreId }
  // Backend fetches everything automatically
  const handleImport = async (book: ExternalBook) => {
    if (isAlreadyImported(book.externalSourceId)) return;
    setImportingId(book.externalSourceId);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));

    const genreId = genrePickers[book.externalSourceId] || "";
    const selectedGenre = genreId
      ? fakeGenres.find((g) => g.id === genreId)
      : undefined;

    // Backend creates the book with all data fetched automatically
    const newId = crypto.randomUUID();
    addBook({
      id: newId,
      title: book.title,
      author: book.author,
      description: book.description || "",
      coverUrl: book.coverUrl || null,
      fileUrl: null,
      readOnlineUrl: null,
      totalPages: book.totalPages || 0,
      isbn: book.isbn || "",
      publisher: book.publisher || "",
      publishedYear: book.publishedYear || 0,
      language: book.language || "en",
      externalSourceId: book.externalSourceId,
      externalSource: book.externalSource,
      status: "TO_READ",
      lastReadPage: 0,
      genre: selectedGenre
        ? { id: selectedGenre.id, name: selectedGenre.name }
        : undefined,
      sessions: [],
      hasReadableContent: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    setImportingId(null);
    setImportSuccess({ title: book.title, id: newId });
    setTimeout(() => setImportSuccess(null), 5000);
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedGenre = manualForm.genreId
      ? fakeGenres.find((g) => g.id === manualForm.genreId)
      : undefined;

    const newId = `b-manual-${Date.now()}`;
    addBook({
      id: newId,
      title: manualForm.title,
      author: manualForm.author,
      description: manualForm.description,
      coverUrl: null,
      fileUrl: null,
      readOnlineUrl: null,
      totalPages: parseInt(manualForm.totalPages, 10) || 0,
      isbn: manualForm.isbn,
      publisher: manualForm.publisher,
      publishedYear: parseInt(manualForm.publishedYear, 10) || 0,
      language: manualForm.language,
      externalSourceId: "",
      externalSource: "",
      status: "TO_READ",
      lastReadPage: 0,
      genre: selectedGenre
        ? { id: selectedGenre.id, name: selectedGenre.name }
        : undefined,
      sessions: [],
      hasReadableContent: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    setImportSuccess({ title: manualForm.title, id: newId });
    setManualMode(false);
    setManualForm({
      title: "",
      author: "",
      description: "",
      totalPages: "",
      isbn: "",
      publisher: "",
      publishedYear: "",
      language: "fr",
      genreId: "",
    });
    setTimeout(() => setImportSuccess(null), 5000);
  };

  const isAlreadyImported = (externalSourceId: string) =>
    books.some((b) => b.externalSourceId === externalSourceId);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Enrichir votre bibliothèque"
        title="Trouver un livre"
        description="Recherchez une référence, importez-la, ou ajoutez-la à la main."
      />

      {/* Success toast */}
      {importSuccess && (
        <div className="glass-strong rounded-xl p-4 flex items-center gap-3 border-l-4 border-l-success animate-fade-in-up">
          <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-text-primary">
              « {importSuccess.title} » ajouté !
            </p>
            <p className="text-xs text-text-muted">
              Status: TO_READ — Ajoutez une cover et un fichier PDF
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/dashboard/books/${importSuccess.id}`}
              className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline"
            >
              Détail <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/dashboard/books"
              className="text-xs font-semibold text-muted-foreground hover:underline"
            >
              Bibliothèque
            </Link>
          </div>
        </div>
      )}

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="glass-strong rounded-2xl p-4 flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Titre, auteur, ISBN..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface border border-border text-sm font-medium text-text-primary placeholder:text-text-muted transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={!query.trim()}
          className="btn-primary text-sm px-6 py-3 flex items-center gap-2 disabled:opacity-50"
        >
          <Search className="w-4 h-4" /> Rechercher
        </button>
      </form>

      <button
        onClick={() => setManualMode(!manualMode)}
        className={`btn-secondary text-sm px-5 py-2.5 flex items-center gap-2 ${manualMode ? "border-primary" : ""}`}
      >
        <Plus className="w-4 h-4" /> Ajout manuel
      </button>

      {/* Manual add form */}
      <Dialog open={manualMode} onOpenChange={setManualMode}>
        <DialogContent className="max-h-[calc(100vh-1rem)] max-w-[calc(100%-1rem)] overflow-y-auto rounded-[1.75rem] border-[#dce4d7] bg-[#fffef9] p-6 shadow-[0_20px_50px_rgba(42,57,40,0.16)] sm:!max-w-3xl sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-[#2b382b]">Ajouter un livre manuellement</DialogTitle>
            <DialogDescription>Renseignez les informations dont vous disposez. Vous pourrez les compléter plus tard.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleManualAdd} className="space-y-4 pt-2">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  Titre *
                </label>
                <input
                  type="text"
                  value={manualForm.title}
                  onChange={(e) =>
                    setManualForm({ ...manualForm, title: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-text-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  Auteur *
                </label>
                <input
                  type="text"
                  value={manualForm.author}
                  onChange={(e) =>
                    setManualForm({ ...manualForm, author: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-text-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  ISBN
                </label>
                <input
                  type="text"
                  value={manualForm.isbn}
                  onChange={(e) =>
                    setManualForm({ ...manualForm, isbn: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-text-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  Pages
                </label>
                <input
                  type="number"
                  value={manualForm.totalPages}
                  onChange={(e) =>
                    setManualForm({ ...manualForm, totalPages: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-text-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  Éditeur
                </label>
                <input
                  type="text"
                  value={manualForm.publisher}
                  onChange={(e) =>
                    setManualForm({ ...manualForm, publisher: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-text-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  Année
                </label>
                <input
                  type="number"
                  value={manualForm.publishedYear}
                  onChange={(e) =>
                    setManualForm({
                      ...manualForm,
                      publishedYear: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-text-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  Langue
                </label>
                <input
                  type="text"
                  value={manualForm.language}
                  onChange={(e) =>
                    setManualForm({ ...manualForm, language: e.target.value })
                  }
                  placeholder="fr"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-text-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  Genre
                </label>
                <div className="relative">
                  <select
                    value={manualForm.genreId}
                    onChange={(e) =>
                      setManualForm({ ...manualForm, genreId: e.target.value })
                    }
                    className="w-full appearance-none pl-4 pr-9 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-text-primary transition-all cursor-pointer"
                  >
                    <option value="">Aucun genre</option>
                    {fakeGenres.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">
                Description
              </label>
              <textarea
                value={manualForm.description}
                onChange={(e) =>
                  setManualForm({ ...manualForm, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-text-primary transition-all resize-none"
              />
            </div>
            <div className="flex flex-col-reverse justify-center gap-3 pt-2 sm:flex-row">
              <button
                type="submit"
                className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl bg-[#314c35] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(49,76,53,0.16)] transition hover:bg-[#263e2a]"
              >
                <Plus className="w-4 h-4" /> Ajouter
              </button>
              <button
                type="button"
                onClick={() => setManualMode(false)}
                className="inline-flex min-w-32 items-center justify-center rounded-xl border border-[#d7dfd2] bg-[#fffef9] px-6 py-3 text-sm font-semibold text-[#40523f] transition hover:border-[#afc4a7] hover:bg-[#f3f7f0]"
              >
                Annuler
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Results */}
      {results.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-text-primary mb-4">
            {results.length} résultat{results.length > 1 ? "s" : ""}
          </h2>
          <div className="space-y-3">
            {results.map((book) => {
              const alreadyImported = isAlreadyImported(book.externalSourceId);
              const isImporting = importingId === book.externalSourceId;
              return (
                <div
                  key={book.externalSourceId}
                  className="glass-strong rounded-2xl p-5 flex gap-5 items-start card-hover"
                >
                  <div className="w-20 h-28 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden relative flex-shrink-0">
                    {book.coverUrl ? (
                      <Image
                        src={book.coverUrl}
                        alt={book.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-primary/30" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-bold text-text-primary truncate">
                          {book.title}
                        </h3>
                        <p className="text-sm text-text-secondary truncate">
                          {book.author}
                        </p>
                      </div>
                      {/* ONE-CLICK IMPORT BUTTON */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Genre selector inline */}
                        {!alreadyImported && !isImporting && (
                          <div className="relative">
                            <select
                              value={genrePickers[book.externalSourceId] || ""}
                              onChange={(e) =>
                                setGenrePickers((prev) => ({
                                  ...prev,
                                  [book.externalSourceId]: e.target.value,
                                }))
                              }
                              className="appearance-none pl-3 pr-7 py-2 rounded-xl bg-surface border border-border text-xs font-medium text-text-primary cursor-pointer"
                            >
                              <option value="">Genre</option>
                              {fakeGenres.map((g) => (
                                <option key={g.id} value={g.id}>
                                  {g.name}
                                </option>
                              ))}
                            </select>
                            <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted pointer-events-none" />
                          </div>
                        )}

                        {/* Import button → ONE CLICK */}
                        <button
                          onClick={() => handleImport(book)}
                          disabled={alreadyImported || isImporting}
                          className={`text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                            alreadyImported
                              ? "bg-success/10 text-success cursor-default"
                              : isImporting
                                ? "bg-primary/20 text-primary cursor-wait"
                                : "btn-primary"
                          }`}
                        >
                          {alreadyImported ? (
                            <>
                              <Check className="w-4 h-4" /> Importé
                            </>
                          ) : isImporting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />{" "}
                              Import...
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" /> Importer
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    {book.description && (
                      <p className="text-xs text-text-muted mt-2 line-clamp-2">
                        {book.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {book.totalPages && (
                        <span className="text-xs px-2 py-1 rounded-lg bg-surface text-text-muted">
                          {book.totalPages} pages
                        </span>
                      )}
                      {book.publishedYear && (
                        <span className="text-xs px-2 py-1 rounded-lg bg-surface text-text-muted">
                          {book.publishedYear}
                        </span>
                      )}
                      {book.isbn && (
                        <span className="text-xs px-2 py-1 rounded-lg bg-surface text-text-muted font-mono">
                          ISBN: {book.isbn}
                        </span>
                      )}
                      {book.language && (
                        <span className="text-xs px-2 py-1 rounded-lg bg-surface text-text-muted uppercase">
                          {book.language}
                        </span>
                      )}
                      <span className="text-xs px-2 py-1 rounded-lg bg-primary/10 text-primary font-medium">
                        {book.externalSource === "open_library"
                          ? "Open Library"
                          : "Google Books"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!query && results.length === 0 && (
        <div className="glass-strong rounded-2xl p-12 text-center">
          <Search className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary mb-2">
            Recherchez par titre, auteur ou ISBN
          </p>
          <p className="text-sm text-text-muted">
            Les résultats viennent d&apos;Open Library et Google Books
          </p>
        </div>
      )}
      {/* API Documentation */}
      <ApiDocsCard
        title="Endpoints API utilisés"
        subtitle="Requêtes effectuées depuis cette page"
        endpoints={[
          {
            method: "GET",
            path: "/books/external-search?q=django",
            description: "Recherche externe",
            when: "Quand l'utilisateur clique sur Rechercher, cherche sur Open Library + Google Books en parallèle",
            response: JSON.stringify(
              {
                success: true,
                message: "Request completed successfully",
                data: [
                  {
                    title: "Django for Beginners",
                    author: "William Vincent",
                    description: "Learn web development...",
                    coverUrl:
                      "https://covers.openlibrary.org/b/id/123456-L.jpg",
                    totalPages: 300,
                    isbn: "9781735467221",
                    publisher: "Leanpub",
                    publishedYear: 2024,
                    language: "en",
                    externalSourceId: "/works/OL82563W",
                    externalSource: "open_library",
                  },
                ],
              },
              null,
              2,
            ),
          },
          {
            method: "POST",
            path: "/books/import-external",
            description: "Import one-click",
            when: "Quand l'utilisateur clique Importer sur un resultat, le backend recupere tout automatiquement",
            request: JSON.stringify(
              {
                externalSourceId: "/works/OL82563W",
                externalSource: "open_library",
                genreId: "uuid-genre",
              },
              null,
              2,
            ),
            response: JSON.stringify(
              {
                success: true,
                message: "Book imported successfully",
                data: {
                  id: "uuid",
                  title: "Les Misérables",
                  author: "Victor Hugo",
                  coverUrl: "https://...",
                  fileUrl: "https://res.cloudinary.com/.../file.pdf",
                  readOnlineUrl: "https://archive.org/details/...",
                  status: "TO_READ",
                  lastReadPage: 0,
                  hasReadableContent: true,
                },
              },
              null,
              2,
            ),
          },
          {
            method: "POST",
            path: "/books",
            description: "Ajout manuel",
            when: "Quand l'utilisateur remplit le formulaire d'ajout manuel et clique Ajouter, champs requis: title + author",
            request: JSON.stringify(
              {
                title: "Mon livre perso",
                author: "Moi",
                description: "Une description",
                isbn: "9782070360529",
                publisher: "Gallimard",
                publishedYear: 2024,
                language: "fr",
                genreId: "uuid-genre",
                totalPages: 300,
              },
              null,
              2,
            ),
            response: JSON.stringify(
              {
                success: true,
                message: "Book added successfully",
                data: {
                  id: "uuid",
                  title: "Mon livre perso",
                  author: "Moi",
                  status: "TO_READ",
                  lastReadPage: 0,
                  createdAt: "2026-08-26T07:33:37.493Z",
                },
              },
              null,
              2,
            ),
          },
        ]}
      />
    </div>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

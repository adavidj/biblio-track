"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  ArrowLeft,
  Edit3,
  ExternalLink,
  Eye,
  Clock,
  Calendar,
  Globe,
  Hash,
  Building,
  Upload,
  Camera,
  FileText,
  Plus,
  Trash2,
  Loader2,
  Link2,
} from "lucide-react";
import { useBookStore, type Book } from "@/lib/book-store";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageDropzone, FileDropzone } from "@/components/ui/image-dropzone";
import { ApiDocsCard } from "@/components/api-docs-card";

const STATUS_LABELS: Record<string, string> = {
  TO_READ: "À lire",
  IN_PROGRESS: "En cours",
  FINISHED: "Terminé",
};

const STATUS_VARIANT: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  TO_READ: "secondary",
  IN_PROGRESS: "default",
  FINISHED: "outline",
};

export default function BookDetailPage() {
  const params = useParams();
  const bookId = params.id as string;
  const { books } = useBookStore();
  const book = books.find((b) => b.id === bookId);

  const [currentPage, setCurrentPage] = useState(book?.lastReadPage || 0);
  const [status, setStatus] = useState(book?.status || "TO_READ");
  const [sessions, setSessions] = useState<Book["sessions"]>(book?.sessions || []);

  // Cover upload
  const [uploadingCover, setUploadingCover] = useState(false);
  const [coverUrl, setCoverUrl] = useState(book?.coverUrl || null);
  const [showCoverSheet, setShowCoverSheet] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  // File upload
  const [uploadingFile, setUploadingFile] = useState(false);
  const [fileUrl, setFileUrl] = useState(book?.fileUrl || null);
  const [showFileSheet, setShowFileSheet] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  // Session modal
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [sessionForm, setSessionForm] = useState({ pagesRead: "", startPage: "", endPage: "" });

  if (!book) {
    return (
      <div className="text-center py-20">
        <BookOpen className="w-16 h-16 text-text-muted mx-auto mb-4" />
        <p className="text-text-secondary text-lg mb-4">Livre non trouvé</p>
        <Link href="/dashboard/books" className="text-primary text-sm font-medium hover:underline">← Retour</Link>
      </div>
    );
  }

  const progress = book.totalPages ? Math.round((currentPage / book.totalPages) * 100) : 0;
  const sourceLabel = book.externalSource === "open_library" ? "Open Library" : book.externalSource === "google_books" ? "Google Books" : book.externalSource;

  const handleCoverUpload = async () => {
    if (!coverPreview) return;
    setUploadingCover(true);
    await new Promise((r) => setTimeout(r, 1200));
    setCoverUrl(coverPreview);
    setUploadingCover(false);
    setShowCoverSheet(false);
    setCoverPreview(null);
  };

  const handleFileUpload = async () => {
    if (!fileName) return;
    setUploadingFile(true);
    await new Promise((r) => setTimeout(r, 1500));
    setFileUrl("uploaded-" + fileName);
    setUploadingFile(false);
    setShowFileSheet(false);
    setFileName(null);
  };

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    setSessions((prev) => [{
      id: `s-${Date.now()}`,
      pagesRead: parseInt(sessionForm.pagesRead, 10),
      startPage: parseInt(sessionForm.startPage, 10),
      endPage: parseInt(sessionForm.endPage, 10),
      readAt: new Date().toISOString(),
    }, ...prev]);
    setShowSessionModal(false);
    setSessionForm({ pagesRead: "", startPage: "", endPage: "" });
  };

  return (
    <div className="space-y-8">
      <Link href="/dashboard/books" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" /> Retour à la bibliothèque
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Cover + actions */}
        <div className="lg:col-span-1">
          <div className="glass-strong rounded-2xl p-6 sticky top-24">
            <div className="relative mb-4">
              <div className="w-full aspect-[3/4] rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden relative">
                {coverUrl ? (<Image src={coverUrl} alt={book.title} fill className="object-cover" />) : (<div className="w-full h-full flex items-center justify-center"><BookOpen className="w-16 h-16 text-primary/20" /></div>)}
              </div>
              <button onClick={() => setShowCoverSheet(true)} className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            {book.externalSource && (
              <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl bg-muted/50">
                <Link2 className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Source: <span className="text-primary font-semibold">{sourceLabel}</span></span>
              </div>
            )}

            <div className="relative mb-4">
              <select value={status} onChange={(e) => setStatus(e.target.value)}
                className="w-full appearance-none px-4 py-2.5 rounded-xl bg-background border border-border text-sm font-semibold text-foreground cursor-pointer">
                {Object.entries(STATUS_LABELS).map(([v, l]) => (<option key={v} value={v}>{l}</option>))}
              </select>
            </div>

            <div className="space-y-2">
              {(fileUrl || book.fileUrl) && (
                <a href={fileUrl || book.fileUrl!} target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-sm py-2.5 flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" /> Lire en ligne (PDF)
                </a>
              )}
              {book.readOnlineUrl && (
                <a href={book.readOnlineUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full text-sm py-2.5 flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Internet Archive
                </a>
              )}
              <Link href={`/dashboard/books/${book.id}/read`} className="btn-secondary w-full text-sm py-2.5 flex items-center justify-center gap-2">
                <BookOpen className="w-4 h-4" /> Ouvrir le lecteur
              </Link>
              <Button variant="outline" className="w-full" onClick={() => setShowFileSheet(true)}>
                <Upload className="w-4 h-4" /> {fileUrl || book.fileUrl ? "Remplacer le fichier" : "Uploader PDF/EPUB"}
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-strong rounded-2xl p-6">
            <h1 className="text-2xl font-bold text-foreground mb-1">{book.title}</h1>
            <p className="text-lg text-muted-foreground mb-3">{book.author}</p>
            <div className="flex flex-wrap gap-2">
              {book.genre && <Badge variant="secondary">{book.genre.name}</Badge>}
              {(fileUrl || book.fileUrl) && <Badge variant="default" className="gap-1"><FileText className="w-3 h-3" /> PDF</Badge>}
              {book.readOnlineUrl && <Badge variant="outline" className="gap-1"><Globe className="w-3 h-3" /> En ligne</Badge>}
            </div>
            {book.description && <p className="text-muted-foreground mt-4 leading-relaxed">{book.description}</p>}
          </div>

          {/* Progress */}
          <div className="glass-strong rounded-2xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Progression</h2>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-4xl font-black gradient-text">{progress}%</span>
              <span className="text-sm text-muted-foreground mb-1">{currentPage} / {book.totalPages} pages</span>
            </div>
            <div className="w-full bg-accent-light/30 rounded-full h-3 mb-6">
              <div className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Page actuelle</label>
                <input type="number" value={currentPage} onChange={(e) => setCurrentPage(parseInt(e.target.value, 10) || 0)} min={0} max={book.totalPages}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm font-medium text-foreground" />
              </div>
              <div className="self-end">
                <Button className="gap-1.5"><Edit3 className="w-4 h-4" /> Mettre à jour</Button>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="glass-strong rounded-2xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Informations</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: BookOpen, label: "Pages", value: book.totalPages },
                { icon: Hash, label: "ISBN", value: book.isbn },
                { icon: Building, label: "Éditeur", value: book.publisher },
                { icon: Calendar, label: "Année", value: book.publishedYear },
                { icon: Globe, label: "Langue", value: book.language?.toUpperCase() },
                book.externalSourceId ? { icon: Link2, label: "Source ID", value: book.externalSourceId } : null,
              ].filter(Boolean).map((item) => item && (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center"><item.icon className="w-4 h-4 text-primary" /></div>
                  <div><p className="text-xs text-muted-foreground">{item.label}</p><p className="text-sm font-semibold text-foreground truncate">{item.value}</p></div>
                </div>
              ))}
            </div>
          </div>

          {/* Sessions */}
          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Sessions ({sessions.length})</h2>
              <Button size="sm" onClick={() => setShowSessionModal(true)} className="gap-1.5"><Plus className="w-3.5 h-3.5" /> Nouvelle</Button>
            </div>
            {sessions.length === 0 ? (
              <div className="text-center py-8"><Clock className="w-10 h-10 text-muted-foreground mx-auto mb-3" /><p className="text-sm text-muted-foreground">Aucune session</p></div>
            ) : (
              <div className="space-y-3">
                {sessions.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 group">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Clock className="w-4 h-4 text-primary" /></div>
                      <div><p className="text-sm font-semibold text-foreground">{s.pagesRead} pages lues</p><p className="text-xs text-muted-foreground">p. {s.startPage} → {s.endPage}</p></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">{new Date(s.readAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</p>
                      <button onClick={() => setSessions((prev) => prev.filter((x) => x.id !== s.id))} className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-destructive/10 transition-all">
                        <Trash2 className="w-3.5 h-3.5 text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== COVER UPLOAD SHEET (with dropzone) ===== */}
      <Sheet open={showCoverSheet} onOpenChange={setShowCoverSheet}>
        <SheetContent side="bottom" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Changer la couverture</SheetTitle>
            <SheetDescription>Formats: jpg, png, gif, webp. Max: 10 MB.</SheetDescription>
          </SheetHeader>
          <div className="space-y-4 px-4 pb-4">
            <ImageDropzone
              preview={coverPreview}
              onFile={(_file, preview) => setCoverPreview(preview)}
              onClear={() => setCoverPreview(null)}
              maxSize={10 * 1024 * 1024}
              label="Glissez une couverture ici"
              description="ou cliquez pour sélectionner"
            />
            <Button className="w-full" onClick={handleCoverUpload} disabled={!coverPreview || uploadingCover}>
              {uploadingCover ? <><Loader2 className="w-4 h-4 animate-spin" /> Upload...</> : <><Upload className="w-4 h-4" /> Uploader</>}
            </Button>
            <p className="text-[10px] text-muted-foreground text-center">POST /books/:id/cover — champ: cover</p>
          </div>
        </SheetContent>
      </Sheet>

      {/* ===== FILE UPLOAD SHEET (with dropzone) ===== */}
      <Sheet open={showFileSheet} onOpenChange={setShowFileSheet}>
        <SheetContent side="bottom" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Uploader un fichier</SheetTitle>
            <SheetDescription>Formats: PDF, EPUB. Max: 50 MB.</SheetDescription>
          </SheetHeader>
          <div className="space-y-4 px-4 pb-4">
            <FileDropzone
              fileName={fileName}
              onFile={(file) => setFileName(file.name)}
              onClear={() => setFileName(null)}
              maxSize={50 * 1024 * 1024}
              label="Glissez un fichier ici"
              description="PDF ou EPUB"
            />
            <Button className="w-full" onClick={handleFileUpload} disabled={!fileName || uploadingFile}>
              {uploadingFile ? <><Loader2 className="w-4 h-4 animate-spin" /> Upload...</> : <><Upload className="w-4 h-4" /> Uploader</>}
            </Button>
            <p className="text-[10px] text-muted-foreground text-center">POST /books/:id/file — champ: file</p>
          </div>
        </SheetContent>
      </Sheet>

      {/* ===== SESSION MODAL (shadcn Dialog) ===== */}
      <Dialog open={showSessionModal} onOpenChange={setShowSessionModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nouvelle session de lecture</DialogTitle>
            <DialogDescription>Enregistrez votre progression de lecture.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSession} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Page début *</label>
                <input type="number" value={sessionForm.startPage} onChange={(e) => setSessionForm({ ...sessionForm, startPage: e.target.value })} required min={1} max={book.totalPages}
                  className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm font-medium text-foreground" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Page fin *</label>
                <input type="number" value={sessionForm.endPage} onChange={(e) => setSessionForm({ ...sessionForm, endPage: e.target.value })} required min={1} max={book.totalPages}
                  className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm font-medium text-foreground" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Pages lues *</label>
              <input type="number" value={sessionForm.pagesRead} onChange={(e) => setSessionForm({ ...sessionForm, pagesRead: e.target.value })} required min={1}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm font-medium text-foreground" />
            </div>
            <DialogFooter>
              <Button type="submit" className="gap-1.5">Enregistrer</Button>
            </DialogFooter>
          </form>
          <p className="text-[10px] text-muted-foreground text-center px-4 pb-2">POST /books/:bookId/sessions</p>
        </DialogContent>
      </Dialog>

      {/* API Documentation */}
      <ApiDocsCard
        title="Endpoints API utilisés"
        subtitle="Toutes les requêtes pour gérer ce livre"
        endpoints={[
          {
            method: "GET",
            path: "/books/:id",
            description: "Détail du livre",
            when: "Au chargement de la page pour récupérer toutes les infos du livre (titre, auteur, cover, sessions, progression...)",
            response: JSON.stringify({ success: true, message: "Request completed successfully", data: { id: "uuid", title: "Les Misérables", author: "Victor Hugo", description: "...", coverUrl: "https://...", fileUrl: "https://...", readOnlineUrl: "https://...", totalPages: 1900, isbn: "9782070360529", status: "IN_PROGRESS", lastReadPage: 42, genre: { id: "uuid", name: "Roman" }, sessions: [{ id: "uuid", pagesRead: 10, startPage: 1, endPage: 10, readAt: "2026-08-26T10:00:00.000Z" }], createdAt: "2026-07-01T08:00:00.000Z" } }, null, 2),
          },
          {
            method: "GET",
            path: "/books/:id/read",
            description: "Info de lecture",
            when: "Pour savoir comment afficher le livre : fileUrl (PDF Cloudinary), readOnlineUrl (Internet Archive), lastReadPage, hasReadableContent",
            response: JSON.stringify({ success: true, message: "Request completed successfully", data: { id: "uuid", title: "Les Misérables", fileUrl: "https://res.cloudinary.com/.../file.pdf", readOnlineUrl: "https://archive.org/details/...", lastReadPage: 42, totalPages: 1900, status: "IN_PROGRESS", hasReadableContent: true } }, null, 2),
          },
          {
            method: "PATCH",
            path: "/books/:id",
            description: "Modifier le statut",
            when: "Quand l'utilisateur change le statut (À lire → En cours → Terminé) via le dropdown",
            request: JSON.stringify({ status: "FINISHED" }, null, 2),
            response: JSON.stringify({ success: true, message: "Book updated successfully", data: { id: "uuid", title: "Les Misérables", status: "FINISHED" } }, null, 2),
          },
          {
            method: "PATCH",
            path: "/books/:id/progress",
            description: "Mettre à jour la progression",
            when: "Quand l'utilisateur entre un numero de page et clique Mettre a jour, auto-status: TO_READ->IN_PROGRESS si page>0, FINISHED si page>=totalPages",
            request: JSON.stringify({ currentPage: 42 }, null, 2),
            response: JSON.stringify({ success: true, message: "Progress updated", data: { id: "uuid", title: "Les Misérables", status: "IN_PROGRESS", lastReadPage: 42, totalPages: 1900 } }, null, 2),
          },
          {
            method: "POST",
            path: "/books/:id/cover",
            description: "Upload cover",
            when: "Quand l'utilisateur clique sur l'icone camera sur la cover, Sheet s'ouvre, drag-and-drop ou selection, Upload",
            response: JSON.stringify({ success: true, message: "Cover uploaded successfully", data: { id: "uuid", title: "Les Misérables", coverUrl: "https://res.cloudinary.com/.../books/cover.jpg" } }, null, 2),
          },
          {
            method: "POST",
            path: "/books/:id/file",
            description: "Upload fichier",
            when: "Quand l'utilisateur clique Uploader PDF/EPUB, Sheet s'ouvre, drag-and-drop ou selection, Upload",
            response: JSON.stringify({ success: true, message: "File uploaded successfully", data: { id: "uuid", title: "Les Misérables", fileUrl: "https://res.cloudinary.com/.../raw/upload/books/file.pdf" } }, null, 2),
          },
          {
            method: "POST",
            path: "/books/:bookId/sessions",
            description: "Enregistrer une session",
            when: "Quand l'utilisateur clique Nouvelle, Dialog s'ouvre, remplit startPage, endPage, pagesRead, Enregistrer",
            request: JSON.stringify({ pagesRead: 10, startPage: 1, endPage: 10 }, null, 2),
            response: JSON.stringify({ success: true, message: "Session logged successfully", data: { id: "uuid", pagesRead: 10, startPage: 1, endPage: 10, readAt: "2026-08-26T10:00:00.000Z", bookId: "uuid" } }, null, 2),
          },
          {
            method: "DELETE",
            path: "/sessions/:id",
            description: "Supprimer une session",
            when: "Quand l'utilisateur survole une session et clique sur l'icone trash",
            response: JSON.stringify({ success: true, message: "Session deleted successfully" }, null, 2),
          },
        ]}
      />
    </div>
  );
}

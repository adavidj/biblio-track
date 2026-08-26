"use client";

import { useState } from "react";
import {
  Tag,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Loader2,
} from "lucide-react";
import { fakeGenres } from "@/lib/fake-data";
import { ApiDocsCard } from "@/components/api-docs-card";

interface Genre {
  id: string;
  name: string;
}

export default function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>(fakeGenres);
  const [newGenreName, setNewGenreName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGenreName.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const newGenre: Genre = {
      id: `g-new-${Date.now()}`,
      name: newGenreName.trim(),
    };
    setGenres((prev) => [...prev, newGenre]);
    setNewGenreName("");
    setLoading(false);
  };

  const handleStartEdit = (genre: Genre) => {
    setEditingId(genre.id);
    setEditingName(genre.name);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editingName.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setGenres((prev) =>
      prev.map((g) => (g.id === id ? { ...g, name: editingName.trim() } : g))
    );
    setEditingId(null);
    setEditingName("");
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce genre ?")) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setGenres((prev) => prev.filter((g) => g.id !== id));
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Genres</h1>
        <p className="text-text-secondary">
          Gérez les genres de votre bibliothèque
        </p>
      </div>

      {/* Create form */}
      <div className="glass-strong rounded-2xl p-5">
        <h2 className="text-sm font-bold text-text-primary mb-3">
          Créer un nouveau genre
        </h2>
        <form onSubmit={handleCreate} className="flex gap-3">
          <input
            type="text"
            value={newGenreName}
            onChange={(e) => setNewGenreName(e.target.value)}
            placeholder="Nom du genre (ex: Science Fiction)"
            required
            className="flex-1 px-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-text-primary placeholder:text-text-muted transition-all"
          />
          <button
            type="submit"
            disabled={loading || !newGenreName.trim()}
            className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Créer
          </button>
        </form>
        <p className="text-[10px] text-text-muted mt-2">
          POST /genres — {"{ name: \"...\" }"} → {`{ success, data: { id, name } }`}
        </p>
      </div>

      {/* Genres list */}
      <div className="glass-strong rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <p className="text-sm font-semibold text-text-primary">
            {genres.length} genre{genres.length > 1 ? "s" : ""}
          </p>
        </div>

        {genres.length === 0 ? (
          <div className="p-12 text-center">
            <Tag className="w-10 h-10 text-text-muted mx-auto mb-3" />
            <p className="text-sm text-text-secondary">
              Aucun genre. Créez-en un !
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {genres.map((genre) => (
              <div
                key={genre.id}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-surface/50 transition-colors group"
              >
                {editingId === genre.id ? (
                  /* Edit mode */
                  <div className="flex items-center gap-3 flex-1">
                    <Tag className="w-4 h-4 text-primary flex-shrink-0" />
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveEdit(genre.id);
                        if (e.key === "Escape") setEditingId(null);
                      }}
                      autoFocus
                      className="flex-1 px-3 py-1.5 rounded-lg bg-surface border border-primary text-sm font-medium text-text-primary transition-all"
                    />
                    <button
                      onClick={() => handleSaveEdit(genre.id)}
                      className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center hover:bg-success/20 transition-colors"
                    >
                      <Check className="w-4 h-4 text-success" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="w-8 h-8 rounded-lg hover:bg-surface flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-text-muted" />
                    </button>
                  </div>
                ) : (
                  /* View mode */
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Tag className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-text-primary">
                        {genre.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleStartEdit(genre)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface transition-colors"
                        title="Modifier"
                      >
                        <Pencil className="w-4 h-4 text-text-secondary" />
                      </button>
                      <button
                        onClick={() => handleDelete(genre.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-danger/10 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4 text-danger" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API Documentation */}
      <ApiDocsCard
        title="Endpoints API utilisés"
        subtitle="Requêtes effectuées depuis cette page"
        endpoints={[
          {
            method: "GET",
            path: "/genres",
            description: "Lister tous les genres",
            when: "Au chargement de la page pour afficher la liste des genres",
            response: JSON.stringify({ success: true, message: "Request completed successfully", data: [{ id: "uuid", name: "Science Fiction" }, { id: "uuid", name: "Fantasy" }, { id: "uuid", name: "Roman" }] }, null, 2),
          },
          {
            method: "POST",
            path: "/genres",
            description: "Créer un genre",
            when: "Quand l'utilisateur tape un nom et clique Creer, champ requis: name",
            request: JSON.stringify({ name: "Science Fiction" }, null, 2),
            response: JSON.stringify({ success: true, message: "Request completed successfully", data: { id: "uuid", name: "Science Fiction" } }, null, 2),
          },
          {
            method: "PATCH",
            path: "/genres/:id",
            description: "Modifier un genre",
            when: "Quand l'utilisateur clique sur l'icone crayon, mode edition inline, Enter ou bouton check pour sauvegarder",
            request: JSON.stringify({ name: "Sci-Fi" }, null, 2),
            response: JSON.stringify({ success: true, message: "Request completed successfully", data: { id: "uuid", name: "Sci-Fi" } }, null, 2),
          },
          {
            method: "DELETE",
            path: "/genres/:id",
            description: "Supprimer un genre",
            when: "Quand l'utilisateur clique sur l'icone trash, confirmation, suppression",
            response: JSON.stringify({ success: true, message: "Genre deleted successfully" }, null, 2),
          },
        ]}
      />
    </div>
  );
}

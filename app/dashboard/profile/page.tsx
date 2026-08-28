"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Save,
  Loader2,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Camera,
  Trash2,
  Upload,
  Check,
  User,
  Mail,
  Calendar,
  Settings,
} from "lucide-react";
import { fakeUser } from "@/lib/fake-data";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageDropzone } from "@/components/ui/image-dropzone";

export default function ProfilePage() {
  const [firstName, setFirstName] = useState(fakeUser.firstName);
  const [lastName, setLastName] = useState(fakeUser.lastName);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  // Avatar
  const [avatarUrl, setAvatarUrl] = useState(fakeUser.avatarUrl);
  const [showAvatarSheet, setShowAvatarSheet] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    await new Promise((r) => setTimeout(r, 800));
    setSuccess("Profil mis à jour avec succès");
    setSaving(false);
  };

  const handleAvatarUpload = async () => {
    if (!avatarPreview) return;
    setUploadingAvatar(true);
    await new Promise((r) => setTimeout(r, 1200));
    setAvatarUrl(avatarPreview);
    setUploadingAvatar(false);
    setShowAvatarSheet(false);
    setAvatarPreview(null);
  };

  const handleDeleteAvatar = async () => {
    setAvatarUrl(null);
    setShowDeleteDialog(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangingPassword(true);
    setPasswordSuccess("");
    await new Promise((r) => setTimeout(r, 800));
    setPasswordSuccess("Mot de passe changé avec succès");
    setCurrentPassword("");
    setNewPassword("");
    setChangingPassword(false);
  };

  const initials = `${firstName[0]}${lastName[0]}`;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Mon Profil</h1>
        <p className="text-text-secondary mt-1">Gérez vos informations et votre avatar</p>
      </div>

      {/* Profile Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#263e2a] via-[#3f6343] to-[#72966a] p-8 text-white shadow-xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full" />

        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-8">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-28 h-28 rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-lg">
              {avatarUrl ? (
                <Image src={avatarUrl} alt="Avatar" width={112} height={112} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-3xl font-black">{initials}</span>
                </div>
              )}
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button
                onClick={() => setShowAvatarSheet(true)}
                className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all hover:scale-110 shadow-lg"
              >
                <Camera className="w-4 h-4 text-text-primary" />
              </button>
              {avatarUrl && (
                <button
                  onClick={() => setShowDeleteDialog(true)}
                  className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all hover:scale-110 shadow-lg"
                >
                  <Trash2 className="w-4 h-4 text-danger" />
                </button>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-bold">{firstName} {lastName}</h2>
            <p className="text-white/70 mt-1">{fakeUser.email}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-sm text-white/60">
                <Calendar className="w-4 h-4" />
                <span>Membre depuis {new Date(fakeUser.createdAt).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</span>
              </div>
              {fakeUser.isVerified && (
                <div className="flex items-center gap-1.5 text-sm text-white/60">
                  <Check className="w-4 h-4 text-green-300" />
                  <span>Email vérifié</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Profile Form */}
        <div className="glass-strong rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-[#53764b]/10 flex items-center justify-center">
              <User className="w-5 h-5 text-[#53764b]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-primary">Informations</h2>
              <p className="text-xs text-text-muted">Modifier vos données personnelles</p>
            </div>
          </div>

          {success && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#4f8a61]/10 border border-[#4f8a61]/20">
              <Check className="w-4 h-4 text-[#4f8a61]" />
              <p className="text-sm font-medium text-[#4f8a61]">{success}</p>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Prénom</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/60 border border-[#53764b]/15 text-sm font-medium text-text-primary placeholder:text-text-muted transition-all hover:border-[#53764b]/35"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Nom</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/60 border border-[#53764b]/15 text-sm font-medium text-text-primary placeholder:text-text-muted transition-all hover:border-[#53764b]/35"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="email"
                  value={fakeUser.email}
                  disabled
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/40 border border-[#53764b]/15 text-sm font-medium text-text-muted cursor-not-allowed"
                />
              </div>
            </div>

            <Button type="submit" disabled={saving} className="w-full gap-2 py-3 rounded-xl font-semibold">
              {saving ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Sauvegarde...</>
              ) : (
                <><Save className="w-4 h-4" /> Sauvegarder les modifications</>
              )}
            </Button>
          </form>
        </div>

        {/* Password */}
        <div className="glass-strong rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-[#b85e55]/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#b85e55]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-primary">Sécurité</h2>
              <p className="text-xs text-text-muted">Changer votre mot de passe</p>
            </div>
          </div>

          {passwordSuccess && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#4f8a61]/10 border border-[#4f8a61]/20">
              <Check className="w-4 h-4 text-[#4f8a61]" />
              <p className="text-sm font-medium text-[#4f8a61]">{passwordSuccess}</p>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">Mot de passe actuel</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/60 border border-[#53764b]/15 text-sm font-medium text-text-primary placeholder:text-text-muted transition-all hover:border-[#53764b]/35"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">Nouveau mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="Min. 8 caractères"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/60 border border-[#53764b]/15 text-sm font-medium text-text-primary placeholder:text-text-muted transition-all hover:border-[#53764b]/35"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {newPassword.length > 0 && newPassword.length < 8 && (
                <p className="text-xs text-[#b85e55] mt-1.5">Minimum 8 caractères</p>
              )}
            </div>

            <Button
              type="submit"
              variant="destructive"
              disabled={changingPassword || !currentPassword || newPassword.length < 8}
              className="w-full gap-2 py-3 rounded-xl font-semibold"
            >
              {changingPassword ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Changement...</>
              ) : (
                <><Lock className="w-4 h-4" /> Changer le mot de passe</>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* API Reference */}
      <div className="glass-strong rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="w-4 h-4 text-text-muted" />
          <h3 className="text-sm font-bold text-text-primary">Endpoints API</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-2 text-xs font-mono text-text-secondary">
          <p><span className="text-[#5BA3D9] font-semibold">GET</span> /users/me — Voir le profil</p>
          <p><span className="text-[#E8A838] font-semibold">PATCH</span> /users/me — Modifier</p>
          <p><span className="text-[#E8A838] font-semibold">PATCH</span> /users/me/avatar — Upload</p>
          <p><span className="text-[#b85e55] font-semibold">DELETE</span> /users/me/avatar — Supprimer</p>
        </div>
      </div>

      {/* ===== AVATAR UPLOAD SHEET ===== */}
      <Sheet open={showAvatarSheet} onOpenChange={setShowAvatarSheet}>
        <SheetContent side="bottom" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Changer la photo de profil</SheetTitle>
            <SheetDescription>Formats: jpg, png, gif, webp. Max: 5 MB.</SheetDescription>
          </SheetHeader>
          <div className="space-y-4 px-4 pb-4">
            <ImageDropzone
              preview={avatarPreview}
              onFile={(_file, preview) => setAvatarPreview(preview)}
              onClear={() => setAvatarPreview(null)}
              maxSize={5 * 1024 * 1024}
              label="Glissez votre photo ici"
              description="ou cliquez pour sélectionner"
            />
            <Button className="w-full py-3 rounded-xl" onClick={handleAvatarUpload} disabled={!avatarPreview || uploadingAvatar}>
              {uploadingAvatar ? <><Loader2 className="w-4 h-4 animate-spin" /> Upload...</> : <><Upload className="w-4 h-4" /> Uploader</>}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ===== DELETE AVATAR DIALOG ===== */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle>Supprimer la photo ?</DialogTitle>
            <DialogDescription>Votre avatar sera supprimé et remplacé par vos initiales.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} className="rounded-xl">Annuler</Button>
            <Button variant="destructive" onClick={handleDeleteAvatar} className="gap-1.5 rounded-xl">
              <Trash2 className="w-4 h-4" /> Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

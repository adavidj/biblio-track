"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { authApi } from "@/lib/api";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authApi.resetPassword({ email, code, newPassword });
      setSuccess(true);
    } catch (err: unknown) {
      setError(
        (err as { message?: string }).message ||
          "Erreur lors de la réinitialisation"
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="glass-strong rounded-2xl p-8 shadow-xl text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Mot de passe réinitialisé ✅
        </h1>
        <p className="text-sm text-text-secondary mb-6">
          Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
        </p>
        <button
          onClick={() => router.push("/auth/login")}
          className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-sm"
        >
          Se connecter
        </button>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-2xl p-8 shadow-xl">
      <h1 className="text-2xl font-bold text-text-primary mb-2 text-center">
        Nouveau mot de passe 🔒
      </h1>
      <p className="text-sm text-text-secondary text-center mb-8">
        Entrez le code reçu et votre nouveau mot de passe
      </p>

      {error && (
        <div className="bg-danger/10 border border-danger/20 text-danger text-sm rounded-xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">
            Code de réinitialisation
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="6 chiffres"
            required
            maxLength={6}
            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-text-muted text-sm font-medium text-center tracking-[0.3em] transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">
            Nouveau mot de passe
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min. 8 caractères"
              required
              minLength={8}
              className="w-full pl-10 pr-11 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-text-muted text-sm font-medium transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || code.length !== 6 || newPassword.length < 8}
          className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Réinitialisation...
            </>
          ) : (
            "Réinitialiser le mot de passe"
          )}
        </button>
      </form>

      <div className="text-center mt-6">
        <Link
          href="/auth/login"
          className="text-sm text-text-secondary hover:text-primary transition-colors"
        >
          ← Retour à la connexion
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="glass-strong rounded-2xl p-8 shadow-xl flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}

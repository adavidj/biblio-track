"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { authApi } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authApi.forgotPassword({ email });
      setSuccess(true);
    } catch {
      setSuccess(true); // always show success for security
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
          Email envoyé ✉️
        </h1>
        <p className="text-sm text-text-secondary mb-6">
          Si un compte existe pour <strong>{email}</strong>, vous recevrez un code de réinitialisation.
        </p>
        <Link
          href={`/auth/reset-password?email=${encodeURIComponent(email)}`}
          className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-sm"
        >
          Entrer le code
        </Link>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-2xl p-8 shadow-xl">
      <h1 className="text-2xl font-bold text-text-primary mb-2 text-center">
        Mot de passe oublié 🔑
      </h1>
      <p className="text-sm text-text-secondary text-center mb-8">
        Entrez votre email et nous vous enverrons un code de réinitialisation
      </p>

      {error && (
        <div className="bg-danger/10 border border-danger/20 text-danger text-sm rounded-xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-text-muted text-sm font-medium transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Envoi...
            </>
          ) : (
            "Envoyer le code"
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

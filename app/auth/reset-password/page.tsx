"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Eye, EyeOff, Loader2, Lock } from "lucide-react";

import { authApi } from "@/lib/api";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? searchParams.get("code") ?? "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await authApi.resetPassword({
        email,
        code: token,
        newPassword,
      });
      router.push("/auth/login");
    } catch (requestError: unknown) {
      setError(
        (requestError as { message?: string }).message ??
          "Impossible de réinitialiser votre mot de passe. Demandez un nouveau lien et réessayez."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#fffdf8]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 sm:px-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <section className="flex min-h-screen w-full flex-col lg:min-h-0">
          <Brand />

          <div className="flex flex-1 items-center py-12 sm:py-14 lg:py-10">
            <div className="w-full max-w-125">
              <div className="mb-7 sm:mb-8 md:mb-9">
                <p className="mb-4 inline-flex items-center rounded-full border border-[#bac6af] bg-[#fdfaf2]/75 px-3.5 py-2 text-[10px] 
                              font-bold uppercase tracking-[0.14em] text-[#466145] sm:text-xs">
                  Nouveau mot de passe
                </p>
                <h1 className="max-w-125 font-serif text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[0.98] tracking-[-0.045em] text-[#1a1a1a]">
                  Créez un nouveau mot de passe.
                </h1>
                <p className="mt-5 max-w-115 text-[clamp(0.85rem,1.15vw,1rem)] leading-7 text-[#6b6b64]">
                  Choisissez un mot de passe robuste pour sécuriser à nouveau votre compte BiblioTrack.
                </p>
              </div>

              {error && (
                <div className="mb-6 rounded-xl border border-[#e4b7a4] bg-[#f9e9e2] px-4 py-3 text-[13px] text-[#a85f3e]">
                  {error}
                </div>
              )}

              <form className="w-full space-y-4" onSubmit={handleSubmit}>
                <PasswordField
                  autoComplete="new-password"
                  id="new-password"
                  label="Nouveau mot de passe"
                  onChange={setNewPassword}
                  placeholder="Au moins 8 caractères"
                  showPassword={showNewPassword}
                  toggleVisibility={() => setShowNewPassword((visible) => !visible)}
                  value={newPassword}
                />
                <PasswordField
                  autoComplete="new-password"
                  id="confirm-password"
                  label="Confirmer le mot de passe"
                  onChange={setConfirmPassword}
                  placeholder="Saisissez-le à nouveau"
                  showPassword={showConfirmPassword}
                  toggleVisibility={() => setShowConfirmPassword((visible) => !visible)}
                  value={confirmPassword}
                />

                <button
                  className="mt-2 inline-flex h-[clamp(45px,3.4vw,52px)] w-full items-center justify-center gap-2 rounded-xl bg-[#314c35] px-5 text-[13px] font-bold text-white shadow-[0_12px_28px_rgba(130,71,42,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#263e2a] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:text-[14px]"
                  disabled={loading || newPassword.length < 8 || confirmPassword.length < 8}
                  type="submit"
                >
                  {loading ? (
                    <>
                      <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                      Réinitialisation...
                    </>
                  ) : (
                    "Réinitialiser le mot de passe"
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-[12px] text-[#77746c] sm:text-[13px]">
                Vous vous souvenez de votre mot de passe ?{" "}
                <Link className="font-semibold text-[#344334] underline underline-offset-2 transition-opacity hover:opacity-70" href="/auth/login">
                  Se connecter
                </Link>
              </p>
              <p className="mx-auto mt-5 max-w-107.5 px-2 text-center text-[10.5px] leading-5 text-[#aaa79e] sm:text-[11px]">
                Votre nouveau mot de passe doit contenir au minimum 8 caractères.
              </p>
            </div>
          </div>
        </section>

        <AuthVisual />
      </div>
    </main>
  );
}

function Brand() {
  return (
    <div className="pt-8 sm:pt-9 lg:pt-0">
      <Link className="flex w-fit items-center gap-2.5 transition-opacity hover:opacity-80" href="/">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#314c35] sm:size-10">
          <BookOpen aria-hidden="true" className="size-4.5 text-white sm:size-5" strokeWidth={1.8} />
        </span>
        <span className="whitespace-nowrap text-[17px] font-semibold tracking-[-0.02em] text-[#1a1a1a] sm:text-[18px] md:text-[19px]">
          BiblioTrack
        </span>
      </Link>
    </div>
  );
}

interface PasswordFieldProps {
  autoComplete: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  showPassword: boolean;
  toggleVisibility: () => void;
  value: string;
}

function PasswordField({
  autoComplete,
  id,
  label,
  onChange,
  placeholder,
  showPassword,
  toggleVisibility,
  value,
}: PasswordFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-[12px] font-medium text-[#33332f] sm:text-[13px]" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <Lock aria-hidden="true" className="absolute left-4 top-1/2 size-4.25 -translate-y-1/2 text-[#9b9990]" strokeWidth={1.7} />
        <input
          autoComplete={autoComplete}
          className="h-[clamp(45px,3.4vw,52px)] w-full rounded-xl border border-[#e4e1d8] bg-white pl-11 pr-12 text-[13px] text-[#1a1a1a] 
          outline-none transition-all placeholder:text-[#aaa79e] focus:border-[#aaa69b] focus:ring-4 focus:ring-[#1a1a1a]/4 sm:text-[14px]"
          id={id}
          minLength={8}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required
          type={showPassword ? "text" : "password"}
          value={value}
        />
        <button
          aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[#9b9990] transition-colors hover:text-[#1a1a1a]"
          onClick={toggleVisibility}
          type="button"
        >
          {showPassword ? <EyeOff className="size-4.25" strokeWidth={1.7} /> : <Eye className="size-4.25" strokeWidth={1.7} />}
        </button>
      </div>
    </div>
  );
}

function AuthVisual() {
  return (
    <section className="hidden w-full lg:flex lg:items-center lg:justify-end">
      <div className="relative aspect-[0.82/1] w-full max-w-130 overflow-hidden rounded-[1.4rem] border border-[#d3d6c9] bg-[#e8e5dc] shadow-[0_25px_60px_rgba(50,61,42,0.12)]">
        <video autoPlay className="absolute inset-0 size-full object-cover" loop muted playsInline preload="auto">
          <source src="/videos/auth/auth-video.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <ResetPasswordForm />
    </Suspense>
  );
}

function LoadingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffdf8]">
      <Loader2 aria-label="Chargement" className="size-7 animate-spin text-[#314c35]" strokeWidth={1.7} />
    </main>
  );
}

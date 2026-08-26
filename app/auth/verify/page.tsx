"use client";

import { Suspense, useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Loader2, RefreshCw } from "lucide-react";
import { authApi } from "@/lib/api";

function VerifyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleVerify = async (fullCode?: string) => {
    const codeToVerify = fullCode || code.join("");
    if (codeToVerify.length !== 6) return;
    setError("");
    setLoading(true);
    try {
      const res = await authApi.verifyOtp({ email, code: codeToVerify });
      if (res.success) {
        router.push("/auth/login");
      }
    } catch (err: unknown) {
      setError((err as { message?: string }).message || "Code invalide");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = useCallback(
    (index: number, value: string) => {
      if (value.length > 1) value = value.slice(-1);
      if (value && !/^\d$/.test(value)) return;
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        const next = document.querySelector(
          `input[data-index="${index + 1}"]`
        ) as HTMLInputElement;
        if (next) next.focus();
      }
      if (value && index === 5) {
        const fullCode = newCode.join("");
        if (fullCode.length === 6) handleVerify(fullCode);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [code]
  );

  const handleResend = async () => {
    setResending(true);
    try {
      await authApi.resendOtp({ email });
      setCooldown(60);
    } catch {
      // silent
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="glass-strong rounded-2xl p-8 shadow-xl">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <ShieldCheck className="w-8 h-8 text-primary" />
      </div>

      <h1 className="text-2xl font-bold text-text-primary mb-2 text-center">
        Vérification 📧
      </h1>
      <p className="text-sm text-text-secondary text-center mb-8">
        Entrez le code à 6 chiffres envoyé à
        <br />
        <strong className="text-text-primary">{email}</strong>
      </p>

      {error && (
        <div className="bg-danger/10 border border-danger/20 text-danger text-sm rounded-xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      <div className="flex justify-center gap-2.5 mb-8">
        {code.map((digit, i) => (
          <input
            key={i}
            data-index={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !digit && i > 0) {
                const prev = document.querySelector(
                  `input[data-index="${i - 1}"]`
                ) as HTMLInputElement;
                if (prev) prev.focus();
              }
            }}
            className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-surface border border-border text-text-primary transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        ))}
      </div>

      <button
        onClick={() => handleVerify()}
        disabled={loading || code.join("").length !== 6}
        className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-50 mb-4"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Vérification...
          </>
        ) : (
          "Vérifier"
        )}
      </button>

      <div className="text-center">
        <button
          onClick={handleResend}
          disabled={resending || cooldown > 0}
          className="text-sm font-medium text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`} />
          {cooldown > 0
            ? `Renvoyer dans ${cooldown}s`
            : "Renvoyer le code"}
        </button>
      </div>

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

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="glass-strong rounded-2xl p-8 shadow-xl flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      }
    >
      <VerifyForm />
    </Suspense>
  );
}

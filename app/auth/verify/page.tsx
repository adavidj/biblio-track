"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Loader2, RefreshCw, ShieldCheck } from "lucide-react";

import { authApi } from "@/lib/api";

const OTP_LENGTH = 6;
const OTP_LIFETIME_SECONDS = 60;

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const expiryHandledRef = useRef(false);

  const [code, setCode] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [secondsRemaining, setSecondsRemaining] =
    useState(OTP_LIFETIME_SECONDS);
  const [error, setError] = useState("");

  const resendCode = useCallback(
    async (isAutomatic = false) => {
      if (!email || resending) return;

      setResending(true);
      setError("");

      try {
        await authApi.resendOtp({ email });
        setCode(Array(OTP_LENGTH).fill(""));
        setSecondsRemaining(OTP_LIFETIME_SECONDS);
        expiryHandledRef.current = false;
        inputRefs.current[0]?.focus();

        if (isAutomatic) {
          setError("Votre code a expiré. Un nouveau code vient d’être envoyé.");
        }
      } catch (requestError: unknown) {
        setError(
          (requestError as { message?: string }).message ??
            "Impossible d’envoyer un nouveau code. Réessayez dans un instant.",
        );
      } finally {
        setResending(false);
      }
    },
    [email, resending],
  );

  useEffect(() => {
    if (secondsRemaining > 0) {
      const timer = window.setTimeout(() => {
        setSecondsRemaining((current) => current - 1);
      }, 1000);

      return () => window.clearTimeout(timer);
    }

    if (secondsRemaining === 0 && !expiryHandledRef.current) {
      expiryHandledRef.current = true;
      void resendCode(true);
    }
  }, [resendCode, secondsRemaining]);

  async function handleVerify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const otp = code.join("");
    if (otp.length !== OTP_LENGTH) return;

    setError("");
    setLoading(true);

    try {
      await authApi.verifyOtp({ email, code: otp });
      router.push("/dashboard");
    } catch (requestError: unknown) {
      setError(
        (requestError as { message?: string }).message ??
          "Ce code est invalide ou a expiré.",
      );
    } finally {
      setLoading(false);
    }
  }

  function updateCode(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextCode = [...code];
    nextCode[index] = digit;
    setCode(nextCode);
    setError("");

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    const pastedCode = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pastedCode) return;

    event.preventDefault();
    const nextCode = Array.from(
      { length: OTP_LENGTH },
      (_, index) => pastedCode[index] ?? "",
    );
    setCode(nextCode);
    setError("");
    inputRefs.current[Math.min(pastedCode.length, OTP_LENGTH) - 1]?.focus();
  }

  const canVerify = code.join("").length === OTP_LENGTH;
  const formattedTime = `00:${Math.max(secondsRemaining, 0).toString().padStart(2, "0")}`;

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#fffdf8]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 sm:px-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <section className="flex min-h-screen w-full flex-col lg:min-h-0">
          <Brand />

          <div className="flex flex-1 items-center py-12 sm:py-14 lg:py-10">
            <div className="w-full max-w-125">
              <div className="mb-7 sm:mb-8 md:mb-9">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#bac6af] bg-[#fdfaf2]/75 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#466145] sm:text-xs">
                  <ShieldCheck aria-hidden="true" className="size-3.5" />
                  Connexion sécurisée
                </p>
                <h1 className="max-w-125 font-serif text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[0.98] tracking-[-0.045em] text-[#1a1a1a]">
                  Vérifiez votre connexion.
                </h1>
                <p className="mt-5 max-w-115 text-[clamp(0.85rem,1.15vw,1rem)] leading-7 text-[#6b6b64]">
                  Saisissez le code à six chiffres envoyé à{" "}
                  <strong className="font-semibold text-[#33332f]">
                    {email || "votre adresse e-mail"}
                  </strong>
                  .
                </p>
              </div>

              {error && (
                <div className="mb-6 rounded-xl border border-[#e4b7a4] bg-[#f9e9e2] px-4 py-3 text-[13px] leading-6 text-[#a85f3e]">
                  {error}
                </div>
              )}

              <form className="w-full" onSubmit={handleVerify}>
                <div className="flex justify-between gap-2 sm:gap-3">
                  {code.map((digit, index) => (
                    <input
                      aria-label={`Chiffre ${index + 1} du code`}
                      className="h-12 min-w-0 flex-1 rounded-xl border border-[#e4e1d8] bg-white text-center text-lg font-semibold 
                                text-[#1a1a1a] outline-none transition-all focus:border-[#7f9e7a] focus:ring-4 focus:ring-[#315a3d]/8 sm:h-14 sm:text-xl"
                      data-index={index}
                      inputMode="numeric"
                      key={index}
                      maxLength={1}
                      onChange={(event) =>
                        updateCode(index, event.target.value)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Backspace" && !digit && index > 0) {
                          inputRefs.current[index - 1]?.focus();
                        }
                      }}
                      onPaste={index === 0 ? handlePaste : undefined}
                      ref={(element) => {
                        inputRefs.current[index] = element;
                      }}
                      type="text"
                      value={digit}
                    />
                  ))}
                </div>

                <button
                  className="mt-7 inline-flex h-[clamp(45px,3.4vw,52px)] w-full items-center justify-center gap-2 rounded-xl bg-[#314c35] px-5 text-[13px] 
                              font-bold text-white shadow-[0_12px_28px_rgba(130,71,42,0.16)] transition-all duration-200 hover:-translate-y-0.5
                                 hover:bg-[#263e2a] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:text-[14px]"
                  disabled={loading || !canVerify}
                  type="submit"
                >
                  {loading ? (
                    <>
                      <Loader2
                        aria-hidden="true"
                        className="size-4 animate-spin"
                      />
                      Vérification...
                    </>
                  ) : (
                    "Confirmer le code"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-[12px] text-[#77746c] sm:text-[13px]">
                  Ce code expire dans{" "}
                  <span className="font-semibold text-[#344334]">
                    {formattedTime}
                  </span>
                  .
                </p>
                <button
                  className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#344334] underline underline-offset-2 transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50 sm:text-[13px]"
                  disabled={resending || secondsRemaining > 0}
                  onClick={() => void resendCode()}
                  type="button"
                >
                  <RefreshCw
                    aria-hidden="true"
                    className={`size-3.5 ${resending ? "animate-spin" : ""}`}
                  />
                  {resending ? "Envoi en cours..." : "Renvoyer un code"}
                </button>
              </div>

              <p className="mt-7 text-center text-[12px] text-[#77746c] sm:text-[13px]">
                Ce n&apos;est pas votre adresse ?{" "}
                <Link
                  className="font-semibold text-[#344334] underline underline-offset-2 transition-opacity hover:opacity-70"
                  href="/auth/login"
                >
                  Retour à la connexion
                </Link>
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
      <Link
        className="flex w-fit items-center gap-2.5 transition-opacity hover:opacity-80"
        href="/"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#314c35] sm:size-10">
          <BookOpen
            aria-hidden="true"
            className="size-4.5 text-white sm:size-5"
            strokeWidth={1.8}
          />
        </span>
        <span className="whitespace-nowrap text-[17px] font-semibold tracking-[-0.02em] text-[#1a1a1a] sm:text-[18px] md:text-[19px]">
          BiblioTrack
        </span>
      </Link>
    </div>
  );
}

function AuthVisual() {
  return (
    <section className="hidden w-full lg:flex lg:items-center lg:justify-end">
      <div className="relative aspect-[0.82/1] w-full max-w-130 overflow-hidden rounded-[1.4rem] border border-[#d3d6c9] bg-[#e8e5dc] 
                        shadow-[0_25px_60px_rgba(50,61,42,0.12)]">
        <video
          autoPlay
          className="absolute inset-0 size-full object-cover"
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/auth/auth-video.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <VerifyForm />
    </Suspense>
  );
}

function LoadingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffdf8]">
      <Loader2
        aria-label="Chargement"
        className="size-7 animate-spin text-[#314c35]"
        strokeWidth={1.7}
      />
    </main>
  );
}

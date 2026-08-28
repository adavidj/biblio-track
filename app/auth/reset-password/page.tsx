
"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
} from "lucide-react";
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
      await authApi.resetPassword({
        email,
        code,
        newPassword,
      });

      setSuccess(true);
    } catch (err: unknown) {
      setError(
        (err as { message?: string }).message ||
          "Impossible de réinitialiser votre mot de passe."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     SUCCESS
  ========================================================= */
  if (success) {
    return (
      <main className="min-h-screen w-full overflow-x-hidden bg-[#fffdf8]">
        <div
          className="
            mx-auto
            flex
            min-h-screen
            w-full
            max-w-7xl
            flex-col
            px-6
            sm:px-8
            lg:grid
            lg:grid-cols-[1.05fr_0.95fr]
            lg:items-center
            lg:gap-14
          "
        >
          {/* =====================================================
              LEFT
          ===================================================== */}
          <section className="flex min-h-screen w-full flex-col lg:min-h-0">

            {/* LOGO */}
            <div className="pt-8 sm:pt-9 lg:pt-0">
              <Link
                href="/"
                className="
                  flex
                  w-fit
                  items-center
                  gap-2.5
                  transition-opacity
                  hover:opacity-80
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                     bg-[#314c35]
                    sm:h-10
                    sm:w-10
                  "
                >
                  <BookOpen
                    className="h-[18px] w-[18px] text-white sm:h-5 sm:w-5"
                    strokeWidth={1.8}
                  />
                </div>

                <span
                  className="
                    whitespace-nowrap
                    text-[17px]
                    font-semibold
                    tracking-[-0.02em]
                    text-[#1a1a1a]
                    sm:text-[18px]
                    md:text-[19px]
                  "
                >
                  BiblioTrack
                </span>
              </Link>
            </div>

            {/* SUCCESS CONTENT */}
            <div className="flex flex-1 items-center py-12 sm:py-14 lg:py-10">
              <div className="w-full max-w-[500px]">

                <div className="mb-8 sm:mb-9">

                  {/* BADGE */}
                  <p
                    className="
                      mb-4
                      inline-flex
                      items-center
                      rounded-full
                      border
                      border-[#bac6af]
                      bg-[#fdfaf2]/75
                      px-3.5
                      py-2
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-[#466145]
                      sm:text-xs
                    "
                  >
                    Sécurité du compte
                  </p>

                  {/* ICON */}
                  <div
                    className="
                      mb-5
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-[#e3eedb]
                    "
                  >
                    <CheckCircle2
                      className="h-6 w-6 text-[#466145]"
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* TITLE */}
                  <h1
                    className="
                      max-w-[500px]
                      font-serif
                      font-normal
                      leading-[0.98]
                      tracking-[-0.045em]
                      text-[#1a1a1a]
                      text-[clamp(2rem,4vw,3.25rem)]
                    "
                  >
                    Votre mot de passe
                    <br />
                    a été réinitialisé.
                  </h1>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      mt-5
                      max-w-[460px]
                      text-[clamp(0.85rem,1.15vw,1rem)]
                      leading-7
                      text-[#6b6b64]
                    "
                  >
                    Votre nouveau mot de passe est maintenant actif.
                    Vous pouvez retrouver votre bibliothèque et poursuivre
                    vos lectures en toute sécurité.
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={() => router.push("/auth/login")}
                  className="
                    inline-flex
                    h-[clamp(45px,3.4vw,52px)]
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                   bg-[#314c35]
                    px-5
                    text-[13px]
                    font-bold
                    text-white
                    shadow-[0_12px_28px_rgba(130,71,42,0.16)]
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-[#263e2a]
                    active:translate-y-0
                    sm:text-[14px]
                  "
                >
                  Se connecter
                </button>

                <p
                  className="
                    mt-6
                    text-center
                    text-[12px]
                    text-[#77746c]
                    sm:text-[13px]
                  "
                >
                  Votre compte est maintenant sécurisé.
                </p>
              </div>
            </div>
          </section>

          {/* =====================================================
              RIGHT — VIDEO
          ===================================================== */}
          <section className="relative hidden w-full lg:block">
            <div
              className="
                relative
                mx-auto
                w-full
                max-w-md
                py-6
                lg:max-w-none
              "
            >
              {/* HALO */}
              <div
                className="
                  absolute
                  inset-0
                  mx-auto
                  size-64
                  rounded-full
                  bg-[#dce5d1]
                  blur-2xl
                  sm:size-72
                "
              />

              {/* VIDEO CONTAINER */}
              <div
                className="
                  relative
                  ml-auto
                  max-w-[430px]
                  rotate-[3deg]
                  overflow-hidden
                  rounded-[1.25rem]
                  border
                  border-[#d3d6c9]
                  bg-[#fffdf8]
                  p-1.5
                  shadow-[0_20px_50px_rgba(50,61,42,0.16)]
                "
              >
                <div className="relative overflow-hidden rounded-[0.95rem]">
                  <video
                    className="
                      block
                      h-auto
                      w-full
                      object-cover
                    "
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source
                      src="/videos/auth/auth-video.mp4"
                      type="video/mp4"
                    />
                  </video>

                  {/* OVERLAY */}
                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      bg-gradient-to-t
                      from-black/45
                      via-black/10
                      to-transparent
                      p-5
                      pt-20
                    "
                  >
                    <p className="text-xs font-medium text-white/75">
                      BiblioTrack
                    </p>

                    <p className="mt-1 font-serif text-xl leading-tight text-white sm:text-2xl">
                      Votre bibliothèque,
                      <br />
                      toujours avec vous.
                    </p>
                  </div>
                </div>
              </div>

              {/* FLOATING CARD */}
              <div
                className="
                  absolute
                  -bottom-1
                  -left-3
                  z-10
                  w-fit
                  rounded-2xl
                  border
                  border-[#d3d6c9]
                  bg-[#fffdf8]
                  px-3.5
                  py-2.5
                  shadow-lg
                  sm:-left-5
                "
              >
                <p className="text-[11px] text-[#697167]">
                  Compte sécurisé
                </p>

                <p className="mt-0.5 font-serif text-xl text-[#ad653f]">
                  prêt à continuer
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  /* =========================================================
     FORM
  ========================================================= */
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#fffdf8]">
      <div
        className="
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-7xl
          flex-col
          px-6
          sm:px-8
          lg:grid
          lg:grid-cols-[1.05fr_0.95fr]
          lg:items-center
          lg:gap-14
        "
      >
        {/* =====================================================
            LEFT — AUTHENTICATION
        ===================================================== */}
        <section className="flex min-h-screen w-full flex-col lg:min-h-0">

          {/* LOGO */}
          <div className="pt-8 sm:pt-9 lg:pt-0">
            <Link
              href="/"
              className="
                flex
                w-fit
                items-center
                gap-2.5
                transition-opacity
                hover:opacity-80
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                   bg-[#314c35]
                  sm:h-10
                  sm:w-10
                "
              >
                <BookOpen
                  className="h-[18px] w-[18px] text-white sm:h-5 sm:w-5"
                  strokeWidth={1.8}
                />
              </div>

              <span
                className="
                  whitespace-nowrap
                  text-[17px]
                  font-semibold
                  tracking-[-0.02em]
                  text-[#1a1a1a]
                  sm:text-[18px]
                  md:text-[19px]
                "
              >
                BiblioTrack
              </span>
            </Link>
          </div>

          {/* CONTENT */}
          <div className="flex flex-1 items-center py-12 sm:py-14 lg:py-10">
            <div className="w-full max-w-[500px]">

              {/* HEADING */}
              <div className="mb-7 sm:mb-8 md:mb-9">

                <p
                  className="
                    mb-4
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-[#bac6af]
                    bg-[#fdfaf2]/75
                    px-3.5
                    py-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-[#466145]
                    sm:text-xs
                  "
                >
                  Nouveau mot de passe
                </p>

                <h1
                  className="
                    max-w-[500px]
                    font-serif
                    font-normal
                    leading-[0.98]
                    tracking-[-0.045em]
                    text-[#1a1a1a]
                    text-[clamp(2rem,4vw,3.25rem)]
                  "
                >
                  Sécurisez à nouveau
                  <br />
                  votre compte.
                </h1>

                <p
                  className="
                    mt-5
                    max-w-[460px]
                    text-[clamp(0.85rem,1.15vw,1rem)]
                    leading-7
                    text-[#6b6b64]
                  "
                >
                  Entrez le code reçu par e-mail puis choisissez un
                  nouveau mot de passe pour retrouver l'accès à votre
                  bibliothèque.
                </p>
              </div>

              {/* ERROR */}
              {error && (
                <div
                  className="
                    mb-6
                    rounded-xl
                    border
                    border-[#e4b7a4]
                    bg-[#f9e9e2]
                    px-4
                    py-3
                    text-[13px]
                    text-[#a85f3e]
                  "
                >
                  {error}
                </div>
              )}

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="w-full space-y-4"
              >

                {/* CODE */}
                <div className="space-y-2">
                  <label
                    htmlFor="code"
                    className="
                      block
                      text-[12px]
                      font-medium
                      text-[#33332f]
                      sm:text-[13px]
                    "
                  >
                    Code de réinitialisation
                  </label>

                  <input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) =>
                      setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="000000"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    maxLength={6}
                    className="
                      h-[clamp(45px,3.4vw,52px)]
                      w-full
                      rounded-xl
                      border
                      border-[#e4e1d8]
                      bg-white
                      px-4
                      text-center
                      text-[15px]
                      font-semibold
                      tracking-[0.35em]
                      text-[#1a1a1a]
                      outline-none
                      transition-all
                      placeholder:text-[#aaa79e]
                      placeholder:tracking-[0.3em]
                      focus:border-[#aaa69b]
                      focus:ring-4
                      focus:ring-[#1a1a1a]/[0.04]
                      sm:px-5
                    "
                  />
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <label
                    htmlFor="new-password"
                    className="
                      block
                      text-[12px]
                      font-medium
                      text-[#33332f]
                      sm:text-[13px]
                    "
                  >
                    Nouveau mot de passe
                  </label>

                  <div className="relative">
                    <Lock
                      className="
                        absolute
                        left-4
                        top-1/2
                        h-[17px]
                        w-[17px]
                        -translate-y-1/2
                        text-[#9b9990]
                      "
                      strokeWidth={1.7}
                    />

                    <input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) =>
                        setNewPassword(e.target.value)
                      }
                      placeholder="Min. 8 caractères"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      className="
                        h-[clamp(45px,3.4vw,52px)]
                        w-full
                        rounded-xl
                        border
                        border-[#e4e1d8]
                        bg-white
                        pl-11
                        pr-12
                        text-[13px]
                        text-[#1a1a1a]
                        outline-none
                        transition-all
                        placeholder:text-[#aaa79e]
                        focus:border-[#aaa69b]
                        focus:ring-4
                        focus:ring-[#1a1a1a]/[0.04]
                        sm:text-[14px]
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((value) => !value)
                      }
                      aria-label={
                        showPassword
                          ? "Masquer le mot de passe"
                          : "Afficher le mot de passe"
                      }
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        rounded-md
                        p-1.5
                        text-[#9b9990]
                        transition-colors
                        hover:text-[#1a1a1a]
                      "
                    >
                      {showPassword ? (
                        <EyeOff size={17} strokeWidth={1.7} />
                      ) : (
                        <Eye size={17} strokeWidth={1.7} />
                      )}
                    </button>
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={
                    loading ||
                    code.length !== 6 ||
                    newPassword.length < 8
                  }
                  className="
                    mt-2
                    inline-flex
                    h-[clamp(45px,3.4vw,52px)]
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                     bg-[#314c35]
                    px-5
                    text-[13px]
                    font-bold
                    text-white
                    shadow-[0_12px_28px_rgba(130,71,42,0.16)]
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-[#263e2a]
                    active:translate-y-0
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    sm:text-[14px]
                  "
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Réinitialisation...
                    </>
                  ) : (
                    "Réinitialiser le mot de passe"
                  )}
                </button>
              </form>

              {/* BACK TO LOGIN */}
              <p
                className="
                  mt-6
                  text-center
                  text-[12px]
                  text-[#77746c]
                  sm:text-[13px]
                "
              >
                Vous préférez vous connecter ?{" "}
                <Link
                  href="/auth/login"
                  className="
                    font-semibold
                    text-[#344334]
                    underline
                    underline-offset-2
                    transition-opacity
                    hover:opacity-70
                  "
                >
                  Se connecter
                </Link>
              </p>

              {/* INFO */}
              <p
                className="
                  mx-auto
                  mt-5
                  max-w-[430px]
                  px-2
                  text-center
                  text-[10.5px]
                  leading-5
                  text-[#aaa79e]
                  sm:text-[11px]
                "
              >
                Votre nouveau mot de passe doit contenir au minimum
                8 caractères.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT — VIDEO
        ===================================================== */}
        <section className="relative hidden w-full lg:block">
          <div
            className="
              relative
              mx-auto
              w-full
              max-w-md
              py-6
              lg:max-w-none
            "
          >
            {/* HALO */}
            <div
              className="
                absolute
                inset-0
                mx-auto
                size-64
                rounded-full
                bg-[#dce5d1]
                blur-2xl
                sm:size-72
              "
            />

            {/* VIDEO CONTAINER */}
            <div
              className="
                relative
                ml-auto
                max-w-[430px]
                rotate-[3deg]
                overflow-hidden
                rounded-[1.25rem]
                border
                border-[#d3d6c9]
                bg-[#fffdf8]
                p-1.5
                shadow-[0_20px_50px_rgba(50,61,42,0.16)]
              "
            >
              <div className="relative overflow-hidden rounded-[0.95rem]">
                <video
                  className="
                    block
                    h-auto
                    w-full
                    object-cover
                  "
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source
                    src="/videos/auth/auth-video.mp4"
                    type="video/mp4"
                  />
                </video>

                {/* OVERLAY */}
                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    bg-gradient-to-t
                    from-black/45
                    via-black/10
                    to-transparent
                    p-5
                    pt-20
                  "
                >
                  <p className="text-xs font-medium text-white/75">
                    BiblioTrack
                  </p>

                  <p className="mt-1 font-serif text-xl leading-tight text-white sm:text-2xl">
                    Retrouvez votre espace,
                    <br />
                    en toute simplicité.
                  </p>
                </div>
              </div>
            </div>

            {/* FLOATING CARD */}
            <div
              className="
                absolute
                -bottom-1
                -left-3
                z-10
                w-fit
                rounded-2xl
                border
                border-[#d3d6c9]
                bg-[#fffdf8]
                px-3.5
                py-2.5
                shadow-lg
                sm:-left-5
              "
            >
              <p className="text-[11px] text-[#697167]">
                Réinitialisation sécurisée
              </p>

              <p className="mt-0.5 font-serif text-xl text-[#ad653f]">
                votre compte, simplement
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen w-full bg-[#fffdf8]">
          <div
            className="
              flex
              min-h-screen
              items-center
              justify-center
            "
          >
            <Loader2
              className="h-7 w-7 animate-spin text-black"
              strokeWidth={1.7}
            />
          </div>
        </main>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}

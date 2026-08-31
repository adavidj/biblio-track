
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Mail,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { authApi } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authApi.forgotPassword({ email });
      setSuccess(true);
    } catch {
      // Pour des raisons de sécurité, on affiche également
      // le message de succès si l'adresse n'existe pas.
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

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
        {/* =========================================================
            LEFT — AUTHENTICATION
        ========================================================= */}
        <section className="flex min-h-screen w-full flex-col lg:min-h-0">

          {/* =====================================================
              LOGO
          ===================================================== */}
          <div className="pt-8 sm:pt-9 lg:pt-0">
            <Link
              href="/"
              className="
                flex
                w-fit
                items-center
                gap-2.5
                transition-opacity
             
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
                   hover:bg-[#263e2a]
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

          {/* =====================================================
              CONTENT
          ===================================================== */}
          <div className="flex flex-1 items-center py-12 sm:py-14 lg:py-10">
            <div className="w-full max-w-[500px]">

              {!success ? (
                <>
                  {/* =================================================
                      HEADING
                  ================================================= */}
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
                      Récupération du compte
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
                      Réinitialisez votre mot de passe.
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
                      Entrez l'adresse e-mail associée à votre compte.
                      Nous vous enverrons un code pour créer un nouveau
                      mot de passe.
                    </p>
                  </div>

                  {/* =================================================
                      FORM
                  ================================================= */}
                  <form
                    onSubmit={handleSubmit}
                    className="w-full space-y-4"
                  >
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="
                          block
                          text-[12px]
                          font-medium
                          text-[#33332f]
                          sm:text-[13px]
                        "
                      >
                        Adresse e-mail
                      </label>

                      <div className="relative">
                        <Mail
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
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="vous@exemple.com"
                          autoComplete="email"
                          required
                          className="
                            h-[clamp(45px,3.4vw,52px)]
                            w-full
                            rounded-xl
                            border
                            border-[#e4e1d8]
                            bg-white
                            pl-11
                            pr-4
                            text-[13px]
                            text-[#1a1a1a]
                            outline-none
                            transition-all
                            placeholder:text-[#aaa79e]
                            focus:border-[#aaa69b]
                            focus:ring-4
                            focus:ring-[#1a1a1a]/[0.04]
                            sm:pr-5
                            sm:text-[14px]
                          "
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
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
                          Envoi du code...
                        </>
                      ) : (
                        "Envoyer le code de réinitialisation"
                      )}
                    </button>
                  </form>

                  {/* =================================================
                      BACK TO LOGIN
                  ================================================= */}
                  <p
                    className="
                      mt-6
                      text-center
                      text-[12px]
                      text-[#77746c]
                      sm:text-[13px]
                    "
                  >
                    Vous vous souvenez de votre mot de passe ?{" "}
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

                  {/* =================================================
                      PRIVACY
                  ================================================= */}
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
                    Vos informations sont utilisées uniquement pour
                    sécuriser la récupération de votre compte BiblioTrack.
                  </p>
                </>
              ) : (
                <>
                  {/* =================================================
                      SUCCESS
                  ================================================= */}
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
                      Vérification
                    </p>

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
                      Vérifiez votre boîte mail.
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
                      Si un compte existe pour{" "}
                      <strong className="font-semibold text-[#33332f]">
                        {email}
                      </strong>
                      , nous venons de vous envoyer un code de
                      réinitialisation.
                    </p>
                  </div>

                  <Link
                    href={`/auth/reset-password?email=${encodeURIComponent(email)}`}
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
                      sm:text-[14px]
                    "
                  >
                    Entrer le code de réinitialisation
                  </Link>

                  <p
                    className="
                      mt-6
                      text-center
                      text-[12px]
                      text-[#77746c]
                      sm:text-[13px]
                    "
                  >
                    Vous souvenez-vous de votre mot de passe ?{" "}
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
                </>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================
            RIGHT — VIDEO
        ========================================================= */}
        <section
          className="
            hidden
            w-full
            lg:flex
            lg:items-center
            lg:justify-end
          "
        >
          <div
            className="
              relative
              aspect-[0.82/1]
              w-full
              max-w-[520px]
              overflow-hidden
              rounded-[1.4rem]
              border
              border-[#d3d6c9]
              bg-[#e8e5dc]
              shadow-[0_25px_60px_rgba(50,61,42,0.12)]
            "
          >
            <video
              className="
                absolute
                inset-0
                h-full
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
          </div>
        </section>
      </div>
    </main>
  );
}

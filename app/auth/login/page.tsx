
"use client";

import { useState } from "react";
import { BookOpen, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";

export default function AuthPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Connexion via l'API
      await authApi.login({
        email,
        password,
      });

      // Identifiants corrects → Dashboard
      router.push("/dashboard");
    } catch (err: unknown) {
      const apiError = err as {
        message?: string;
        status?: number;
      };

      /*
       * On essaie d'abord de déterminer le type d'erreur
       * grâce au status HTTP renvoyé par l'API.
       */

      if (apiError.status === 404) {
        setError(
          "Compte inexistant. Veuillez créer un compte pour continuer."
        );
      } else if (apiError.status === 401) {
        setError("Mot de passe incorrect.");
      } else {
        setError(
          apiError.message ||
            "Impossible de se connecter. Veuillez réessayer."
        );
      }
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

          {/* LOGIN CONTENT */}
          <div className="flex flex-1 items-center py-12 sm:py-14 lg:py-10">
            <div className="w-full max-w-[500px]">

              {/* HEADING */}
              <div className="mb-7 sm:mb-8 md:mb-9">
                <h1
                  className="
                    max-w-[500px]
                    font-serif
                    font-normal
                    leading-[1.1]
                    tracking-[-0.025em]
                    text-[#1a1a1a]
                    text-[clamp(1.75rem,3vw,2.6rem)]
                  "
                >
                  Votre bibliothèque,
                  <br />
                  votre parcours.
                </h1>

                <p
                  className="
                    mt-3
                    max-w-[460px]
                    text-[clamp(0.8rem,1.15vw,0.95rem)]
                    leading-6
                    text-[#6b6b64]
                  "
                >
                  Retrouvez vos lectures, suivez votre progression et
                  reprenez chaque livre exactement là où vous l'avez laissé.
                </p>
              </div>

              {/* ERROR */}
              {error && (
                <div
                  className="
                    mb-5
                    rounded-xl
                    border
                    border-[#e8c9bd]
                    bg-[#fdf1ed]
                    px-4
                    py-3
                    text-[12px]
                    leading-5
                    text-[#a85f3e]
                    sm:text-[13px]
                  "
                >
                  {error}

                  {error.includes("Compte inexistant") && (
                    <Link
                      href="/auth/register"
                      className="
                        ml-1
                        font-semibold
                        underline
                        underline-offset-2
                        hover:opacity-70
                      "
                    >
                      Créer un compte
                    </Link>
                  )}
                </div>
              )}

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="w-full space-y-4"
              >
                {/* EMAIL */}
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

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
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
                      px-4
                      text-[13px]
                      text-[#1a1a1a]
                      outline-none
                      transition-all
                      placeholder:text-[#aaa79e]
                      focus:border-[#aaa69b]
                      focus:ring-4
                      focus:ring-[#1a1a1a]/[0.04]
                      sm:px-5
                      sm:text-[14px]
                    "
                  />
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="password"
                      className="
                        block
                        text-[12px]
                        font-medium
                        text-[#33332f]
                        sm:text-[13px]
                      "
                    >
                      Mot de passe
                    </label>

                    <Link
                      href="/auth/forgot-password"
                      className="
                        shrink-0
                        text-[11px]
                        text-[#6b6b64]
                        transition-colors
                        hover:text-[#1a1a1a]
                        hover:underline
                        sm:text-[12px]
                      "
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Votre mot de passe"
                      autoComplete="current-password"
                      required
                      className="
                        h-[clamp(45px,3.4vw,52px)]
                        w-full
                        rounded-xl
                        border
                        border-[#e4e1d8]
                        bg-white
                        px-4
                        pr-12
                        text-[13px]
                        text-[#1a1a1a]
                        outline-none
                        transition-all
                        placeholder:text-[#aaa79e]
                        focus:border-[#aaa69b]
                        focus:ring-4
                        focus:ring-[#1a1a1a]/[0.04]
                        sm:px-5
                        sm:pr-12
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

                {/* LOGIN */}
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
                    font-medium
                    text-white
                    transition-all
                    duration-200
                    hover:bg-[#263e2a]
                    active:scale-[0.99]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    sm:text-[14px]
                  "
                >
                  {loading ? (
                    <>
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        strokeWidth={1.8}
                      />
                      Connexion...
                    </>
                  ) : (
                    "Se connecter"
                  )}
                </button>
              </form>

              {/* REGISTER */}
              <p
                className="
                  mt-5
                  text-center
                  text-[12px]
                  text-[#77746c]
                  sm:mt-6
                  sm:text-[13px]
                "
              >
                Vous n'avez pas encore de compte ?{" "}
                <Link
                  href="/auth/register"
                  className="
                    font-medium
                    text-[#1a1a1a]
                    underline
                    underline-offset-2
                    transition-opacity
                    hover:opacity-70
                  "
                >
                  Créer un compte
                </Link>
              </p>

              {/* PRIVACY */}
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
                  sm:mt-6
                  sm:text-[11px]
                "
              >
                En vous connectant, vous acceptez les{" "}
                <Link
                  href="#"
                  className="text-[#77746c] underline underline-offset-2"
                >
                  conditions d'utilisation
                </Link>{" "}
                et la{" "}
                <Link
                  href="#"
                  className="text-[#77746c] underline underline-offset-2"
                >
                  politique de confidentialité
                </Link>{" "}
                de BiblioTrack.
              </p>
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

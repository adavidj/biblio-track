"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Search, Sparkles } from "lucide-react";

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const productPromises = ["Organisez vos livres", "Reprenez sans chercher", "Gardez le goût de lire"];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-[#163527] text-[#f8f3e6]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(129,169,126,0.22),transparent_27%),radial-gradient(circle_at_12%_70%,rgba(209,122,83,0.15),transparent_25%)]" />
      <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl gap-12 px-6 py-12 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16 lg:py-14">
        <motion.div
          animate="visible"
          className="max-w-xl"
          initial="hidden"
          variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } } }}
        >
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-[#b3cea9]/30 bg-[#edf4e9]/10 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#d3e5cd]"
            transition={transition}
            variants={reveal}
          >
            <Sparkles aria-hidden="true" className="size-3.5" />
            Le compagnon de vos lectures
          </motion.p>
          <motion.h1
            className="mt-7 font-serif text-5xl leading-[0.92] tracking-[-0.06em] sm:text-6xl lg:text-7xl"
            transition={transition}
            variants={reveal}
          >
            Une place pour chaque livre. Un fil pour chaque lecture.
          </motion.h1>
          <motion.p className="mt-7 max-w-lg text-lg leading-8 text-[#d4e0d0]" transition={transition} variants={reveal}>
            BiblioTrack est votre bibliothèque personnelle : un espace simple pour rassembler vos livres, savoir où reprendre et profiter davantage de ce que vous lisez.
          </motion.p>
          <motion.div className="mt-9 flex flex-col gap-3 sm:flex-row" transition={transition} variants={reveal}>
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f1d9ad] px-6 py-3.5 text-sm font-bold text-[#163527] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5 hover:bg-[#fff1d4]"
              href="/auth/register"
            >
              Créer ma bibliothèque
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <a
              className="inline-flex items-center justify-center rounded-full border border-[#b7cbb0]/40 px-6 py-3.5 text-sm font-bold text-[#f2f5ec] transition-colors hover:bg-white/10"
              href="#comment-ca-marche"
            >
              Découvrir le fonctionnement
            </a>
          </motion.div>
          <motion.ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#c5d6c0]" transition={transition} variants={reveal}>
            <li className="inline-flex items-center gap-1.5">
              <Check aria-hidden="true" className="size-3.5" />
              Gratuit pour commencer
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check aria-hidden="true" className="size-3.5" />
              Aucune carte bancaire
            </li>
          </motion.ul>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, rotate: 0, y: 0 }}
          className="relative mx-auto w-full max-w-3xl"
          initial={reduceMotion ? false : { opacity: 0, rotate: 1.5, y: 32 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : 0.2 }}
        >
          <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-[#7aa373]/15 blur-2xl" />
          <div className="overflow-hidden rounded-[1.6rem] border border-white/15 bg-[#f8faf4] p-3 shadow-[0_36px_95px_rgba(0,0,0,0.4)] sm:p-4">
            <div className="overflow-hidden rounded-[1rem] bg-[#edf1e9] text-[#1f3528]">
              <div className="flex items-center justify-between border-b border-[#dfe5dc] bg-[#fffefb] px-5 py-3.5 text-xs text-[#738074]">
                <span className="font-semibold">BiblioTrack</span>
                <span>Votre bibliothèque personnelle</span>
                <span aria-label="Aperçu du produit" className="size-2 rounded-full bg-[#6d9d6d]" />
              </div>
              <div className="grid min-h-[22rem] lg:grid-cols-[11rem_1fr]">
                <aside className="hidden bg-[#193b2b] p-5 text-[#c9d8c5] lg:block">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9fb79b]">Ma bibliothèque</p>
                  <div className="mt-7 space-y-1.5 text-sm">
                    <p className="rounded-lg bg-white/10 px-3 py-2.5 text-white">Tous mes livres</p>
                    <p className="px-3 py-2.5">À lire</p>
                    <p className="px-3 py-2.5">En cours</p>
                    <p className="px-3 py-2.5">Terminés</p>
                  </div>
                  <p className="mt-14 border-t border-white/10 pt-4 text-xs leading-5 text-[#a8c1a3]">Votre espace se construit livre après livre.</p>
                </aside>
                <div className="flex flex-col justify-center p-5 sm:p-7">
                  <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#e3eee0] text-[#315a3d]">
                    <Sparkles aria-hidden="true" className="size-5" />
                  </span>
                  <div className="mx-auto mt-5 max-w-md text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#6c866d]">Votre point de départ</p>
                    <h2 className="mt-3 font-serif text-3xl tracking-[-0.04em] sm:text-4xl">Votre bibliothèque commence ici.</h2>
                    <p className="mt-3 text-sm leading-6 text-[#687769]">Ajoutez le premier livre que vous avez envie de garder près de vous.</p>
                  </div>
                  <div className="mx-auto mt-7 flex w-full max-w-md items-center gap-3 rounded-xl border border-[#d9e3d6] bg-white px-4 py-3 text-sm text-[#778477] shadow-sm">
                    <Search aria-hidden="true" className="size-4 shrink-0 text-[#69806b]" />
                    Rechercher un titre, un auteur ou un ISBN
                  </div>
                  <div className="mx-auto mt-6 grid w-full max-w-md gap-3 sm:grid-cols-3">
                    {productPromises.map((promise) => (
                      <span className="rounded-xl bg-[#f7f3ea] px-3 py-3 text-center text-xs font-semibold leading-5 text-[#526153]" key={promise}>
                        {promise}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-[#b9cbb4]">Un aperçu de BiblioTrack, avant même d’ajouter votre premier livre.</p>
        </motion.div>
      </div>
    </section>
  );
}

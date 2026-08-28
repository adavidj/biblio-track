import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Reveal } from "./reveal";

export function FinalCTA() {
  return (
    <section className="bg-[#f0dfbd] px-6 py-24 sm:px-8">
      <Reveal className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a4d35]">Votre bibliothèque commence maintenant</p>
        <h2 className="mt-5 font-serif text-4xl leading-none tracking-[-0.05em] text-[#193b2b] sm:text-6xl">
          Le prochain livre est déjà une bonne raison de commencer.
        </h2>
        <p className="mx-auto mt-6 max-w-xl leading-7 text-[#4c594e]">
          Créez votre espace, ajoutez un livre et laissez votre parcours se dessiner naturellement.
        </p>
        <Link
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#193b2b] px-6 py-3.5 text-sm font-bold text-[#f8f1df] shadow-[0_12px_25px_rgba(25,59,43,0.18)] transition-transform hover:-translate-y-0.5 hover:bg-[#28523c]"
          href="/auth/register"
        >
          Créer mon compte gratuitement
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
        <p className="mt-7 inline-flex items-center gap-2 text-xs font-medium text-[#536252]">
          <Check aria-hidden="true" className="size-3.5" />
          Sans carte bancaire · Prêt en quelques secondes
        </p>
      </Reveal>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export function FinalCTA() {
  return <section className="bg-[#2f4b35] px-6 py-20 text-[#fbf7ed] sm:px-8"><div className="mx-auto max-w-3xl text-center"><h2 className="font-serif text-4xl leading-none tracking-[-0.04em] sm:text-5xl">Votre prochaine lecture mérite déjà sa place.</h2><p className="mx-auto mt-6 max-w-xl leading-7 text-[#d9e1d3]">Commencez avec un livre. Le reste de votre bibliothèque suivra naturellement.</p><Link href="/auth/register" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#f2e8d5] px-6 py-3.5 text-sm font-bold text-[#29412f] transition hover:-translate-y-0.5 hover:bg-white">Créer ma bibliothèque <ArrowRight className="size-4" aria-hidden="true" /></Link><p className="mt-7 inline-flex items-center gap-2 text-xs text-[#c6d4be]"><Check className="size-3.5" aria-hidden="true" /> Sans carte bancaire · Prêt en quelques secondes</p></div></section>;
}

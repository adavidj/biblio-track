import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return <footer className="bg-[#193b2b] px-6 py-10 text-[#d7e2d3] sm:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-lg bg-[#f0dfbd] text-[#193b2b]"><BookOpen className="size-4" aria-hidden="true" /></span><span className="font-serif text-lg font-semibold text-[#f8f1df]">BiblioTrack</span></div><div className="flex gap-5 text-sm"><Link href="/auth/login" className="transition hover:text-white">Se connecter</Link><Link href="/auth/register" className="transition hover:text-white">Créer un compte</Link></div><p className="text-xs text-[#aebfac]">Votre bibliothèque personnelle, page après page.</p></div></footer>;
}

"use client";

import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "#experience", label: "L'expérience" },
  { href: "#comment-ca-marche", label: "Comment ça marche" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#d9d7cb]/80 bg-[#f8f5ed]/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-6 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="BiblioTrack, accueil">
          <span className="grid size-9 place-items-center rounded-[0.45rem] rounded-br-2xl bg-[#2f4b35] text-[#fcf8ee]"><BookOpen className="size-5" aria-hidden="true" /></span>
          <span className="font-serif text-xl font-semibold tracking-tight">BiblioTrack</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-[#586254] md:flex" aria-label="Navigation principale">
          {links.map((link) => <a key={link.href} href={link.href} className="transition-colors hover:text-[#253e2b]">{link.label}</a>)}
        </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/auth/login" className="rounded-full px-4 py-2.5 text-sm font-semibold text-[#40513f] transition hover:bg-[#e9ede4]">Se connecter</Link>
            <Link href="/auth/register" className="rounded-full bg-[#2f4b35] px-4 py-2.5 text-sm font-semibold text-[#fcf8ee] transition hover:bg-[#213b28]">Créer mon compte</Link>
          </div>
        <button type="button" className="grid size-11 place-items-center rounded-full text-[#2f4b35] md:hidden" aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>{isOpen ? <X /> : <Menu />}</button>
      </div>
      {isOpen && <nav className="border-t border-[#d9d7cb] bg-[#fffdf8] px-6 py-5 md:hidden" aria-label="Navigation mobile"><div className="mx-auto flex max-w-7xl flex-col gap-2"><Link href="/auth/login" onClick={() => setIsOpen(false)} className="rounded-xl px-3 py-3">Se connecter</Link>{links.map((link) => <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="rounded-xl px-3 py-3">{link.label}</a>)}<Link href="/auth/register" onClick={() => setIsOpen(false)} className="mt-2 rounded-full bg-[#2f4b35] px-5 py-3 text-center text-sm font-semibold text-[#fcf8ee]">Créer mon compte</Link></div></nav>}
    </header>
  );
}

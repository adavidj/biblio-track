"use client";

import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "#produit", label: "Produit" },
  { href: "#fonctionnalites", label: "Fonctionnalités" },
  { href: "#comment-ca-marche", label: "Comment ça marche" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#d9d8ce] bg-[#fcfbf7]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="BiblioTrack, accueil">
          <span className="grid size-9 place-items-center rounded-xl bg-[#193b2b] text-[#f8f1df]"><BookOpen className="size-[18px]" aria-hidden="true" /></span>
          <span className="font-serif text-xl font-semibold tracking-tight text-[#193b2b]">BiblioTrack</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-[#607066] lg:flex" aria-label="Navigation principale">
          {links.map((link) => <a key={link.href} href={link.href} className="transition hover:text-[#193b2b]">{link.label}</a>)}
        </nav>

        <div className="hidden items-center gap-1.5 md:flex">
          <Link href="/auth/login" className="rounded-full px-4 py-2.5 text-sm font-semibold text-[#365344] transition hover:bg-[#eaf0e9]">Se connecter</Link>
          <Link href="/auth/register" className="rounded-full bg-[#193b2b] px-4 py-2.5 text-sm font-semibold text-[#f8f1df] shadow-sm transition hover:bg-[#28523c]">Créer un compte</Link>
        </div>

        <button type="button" className="grid size-11 place-items-center rounded-full text-[#193b2b] md:hidden" aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>{isOpen ? <X /> : <Menu />}</button>
      </div>

      {isOpen && <nav className="border-t border-[#d9d8ce] bg-[#fcfbf7] px-6 py-5 md:hidden" aria-label="Navigation mobile"><div className="mx-auto flex max-w-7xl flex-col gap-1">{links.map((link) => <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="rounded-xl px-3 py-3 text-[#365344]">{link.label}</a>)}<div className="mt-3 grid grid-cols-2 gap-2"><Link href="/auth/login" onClick={() => setIsOpen(false)} className="rounded-full border border-[#cfd9cc] px-4 py-3 text-center text-sm font-semibold text-[#193b2b]">Connexion</Link><Link href="/auth/register" onClick={() => setIsOpen(false)} className="rounded-full bg-[#193b2b] px-4 py-3 text-center text-sm font-semibold text-[#f8f1df]">Créer un compte</Link></div></div></nav>}
    </header>
  );
}

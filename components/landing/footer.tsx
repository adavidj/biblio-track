import Link from "next/link";

export function Footer() {
  return <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-[#687066] sm:flex-row sm:items-center sm:justify-between sm:px-8"><span className="font-serif font-semibold text-[#374337]">BiblioTrack</span><div className="flex gap-5"><Link href="/auth/login" className="hover:text-[#2f4b35]">Connexion</Link><Link href="/auth/register" className="hover:text-[#2f4b35]">Créer un compte</Link></div></footer>;
}

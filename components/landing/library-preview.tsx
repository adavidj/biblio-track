import { ArrowUpRight, BookOpen, Filter } from "lucide-react";

const books = [
  { title: "L'Étranger", author: "Albert Camus", tone: "from-[#d7c6a7] to-[#a76b4c]" },
  { title: "Dune", author: "Frank Herbert", tone: "from-[#d6a86a] to-[#6d4938]" },
  { title: "Sapiens", author: "Yuval Noah Harari", tone: "from-[#a9bb9b] to-[#446451]" },
];

export function LibraryPreview() {
  return <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:py-32"><div className="grid items-center gap-12 lg:grid-cols-[0.78fr_1.22fr]"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#55704f]">Une vue claire, sans bruit</p><h2 className="mt-4 max-w-md font-serif text-4xl leading-none tracking-[-0.04em] text-[#253025] sm:text-5xl">Votre bibliothèque vous attend, exactement là où vous l&apos;avez laissée.</h2><p className="mt-6 max-w-md leading-7 text-[#626a60]">Retrouvez les livres en cours, ceux qui vous attendent et ceux qui ont déjà marqué votre histoire.</p></div><div className="rounded-[1.5rem] border border-[#d8dbd0] bg-[#fffdf8] p-5 shadow-[0_20px_50px_rgba(50,61,42,0.1)] sm:p-7"><div className="flex items-center justify-between border-b border-[#e5e7df] pb-5"><div><p className="font-serif text-2xl text-[#283127]">Ma bibliothèque</p><p className="mt-1 text-sm text-[#71796f]">Les lectures qui vous accompagnent</p></div><Filter className="size-5 text-[#567052]" aria-hidden="true" /></div><div className="mt-6 grid grid-cols-3 gap-3 sm:gap-5">{books.map((book) => <article key={book.title}><div className={`aspect-[3/4] rounded-md bg-linear-to-br ${book.tone} p-3 text-[#fff8e9] shadow-md`}><BookOpen className="size-4" aria-hidden="true" /></div><h3 className="mt-3 truncate font-serif text-lg text-[#2d362c]">{book.title}</h3><p className="truncate text-xs text-[#737b70]">{book.author}</p></article>)}</div><div className="mt-7 flex items-center justify-between rounded-xl bg-[#eef2e9] px-4 py-3 text-sm text-[#466145]"><span>Une lecture à reprendre ce soir</span><ArrowUpRight className="size-4" aria-hidden="true" /></div></div></div></section>;
}

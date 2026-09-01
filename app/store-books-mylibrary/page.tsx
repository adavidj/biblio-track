"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Heart,
  Leaf,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useBookStore } from "@/lib/book-store";
import { useStorefrontStore } from "@/lib/storefront-store";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function PublicStorePage() {
  const [checkoutBookId, setCheckoutBookId] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const books = useBookStore((state) => state.books);
  const name = useStorefrontStore((state) => state.name);
  const description = useStorefrontStore((state) => state.description);
  const showPrices = useStorefrontStore((state) => state.showPrices);
  const selectedBookIds = useStorefrontStore((state) => state.selectedBookIds);
  const productPrices = useStorefrontStore((state) => state.productPrices);
  const catalog = books.filter((book) => selectedBookIds.includes(book.id));
  const checkoutBook = catalog.find((book) => book.id === checkoutBookId);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbfcf8] text-[#2b3f2d]">
      <header className="sticky top-0 z-20 border-b border-[#dce7d6]/80 bg-[#fbfcf8]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link className="flex items-center gap-2.5" href="/">
            <span className="grid size-9 place-items-center rounded-xl bg-[#426b42] text-white">
              <BookOpen className="size-4" />
            </span>
            <span className="font-serif text-xl font-bold tracking-[-0.03em]">
              {name}
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <a
              className="hidden text-sm font-semibold text-[#637461] hover:text-[#426b42] sm:block"
              href="#catalogue"
            >
              La sélection
            </a>
            <button
              className="relative inline-flex items-center gap-2 rounded-xl border border-[#c9d9c3] bg-white px-3.5 py-2 text-sm font-bold text-[#426b42] shadow-sm"
              type="button"
            >
              <ShoppingBag className="size-4" /> Panier
            </button>
          </div>
        </div>
      </header>

      <section className="relative isolate overflow-hidden border-b border-[#dce7d6] bg-[#e7efe1]">
        <div className="absolute -right-24 -top-28 size-96 rounded-full bg-[#d4e5ca]/60 blur-3xl" />
        <div className="absolute -bottom-32 left-[20%] size-80 rounded-full bg-white/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#bfd3b8] bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#4d704b]">
              <Sparkles className="size-3.5" /> Sélection indépendante
            </p>
            <h1 className="mt-6 max-w-3xl font-serif text-5xl tracking-[-0.065em] text-[#283d2a] sm:text-6xl">
              Des livres qui méritent une place chez vous.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#5d705b] sm:text-lg">
              {description}
            </p>
            <a
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#426b42] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(49,76,53,0.16)] transition hover:-translate-y-0.5 hover:bg-[#345a35]"
              href="#catalogue"
            >
              Explorer la sélection <ArrowRight className="size-4" />
            </a>
          </div>
          <aside className="rounded-[1.75rem] border border-[#c3d8bb] bg-[#fffef9]/90 p-6 shadow-[0_18px_45px_rgba(49,76,53,0.10)]">
            <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#6a8067]">
              La promesse de la boutique
            </p>
            <div className="mt-6 space-y-5">
              <Promise
                icon={Heart}
                text="Des recommandations choisies avec intention"
              />
              <Promise
                icon={Leaf}
                text="Une sélection claire, sans catalogue interminable"
              />
              <Promise
                icon={Check}
                text="Des informations et des prix visibles avant commande"
              />
            </div>
          </aside>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"
        id="catalogue"
      >
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#597756]">
              Le catalogue
            </p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.05em] text-[#293d2b]">
              À découvrir maintenant
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#748173]">
              {catalog.length} livre{catalog.length > 1 ? "s" : ""}{" "}
              soigneusement sélectionné{catalog.length > 1 ? "s" : ""}.
            </p>
          </div>
          <span className="rounded-full bg-[#edf4e9] px-3 py-1.5 text-xs font-bold text-[#527150]">
            Sélection mise à jour régulièrement
          </span>
        </div>
        {catalog.length ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {catalog.map((book) => {
              const price = productPrices[book.id]?.trim();
              return (
                <article
                  className="group overflow-hidden rounded-[1.5rem] border border-[#dfe8db] bg-white shadow-[0_8px_24px_rgba(49,76,53,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(49,76,53,0.11)]"
                  key={book.id}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#edf4e9]">
                    {book.coverUrl ? (
                      <Image
                        alt={`Couverture de ${book.title}`}
                        className="object-cover transition duration-500 group-hover:scale-105"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        src={book.coverUrl}
                      />
                    ) : (
                      <div className="grid h-full place-items-center">
                        <BookOpen className="size-10 text-[#7c9a77]" />
                      </div>
                    )}
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#426b42] backdrop-blur">
                      Sélection
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-[#748173]">{book.author}</p>
                    <h3 className="mt-2 font-serif text-2xl leading-tight text-[#293d2b]">
                      {book.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#6d7d6b]">
                      {book.description ||
                        "Une lecture sélectionnée pour enrichir votre bibliothèque."}
                    </p>
                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#edf1ea] pt-5">
                      {showPrices ? (
                        <p className="text-lg font-bold text-[#426b42]">
                          {price ? `${price} FCFA` : "Prix à venir"}
                        </p>
                      ) : (
                        <p className="text-sm font-semibold text-[#657563]">
                          Disponible prochainement
                        </p>
                      )}
                      <button
                        className="rounded-xl bg-[#426b42] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#345a35]"
                        onClick={() => { setOrderPlaced(false); setCheckoutBookId(book.id); }}
                        type="button"
                      >
                        Acheter
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-[1.75rem] border border-dashed border-[#c6d9bf] bg-[#f5f9f2] p-14 text-center">
            <BookOpen className="mx-auto size-9 text-[#7c9a77]" />
            <h2 className="mt-4 font-serif text-3xl">
              La sélection arrive bientôt.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6f806d]">
              Cette boutique est en cours de préparation. Revenez prochainement
              découvrir les premiers titres.
            </p>
          </div>
        )}
      </section>
      <Dialog open={Boolean(checkoutBook)} onOpenChange={(open) => !open && setCheckoutBookId(null)}><DialogContent className="max-w-lg rounded-[1.75rem] border-[#dce7d6] bg-[#fffef9] p-6"><DialogHeader><DialogTitle className="font-serif text-3xl text-[#293d2b]">Finaliser votre achat</DialogTitle><DialogDescription>{checkoutBook ? `Vous êtes sur le point de commander « ${checkoutBook.title} »` : ""}</DialogDescription></DialogHeader>{orderPlaced ? <div className="rounded-2xl bg-[#e7efe1] p-6 text-center"><Check className="mx-auto size-8 text-[#426b42]" /><h2 className="mt-4 font-serif text-2xl text-[#29402c]">Commande enregistrée</h2><p className="mt-2 text-sm leading-6 text-[#607360]">Merci. Vous recevrez les prochaines instructions de paiement par e-mail.</p><button className="mt-5 rounded-xl bg-[#426b42] px-4 py-2.5 text-sm font-bold text-white" onClick={() => setCheckoutBookId(null)} type="button">Fermer</button></div> : <div className="space-y-4 pt-3"><div className="rounded-2xl border border-[#dce7d6] bg-[#f6faf3] p-4"><p className="font-semibold text-[#334532]">{checkoutBook?.title}</p><p className="mt-1 text-sm text-[#748173]">{checkoutBook?.author}</p><p className="mt-4 text-lg font-bold text-[#426b42]">{checkoutBook && productPrices[checkoutBook.id]?.trim() ? `${productPrices[checkoutBook.id]} FCFA` : "Prix à confirmer"}</p></div><label className="block text-sm font-semibold text-[#354534]">Nom complet<input className="mt-2 h-11 w-full rounded-xl border border-[#d8e2d4] bg-white px-4 text-sm font-normal outline-none" placeholder="Votre nom" /></label><label className="block text-sm font-semibold text-[#354534]">Adresse e-mail<input className="mt-2 h-11 w-full rounded-xl border border-[#d8e2d4] bg-white px-4 text-sm font-normal outline-none" placeholder="vous@exemple.com" type="email" /></label><label className="block text-sm font-semibold text-[#354534]">Mode de paiement<select className="mt-2 h-11 w-full rounded-xl border border-[#d8e2d4] bg-white px-4 text-sm font-normal outline-none"><option>Mobile Money</option><option>Paiement à la livraison</option><option>Virement bancaire</option></select></label><button className="inline-flex w-full justify-center rounded-xl bg-[#426b42] px-4 py-3 text-sm font-bold text-white" onClick={() => setOrderPlaced(true)} type="button">Confirmer la commande</button></div>}</DialogContent></Dialog>
      <footer className="border-t border-[#dce7d6] bg-[#f3f7f0]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 py-8 text-sm text-[#71806e] sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {name}
          </p>
          <p>Une vitrine propulsée par BiblioTrack.</p>
        </div>
      </footer>
    </main>
  );
}

function Promise({ icon: Icon, text }: { icon: typeof Heart; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#e7efe1] text-[#4e754b]">
        <Icon className="size-4" />
      </span>
      <p className="text-sm font-semibold leading-5 text-[#40543f]">{text}</p>
    </div>
  );
}

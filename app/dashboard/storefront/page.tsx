"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Check,
  ChevronRight,
  Copy,
  CreditCard,
  Eye,
  Globe2,
  PackageCheck,
  Plus,
  Settings2,
  ShoppingBag,
  Store,
  Truck,
  WalletCards,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/shared/page-header";
import { useBookStore } from "@/lib/book-store";
import { useStorefrontStore } from "@/lib/storefront-store";

const STORE_URL = "/store-books-mylibrary";

export default function StorefrontPage() {
  const [copied, setCopied] = useState(false);
  const [published, setPublished] = useState(false);
  const books = useBookStore((state) => state.books);
  const description = useStorefrontStore((state) => state.description);
  const isEnabled = useStorefrontStore((state) => state.isEnabled);
  const name = useStorefrontStore((state) => state.name);
  const productPrices = useStorefrontStore((state) => state.productPrices);
  const selectedBookIds = useStorefrontStore((state) => state.selectedBookIds);
  const showPrices = useStorefrontStore((state) => state.showPrices);
  const setDescription = useStorefrontStore((state) => state.setDescription);
  const setName = useStorefrontStore((state) => state.setName);
  const setProductPrice = useStorefrontStore((state) => state.setProductPrice);
  const setShowPrices = useStorefrontStore((state) => state.setShowPrices);
  const toggleBookSelection = useStorefrontStore(
    (state) => state.toggleBookSelection,
  );
  const selectedBooks = books.filter((book) =>
    selectedBookIds.includes(book.id),
  );
  const readyProducts = selectedBooks.filter((book) =>
    productPrices[book.id]?.trim(),
  ).length;

  async function copyStoreUrl() {
    await navigator.clipboard?.writeText(
      `${window.location.origin}${STORE_URL}`,
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }
  function openPublicStore() {
    window.open(STORE_URL, "_blank", "noopener,noreferrer");
  }
  if (!isEnabled) return <StorefrontDisabled />;

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <PageHeader
        actions={
          <div className="flex gap-2">
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-[#c7d8c2] bg-white px-4 py-2.5 text-sm font-semibold text-[#426b42] transition hover:bg-[#f2f7ef]"
              onClick={openPublicStore}
              type="button"
            >
              <Eye className="size-4" /> Prévisualiser
            </button>
            <button
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${published ? "bg-[#e6f1e2] text-[#3f6a3f]" : "bg-[#426b42] text-white hover:bg-[#345a35]"}`}
              disabled={!selectedBooks.length}
              onClick={() => setPublished((value) => !value)}
              type="button"
            >
              {published ? (
                <Check className="size-4" />
              ) : (
                <Globe2 className="size-4" />
              )}
              {published ? "Boutique publiée" : "Publier la boutique"}
            </button>
          </div>
        }
        description="Composez votre catalogue, définissez vos offres et préparez la vitrine que vos visiteurs découvriront."
        eyebrow="Commerce"
        title="Ma boutique"
      />
      <section className="overflow-hidden rounded-[1.9rem] border border-[#ccdcbf] bg-[#e7efe1] shadow-[0_18px_40px_rgba(54,79,48,0.10)]">
        <div className="grid gap-7 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#bbd0b4] bg-white/65 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#4d704b]">
              <Store className="size-3.5" />{" "}
              {published ? "Vitrine en ligne" : "Ma vitrine"}
            </span>
            <h2 className="mt-5 font-serif text-4xl tracking-[-0.05em] text-[#29402c]">
              {name}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5f725d]">
              {description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-xl bg-[#426b42] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#345a35]"
                onClick={openPublicStore}
                type="button"
              >
                <Eye className="size-4" /> Voir comme un client
              </button>
              <span className="text-sm font-medium text-[#5b7458]">
                {selectedBooks.length} livre
                {selectedBooks.length > 1 ? "s" : ""} au catalogue
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-[#c5d8bd] bg-white/75 p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#668064]">
              Lien de la boutique
            </p>
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#dce7d8] bg-white p-3">
              <Globe2 className="size-4 shrink-0 text-[#587a55]" />
              <Link
                className="min-w-0 flex-1 truncate text-sm font-semibold text-[#36523a] underline underline-offset-2"
                href={STORE_URL}
                target="_blank"
              >
                {STORE_URL}
              </Link>
              <button
                aria-label="Copier le lien"
                className="grid size-8 place-items-center rounded-lg text-[#456445] hover:bg-[#edf4e9]"
                onClick={copyStoreUrl}
                type="button"
              >
                {copied ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#dce7d8] pt-4">
              <Metric label="Catalogue" value={selectedBooks.length} />
              <Metric label="Prêts" value={readyProducts} />
              <Metric
                label="Statut"
                value={published ? "En ligne" : "À publier"}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <article className="rounded-[1.75rem] border border-[#dce4d8] bg-[#fffef9] p-6 shadow-[0_10px_28px_rgba(49,76,53,0.05)]">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#e7efe1] text-[#4d724b]">
              <Settings2 className="size-5" />
            </span>
            <div>
              <h2 className="font-serif text-2xl text-[#2a3c2b]">Identité</h2>
              <p className="mt-1 text-sm text-[#71806e]">
                Personnalisez votre vitrine.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <Field label="Nom de la boutique">
              <input
                className="field"
                onChange={(event) => setName(event.target.value)}
                value={name}
              />
            </Field>
            <Field label="Phrase de présentation">
              <textarea
                className="field min-h-28 resize-none py-3"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
              />
            </Field>
            <Toggle
              checked={showPrices}
              description="Affichez les prix renseignés sur les fiches produit."
              label="Afficher les prix"
              onChange={setShowPrices}
            />
          </div>
        </article>
        <article className="rounded-[1.75rem] border border-[#dce4d8] bg-[#fffef9] p-6 shadow-[0_10px_28px_rgba(49,76,53,0.05)]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-[#e7efe1] text-[#4d724b]">
                <PackageCheck className="size-5" />
              </span>
              <div>
                <h2 className="font-serif text-2xl text-[#2a3c2b]">
                  Catalogue de vente
                </h2>
                <p className="mt-1 text-sm text-[#71806e]">
                  Ajoutez vos livres, puis préparez leur prix.
                </p>
              </div>
            </div>
            <span className="rounded-full bg-[#edf4e9] px-3 py-1.5 text-xs font-bold text-[#51704e]">
              {selectedBooks.length} sélectionné
              {selectedBooks.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="mt-6 grid gap-3">
            {books.length ? (
              books.map((book) => {
                const selected = selectedBookIds.includes(book.id);
                return (
                  <article
                    className={`flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center ${selected ? "border-[#aac9a3] bg-[#f4f8f1]" : "border-[#e3e9df] bg-[#fcfdfb]"}`}
                    key={book.id}
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e3eee0] text-[#4d724b]">
                      <BookOpen className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-[#334532]">
                        {book.title}
                      </p>
                      <p className="mt-1 truncate text-sm text-[#748173]">
                        {book.author}
                      </p>
                    </div>
                    {selected ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="relative">
                          <span className="sr-only">Prix de {book.title}</span>
                          <input
                            className="h-10 w-24 rounded-xl border border-[#cbdcc5] bg-white pl-3 pr-7 text-sm font-semibold text-[#355236] outline-none focus:ring-4 focus:ring-[#426b42]/10"
                            min="0"
                            onChange={(event) =>
                              setProductPrice(book.id, event.target.value)
                            }
                            placeholder="Prix"
                            type="number"
                            value={productPrices[book.id] ?? ""}
                          />
                          <span className="pointer-events-none absolute right-3 top-2.5 text-xs text-[#71806e]">
                            FCFA
                          </span>
                        </label>
                        <button
                          className="rounded-xl border border-[#d5e2d0] bg-white px-3 py-2 text-xs font-bold text-[#6d7a6b] hover:bg-[#fff1ed] hover:text-[#a75b52]"
                          onClick={() => toggleBookSelection(book.id)}
                          type="button"
                        >
                          Retirer
                        </button>
                      </div>
                    ) : (
                      <button
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#bdd2b6] bg-white px-3 py-2 text-xs font-bold text-[#426b42] transition hover:bg-[#e7efe1]"
                        onClick={() => toggleBookSelection(book.id)}
                        type="button"
                      >
                        <Plus className="size-3.5" /> Ajouter
                      </button>
                    )}
                  </article>
                );
              })
            ) : (
              <EmptyCatalog />
            )}
          </div>
        </article>
      </section>
      <section className="grid gap-5 lg:grid-cols-3">
        <CommerceStep
          icon={CreditCard}
          title="Paiements"
          description="Stripe, Mobile Money et les moyens de paiement seront connectés au backend."
          status="À configurer"
        />
        <CommerceStep
          icon={Truck}
          title="Livraison"
          description="Définissez le retrait, la livraison ou l’accès numérique selon votre catalogue."
          status="À configurer"
        />
        <CommerceStep
          icon={WalletCards}
          title="Commandes"
          description="Vos ventes, paiements et commandes apparaîtront ici dès la mise en ligne."
          status="En attente"
        />
      </section>
    </div>
  );
}

function Field({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <label className="block text-sm font-semibold text-[#354534]">
      <span>{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}
function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.08em] text-[#748873]">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-bold text-[#355236]">{value}</p>
    </div>
  );
}
function CommerceStep({
  description,
  icon: Icon,
  status,
  title,
}: {
  description: string;
  icon: typeof CreditCard;
  status: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <>
      <article className="rounded-2xl border border-[#dce4d8] bg-[#fffef9] p-5 shadow-[0_8px_22px_rgba(49,76,53,0.04)]">
        <span className="grid size-10 place-items-center rounded-xl bg-[#e7efe1] text-[#4d724b]">
          <Icon className="size-5" />
        </span>
        <div className="mt-5 flex items-start justify-between gap-3">
          <h2 className="font-serif text-xl text-[#2b3d2c]">{title}</h2>
          <span className="rounded-full bg-[#f2f5f0] px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-[#71806e]">
            {saved ? "Configuré" : status}
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-[#71806e]">{description}</p>
        <button
          className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#426b42]"
          onClick={() => setOpen(true)}
          type="button"
        >
          Configurer <ChevronRight className="size-4" />
        </button>
      </article>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg rounded-[1.75rem] border-[#dce4d7] bg-[#fffef9]">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-[#2a3c2b]">
              Configurer {title.toLowerCase()}
            </DialogTitle>
            <DialogDescription>
              Ces réglages sont enregistrés localement en attendant les API de
              boutique.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-3">
            <label className="block text-sm font-semibold text-[#354534]">
              {title === "Paiements"
                ? "Moyen de paiement principal"
                : title === "Livraison"
                  ? "Mode de remise"
                  : "Message de confirmation"}
              <select className="mt-2 h-11 w-full rounded-xl border border-[#d8e2d4] bg-white px-4 text-sm font-normal outline-none">
                <option>
                  {title === "Paiements"
                    ? "Mobile Money"
                    : title === "Livraison"
                      ? "Retrait et livraison locale"
                      : "E-mail automatique"}
                </option>
                <option>À définir plus tard</option>
              </select>
            </label>
            <label className="block text-sm font-semibold text-[#354534]">
              Informations complémentaires
              <textarea
                className="mt-2 min-h-24 w-full rounded-xl border border-[#d8e2d4] bg-white p-3 text-sm font-normal outline-none"
                placeholder="Ajoutez vos conditions ou instructions…"
              />
            </label>
            <button
              className="inline-flex w-full justify-center rounded-xl bg-[#426b42] px-4 py-3 text-sm font-semibold text-white"
              onClick={() => {
                setSaved(true);
                setOpen(false);
              }}
              type="button"
            >
              Enregistrer la configuration
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
function EmptyCatalog() {
  return (
    <div className="rounded-2xl border border-dashed border-[#cbd9c7] bg-[#f7faf5] p-8 text-center">
      <BookOpen className="mx-auto size-7 text-[#89a084]" />
      <p className="mt-3 text-sm font-semibold text-[#40513e]">
        Votre bibliothèque est vide
      </p>
      <Link
        className="mt-4 inline-flex text-sm font-bold text-[#426b42] underline underline-offset-4"
        href="/dashboard/search"
      >
        Ajouter un livre
      </Link>
    </div>
  );
}
function StorefrontDisabled() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <PageHeader
        description="Créez une vitrine partageable pour présenter vos sélections de livres."
        eyebrow="Commerce"
        title="Ma boutique"
      />
      <section className="flex flex-col items-center rounded-[1.75rem] border border-dashed border-[#c6d8c0] bg-[#f7faf5] px-6 py-16 text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-[#e3eee0] text-[#4d724b]">
          <ShoppingBag className="size-6" />
        </span>
        <h2 className="mt-5 font-serif text-3xl text-[#304432]">
          Votre boutique est désactivée.
        </h2>
        <p className="mt-3 max-w-lg leading-7 text-[#6c7c6b]">
          Activez-la depuis les paramètres pour ouvrir votre console de vente.
        </p>
        <Link
          className="mt-6 inline-flex rounded-xl bg-[#426b42] px-4 py-2.5 text-sm font-semibold text-white"
          href="/dashboard/settings"
        >
          Ouvrir les paramètres
        </Link>
      </section>
    </div>
  );
}
function Toggle({
  checked,
  description,
  label,
  onChange,
}: {
  checked: boolean;
  description: string;
  label: string;
  onChange: (nextValue: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-5 border-t border-[#e1e9de] pt-5">
      <div>
        <p className="text-sm font-semibold text-[#354534]">{label}</p>
        <p className="mt-1 max-w-md text-xs leading-5 text-[#71806e]">
          {description}
        </p>
      </div>
      <button
        aria-checked={checked}
        aria-label={label}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-[#426b42]" : "bg-[#cbd3c8]"}`}
        onClick={() => onChange(!checked)}
        role="switch"
        type="button"
      >
        <span
          className={`absolute top-1 size-4 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
}

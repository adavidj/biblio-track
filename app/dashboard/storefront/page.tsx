"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink, Globe2, ShoppingBag, Sparkles } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { useStorefrontStore } from "@/lib/storefront-store";

const STORE_URL = "biblio-track.app/boutique/ma-bibliotheque";

export default function StorefrontPage() {
  const [copied, setCopied] = useState(false);
  const description = useStorefrontStore((state) => state.description);
  const isEnabled = useStorefrontStore((state) => state.isEnabled);
  const name = useStorefrontStore((state) => state.name);
  const setDescription = useStorefrontStore((state) => state.setDescription);
  const setName = useStorefrontStore((state) => state.setName);
  const setShowPrices = useStorefrontStore((state) => state.setShowPrices);
  const showPrices = useStorefrontStore((state) => state.showPrices);

  async function copyStoreUrl() {
    await navigator.clipboard?.writeText(`https://${STORE_URL}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  if (!isEnabled) {
    return <StorefrontDisabled />;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHeader
        description="Préparez votre vitrine avant sa publication et le branchement des paiements."
        eyebrow="Boutique publique"
        title="Votre boutique"
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-[1.75rem] border border-[#d7e4d2] bg-[#fffef9] p-6 shadow-[0_12px_35px_rgba(49,76,53,0.05)] sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-[#314c35] text-white">
              <ShoppingBag aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h2 className="font-serif text-2xl text-[#2a3c2b]">Identité de la boutique</h2>
              <p className="mt-1 text-sm text-[#71806e]">Présentez votre sélection avec vos propres mots.</p>
            </div>
          </div>

          <div className="mt-7 space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-[#354534]">Nom de la boutique</span>
              <input className="mt-2 h-11 w-full rounded-xl border border-[#d8e2d4] bg-white px-4 text-sm text-[#314232] outline-none transition focus:border-[#7a9b74] focus:ring-4 focus:ring-[#315a3d]/[0.08]" onChange={(event) => setName(event.target.value)} value={name} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#354534]">Présentation</span>
              <textarea className="mt-2 min-h-32 w-full resize-y rounded-xl border border-[#d8e2d4] bg-white px-4 py-3 text-sm leading-6 text-[#314232] outline-none transition focus:border-[#7a9b74] focus:ring-4 focus:ring-[#315a3d]/[0.08]" onChange={(event) => setDescription(event.target.value)} value={description} />
            </label>
            <Toggle checked={showPrices} description="Le paiement sera activé lorsque le backend de boutique sera connecté." label="Afficher les prix" onChange={setShowPrices} />
          </div>
        </section>

        <aside className="rounded-[1.75rem] border border-[#b9d1b2] bg-[#edf4e9] p-6 shadow-[0_16px_45px_rgba(49,76,53,0.08)] sm:p-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#d8e9d2] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#3b623d]">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Brouillon actif
          </span>
          <h2 className="mt-5 font-serif text-3xl tracking-[-0.04em] text-[#263c29]">Votre lien est prêt à partager.</h2>
          <p className="mt-4 leading-7 text-[#5d705d]">Il mènera à votre vitrine dès que la publication et le paiement seront connectés.</p>

          <div className="mt-7 rounded-2xl border border-[#c6d8c0] bg-[#fffef9] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#668064]">Lien public</p>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#f1f6ee] p-3">
              <Globe2 aria-hidden="true" className="size-4 shrink-0 text-[#587a55]" />
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-[#36523a]">{STORE_URL}</span>
              <button aria-label="Copier le lien de la boutique" className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-[#456445] shadow-sm transition hover:bg-[#e7f0e3]" onClick={copyStoreUrl} type="button">
                {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
              </button>
            </div>
          </div>

          <button className="mt-4 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-[#b9cfb4] px-4 py-2.5 text-sm font-semibold text-[#537053] opacity-60" disabled type="button">
            Aperçu public bientôt disponible
            <ExternalLink aria-hidden="true" className="size-4" />
          </button>
          <p className="mt-5 rounded-xl bg-[#f8f2e7] p-4 text-sm leading-6 text-[#79634d]">
            <span className="font-semibold text-[#674f3b]">À connecter au backend. </span>
            La publication, le catalogue, les paiements et les commandes seront gérés par les futures API de boutique.
          </p>
        </aside>
      </div>
    </div>
  );
}

function StorefrontDisabled() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <PageHeader description="Créez une vitrine partageable pour présenter vos sélections de livres." eyebrow="Boutique publique" title="Votre boutique" />
      <section className="flex flex-col items-center rounded-[1.75rem] border border-dashed border-[#c6d8c0] bg-[#f7faf5] px-6 py-16 text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-[#e3eee0] text-[#4d724b]">
          <ShoppingBag aria-hidden="true" className="size-6" />
        </span>
        <h2 className="mt-5 font-serif text-3xl text-[#304432]">Votre boutique est désactivée.</h2>
        <p className="mt-3 max-w-lg leading-7 text-[#6c7c6b]">Activez-la dans Paramètres pour préparer son identité, son lien public et ses futures options de paiement.</p>
        <Link className="mt-6 inline-flex rounded-xl bg-[#314c35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#263e2a]" href="/dashboard/settings">
          Ouvrir les paramètres
        </Link>
      </section>
    </div>
  );
}

function Toggle({ checked, description, label, onChange }: { checked: boolean; description: string; label: string; onChange: (nextValue: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-5 border-t border-[#e1e9de] pt-5">
      <div>
        <p className="text-sm font-semibold text-[#354534]">{label}</p>
        <p className="mt-1 max-w-md text-xs leading-5 text-[#71806e]">{description}</p>
      </div>
      <button aria-checked={checked} aria-label={label} className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-[#426b42]" : "bg-[#cbd3c8]"}`} onClick={() => onChange(!checked)} role="switch" type="button">
        <span className={`absolute top-1 size-4 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
      </button>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BellRing,
  Check,
  Eye,
  Loader2,
  Save,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Target,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { useStorefrontStore } from "@/lib/storefront-store";

export default function SettingsPage() {
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [readingReminders, setReadingReminders] = useState(false);
  const [isLibraryPrivate, setIsLibraryPrivate] = useState(true);
  const [showReadingProgress, setShowReadingProgress] = useState(true);
  const [weeklyTarget, setWeeklyTarget] = useState("120");
  const [defaultLanguage, setDefaultLanguage] = useState("fr");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const isStoreEnabled = useStorefrontStore((state) => state.isEnabled);
  const setStoreEnabled = useStorefrontStore((state) => state.setEnabled);

  function saveSettings() {
    setSaving(true);
    setSaved(false);
    window.setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 650);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHeader
        actions={
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#314c35] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(49,76,53,0.16)] transition hover:bg-[#263e2a] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={saving}
            onClick={saveSettings}
            type="button"
          >
            {saving ? (
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            ) : (
              <Save aria-hidden="true" className="size-4" />
            )}
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        }
        description="Personnalisez votre espace de lecture et définissez ce qui reste privé."
        eyebrow="Votre espace"
        title="Paramètres"
      />

      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-[#c9ddc4] bg-[#eff7ec] px-4 py-3 text-sm font-medium text-[#3f6a3f]">
          <Check aria-hidden="true" className="size-4" />
          Vos préférences ont été enregistrées dans cette démo.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <section className="rounded-2xl border border-[#dce4d8] bg-[#fffef9] p-6 shadow-[0_12px_35px_rgba(49,76,53,0.05)]">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#e9f0e5] text-[#486b47]">
              <BellRing aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h2 className="font-serif text-2xl text-[#2a3c2b]">
                Préférences de lecture
              </h2>
              <p className="mt-1 text-sm text-[#71806e]">
                Choisissez les rappels qui vous sont utiles.
              </p>
            </div>
          </div>
          <div className="mt-6 divide-y divide-[#e6ece2]">
            <Toggle
              checked={weeklySummary}
              description="Recevez un résumé de votre activité chaque semaine."
              label="Résumé hebdomadaire"
              onChange={setWeeklySummary}
            />
            <Toggle
              checked={readingReminders}
              description="Gardez une lecture en cours à portée de main."
              label="Rappels de lecture"
              onChange={setReadingReminders}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-[#dce4d8] bg-[#fffef9] p-6 shadow-[0_12px_35px_rgba(49,76,53,0.05)]">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#e9f0e5] text-[#486b47]">
              <ShieldCheck aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h2 className="font-serif text-2xl text-[#2a3c2b]">
                Confidentialité
              </h2>
              <p className="mt-1 text-sm text-[#71806e]">
                Votre bibliothèque reste personnelle par défaut.
              </p>
            </div>
          </div>
          <div className="mt-6 divide-y divide-[#e6ece2]">
            <Toggle
              checked={isLibraryPrivate}
              description="Vos lectures ne sont visibles que par vous, sauf celles que vous publiez volontairement."
              label="Bibliothèque privée"
              onChange={setIsLibraryPrivate}
            />
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-[#dce4d8] bg-[#fffef9] p-6 shadow-[0_12px_35px_rgba(49,76,53,0.05)]">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-[#e9f0e5] text-[#486b47]">
            <SlidersHorizontal aria-hidden="true" className="size-5" />
          </span>
          <div>
            <h2 className="font-serif text-2xl text-[#2a3c2b]">
              Expérience de lecture
            </h2>
            <p className="mt-1 text-sm text-[#71806e]">
              Définissez les préférences qui doivent être appliquées à votre
              espace.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="divide-y divide-[#e6ece2]">
            <Toggle
              checked={showReadingProgress}
              description="Affichez votre avancement sur les fiches et dans la bibliothèque."
              label="Afficher la progression"
              onChange={setShowReadingProgress}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-[#354534]">
              <span className="flex items-center gap-2">
                <Target className="size-4 text-[#587a55]" /> Objectif
                hebdomadaire
              </span>
              <input
                className="mt-2 h-11 w-full rounded-xl border border-[#d8e2d4] bg-white px-4 text-sm font-normal outline-none focus:border-[#7a9b74] focus:ring-4 focus:ring-[#315a3d]/[0.08]"
                min="0"
                onChange={(event) => setWeeklyTarget(event.target.value)}
                type="number"
                value={weeklyTarget}
              />
              <p className="mt-1 text-xs font-normal text-[#7a8678]">
                pages à lire
              </p>
            </label>
            <label className="block text-sm font-semibold text-[#354534]">
              <span className="flex items-center gap-2">
                <Eye className="size-4 text-[#587a55]" /> Langue par défaut
              </span>
              <select
                className="mt-2 h-11 w-full rounded-xl border border-[#d8e2d4] bg-white px-4 text-sm font-normal outline-none focus:border-[#7a9b74] focus:ring-4 focus:ring-[#315a3d]/[0.08]"
                onChange={(event) => setDefaultLanguage(event.target.value)}
                value={defaultLanguage}
              >
                <option value="fr">Français</option>
                <option value="en">Anglais</option>
                <option value="es">Espagnol</option>
              </select>
              <p className="mt-1 text-xs font-normal text-[#7a8678]">
                pour les nouveaux livres
              </p>
            </label>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[1.75rem] border border-[#b9d1b2] bg-[#edf4e9] shadow-[0_16px_45px_rgba(49,76,53,0.08)]">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4f744d]">
              Votre boutique publique
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-3xl tracking-[-0.04em] text-[#263c29] sm:text-4xl">
              Partagez vos recommandations, à votre manière.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-[#5d705d]">
              Activez votre boutique ici, puis configurez sa vitrine et son lien
              sur la page Boutique.
            </p>
          </div>
          <div className="rounded-2xl border border-[#c6d8c0] bg-[#fffef9] p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-[#314c35] text-white">
                <ShoppingBag aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="font-semibold text-[#304232]">
                  Boutique de livres
                </p>
                <p className="mt-0.5 text-xs text-[#71806e]">
                  {isStoreEnabled
                    ? "Votre vitrine peut maintenant être configurée."
                    : "Préparez votre future vitrine publique."}
                </p>
              </div>
            </div>
            <div className="mt-5 border-t border-[#e0e8dc] pt-4">
              <Toggle
                checked={isStoreEnabled}
                description={
                  isStoreEnabled
                    ? "Boutique activée : vous pouvez poursuivre sa configuration."
                    : "Activez-la pour accéder à sa configuration."
                }
                label="Activer ma boutique"
                onChange={setStoreEnabled}
              />
            </div>
            <Link
              className={`mt-4 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${isStoreEnabled ? "bg-[#314c35] text-white hover:bg-[#263e2a]" : "pointer-events-none bg-[#dfe6dc] text-[#81907e]"}`}
              href="/dashboard/storefront"
            >
              Gérer la boutique
            </Link>
          </div>
        </div>
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
    <div className="flex items-start justify-between gap-5 py-4 first:pt-0 last:pb-0">
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

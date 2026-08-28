import { BookOpen, BookmarkPlus, Search } from "lucide-react";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const stages = [
  {
    icon: Search,
    label: "1. Trouvez un livre",
    title: "Ajoutez-le sans alourdir votre liste.",
    description: "Recherchez un titre, complétez sa fiche et classez-le dans votre bibliothèque personnelle.",
  },
  {
    icon: BookmarkPlus,
    label: "2. Gardez le fil",
    title: "Une lecture reste simple à reprendre.",
    description: "Notez votre dernière page ou votre prochaine étape lorsque vous en avez besoin.",
  },
  {
    icon: BookOpen,
    label: "3. Construisez votre parcours",
    title: "Vos lectures prennent leur place.",
    description: "Retrouvez vos livres terminés, à lire et en cours dans un espace pensé pour durer.",
  },
];

export function ProductShowcase() {
  return (
    <section className="scroll-mt-24 bg-[#fcfbf7] px-6 py-24 sm:px-8 lg:py-32" id="produit">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="BiblioTrack, simplement"
            title="Un endroit calme pour tout ce qui accompagne vos lectures."
            description="Pas de classement complexe, pas de métriques à poursuivre : seulement les bons repères au bon moment."
          />
        </Reveal>

        <div className="mt-14 grid overflow-hidden rounded-[1.75rem] border border-[#d6ddd2] bg-[#d6ddd2] shadow-[0_24px_70px_rgba(25,59,43,0.1)] lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal className="bg-[#193b2b] p-7 text-[#eff4e8] sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#aec7a8]">Ce que vous pouvez faire</p>
            <div className="mt-9 space-y-8">
              {stages.map((stage) => (
                <div className="flex gap-4" key={stage.label}>
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#e9c384]">
                    <stage.icon aria-hidden="true" className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#aecaab]">{stage.label}</p>
                    <h3 className="mt-2 font-serif text-2xl leading-tight">{stage.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#c7d6c3]">{stage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="bg-[#f4f7f1] p-5 sm:p-8" delay={0.1}>
            <div className="h-full rounded-2xl border border-[#dce4d9] bg-[#fffefb] p-5 shadow-sm sm:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-[#e6ebe4] pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#66806a]">Votre point de départ</p>
                  <h3 className="mt-2 font-serif text-3xl tracking-[-0.04em] text-[#1d3526]">Créez votre bibliothèque</h3>
                </div>
                <span className="rounded-full bg-[#edf3e9] px-3 py-1.5 text-xs font-bold text-[#416443]">Nouveau</span>
              </div>

              <div className="mt-7 rounded-xl border border-dashed border-[#bdd0bc] bg-[#f6faf3] p-5 sm:p-6">
                <p className="text-sm font-semibold text-[#304a37]">Quel livre souhaitez-vous ajouter ?</p>
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#d9e3d6] bg-white px-4 py-3 text-sm text-[#778477]">
                  <Search aria-hidden="true" className="size-4 shrink-0 text-[#69806b]" />
                  Rechercher par titre, auteur ou ISBN
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-[7rem_1fr]">
                <div className="flex aspect-[3/4] flex-col justify-between rounded-md bg-[linear-gradient(145deg,#a56d4c,#47372d)] p-3 text-[#fff8eb] shadow-lg">
                  <span className="text-[10px] uppercase tracking-[0.1em]">Votre prochain livre</span>
                  <span className="font-serif text-xl leading-none">À ajouter</span>
                </div>
                <div className="rounded-xl bg-[#f0f4ed] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#66806a]">Une fiche qui vous ressemble</p>
                  <p className="mt-3 font-serif text-2xl leading-tight text-[#213a2a]">Commencez avec un livre. Le reste suivra naturellement.</p>
                  <p className="mt-3 text-sm leading-6 text-[#667267]">Ajoutez vos propres informations, vos envies et vos repères de lecture, à votre rythme.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

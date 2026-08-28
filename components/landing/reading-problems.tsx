import { Bookmark, LibraryBig, ListRestart } from "lucide-react";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const situations = [
  {
    icon: ListRestart,
    title: "Vous perdez le fil",
    description: "Vous reprenez un livre après quelques jours et vous ne savez plus à quelle page, ni dans quel chapitre vous étiez.",
  },
  {
    icon: LibraryBig,
    title: "Vos livres sont éparpillés",
    description: "Vos envies, vos lectures en cours et vos livres terminés vivent dans plusieurs notes, listes ou souvenirs.",
  },
  {
    icon: Bookmark,
    title: "Vous voulez garder une trace",
    description: "Pas pour vous comparer : simplement pour voir le chemin que vos lectures dessinent au fil du temps.",
  },
];

export function ReadingProblems() {
  return (
    <section className="bg-[#f8f5ed] px-6 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Lire devrait rester simple"
            title="Vos livres méritent mieux qu’une liste oubliée."
            description="BiblioTrack rassemble les petits repères qui font qu’une lecture reste vivante, même entre deux moments de calme."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {situations.map((situation, index) => (
            <Reveal delay={index * 0.08} key={situation.title}>
              <article className="h-full rounded-[1.5rem] border border-[#deded5] bg-[#fffef9] p-7 shadow-[0_12px_35px_rgba(25,59,43,0.06)] sm:p-8">
                <span className="grid size-11 place-items-center rounded-xl bg-[#edf2e9] text-[#315a3d]">
                  <situation.icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-8 font-serif text-2xl text-[#213a2a]">{situation.title}</h3>
                <p className="mt-3 leading-7 text-[#667267]">{situation.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

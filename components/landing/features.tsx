import { BookMarked, ChartNoAxesCombined, Library } from "lucide-react";

const features = [
  { icon: Library, title: "Votre bibliothèque, à vous", description: "Ajoutez les livres qui comptent, organisez-les par genre et gardez vos envies de lecture près de vous." },
  { icon: BookMarked, title: "Toujours savoir où reprendre", description: "Enregistrez une page ou une session et retrouvez en un regard votre prochaine étape." },
  { icon: ChartNoAxesCombined, title: "Voir le chemin parcouru", description: "Observez votre rythme de lecture au fil du temps, sans pression ni objectif artificiel." },
];

export function Features() {
  return <section id="experience" className="border-y border-[#d9d7cb] bg-[#fffdf8]"><div className="mx-auto grid max-w-7xl divide-y divide-[#deded5] px-6 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0">{features.map((feature) => <article key={feature.title} className="px-0 py-9 md:px-8 md:first:pl-0 md:last:pr-0"><feature.icon className="mb-5 size-5 text-[#55704f]" aria-hidden="true" /><h2 className="font-serif text-2xl text-[#283127]">{feature.title}</h2><p className="mt-3 text-sm leading-6 text-[#626a60]">{feature.description}</p></article>)}</div></section>;
}

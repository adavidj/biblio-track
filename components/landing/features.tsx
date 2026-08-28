import { landingFeatures } from "./content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Features() {
  return (
    <section id="fonctionnalites" className="scroll-mt-24 bg-[#fcfbf7] px-6 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Pensé pour lire, pas pour performer"
              title="Tout ce dont une lecture a réellement besoin."
            />
          </Reveal>
          <Reveal delay={0.1} className="max-w-xl self-end leading-7 text-[#657266]">
            BiblioTrack retire le bruit autour de vos livres pour vous laisser une seule chose à faire : continuer à lire.
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-[#dce1d7] bg-[#dce1d7] sm:grid-cols-2">
          {landingFeatures.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.08} className="bg-[#fffef9] p-7 sm:p-9">
              <feature.icon className="size-5 text-[#d17a53]" aria-hidden="true" />
              <h3 className="mt-9 font-serif text-2xl text-[#213a2a]">{feature.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-[#667267]">{feature.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

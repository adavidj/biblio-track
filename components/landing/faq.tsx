import { faqItems } from "./content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function FAQ() {
  return (
    <section className="bg-[#f0f4ed] px-6 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Questions fréquentes"
            title="Tout pour commencer sereinement."
          />
        </Reveal>
        <div>
          {faqItems.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.08}>
              <details className="group border-t border-[#cfd9ce] py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-serif text-xl text-[#213a2a] marker:content-none">
                  {item.question}
                  <span className="text-2xl text-[#d17a53] transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-xl pt-4 leading-7 text-[#667267]">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

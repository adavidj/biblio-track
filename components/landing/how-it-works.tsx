import { readingSteps } from "./content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="scroll-mt-24 bg-[#fcfbf7] px-6 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Simple dès le premier livre"
            title="Trois gestes, et vous gardez le fil."
          />
        </Reveal>
        <ol>
          {readingSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.1}>
              <li className="grid grid-cols-[3.75rem_1fr] gap-4 border-t border-[#d9dfd5] py-7 sm:grid-cols-[5rem_1fr] sm:gap-6">
                <span className="font-serif text-2xl text-[#cf7650]">{step.number}</span>
                <div>
                  <h3 className="font-serif text-2xl text-[#213a2a]">{step.title}</h3>
                  <p className="mt-2 max-w-xl leading-7 text-[#667267]">{step.description}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

const steps = [
  { number: "01", title: "Ajoutez un livre", description: "Cherchez un titre, importez ses informations ou créez-le simplement à la main." },
  { number: "02", title: "Enregistrez votre avancée", description: "Une page, une session, un chapitre : conservez le fil de chaque lecture." },
  { number: "03", title: "Retrouvez votre rythme", description: "Votre bibliothèque grandit et votre parcours devient visible, naturellement." },
];

export function HowItWorks() {
  return <section id="comment-ca-marche" className="border-t border-[#d9d7cb] bg-[#f1f2ea]"><div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:py-32"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#55704f]">Simplement, à votre façon</p><h2 className="mt-4 max-w-sm font-serif text-4xl leading-none tracking-[-0.04em] text-[#253025] sm:text-5xl">Trois gestes pour ne plus perdre le fil.</h2></div><ol className="space-y-1">{steps.map((step) => <li key={step.number} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-[#cfd5c9] py-6 sm:grid-cols-[4.5rem_1fr] sm:gap-6"><span className="pt-1 font-serif text-2xl text-[#a95f3f]">{step.number}</span><div><h3 className="font-serif text-2xl text-[#283127]">{step.title}</h3><p className="mt-2 max-w-xl leading-7 text-[#626a60]">{step.description}</p></div></li>)}</ol></div></section>;
}

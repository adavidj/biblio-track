interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";
  const colors =
    tone === "dark"
      ? { eyebrow: "text-[#aec7a8]", title: "text-[#eff4e8]", description: "text-[#c6d4c2]" }
      : { eyebrow: "text-[#55704f]", title: "text-[#193b2b]", description: "text-[#657266]" };

  return (
    <div className={alignment}>
      <p className={`text-xs font-bold uppercase tracking-[0.14em] ${colors.eyebrow}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-4 font-serif text-4xl leading-none tracking-[-0.045em] sm:text-5xl ${colors.title}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-6 max-w-xl text-lg leading-8 ${align === "center" ? "mx-auto" : ""} ${colors.description}`}>
          {description}
        </p>
      )}
    </div>
  );
}

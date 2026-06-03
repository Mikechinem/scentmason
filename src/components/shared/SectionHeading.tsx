type SectionHeadingProps = {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  headline,
  subheadline,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto text-center items-center"
      : "items-start text-left";

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow ? (
        <p className="w-fit rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-bold text-[var(--accent)]">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-balance text-3xl font-black tracking-tight text-[var(--primary)] sm:text-4xl lg:text-5xl">
        {headline}
      </h2>

      {subheadline ? (
        <p className="max-w-2xl text-base leading-7 text-[var(--text-muted)] sm:text-lg">
          {subheadline}
        </p>
      ) : null}
    </div>
  );
}

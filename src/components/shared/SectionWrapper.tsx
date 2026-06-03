import type { ReactNode } from "react";

type SectionWrapperProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

export default function SectionWrapper({
  id,
  children,
  className = "",
  innerClassName = "",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className={`section-container ${innerClassName}`}>{children}</div>
    </section>
  );
}

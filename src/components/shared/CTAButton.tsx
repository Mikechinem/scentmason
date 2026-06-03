import type { ReactNode } from "react";
import Link from "next/link";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: CTAButtonProps) {
  const baseClass =
    "inline-flex min-h-14 items-center justify-center rounded-full px-6 py-4 text-center text-sm font-black leading-tight transition duration-200 sm:text-base";

  const variantClass = {
    primary:
      "bg-[var(--primary)] !text-white shadow-soft hover:bg-[var(--primary-hover)]",
    secondary:
      "bg-[var(--accent)] text-[var(--primary)] hover:brightness-95",
    ghost:
      "border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)] hover:bg-[var(--surface-strong)]",
  }[variant];

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${className}`}
    >
      {children}
    </Link>
  );
}
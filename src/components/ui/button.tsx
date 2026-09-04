import Link from "next/link";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

const solid: Record<Tone, string> = {
  // Wheat is darkened on paper and brightened on ink so both pass AA.
  light: "bg-wheat text-paper hover:bg-[#7d5d0d]",
  dark: "bg-wheat-bright text-ink-deep hover:bg-[#ddb65b]",
};

const quiet: Record<Tone, string> = {
  light:
    "text-ink underline decoration-rule underline-offset-4 hover:decoration-wheat",
  dark: "text-bone underline decoration-rule-dark underline-offset-4 hover:decoration-wheat-bright",
};

type CtaProps = {
  href: string;
  variant?: "solid" | "quiet";
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
};

/**
 * index.html's `.btn`, as a link. Every call to action on this site navigates
 * or opens mail — there are no in-page button actions outside the forms.
 */
export function Cta({
  href,
  variant = "solid",
  tone = "light",
  className,
  children,
}: CtaProps) {
  const styles =
    variant === "solid"
      ? cn(
          "inline-block px-7 py-[0.8125rem] text-[1.0625rem] font-medium no-underline transition-colors",
          solid[tone]
        )
      : cn("text-[0.9375rem] transition-colors", quiet[tone]);

  const external = href.startsWith("mailto:") || href.startsWith("http");

  if (external) {
    return (
      <a href={href} className={cn(styles, className)}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(styles, className)}>
      {children}
    </Link>
  );
}

/** The same treatment as a real button, for form submission. */
export function Button({
  tone = "light",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-block px-7 py-[0.8125rem] text-[1.0625rem] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        solid[tone],
        className
      )}
    >
      {children}
    </button>
  );
}

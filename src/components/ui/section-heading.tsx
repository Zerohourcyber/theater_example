import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small pale-blue kicker line above the title, e.g. "On Stage". */
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Heading level for the title element; defaults to h2. */
  as?: "h1" | "h2" | "h3";
}

/** Standard section heading: accent eyebrow, display-serif title, muted lede. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent sm:text-sm">
          <span aria-hidden className="mr-2 text-primary">
            /
          </span>
          {eyebrow}
        </p>
      ) : null}
      <Tag className="text-4xl leading-[1.02] sm:text-6xl">{title}</Tag>
      {description ? (
        <p className="mt-5 text-lg text-muted">{description}</p>
      ) : null}
    </div>
  );
}

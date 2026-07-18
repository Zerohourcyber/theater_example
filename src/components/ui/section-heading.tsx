import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small gold kicker line above the title, e.g. "On Stage". */
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Heading level for the title element; defaults to h2. */
  as?: "h1" | "h2" | "h3";
}

/** Standard section heading: gold eyebrow, display-serif title, muted lede. */
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
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="text-3xl sm:text-5xl">{title}</Tag>
      {description ? (
        <p className="mt-4 text-lg text-muted">{description}</p>
      ) : null}
    </div>
  );
}

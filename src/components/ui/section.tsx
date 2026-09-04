import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

type SectionProps = {
  id?: string;
  /** Draw the hairline top rule that separates stacked sections. */
  ruled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, ruled, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-[clamp(3rem,7vh,4.75rem)]",
        ruled && "border-t border-rule",
        className
      )}
    >
      {children}
    </section>
  );
}

type SplitSectionProps = {
  id?: string;
  ruled?: boolean;
  heading: React.ReactNode;
  /** Standing note under the heading in the left rail. */
  note?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Heading in a left rail, content beside it. The long-form pages need this:
 * a single narrow measure under a full-width heading leaves half the page
 * empty and reads like an unfinished draft rather than a document.
 */
export function SplitSection({
  id,
  ruled,
  heading,
  note,
  children,
}: SplitSectionProps) {
  return (
    <Section
      id={id}
      ruled={ruled}
      className="grid grid-cols-1 gap-x-[clamp(2rem,5vw,4rem)] gap-y-6 lg:grid-cols-[13rem_1fr]"
    >
      <div>
        <SectionHeading className="mb-0 max-w-none">{heading}</SectionHeading>
        {note ? (
          <p className="m-0 mt-3 text-[0.875rem] leading-snug text-ink-dim">
            {note}
          </p>
        ) : null}
      </div>
      <div className="min-w-0">{children}</div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Dark band                                                           */
/* ------------------------------------------------------------------ */

type DarkBandProps = {
  id?: string;
  /** `raised` is the slightly lifted surface used for the contact block. */
  tone?: "deep" | "raised";
  className?: string;
  children: React.ReactNode;
};

/**
 * The inverted ground: near-black with bone text. `on-dark` retargets the
 * focus ring to the brighter gold and flattens the band for print.
 */
export function DarkBand({
  id,
  tone = "deep",
  className,
  children,
}: DarkBandProps) {
  return (
    <div
      id={id}
      className={cn(
        "on-dark text-bone",
        tone === "deep" ? "bg-ink-deep" : "bg-ink-raised",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Headings and prose                                                  */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("m-0 text-[0.9375rem] italic text-ink-dim", className)}>
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "mb-6 max-w-[22ch] text-[clamp(1.5rem,1.2rem+1.2vw,2rem)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/** Narrow measure with the source files' paragraph rhythm. */
export function Prose({
  children,
  className,
  wide,
}: {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn("space-y-5", wide ? "measure-wide" : "measure", className)}
    >
      {children}
    </div>
  );
}

/**
 * The pull quote from packet.html — a wheat-ruled aside used once or twice
 * per page to carry the sentence that matters most.
 */
export function Pull({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "measure-wide my-8 border-l-2 border-wheat py-1 pl-5 text-[1.125rem] italic leading-[1.55] text-ink-2",
        className
      )}
    >
      {children}
    </p>
  );
}

export { Container };

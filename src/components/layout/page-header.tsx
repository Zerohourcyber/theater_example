import { Container } from "@/components/layout/container";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

/**
 * Interior-page header band: slash-prefixed kicker, oversized editorial
 * display title, description offset to the right on wide screens.
 */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="spotlight border-b border-border/60 pb-14 pt-40">
      <Container>
        {eyebrow ? (
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-accent sm:text-sm">
            <span aria-hidden className="mr-2 text-primary">
              /
            </span>
            {eyebrow}
          </p>
        ) : null}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h1 className="max-w-4xl text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.98]">
            {title}
          </h1>
          {description ? (
            <p className="max-w-md shrink-0 text-lg leading-relaxed text-muted lg:pb-3">
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </div>
  );
}

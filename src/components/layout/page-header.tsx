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
    <div className="spotlight border-b border-border pb-14 pt-36">
      <Container>
        {eyebrow ? (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
        ) : null}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h1 className="max-w-3xl text-5xl tracking-tight sm:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-md shrink-0 text-lg leading-relaxed text-muted lg:pb-2">
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </div>
  );
}

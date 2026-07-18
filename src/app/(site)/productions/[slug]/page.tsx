import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { TicketCta } from "@/components/sections/ticket-cta";
import { Badge } from "@/components/ui/badge";
import { SmartImage } from "@/components/ui/image-placeholder";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProductionBySlug, getProductions } from "@/lib/sanity/fetch";
import { formatDateTime } from "@/lib/utils";
import type { CreditMember } from "@/types";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const productions = await getProductions();
  return productions.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const production = await getProductionBySlug(slug);
  if (!production) return {};
  return {
    title: production.title,
    description: `${production.title} — ${production.venue ?? "presented by our youth-led company"}.`,
  };
}

function CreditList({ title, credits }: { title: string; credits: CreditMember[] }) {
  if (!credits.length) return null;
  return (
    <div>
      <h3 className="flex items-center gap-2 text-2xl">
        <Users aria-hidden className="size-5 text-accent" />
        {title}
      </h3>
      <ul className="mt-4 divide-y divide-border/60">
        {credits.map((credit, i) => (
          <li
            key={credit._key ?? `${credit.person._id}-${i}`}
            className="flex items-baseline justify-between gap-4 py-2.5"
          >
            <span>{credit.person.name}</span>
            <span className="text-right text-sm text-muted">{credit.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const statusLabel = {
  upcoming: "Upcoming",
  current: "Now playing",
  past: "Past production",
} as const;

export default async function ProductionDetailPage({ params }: Props) {
  const { slug } = await params;
  const production = await getProductionBySlug(slug);
  if (!production) notFound();

  return (
    <>
      {/* Hero */}
      <div className="spotlight border-b border-border/60 pb-16 pt-32">
        <Container className="grid items-end gap-10 lg:grid-cols-3">
          <FadeIn className="lg:col-span-1">
            <div className="relative mx-auto aspect-2/3 w-full max-w-xs overflow-hidden rounded-lg border border-border lg:mx-0">
              <SmartImage
                image={production.poster}
                alt={`Poster for ${production.title}`}
                sizes="(min-width: 1024px) 30vw, 80vw"
                priority
                placeholderLabel={production.title}
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="space-y-5 lg:col-span-2">
            <Badge variant={production.status === "past" ? "muted" : "gold"}>
              {statusLabel[production.status]}
            </Badge>
            <h1 className="text-5xl sm:text-6xl">{production.title}</h1>
            {production.venue ? (
              <p className="flex items-center gap-2 text-muted">
                <MapPin aria-hidden className="size-5 text-accent" />
                {production.venue}
              </p>
            ) : null}
          </FadeIn>
        </Container>
      </div>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-12 lg:col-span-2">
            {production.synopsis ? (
              <FadeIn>
                <SectionHeading eyebrow="The story" title="Synopsis" />
                <div className="mt-6 space-y-4 text-muted [&>p]:leading-relaxed">
                  <PortableText value={production.synopsis} />
                </div>
              </FadeIn>
            ) : null}

            {(production.cast?.length || production.crew?.length) ? (
              <FadeIn className="grid gap-10 sm:grid-cols-2">
                <CreditList title="Cast" credits={production.cast ?? []} />
                <CreditList title="Crew" credits={production.crew ?? []} />
              </FadeIn>
            ) : null}

            {production.gallery?.length ? (
              <FadeIn>
                <SectionHeading eyebrow="Production photos" title="Gallery" />
                <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {production.gallery.map((image, i) => (
                    <li
                      key={image.url ?? i}
                      className="relative aspect-square overflow-hidden rounded-lg border border-border"
                    >
                      <SmartImage
                        image={image}
                        alt={image.alt ?? `${production.title} production photo ${i + 1}`}
                        sizes="(min-width: 1024px) 22vw, 45vw"
                      />
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ) : null}
          </div>

          {/* Sidebar */}
          <FadeIn delay={0.1} className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <TicketCta production={production} />

            {production.performances?.length ? (
              <div className="rounded-lg border border-border bg-surface p-6">
                <h2 className="flex items-center gap-2 text-2xl">
                  <CalendarDays aria-hidden className="size-5 text-accent" />
                  Performances
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {production.performances.map((perf) => (
                    <li key={perf._key ?? perf.dateTime}>
                      {formatDateTime(perf.dateTime)}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </FadeIn>
        </Container>
      </section>
    </>
  );
}

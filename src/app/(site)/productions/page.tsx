import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { ProductionCard } from "@/components/cards/production-card";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { Badge } from "@/components/ui/badge";
import { SmartImage } from "@/components/ui/image-placeholder";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProductions } from "@/lib/sanity/fetch";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Productions",
  description:
    "Upcoming and past productions — student-performed, student-directed, student-built.",
};

export default async function ProductionsPage() {
  const productions = await getProductions();
  const upcoming = productions.filter((p) => p.status !== "past");
  const past = productions.filter((p) => p.status === "past");

  return (
    <>
      <PageHeader
        eyebrow="Productions"
        title="What we're staging"
        description="Every show is performed, directed, designed, and produced by students."
      />

      <section className="py-20">
        <Container className="space-y-20">
          {upcoming.length ? (
            <div>
              <FadeIn>
                <SectionHeading eyebrow="On sale & in rehearsal" title="Upcoming" />
              </FadeIn>
              <div className="mt-10 space-y-8">
                {upcoming.map((production, i) => (
                  <FadeIn key={production._id} delay={i * 0.08}>
                    {/* Featured row: poster + details side by side, full width */}
                    <Link
                      href={`/productions/${production.slug}`}
                      className="card-lift group grid gap-8 rounded-lg border border-border bg-surface p-6 sm:grid-cols-[minmax(180px,240px)_1fr] sm:p-8"
                    >
                      <div className="relative mx-auto aspect-2/3 w-full max-w-[240px] overflow-hidden rounded-md border border-border/60">
                        <SmartImage
                          image={production.poster}
                          alt={`Poster for ${production.title}`}
                          sizes="(min-width: 640px) 240px, 80vw"
                          placeholderLabel={production.title}
                        />
                      </div>
                      <div className="flex flex-col justify-center gap-4">
                        <div>
                          <Badge
                            variant={
                              production.status === "past" ? "muted" : "gold"
                            }
                          >
                            {production.status === "current"
                              ? "Now playing"
                              : "Upcoming"}
                          </Badge>
                        </div>
                        <h3 className="text-3xl transition-colors group-hover:text-primary sm:text-4xl">
                          {production.title}
                        </h3>
                        <div className="space-y-1.5 text-sm text-muted">
                          {production.openingNight ? (
                            <p className="flex items-center gap-2">
                              <CalendarDays
                                aria-hidden
                                className="size-4 text-accent/70"
                              />
                              Opens {formatDate(production.openingNight)}
                            </p>
                          ) : null}
                          {production.venue ? (
                            <p className="flex items-center gap-2">
                              <MapPin
                                aria-hidden
                                className="size-4 text-accent/70"
                              />
                              {production.venue}
                            </p>
                          ) : null}
                        </div>
                        <p className="mt-2 flex items-center gap-2 text-sm font-medium text-primary">
                          Details & tickets
                          <ArrowRight
                            aria-hidden
                            className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                          />
                        </p>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          ) : null}

          {past.length ? (
            <div>
              <FadeIn>
                <SectionHeading eyebrow="The archive" title="Past productions" />
              </FadeIn>
              <StaggerChildren className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {past.map((production) => (
                  <StaggerItem key={production._id}>
                    <ProductionCard production={production} />
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}

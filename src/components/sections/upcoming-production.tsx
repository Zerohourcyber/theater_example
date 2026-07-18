import Link from "next/link";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/ui/image-placeholder";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatDate, formatDateTime } from "@/lib/utils";
import type { Production } from "@/types";

export function UpcomingProduction({ production }: { production: Production }) {
  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="On stage next"
            title={production.title}
            description={
              production.openingNight
                ? `Opening night ${formatDate(production.openingNight)}`
                : undefined
            }
          />
        </FadeIn>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-5">
          <FadeIn className="lg:col-span-2">
            <div className="relative mx-auto aspect-2/3 w-full max-w-sm overflow-hidden rounded-lg border border-border">
              <SmartImage
                image={production.poster}
                alt={`Poster for ${production.title}`}
                sizes="(min-width: 1024px) 40vw, 100vw"
                placeholderLabel={production.title}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-6 lg:col-span-3">
            <Badge>Upcoming production</Badge>

            <div className="space-y-3 text-muted">
              {production.venue ? (
                <p className="flex items-center gap-3">
                  <MapPin aria-hidden className="size-5 text-primary" />
                  {production.venue}
                </p>
              ) : null}
              {production.performances?.length ? (
                <div className="flex items-start gap-3">
                  <CalendarDays aria-hidden className="mt-1 size-5 shrink-0 text-primary" />
                  <ul className="space-y-1">
                    {production.performances.map((perf) => (
                      <li key={perf._key ?? perf.dateTime}>
                        {formatDateTime(perf.dateTime)}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="gold-rule w-full max-w-md" />

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href={`/productions/${production.slug}`}>
                  <Ticket aria-hidden />
                  {production.ticketsEnabled ? "Get Tickets" : "Production Details"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/auditions">Audition Info</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

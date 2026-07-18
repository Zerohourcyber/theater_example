import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { CalendarDays, Drama, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/motion/fade-in";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatDate } from "@/lib/utils";
import { getUpcomingProduction } from "@/lib/sanity/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Auditions",
  description:
    "Open audition calls, what to expect, and how to join our next production — no experience required.",
};

const expectations = [
  {
    icon: Drama,
    title: "Prepare something short",
    description:
      "A monologue or song under two minutes. If you've never auditioned before, we'll give you a reading on the spot — bravery beats polish.",
  },
  {
    icon: Users,
    title: "Everyone auditions together",
    description:
      "Group warm-ups first, then individual slots. You'll watch your future castmates and cheer for them. It's less scary than it sounds.",
  },
  {
    icon: Sparkles,
    title: "There's a role for everyone",
    description:
      "Not cast? Every production needs stage managers, designers, builders, and front-of-house crew — and those credits count just as much.",
  },
];

export default async function AuditionsPage() {
  const upcoming = await getUpcomingProduction();
  const nextProduction = upcoming?.auditionInfo ? upcoming : null;

  return (
    <>
      <PageHeader
        eyebrow="Auditions"
        title="Your first role starts here"
        description="Open to all students ages 13–20. No experience, headshot, or résumé required."
      />

      <section className="py-20">
        <Container>
          {nextProduction ? (
            <FadeIn className="mx-auto max-w-3xl rounded-lg border border-primary/40 bg-surface p-8 sm:p-10">
              <Badge>Now casting</Badge>
              <h2 className="mt-4 text-3xl sm:text-5xl">{nextProduction.title}</h2>
              {nextProduction.openingNight ? (
                <p className="mt-3 flex items-center gap-2 text-muted">
                  <CalendarDays aria-hidden className="size-5 text-accent" />
                  Opens {formatDate(nextProduction.openingNight)} ·{" "}
                  {nextProduction.venue}
                </p>
              ) : null}
              <div className="mt-6 space-y-4 text-muted [&>p]:leading-relaxed">
                <PortableText value={nextProduction.auditionInfo!} />
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/contact">Sign up for a slot</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/productions/${nextProduction.slug}`}>
                    About the production
                  </Link>
                </Button>
              </div>
            </FadeIn>
          ) : (
            <FadeIn className="mx-auto max-w-2xl rounded-lg border border-border bg-surface p-10 text-center">
              <h2 className="text-3xl">No open auditions right now</h2>
              <p className="mt-3 text-muted">
                Our next audition call will be announced here and in the
                newsletter — usually six to eight weeks before opening night.
              </p>
              <div className="mt-8 flex justify-center">
                <NewsletterForm />
              </div>
            </FadeIn>
          )}
        </Container>
      </section>

      <section className="border-t border-border/60 bg-surface/30 py-20">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="What to expect"
              title="Auditions, demystified"
              align="center"
            />
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {expectations.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="card-lift h-full rounded-lg border border-border bg-surface p-8">
                  <item.icon aria-hidden className="mb-4 size-7 text-accent" />
                  <h3 className="text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

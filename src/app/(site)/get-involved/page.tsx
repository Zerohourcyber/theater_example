import type { Metadata } from "next";
import Link from "next/link";
import {
  Brush,
  Hammer,
  HandHeart,
  Megaphone,
  Star,
  Ticket,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Volunteer backstage or in the house, or sponsor a season of youth-led theater.",
};

const volunteerRoles = [
  {
    icon: Hammer,
    title: "Stage crew",
    description:
      "Build days, load-ins, and running crew on show nights. We'll teach you everything — including how to use a drill safely.",
  },
  {
    icon: Ticket,
    title: "Front of house",
    description:
      "Box office, ushering, concessions, and making every audience member feel like it's opening night on Broadway.",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    description:
      "Posters, social clips, press outreach, and program design. Help our student marketing lead make 'sold out' a habit.",
  },
  {
    icon: Brush,
    title: "Design",
    description:
      "Sets, costumes, lights, sound, and props — mentored student design crews with room for beginners and specialists alike.",
  },
];

const sponsorReasons = [
  {
    title: "Community tier",
    description:
      "For families and neighbors. Your name in every program, and our sincere gratitude from the stage.",
  },
  {
    title: "Silver tier",
    description:
      "For local businesses. Logo in programs and on the sponsor wall of this site, plus opening-night tickets.",
  },
  {
    title: "Gold tier",
    description:
      "Season naming on a production, logo on posters and tickets, and a curtain-speech thank-you at every performance.",
  },
  {
    title: "Partner tier",
    description:
      "Institutional partners who provide space, equipment, or sustained funding — the foundation everything else stands on.",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get involved"
        title="Every show needs a crew"
        description="Volunteer your hands and hours, or sponsor a season — both keep participation free for every student."
      />

      {/* Volunteer half */}
      <section className="py-20" aria-labelledby="volunteer-heading">
        <Container>
          <FadeIn>
            <div id="volunteer-heading">
              <SectionHeading
                eyebrow="Volunteer"
                title="Give your hours"
                description="Adults and students alike — there's a job for every skill level, and pizza at every build day."
              />
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-x-14 gap-y-2 sm:grid-cols-2">
            {volunteerRoles.map((role, i) => (
              <FadeIn key={role.title} delay={i * 0.06}>
                <div className="flex gap-5 border-b border-border/60 py-6">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10">
                    <role.icon aria-hidden className="size-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl">{role.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {role.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-10">
            <Button asChild size="lg">
              <Link href="/contact?subject=Volunteering">
                <HandHeart aria-hidden />
                Volunteer with us
              </Link>
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* Sponsor half */}
      <section
        className="border-t border-border/60 bg-surface/30 py-20"
        aria-labelledby="sponsor-heading"
      >
        <Container>
          <FadeIn>
            <div id="sponsor-heading">
              <SectionHeading
                eyebrow="Sponsors & partners"
                title="Put your name in lights"
                description="Sponsorship keeps tickets affordable and participation free. Every tier is a visible, public investment in young artists."
              />
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {sponsorReasons.map((tier, i) => (
              <FadeIn key={tier.title} delay={i * 0.06}>
                <div className="card-lift h-full rounded-lg border border-border border-l-2 border-l-primary/60 bg-surface p-8">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-2xl">{tier.title}</h3>
                    <Star aria-hidden className="size-4 shrink-0 text-accent/70" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {tier.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-10">
            <Button asChild size="lg" variant="outline">
              <Link href="/contact?subject=Sponsorship">
                Talk to us about sponsoring
              </Link>
            </Button>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}

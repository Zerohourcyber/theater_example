import { HandHeart, Megaphone, Theater } from "lucide-react";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { SectionHeading } from "@/components/ui/section-heading";

const pillars = [
  {
    icon: Theater,
    title: "Perform",
    description:
      "Real productions on a real stage. Students act, sing, design, build, and run every show — no one sits on the sidelines.",
  },
  {
    icon: Megaphone,
    title: "Lead",
    description:
      "Directors, producers, stage managers, and designers are all students. Adults mentor; young people make the calls.",
  },
  {
    icon: HandHeart,
    title: "Serve",
    description:
      "Affordable tickets, free participation, and workshops for younger students — theater that gives back to the community that built it.",
  },
];

export function MissionSection() {
  return (
    <section className="border-y border-border/60 bg-surface/30 py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
        <FadeIn>
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="Our mission"
              title="Perform. Lead. Serve."
              description="Three commitments behind every production we stage."
            />
            <div className="brand-rule mt-10 w-24" />
          </div>
        </FadeIn>

        <StaggerChildren className="divide-y divide-border/60">
          {pillars.map((pillar, i) => (
            <StaggerItem key={pillar.title}>
              <div className="flex gap-6 py-9 first:pt-0 last:pb-0 sm:gap-10">
                <span
                  aria-hidden
                  className="font-display text-4xl leading-none text-primary/50 sm:text-5xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="flex items-center gap-3 text-2xl">
                    {pillar.title}
                    <pillar.icon aria-hidden className="size-5 text-accent" />
                  </h3>
                  <p className="mt-3 max-w-prose leading-relaxed text-muted">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}

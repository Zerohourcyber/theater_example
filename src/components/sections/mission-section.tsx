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
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Our mission"
            title="Perform. Lead. Serve."
            description="Three commitments behind every production we stage."
            align="center"
          />
        </FadeIn>

        <StaggerChildren className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <div className="card-lift h-full rounded-lg border border-border bg-surface p-8 text-center">
                <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                  <pillar.icon aria-hidden className="size-7 text-primary" />
                </div>
                <h3 className="text-2xl">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {pillar.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}

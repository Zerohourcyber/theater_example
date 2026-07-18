import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PersonCard } from "@/components/cards/person-card";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Person } from "@/types";

export function FoundersGrid({
  founders,
  showBios = false,
}: {
  founders: Person[];
  showBios?: boolean;
}) {
  if (!founders.length) return null;

  return (
    <section className="border-y border-border/60 bg-surface/30 py-24">
      <Container>
        <FadeIn className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="The founders"
            title="Built by students"
            description="The people who decided the show must go on — and made it an organization."
          />
          {!showBios ? (
            <Button asChild variant="link">
              <Link href="/about">
                Meet the whole team <ArrowRight aria-hidden />
              </Link>
            </Button>
          ) : null}
        </FadeIn>

        <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {founders.map((person) => (
            <StaggerItem key={person._id} className="h-full">
              <PersonCard person={person} showBio={showBios} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}

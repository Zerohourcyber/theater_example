import type { Metadata } from "next";
import { ProductionCard } from "@/components/cards/production-card";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProductions } from "@/lib/sanity/fetch";

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
              <StaggerChildren className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((production) => (
                  <StaggerItem key={production._id}>
                    <ProductionCard production={production} />
                  </StaggerItem>
                ))}
              </StaggerChildren>
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

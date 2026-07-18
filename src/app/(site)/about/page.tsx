import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { GraduationCap } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/motion/fade-in";
import { FoundersGrid } from "@/components/sections/founders-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { getFounders, getSiteSettings } from "@/lib/sanity/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description: `The story, mission, and founders of ${siteConfig.name} — a youth-led community theater.`,
};

export default async function AboutPage() {
  const [settings, founders] = await Promise.all([
    getSiteSettings(),
    getFounders(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A theater company run by the people on stage"
        description={settings.tagline}
      />

      {/* Story */}
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <FadeIn>
            <SectionHeading eyebrow="Our story" title="From summer project to institution" />
            {settings.aboutStory ? (
              <div className="prose-invert mt-6 space-y-4 text-muted [&>p]:leading-relaxed">
                <PortableText value={settings.aboutStory} />
              </div>
            ) : null}
          </FadeIn>

          {/* Timeline */}
          <FadeIn delay={0.1}>
            <ol className="relative space-y-10 border-l border-border pl-8">
              {settings.timeline?.map((item, i) => (
                <li key={`${item.year}-${i}`} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[2.35rem] top-1.5 size-3 rounded-full border border-primary bg-background"
                  />
                  <p className="text-sm font-medium uppercase tracking-widest text-accent">
                    {item.year}
                  </p>
                  <h3 className="mt-1 text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </FadeIn>
        </Container>
      </section>

      <FoundersGrid founders={founders} showBios />

      {/* College partnership */}
      <section className="py-20">
        <Container>
          <FadeIn className="spotlight-band mx-auto flex max-w-4xl flex-col gap-6 rounded-lg border border-border bg-surface p-8 sm:flex-row sm:items-start sm:gap-8 sm:p-10">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-md border border-primary/40 bg-primary/10">
              <GraduationCap aria-hidden className="size-7 text-accent" />
            </div>
            <div>
              <h2 className="text-3xl">
                In partnership with {siteConfig.collegePartner}
              </h2>
              <p className="mt-4 max-w-2xl text-muted">
                Our residency with {siteConfig.collegePartner} gives the company
                rehearsal space, scene-shop access, and two productions a year on
                a professional stage — plus mentorship pairing our student
                designers with college theater majors. We’re grateful to perform
                in a space that takes young artists seriously.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}

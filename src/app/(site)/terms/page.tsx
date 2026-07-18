import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for using the ${siteConfig.name} website and purchasing tickets.`,
};

/*
 * NOTE: Plain-language placeholder terms for the POC.
 * Have an adult board member / attorney review before launch.
 */
export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <section className="py-16">
        <Container className="max-w-3xl space-y-8 leading-relaxed text-muted [&_h2]:text-2xl [&_h2]:text-foreground">
          <p className="rounded-md border border-accent/40 bg-accent/10 p-4 text-sm text-foreground">
            Placeholder for the proof of concept — these terms must be reviewed
            by the organization’s board and counsel before public launch.
          </p>

          <div className="space-y-3">
            <h2>Tickets</h2>
            <p>
              Tickets are general admission and sold in test/demo mode during
              the proof-of-concept period. If a performance is canceled,
              tickets are refunded in full. Otherwise, tickets are
              non-refundable, but we’ll gladly exchange them for another
              performance of the same production when seats allow.
            </p>
          </div>

          <div className="space-y-3">
            <h2>Being a good audience</h2>
            <p>
              Doors open 30 minutes before curtain. Late arrivals are seated at
              an appropriate pause. Recording performances is not permitted —
              licensing agreements for the shows we produce forbid it.
            </p>
          </div>

          <div className="space-y-3">
            <h2>This website</h2>
            <p>
              Site content — including production photography and artwork —
              belongs to {siteConfig.name} or its licensors. You’re welcome to
              share links and excerpts with credit; please don’t republish
              whole pages or images without asking.
            </p>
          </div>

          <div className="space-y-3">
            <h2>Liability</h2>
            <p>
              We provide this site as-is. To the fullest extent the law
              allows, {siteConfig.name} is not liable for indirect damages
              arising from use of the site. Nothing here limits rights you
              have under applicable law.
            </p>
          </div>

          <div className="space-y-3">
            <h2>Questions</h2>
            <p>
              Write to {siteConfig.contactEmail} — a real student will answer.
            </p>
          </div>

          <p className="text-sm">Last updated: July 2026</p>
        </Container>
      </section>
    </>
  );
}

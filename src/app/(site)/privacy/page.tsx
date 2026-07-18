import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles your information.`,
};

/*
 * NOTE: Plain-language placeholder policy for the POC.
 * Have an adult board member / attorney review before launch.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="py-16">
        <Container className="max-w-3xl space-y-8 leading-relaxed text-muted [&_h2]:text-2xl [&_h2]:text-foreground">
          <p className="rounded-md border border-accent/40 bg-accent/10 p-4 text-sm text-foreground">
            Placeholder for the proof of concept — this policy must be reviewed
            by the organization’s board and counsel before public launch.
          </p>

          <div className="space-y-3">
            <h2>What we collect</h2>
            <p>
              When you buy tickets, contact us, or join our newsletter, we
              collect the information you give us: your name, email address,
              and the contents of your message. Ticket payments are processed
              by Stripe — we never see or store your card number.
            </p>
          </div>

          <div className="space-y-3">
            <h2>How we use it</h2>
            <p>
              We use your information to fulfill ticket orders, reply to your
              messages, and — if you signed up — send occasional show
              announcements. We do not sell, rent, or share your information
              with anyone for marketing purposes.
            </p>
          </div>

          <div className="space-y-3">
            <h2>Young people’s privacy</h2>
            <p>
              We are a youth organization and take this seriously. Our website
              forms are intended for visitors 13 and older. Photos of student
              participants are published only with participant (and, for
              minors, guardian) consent collected during registration.
            </p>
          </div>

          <div className="space-y-3">
            <h2>Third-party services</h2>
            <p>
              We use Stripe for payments, Resend for transactional email, and
              Sanity to manage site content. Each processes data under its own
              privacy policy.
            </p>
          </div>

          <div className="space-y-3">
            <h2>Your choices</h2>
            <p>
              Email {siteConfig.contactEmail} to unsubscribe from the
              newsletter, ask what information we hold about you, or ask us to
              delete it.
            </p>
          </div>

          <p className="text-sm">Last updated: July 2026</p>
        </Container>
      </section>
    </>
  );
}

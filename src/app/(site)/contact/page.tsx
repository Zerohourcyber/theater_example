import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/motion/fade-in";
import { contactSubjects, type ContactSubject } from "@/config/contact";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Questions about auditions, tickets, volunteering, or sponsorship? Write to ${siteConfig.name}.`,
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const { subject } = await searchParams;
  const defaultSubject = contactSubjects.includes(subject as ContactSubject)
    ? (subject as ContactSubject)
    : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Say hello"
        description="Auditions, tickets, volunteering, sponsorship, or anything else — we read everything."
      />

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-3">
          <FadeIn className="lg:col-span-2">
            <ContactForm defaultSubject={defaultSubject} />
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-8">
            <div>
              <h2 className="text-2xl">Email us directly</h2>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="mt-2 inline-flex items-center gap-2 text-primary hover:underline"
              >
                <Mail aria-hidden className="size-4" />
                {siteConfig.contactEmail}
              </a>
            </div>
            <div>
              <h2 className="text-2xl">Follow along</h2>
              <ul className="mt-2 space-y-2">
                {siteConfig.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted transition-colors hover:text-foreground"
                    >
                      {social.label}{" "}
                      <span className="text-primary">{social.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-surface p-6 text-sm text-muted">
              We’re a student-run organization — replies can take a few days
              during tech week. Urgent ticket issues on a show night? Find the
              house manager at the box office.
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}

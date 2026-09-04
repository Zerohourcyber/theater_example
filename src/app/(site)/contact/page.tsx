import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { Section } from "@/components/ui/section";
import { isContactSubject, type ContactSubject } from "@/config/contact";
import { placeholderText, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about helping start a youth-led theater in Portales, supporting it, or performing and crewing.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const { subject } = await searchParams;
  const initialSubject: ContactSubject | undefined =
    subject && isContactSubject(subject) ? subject : undefined;

  const email = placeholderText(siteConfig.contactEmail);

  return (
    <>
      <PageHeader
        title="Talk to us"
        standfirst="Whether you want to help build it, support it, be on stage, or just ask what this is — someone will answer."
      />

      <Container>
        <Section className="grid grid-cols-1 gap-x-[clamp(2rem,5vw,4.5rem)] gap-y-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <ContactForm initialSubject={initialSubject} />
          </div>

          <aside className="space-y-8 lg:pt-2">
            <div>
              <h2 className="mb-2 text-[1.125rem] font-medium">By email</h2>
              <a
                href={`mailto:${email}`}
                className="border-b border-wheat pb-0.5 text-[1.125rem] no-underline [word-break:break-word] hover:text-wheat"
              >
                {email}
              </a>
              <p className="m-0 mt-4 text-[0.9375rem] text-ink-dim">
                Reaches the same place as the form. We read everything and reply
                within a few days.
              </p>
            </div>

            <div className="border-t border-rule pt-7">
              <h2 className="mb-2 text-[1.125rem] font-medium">
                If you&rsquo;re under 18
              </h2>
              <p className="m-0 text-[0.9375rem] text-ink-dim">
                You&rsquo;re very welcome to write to us directly. For anything
                involving auditions, rehearsals or travel we will need a parent
                or guardian in the conversation before you take part.
              </p>
            </div>

            <div className="border-t border-rule pt-7">
              <h2 className="mb-2 text-[1.125rem] font-medium">
                What we can&rsquo;t answer yet
              </h2>
              <p className="m-0 text-[0.9375rem] text-ink-dim">
                Audition dates, which show we&rsquo;re staging, ticket prices,
                and the venue. None of those are decided. Ask anyway and
                you&rsquo;ll be first to hear when they are.
              </p>
            </div>
          </aside>
        </Section>
      </Container>
    </>
  );
}

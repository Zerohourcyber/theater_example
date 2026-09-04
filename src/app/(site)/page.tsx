import Link from "next/link";
import { Container } from "@/components/layout/container";
import { StatusLedger } from "@/components/sections/status-ledger";
import { Cta } from "@/components/ui/button";
import { DarkBand, Section, SectionHeading } from "@/components/ui/section";
import { placeholderText, siteConfig } from "@/config/site";
import { waysToHelp } from "@/content/ways-to-help";

export default function HomePage() {
  const email = placeholderText(siteConfig.contactEmail);

  return (
    <>
      {/* Continues the ink ground begun by the navbar. */}
      <DarkBand>
        <Container>
          <div className="pb-[clamp(3rem,8vh,5rem)] pt-[clamp(2.5rem,9vh,6rem)]">
            <h1
              className="rise mb-7 max-w-[20ch] text-[clamp(2.25rem,1.3rem+4.2vw,4.25rem)] font-normal leading-[1.1] tracking-[-0.018em]"
              style={{ "--rise-delay": "0.05s" } as React.CSSProperties}
            >
              Portales doesn&rsquo;t have a theater run by its young people.{" "}
              <em className="font-light text-wheat-bright">
                We&rsquo;d like to fix that.
              </em>
            </h1>

            <p
              className="rise measure m-0 mb-5 text-bone-dim"
              style={{ "--rise-delay": "0.2s" } as React.CSSProperties}
            >
              A few of us have started meeting about it. The idea is
              straightforward: build a company that high school and first-year
              college students run themselves — on stage and behind it — and put
              a first production up in{" "}
              <strong className="font-normal text-bone">
                {siteConfig.targetOpeningLabel}
              </strong>
              .
            </p>

            <p
              className="rise measure m-0 text-bone-dim"
              style={{ "--rise-delay": "0.32s" } as React.CSSProperties}
            >
              Nothing is settled yet — not the venue, not the show, not the
              money. We&rsquo;re telling people now because a theater made by
              one small group isn&rsquo;t the point. It has to be made by enough
              of us.
            </p>

            <div
              className="rise mt-10 flex flex-wrap items-center gap-x-7 gap-y-5"
              style={{ "--rise-delay": "0.44s" } as React.CSSProperties}
            >
              <Cta href="/contact" tone="dark">
                Get in touch
              </Cta>
              <span className="text-[0.9375rem] text-bone-dim">
                Or read{" "}
                <Link
                  href="/plan"
                  className="text-bone underline decoration-rule-dark underline-offset-4 hover:decoration-wheat-bright"
                >
                  the plan
                </Link>{" "}
                in full
              </span>
            </div>
          </div>
        </Container>
      </DarkBand>

      <Container>
        <Section className="grid grid-cols-1 gap-x-[clamp(2rem,5vw,4.5rem)] gap-y-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div>
            <SectionHeading>What we&rsquo;re proposing</SectionHeading>
            <div className="measure space-y-5">
              <p>
                A youth-led theater company is one where the people on stage are
                also the people making the decisions. Students direct, produce,
                stage-manage, design, and hold the budget. Adults advise; they
                don&rsquo;t take over.
              </p>
              <p>
                Portales has a high school that stages a show or two a year, and
                a university with a theatre programme and a real stage. Between
                them sits a gap. A student who wants to act in October waits
                until spring. Someone who has finished high school, or who is
                enrolled at {siteConfig.collegePartnerShort} but not cast, has
                nowhere at all.
              </p>
              <p>
                We want to close that gap, prove it with a single production,
                and build something that outlasts the first show. A theater that
                closes after opening night isn&rsquo;t a theater. It&rsquo;s an
                event.
              </p>
            </div>
          </div>

          <div>
            <SectionHeading>Where things stand</SectionHeading>
            <StatusLedger />
          </div>
        </Section>
      </Container>

      <Container>
        <Section ruled>
          <SectionHeading>Ways to be part of it</SectionHeading>
          <div className="grid grid-cols-1 gap-x-[clamp(2rem,4vw,3.5rem)] gap-y-9 md:grid-cols-3">
            {waysToHelp.map((way) => (
              <div key={way.title}>
                <h3 className="mb-2.5 text-[1.1875rem] font-medium text-wheat">
                  {way.title}
                </h3>
                <p className="m-0 mb-4 text-base text-ink-dim">{way.text}</p>
                <Link
                  href={`/contact?subject=${encodeURIComponent(way.subject)}`}
                  className="text-[0.9375rem] underline decoration-rule underline-offset-4 hover:decoration-wheat"
                >
                  Get in touch about this
                </Link>
              </div>
            ))}
          </div>
        </Section>
      </Container>

      <DarkBand tone="raised">
        <Container>
          <div className="py-[clamp(3rem,7vh,4.5rem)]">
            <SectionHeading className="text-bone">Talk to us</SectionHeading>
            <p className="measure m-0 mb-6 text-bone-dim">
              Whether you want to help build it, support it, be on stage, or
              just ask what this is — write to us. Someone will answer.
            </p>
            <a
              href={`mailto:${email}`}
              className="border-b border-wheat-bright pb-0.5 text-[clamp(1.375rem,1.1rem+1.2vw,1.875rem)] text-bone no-underline [word-break:break-word] hover:text-wheat-bright"
            >
              {email}
            </a>
            <p className="mt-6 text-[0.9375rem] text-bone-dim">
              Or use{" "}
              <Link
                href="/contact"
                className="text-bone underline decoration-rule-dark underline-offset-4 hover:decoration-wheat-bright"
              >
                the contact form
              </Link>
              , which reaches the same place.
            </p>
          </div>
        </Container>
      </DarkBand>
    </>
  );
}

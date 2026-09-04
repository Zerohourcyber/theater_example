import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { FundingTable } from "@/components/sections/funding-table";
import { Cta } from "@/components/ui/button";
import { Prose, Pull, Section, SplitSection } from "@/components/ui/section";
import { supportRoutes } from "@/content/funding";

export const metadata: Metadata = {
  title: "Support us",
  description:
    "How a founding production gets paid for, why local support carries it, and the ways a business, a family or an advisor can help.",
};

export default function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="For sponsors, partners and supporters"
        title="How a first production gets paid for"
        standfirst="We researched this before asking anyone for anything, and what we found shaped the whole plan."
      />

      <Container>
        <SplitSection
          heading="Ways to say yes"
          note="Nothing here has been secured, and no business has been approached. These are the routes that exist, described plainly so a conversation can start from the same page."
        >
          <div className="grid grid-cols-1 gap-x-[clamp(2rem,4vw,3rem)] gap-y-8 md:grid-cols-2">
            {supportRoutes.map((route) => (
              <div key={route.title} className="border-l-2 border-wheat pl-5">
                <h3 className="mb-2 text-[1.125rem] font-medium">
                  {route.title}
                </h3>
                <p className="m-0 text-base text-ink-dim">{route.text}</p>
              </div>
            ))}
          </div>
        </SplitSection>

        <SplitSection ruled heading="Why we're asking locally">
          <Prose wide>
            <p>
              State and federal arts grants cannot fund this production. New
              Mexico Arts requires tax-exempt status and approves awards in
              July, paying by reimbursement — money would arrive months after
              opening night. The state tourism programmes run on the same July
              fiscal year. The National Endowment for the Arts requires years of
              prior programming and does not accept fiscally sponsored
              applicants.
            </p>
          </Prose>

          <Pull>
            So a founding production has to be funded locally. We are planning
            on that basis rather than hoping a grant lands.
          </Pull>

          <div className="mt-10">
            <FundingTable />
          </div>

          <Prose wide className="mt-10">
            <p>
              The formation work we are doing this autumn — incorporation,
              insurance, governance — is also what makes the organisation
              eligible for the state funding cycle that supports the{" "}
              <em>second</em> production. Nothing is wasted.
            </p>
          </Prose>
        </SplitSection>

        <SplitSection ruled heading="What a supporter should know">
          <Prose wide>
            <p>
              We are not yet incorporated, so a gift today is not
              tax-deductible. For most businesses, sponsorship is treated as a
              marketing expense rather than a charitable gift — worth confirming
              with your own accountant, particularly while our nonprofit status
              is still in progress.
            </p>
            <p>
              We would rather state that plainly at the start than let anyone
              discover it at tax time. The same goes for everything else on this
              site: where we have no answer yet, we say so.
            </p>
            <p>
              If you want the full case in a form you can print or forward,{" "}
              <Link
                href="/plan"
                className="underline decoration-rule underline-offset-4 hover:decoration-wheat"
              >
                the plan
              </Link>{" "}
              covers the timeline and the risks, and we&rsquo;re happy to bring
              a tailored version to a meeting.
            </p>
          </Prose>
        </SplitSection>

        <Section ruled className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Cta
            href={`/contact?subject=${encodeURIComponent("Sponsorship or donation")}`}
          >
            Start a conversation
          </Cta>
          <span className="text-[0.9375rem] text-ink-dim">
            Fifteen minutes, no commitment. We&rsquo;ll come to you.
          </span>
        </Section>
      </Container>
    </>
  );
}

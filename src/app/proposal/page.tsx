import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PrintButton } from "@/components/proposal/print-button";
import {
  ProposalNav,
  type NavSection,
} from "@/components/proposal/proposal-nav";
import { Figures } from "@/components/sections/figures";
import { FundingTable } from "@/components/sections/funding-table";
import { RiskTable } from "@/components/sections/risk-table";
import { Timeline } from "@/components/sections/timeline";
import { DarkBand, Prose, Pull } from "@/components/ui/section";
import { isPlaceholder, placeholderText, siteConfig } from "@/config/site";
import { resolveAudience } from "@/content/proposal";
import { publishedTeam } from "@/content/team";

/*
 * The leave-behind. Unlisted rather than secret: no index, no sitemap entry,
 * no link from the navigation — you send someone the URL written for them.
 */
export const metadata: Metadata = {
  title: "A proposal",
  robots: { index: false, follow: false },
};

const sections: NavSection[] = [
  { id: "s1", num: "01", title: "What we're proposing" },
  { id: "s2", num: "02", title: "Why Portales" },
  { id: "s3", num: "03", title: "The founding production" },
  { id: "s4", num: "04", title: "Timeline" },
  { id: "s5", num: "05", title: "What we're asking" },
  { id: "s6", num: "06", title: "How it gets paid for" },
  { id: "s7", num: "07", title: "Risks we're tracking" },
  { id: "s8", num: "08", title: "Who we are" },
  { id: "s9", num: "09", title: "Beyond the first show" },
];

function SectionShell({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-b border-rule py-[clamp(2.75rem,7vh,4.25rem)] last:border-b-0">
      <p className="tnum m-0 mb-2 text-[0.8125rem] text-wheat">{num}</p>
      <h2 className="mb-5 max-w-[20ch] text-[clamp(1.5rem,1.2rem+1.3vw,2.125rem)] leading-[1.2]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function ProposalPage({
  searchParams,
}: {
  searchParams: Promise<{ for?: string }>;
}) {
  const { for: audienceKey } = await searchParams;
  const audience = resolveAudience(audienceKey);

  const email = placeholderText(siteConfig.contactEmail);
  const team = publishedTeam();

  const now = new Date();
  const preparedMonth = now.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const preparedFull = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const contactLine = [siteConfig.contactName, siteConfig.contactRole]
    .map(placeholderText)
    .join(" · ");

  return (
    <>
      {/* ── Cover ─────────────────────────────────────────── */}
      <DarkBand>
        <Container width="wide">
          <div className="py-[clamp(3.5rem,11vh,7rem)]">
            <p className="m-0 mb-6 text-[0.9375rem] italic text-bone-dim">
              {audience.eyebrow}
            </p>
            <h1 className="mb-6 max-w-[19ch] text-[clamp(2.125rem,1.3rem+3.6vw,3.75rem)] leading-[1.1]">
              A youth-led theater for Portales
            </h1>
            <p className="m-0 mb-9 max-w-[44ch] text-[clamp(1.125rem,1.05rem+0.4vw,1.3125rem)] font-extralight text-bone-dim">
              A group of residents is working to establish a theater company run
              by this town&rsquo;s high school and first-year college students,
              beginning with a founding production in{" "}
              {siteConfig.targetOpeningLabel}.
            </p>

            <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(10rem,max-content))] gap-x-12 gap-y-4 border-t border-bone/20 pt-7">
              <div>
                <dt className="mb-0.5 text-[0.8125rem] text-bone-dim">
                  Organisation
                </dt>
                <dd className="m-0 text-[1.0625rem]">
                  {siteConfig.name}
                  <span className="block text-[0.875rem] text-bone-dim">
                    {siteConfig.nameQualifier}, in formation
                  </span>
                </dd>
              </div>
              <div>
                <dt className="mb-0.5 text-[0.8125rem] text-bone-dim">
                  Founding production
                </dt>
                <dd className="m-0 text-[1.0625rem]">
                  {siteConfig.targetOpeningLabel}, proposed
                </dd>
              </div>
              <div>
                <dt className="mb-0.5 text-[0.8125rem] text-bone-dim">
                  Status
                </dt>
                <dd className="m-0 text-[1.0625rem]">In formation</dd>
              </div>
              <div>
                <dt className="mb-0.5 text-[0.8125rem] text-bone-dim">
                  Prepared
                </dt>
                <dd className="m-0 text-[1.0625rem]">{preparedMonth}</dd>
              </div>
            </dl>
          </div>
        </Container>
      </DarkBand>

      {/* ── Body ──────────────────────────────────────────── */}
      <Container width="wide">
        <div className="lg:grid lg:grid-cols-[13rem_1fr] lg:items-start lg:gap-x-16">
          <ProposalNav sections={sections} />

          <main>
            <SectionShell {...sections[0]}>
              <Prose wide>
                <p>
                  A youth-led theater company is one where the people on stage
                  are also the people making the decisions. High school and
                  first-year college students direct, produce, stage-manage,
                  design, and hold the budget. Adults advise, teach, and sign
                  what legally needs an adult signature.
                </p>
                <p>
                  We intend to establish one in Portales: a standing
                  organisation with a board, a budget, and policies, capable of
                  producing work year after year. The first production is
                  planned for {siteConfig.targetOpeningLabel}. It is the proof
                  of concept, not the purpose.
                </p>
              </Prose>
              <Pull>
                A theater that closes after opening night isn&rsquo;t a theater.
                It&rsquo;s an event. We are building the organisation first, and
                the show is how we prove it works.
              </Pull>
              <Prose wide>
                <p>
                  We are early. The organisation is not yet incorporated, no
                  venue is confirmed, no production has been chosen, and no
                  funding has been raised. We are talking to potential partners
                  now because the decisions that matter most are the ones made
                  before any of that is fixed.
                </p>
              </Prose>
            </SectionShell>

            <SectionShell {...sections[1]}>
              <Prose wide>
                <p>
                  Roosevelt County has roughly 19,200 residents, about 12,100 of
                  them in Portales. It has a university with a theatre programme
                  and a purpose-built performance facility, and a high school
                  that stages a show or two a year.
                </p>
              </Prose>
              <Figures />
              <Prose wide>
                <p>
                  What we understand it does not have is anywhere for a young
                  person to make theater between those two institutions. The
                  school year offers a handful of parts on a fixed calendar.
                  The university&rsquo;s season serves enrolled students and the
                  academic timetable. A teenager who wants to act in October
                  waits until spring; someone who has finished high school, or
                  who is enrolled but not cast, has nowhere at all.
                </p>
                <p>
                  The gap is wider than performance. The roles that teach the
                  most — director, stage manager, producer, designer — are
                  almost never given to someone under twenty, because
                  established companies cannot absorb the risk. So the most
                  capable young people here either leave to find that experience
                  or stop looking for it.
                </p>
                <p>
                  A youth-led company is unusually good value for a small town.
                  It needs no building of its own, employs volunteers, draws
                  audiences from a wide rural catchment, and gives young people
                  somewhere to be after school that is neither sport nor a
                  screen. What they learn there — budgets, deadlines,
                  delegation, speaking to a room — transfers to every job they
                  will ever hold.
                </p>
              </Prose>
            </SectionShell>

            <SectionShell {...sections[2]}>
              <Prose wide>
                <p>
                  The target is {siteConfig.targetOpeningLabel}. The show has
                  not been chosen — deliberately. We are confirming a venue and
                  dates first, because those constraints determine what can
                  realistically be staged, and choosing a title before knowing
                  the room is how amateur companies get into trouble.
                </p>
                <p>
                  Selection will run through a scorecard weighing cast size,
                  technical demands, rights availability and cost, volunteer
                  capacity, audience appeal, and how well the piece suits a
                  company this young. We will carry genuine second and third
                  choices, because performance rights can be refused.
                </p>
                <p>
                  Our working assumption is three performances. Everything else
                  — budget, ticket pricing, marketing reach — follows from the
                  venue decision. We will not announce a title until the
                  performance licence is signed, because licensors require it.
                </p>
              </Prose>
            </SectionShell>

            <SectionShell {...sections[3]}>
              <p className="measure-wide mb-9 mt-[-0.5rem] text-ink-dim">
                Backward-planned from the target opening. Dates are targets, not
                commitments, and shift with the venue decision.
              </p>
              <Timeline />
            </SectionShell>

            {/* 05 — the audience-specific ask. */}
            <SectionShell id="s5" num="05" title={audience.heading}>
              <div className="border-l-2 border-wheat pl-6">
                <ol className="m-0 list-none space-y-4 p-0">
                  {audience.items.map(([title, detail]) => (
                    <li key={title} className="measure-wide">
                      <strong className="font-medium">{title}</strong> — {detail}
                    </li>
                  ))}
                </ol>

                {audience.benefits ? (
                  <div className="mt-8">
                    <h3 className="mb-2 text-[1.125rem] font-medium">
                      {audience.benefits.heading}
                    </h3>
                    <p className="measure-wide m-0 text-ink-dim">
                      {audience.benefits.text}
                    </p>
                  </div>
                ) : null}

                <p className="measure-wide m-0 mt-8 italic text-ink-dim">
                  {audience.close}
                </p>
              </div>
            </SectionShell>

            <SectionShell {...sections[5]}>
              <Prose wide>
                <p>
                  We researched this before asking anyone for anything, and the
                  finding shaped the plan.
                </p>
                <p>
                  State and federal arts grants cannot fund this production. New
                  Mexico Arts requires tax-exempt status and approves awards in
                  July, paying by reimbursement — money would arrive months
                  after opening night. The state tourism programmes run on the
                  same July fiscal year. The National Endowment for the Arts
                  requires years of prior programming and does not accept
                  fiscally sponsored applicants.
                </p>
              </Prose>
              <Pull>
                So a founding production has to be funded locally. We are
                planning on that basis rather than hoping a grant lands.
              </Pull>
              <div className="mt-8">
                <FundingTable />
              </div>
              <p className="measure-wide mt-8 text-ink-dim">
                The formation work we are doing this autumn — incorporation,
                insurance, governance — is also what makes the organisation
                eligible for the state funding cycle that supports the{" "}
                <em>second</em> production. Nothing is wasted.
              </p>
            </SectionShell>

            <SectionShell {...sections[6]}>
              <RiskTable />
            </SectionShell>

            <SectionShell {...sections[7]}>
              {team.length > 0 ? (
                <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
                  {team.map((member) => (
                    <div key={member.name} className="border-t border-rule pt-4">
                      <h3 className="text-[1.125rem] font-medium">
                        {member.name}
                      </h3>
                      <p className="m-0 mb-2 text-[0.875rem] italic text-wheat">
                        {member.role}
                      </p>
                      <p className="m-0 text-[0.9375rem] text-ink-dim">
                        {member.bio}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-l-2 border-stop pl-6">
                  <p className="measure-wide m-0 text-ink-dim">
                    The founding group is still being assembled, and we would
                    rather leave this section empty than fill it with people who
                    have not agreed to be named. It will be complete before we
                    ask anyone for money.
                  </p>
                  <p className="measure-wide m-0 mt-4 text-[0.9375rem] italic text-stop">
                    Do not send this proposal until this section names real
                    people — it is the part a partner weighs most.
                  </p>
                </div>
              )}
            </SectionShell>

            <SectionShell {...sections[8]}>
              <Prose wide>
                <p>
                  The founding production is designed to leave things behind:
                  policies and templates, a volunteer roster, an audience list,
                  sponsor and vendor relationships, an equipment and costume
                  inventory, a budget history, and a written record of what
                  worked.
                </p>
                <p>
                  Year two stabilises operations and adds programming. Year
                  three establishes a repeatable season, more diversified
                  funding, and a plan for leadership succession — which for a
                  company of students is the central design problem rather than
                  a formality, because members age out on a fixed schedule.
                </p>
                <p>
                  These are planning scenarios rather than promises. We would
                  rather say clearly that we intend to still exist in 2030 than
                  quietly hope for it.
                </p>
              </Prose>
              <div className="mt-9">
                <PrintButton />
              </div>
            </SectionShell>
          </main>
        </div>
      </Container>

      {/* ── Close ─────────────────────────────────────────── */}
      <DarkBand>
        <Container width="wide">
          <div className="py-[clamp(3rem,8vh,4.5rem)]">
            <h2 className="mb-4 text-[clamp(1.5rem,1.2rem+1.3vw,2.125rem)]">
              {audience.closeHeading}
            </h2>
            <p className="m-0 mb-8 max-w-[46ch] text-bone-dim">
              {audience.closeText}
            </p>
            <a
              href={`mailto:${email}`}
              className="border-b border-wheat-bright pb-0.5 text-[clamp(1.25rem,1.1rem+1vw,1.75rem)] text-bone no-underline [word-break:break-word] hover:text-wheat-bright"
            >
              {email}
            </a>
            <p className="mt-5 text-[0.9375rem] text-bone-dim">
              {contactLine}
              {isPlaceholder(siteConfig.contactPhone) ? null : (
                <> · {siteConfig.contactPhone}</>
              )}
            </p>
          </div>
        </Container>
      </DarkBand>

      <Container width="wide">
        <footer className="space-y-3 py-12 text-[0.875rem] leading-[1.65] text-ink-dim">
          <p className="m-0 max-w-[52rem]">
            <strong className="font-normal text-ink">
              We are not affiliated with {siteConfig.collegePartner}, the City of
              Portales, or Roosevelt County.
            </strong>{" "}
            Any partnership described in this document is proposed, not agreed.
            Nothing here represents a commitment by any organisation other than
            our own, and no funder, sponsor or partner named or implied has been
            approached or has expressed interest.
          </p>
          <p className="m-0 max-w-[52rem]">
            All dollar figures and dates are planning estimates prepared for
            discussion. Population figures are from the 2020 US Census. Venue
            capacities, where mentioned, are drawn from publicly published
            information and are not confirmed for this production.
          </p>
          <p className="m-0 max-w-[52rem]">
            Prepared {preparedFull}. Status current as of that date.
          </p>
        </footer>
      </Container>
    </>
  );
}

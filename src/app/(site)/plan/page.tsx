import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Figures } from "@/components/sections/figures";
import { RiskTable } from "@/components/sections/risk-table";
import { Timeline } from "@/components/sections/timeline";
import { Cta } from "@/components/ui/button";
import { Prose, Pull, Section, SplitSection } from "@/components/ui/section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "The plan",
  description:
    "What we're proposing, why Portales needs it, how the founding production gets made, and the risks we're tracking.",
};

export default function PlanPage() {
  return (
    <>
      <PageHeader
        eyebrow="Prepared for discussion"
        title="A youth-led theater for Portales"
        standfirst="What we're proposing, why here, how it gets made, and what could go wrong. We are early, and this page says so throughout."
      />

      <Container>
        <SplitSection heading="What we're proposing">
          <Prose wide>
            <p>
              A youth-led theater company is one where the people on stage are
              also the people making the decisions. High school and first-year
              college students direct, produce, stage-manage, design, and hold
              the budget. Adults advise, teach, and sign the things that legally
              need an adult signature — they don&rsquo;t take over.
            </p>
            <p>
              We intend to establish one in Portales: a standing organisation
              with a board, a budget, and policies, capable of producing work
              year after year. The first production is planned for{" "}
              {siteConfig.targetOpeningLabel}. It is the proof of concept, not
              the purpose.
            </p>
          </Prose>

          <Pull>
            A theater that closes after opening night isn&rsquo;t a theater.
            It&rsquo;s an event. We are building the organisation first, and the
            show is how we prove it works.
          </Pull>

          <Prose wide>
            <p>
              We are early. The organisation is not yet incorporated, no venue
              is confirmed, no production has been chosen, and no funding has
              been raised. We are talking to potential partners now because the
              decisions that matter most are the ones made before any of that is
              fixed.
            </p>
          </Prose>
        </SplitSection>

        <SplitSection ruled heading="Why Portales">
          <Prose wide>
            <p>
              Roosevelt County has roughly 19,200 residents, about 12,100 of
              them in Portales. It has a university with a theatre programme and
              a purpose-built performance facility, and a high school that
              stages a show or two a year. It has a civic culture that already
              turns out for the county fair and the Peanut Valley Festival.
            </p>
          </Prose>

          <Figures />

          <Prose wide>
            <p>
              What it does not have is anywhere for a young person to make
              theater between those two institutions. The school year offers a
              handful of parts on a fixed calendar.{" "}
              {siteConfig.collegePartnerShort}&rsquo;s season serves enrolled
              students and the academic timetable. A teenager who wants to act
              in October waits until spring. Someone who has finished high
              school, or who is enrolled but not cast, has nowhere at all.
            </p>
            <p>
              The gap is wider than performance. The roles that teach the most —
              director, stage manager, producer, designer — are almost never
              given to someone under twenty, because established companies
              can&rsquo;t afford the risk. So the most capable young people in
              this town either leave to find that experience or stop looking for
              it.
            </p>
          </Prose>

          <Pull>
            The question isn&rsquo;t whether Portales has enough talent. It is
            whether anyone here is given the job of running the whole thing
            before they turn twenty-five.
          </Pull>

          <Prose wide>
            <p>
              A youth-led company is unusually good value for a small town. It
              needs no building of its own, employs volunteers, draws audiences
              from a wide rural catchment, and gives young people somewhere to
              be after school that is neither sport nor a screen. What they
              learn there — budgets, deadlines, delegation, speaking to a room —
              transfers to every job they will ever hold.
            </p>
          </Prose>
        </SplitSection>

        <SplitSection ruled heading="The founding production">
          <Prose wide>
            <p>
              The target is {siteConfig.targetOpeningLabel}. The show has not
              been chosen — deliberately. We are confirming a venue and dates
              first, because those constraints determine what can realistically
              be staged, and choosing a title before knowing the room is how
              amateur companies get into trouble.
            </p>
            <p>
              Selection will run through a scorecard weighing cast size,
              technical demands, rights availability and cost, volunteer
              capacity, audience appeal, and how well the piece suits a company
              this young. We will carry genuine second and third choices,
              because performance rights can be refused.
            </p>
            <p>
              Our working assumption is three performances. Everything else —
              budget, ticket pricing, marketing reach — follows from the venue
              decision.
            </p>
          </Prose>

          <Pull>
            We will not announce a title until the performance licence is
            signed. Licensors require that, and a company advertising a show it
            hasn&rsquo;t licensed has already told you something about how it
            operates.
          </Pull>
        </SplitSection>

        <SplitSection
          ruled
          heading="Timeline"
          note="Backward-planned from the target opening. Dates are targets, not commitments, and shift with the venue decision."
        >
          <Timeline />
        </SplitSection>

        <SplitSection ruled heading="Risks we're tracking">
          <RiskTable />
        </SplitSection>

        <SplitSection ruled heading="Beyond the first show">
          <Prose wide>
            <p>
              The founding production is designed to leave things behind:
              policies and templates, a volunteer roster, an audience list,
              sponsor and vendor relationships, an equipment and costume
              inventory, a budget history, and a written record of what worked.
            </p>
            <p>
              Year two stabilises operations, keeps the supporters gained in
              year one, and adds programming. Year three establishes a
              repeatable season, more diversified funding, stronger governance,
              and a plan for leadership succession — which for a company of
              students is not a formality but the central design problem. People
              age out of a youth theater on a fixed schedule. The organisation
              has to be built so that is normal rather than fatal.
            </p>
            <p>
              These are planning scenarios rather than promises. We would rather
              say clearly that we intend to still exist in 2030 than quietly
              hope for it.
            </p>
          </Prose>
        </SplitSection>

        <Section ruled className="flex flex-wrap items-center gap-x-7 gap-y-5">
          <Cta href="/support">How to support it</Cta>
          <Cta href="/contact" variant="quiet">
            Or get in touch
          </Cta>
        </Section>
      </Container>
    </>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Cta } from "@/components/ui/button";
import { Prose, Section, SplitSection } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { foundingTeam, publishedTeam } from "@/content/team";

export const metadata: Metadata = {
  title: "Who we are",
  description:
    "How a youth-led company is structured, what the adults around it do, and who is building it.",
};

export default function WhoWeArePage() {
  const team = publishedTeam();
  const showEditingGuidance =
    team.length === 0 && process.env.VERCEL_ENV !== "production";

  return (
    <>
      <PageHeader
        eyebrow="The founding group"
        title="Who is building this"
        standfirst="A youth-led company only means something if the structure backs it up. Here is how ours is meant to work."
      />

      <Container>
        <SplitSection heading="How it's structured">
          <Prose wide>
            <p>
              Students hold the working roles: director, producer, stage
              manager, designers, marketing, front of house. Those are the jobs
              where the decisions actually get made, and they are the reason to
              have a youth-led company rather than a youth programme inside
              someone else&rsquo;s.
            </p>
            <p>
              Adults do the things the law and the bank require an adult to do —
              sign the lease, hold the insurance, serve on the board,
              countersign the accounts — and they mentor. They do not cast the
              show or set the season. Where a task genuinely needs an adult, we
              would rather say so plainly than pretend otherwise; a company that
              claims teenagers are running the finances is not being honest with
              its sponsors.
            </p>
            <p>
              Because members age out on a fixed schedule, every role is
              understudied by someone a year younger and written down as it is
              learned. Succession is not an afterthought here. It is the central
              design problem.
            </p>
          </Prose>
        </SplitSection>

        <SplitSection ruled heading="Working with minors">
          <Prose wide>
            <p>
              Most of our members will be under eighteen. Before the first
              audition we will have background checks for adult volunteers,
              written parental consent for participation and for any
              photography, and a written safeguarding policy that the board
              adopts rather than improvises.
            </p>
            <p>
              No young person&rsquo;s name or photograph appears on this site
              without a signed release from a parent or guardian on file. That
              is also why this page may look sparse for a while.
            </p>
          </Prose>
        </SplitSection>

        <SplitSection ruled heading="The people">
          {team.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-[clamp(2rem,4vw,3rem)] gap-y-8 md:grid-cols-2">
              {team.map((member) => (
                <div key={member.name} className="border-t border-rule pt-5">
                  <h3 className="text-[1.125rem] font-medium">{member.name}</h3>
                  <p className="m-0 mb-2.5 text-[0.875rem] italic text-wheat">
                    {member.role}
                  </p>
                  <p className="m-0 text-base text-ink-dim">{member.bio}</p>
                </div>
              ))}
            </div>
          ) : (
            <Prose wide>
              <p>
                The founding group is still forming, so there are no names here
                yet. We would rather show you an empty section than a list of
                people who haven&rsquo;t agreed to be on it.
              </p>
              <p>
                This is the part of the site that will matter most to a partner
                deciding whether we can finish what we start, and it will be
                filled in before we ask anyone for money. If you would like to
                be one of the names on it, that conversation is open now.
              </p>
            </Prose>
          )}

          {showEditingGuidance ? (
            <div className="no-print mt-10 border border-stop/40 bg-stop/5 p-6">
              <p className="m-0 mb-4 text-[0.875rem] font-medium text-stop">
                Editing guidance — not shown in production
              </p>
              <p className="m-0 mb-5 text-[0.9375rem] text-ink-dim">
                Replace the entries in <code>src/content/team.ts</code> and
                remove each <code>placeholder</code> flag to publish them. Three
                or four named people with visible local roots does more for
                credibility than a long list.
              </p>
              <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
                {foundingTeam.map((member, index) => (
                  <li key={index} className="border-t border-rule pt-3">
                    <p className="m-0 text-[0.9375rem]">{member.name}</p>
                    <p className="m-0 text-[0.8125rem] italic text-wheat">
                      {member.role}
                    </p>
                    <p className="m-0 mt-1 text-[0.875rem] text-ink-dim">
                      {member.bio}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </SplitSection>

        <Section ruled className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Cta
            href={`/contact?subject=${encodeURIComponent("Helping start it")}`}
          >
            Join the founding group
          </Cta>
          <span className="text-[0.9375rem] text-ink-dim">
            We meet in Portales. {siteConfig.collegePartnerShort} students and
            staff welcome, in a personal capacity.
          </span>
        </Section>
      </Container>
    </>
  );
}

import type { SiteSettings } from "@/types";
import { siteConfig } from "@/config/site";
import { pt } from "./portable-text";

/** Fallback site settings — used when Sanity is not configured. */
export const fallbackSiteSettings: SiteSettings = {
  orgName: siteConfig.name,
  tagline: siteConfig.tagline,
  contactEmail: siteConfig.contactEmail,
  socials: [...siteConfig.socials],
  aboutStory: pt(
    "Limelight Youth Theater started the way most good theater does: with a problem and a deadline. In the summer of 2025, a handful of high school students who had just closed their school musical realized there was nowhere in town to keep making theater until the next school year — so they made somewhere.",
    "That first summer production was staged in a borrowed auditorium with a rented keyboard and a set built from donated pallets. It sold enough tickets to pay for itself, which is all the proof anyone needed that this should keep happening.",
    "Today we're a year-round, youth-led company. Students perform, direct, produce, design, market, and manage every production, with adult mentors advising rather than deciding. Our residency with Riverside College gives us a real stage, a scene shop, and mentorship from college theater majors — and our productions give younger students a place to start."
  ),
  timeline: [
    {
      year: "2025",
      title: "The founding summer",
      description:
        "Four students stage The 25th Annual Putnam County Spelling Bee in a borrowed high school auditorium. It breaks even. The group decides that's a business model.",
    },
    {
      year: "2025",
      title: "Becoming an organization",
      description:
        "Limelight incorporates with a volunteer adult board, opens a bank account, and holds its first open company meeting — 30 students show up.",
    },
    {
      year: "2026",
      title: "First full season",
      description:
        "A winter black-box production, Almost, Maine, sells out its entire run. Spring workshop series launches for middle schoolers.",
    },
    {
      year: "2026",
      title: "A home at Riverside College",
      description:
        "A two-year residency agreement gives the company rehearsal space, scene-shop access, and two productions a year on a real stage.",
    },
  ],
};

import type { NewsPost } from "@/types";
import { pt } from "./portable-text";

/** Fallback news posts — used when Sanity is not configured. */
export const fallbackNews: NewsPost[] = [
  {
    _id: "fb-news-1",
    title: "Dear Evan Hansen Is Our Fall Mainstage — Auditions Announced",
    slug: "dear-evan-hansen-announcement",
    publishedAt: "2026-06-28T09:00:00-04:00",
    excerpt:
      "Our biggest production yet lands on the college mainstage this October. Here's the concept, the dates, and how to audition.",
    body: pt(
      "We're thrilled to announce that our fall mainstage production will be Dear Evan Hansen, opening October 16 at the Riverside College Mainstage Theater.",
      "This is the largest production we've ever attempted: a full student band playing the score live, a projection-driven set built by our design crew, and a story our generation knows from the inside. Auditions are open to all students ages 13–20 — no musical-theater experience required.",
      "Audition details are on the Auditions page. If you'd rather run the projections than stand in them, design and crew sign-ups open the same week."
    ),
  },
  {
    _id: "fb-news-2",
    title: "We Have a Home: Residency Agreement with Riverside College",
    slug: "college-residency",
    publishedAt: "2026-05-12T09:00:00-04:00",
    excerpt:
      "A two-year partnership gives our company rehearsal space and two productions a year on a real stage — with student mentorship from the college's theater department.",
    body: pt(
      "After a year of borrowed auditoriums and generous cafeterias, we finally have a home. Riverside College has signed a two-year residency agreement giving our company rehearsal space, scene-shop access, and two productions a year in their theaters.",
      "The partnership also pairs our student designers with college theater majors for mentorship in lighting, sound, and stage management. It's the kind of infrastructure that turns a summer project into an institution.",
      "Our first mainstage production under the agreement opens this fall."
    ),
  },
  {
    _id: "fb-news-3",
    title: "Almost, Maine Sold Out Its Entire Run",
    slug: "almost-maine-wrap",
    publishedAt: "2026-03-15T09:00:00-04:00",
    excerpt:
      "Three nights, three sold-out houses, and nine tiny love stories. A wrap report from our winter black-box production.",
    body: pt(
      "Almost, Maine closed on Sunday with our third consecutive sold-out house — 240 seats across the run, our largest audience to date.",
      "The production paired six first-time actors with student directors, and every scene was designed, lit, and stage-managed by people under twenty. The northern lights were two par cans and a lot of haze, and nobody in the audience cared.",
      "Thank you to everyone who came, volunteered, and donated. The spring workshop series starts next month."
    ),
  },
];

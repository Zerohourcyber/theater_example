import type { Production } from "@/types";
import { fallbackPeople } from "./people";
import { pt } from "./portable-text";

const [maya, jordan, sam, priya] = fallbackPeople;

/**
 * Fallback productions — used when Sanity is not configured.
 * The upcoming show's openingNight drives the home-page countdown, so it is
 * set comfortably in the future relative to the POC demo period.
 */
export const fallbackProductions: Production[] = [
  {
    _id: "fb-prod-1",
    title: "Dear Evan Hansen",
    slug: "dear-evan-hansen",
    status: "upcoming",
    venue: "Riverside College — Mainstage Theater",
    openingNight: "2026-10-16T19:30:00-04:00",
    performances: [
      { dateTime: "2026-10-16T19:30:00-04:00" },
      { dateTime: "2026-10-17T19:30:00-04:00" },
      { dateTime: "2026-10-18T14:00:00-04:00" },
      { dateTime: "2026-10-23T19:30:00-04:00" },
      { dateTime: "2026-10-24T19:30:00-04:00" },
    ],
    ticketsEnabled: true,
    ticketPriceCents: 1500,
    synopsis: pt(
      "A letter that was never meant to be seen. A lie that was never meant to be told. A life he never dreamed he could have. Our young company takes on the Tony-winning musical about anxiety, grief, and the ache to be seen — with a student band playing the score live.",
      "For a cast that grew up with social media, this story isn't a metaphor. Expect an honest, stripped-back staging where the words you post — and the ones you can't say out loud — fill the stage."
    ),
    cast: [
      { person: maya, role: "Evan Hansen" },
      { person: priya, role: "Zoe Murphy" },
      { person: jordan, role: "Connor Murphy" },
    ],
    crew: [
      { person: sam, role: "Technical Director" },
      { person: jordan, role: "Producer" },
      { person: priya, role: "Marketing & House" },
    ],
    auditionInfo: pt(
      "Auditions for Dear Evan Hansen are open to all students ages 13–20. Prepare a one-minute contemporary monologue and about 16 bars of a contemporary musical-theater or pop song — bring sheet music or a backing track; an accompanist is provided. We care about honesty, not polish.",
      "Sign up for a slot through the contact form, or just show up: walk-ins are welcome on both audition days. Callbacks will involve scene work, a short vocal call, and ensemble singing — wear clothes you can move in."
    ),
  },
  {
    _id: "fb-prod-2",
    title: "Almost, Maine",
    slug: "almost-maine",
    status: "past",
    venue: "Riverside College — Black Box",
    openingNight: "2026-03-06T19:30:00-05:00",
    performances: [
      { dateTime: "2026-03-06T19:30:00-05:00" },
      { dateTime: "2026-03-07T19:30:00-05:00" },
      { dateTime: "2026-03-08T14:00:00-05:00" },
    ],
    ticketsEnabled: false,
    ticketPriceCents: 1200,
    synopsis: pt(
      "Nine short plays about falling in and out of love under the northern lights. Our winter black-box production paired first-time actors with veteran student directors — and sold out all three nights."
    ),
    cast: [
      { person: priya, role: "Glory / Hope" },
      { person: jordan, role: "East / Dave" },
    ],
    crew: [
      { person: maya, role: "Director" },
      { person: sam, role: "Lighting Design" },
    ],
  },
  {
    _id: "fb-prod-3",
    title: "The 25th Annual Putnam County Spelling Bee",
    slug: "putnam-county-spelling-bee",
    status: "past",
    venue: "Jefferson High School Auditorium",
    openingNight: "2025-07-18T19:00:00-04:00",
    performances: [
      { dateTime: "2025-07-18T19:00:00-04:00" },
      { dateTime: "2025-07-19T19:00:00-04:00" },
    ],
    ticketsEnabled: false,
    synopsis: pt(
      "The show that started it all: our founding summer production, staged with borrowed chairs, a rented keyboard, and six weeks of rehearsal after work and summer school. W-I-N-N-E-R."
    ),
    crew: [
      { person: maya, role: "Director" },
      { person: jordan, role: "Producer" },
      { person: sam, role: "Set & Sound" },
      { person: priya, role: "Front of House" },
    ],
  },
];

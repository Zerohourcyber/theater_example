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
    title: "The Tempest",
    slug: "the-tempest",
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
      "A storm. A shipwreck. An island that remembers everything. Our young company reimagines Shakespeare's late romance as a story about power handed down and power given up — staged in the round with a live student ensemble score.",
      "Prospero's island becomes a rehearsal room where forgiveness is practiced until it becomes real. Expect rough magic, paper oceans, and a finale that asks the audience to set everyone free."
    ),
    cast: [
      { person: maya, role: "Prospero" },
      { person: priya, role: "Ariel" },
      { person: jordan, role: "Caliban" },
    ],
    crew: [
      { person: sam, role: "Technical Director" },
      { person: jordan, role: "Producer" },
      { person: priya, role: "Marketing & House" },
    ],
    auditionInfo: pt(
      "Auditions for The Tempest are open to all students ages 13–20. Prepare one short Shakespeare monologue (under two minutes) or a contemporary piece if verse is new to you — we care about bravery, not polish.",
      "Sign up for a slot through the contact form, or just show up: walk-ins are welcome on both audition days. Callbacks will involve group scene work and movement — wear clothes you can move in."
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

import type { Person } from "@/types";
import { pt } from "./portable-text";

/** Fallback founders & company — used when Sanity is not configured. */
export const fallbackPeople: Person[] = [
  {
    _id: "fb-person-1",
    name: "Maya Delgado",
    slug: "maya-delgado",
    roleTitle: "Co-Founder & Artistic Director",
    isFounder: true,
    order: 1,
    bio: pt(
      "Maya founded the company the summer after junior year, after directing her first one-act and realizing there was no year-round stage for young artists in town. She has performed in twelve productions and directed three, and is the reason the light board always works."
    ),
  },
  {
    _id: "fb-person-2",
    name: "Jordan Okafor",
    slug: "jordan-okafor",
    roleTitle: "Co-Founder & Producing Director",
    isFounder: true,
    order: 2,
    bio: pt(
      "Jordan handles budgets, permits, and partnerships — the unglamorous work that gets the curtain up. A recent graduate, they brokered the company's residency with the college theater and still finds time to run sound on show nights."
    ),
  },
  {
    _id: "fb-person-3",
    name: "Sam Whitfield",
    slug: "sam-whitfield",
    roleTitle: "Co-Founder & Technical Director",
    isFounder: true,
    order: 3,
    bio: pt(
      "Sam built our first set out of donated pallets and has been over-engineering platforms ever since. They lead the student design crews — set, lights, sound, and props — and teach every newcomer to use a drill safely."
    ),
  },
  {
    _id: "fb-person-4",
    name: "Priya Raman",
    slug: "priya-raman",
    roleTitle: "Co-Founder & Marketing Lead",
    isFounder: true,
    order: 4,
    bio: pt(
      "Priya runs the company's brand, socials, and box office. She designed our first poster in a study hall and has since made 'sold out' a recurring problem worth having."
    ),
  },
];

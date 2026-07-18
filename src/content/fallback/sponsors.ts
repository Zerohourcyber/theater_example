import type { Sponsor } from "@/types";

/** Fallback sponsors — used when Sanity is not configured. */
export const fallbackSponsors: Sponsor[] = [
  {
    _id: "fb-sponsor-1",
    name: "ENMU",
    tier: "partner",
    url: "https://example.edu",
    order: 1,
  },
  {
    _id: "fb-sponsor-2",
    name: "Hartley's Hardware",
    tier: "gold",
    url: "https://example.com",
    order: 2,
  },
  {
    _id: "fb-sponsor-3",
    name: "Main Street Diner",
    tier: "silver",
    url: "https://example.com",
    order: 3,
  },
  {
    _id: "fb-sponsor-4",
    name: "Beacon Print Co.",
    tier: "silver",
    url: "https://example.com",
    order: 4,
  },
  {
    _id: "fb-sponsor-5",
    name: "Friends of the Arts Council",
    tier: "community",
    url: "https://example.org",
    order: 5,
  },
];

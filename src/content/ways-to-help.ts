import type { ContactSubject } from "@/config/contact";

/**
 * index.html's three ways to be part of it, reframed for a youth-led company.
 * Each routes to the contact form with its subject preselected.
 */

export type WayToHelp = {
  title: string;
  text: string;
  subject: ContactSubject;
};

export const waysToHelp: WayToHelp[] = [
  {
    title: "Help start it",
    text: "We need adults willing to sit in the founding meetings and advise without taking over — and anyone who knows bookkeeping, grant writing, carpentry, or how to run a rehearsal calendar.",
    subject: "Helping start it",
  },
  {
    title: "Support it",
    text: "A first production costs real money before it earns any. Local businesses and individual supporters are how a founding season gets paid for.",
    subject: "Sponsorship or donation",
  },
  {
    title: "Perform or crew",
    text: "Open to high school and first-year college students. Auditions aren't scheduled yet — tell us you're interested and you'll hear when they are. No experience expected.",
    subject: "Performing or crewing",
  },
];

/**
 * Backward-planned from the target opening. Dates are targets, not
 * commitments, and every one of them shifts with the venue decision.
 */

export type TimelinePhase = {
  when: string;
  title: string;
  text: string;
  /** Marks the phase we are currently in. */
  current?: boolean;
};

export const timeline: TimelinePhase[] = [
  {
    when: "Autumn 2026",
    title: "Formation and first conversations",
    text: "Founding group, working name, mission, legal structure decision, and the first approaches to potential partners.",
    current: true,
  },
  {
    when: "Late 2026",
    title: "Venue and organisation",
    text: "Incorporation, EIN, insurance, governance documents. Venue and dates confirmed in writing.",
  },
  {
    when: "Winter 2026–27",
    title: "Selection and funding",
    text: "Production chosen and performance rights secured. Sponsorship campaign and budget in place.",
  },
  {
    when: "Early 2027",
    title: "Casting and preparation",
    text: "Auditions, casting, design, build schedule, volunteer recruitment, marketing launch.",
  },
  {
    when: "Spring 2027",
    title: "Rehearsal and performance",
    text: "Roughly eight weeks of rehearsal, technical and dress rehearsals, then the founding production.",
  },
  {
    when: "Mid 2027",
    title: "Closeout and continuation",
    text: "Financial reconciliation, sponsor and partner reporting, lessons learned, and the decision on a second production.",
  },
];

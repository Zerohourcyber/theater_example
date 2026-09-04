/**
 * The founding group.
 *
 * This is the section a partner actually weighs. Three or four named people
 * with visible local roots does more for credibility than any amount of
 * planning detail — which is why entries still marked `placeholder` are never
 * rendered publicly. An empty, honest "still forming" state is better than a
 * grid of cards reading "Name / Role in the founding group"; the source
 * packet.html said as much, and it was right.
 *
 * To publish someone: replace a placeholder entry and drop the flag. For
 * anyone under 18, a signed parental media release has to be on file first.
 */

export type Member = {
  name: string;
  role: string;
  bio: string;
  /** Guidance text, not a real person. Never rendered in production. */
  placeholder?: boolean;
};

export const foundingTeam: Member[] = [
  {
    name: "Name",
    role: "Role in the founding group",
    bio: "One or two sentences: what they do in Portales, and what they bring here. Local ties matter more than theater credentials.",
    placeholder: true,
  },
  {
    name: "Name",
    role: "Role in the founding group",
    bio: "If someone has run a budget, taught, built things, or organised volunteers, say so. Partners are assessing whether this group can finish what it starts.",
    placeholder: true,
  },
  {
    name: "Name",
    role: "Role in the founding group",
    bio: "For student members, say what they have already done — a school production, a club they run, a job they hold down alongside it.",
    placeholder: true,
  },
  {
    name: "Advisors",
    role: "Optional",
    bio: "Anyone advising informally — an accountant, an attorney, a teacher. Only name people who have agreed to be named.",
    placeholder: true,
  },
];

/** Members cleared for publication. */
export function publishedTeam(): Member[] {
  return foundingTeam.filter((member) => !member.placeholder);
}

/**
 * Named openly, with what we would do about each.
 *
 * Publishing this is deliberate. Most groups at this stage show a partner only
 * the upside; a reader deciding whether we can finish what we start learns
 * more from an honest risk table than from any amount of planning detail.
 */

export type Risk = {
  risk: string;
  response: string;
  level: "High" | "Medium";
};

export const risks: Risk[] = [
  {
    risk: "No venue available in spring 2027",
    response:
      "Asking early rather than assuming. Willing to move the date to fit a partner's calendar.",
    level: "High",
  },
  {
    risk: "Performance rights refused or unavailable regionally",
    response:
      "Carrying genuine second and third choices, not a favourite and two placeholders.",
    level: "High",
  },
  {
    risk: "Local fundraising falls short",
    response:
      "Scoping the production to what is raised. A modest show that happens beats an ambitious one that doesn't.",
    level: "High",
  },
  {
    risk: "The student leaders graduate and leave town",
    response:
      "The reason a youth-led company needs a written record more than most. Roles are documented as they are learned, and every position is understudied by someone a year younger.",
    level: "Medium",
  },
  {
    risk: "Working with minors brings obligations we have to meet",
    response:
      "Background checks for adult volunteers, written parental consent, and a safeguarding policy adopted before the first audition rather than after.",
    level: "Medium",
  },
  {
    risk: "Too few people audition",
    response:
      "Early publicity, no experience required, and a show chosen partly for a manageable cast.",
    level: "Medium",
  },
  {
    risk: "The work depends on one or two people",
    response:
      "Separating director, producer and stage manager roles from the start, and documenting as we go.",
    level: "Medium",
  },
  {
    risk: "The organisation doesn't outlast the first show",
    response:
      "Closeout, lessons learned and a second-production decision are in the plan, not left to afterwards.",
    level: "Medium",
  },
];

/**
 * Contact form subjects. Lives outside the server-action module because
 * "use server" files may only export async functions.
 */
export const contactSubjects = [
  "General question",
  "Auditions",
  "Volunteering",
  "Sponsorship",
  "Tickets",
  "Press",
] as const;

export type ContactSubject = (typeof contactSubjects)[number];

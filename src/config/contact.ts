/**
 * Contact form subjects. Lives outside the server-action module because
 * "use server" files may only export async functions.
 *
 * The first three mirror the three ways to help on the home page, so a visitor
 * who clicks through arrives with the right subject already chosen.
 */
export const contactSubjects = [
  "Helping start it",
  "Sponsorship or donation",
  "Performing or crewing",
  "Venue or partnership",
  "General question",
] as const;

export type ContactSubject = (typeof contactSubjects)[number];

export const defaultSubject: ContactSubject = "General question";

export function isContactSubject(value: string): value is ContactSubject {
  return (contactSubjects as readonly string[]).includes(value);
}

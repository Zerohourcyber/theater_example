import { defineField, defineType } from "sanity";

/**
 * Interim newsletter storage (SPEC §6) — written by the newsletter server
 * action so no address is lost before a real email platform is chosen.
 */
export const newsletterSignup = defineType({
  name: "newsletterSignup",
  title: "Newsletter Signup",
  type: "document",
  readOnly: true,
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "createdAt",
      title: "Signed up at",
      type: "datetime",
    }),
  ],
  preview: {
    select: { title: "email", subtitle: "createdAt" },
  },
});

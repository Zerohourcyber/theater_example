import { defineField, defineType } from "sanity";

const creditMember = {
  type: "object" as const,
  fields: [
    defineField({
      name: "person",
      title: "Person",
      type: "reference",
      to: [{ type: "person" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "person.name", subtitle: "role" },
  },
};

export const production = defineType({
  name: "production",
  title: "Production",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Current", value: "current" },
          { title: "Past", value: "past" },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "poster",
      title: "Poster",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "synopsis",
      title: "Synopsis",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: "venue", title: "Venue", type: "string" }),
    defineField({
      name: "performances",
      title: "Performances",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "dateTime",
              title: "Date & time",
              type: "datetime",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "dateTime" } },
        },
      ],
    }),
    defineField({
      name: "openingNight",
      title: "Opening night",
      description: "Drives the home-page countdown.",
      type: "datetime",
    }),
    defineField({
      name: "ticketsEnabled",
      title: "Tickets enabled",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "ticketPriceCents",
      title: "Ticket price (cents)",
      description: "General admission price in cents, e.g. 1500 = $15.00.",
      type: "number",
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: "cast",
      title: "Cast",
      type: "array",
      of: [creditMember],
    }),
    defineField({
      name: "crew",
      title: "Crew",
      type: "array",
      of: [creditMember],
    }),
    defineField({
      name: "gallery",
      title: "Photo gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "auditionInfo",
      title: "Audition info",
      description: "Shown on the Auditions page while this show is upcoming.",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "status", media: "poster" },
  },
});

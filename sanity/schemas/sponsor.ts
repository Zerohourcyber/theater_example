import { defineField, defineType } from "sanity";

export const sponsor = defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
    }),
    defineField({ name: "url", title: "Website", type: "url" }),
    defineField({
      name: "tier",
      title: "Tier",
      type: "string",
      options: {
        list: [
          { title: "Partner", value: "partner" },
          { title: "Gold", value: "gold" },
          { title: "Silver", value: "silver" },
          { title: "Community", value: "community" },
        ],
      },
      initialValue: "community",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", title: "Sort order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "tier", media: "logo" },
  },
});

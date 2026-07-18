import { defineQuery } from "next-sanity";

/**
 * GROQ queries. Images are projected with a resolved `url` (plus `alt`) so
 * components can render CMS data and fallback content through the same
 * `SmartImage` path.
 */

const IMAGE_PROJECTION = /* groq */ `{
  "url": asset->url,
  alt
}`;

const PERSON_PROJECTION = /* groq */ `{
  _id,
  name,
  "slug": slug.current,
  "headshot": headshot${IMAGE_PROJECTION},
  roleTitle,
  bio,
  isFounder,
  order
}`;

const PRODUCTION_PROJECTION = /* groq */ `{
  _id,
  title,
  "slug": slug.current,
  status,
  "poster": poster${IMAGE_PROJECTION},
  synopsis,
  venue,
  performances[]{ _key, dateTime },
  openingNight,
  ticketsEnabled,
  ticketPriceCents,
  cast[]{ _key, role, "person": person->${PERSON_PROJECTION} },
  crew[]{ _key, role, "person": person->${PERSON_PROJECTION} },
  "gallery": gallery[]${IMAGE_PROJECTION},
  auditionInfo
}`;

const NEWS_PROJECTION = /* groq */ `{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  "coverImage": coverImage${IMAGE_PROJECTION},
  excerpt,
  body
}`;

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0]{
    orgName,
    tagline,
    contactEmail,
    socials[]{ label, "href": href, handle },
    aboutStory,
    timeline[]{ _key, year, title, description }
  }
`);

export const allProductionsQuery = defineQuery(`
  *[_type == "production"] | order(openingNight desc) ${PRODUCTION_PROJECTION}
`);

export const productionBySlugQuery = defineQuery(`
  *[_type == "production" && slug.current == $slug][0] ${PRODUCTION_PROJECTION}
`);

export const upcomingProductionQuery = defineQuery(`
  *[_type == "production" && status in ["upcoming", "current"]]
    | order(openingNight asc)[0] ${PRODUCTION_PROJECTION}
`);

export const allNewsQuery = defineQuery(`
  *[_type == "newsPost"] | order(publishedAt desc) ${NEWS_PROJECTION}
`);

export const newsBySlugQuery = defineQuery(`
  *[_type == "newsPost" && slug.current == $slug][0] ${NEWS_PROJECTION}
`);

export const foundersQuery = defineQuery(`
  *[_type == "person" && isFounder == true] | order(order asc) ${PERSON_PROJECTION}
`);

export const sponsorsQuery = defineQuery(`
  *[_type == "sponsor"] | order(order asc){
    _id,
    name,
    "logo": logo{ "url": asset->url, alt },
    url,
    tier,
    order
  }
`);

export const faqQuery = defineQuery(`
  *[_type == "faqItem"] | order(order asc){
    _id,
    question,
    answer,
    order
  }
`);

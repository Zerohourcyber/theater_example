import type { FaqItem } from "@/types";
import { pt } from "./portable-text";

/** Fallback FAQ — used when Sanity is not configured. */
export const fallbackFaq: FaqItem[] = [
  {
    _id: "fb-faq-1",
    order: 1,
    question: "Who can participate in productions?",
    answer: pt(
      "Any student age 13–20 — from any school, homeschool, or no school at all. You don't need experience, a headshot, or a résumé. Auditions and crew sign-ups are announced on the Auditions page and our socials."
    ),
  },
  {
    _id: "fb-faq-2",
    order: 2,
    question: "Does it cost anything to participate?",
    answer: pt(
      "No. Participation is free. Costumes, scripts, and materials are covered by ticket sales and sponsors. If travel to rehearsal is a barrier, tell us — we organize carpools."
    ),
  },
  {
    _id: "fb-faq-3",
    order: 3,
    question: "Where are performances held?",
    answer: pt(
      "Our mainstage and black-box productions are staged at Riverside College's theaters through our residency partnership. Occasional workshops and fundraisers happen at local schools and community spaces."
    ),
  },
  {
    _id: "fb-faq-4",
    order: 4,
    question: "How do I buy tickets, and what do they cost?",
    answer: pt(
      "Tickets are general admission and sold online through this site — look for the Get Tickets button on a production page. Most shows are $12–15. Doors open 30 minutes before curtain."
    ),
  },
  {
    _id: "fb-faq-5",
    order: 5,
    question: "Are tickets refundable?",
    answer: pt(
      "If a performance is canceled, tickets are refunded automatically. Otherwise tickets aren't refundable, but email us and we'll happily move you to another performance of the same production if seats allow."
    ),
  },
  {
    _id: "fb-faq-6",
    order: 6,
    question: "I'm an adult — how can I help?",
    answer: pt(
      "Adults support as volunteers (front of house, drivers, build days), sponsors, and mentors — but the art stays student-led. Visit the Get Involved page or write to us through the contact form."
    ),
  },
];

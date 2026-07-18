import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/motion/fade-in";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { fallbackFaq } from "@/content/fallback";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about participating, tickets, venues, and supporting our youth-led theater.",
};

// TODO(phase-3): replace direct fallback imports with Sanity fetch helpers.
export default function FaqPage() {
  const faqs = [...fallbackFaq].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Good questions, straight answers"
      />

      <section className="py-20">
        <Container className="max-w-3xl">
          <FadeIn>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq._id} value={faq._id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 [&>p]:leading-relaxed">
                      <PortableText value={faq.answer} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>

          <FadeIn className="mt-12 flex flex-col items-center gap-4 rounded-lg border border-border bg-surface p-8 text-center">
            <p className="text-lg">Didn’t find your answer?</p>
            <Button asChild variant="outline">
              <Link href="/contact">Ask us directly</Link>
            </Button>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}

import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function NewsletterCta() {
  return (
    <section className="spotlight-band border-y border-border/60 py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <FadeIn className="flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-5xl">
            Never miss a <span className="text-gold-gradient">curtain call</span>
          </h2>
          <p className="max-w-xl text-muted">
            Show announcements, audition calls, and opening-night invites —
            a few emails a season, nothing more.
          </p>
          <NewsletterForm />
        </FadeIn>
      </Container>
    </section>
  );
}

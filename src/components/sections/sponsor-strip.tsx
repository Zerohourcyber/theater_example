import { SponsorCard } from "@/components/cards/sponsor-card";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import type { Sponsor } from "@/types";

export function SponsorStrip({ sponsors }: { sponsors: Sponsor[] }) {
  if (!sponsors.length) return null;

  return (
    <section className="py-16">
      <Container>
        <FadeIn>
          <p className="text-center text-sm font-medium uppercase tracking-[0.25em] text-muted">
            Supported by our community
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {sponsors.map((sponsor) => (
              <li key={sponsor._id}>
                <SponsorCard sponsor={sponsor} />
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  );
}

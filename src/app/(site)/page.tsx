import { Countdown } from "@/components/sections/countdown";
import { FoundersGrid } from "@/components/sections/founders-grid";
import { Hero } from "@/components/sections/hero";
import { MissionSection } from "@/components/sections/mission-section";
import { NewsGrid } from "@/components/sections/news-grid";
import { NewsletterCta } from "@/components/sections/newsletter-cta";
import { SponsorStrip } from "@/components/sections/sponsor-strip";
import { UpcomingProduction } from "@/components/sections/upcoming-production";
import {
  fallbackNews,
  fallbackPeople,
  fallbackProductions,
  fallbackSponsors,
} from "@/content/fallback";

// TODO(phase-3): replace direct fallback imports with Sanity fetch helpers.
export default function HomePage() {
  const upcoming = fallbackProductions.find((p) => p.status === "upcoming");
  const founders = fallbackPeople.filter((p) => p.isFounder);

  return (
    <>
      <Hero />
      {upcoming?.openingNight ? (
        <Countdown
          target={upcoming.openingNight}
          productionTitle={upcoming.title}
        />
      ) : null}
      {upcoming ? <UpcomingProduction production={upcoming} /> : null}
      <MissionSection />
      <NewsGrid posts={fallbackNews} />
      <FoundersGrid founders={founders} />
      <SponsorStrip sponsors={fallbackSponsors} />
      <NewsletterCta />
    </>
  );
}

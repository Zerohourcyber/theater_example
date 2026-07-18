import { Countdown } from "@/components/sections/countdown";
import { FoundersGrid } from "@/components/sections/founders-grid";
import { Hero } from "@/components/sections/hero";
import { MissionSection } from "@/components/sections/mission-section";
import { NewsGrid } from "@/components/sections/news-grid";
import { NewsletterCta } from "@/components/sections/newsletter-cta";
import { SponsorStrip } from "@/components/sections/sponsor-strip";
import { UpcomingProduction } from "@/components/sections/upcoming-production";
import {
  getFounders,
  getNewsPosts,
  getSponsors,
  getUpcomingProduction,
} from "@/lib/sanity/fetch";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export default async function HomePage() {
  const [upcoming, posts, founders, sponsors] = await Promise.all([
    getUpcomingProduction(),
    getNewsPosts(),
    getFounders(),
    getSponsors(),
  ]);

  const announcement = upcoming
    ? {
        label: upcoming.openingNight
          ? `${upcoming.title} — opens ${formatDate(upcoming.openingNight, { month: "short", day: "numeric" })}`
          : upcoming.title,
        href: `/productions/${upcoming.slug}`,
      }
    : null;

  return (
    <>
      <Hero announcement={announcement} />
      {upcoming?.openingNight ? (
        <Countdown
          target={upcoming.openingNight}
          productionTitle={upcoming.title}
        />
      ) : null}
      {upcoming ? <UpcomingProduction production={upcoming} /> : null}
      <MissionSection />
      <NewsGrid posts={posts} />
      <FoundersGrid founders={founders} />
      <SponsorStrip sponsors={sponsors} />
      <NewsletterCta />
    </>
  );
}

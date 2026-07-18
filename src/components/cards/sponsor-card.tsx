import Image from "next/image";
import type { Sponsor } from "@/types";

/**
 * Sponsor logo tile: grayscale at rest, full color + gold border on hover
 * (SPEC §4.1.7). Falls back to a wordmark when no logo image exists.
 */
export function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const logoUrl = sponsor.logo?.url ?? sponsor.logo?.asset?.url;

  const inner = logoUrl ? (
    <Image
      src={logoUrl}
      alt={`${sponsor.name} logo`}
      width={160}
      height={64}
      className="max-h-12 w-auto object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0"
    />
  ) : (
    <span className="font-display text-lg text-muted transition-colors duration-300 group-hover:text-foreground">
      {sponsor.name}
    </span>
  );

  const className =
    "group flex h-24 items-center justify-center rounded-lg border border-border bg-surface px-6 transition-colors duration-300 hover:border-primary/50";

  if (sponsor.url) {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={sponsor.name}
        className={className}
      >
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}

import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SmartImage } from "@/components/ui/image-placeholder";
import { formatDate } from "@/lib/utils";
import type { Production } from "@/types";

const statusLabel: Record<Production["status"], string> = {
  upcoming: "Upcoming",
  current: "Now Playing",
  past: "Past Production",
};

export function ProductionCard({ production }: { production: Production }) {
  const firstNight = production.openingNight ?? production.performances?.[0]?.dateTime;

  return (
    <Link
      href={`/productions/${production.slug}`}
      className="card-lift group block overflow-hidden rounded-lg border border-border bg-surface"
    >
      <div className="relative aspect-2/3 w-full overflow-hidden">
        <SmartImage
          image={production.poster}
          alt={`Poster for ${production.title}`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          placeholderLabel={production.title}
        />
        <div className="absolute left-3 top-3">
          <Badge
            variant={production.status === "past" ? "muted" : "gold"}
            className="bg-background/70 backdrop-blur-sm"
          >
            {statusLabel[production.status]}
          </Badge>
        </div>
      </div>
      <div className="space-y-2 p-5">
        <h3 className="text-2xl transition-colors group-hover:text-primary">
          {production.title}
        </h3>
        {firstNight ? (
          <p className="flex items-center gap-2 text-sm text-muted">
            <CalendarDays aria-hidden className="size-4 text-accent/70" />
            {production.status === "past" ? "Opened " : "Opens "}
            {formatDate(firstNight)}
          </p>
        ) : null}
        {production.venue ? (
          <p className="flex items-center gap-2 text-sm text-muted">
            <MapPin aria-hidden className="size-4 text-accent/70" />
            {production.venue}
          </p>
        ) : null}
      </div>
    </Link>
  );
}

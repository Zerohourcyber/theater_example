import { PortableText } from "@portabletext/react";
import { SmartImage } from "@/components/ui/image-placeholder";
import type { Person } from "@/types";

export function PersonCard({
  person,
  showBio = false,
}: {
  person: Person;
  showBio?: boolean;
}) {
  const initials = person.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="card-lift h-full overflow-hidden rounded-lg border border-border bg-surface">
      <div className="relative aspect-square w-full overflow-hidden">
        <SmartImage
          image={person.headshot}
          alt={`Headshot of ${person.name}`}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          placeholderLabel={initials}
        />
      </div>
      <div className="space-y-2 p-5">
        <h3 className="text-2xl">{person.name}</h3>
        {person.roleTitle ? (
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            {person.roleTitle}
          </p>
        ) : null}
        {showBio && person.bio ? (
          <div className="text-sm leading-relaxed text-muted">
            <PortableText value={person.bio} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

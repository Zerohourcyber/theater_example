"use client";

import { useEffect, useState } from "react";

export type NavSection = { id: string; num: string; title: string };

/**
 * The sticky numbered contents from packet.html. Highlights whichever section
 * is currently in the reading band. Desktop only — on a narrow screen the
 * document is short enough to scroll, and in print it disappears entirely.
 */
export function ProposalNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Contents"
      className="no-print sticky top-0 hidden self-start pb-8 pt-16 lg:block"
    >
      <ol className="m-0 list-none p-0 text-[0.9375rem]">
        {sections.map((section) => {
          const current = section.id === active;
          return (
            <li key={section.id} className="mb-1.5">
              <a
                href={`#${section.id}`}
                aria-current={current ? "true" : undefined}
                className={`flex gap-3 leading-snug no-underline transition-colors ${
                  current ? "text-ink" : "text-ink-dim hover:text-ink"
                }`}
              >
                <span
                  className={`tnum font-light ${
                    current ? "text-wheat opacity-100" : "opacity-55"
                  }`}
                >
                  {section.num}
                </span>
                <span>{section.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

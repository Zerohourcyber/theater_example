"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

/**
 * index.html's masthead, extended for a multi-page site. Four links wrap onto
 * a second row on narrow screens rather than collapsing into a menu — with
 * this few destinations a disclosure widget costs more than it saves.
 */
export function Navbar() {
  const pathname = usePathname();

  return (
    <header>
      <Container className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 pb-2 pt-8">
        <Link href="/" className="no-underline">
          <p className="m-0 text-[1.0625rem] font-medium leading-tight tracking-[0.01em]">
            {siteConfig.name}
            <span className="block text-[0.8125rem] font-light italic tracking-normal text-bone-dim">
              {siteConfig.nameQualifier}
            </span>
          </p>
        </Link>

        <nav aria-label="Primary">
          <ul className="m-0 flex list-none flex-wrap items-baseline gap-x-6 gap-y-2 p-0">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "border-b pb-px text-[0.9375rem] no-underline transition-colors",
                      active
                        ? "border-wheat-bright text-bone"
                        : "border-transparent text-bone-dim hover:border-rule-dark hover:text-bone"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

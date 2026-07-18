"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Container } from "./container";

/**
 * Sticky navbar: transparent at the top of the page, translucent blur once
 * scrolled. Collapses to a toggle menu below md.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu closes via onClick on each link (see below) rather than a
  // pathname effect, which would set state synchronously inside an effect.
  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-border/60 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl tracking-wide text-foreground transition-colors hover:text-primary"
        >
          <span aria-hidden className="mr-2 text-primary">
            ✦
          </span>
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors",
                  active
                    ? "text-primary"
                    : "text-foreground/80 hover:bg-surface hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md text-foreground hover:bg-surface md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </Container>

      {/* Mobile nav */}
      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-border/60 bg-background/95 backdrop-blur-md md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-3 text-sm font-medium uppercase tracking-[0.16em] transition-colors",
                    active
                      ? "text-primary"
                      : "text-foreground/80 hover:bg-surface hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </Container>
        </nav>
      ) : null}
    </header>
  );
}

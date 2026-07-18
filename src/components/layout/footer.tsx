import Link from "next/link";
import { footerLinks, navLinks, siteConfig } from "@/config/site";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      {/* Oversized editorial wordmark band */}
      <div className="overflow-hidden border-b border-border/60">
        <Container className="py-8 sm:py-10">
          <p
            aria-hidden
            className="font-display text-[clamp(3rem,11vw,8rem)] leading-none tracking-tight text-foreground/90"
          >
            {siteConfig.shortName}
            <span className="text-primary">.</span>
          </p>
        </Container>
      </div>
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="font-display text-2xl">
            <span aria-hidden className="mr-2 text-primary">
              ✦
            </span>
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted">
            {siteConfig.description}
          </p>
          <p className="mt-4 text-sm text-muted">
            In partnership with{" "}
            <span className="text-foreground">{siteConfig.collegePartner}</span>
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
            Explore
          </p>
          <ul className="space-y-2">
            {[...navLinks.slice(1), ...footerLinks].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
            Connect
          </p>
          <ul className="space-y-2">
            <li>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {siteConfig.contactEmail}
              </a>
            </li>
            {siteConfig.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-border/60">
        <Container className="flex flex-col items-start justify-between gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Youth-led. Community-built. Stage-ready.</p>
        </Container>
      </div>
    </footer>
  );
}

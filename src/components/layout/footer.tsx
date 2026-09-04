import Link from "next/link";
import { navLinks, placeholderText, siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";
import { DarkBand } from "@/components/ui/section";

/**
 * The disclaimers here are load-bearing rather than boilerplate: they are what
 * let the rest of the site make claims a reader can trust. Carried over from
 * the source files with the wording intact.
 */
export function Footer() {
  const email = placeholderText(siteConfig.contactEmail);

  return (
    <DarkBand className="mt-auto border-t border-rule-dark">
      <Container>
        <footer className="py-14">
          <div className="flex flex-wrap justify-between gap-x-12 gap-y-8 border-b border-rule-dark pb-10">
            <div>
              <p className="m-0 text-[1.0625rem] font-medium">
                {siteConfig.name}
              </p>
              <p className="m-0 text-[0.8125rem] italic text-bone-dim">
                {siteConfig.nameQualifier} · Portales, New Mexico
              </p>
            </div>

            <nav aria-label="Footer">
              <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-[0.9375rem]">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-bone-dim no-underline hover:text-bone"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href={`mailto:${email}`}
              className="text-[0.9375rem] text-bone underline decoration-rule-dark underline-offset-4 hover:decoration-wheat-bright"
            >
              {email}
            </a>
          </div>

          <div className="space-y-3 pt-8 text-[0.875rem] leading-[1.65] text-bone-dim">
            <p className="m-0 max-w-[52rem]">
              <strong className="font-normal text-bone">
                We are not affiliated with {siteConfig.collegePartner}, the City
                of Portales, or Roosevelt County.
              </strong>{" "}
              Any partnership described on this site is proposed, not agreed.
              Nothing here represents a commitment by any organisation other
              than our own, and no funder, sponsor or partner named or implied
              has been approached or has expressed interest.
            </p>
            <p className="m-0 max-w-[52rem]">
              {siteConfig.name} is a working name for a group in formation in
              Portales, New Mexico. It is not yet an incorporated organization,
              and contributions are not yet tax-deductible.
            </p>
            <p className="m-0 max-w-[52rem]">
              All dollar figures and dates are planning estimates prepared for
              discussion. Population figures are from the 2020 US Census.
            </p>
          </div>
        </footer>
      </Container>
    </DarkBand>
  );
}

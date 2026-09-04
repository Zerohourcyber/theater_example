import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PlaceholderNotice } from "@/components/layout/placeholder-notice";
import { SkipLink } from "@/components/layout/skip-link";
import { DarkBand } from "@/components/ui/section";

/*
 * The navbar sits on its own ink band. Every page then opens with a second
 * ink band — a hero or a PageHeader — and because both use the same ground
 * the seam is invisible, reproducing the masthead-into-cover composition the
 * source files used.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SkipLink />
      <PlaceholderNotice />
      <DarkBand>
        <Navbar />
      </DarkBand>
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity/sanity.config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Sanity Studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  // Degrade gracefully when Sanity env vars are absent (CLAUDE.md rule 1).
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main className="spotlight flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-3xl sm:text-5xl">Studio not configured</h1>
        <p className="max-w-md text-muted">
          Create a Sanity project, then set{" "}
          <code className="rounded bg-surface px-1.5 py-0.5 text-sm text-primary">
            NEXT_PUBLIC_SANITY_PROJECT_ID
          </code>{" "}
          in <code className="rounded bg-surface px-1.5 py-0.5 text-sm text-primary">.env.local</code>{" "}
          to enable the embedded CMS at this route.
        </p>
        <Link href="/" className="text-primary underline underline-offset-4">
          Back to the site
        </Link>
      </main>
    );
  }

  return <NextStudio config={config} />;
}

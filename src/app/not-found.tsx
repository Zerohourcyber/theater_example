import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SkipLink } from "@/components/layout/skip-link";

export default function NotFound() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main
        id="main-content"
        className="spotlight flex flex-1 flex-col items-center justify-center px-4 py-40 text-center"
      >
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
          404 — Dark stage
        </p>
        <h1 className="mt-4 text-5xl sm:text-6xl">
          This page missed its <span className="text-brand-gradient">cue</span>
        </h1>
        <p className="mt-4 max-w-md text-muted">
          The page you’re looking for isn’t in tonight’s program. Let’s get you
          back to your seat.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/productions">See productions</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}

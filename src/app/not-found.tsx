import { Container } from "@/components/layout/container";
import { Cta } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col justify-center py-24">
        <p className="tnum m-0 mb-4 text-[0.8125rem] text-wheat">404</p>
        <h1 className="mb-5 max-w-[18ch] text-[clamp(1.875rem,1.4rem+2vw,2.75rem)]">
          There&rsquo;s nothing at this address.
        </h1>
        <p className="measure m-0 mb-9 text-ink-dim">
          The page may have moved, or the link may be mistyped. The home page
          has everything.
        </p>
        <div>
          <Cta href="/">Back to the start</Cta>
        </div>
      </div>
    </Container>
  );
}

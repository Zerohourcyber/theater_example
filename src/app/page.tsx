import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";

// Temporary design-system smoke test page — replaced by the real Home in Phase 2.
export default function Home() {
  return (
    <main className="spotlight flex-1 py-24">
      <Container className="flex flex-col items-start gap-8">
        <Badge>Design system</Badge>
        <h1 className="text-5xl sm:text-6xl">
          <span className="text-gold-gradient">{siteConfig.name}</span>
        </h1>
        <p className="max-w-xl text-lg text-muted">{siteConfig.tagline}</p>
        <div className="gold-rule w-full max-w-md" />
        <div className="flex flex-wrap gap-4">
          <Button>See Our Next Show</Button>
          <Button variant="outline">Get Involved</Button>
        </div>
        <SectionHeading
          eyebrow="Phase 1"
          title="Tokens, type, and light"
          description="Playfair Display for display, Inter for body, limelight gold on near-black."
        />
      </Container>
    </main>
  );
}

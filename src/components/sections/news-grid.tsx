import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsCard } from "@/components/cards/news-card";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import type { NewsPost } from "@/types";

export function NewsGrid({ posts }: { posts: NewsPost[] }) {
  if (!posts.length) return null;

  return (
    <section className="py-24">
      <Container>
        <FadeIn className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Latest news"
            title="From the wings"
            description="Announcements, wrap reports, and behind-the-scenes notes."
          />
          <Button asChild variant="link">
            <Link href="/news">
              All news <ArrowRight aria-hidden />
            </Link>
          </Button>
        </FadeIn>

        <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <StaggerItem key={post._id} className="h-full">
              <NewsCard post={post} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}

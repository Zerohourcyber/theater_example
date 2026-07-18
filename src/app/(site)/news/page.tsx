import type { Metadata } from "next";
import { NewsCard } from "@/components/cards/news-card";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { getNewsPosts } from "@/lib/sanity/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "News",
  description:
    "Announcements, wrap reports, and behind-the-scenes notes from our youth-led theater company.",
};

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <>
      <PageHeader
        eyebrow="News"
        title="From the wings"
        description="Announcements, wrap reports, and behind-the-scenes notes."
      />

      <section className="py-20">
        <Container>
          <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <StaggerItem key={post._id} className="h-full">
                <NewsCard post={post} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </section>
    </>
  );
}

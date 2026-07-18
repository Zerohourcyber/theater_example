import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { SmartImage } from "@/components/ui/image-placeholder";
import { getNewsPostBySlug, getNewsPosts } from "@/lib/sanity/fetch";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getNewsPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <div className="spotlight border-b border-border/60 pb-14 pt-32">
        <Container className="max-w-3xl">
          <FadeIn>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
            >
              <ArrowLeft aria-hidden className="size-4" />
              All news
            </Link>
            <time
              dateTime={post.publishedAt}
              className="mt-6 block text-sm uppercase tracking-widest text-primary"
            >
              {formatDate(post.publishedAt)}
            </time>
            <h1 className="mt-3 text-3xl sm:text-5xl">{post.title}</h1>
            {post.excerpt ? (
              <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
            ) : null}
          </FadeIn>
        </Container>
      </div>

      {post.coverImage?.url || post.coverImage?.asset?.url ? (
        <Container className="max-w-3xl">
          <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-lg border border-border">
            <SmartImage
              image={post.coverImage}
              alt={post.coverImage.alt ?? ""}
              sizes="(min-width: 768px) 768px, 100vw"
              priority
            />
          </div>
        </Container>
      ) : null}

      {post.body ? (
        <section className="py-14">
          <Container className="max-w-3xl">
            <div className="space-y-5 text-lg leading-relaxed text-foreground/90 [&_a]:text-primary [&_a]:underline">
              <PortableText value={post.body} />
            </div>
          </Container>
        </section>
      ) : null}
    </article>
  );
}

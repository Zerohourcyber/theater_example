import Link from "next/link";
import { SmartImage } from "@/components/ui/image-placeholder";
import { formatDate } from "@/lib/utils";
import type { NewsPost } from "@/types";

export function NewsCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="card-lift group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <SmartImage
          image={post.coverImage}
          alt=""
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <time dateTime={post.publishedAt} className="text-xs uppercase tracking-widest text-muted">
          {formatDate(post.publishedAt)}
        </time>
        <h3 className="text-2xl leading-snug transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="line-clamp-3 text-sm text-muted">{post.excerpt}</p>
        ) : null}
      </div>
    </Link>
  );
}

import Image from "next/image";
import { Theater } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ImageRef } from "@/types";

interface SmartImageProps {
  image?: ImageRef;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Shown centered in the placeholder when no image exists. */
  placeholderLabel?: string;
}

/**
 * Renders a Sanity/remote image when a URL is available; otherwise a
 * branded gradient placeholder so fallback content still looks finished.
 * Parent element must be positioned (fill layout).
 */
export function SmartImage({
  image,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  placeholderLabel,
}: SmartImageProps) {
  const url = image?.url ?? image?.asset?.url;

  if (url) {
    return (
      <Image
        src={url}
        alt={image?.alt ?? alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(160deg,#1b1b26_0%,#14141c_55%,#221a10_100%)]",
        className
      )}
    >
      <Theater aria-hidden className="size-8 text-primary/50" />
      {placeholderLabel ? (
        <span className="max-w-[80%] text-center font-display text-lg leading-snug text-foreground/70">
          {placeholderLabel}
        </span>
      ) : null}
    </div>
  );
}

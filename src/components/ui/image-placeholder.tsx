import Image from "next/image";
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
        "absolute inset-0 @container overflow-hidden bg-[linear-gradient(165deg,#16203a_0%,#121a2a_50%,#0d1626_100%)]",
        className
      )}
    >
      {/* Volumetric light beams falling from above */}
      <div
        aria-hidden
        className="absolute -top-1/4 left-[18%] h-[150%] w-[18%] rotate-[16deg] bg-gradient-to-b from-primary/25 via-primary/8 to-transparent blur-xl"
      />
      <div
        aria-hidden
        className="absolute -top-1/4 right-[18%] h-[150%] w-[14%] -rotate-[14deg] bg-gradient-to-b from-accent/20 via-accent/6 to-transparent blur-xl"
      />
      {/* Stage-floor glow */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 bg-[radial-gradient(ellipse_70%_100%_at_50%_100%,rgba(59,155,255,0.16),transparent_70%)]"
      />
      {/* Thin inner frame, like a printed poster border */}
      <div
        aria-hidden
        className="absolute inset-[6%] border border-foreground/15"
      />

      <div className="absolute inset-[6%] flex flex-col items-center justify-center gap-[4cqh] px-[8cqw] text-center">
        {placeholderLabel ? (
          <>
            <span
              aria-hidden
              className="text-[6cqw] leading-none text-accent/80"
            >
              ✦
            </span>
            <span className="font-display text-[clamp(0.9rem,11cqw,3rem)] leading-[1.15] text-foreground/90 [text-wrap:balance]">
              {placeholderLabel}
            </span>
          </>
        ) : (
          <span
            aria-hidden
            className="text-[clamp(1.25rem,10cqw,2.5rem)] leading-none text-accent/60"
          >
            ✦
          </span>
        )}
      </div>
    </div>
  );
}

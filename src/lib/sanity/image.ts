import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { dataset, projectId } from "./client";

const builder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

/**
 * Build a Sanity CDN URL for an image reference, or null when Sanity is not
 * configured (fallback content supplies plain URLs instead).
 */
export function urlForImage(source: SanityImageSource, width = 1200) {
  if (!builder) return null;
  return builder.image(source).width(width).fit("max").auto("format").url();
}

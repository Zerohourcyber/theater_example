import type { PortableText } from "@/types";

let keyCounter = 0;
const nextKey = () => `fb-${(keyCounter++).toString(36)}`;

/**
 * Build Portable Text blocks from plain paragraphs so fallback content
 * renders through the same <PortableText> component as Sanity data.
 */
export function pt(...paragraphs: string[]): PortableText {
  return paragraphs.map((text) => ({
    _type: "block",
    _key: nextKey(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: nextKey(), text, marks: [] }],
  })) as PortableText;
}

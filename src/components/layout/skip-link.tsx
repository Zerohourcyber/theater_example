/** Visually-hidden link that appears on focus; first tab stop on every page. */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:font-semibold focus:text-background"
    >
      Skip to content
    </a>
  );
}

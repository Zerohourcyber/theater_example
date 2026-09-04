/** Keyboard skip target; visually hidden until focused. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="absolute left-[-9999px] top-0 z-50 bg-wheat px-5 py-3 text-paper focus:left-0"
    >
      Skip to content
    </a>
  );
}

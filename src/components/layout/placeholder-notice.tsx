import { unresolvedPlaceholders } from "@/config/site";

/**
 * Replaces the `[FILL]` / `CHANGE-EMAIL` comments the source files scattered
 * through their markup. Renders only outside production, so the reminder is
 * visible while editing and on Vercel previews but can never reach a sponsor.
 */
export function PlaceholderNotice() {
  if (process.env.VERCEL_ENV === "production") return null;

  const missing = unresolvedPlaceholders();
  if (missing.length === 0) return null;

  return (
    <div className="no-print border-b border-stop/40 bg-stop/10 px-[clamp(1.5rem,5vw,6rem)] py-2.5 text-[0.8125rem] text-stop">
      <p className="m-0 mx-auto max-w-[68rem]">
        <strong className="font-medium">Not ready to send.</strong> Still
        placeholder in <code>src/config/site.ts</code>: {missing.join(", ")}.
      </p>
    </div>
  );
}

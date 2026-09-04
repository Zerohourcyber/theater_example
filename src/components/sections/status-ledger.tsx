import { ledger, type LedgerState } from "@/content/ledger";
import { cn } from "@/lib/utils";

const statusTone: Record<LedgerState, string> = {
  // Open items take the gold. Drawing the eye to what is unfinished is the
  // point of the ledger, not something to play down.
  open: "text-wheat",
  underway: "text-ink",
  set: "text-ink-dim italic",
};

/**
 * index.html's ledger, with the next step and its target month added beside
 * each status. Kept as a description list rather than a table: the next step
 * describes the item above it, and the pairing survives being read aloud or
 * flattened onto a narrow screen.
 */
export function StatusLedger() {
  return (
    <div>
      <dl className="m-0 border-t border-rule">
        {ledger.map((row) => (
          <div
            key={row.item}
            className="grid grid-cols-1 gap-x-8 gap-y-1 border-b border-rule py-4 sm:grid-cols-[1fr_auto] sm:items-baseline"
          >
            <dt className="text-[1.0625rem] leading-snug">{row.item}</dt>

            <dd
              className={cn(
                "m-0 text-[0.9375rem] leading-snug sm:text-right sm:whitespace-nowrap",
                statusTone[row.state]
              )}
            >
              {row.status}
            </dd>

            {/* Second line: the commitment that turns a gap into a plan. */}
            <p className="col-span-full m-0 flex flex-wrap items-baseline gap-x-3 text-[0.9375rem] leading-snug text-ink-dim">
              <span className="max-w-[46ch]">{row.next}</span>
              <span className="tnum text-[0.8125rem] text-ink-dim/80">
                {row.by}
              </span>
            </p>
          </div>
        ))}
      </dl>

      <p className="measure mt-7 text-[0.9375rem] text-ink-dim">
        We&rsquo;d rather be plain about this than sound further along than we
        are. If you&rsquo;re reading this early, that&rsquo;s on purpose — early
        is when your help counts most.
      </p>
    </div>
  );
}

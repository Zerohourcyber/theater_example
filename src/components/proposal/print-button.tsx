"use client";

/** The leave-behind: every audience variant prints to a clean PDF. */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print border border-rule px-5 py-2.5 text-[0.9375rem] text-ink-dim transition-colors hover:border-wheat hover:text-ink"
    >
      Print or save this as a PDF
    </button>
  );
}

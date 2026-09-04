import { fundingSources } from "@/content/funding";
import { cn } from "@/lib/utils";

export function FundingTable() {
  return (
    <table className="w-full border-collapse text-left">
      <caption className="measure-wide mb-6 text-left text-[0.9375rem] italic text-ink-dim">
        Where a first production&rsquo;s funding realistically comes from.
        Figures and framing are planning estimates for discussion, not quotes or
        commitments.
      </caption>
      <thead>
        <tr className="border-b-2 border-ink">
          <th scope="col" className="py-2.5 pr-6 text-[0.8125rem] font-normal uppercase tracking-wider text-ink-dim">
            Source
          </th>
          <th scope="col" className="py-2.5 pr-6 text-[0.8125rem] font-normal uppercase tracking-wider text-ink-dim">
            Role
          </th>
          <th scope="col" className="py-2.5 text-[0.8125rem] font-normal uppercase tracking-wider text-ink-dim">
            In time?
          </th>
        </tr>
      </thead>
      <tbody>
        {fundingSources.map((row) => (
          <tr key={row.source} className="border-b border-rule align-top">
            <td className="py-4 pr-6 md:w-[26%]">{row.source}</td>
            <td className="py-4 pr-6 text-[0.9375rem] text-ink-dim">
              {row.role}
            </td>
            <td
              className={cn(
                "py-4 text-[0.9375rem] whitespace-nowrap",
                row.availability === "Season two" ? "text-ink-dim" : "text-go"
              )}
            >
              {row.availability}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

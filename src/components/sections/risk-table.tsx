import { risks } from "@/content/risks";
import { cn } from "@/lib/utils";

export function RiskTable() {
  return (
    <table className="w-full border-collapse text-left">
      <caption className="measure-wide mb-6 text-left text-[0.9375rem] italic text-ink-dim">
        Named openly, with what we would do about each. We would rather show a
        partner this than have them find it.
      </caption>
      <thead>
        <tr className="border-b-2 border-ink">
          <th scope="col" className="py-2.5 pr-6 text-[0.8125rem] font-normal uppercase tracking-wider text-ink-dim">
            Risk
          </th>
          <th scope="col" className="py-2.5 pr-6 text-[0.8125rem] font-normal uppercase tracking-wider text-ink-dim">
            Our response
          </th>
          <th scope="col" className="py-2.5 text-[0.8125rem] font-normal uppercase tracking-wider text-ink-dim">
            Level
          </th>
        </tr>
      </thead>
      <tbody>
        {risks.map((row) => (
          <tr key={row.risk} className="border-b border-rule align-top">
            <td className="py-4 pr-6 md:w-[30%]">{row.risk}</td>
            <td className="py-4 pr-6 text-[0.9375rem] text-ink-dim">
              {row.response}
            </td>
            <td
              className={cn(
                "py-4 text-[0.9375rem] whitespace-nowrap",
                row.level === "High" ? "text-stop" : "text-ink-dim"
              )}
            >
              {row.level}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

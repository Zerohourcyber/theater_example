import { timeline } from "@/content/timeline";
import { cn } from "@/lib/utils";

/** packet.html's phased rail. The current phase carries the filled dot. */
export function Timeline() {
  return (
    <ol className="m-0 list-none p-0">
      {timeline.map((phase) => (
        <li key={phase.when} className="grid grid-cols-[1.25rem_1fr] gap-x-5">
          {/* Rail: a continuous hairline with a dot per phase. */}
          <div
            className="relative flex justify-center"
            aria-hidden="true"
          >
            <span className="absolute inset-y-0 w-px bg-rule" />
            <span
              className={cn(
                "relative mt-2 h-[0.5625rem] w-[0.5625rem] rounded-full border",
                phase.current
                  ? "border-wheat bg-wheat"
                  : "border-rule bg-paper"
              )}
            />
          </div>

          <div className="pb-9">
            <p
              className={cn(
                "tnum m-0 text-[0.8125rem]",
                phase.current ? "text-wheat" : "text-ink-dim"
              )}
            >
              {phase.when}
              {phase.current ? " · now" : ""}
            </p>
            <h3 className="mb-1.5 mt-1 text-[1.125rem]">{phase.title}</h3>
            <p className="measure m-0 text-base text-ink-dim">{phase.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

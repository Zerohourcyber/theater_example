import { figures } from "@/content/figures";

export function Figures() {
  return (
    <dl className="my-10 grid grid-cols-2 gap-x-8 gap-y-7 border-y border-rule py-7 md:grid-cols-4">
      {figures.map((figure) => (
        <div key={figure.label}>
          <dt className="sr-only">{figure.label}</dt>
          <dd className="m-0">
            <p className="tnum m-0 text-[clamp(1.625rem,1.35rem+1.4vw,2.25rem)] leading-none">
              {figure.value}
            </p>
            <p className="m-0 mt-2 text-[0.8125rem] leading-snug text-ink-dim">
              {figure.label}
            </p>
          </dd>
        </div>
      ))}
    </dl>
  );
}

import { cn } from "@/lib/utils";

type ContainerProps = {
  /** `wide` matches the proposal's sidebar layout; everything else uses the default. */
  width?: "default" | "wide";
  className?: string;
  children: React.ReactNode;
};

/** Page gutter and max measure, carried over from the source files. */
export function Container({
  width = "default",
  className,
  children,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[clamp(1.5rem,5vw,6rem)]",
        width === "wide" ? "max-w-[78rem]" : "max-w-[68rem]",
        className
      )}
    >
      {children}
    </div>
  );
}

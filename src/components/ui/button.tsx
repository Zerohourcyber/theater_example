import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium uppercase tracking-[0.14em] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Solid electric blue — primary CTA. Dark text passes AA on blue. */
        primary:
          "bg-primary text-background hover:bg-primary-hover font-semibold",
        /** Thin blue outline — secondary CTA. */
        outline:
          "border border-primary/60 text-primary hover:border-primary hover:bg-primary/10",
        /** Low-emphasis surface button. */
        ghost: "text-foreground hover:bg-surface hover:text-primary",
        /** Pale sky blue, used sparingly. Dark text passes AA on pale blue. */
        accent: "bg-accent text-background hover:bg-accent/85 font-semibold",
        /** Text-like link button. */
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as the child element (e.g. a Next <Link>) instead of <button>. */
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };

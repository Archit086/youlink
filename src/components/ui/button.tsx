import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * The system's signature component.
 *
 * Hover is a wipe, not a colour fade: a ::before panel scales in on the x-axis
 * from the left edge over 800ms with the expo-out curve, and the label colour
 * flips with it. Reduced-motion visitors get the same hover as an instant
 * colour swap — the interaction never disappears, it just stops moving.
 */
const buttonVariants = cva(
  [
    "relative isolate inline-flex w-fit shrink-0 items-center justify-center gap-8 overflow-hidden whitespace-nowrap",
    "font-mono uppercase",
    "transition-[color,background-color,border-color] duration-800 ease-out",
    "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:-z-10 before:h-full before:w-full",
    "before:origin-left before:scale-x-0 before:transition-transform before:duration-800 before:ease-out before:content-['']",
    "hover:before:scale-x-100",
    "motion-reduce:transition-none motion-reduce:before:hidden motion-reduce:before:transition-none",
    "disabled:pointer-events-none disabled:opacity-50 disabled:grayscale",
    "[&_svg]:pointer-events-none [&_svg]:size-14 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        /* Primary — an inverted block that wipes to the accent. */
        default:
          "bg-theme-fg text-theme-bg before:bg-accent hover:text-ink motion-reduce:hover:bg-accent motion-reduce:hover:text-ink",
        action:
          "bg-theme-fg text-theme-bg before:bg-accent hover:text-ink motion-reduce:hover:bg-accent motion-reduce:hover:text-ink",
        hero: "bg-theme-fg text-theme-bg before:bg-accent hover:text-ink motion-reduce:hover:bg-accent motion-reduce:hover:text-ink",

        /* Secondary — a ruled cell that wipes to solid foreground. */
        outline:
          "border bg-theme-bg text-theme-fg before:bg-theme-fg hover:text-theme-bg motion-reduce:hover:bg-theme-fg motion-reduce:hover:text-theme-bg",
        heroOutline:
          "border bg-theme-bg text-theme-fg before:bg-theme-fg hover:text-theme-bg motion-reduce:hover:bg-theme-fg motion-reduce:hover:text-theme-bg",
        secondary:
          "bg-grey text-ink before:bg-ink hover:text-white motion-reduce:hover:bg-ink motion-reduce:hover:text-white",
        accent:
          "bg-accent text-ink before:bg-theme-fg hover:text-theme-bg motion-reduce:hover:bg-theme-fg motion-reduce:hover:text-theme-bg",
        destructive:
          "bg-ink text-white before:bg-accent hover:text-ink motion-reduce:hover:bg-accent motion-reduce:hover:text-ink",

        /* Flat — no fill, colour shift only. */
        ghost: "text-theme-fg before:bg-theme-fg hover:text-theme-bg motion-reduce:hover:bg-theme-fg",
        nav: "text-theme-fg opacity-60 transition-opacity duration-300 before:hidden hover:opacity-100",
        link: "text-theme-fg before:hidden underline-offset-4 hover:underline",
      },
      size: {
        default: "h-36 px-12 text-caption-10",
        sm: "h-28 px-10 text-caption-10",
        lg: "h-44 px-16 text-caption-10",
        xl: "h-52 px-20 text-caption-20",
        /* Fills the width of its cell — the common case in a ruled grid. */
        cell: "h-52 w-full px-20 text-caption-20",
        icon: "size-36 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

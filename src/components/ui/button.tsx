import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Pill-shaped by default, to match the two hero buttons. The loud spectrum
 * gradient lives in `ContactButton`; everything here is a quieter variant.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full",
    "font-medium",
    "transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.99]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-white font-semibold text-gray-900 hover:bg-gray-100",
        outline: "border-2 border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10",
        secondary: "bg-[#D7E2EA]/10 text-[#D7E2EA] hover:bg-[#D7E2EA]/20",
        ghost: "text-[#D7E2EA] hover:bg-[#D7E2EA]/10",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
        link: "rounded-none text-[#D7E2EA] underline-offset-4 hover:underline hover:scale-100",
      },
      size: {
        default: "h-11 px-8 text-sm",
        sm: "h-9 px-6 text-xs",
        lg: "h-14 px-12 text-base",
        /** Fills the width of its container. */
        cell: "h-14 w-full px-10 text-sm",
        icon: "size-11 px-0",
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

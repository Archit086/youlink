import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-44 w-full border bg-transparent px-12 py-10 text-body-10",
          "placeholder:opacity-40",
          "transition-colors duration-300 ease-out",
          "file:border-0 file:bg-transparent file:font-mono file:text-caption-10 file:uppercase",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl border border-[#D7E2EA]/20 bg-[#D7E2EA]/[0.03] px-4 py-2",
          "text-sm font-light text-[#D7E2EA] placeholder:text-[#D7E2EA]/35",
          "transition-colors duration-300 ease-out focus:border-[#D7E2EA]/60",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#D7E2EA]",
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

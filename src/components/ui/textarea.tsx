import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-32 w-full rounded-2xl border border-[#D7E2EA]/20 bg-[#D7E2EA]/[0.03] px-4 py-3",
          "text-sm font-light leading-relaxed text-[#D7E2EA] placeholder:text-[#D7E2EA]/35",
          "transition-colors duration-300 ease-out focus:border-[#D7E2EA]/60",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };

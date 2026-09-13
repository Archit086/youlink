import { Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { instagramUrl } from "@/data/site";

interface InstagramLinkProps {
  handle: string;
  name: string;
  /** Show the handle as text beside the mark. */
  showHandle?: boolean;
  className?: string;
}

/** A client's Instagram, as the mark in a glass circle plus the handle. Opens in a new tab. */
export const InstagramLink = ({ handle, name, showHandle = true, className }: InstagramLinkProps) => (
  <a
    href={instagramUrl(handle)}
    target="_blank"
    rel="noreferrer noopener"
    aria-label={`${name} on Instagram, ${handle} (opens in a new tab)`}
    className={cn("group inline-flex items-center gap-2 text-mist", className)}
  >
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-strong/30 bg-strong/10 text-strong transition-colors duration-200 group-hover:bg-strong/25">
      <Instagram className="h-4 w-4" aria-hidden="true" />
    </span>
    {showHandle && (
      <span className="text-sm font-light opacity-70 transition-opacity duration-200 group-hover:opacity-100">
        {handle}
      </span>
    )}
  </a>
);

/** Marks a client YouLink is working with now. */
export const CurrentBadge = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-strong/30 bg-strong/10 px-2.5 py-0.5 text-xs font-medium text-strong">
    <span className="h-1.5 w-1.5 rounded-full bg-[#e8702a]" aria-hidden="true" />
    Current
  </span>
);

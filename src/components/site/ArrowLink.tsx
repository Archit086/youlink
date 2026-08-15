import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

/** Text link in the label treatment, with the origin-left underline wipe. */
export const ArrowLink = ({ to, children, className }: ArrowLinkProps) => (
  <Link to={to} className={cn("link-wipe inline-block font-mono text-caption-10 uppercase", className)}>
    {children}
  </Link>
);

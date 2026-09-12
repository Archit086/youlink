import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  /** Internal route. Omit and pass `href` for an external destination. */
  to?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const pill =
  "inline-block rounded-full px-7 py-3 text-center text-sm font-medium text-white transition-all hover:scale-[1.03] active:scale-95";

const render = (classes: string, { to, href, children }: Pick<ActionButtonProps, "to" | "href" | "children">) =>
  href ? (
    <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
      {children}
    </a>
  ) : (
    <Link to={to ?? "/"} className={classes}>
      {children}
    </Link>
  );

/** The primary action — the same orange pill as the homepage hero. */
export const ContactButton = ({
  to = "/hire",
  href,
  children = "Start a project",
  className,
}: Partial<ActionButtonProps>) =>
  render(
    cn(pill, "bg-[#e8702a] hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/30", className),
    { to, href, children },
  );

/** The secondary action — a glass pill matching the navigation. */
export const LiveProjectButton = ({
  to = "/work",
  href,
  children = "View the work",
  className,
}: Partial<ActionButtonProps>) =>
  render(cn(pill, "border border-white/30 bg-white/20 backdrop-blur-md hover:bg-white/30", className), {
    to,
    href,
    children,
  });

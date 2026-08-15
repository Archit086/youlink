import { Client } from "@/data/site";
import { cn } from "@/lib/utils";
import { CornerBadge } from "@/components/site/CornerBadge";

interface CaseCardProps {
  client: Client;
  index: string;
  /** "feature" is the full-width lead case; "standard" is the supporting scale. */
  scale?: "feature" | "standard";
  className?: string;
}

/**
 * A case plate. There are no licensed client images to publish, so scale,
 * hairlines and a corner-notched index carry the composition instead of
 * placeholder photography. The whole panel is a `peer`, so the badge inverts
 * when any part of it is hovered.
 */
export const CaseCard = ({ client, index, scale = "standard", className }: CaseCardProps) => {
  const isFeature = scale === "feature";

  return (
    <article className={cn("relative h-full", className)}>
      <div className="peer flex h-full flex-col p-12 pt-40 transition-colors duration-800 ease-out hover:bg-theme-fg hover:text-theme-bg lg:p-20 lg:pt-48">
        <p className="label opacity-60">{client.sector}</p>

        <h3 className={cn("mt-16", isFeature ? "text-headline-30" : "text-headline-10")}>{client.name}</h3>

        <div className="mt-8 flex flex-wrap gap-x-16 gap-y-2 font-mono text-caption-10 uppercase opacity-60">
          {client.handle && <span>{client.handle}</span>}
          {client.since && <span>Since {client.since}</span>}
        </div>

        <div className={cn("mt-32 grid flex-1 gap-24 border-t pt-20", isFeature && "lg:grid-cols-2 lg:gap-40")}>
          <div>
            <p className="label opacity-60">The brand</p>
            <p className={cn("mt-12 max-w-prose opacity-80", isFeature ? "text-body-20" : "text-body-10")}>
              {client.profile}
            </p>
          </div>

          <div>
            <p className="label opacity-60">Our work</p>
            <p className={cn("mt-12 max-w-prose opacity-80", isFeature ? "text-body-20" : "text-body-10")}>
              {client.engagement}
            </p>
          </div>
        </div>
      </div>

      <CornerBadge>{index}</CornerBadge>
    </article>
  );
};

import { FadeIn } from "@/components/motion/FadeIn";
import { Panel } from "@/components/site/Page";
import { CurrentBadge, InstagramLink } from "@/components/site/ClientBits";
import type { Client } from "@/data/site";
import { caseMedia } from "@/data/media";

interface CaseCardProps {
  client: Client;
  index: string;
  delay?: number;
}

/**
 * One client: name, sector and Instagram, then what the brand is and what
 * YouLink did for it. The frame, profile and engagement notes appear only where
 * they exist for that client.
 */
export const CaseCard = ({ client, index, delay = 0 }: CaseCardProps) => {
  const media = caseMedia[client.id];

  return (
    <FadeIn delay={delay} y={30} className="h-full">
      <Panel className="flex h-full flex-col md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <span className="display-sans" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            {index}
          </span>
          <div className="flex items-center gap-3">
            {client.current && <CurrentBadge />}
            {client.since && (
              <span className="eyebrow text-[#D7E2EA] opacity-40">Since {client.since}</span>
            )}
          </div>
        </div>

        <h3
          className="mt-4 font-medium leading-tight text-[#D7E2EA]"
          style={{ fontSize: "clamp(1.25rem, 2.6vw, 2rem)" }}
        >
          {client.name}
        </h3>

        {client.sector && (
          <p className="eyebrow mt-1 text-[#D7E2EA] opacity-40">{client.sector}</p>
        )}

        <InstagramLink handle={client.handle} name={client.name} className="mt-4 w-fit" />

        {media && (
          <img
            src={media.columnTwo}
            alt={"Work for " + client.name}
            loading="lazy"
            className="mt-6 h-56 w-full rounded-[24px] object-cover md:h-72 md:rounded-[28px]"
          />
        )}

        {client.profile && (
          <p className="mt-6 text-sm font-light leading-relaxed text-[#D7E2EA] opacity-70">
            {client.profile}
          </p>
        )}

        {client.engagement && (
          <p className="mt-4 border-t border-[#D7E2EA]/15 pt-4 text-sm font-light leading-relaxed text-[#D7E2EA] opacity-60">
            {client.engagement}
          </p>
        )}
      </Panel>
    </FadeIn>
  );
};

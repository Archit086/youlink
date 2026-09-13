import { FadeIn } from "@/components/motion/FadeIn";
import { Panel } from "@/components/site/Page";
import { CurrentBadge, InstagramLink } from "@/components/site/ClientBits";
import { ClientLogo } from "@/components/work/ClientLogo";
import type { Client } from "@/data/site";
import { clientGalleries } from "@/data/media";

interface CaseCardProps {
  client: Client;
  index: string;
  delay?: number;
}

/**
 * One client on the Work page: name, sector and Instagram, their logo in a frame
 * shaped to it, then what the brand is and what YouLink did for it. Each part
 * appears only where it exists for that client.
 */
export const CaseCard = ({ client, index, delay = 0 }: CaseCardProps) => {
  const gallery = clientGalleries[client.id];

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
              <span className="eyebrow text-mist opacity-40">Since {client.since}</span>
            )}
          </div>
        </div>

        <h3
          className="mt-4 font-medium leading-tight text-mist"
          style={{ fontSize: "clamp(1.25rem, 2.6vw, 2rem)" }}
        >
          {client.name}
        </h3>

        {client.sector && (
          <p className="eyebrow mt-1 text-mist opacity-40">{client.sector}</p>
        )}

        <InstagramLink handle={client.handle} name={client.name} className="mt-4 w-fit" />

        {gallery?.logo && (
          <div className="mt-8 flex justify-center">
            <ClientLogo clientId={client.id} gallery={gallery} name={client.name} />
          </div>
        )}

        {client.profile && (
          <p className="mt-8 text-sm font-light leading-relaxed text-mist opacity-70">
            {client.profile}
          </p>
        )}

        {client.engagement && (
          <p className="mt-4 border-t border-mist/15 pt-4 text-sm font-light leading-relaxed text-mist opacity-60">
            {client.engagement}
          </p>
        )}
      </Panel>
    </FadeIn>
  );
};

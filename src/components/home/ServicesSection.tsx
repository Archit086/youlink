import { FadeIn } from "@/components/motion/FadeIn";
import { RevealImageList } from "@/components/ui/reveal-images";
import { services } from "@/data/site";
import { serviceImages } from "@/data/media";

const items = services
  .filter((service) => serviceImages[service.id])
  .map((service) => ({
    text: service.title,
    description: service.summary,
    images: serviceImages[service.id],
    href: `/services#${service.id}`,
  }));

/**
 * The five capabilities as large serif titles. Hovering or focusing one dims it
 * and fans two frames out from behind its last letters.
 */
export const ServicesSection = () => (
  <section
    id="services"
    className="relative bg-ground px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32"
  >
    <FadeIn
      as="h2"
      delay={0}
      y={40}
      className="display-serif mb-12 text-center sm:mb-16 md:mb-20"
      style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
    >
      Services
    </FadeIn>

    <FadeIn delay={0.1} y={30} className="mx-auto max-w-5xl">
      <RevealImageList items={items} heading="What we do" />
    </FadeIn>
  </section>
);

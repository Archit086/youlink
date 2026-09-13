import { FadeIn } from "@/components/motion/FadeIn";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { ContactButton } from "@/components/site/Buttons";
import { aboutOrnaments } from "@/data/media";

/** The four objects anchored in the corners, each drifting in from its own edge. */
const ornaments = [
  {
    src: aboutOrnaments.moon,
    className: "top-[4%] left-[1%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]",
    delay: 0.1,
    x: -80,
  },
  {
    src: aboutOrnaments.shape,
    className: "bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]",
    delay: 0.25,
    x: -80,
  },
  {
    src: aboutOrnaments.lego,
    className: "top-[4%] right-[1%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]",
    delay: 0.15,
    x: 80,
  },
  {
    src: aboutOrnaments.group,
    className: "bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]",
    delay: 0.3,
    x: 80,
  },
];

const statement =
  "YouLink is a collaborative creative and marketing platform focused on helping brands grow with strategy, creativity, and consistency. We don't just create content or run ads — we build brands from the ground up. Let's build something recognisable together.";

export const AboutSection = () => (
  <section
    id="about"
    className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-20 sm:px-8 md:px-10"
  >
    {ornaments.map((ornament) => (
      <FadeIn
        key={ornament.src}
        delay={ornament.delay}
        duration={0.9}
        x={ornament.x}
        y={0}
        className={`pointer-events-none absolute ${ornament.className}`}
      >
        <img src={ornament.src} alt="" aria-hidden="true" className="w-full select-none" />
      </FadeIn>
    ))}

    <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn
          as="h2"
          delay={0}
          y={40}
          className="display-serif text-center"
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
        >
          About us
        </FadeIn>

        <AnimatedText
          text={statement}
          className="max-w-[560px] text-center font-medium leading-relaxed text-mist"
          style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
        />
      </div>

      <FadeIn delay={0.2} y={20}>
        <ContactButton to="/hire">Start a project</ContactButton>
      </FadeIn>
    </div>
  </section>
);

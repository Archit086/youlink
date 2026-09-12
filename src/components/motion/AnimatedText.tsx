import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

/**
 * One character. The invisible copy holds the layout so the absolutely
 * positioned animated copy can fade without reflowing the paragraph.
 */
const Char = ({ char, progress, range }: CharProps) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ opacity: 0 }}>{char}</span>
      <motion.span style={{ position: "absolute", left: 0, top: 0, opacity }}>{char}</motion.span>
    </span>
  );
};

/**
 * Reveals a paragraph character by character, scrubbed by scroll position
 * rather than played on a timer — the reader controls the pace.
 *
 * Characters are inline-blocks, which the line breaker would happily split
 * mid-word, so each word is wrapped in its own nowrap span and only the spaces
 * between words are breakable. The real text is exposed to assistive tech in
 * one piece; the animated glyphs are hidden from it.
 */
export const AnimatedText = ({ text, className, style }: AnimatedTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const total = text.length;
  const words = text.split(" ");
  let cursor = 0;

  return (
    <p ref={ref} className={className} style={style}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => {
          const start = cursor;
          cursor += word.length + 1; // the word, plus the space that followed it

          return (
            <span key={wordIndex}>
              <span style={{ whiteSpace: "nowrap" }}>
                {Array.from(word).map((char, charIndex) => {
                  const position = start + charIndex;
                  return (
                    <Char
                      key={charIndex}
                      char={char}
                      progress={scrollYProgress}
                      range={[position / total, (position + 1) / total]}
                    />
                  );
                })}
              </span>
              {wordIndex < words.length - 1 && " "}
            </span>
          );
        })}
      </span>
    </p>
  );
};

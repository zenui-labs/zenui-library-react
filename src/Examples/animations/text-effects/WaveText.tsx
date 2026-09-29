import {motion, type Variants} from "framer-motion";

export interface WaveTextProps {
    text: string;
    /** How far each letter rises, in pixels. */
    amplitude?: number;
    /** Seconds between one letter and the next. */
    stagger?: number;
    /** Seconds each letter takes to rise and fall. */
    duration?: number;
    className?: string;
}

const waveAnimation: Variants = {
    hidden: {},
    visible: {},
};

// Letters rise and fall one after another, so a single wave runs through the text.
export const WaveText = ({text, amplitude = 12, stagger = 0.05, duration = 0.5, className = ""}: WaveTextProps) => {
    const waveLetter: Variants = {
        hidden: {y: 0},
        visible: (i: number) => ({
            y: [0, -amplitude, 0],
            transition: {delay: i * stagger, duration, ease: "easeInOut"},
        }),
    };

    return (
        <motion.div
            className={`text-3xl font-bold text-center dark:text-[#d2e5f5] ${className}`}
            initial="hidden"
            animate="visible"
            variants={waveAnimation}
        >
            <span className="sr-only">{text}</span>
            {Array.from(text).map((char, i) => (
                <motion.span
                    key={i}
                    aria-hidden="true"
                    custom={i}
                    variants={waveLetter}
                    className="inline-block"
                >
                    {char === " " ? " " : char}
                </motion.span>
            ))}
        </motion.div>
    );
};

import {motion, type Variants} from "framer-motion";

export interface FloatingTextProps {
    text: string;
    /** Seconds between one letter and the next. */
    stagger?: number;
    /** Seconds each letter takes to rise and settle. */
    duration?: number;
    className?: string;
}

const floatingText: Variants = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
};

// Letters rise into place and bob a couple of times before they settle.
export const FloatingText = ({text, stagger = 0.06, duration = 1.5, className = ""}: FloatingTextProps) => {
    const floatingChar: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: (i: number) => ({
            opacity: 1,
            y: [20, 0, -10, 0, -5, 0],
            transition: {
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                duration,
                delay: i * stagger,
                ease: "easeInOut",
            },
        }),
    };

    return (
        <motion.div
            variants={floatingText}
            initial="hidden"
            animate="visible"
            className={`text-3xl text-center dark:text-[#d2e5f5] font-bold ${className}`}
        >
            <span className="sr-only">{text}</span>
            {Array.from(text).map((char, i) => (
                <motion.span
                    key={i}
                    aria-hidden="true"
                    custom={i}
                    variants={floatingChar}
                    className="inline-block"
                >
                    {char === " " ? " " : char}
                </motion.span>
            ))}
        </motion.div>
    );
};

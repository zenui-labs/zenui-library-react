import {motion, type Variants} from "framer-motion";

export interface MagneticTextProps {
    text: string;
    /** Seconds between one letter and the next. */
    stagger?: number;
    className?: string;
}

const magneticText: Variants = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
};

// Letters spring up from below the line, overshoot a little and snap back into place.
export const MagneticText = ({text, stagger = 0.04, className = ""}: MagneticTextProps) => {
    const magneticChar: Variants = {
        hidden: {
            opacity: 0,
            y: 100,
        },
        visible: (i: number) => ({
            opacity: 1,
            y: [100, -20, 0],
            transition: {type: "spring", damping: 12, stiffness: 200, delay: i * stagger},
        }),
    };

    return (
        <motion.div
            variants={magneticText}
            initial="hidden"
            animate="visible"
            className={`text-3xl font-bold text-center dark:text-[#d2e5f5] overflow-hidden ${className}`}
        >
            <span className="sr-only">{text}</span>
            {Array.from(text).map((char, i) => (
                <motion.span
                    key={i}
                    aria-hidden="true"
                    custom={i}
                    variants={magneticChar}
                    className="inline-block"
                >
                    {char === " " ? " " : char}
                </motion.span>
            ))}
        </motion.div>
    );
};

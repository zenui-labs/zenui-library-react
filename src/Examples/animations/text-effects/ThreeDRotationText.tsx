import {motion, type Variants} from "framer-motion";

export interface ThreeDRotationTextProps {
    text: string;
    /** Seconds between one letter and the next. */
    stagger?: number;
    /** Seconds each letter takes to rotate into place. */
    duration?: number;
    className?: string;
}

const rotateAnimation: Variants = {
    hidden: {},
    visible: {},
};

// Letters swing forward on the X axis, one after another, until they face the reader.
export const ThreeDRotationText = ({text, stagger = 0.05, duration = 0.6, className = ""}: ThreeDRotationTextProps) => {
    const rotateLetter: Variants = {
        hidden: {
            rotateX: 90,
            opacity: 0,
            transformOrigin: "center",
        },
        visible: (i: number) => ({
            rotateX: 0,
            opacity: 1,
            transition: {delay: i * stagger, duration, ease: "easeInOut"},
        }),
    };

    return (
        <motion.div
            className={`text-3xl font-bold text-center dark:text-[#d2e5f5] ${className}`}
            style={{perspective: "1000px", transformStyle: "preserve-3d"}}
            initial="hidden"
            animate="visible"
            variants={rotateAnimation}
        >
            <span className="sr-only">{text}</span>
            {Array.from(text).map((char, i) => (
                <motion.span
                    key={i}
                    aria-hidden="true"
                    custom={i}
                    variants={rotateLetter}
                    className="inline-block"
                    style={{transformStyle: "preserve-3d"}}
                >
                    {char === " " ? " " : char}
                </motion.span>
            ))}
        </motion.div>
    );
};

import {motion, type Variants} from "framer-motion";

export interface ThreeDTransformTextProps {
    text: string;
    /** Seconds between one letter and the next. */
    stagger?: number;
    className?: string;
}

const transformChar: Variants = {
    hidden: {
        opacity: 0,
        scale: 2,
        rotateX: 180,
        filter: "blur(10px)",
    },
    visible: {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
        transition: {type: "spring", damping: 15, stiffness: 100},
    },
    exit: {
        opacity: 0,
        scale: 5,
        rotateX: -180,
        filter: "blur(10px)",
        transition: {duration: 0.3},
    },
};

// Each letter flips upright from a large, blurred state. Inside AnimatePresence the letters also flip away on exit.
export const ThreeDTransformText = ({text, stagger = 0.08, className = ""}: ThreeDTransformTextProps) => {
    const transformText: Variants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {staggerChildren: stagger},
        },
        exit: {
            opacity: 0,
            transition: {duration: 0.3, staggerChildren: 0.05, staggerDirection: -1},
        },
    };

    return (
        <motion.div
            variants={transformText}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`text-3xl text-center font-bold dark:text-[#d2e5f5] ${className}`}
            style={{perspective: "1000px", transformStyle: "preserve-3d"}}
        >
            <span className="sr-only">{text}</span>
            {Array.from(text).map((char, i) => (
                <motion.span
                    key={i}
                    aria-hidden="true"
                    variants={transformChar}
                    className="inline-block"
                    style={{transformStyle: "preserve-3d"}}
                >
                    {char === " " ? " " : char}
                </motion.span>
            ))}
        </motion.div>
    );
};

import {motion, type Variants} from "framer-motion";

export interface TextRevealProps {
    text: string;
    /** Seconds the wipe takes from left to right. */
    duration?: number;
    className?: string;
}

// Wipes the text in from left to right with a clip path while it fades in.
export const TextReveal = ({text, duration = 2, className = ""}: TextRevealProps) => {
    const textReveal: Variants = {
        hidden: {
            clipPath: "inset(0 100% 0 0)",
            opacity: 0,
        },
        visible: {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            transition: {duration, ease: "easeInOut"},
        },
    };

    return (
        <motion.div
            className={`text-3xl font-bold inline-block text-center dark:text-[#d2e5f5] ${className}`}
            initial="hidden"
            animate="visible"
            variants={textReveal}
        >
            {text}
        </motion.div>
    );
};

import {motion, type Variants} from "framer-motion";

export interface ElasticTextProps {
    text: string;
    /** Spring stiffness. Higher values snap back faster. */
    stiffness?: number;
    /** Spring damping. Lower values bounce more. */
    damping?: number;
    className?: string;
}

// Letters arrive squashed and stretched sideways, then spring back to their normal shape.
export const ElasticText = ({text, stiffness = 300, damping = 9, className = ""}: ElasticTextProps) => {
    const elasticChar: Variants = {
        hidden: {
            opacity: 0,
            x: -20,
            scaleX: 2,
            scaleY: 0.5,
        },
        visible: {
            opacity: 1,
            x: 0,
            scaleX: 1,
            scaleY: 1,
            transition: {type: "spring", damping, stiffness},
        },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className={`text-3xl font-bold text-center dark:text-[#d2e5f5] overflow-hidden ${className}`}
        >
            <span className="sr-only">{text}</span>
            {Array.from(text).map((char, i) => (
                <motion.span
                    key={i}
                    aria-hidden="true"
                    variants={elasticChar}
                    className="inline-block"
                >
                    {char === " " ? " " : char}
                </motion.span>
            ))}
        </motion.div>
    );
};

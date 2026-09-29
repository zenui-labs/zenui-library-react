import {useEffect, useState} from "react";
import {motion, type Variants} from "framer-motion";

const DEFAULT_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

export interface ScrambleTextProps {
    text: string;
    /** Characters shown while a letter is still scrambling. */
    characters?: string;
    /** Number of ticks before every letter settles. */
    iterations?: number;
    /** Milliseconds between ticks. */
    interval?: number;
    className?: string;
}

const scrambleText: Variants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {staggerChildren: 0.03},
    },
};

const elasticChar: Variants = {
    hidden: {
        opacity: 0,
        x: -20,
        scaleX: 1.5,
        scaleY: 0.5,
    },
    visible: {
        opacity: 1,
        x: 0,
        scaleX: 1,
        scaleY: 1,
        transition: {type: "spring", damping: 10, stiffness: 200},
    },
};

// Letters cycle through random characters and lock into the real text one by one.
export const ScrambleText = ({
    text,
    characters = DEFAULT_CHARACTERS,
    iterations = 20,
    interval = 60,
    className = "",
}: ScrambleTextProps) => {
    const [scrambledText, setScrambledText] = useState<string[]>([]);

    useEffect(() => {
        const finalText = Array.from(text);
        const randomCharacter = () => characters[Math.floor(Math.random() * characters.length)];

        setScrambledText(finalText.map(() => " "));

        let tick = 0;

        const timer = setInterval(() => {
            tick++;

            setScrambledText((prev) =>
                prev.map((char, i) => {
                    if (finalText[i] === " ") return " ";
                    if (tick >= iterations) return finalText[i];
                    if (char === finalText[i]) return char;
                    return randomCharacter();
                }),
            );

            // After a short start, one random letter locks into place on every tick.
            if (tick > 5) {
                const randomIndex = Math.floor(Math.random() * finalText.length);
                setScrambledText((prev) => {
                    const updated = [...prev];
                    if (finalText[randomIndex] !== " ") {
                        updated[randomIndex] = finalText[randomIndex];
                    }
                    return updated;
                });
            }

            if (tick >= iterations) {
                clearInterval(timer);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [text, characters, iterations, interval]);

    return (
        <motion.div
            variants={scrambleText}
            initial="hidden"
            animate="visible"
            className={`font-mono text-3xl text-center dark:text-[#d2e5f5] font-bold ${className}`}
        >
            <span className="sr-only">{text}</span>
            {scrambledText.map((char, index) => (
                <motion.span
                    key={index}
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

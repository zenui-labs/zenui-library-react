import {useEffect, useState} from "react";
import {motion} from "framer-motion";

export interface TypewriterTextProps {
    text: string;
    /** Milliseconds between one letter and the next. */
    typingSpeed?: number;
    /** Milliseconds the full text stays on screen before typing starts again. */
    pauseBeforeRestart?: number;
    className?: string;
}

// Types the text one letter at a time behind a blinking cursor, then clears it and starts again.
export const TypewriterText = ({
    text,
    typingSpeed = 100,
    pauseBeforeRestart = 2000,
    className = "",
}: TypewriterTextProps) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let typingTimer: ReturnType<typeof setInterval> | undefined;
        let restartTimer: ReturnType<typeof setTimeout> | undefined;

        const startTyping = () => {
            setDisplayText("");
            let currentIndex = 0;

            typingTimer = setInterval(() => {
                setDisplayText(text.substring(0, currentIndex + 1));
                currentIndex++;

                if (currentIndex >= text.length) {
                    clearInterval(typingTimer);
                    restartTimer = setTimeout(startTyping, pauseBeforeRestart);
                }
            }, typingSpeed);
        };

        startTyping();

        return () => {
            clearInterval(typingTimer);
            clearTimeout(restartTimer);
        };
    }, [text, typingSpeed, pauseBeforeRestart]);

    return (
        <div className={`w-full font-mono text-2xl text-center ${className}`}>
            <span className="sr-only">{text}</span>
            <div className="relative inline" aria-hidden="true">
                <span className="text-3xl font-bold dark:text-[#d2e5f5]">{displayText}</span>
                <motion.span
                    className="inline-block w-[3px] h-7 bg-black dark:bg-white ml-1 align-text-top"
                    animate={{opacity: [1, 0]}}
                    transition={{duration: 0.8, repeat: Infinity, repeatType: "reverse"}}
                />
            </div>
        </div>
    );
};

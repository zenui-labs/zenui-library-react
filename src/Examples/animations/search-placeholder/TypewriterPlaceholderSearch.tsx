import {useEffect, useState} from "react";
import type {ChangeEvent} from "react";
import {motion} from "framer-motion";
import {CiSearch} from "react-icons/ci";

export interface TypewriterPlaceholderSearchProps {
    /** Hints typed out one after another while the input is empty. */
    placeholders: string[];
    /** Current text for a controlled input. */
    value?: string;
    /** Starting text when the input manages its own state. */
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Time in ms between typed characters. */
    typeSpeed?: number;
    /** Time in ms between deleted characters. */
    deleteSpeed?: number;
    /** Time in ms a fully typed hint stays before it is deleted. */
    pauseDuration?: number;
    /** Accessible name for the input, since the animated placeholder is not read by screen readers. */
    label?: string;
    className?: string;
}

// A search input whose placeholder types itself out, pauses, deletes and moves on to the next hint.
export const TypewriterPlaceholderSearch = ({
    placeholders,
    value,
    defaultValue = "",
    onChange,
    typeSpeed = 100,
    deleteSpeed = 50,
    pauseDuration = 1500,
    label = "Search",
    className = "",
}: TypewriterPlaceholderSearchProps) => {
    const [innerValue, setInnerValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const isControlled = value !== undefined;
    const searchValue = isControlled ? value : innerValue;
    const currentText = placeholders[placeholderIndex % placeholders.length] ?? "";

    // One timer per step: type a character, pause when the hint is complete, delete, then move to the next hint.
    useEffect(() => {
        if (searchValue || placeholders.length === 0) return;
        const isComplete = charIndex >= currentText.length;
        const delay = isDeleting ? deleteSpeed : isComplete ? typeSpeed + pauseDuration : typeSpeed;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (isComplete) setIsDeleting(true);
                else setCharIndex((prev) => prev + 1);
            } else if (charIndex > 0) {
                setCharIndex((prev) => prev - 1);
            } else {
                setIsDeleting(false);
                setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
            }
        }, delay);
        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, currentText, searchValue, placeholders.length, typeSpeed, deleteSpeed, pauseDuration]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) setInnerValue(event.target.value);
        onChange?.(event.target.value);
    };

    return (
        <div className={`relative w-full rounded-lg border border-gray-300 dark:border-slate-700 lg:w-[85%] ${className}`}>
            <CiSearch
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[1.5rem] text-gray-400 dark:text-slate-500"
            />

            <input
                type="text"
                aria-label={label}
                value={searchValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleChange}
                className="w-full rounded-lg border border-transparent py-3.5 pl-12 pr-3 outline-none focus:border-[#0FABCA] dark:bg-transparent dark:text-[#d2e5f5]"
            />

            {!searchValue && !isFocused && (
                <div aria-hidden="true" className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2">
                    <span className="text-gray-400 dark:text-slate-500">{currentText.slice(0, charIndex)}</span>
                    <motion.span
                        animate={{opacity: [1, 0]}}
                        transition={{duration: 0.8, repeat: Infinity}}
                        className="ml-1 text-gray-400 dark:text-slate-400"
                    >
                        |
                    </motion.span>
                </div>
            )}
        </div>
    );
};

import {useEffect, useState} from "react";
import type {ChangeEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {CiSearch} from "react-icons/ci";

export interface FadeInPlaceholderSearchProps {
    /** Hints shown one after another while the input is empty and not focused. */
    placeholders: string[];
    /** Current text for a controlled input. */
    value?: string;
    /** Starting text when the input manages its own state. */
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Time in ms each placeholder stays before the next one fades in. */
    interval?: number;
    /** Accessible name for the input, since the animated placeholder is not read by screen readers. */
    label?: string;
    className?: string;
}

// A search input whose placeholder fades up to the next hint every few seconds.
export const FadeInPlaceholderSearch = ({
    placeholders,
    value,
    defaultValue = "",
    onChange,
    interval = 2000,
    label = "Search",
    className = "",
}: FadeInPlaceholderSearchProps) => {
    const [innerValue, setInnerValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);
    const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

    const isControlled = value !== undefined;
    const searchValue = isControlled ? value : innerValue;

    // Cycles only while the hint is visible, so it resumes from the same hint after a blur.
    useEffect(() => {
        if (isFocused || searchValue !== "" || placeholders.length < 2) return;
        const timer = setInterval(() => {
            setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
        }, interval);
        return () => clearInterval(timer);
    }, [isFocused, searchValue, placeholders.length, interval]);

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
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentPlaceholder}
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            transition={{duration: 0.5}}
                            className="text-lg text-gray-400 dark:text-slate-500"
                        >
                            {placeholders[currentPlaceholder % placeholders.length]}
                        </motion.span>
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

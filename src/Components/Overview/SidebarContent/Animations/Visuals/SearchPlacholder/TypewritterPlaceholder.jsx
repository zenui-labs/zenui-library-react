import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {CiSearch} from "react-icons/ci";

const TypewritterPlaceholder = () => {
    const [searchValue, setSearchValue] = useState('');
    const [placeholderText, setPlaceholderText] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isFoucsed, setIsFocused] = useState(false);

    const placeholders = ["Search restaurants...", "Find adventures...", "Discover products...", "Look up songs..."];

    useEffect(() => {
        if (searchValue) return;
        const currentText = placeholders[placeholderIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (charIndex < currentText.length) {
                    setPlaceholderText(currentText.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), 1500);
                }
            } else {
                if (charIndex > 0) {
                    setPlaceholderText(currentText.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                } else {
                    setIsDeleting(false);
                    setPlaceholderIndex((placeholderIndex + 1) % placeholders.length);
                }
            }
        }, isDeleting ? 50 : 100);
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, placeholderIndex, searchValue, placeholders]);

    return (
        <div className="relative w-full 1024px:w-[85%] border dark:border-slate-700 border-gray-300 rounded-lg">
            <CiSearch
                className="absolute left-4 top-1/2 dark:text-slate-500 transform -translate-y-1/2 text-gray-400 text-[1.5rem]"/>

            <input
                type="text"
                value={searchValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full py-3.5 focus:border-brandColor dark:text-darkTextColor dark:bg-transparent rounded-lg border border-transparent outline-none pr-3 pl-12"
            />
            {!searchValue && !isFoucsed && (
                <div className="absolute left-12 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <span className="text-gray-400 dark:text-slate-500">{placeholderText}</span>
                    <motion.span
                        animate={{opacity: [1, 0]}}
                        transition={{duration: 0.8, repeat: Infinity}}
                        className="text-gray-400 dark:text-slate-400 ml-1"
                    >
                        |
                    </motion.span>
                </div>
            )}
        </div>
    );
}

export default TypewritterPlaceholder;
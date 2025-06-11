import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {CiSearch} from "react-icons/ci";

const FlipPlaceholder = () => {
    const [isFoucsed, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
    const placeholders = ["Search recipes...", "Find movies...", "Discover music...", "Look up books..."];

    useEffect(() => {
        if (!searchValue) {
            const interval = setInterval(() => {
                setCurrentPlaceholder(prev => (prev + 1) % placeholders.length);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [searchValue, placeholders.length]);

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
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentPlaceholder}
                            initial={{rotateX: 90, opacity: 0}}
                            animate={{rotateX: 0, opacity: 1}}
                            exit={{rotateX: -90, opacity: 0}}
                            transition={{duration: 0.6}}
                            className="text-gray-400 dark:text-slate-500 block"
                        >
                            {placeholders[currentPlaceholder]}
                        </motion.span>
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

export default FlipPlaceholder;
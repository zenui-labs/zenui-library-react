import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {CiSearch} from "react-icons/ci";

const FadeInPlaceholder = () => {
    const [isFoucsed, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

    const placeholders = [
        "Search for recipes...",
        "Find your favorite movies...",
        "Discover new music...",
        "Look up travel destinations...",
        "Explore coding tutorials...",
        "Search for books...",
        "Find workout routines...",
        "Discover art inspiration...",
        "Look for investment tips...",
        "Search programming languages..."
    ];

    useEffect(() => {
        if (!isFoucsed && searchValue === '') {
            const interval = setInterval(() => {
                setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isFoucsed, searchValue, placeholders.length]);

    return (
        <div className="relative w-full 1024px:w-[85%] border dark:border-slate-700 border-gray-300 rounded-lg">
            <CiSearch
                className="absolute left-4 top-1/2 transform dark:text-slate-500 -translate-y-1/2 text-gray-400 text-[1.5rem]"/>

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
                        {!searchValue && (
                            <motion.span
                                key={currentPlaceholder}
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -10}}
                                transition={{duration: 0.5}}
                                className="text-gray-400 dark:text-slate-500 text-lg"
                            >
                                {placeholders[currentPlaceholder]}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

export default FadeInPlaceholder;
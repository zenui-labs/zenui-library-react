export const FadeInPlaceholderCodes = [
    {
        id: "app",
        displayText: "App.jsx",
        language: "jsx",
        code: 'import React, {useState} from "react";\n' +
            'import SearchInput from "./SearchInput.jsx";\n' +
            '\n' +
            'const App = () => {\n' +
            '    const [searchValue, setSearchValue] = useState("");\n' +
            '    const placeholders = [\n' +
            '        "Search for recipes...",\n' +
            '        "Find your favorite movies...",\n' +
            '        "Discover new music...",\n' +
            '        "Look up travel destinations...",\n' +
            '        "Explore coding tutorials...",\n' +
            '        "Search for books...",\n' +
            '        "Find workout routines...",\n' +
            '        "Discover art inspiration...",\n' +
            '        "Look for investment tips...",\n' +
            '        "Search programming languages..."\n' +
            '    ];\n' +
            '\n' +
            '    return (\n' +
            '        <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} placeholders={placeholders}/>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default App;\n'
    },
    {
        id: "search-input",
        displayText: "SearchInput.jsx",
        language: "jsx",
        code: 'import {useEffect, useState} from "react";\n' +
            '\n' +
            '// framer motion\n' +
            'import {AnimatePresence, motion} from "framer-motion";\n' +
            '\n' +
            '// react icons\n' +
            'import {CiSearch} from "react-icons/ci";\n' +
            '\n' +
            'const SearchInput = ({placeholders, searchValue, setSearchValue}) => {\n' +
            '    const [isFoucsed, setIsFocused] = useState(false);\n' +
            '    const [currentPlaceholder, setCurrentPlaceholder] = useState(0);\n' +
            '    \n' +
            '    useEffect(() => {\n' +
            '        if (!isFoucsed && searchValue === "") {\n' +
            '            const interval = setInterval(() => {\n' +
            '                setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);\n' +
            '            }, 2000);\n' +
            '            return () => clearInterval(interval);\n' +
            '        }\n' +
            '    }, [isFoucsed, searchValue, placeholders.length]);\n' +
            '\n' +
            '    return (\n' +
            '        <div className="relative w-full lg:w-[85%] border dark:border-slate-700 border-gray-300 rounded-lg">\n' +
            '            <CiSearch\n' +
            '                className="absolute left-4 top-1/2 transform dark:text-slate-500 -translate-y-1/2 text-gray-400 text-[1.5rem]"/>\n' +
            '\n' +
            '            <input\n' +
            '                type="text"\n' +
            '                value={searchValue}\n' +
            '                onFocus={() => setIsFocused(true)}\n' +
            '                onBlur={() => setIsFocused(false)}\n' +
            '                onChange={(e) => setSearchValue(e.target.value)}\n' +
            '                className="w-full py-3.5 focus:border-[#0FABCA] dark:text-[#334155] dark:bg-transparent rounded-lg border border-transparent outline-none pr-3 pl-12"\n' +
            '            />\n' +
            '            {!searchValue && !isFoucsed && (\n' +
            '                <div className="absolute left-12 top-1/2 transform -translate-y-1/2 pointer-events-none">\n' +
            '                    <AnimatePresence mode="wait">\n' +
            '                        {!searchValue && (\n' +
            '                            <motion.span\n' +
            '                                key={currentPlaceholder}\n' +
            '                                initial={{opacity: 0, y: 10}}\n' +
            '                                animate={{opacity: 1, y: 0}}\n' +
            '                                exit={{opacity: 0, y: -10}}\n' +
            '                                transition={{duration: 0.5}}\n' +
            '                                className="text-gray-400 dark:text-slate-500 text-lg"\n' +
            '                            >\n' +
            '                                {placeholders[currentPlaceholder]}\n' +
            '                            </motion.span>\n' +
            '                        )}\n' +
            '                    </AnimatePresence>\n' +
            '                </div>\n' +
            '            )}\n' +
            '        </div>\n' +
            '    );\n' +
            '}\n' +
            '\n' +
            'export default SearchInput;'
    },
]

export const FlipPlaceholderCodes = [
    {
        id: "app",
        displayText: "App.jsx",
        language: "jsx",
        code: 'import React, {useState} from "react";\n' +
            'import SearchInput from "./SearchInput.jsx";\n' +
            '\n' +
            'const App = () => {\n' +
            '    const [searchValue, setSearchValue] = useState("");\n' +
            '    const placeholders = [\n' +
            '        "Search for recipes...",\n' +
            '        "Find your favorite movies...",\n' +
            '        "Discover new music...",\n' +
            '        "Look up travel destinations...",\n' +
            '        "Explore coding tutorials...",\n' +
            '        "Search for books...",\n' +
            '        "Find workout routines...",\n' +
            '        "Discover art inspiration...",\n' +
            '        "Look for investment tips...",\n' +
            '        "Search programming languages..."\n' +
            '    ];\n' +
            '\n' +
            '    return (\n' +
            '        <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} placeholders={placeholders}/>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default App;\n'
    },
    {
        id: "search-input",
        displayText: "SearchInput.jsx",
        language: "jsx",
        code: 'import {useEffect, useState} from "react";\n' +
            '\n' +
            '// framer motion\n' +
            'import {AnimatePresence, motion} from "framer-motion";\n' +
            '\n' +
            '// react icons\n' +
            'import {CiSearch} from "react-icons/ci";\n' +
            '\n' +
            'const SearchInput = ({placeholders, searchValue, setSearchValue}) => {\n' +
            '    const [isFoucsed, setIsFocused] = useState(false);\n' +
            '    const [currentPlaceholder, setCurrentPlaceholder] = useState(0);\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        if (!searchValue) {\n' +
            '            const interval = setInterval(() => {\n' +
            '                setCurrentPlaceholder(prev => (prev + 1) % placeholders.length);\n' +
            '            }, 2000);\n' +
            '            return () => clearInterval(interval);\n' +
            '        }\n' +
            '    }, [searchValue, placeholders.length]);\n' +
            '\n' +
            '    return (\n' +
            '        <div className="relative w-full lg:w-[85%] border dark:border-slate-700 border-gray-300 rounded-lg">\n' +
            '            <CiSearch\n' +
            '                className="absolute left-4 top-1/2 dark:text-slate-500 transform -translate-y-1/2 text-gray-400 text-[1.5rem]"/>\n' +
            '\n' +
            '            <input\n' +
            '                type="text"\n' +
            '                value={searchValue}\n' +
            '                onFocus={() => setIsFocused(true)}\n' +
            '                onBlur={() => setIsFocused(false)}\n' +
            '                onChange={(e) => setSearchValue(e.target.value)}\n' +
            '                className="w-full py-3.5 focus:border-[#0FABCA] dark:text-[#334155] dark:bg-transparent rounded-lg border border-transparent outline-none pr-3 pl-12"\n' +
            '            />\n' +
            '            {!searchValue && !isFoucsed && (\n' +
            '                <div className="absolute left-12 top-1/2 transform -translate-y-1/2 pointer-events-none">\n' +
            '                    <AnimatePresence mode="wait">\n' +
            '                        <motion.span\n' +
            '                            key={currentPlaceholder}\n' +
            '                            initial={{rotateX: 90, opacity: 0}}\n' +
            '                            animate={{rotateX: 0, opacity: 1}}\n' +
            '                            exit={{rotateX: -90, opacity: 0}}\n' +
            '                            transition={{duration: 0.6}}\n' +
            '                            className="text-gray-400 dark:text-slate-500 block"\n' +
            '                        >\n' +
            '                            {placeholders[currentPlaceholder]}\n' +
            '                        </motion.span>\n' +
            '                    </AnimatePresence>\n' +
            '                </div>\n' +
            '            )}\n' +
            '        </div>\n' +
            '    );\n' +
            '}\n' +
            '\n' +
            'export default SearchInput;'
    },
]

export const SlideInOutPlaceholderCodes = [
    {
        id: "app",
        displayText: "App.jsx",
        language: "jsx",
        code: 'import React, {useState} from "react";\n' +
            'import SearchInput from "./SearchInput.jsx";\n' +
            '\n' +
            'const App = () => {\n' +
            '    const [searchValue, setSearchValue] = useState("");\n' +
            '    const placeholders = [\n' +
            '        "Search for recipes...",\n' +
            '        "Find your favorite movies...",\n' +
            '        "Discover new music...",\n' +
            '        "Look up travel destinations...",\n' +
            '        "Explore coding tutorials...",\n' +
            '        "Search for books...",\n' +
            '        "Find workout routines...",\n' +
            '        "Discover art inspiration...",\n' +
            '        "Look for investment tips...",\n' +
            '        "Search programming languages..."\n' +
            '    ];\n' +
            '\n' +
            '    return (\n' +
            '        <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} placeholders={placeholders}/>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default App;\n'
    },
    {
        id: "search-input",
        displayText: "SearchInput.jsx",
        language: "jsx",
        code: 'import {useEffect, useState} from "react";\n' +
            '\n' +
            '// framer motion\n' +
            'import {AnimatePresence, motion} from "framer-motion";\n' +
            '\n' +
            '// react-icons\n' +
            'import {CiSearch} from "react-icons/ci";\n' +
            '\n' +
            'const SearchInput = ({placeholders, searchValue, setSearchValue}) => {\n' +
            '    const [isFoucsed, setIsFocused] = useState(false);\n' +
            '    const [currentPlaceholder, setCurrentPlaceholder] = useState(0);\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        if (!searchValue) {\n' +
            '            const interval = setInterval(() => {\n' +
            '                setCurrentPlaceholder(prev => (prev + 1) % placeholders.length);\n' +
            '            }, 2500);\n' +
            '            return () => clearInterval(interval);\n' +
            '        }\n' +
            '    }, [searchValue, placeholders.length]);\n' +
            '\n' +
            '    return (\n' +
            '        <div className="relative w-full lg:w-[85%] border dark:border-slate-700 border-gray-300 rounded-lg">\n' +
            '            <CiSearch\n' +
            '                className="absolute left-4 top-1/2 dark:text-slate-500 transform -translate-y-1/2 text-gray-400 text-[1.5rem]"/>\n' +
            '\n' +
            '            <input\n' +
            '                type="text"\n' +
            '                value={searchValue}\n' +
            '                onFocus={() => setIsFocused(true)}\n' +
            '                onBlur={() => setIsFocused(false)}\n' +
            '                onChange={(e) => setSearchValue(e.target.value)}\n' +
            '                className="w-full py-3.5 focus:border-[#0FABCA] dark:text-[#334155] dark:bg-transparent rounded-lg border border-transparent outline-none pr-3 pl-12"\n' +
            '            />\n' +
            '            {!searchValue && !isFoucsed && (\n' +
            '                <div\n' +
            '                    className="absolute left-12 top-1/2 transform overflow-hidden -translate-y-1/2 pointer-events-none">\n' +
            '                    <AnimatePresence mode="wait">\n' +
            '                        <motion.span\n' +
            '                            key={currentPlaceholder}\n' +
            '                            initial={{x: 300, opacity: 0}}\n' +
            '                            animate={{x: 0, opacity: 1}}\n' +
            '                            exit={{x: -300, opacity: 0}}\n' +
            '                            transition={{duration: 0.5, ease: "easeOut"}}\n' +
            '                            className="text-gray-400 dark:text-slate-500 block whitespace-nowrap"\n' +
            '                        >\n' +
            '                            {placeholders[currentPlaceholder]}\n' +
            '                        </motion.span>\n' +
            '                    </AnimatePresence>\n' +
            '                </div>\n' +
            '            )}\n' +
            '        </div>\n' +
            '    );\n' +
            '}\n' +
            '\n' +
            'export default SearchInput;'
    },
]

export const TypewriterPlaceholderCodes = [
    {
        id: "app",
        displayText: "App.jsx",
        language: "jsx",
        code: 'import React, {useState} from "react";\n' +
            'import SearchInput from "./SearchInput.jsx";\n' +
            '\n' +
            'const App = () => {\n' +
            '    const [searchValue, setSearchValue] = useState("");\n' +
            '    const placeholders = [\n' +
            '        "Search for recipes...",\n' +
            '        "Find your favorite movies...",\n' +
            '        "Discover new music...",\n' +
            '        "Look up travel destinations...",\n' +
            '        "Explore coding tutorials...",\n' +
            '        "Search for books...",\n' +
            '        "Find workout routines...",\n' +
            '        "Discover art inspiration...",\n' +
            '        "Look for investment tips...",\n' +
            '        "Search programming languages..."\n' +
            '    ];\n' +
            '\n' +
            '    return (\n' +
            '        <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} placeholders={placeholders}/>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default App;\n'
    },
    {
        id: "search-input",
        displayText: "SearchInput.jsx",
        language: "jsx",
        code: 'import {useEffect, useState} from "react";\n' +
            '\n' +
            '// framer motion\n' +
            'import {motion} from "framer-motion";\n' +
            '\n' +
            '// react icons\n' +
            'import {CiSearch} from "react-icons/ci";\n' +
            '\n' +
            'const SearchInput = ({placeholders, searchValue, setSearchValue}) => {\n' +
            '    const [placeholderText, setPlaceholderText] = useState("");\n' +
            '    const [placeholderIndex, setPlaceholderIndex] = useState(0);\n' +
            '    const [charIndex, setCharIndex] = useState(0);\n' +
            '    const [isDeleting, setIsDeleting] = useState(false);\n' +
            '    const [isFoucsed, setIsFocused] = useState(false);\n' +
            '    \n' +
            '    useEffect(() => {\n' +
            '        if (searchValue) return;\n' +
            '        const currentText = placeholders[placeholderIndex];\n' +
            '        const timeout = setTimeout(() => {\n' +
            '            if (!isDeleting) {\n' +
            '                if (charIndex < currentText.length) {\n' +
            '                    setPlaceholderText(currentText.substring(0, charIndex + 1));\n' +
            '                    setCharIndex(charIndex + 1);\n' +
            '                } else {\n' +
            '                    setTimeout(() => setIsDeleting(true), 1500);\n' +
            '                }\n' +
            '            } else {\n' +
            '                if (charIndex > 0) {\n' +
            '                    setPlaceholderText(currentText.substring(0, charIndex - 1));\n' +
            '                    setCharIndex(charIndex - 1);\n' +
            '                } else {\n' +
            '                    setIsDeleting(false);\n' +
            '                    setPlaceholderIndex((placeholderIndex + 1) % placeholders.length);\n' +
            '                }\n' +
            '            }\n' +
            '        }, isDeleting ? 50 : 100);\n' +
            '        return () => clearTimeout(timeout);\n' +
            '    }, [charIndex, isDeleting, placeholderIndex, searchValue, placeholders]);\n' +
            '\n' +
            '    return (\n' +
            '        <div className="relative w-full lg:w-[85%] border dark:border-slate-700 border-gray-300 rounded-lg">\n' +
            '            <CiSearch\n' +
            '                className="absolute left-4 top-1/2 dark:text-slate-500 transform -translate-y-1/2 text-gray-400 text-[1.5rem]"/>\n' +
            '\n' +
            '            <input\n' +
            '                type="text"\n' +
            '                value={searchValue}\n' +
            '                onFocus={() => setIsFocused(true)}\n' +
            '                onBlur={() => setIsFocused(false)}\n' +
            '                onChange={(e) => setSearchValue(e.target.value)}\n' +
            '                className="w-full py-3.5 focus:border-[#0FABCA] dark:text-[#334155] dark:bg-transparent rounded-lg border border-transparent outline-none pr-3 pl-12"\n' +
            '            />\n' +
            '            {!searchValue && !isFoucsed && (\n' +
            '                <div className="absolute left-12 top-1/2 transform -translate-y-1/2 pointer-events-none">\n' +
            '                    <span className="text-gray-400 dark:text-slate-500">{placeholderText}</span>\n' +
            '                    <motion.span\n' +
            '                        animate={{opacity: [1, 0]}}\n' +
            '                        transition={{duration: 0.8, repeat: Infinity}}\n' +
            '                        className="text-gray-400 dark:text-slate-400 ml-1"\n' +
            '                    >\n' +
            '                        |\n' +
            '                    </motion.span>\n' +
            '                </div>\n' +
            '            )}\n' +
            '        </div>\n' +
            '    );\n' +
            '}\n' +
            '\n' +
            'export default SearchInput;'
    },
]
export const BlurStaggeredDropdownCodes = 'import {useState} from "react";\n' +
    '\n' +
    '// framer motion\n' +
    'import {AnimatePresence, motion} from "framer-motion";\n' +
    '\n' +
    '// react icons\n' +
    'import {BsChevronDown} from "react-icons/bs";\n' +
    '\n' +
    'const itemVariants = {\n' +
    '    open: {\n' +
    '        opacity: 1,\n' +
    '        scale: 1,\n' +
    '        filter: "blur(0px)",\n' +
    '        transition: {type: "spring", stiffness: 300, damping: 24}\n' +
    '    },\n' +
    '    closed: {\n' +
    '        opacity: 0,\n' +
    '        scale: 0.3,\n' +
    '        filter: "blur(20px)",\n' +
    '        transition: {duration: 0.2}\n' +
    '    }\n' +
    '};\n' +
    '\n' +
    'const BlurStaggered = () => {\n' +
    '    const [isOpen, setIsOpen] = useState(false);\n' +
    '\n' +
    '    const options = [\n' +
    '        "Alice Johnson",\n' +
    '        "Michael Smith",\n' +
    '        "Emily Davis",\n' +
    '        "David Thompson",\n' +
    '        "Sophia Martinez",\n' +
    '        "James Wilson",\n' +
    '        "Olivia Brown",\n' +
    '    ];\n' +
    '\n' +
    '\n' +
    '    return (\n' +
    '        <div\n' +
    '            className="w-full md:w-[70%] mx-auto"\n' +
    '        >\n' +
    '            <motion.button\n' +
    '                whileTap={{scale: 0.97}}\n' +
    '                onClick={() => setIsOpen(!isOpen)}\n' +
    '                className="border dark:bg-slate-900 dark:border-slate-700 dark:text-[#d2e5f5] bg-white border-[#e5eaf2] px-6 py-2 w-full rounded-md flex items-center gap-2 justify-between"\n' +
    '            >\n' +
    '                Menu\n' +
    '                <motion.div\n' +
    '                    variants={{\n' +
    '                        open: {rotate: 180},\n' +
    '                        closed: {rotate: 0}\n' +
    '                    }}\n' +
    '                    transition={{duration: 0.2}}\n' +
    '                    style={{originY: 0.55}}\n' +
    '                >\n' +
    '                    <BsChevronDown/>\n' +
    '                </motion.div>\n' +
    '            </motion.button>\n' +
    '            <AnimatePresence initial={false}>\n' +
    '                {isOpen && (\n' +
    '                    <motion.ul\n' +
    '                        key="dropdown"\n' +
    '                        initial="closed"\n' +
    '                        animate="open"\n' +
    '                        exit="closed"\n' +
    '                        variants={{\n' +
    '                            open: {\n' +
    '                                height: "auto",\n' +
    '                                opacity: 1,\n' +
    '                                transition: {\n' +
    '                                    type: "spring",\n' +
    '                                    bounce: 0,\n' +
    '                                    duration: 0.5,\n' +
    '                                    delayChildren: 0.3,\n' +
    '                                    staggerChildren: 0.1\n' +
    '                                }\n' +
    '                            },\n' +
    '                            closed: {\n' +
    '                                height: 0,\n' +
    '                                opacity: 0,\n' +
    '                                transition: {\n' +
    '                                    duration: 0.3,\n' +
    '                                    staggerDirection: -1,\n' +
    '                                    staggerChildren: 0.06\n' +
    '                                }\n' +
    '                            }\n' +
    '                        }}\n' +
    '                        style={{overflow: "hidden"}}\n' +
    '                        className="bg-white dark:bg-slate-900 rounded-md flex mt-2 flex-col gap-1 shadow-[2px_1px_20px_rgba(0,0,0,0.03)] w-full p-2"\n' +
    '                    >\n' +
    '                        {options.map((item, index) => (\n' +
    '                            <motion.li key={index} variants={itemVariants}\n' +
    '                                       className="text-[1rem] font-normal py-2 px-3 rounded-md cursor-pointer hover:bg-gray-50 dark:text-[#d2e5f5] dark:hover:bg-slate-800">\n' +
    '                                {item}\n' +
    '                            </motion.li>\n' +
    '                        ))}\n' +
    '                    </motion.ul>\n' +
    '                )}\n' +
    '            </AnimatePresence>\n' +
    '\n' +
    '        </div>\n' +
    '    );\n' +
    '}\n' +
    '\n' +
    'export default BlurStaggered;'

export const YAxisStaggeredDropdownCodes = 'import {useState} from "react";\n' +
    '\n' +
    '// framer motion\n' +
    'import {AnimatePresence, motion} from "framer-motion";\n' +
    '\n' +
    '// react icons\n' +
    'import {BsChevronDown} from "react-icons/bs";\n' +
    '\n' +
    'const itemVariants = {\n' +
    '    open: (i) => ({\n' +
    '        opacity: 1,\n' +
    '        y: 0,\n' +
    '        transition: {\n' +
    '            type: "spring",\n' +
    '            stiffness: 300,\n' +
    '            damping: 20,\n' +
    '            delay: i * 0.05\n' +
    '        }\n' +
    '    }),\n' +
    '    closed: {\n' +
    '        opacity: 0,\n' +
    '        y: -20,\n' +
    '        transition: {duration: 0.15}\n' +
    '    }\n' +
    '};\n' +
    '\n' +
    'const YAxisStaggeredDropdown = () => {\n' +
    '    const [isOpen, setIsOpen] = useState(false);\n' +
    '\n' +
    '    const options = [\n' +
    '        "Alice Johnson",\n' +
    '        "Michael Smith",\n' +
    '        "Emily Davis",\n' +
    '        "David Thompson",\n' +
    '        "Sophia Martinez",\n' +
    '        "James Wilson",\n' +
    '        "Olivia Brown",\n' +
    '    ];\n' +
    '\n' +
    '\n' +
    '    return (\n' +
    '        <div\n' +
    '            className="w-full md:w-[70%] mx-auto"\n' +
    '        >\n' +
    '            <motion.button\n' +
    '                whileTap={{scale: 0.97}}\n' +
    '                onClick={() => setIsOpen(!isOpen)}\n' +
    '                className="border dark:bg-slate-900 dark:text-[#d2e5f5] dark:border-slate-700 bg-white border-[#e5eaf2] px-6 py-2 w-full rounded-md flex items-center gap-2 justify-between"\n' +
    '            >\n' +
    '                Menu\n' +
    '                <motion.div\n' +
    '                    variants={{\n' +
    '                        open: {rotate: 180},\n' +
    '                        closed: {rotate: 0}\n' +
    '                    }}\n' +
    '                    transition={{duration: 0.2}}\n' +
    '                    style={{originX: 0.55}}\n' +
    '                >\n' +
    '                    <BsChevronDown/>\n' +
    '                </motion.div>\n' +
    '            </motion.button>\n' +
    '            <AnimatePresence initial={false}>\n' +
    '                {isOpen && (\n' +
    '                    <motion.ul\n' +
    '                        key="dropdown"\n' +
    '                        initial="closed"\n' +
    '                        animate="open"\n' +
    '                        exit="closed"\n' +
    '                        variants={{\n' +
    '                            open: {\n' +
    '                                height: "auto",\n' +
    '                                opacity: 1,\n' +
    '                                transition: {\n' +
    '                                    duration: 0.3,\n' +
    '                                    when: "beforeChildren"\n' +
    '                                }\n' +
    '                            },\n' +
    '                            closed: {\n' +
    '                                height: 0,\n' +
    '                                opacity: 0,\n' +
    '                                transition: {\n' +
    '                                    duration: 0.2,\n' +
    '                                    when: "afterChildren"\n' +
    '                                }\n' +
    '                            }\n' +
    '                        }}\n' +
    '                        style={{overflow: "hidden"}}\n' +
    '                        className="bg-white dark:bg-slate-900 rounded-md flex mt-2 flex-col gap-1 shadow-[2px_1px_20px_rgba(0,0,0,0.03)] w-full p-2"\n' +
    '                    >\n' +
    '                        {options.map((item, index) => (\n' +
    '                            <motion.li\n' +
    '                                key={index}\n' +
    '                                custom={index}\n' +
    '                                variants={itemVariants}\n' +
    '                                className="text-[1rem] font-normal py-2 px-3 rounded-md cursor-pointer hover:bg-gray-50 dark:text-[#d2e5f5] dark:hover:bg-slate-800"\n' +
    '                            >\n' +
    '                                {item}\n' +
    '                            </motion.li>\n' +
    '                        ))}\n' +
    '                    </motion.ul>\n' +
    '                )}\n' +
    '            </AnimatePresence>\n' +
    '\n' +
    '        </div>\n' +
    '    );\n' +
    '}\n' +
    '\n' +
    'export default YAxisStaggeredDropdown;\n'
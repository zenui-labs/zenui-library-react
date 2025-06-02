import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {HiChevronDown} from "react-icons/hi";

const accordionItems = [
    {
        id: 1,
        title: "Cloud Computing",
        content: "Cloud computing provides on-demand availability of computer system resources without direct active management by the user. It enables global access to shared pools of configurable resources.",
        color: "from-blue-400 to-cyan-300"
    },
    {
        id: 2,
        title: "Internet of Things",
        content: "IoT describes physical objects with sensors, processing ability, and software that connect and exchange data with other devices over the Internet, enabling seamless integration between physical and digital worlds.",
        color: "from-green-400 to-emerald-300"
    },
    {
        id: 3,
        title: "Augmented Reality",
        content: "Augmented reality overlays digital content onto the real world, enhancing users' perception of their surroundings with computer-generated information across multiple sensory modalities.",
        color: "from-amber-400 to-yellow-300"
    },
    {
        id: 4,
        title: "Bioinformatics",
        content: "Bioinformatics combines biology, computer science, and statistics to analyze and interpret biological data, particularly when dealing with large genomic datasets.",
        color: "from-purple-400 to-pink-300"
    }
];

const TextAccordionWithProgressbarExample = () => {
    const [activeId, setActiveId] = useState(1);

    const toggleAccordion = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <div className="w-full max-w-2xl space-y-3">
            {accordionItems.map((item, index) => (
                <motion.div
                    key={item.id}
                    className="rounded-lg dark:bg-slate-800 dark:border-slate-700 bg-gray-50 border border-gray-200 overflow-hidden"
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: index * 0.1, duration: 0.5}}
                    layout
                >
                    <motion.div
                        className="w-full"
                    >
                        <motion.button
                            className={`${activeId === item.id ? 'text-gray-800 dark:text-darkTextColor' : 'text-gray-600 dark:text-darkTextColor/60'} w-full p-4 text-left font-medium text-lg flex justify-between items-center`}
                            onClick={() => toggleAccordion(item.id)}
                        >
                            <motion.span
                                className="font-bold"
                                animate={{
                                    scale: activeId === item.id ? 1.05 : 1,
                                }}
                                transition={{duration: 0.2}}
                            >
                                {item.title}
                            </motion.span>
                            <motion.div
                                animate={{
                                    rotate: activeId === item.id ? 180 : 0,
                                }}
                                transition={{duration: 0.3}}
                                className="text-2xl"
                            >
                                <HiChevronDown/>
                            </motion.div>
                        </motion.button>
                    </motion.div>

                    <AnimatePresence>
                        {activeId === item.id && (
                            <motion.div
                                className="overflow-hidden dark:bg-slate-800 bg-gray-50"
                                initial={{height: 0}}
                                animate={{height: "auto"}}
                                exit={{height: 0}}
                                transition={{duration: 0.3}}
                            >
                                <div className="px-3 pb-6 dark:text-darkTextColor text-gray-800 relative">
                                    {item.content.split(' ').map((word, wordIndex) => (
                                        <motion.span
                                            key={wordIndex}
                                            className="inline-block mr-1"
                                            initial={{opacity: 0, y: 20}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{
                                                delay: wordIndex * 0.02,
                                                duration: 0.3
                                            }}
                                            exit={{
                                                opacity: 0,
                                                transition: {duration: 0.1}
                                            }}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                    <motion.div
                                        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.color}`}
                                        initial={{width: 0}}
                                        animate={{width: "100%"}}
                                        transition={{duration: 1, delay: 0.3}}
                                        exit={{width: 0, transition: {duration: 0.2}}}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
}

export default TextAccordionWithProgressbarExample;
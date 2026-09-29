import {useId, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {HiChevronDown} from "react-icons/hi";

export interface StaggeredTextAccordionItem {
    id: string;
    title: string;
    /** Body text. Each word animates in on its own. */
    content: string;
    /** Tailwind gradient stops for the progress bar, for example "from-blue-400 to-cyan-300". */
    barGradient: string;
}

export interface StaggeredTextAccordionProps {
    items: StaggeredTextAccordionItem[];
    /** Id of the open item, or null when all are closed (controlled). */
    value?: string | null;
    /** Id of the item that starts open (uncontrolled). Defaults to the first item. */
    defaultValue?: string | null;
    onChange?: (id: string | null) => void;
    className?: string;
}

/** An accordion whose body text appears word by word while a gradient bar fills along the bottom edge. */
export const StaggeredTextAccordion = ({
    items,
    value,
    defaultValue,
    onChange,
    className = "",
}: StaggeredTextAccordionProps) => {
    const baseId = useId();
    const [internal, setInternal] = useState<string | null>(
        defaultValue === undefined ? items[0]?.id ?? null : defaultValue,
    );
    const activeId = value === undefined ? internal : value;

    const toggle = (id: string) => {
        const next = activeId === id ? null : id;
        setInternal(next);
        onChange?.(next);
    };

    return (
        <div className={`w-full max-w-2xl space-y-3 ${className}`}>
            {items.map((item, index) => {
                const isOpen = activeId === item.id;
                const panelId = `${baseId}-panel-${index}`;

                return (
                    <motion.div
                        key={item.id}
                        className="rounded-lg dark:bg-slate-800 dark:border-slate-700 bg-gray-50 border border-gray-200 overflow-hidden"
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: index * 0.1, duration: 0.5}}
                        layout
                    >
                        <div className="w-full">
                            <motion.button
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                className={`${isOpen ? "text-gray-800 dark:text-[#d2e5f5]" : "text-gray-600 dark:text-[#d2e5f5]/60"} w-full p-4 text-left font-medium text-lg flex justify-between items-center`}
                                onClick={() => toggle(item.id)}
                            >
                                <motion.span
                                    className="font-bold"
                                    animate={{
                                        scale: isOpen ? 1.05 : 1,
                                    }}
                                    transition={{duration: 0.2}}
                                >
                                    {item.title}
                                </motion.span>
                                <motion.div
                                    animate={{
                                        rotate: isOpen ? 180 : 0,
                                    }}
                                    transition={{duration: 0.3}}
                                    className="text-2xl"
                                    aria-hidden
                                >
                                    <HiChevronDown/>
                                </motion.div>
                            </motion.button>
                        </div>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    id={panelId}
                                    className="overflow-hidden dark:bg-slate-800 bg-gray-50"
                                    initial={{height: 0}}
                                    animate={{height: "auto"}}
                                    exit={{height: 0}}
                                    transition={{duration: 0.3}}
                                >
                                    <div className="px-3 pb-6 dark:text-[#d2e5f5] text-gray-800 relative">
                                        {item.content.split(" ").map((word, wordIndex) => (
                                            <motion.span
                                                key={wordIndex}
                                                className="inline-block mr-1"
                                                initial={{opacity: 0, y: 20}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{
                                                    delay: wordIndex * 0.02,
                                                    duration: 0.3,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    transition: {duration: 0.1},
                                                }}
                                            >
                                                {word}
                                            </motion.span>
                                        ))}
                                        <motion.div
                                            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.barGradient}`}
                                            initial={{width: 0}}
                                            animate={{width: "100%"}}
                                            transition={{duration: 1, delay: 0.3}}
                                            exit={{width: 0, transition: {duration: 0.2}}}
                                            aria-hidden
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
};

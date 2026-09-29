import {useEffect, useState, type KeyboardEvent} from "react";
import {motion, AnimatePresence, useAnimation} from "framer-motion";

export interface VerticalAccordionItem {
    id: string;
    title: string;
    /** Text shown when the panel is open. */
    description: string;
    imageUrl: string;
    /** Six digit hex color, for example "#3B82F6". Tints the panel while it is closed. */
    accentColor: string;
}

export interface VerticalImageAccordionProps {
    items: VerticalAccordionItem[];
    /** Id of the open panel (controlled). */
    value?: string;
    /** Id of the panel that starts open (uncontrolled). Defaults to the first item. */
    defaultValue?: string;
    onChange?: (id: string) => void;
    primaryActionLabel?: string;
    secondaryActionLabel?: string;
    onPrimaryAction?: (item: VerticalAccordionItem) => void;
    onSecondaryAction?: (item: VerticalAccordionItem) => void;
    /** Height of the open panel in px. */
    expandedHeight?: number;
    /** Height of a closed panel in px. Closed panels grow by 20px on hover. */
    collapsedHeight?: number;
    className?: string;
}

/** A stack of image panels. Clicking a closed panel opens it and closes the one that was open. */
export const VerticalImageAccordion = ({
    items,
    value,
    defaultValue,
    onChange,
    primaryActionLabel = "Learn more",
    secondaryActionLabel = "Book now",
    onPrimaryAction,
    onSecondaryAction,
    expandedHeight = 300,
    collapsedHeight = 80,
    className = "",
}: VerticalImageAccordionProps) => {
    const [internal, setInternal] = useState<string | undefined>(defaultValue ?? items[0]?.id);
    const activeId = value ?? internal;
    const controls = useAnimation();

    useEffect(() => {
        controls.start("visible");
    }, [activeId, controls]);

    const select = (id: string) => {
        if (id === activeId) return;
        setInternal(id);
        onChange?.(id);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, id: string) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            select(id);
        }
    };

    return (
        <div className={`flex flex-col w-full rounded-xl overflow-hidden ${className}`}>
            {items.map((item) => {
                const isExpanded = item.id === activeId;

                return (
                    <motion.div
                        key={item.id}
                        className="relative cursor-pointer overflow-hidden"
                        // Closed panels act as buttons; the open one holds its own action buttons.
                        role={isExpanded ? undefined : "button"}
                        tabIndex={isExpanded ? undefined : 0}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? undefined : item.title}
                        onKeyDown={(event) => handleKeyDown(event, item.id)}
                        animate={{
                            height: isExpanded ? `${expandedHeight}px` : `${collapsedHeight}px`,
                        }}
                        initial={false}
                        transition={{
                            duration: 0.6,
                            type: "spring",
                            stiffness: 70,
                            damping: 15,
                        }}
                        onClick={() => select(item.id)}
                        whileHover={{
                            height: isExpanded ? `${expandedHeight}px` : `${collapsedHeight + 20}px`,
                        }}
                        layout
                    >
                        <motion.img
                            src={item.imageUrl}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            animate={{
                                scale: isExpanded ? 1 : 1.1,
                                opacity: isExpanded ? 1 : 0.8,
                            }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                            }}
                            layout
                        />
                        <motion.div
                            className="absolute inset-0"
                            animate={{
                                background: isExpanded
                                    ? "linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                                    : `linear-gradient(to top, ${item.accentColor}CC, ${item.accentColor}99)`,
                            }}
                            transition={{duration: 0.6}}
                        />

                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                            <motion.div
                                initial="hidden"
                                animate={controls}
                                variants={{
                                    visible: {transition: {staggerChildren: 0.1}},
                                    hidden: {transition: {staggerChildren: 0.05}},
                                }}
                            >
                                <motion.h3
                                    className="text-xl font-bold"
                                    variants={{
                                        visible: {y: 0, opacity: 1},
                                        hidden: {y: -20, opacity: 0},
                                    }}
                                    transition={{duration: 0.4}}
                                    animate={{
                                        fontSize: isExpanded ? "1.875rem" : "1.25rem",
                                        marginBottom: isExpanded ? "0.75rem" : "0",
                                    }}
                                >
                                    {item.title}
                                </motion.h3>

                                <AnimatePresence mode="wait">
                                    {isExpanded && (
                                        <motion.div
                                            variants={{
                                                visible: {
                                                    height: "auto",
                                                    opacity: 1,
                                                    transition: {
                                                        when: "beforeChildren",
                                                        staggerChildren: 0.1,
                                                        delayChildren: 0.2,
                                                    },
                                                },
                                                hidden: {
                                                    height: 0,
                                                    opacity: 0,
                                                    transition: {
                                                        when: "afterChildren",
                                                        staggerChildren: 0.05,
                                                    },
                                                },
                                            }}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                            className="overflow-hidden"
                                        >
                                            <motion.p
                                                variants={{
                                                    visible: {y: 0, opacity: 1},
                                                    hidden: {y: 20, opacity: 0},
                                                }}
                                                className="text-base mb-4"
                                            >
                                                {item.description}
                                            </motion.p>

                                            <motion.div
                                                variants={{
                                                    visible: {y: 0, opacity: 1},
                                                    hidden: {y: 20, opacity: 0},
                                                }}
                                                className="flex space-x-2"
                                            >
                                                <motion.button
                                                    type="button"
                                                    className="px-4 py-2 bg-white text-black rounded-md font-medium"
                                                    onClick={() => onPrimaryAction?.(item)}
                                                >
                                                    {primaryActionLabel}
                                                </motion.button>

                                                <motion.button
                                                    type="button"
                                                    className="px-4 py-2 border border-white text-white rounded-md font-medium"
                                                    whileHover={{
                                                        backgroundColor: "rgba(255,255,255,0.1)",
                                                    }}
                                                    onClick={() => onSecondaryAction?.(item)}
                                                >
                                                    {secondaryActionLabel}
                                                </motion.button>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

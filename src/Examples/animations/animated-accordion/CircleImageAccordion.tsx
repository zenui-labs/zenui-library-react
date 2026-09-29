import {useState, type KeyboardEvent} from "react";
import {motion, AnimatePresence} from "framer-motion";

export interface CircleAccordionItem {
    id: string;
    title: string;
    /** Short text shown inside the open circle. */
    description: string;
    imageUrl: string;
    /** Six digit hex color, for example "#3B82F6". Tints the edge of a closed circle. */
    accentColor: string;
}

export interface CircleImageAccordionProps {
    items: CircleAccordionItem[];
    /** Id of the open circle (controlled). */
    value?: string;
    /** Id of the circle that starts open (uncontrolled). Defaults to the first item. */
    defaultValue?: string;
    onChange?: (id: string) => void;
    actionLabel?: string;
    onAction?: (item: CircleAccordionItem) => void;
    /** Diameter of the open circle in px. */
    expandedSize?: number;
    /** Diameter of a closed circle in px. */
    collapsedSize?: number;
    className?: string;
}

/** Image circles that grow when clicked. Closed circles show their position number. */
export const CircleImageAccordion = ({
    items,
    value,
    defaultValue,
    onChange,
    actionLabel = "View details",
    onAction,
    expandedSize = 300,
    collapsedSize = 80,
    className = "",
}: CircleImageAccordionProps) => {
    const [internal, setInternal] = useState<string | undefined>(defaultValue ?? items[0]?.id);
    const activeId = value ?? internal;

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
        <div className={`relative flex flex-wrap gap-4 py-4 ${className}`}>
            {items.map((item, index) => {
                const isExpanded = item.id === activeId;

                return (
                    <motion.div
                        key={item.id}
                        className="relative cursor-pointer overflow-hidden rounded-full border-4"
                        // Closed circles act as buttons; the open one holds its own action button.
                        role={isExpanded ? undefined : "button"}
                        tabIndex={isExpanded ? undefined : 0}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? undefined : item.title}
                        onKeyDown={(event) => handleKeyDown(event, item.id)}
                        style={{borderColor: isExpanded ? "#fff" : "rgba(209, 213, 219, 0.5)"}}
                        animate={{
                            width: isExpanded ? `${expandedSize}px` : `${collapsedSize}px`,
                            height: isExpanded ? `${expandedSize}px` : `${collapsedSize}px`,
                            zIndex: isExpanded ? 10 : 0,
                            boxShadow: isExpanded ? "0 10px 25px rgba(0,0,0,0.2)" : "0 4px 6px rgba(0,0,0,0.1)",
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 60,
                            damping: 15,
                            mass: 1,
                        }}
                        onClick={() => select(item.id)}
                        whileHover={{
                            scale: isExpanded ? 1 : 1.05,
                            borderColor: "#fff",
                        }}
                        initial={false}
                    >
                        <motion.img
                            src={item.imageUrl}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            animate={{
                                scale: isExpanded ? 1 : 1.2,
                            }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                            }}
                        />
                        <motion.div
                            className="absolute inset-0"
                            animate={{
                                background: isExpanded
                                    ? "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.6) 100%)"
                                    : `radial-gradient(circle, transparent 10%, ${item.accentColor}99 100%)`,
                            }}
                            transition={{duration: 0.6}}
                        />

                        <AnimatePresence mode="wait">
                            {isExpanded ? (
                                <motion.div
                                    key="details"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.3, delay: 0.2}}
                                    className="absolute inset-0 flex flex-col justify-center items-center p-6 text-white text-center"
                                >
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            hidden: {opacity: 0},
                                            visible: {
                                                opacity: 1,
                                                transition: {
                                                    staggerChildren: 0.12,
                                                },
                                            },
                                        }}
                                    >
                                        <motion.h3
                                            variants={{
                                                hidden: {y: 20, opacity: 0},
                                                visible: {y: 0, opacity: 1},
                                            }}
                                            className="text-2xl font-bold mb-3"
                                        >
                                            {item.title}
                                        </motion.h3>

                                        <motion.p
                                            variants={{
                                                hidden: {y: 20, opacity: 0},
                                                visible: {y: 0, opacity: 1},
                                            }}
                                            className="text-sm mb-4"
                                        >
                                            {item.description}
                                        </motion.p>

                                        <motion.button
                                            type="button"
                                            variants={{
                                                hidden: {y: 20, opacity: 0},
                                                visible: {y: 0, opacity: 1},
                                            }}
                                            whileHover={{
                                                scale: 1.05,
                                                backgroundColor: "rgba(255,255,255,0.95)",
                                            }}
                                            whileTap={{scale: 0.95}}
                                            className="px-4 py-2 bg-white text-black rounded-full font-medium mt-2"
                                            onClick={() => onAction?.(item)}
                                        >
                                            {actionLabel}
                                        </motion.button>
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="number"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    className="absolute inset-0 flex items-center justify-center"
                                    aria-hidden
                                >
                                    <motion.span
                                        className="text-white font-bold"
                                        animate={{scale: [0.9, 1, 0.9], opacity: [0.7, 1, 0.7]}}
                                        transition={{repeat: Infinity, duration: 2}}
                                    >
                                        {index + 1}
                                    </motion.span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
};

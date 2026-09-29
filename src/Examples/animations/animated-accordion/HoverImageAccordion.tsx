import {useState} from "react";
import {motion, AnimatePresence, LayoutGroup} from "framer-motion";

export interface HoverAccordionItem {
    id: string;
    title: string;
    /** Text shown when the panel is open. */
    description: string;
    imageUrl: string;
}

export interface HoverImageAccordionProps {
    items: HoverAccordionItem[];
    /** Id of the open panel (controlled). */
    value?: string;
    /** Id of the panel that starts open (uncontrolled). Defaults to the first item. */
    defaultValue?: string;
    onChange?: (id: string) => void;
    actionLabel?: string;
    onAction?: (item: HoverAccordionItem) => void;
    /** Seconds the panels take to resize. */
    duration?: number;
    className?: string;
}

/** Image panels side by side. The panel under the pointer, or with keyboard focus, widens to show its details. */
export const HoverImageAccordion = ({
    items,
    value,
    defaultValue,
    onChange,
    actionLabel = "View details",
    onAction,
    duration = 1.5,
    className = "",
}: HoverImageAccordionProps) => {
    const [internal, setInternal] = useState<string | undefined>(defaultValue ?? items[0]?.id);
    const activeId = value ?? internal;

    const select = (id: string) => {
        if (id === activeId) return;
        setInternal(id);
        onChange?.(id);
    };

    return (
        <div className={`w-full h-[380px] md:h-[450px] ${className}`}>
            <LayoutGroup>
                <div className="flex w-full h-full gap-2">
                    {items.map((item) => {
                        const isExpanded = item.id === activeId;

                        return (
                            <motion.div
                                key={item.id}
                                layout
                                initial={false}
                                onMouseOver={() => select(item.id)}
                                // Focus bubbles up from the action button too, so tabbing opens the right panel.
                                onFocus={() => select(item.id)}
                                tabIndex={0}
                                role="group"
                                aria-label={item.title}
                                className="relative rounded-xl overflow-hidden cursor-pointer flex-shrink-0"
                                animate={{
                                    flex: isExpanded ? 3 : 1,
                                }}
                                transition={{duration, ease: [0.25, 1, 0.5, 1]}}
                            >
                                <motion.img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    animate={{
                                        scale: isExpanded ? 1 : 1.05,
                                        filter: isExpanded ? "brightness(0.9)" : "brightness(0.6)",
                                    }}
                                    transition={{duration: 0.5}}
                                />

                                <motion.div
                                    className="absolute inset-0 flex flex-col justify-end p-5 text-white z-20"
                                    layout="position"
                                    initial={false}
                                >
                                    <motion.h3
                                        layout="position"
                                        className="font-bold text-lg mb-1"
                                        animate={{fontSize: isExpanded ? "1.5rem" : "1.2rem"}}
                                        transition={{duration: 0.3}}
                                    >
                                        {item.title}
                                    </motion.h3>

                                    {isExpanded && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-25% to-50% from-black/30 w-full to-transparent z-[-1]"/>
                                    )}

                                    <AnimatePresence mode="wait" initial={false}>
                                        {isExpanded && (
                                            <motion.div
                                                key="details"
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                variants={{
                                                    visible: {
                                                        transition: {
                                                            staggerChildren: 0.1,
                                                            delayChildren: 0.1,
                                                        },
                                                    },
                                                    hidden: {},
                                                }}
                                                className="relative"
                                            >
                                                <motion.p
                                                    className="text-sm mb-2"
                                                    variants={{
                                                        hidden: {opacity: 0, y: 50},
                                                        visible: {
                                                            opacity: 1,
                                                            y: 0,
                                                            transition: {type: "spring", stiffness: 150, damping: 12},
                                                        },
                                                    }}
                                                    transition={{duration: 0.3}}
                                                >
                                                    {item.description}
                                                </motion.p>

                                                <motion.button
                                                    type="button"
                                                    className="px-4 py-2 mt-3 rounded bg-white text-black text-sm font-semibold"
                                                    variants={{
                                                        hidden: {opacity: 0, y: 50},
                                                        visible: {
                                                            opacity: 1,
                                                            y: 0,
                                                            transition: {type: "spring", stiffness: 150, damping: 12},
                                                        },
                                                    }}
                                                    transition={{duration: 0.3}}
                                                    whileHover={{scale: 1.05}}
                                                    whileTap={{scale: 0.95}}
                                                    onClick={() => onAction?.(item)}
                                                >
                                                    {actionLabel}
                                                </motion.button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </LayoutGroup>
        </div>
    );
};

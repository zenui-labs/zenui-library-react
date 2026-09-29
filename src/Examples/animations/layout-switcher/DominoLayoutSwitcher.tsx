import {useState} from "react";
import {motion, useReducedMotion} from "framer-motion";

export interface LayoutSwitcherItem {
    id: string;
    title: string;
    description: string;
    image: string;
    /** Describe the image when it adds information. Leave empty when the title already says it all. */
    imageAlt?: string;
}

export type LayoutSwitcherView = "list" | "grid";

export interface DominoLayoutSwitcherProps {
    items: LayoutSwitcherItem[];
    /** Current view. Pass it with `onViewChange` to control the switcher. */
    view?: LayoutSwitcherView;
    defaultView?: LayoutSwitcherView;
    onViewChange?: (view: LayoutSwitcherView) => void;
    /** Seconds between one card and the next. */
    stagger?: number;
    gridLabel?: string;
    listLabel?: string;
    className?: string;
}

/** Cards that switch between a list and a grid, flipping over one after another like falling dominoes. */
export const DominoLayoutSwitcher = ({
    items,
    view,
    defaultView = "list",
    onViewChange,
    stagger = 0.15,
    gridLabel = "Switch to grid",
    listLabel = "Switch to list",
    className = "",
}: DominoLayoutSwitcherProps) => {
    const [internalView, setInternalView] = useState<LayoutSwitcherView>(defaultView);
    const isGrid = (view ?? internalView) === "grid";
    const reduceMotion = useReducedMotion();

    const toggleView = () => {
        const next: LayoutSwitcherView = isGrid ? "list" : "grid";
        setInternalView(next);
        onViewChange?.(next);
    };

    return (
        <div className={`w-full ${className}`}>
            <div className="flex justify-end items-end mb-10">
                <button
                    type="button"
                    onClick={toggleView}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    {isGrid ? listLabel : gridLabel}
                </button>
            </div>

            <div className={isGrid ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "space-y-6"}>
                {items.map((item, index) => {
                    // Toward the grid the first card falls first; back to the list the last card leads.
                    const delay = isGrid ? index * stagger : (items.length - index - 1) * stagger;

                    return (
                        <motion.div
                            key={item.id}
                            layout
                            initial={false}
                            animate={
                                reduceMotion
                                    ? {rotateY: 0}
                                    : {
                                          rotateY: [0, isGrid ? 90 : -90, 0],
                                          transition: {
                                              duration: 0.8,
                                              times: [0, 0.5, 1],
                                              delay,
                                          },
                                      }
                            }
                            className="rounded-md bg-gray-100 dark:bg-slate-800 overflow-hidden transform-gpu"
                            style={{transformOrigin: isGrid ? "left center" : "right center"}}
                        >
                            <motion.div
                                layout
                                className={isGrid ? "p-5" : "p-4 flex items-center"}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25,
                                    delay: delay + 0.4,
                                }}
                            >
                                <motion.img
                                    layout
                                    src={item.image}
                                    alt={item.imageAlt ?? ""}
                                    className={`rounded-lg ${isGrid ? "w-full h-[200px] md:h-[280px] mb-5" : "w-24 h-24 mr-4 flex-shrink-0 object-cover"}`}
                                />
                                <div>
                                    <motion.h3
                                        layout
                                        className={`${isGrid ? "text-[1.4rem]" : "text-[1.1rem]"} font-bold text-gray-800 dark:text-[#d2e5f5]`}
                                    >
                                        {item.title}
                                    </motion.h3>
                                    <motion.p layout className="text-gray-500 mt-1 dark:text-[#abc2d3]/80">
                                        {item.description}
                                    </motion.p>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

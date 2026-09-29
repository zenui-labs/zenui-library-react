import {useEffect, useRef, useState} from "react";
import {motion, useAnimationControls, useReducedMotion} from "framer-motion";

export interface LayoutSwitcherItem {
    id: string;
    title: string;
    description: string;
    image: string;
    /** Describe the image when it adds information. Leave empty when the title already says it all. */
    imageAlt?: string;
}

export type LayoutSwitcherView = "list" | "grid";

export interface WaveLayoutSwitcherProps {
    items: LayoutSwitcherItem[];
    /** Current view. Pass it with `onViewChange` to control the switcher. */
    view?: LayoutSwitcherView;
    defaultView?: LayoutSwitcherView;
    onViewChange?: (view: LayoutSwitcherView) => void;
    gridLabel?: string;
    listLabel?: string;
    className?: string;
}

// The grid has three columns from the md breakpoint, so the wave runs row by row, left to right.
const COLUMNS = 3;

const waveDelay = (index: number, isGrid: boolean) =>
    isGrid ? (index % COLUMNS) * 0.1 + Math.floor(index / COLUMNS) * 0.1 : index * 0.1;

/** Cards that switch between a list and a grid, with a wave that ripples across them on every switch. */
export const WaveLayoutSwitcher = ({
    items,
    view,
    defaultView = "list",
    onViewChange,
    gridLabel = "Switch to grid",
    listLabel = "Switch to list",
    className = "",
}: WaveLayoutSwitcherProps) => {
    const [internalView, setInternalView] = useState<LayoutSwitcherView>(defaultView);
    const isGrid = (view ?? internalView) === "grid";
    const controls = useAnimationControls();
    const reduceMotion = useReducedMotion();
    const previousIsGrid = useRef(isGrid);

    // Plays the wave whenever the view changes, but not on the first render.
    useEffect(() => {
        if (previousIsGrid.current === isGrid) return;
        previousIsGrid.current = isGrid;
        if (reduceMotion) return;
        void controls.start((index: number) => ({
            y: [0, -20, 0],
            opacity: [1, 0.5, 1],
            scale: [1, 0.95, 1],
            transition: {
                duration: 0.6,
                times: [0, 0.5, 1],
                delay: waveDelay(index, isGrid),
            },
        }));
    }, [isGrid, controls, reduceMotion]);

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
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        layout
                        custom={index}
                        initial={false}
                        animate={controls}
                        className="rounded-md dark:bg-slate-800 bg-gray-100 overflow-hidden"
                    >
                        <motion.div
                            layout
                            className={isGrid ? "p-5" : "p-4 flex items-center"}
                            transition={{type: "spring", stiffness: 300, damping: 25, delay: waveDelay(index, isGrid) + 0.3}}
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
                                <motion.p layout className="text-gray-500 dark:text-[#abc2d3]/80 mt-1">
                                    {item.description}
                                </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

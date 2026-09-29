import {useId, useRef, useState} from "react";
import type {KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion, type PanInfo} from "framer-motion";

export interface DragScrollTab {
    id: string;
    label: string;
    /** An emoji or any element, shown large above the title of the panel. */
    icon: ReactNode;
    content: ReactNode;
}

export interface DragScrollTabsProps {
    tabs: DragScrollTab[];
    /** Id of the active tab (controlled). */
    value?: string;
    /** Id of the tab that starts active. Defaults to the first tab. */
    defaultValue?: string;
    onChange?: (id: string) => void;
    /** Background of the tab bar. */
    accentColor?: string;
    className?: string;
}

/**
 * Tabs in a single row that you scroll sideways by dragging the bar with the mouse or a finger. The picked
 * tab slides to the center of the bar and its panel animates in.
 */
export const DragScrollTabs = ({
    tabs,
    value,
    defaultValue,
    onChange,
    accentColor = "#0FABCA",
    className = "",
}: DragScrollTabsProps) => {
    const [innerValue, setInnerValue] = useState(defaultValue ?? tabs[0]?.id);
    const activeId = value ?? innerValue;
    const activeIndex = Math.max(0, tabs.findIndex((tab) => tab.id === activeId));
    const activeTab = tabs[activeIndex];
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    // Where the bar is heading. Smooth scrolling makes scrollLeft lag behind, so drag steps add up here.
    const targetScroll = useRef(0);
    const [isDragging, setIsDragging] = useState(false);
    // Set once a press turns into a drag, so letting go over a tab does not also pick it.
    const dragged = useRef(false);
    const baseId = useId();

    const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const next = Math.max(0, Math.min(maxScroll, targetScroll.current - info.delta.x));
        targetScroll.current = next;
        container.scrollLeft = next;
    };

    const scrollToTab = (tabIndex: number) => {
        const container = scrollContainerRef.current;
        const tabElement = tabRefs.current[tabIndex];
        if (!container || !tabElement) return;

        const containerWidth = container.clientWidth;
        const tabLeft = tabElement.offsetLeft;
        const tabWidth = tabElement.offsetWidth;

        const target = tabLeft - containerWidth / 2 + tabWidth / 2;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const clampedScroll = Math.max(0, Math.min(maxScroll, target));

        targetScroll.current = clampedScroll;
        container.scrollTo({left: clampedScroll, behavior: "smooth"});
    };

    const selectTab = (index: number) => {
        const tab = tabs[index];
        if (!tab) return;
        if (value === undefined) setInnerValue(tab.id);
        onChange?.(tab.id);
        scrollToTab(index);
    };

    // Arrow keys, Home and End move between tabs, as in any tab list.
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const last = tabs.length - 1;
        const next =
            e.key === "ArrowRight" ? (activeIndex === last ? 0 : activeIndex + 1)
                : e.key === "ArrowLeft" ? (activeIndex === 0 ? last : activeIndex - 1)
                    : e.key === "Home" ? 0
                        : e.key === "End" ? last
                            : null;
        if (next === null) return;
        e.preventDefault();
        selectTab(next);
        tabRefs.current[next]?.focus({preventScroll: true});
    };

    if (!activeTab) return null;

    return (
        <div className={`max-w-[300px] sm:max-w-[550px] md:max-w-[400px] lg:max-w-[500px] overflow-hidden ${className}`}>
            <div className="relative rounded-[8px] cursor-grab" style={{backgroundColor: accentColor}}>
                <motion.div
                    ref={scrollContainerRef}
                    role="tablist"
                    aria-orientation="horizontal"
                    className="flex overflow-x-hidden scroll-smooth p-2"
                    onKeyDown={handleKeyDown}
                    drag="x"
                    dragConstraints={{left: 0, right: 0}}
                    onPointerDownCapture={() => {
                        dragged.current = false;
                    }}
                    onDragStart={() => {
                        dragged.current = true;
                        setIsDragging(true);
                    }}
                    onDragEnd={() => setIsDragging(false)}
                    onDrag={handleDrag}
                    onClickCapture={(e) => {
                        if (!dragged.current) return;
                        e.preventDefault();
                        e.stopPropagation();
                        dragged.current = false;
                    }}
                    style={{cursor: isDragging ? "grabbing" : "grab"}}
                >
                    {tabs.map((tab, index) => {
                        const selected = index === activeIndex;
                        return (
                            <motion.button
                                key={tab.id}
                                ref={(node) => {
                                    tabRefs.current[index] = node;
                                }}
                                type="button"
                                role="tab"
                                id={`${baseId}-tab-${index}`}
                                aria-selected={selected}
                                aria-controls={`${baseId}-panel`}
                                tabIndex={selected ? 0 : -1}
                                className={`flex-shrink-0 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-100 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                                    selected ? "!bg-white text-black" : "bg-transparent text-white"
                                }`}
                                onClick={() => selectTab(index)}
                                animate={{backgroundColor: selected ? undefined : "transparent"}}
                            >
                                <span className="whitespace-nowrap">{tab.label}</span>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab.id}
                    id={`${baseId}-panel`}
                    role="tabpanel"
                    aria-labelledby={`${baseId}-tab-${activeIndex}`}
                    className="px-8 py-12 flex items-start justify-center"
                    initial={{opacity: 0, x: 50, scale: 0.95}}
                    animate={{opacity: 1, x: 0, scale: 1}}
                    exit={{opacity: 0, x: -50, scale: 0.95}}
                    transition={{duration: 0.4, ease: "easeInOut"}}
                >
                    <div className="text-center">
                        <motion.div
                            aria-hidden
                            className="text-6xl mb-4"
                            initial={{scale: 0, rotate: -180}}
                            animate={{scale: 1, rotate: 0}}
                            transition={{delay: 0.1, type: "spring", stiffness: 200}}
                        >
                            {activeTab.icon}
                        </motion.div>
                        <motion.h2
                            className="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-6"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2}}
                        >
                            {activeTab.label}
                        </motion.h2>
                        <motion.div
                            className="text-gray-600 dark:text-slate-400 text-lg leading-relaxed"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.3}}
                        >
                            {activeTab.content}
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

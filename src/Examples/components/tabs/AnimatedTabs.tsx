import {useEffect, useLayoutEffect, useRef, useState} from "react";
import type {CSSProperties, KeyboardEvent} from "react";

export interface TabItem<T extends string = string> {
    id: T;
    label: string;
}

export interface AnimatedTabsProps<T extends string> {
    tabs: TabItem<T>[];
    /** Selected tab id when controlled. */
    value?: T;
    /** Selected tab id on first render when uncontrolled. Defaults to the first tab. */
    defaultValue?: T;
    onChange?: (id: T) => void;
    /** Accessible name for the tab list. */
    label?: string;
    /** Background of the sliding pill. */
    accentColor?: string;
    /** Background of the track behind the tabs. */
    trackColor?: string;
    /** How long the pill takes to slide, in milliseconds. */
    duration?: number;
    className?: string;
}

/** Tabs on a rounded track with a pill that slides to the selected tab. The pill is sized from the tab it sits under. */
export const AnimatedTabs = <T extends string>({
    tabs,
    value,
    defaultValue,
    onChange,
    label = "Sections",
    accentColor = "#3B9DF8",
    trackColor = "#59bdf738",
    duration = 700,
    className = "",
}: AnimatedTabsProps<T>) => {
    const [internal, setInternal] = useState<T | undefined>(defaultValue ?? tabs[0]?.id);
    const selected = value ?? internal;
    const selectedIndex = tabs.findIndex((tab) => tab.id === selected);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [pill, setPill] = useState({left: 0, width: 0});
    // Stays false for the first frame so the pill appears in place instead of growing from the left edge.
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setReady(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    // Measures the selected tab, and measures again when any tab changes size (fonts loading, a new label, a resize).
    useLayoutEffect(() => {
        const measure = () => {
            const node = tabRefs.current[selectedIndex];
            if (node) setPill({left: node.offsetLeft, width: node.offsetWidth});
        };
        measure();
        const observer = new ResizeObserver(measure);
        tabRefs.current.forEach((node) => node && observer.observe(node));
        return () => observer.disconnect();
    }, [selectedIndex, tabs.length]);

    const select = (index: number, focus = false) => {
        const next = (index + tabs.length) % tabs.length;
        if (value === undefined) setInternal(tabs[next].id);
        onChange?.(tabs[next].id);
        if (focus) tabRefs.current[next]?.focus();
    };

    // Arrow keys, Home and End move between tabs, as in the WAI-ARIA tabs pattern.
    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const keys: Record<string, number> = {ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1};
        if (!(event.key in keys)) return;
        event.preventDefault();
        select(keys[event.key], true);
    };

    return (
        <div
            role="tablist"
            aria-label={label}
            className={`relative flex items-center rounded-full bg-[color:var(--tab-track)] p-1 dark:bg-slate-800 ${className}`}
            style={{"--tab-accent": accentColor, "--tab-track": trackColor} as CSSProperties}
        >
            <span
                aria-hidden
                className="absolute bottom-1 left-0 top-1 rounded-full bg-[color:var(--tab-accent)] transition-[transform,width] motion-reduce:transition-none"
                style={{
                    width: pill.width,
                    transform: `translateX(${pill.left}px)`,
                    transitionDuration: ready ? `${duration}ms` : "0ms",
                    opacity: pill.width ? 1 : 0,
                }}
            />
            {tabs.map((tab, index) => {
                const isSelected = index === selectedIndex;
                return (
                    <button
                        key={tab.id}
                        ref={(node) => {
                            tabRefs.current[index] = node;
                        }}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        tabIndex={isSelected ? 0 : -1}
                        onClick={() => select(index)}
                        onKeyDown={(event) => onKeyDown(event, index)}
                        className={`${
                            isSelected ? "text-[#fff]" : "text-[#424242] dark:text-[#abc2d3]"
                        } relative z-20 cursor-pointer rounded-full border-transparent px-4 py-2 text-[0.9rem] outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-[color:var(--tab-accent)] focus-visible:ring-offset-2 sm:px-6 sm:text-base`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
};

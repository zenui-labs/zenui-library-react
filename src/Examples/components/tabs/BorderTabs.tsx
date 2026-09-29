import {useRef, useState} from "react";
import type {CSSProperties, KeyboardEvent} from "react";

export interface TabItem<T extends string = string> {
    id: T;
    label: string;
}

export interface BorderTabsProps<T extends string> {
    tabs: TabItem<T>[];
    /** Selected tab id when controlled. */
    value?: T;
    /** Selected tab id on first render when uncontrolled. Defaults to the first tab. */
    defaultValue?: T;
    onChange?: (id: T) => void;
    /** Accessible name for the tab list. */
    label?: string;
    /** Color of the borders, the text and the selected background. */
    accentColor?: string;
    className?: string;
}

/** Tabs with a border on every side. The selected tab fills with the accent color. */
export const BorderTabs = <T extends string>({
    tabs,
    value,
    defaultValue,
    onChange,
    label = "Sections",
    accentColor = "#3B9DF8",
    className = "",
}: BorderTabsProps<T>) => {
    const [internal, setInternal] = useState<T | undefined>(defaultValue ?? tabs[0]?.id);
    const selected = value ?? internal;
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

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
            className={`flex flex-wrap items-center gap-5 ${className}`}
            style={{"--tab-accent": accentColor} as CSSProperties}
        >
            {tabs.map((tab, index) => {
                const isSelected = tab.id === selected;
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
                            isSelected ? "bg-[color:var(--tab-accent)] text-[#ffffff]" : "text-[color:var(--tab-accent)]"
                        } cursor-pointer border border-[color:var(--tab-accent)] px-6 py-2 outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-[color:var(--tab-accent)] focus-visible:ring-offset-2`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
};

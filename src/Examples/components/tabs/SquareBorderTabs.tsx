import {useRef, useState} from "react";
import type {KeyboardEvent} from "react";

export interface TabItem<T extends string = string> {
    id: T;
    label: string;
}

export interface SquareBorderTabsProps<T extends string> {
    tabs: TabItem<T>[];
    /** Selected tab id when controlled. */
    value?: T;
    /** Selected tab id on first render when uncontrolled. Defaults to the first tab. */
    defaultValue?: T;
    onChange?: (id: T) => void;
    /** Accessible name for the tab list. */
    label?: string;
    className?: string;
}

/** Folder style tabs. The selected tab is outlined on three sides and opens into the content below. */
export const SquareBorderTabs = <T extends string>({
    tabs,
    value,
    defaultValue,
    onChange,
    label = "Sections",
    className = "",
}: SquareBorderTabsProps<T>) => {
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
            className={`flex flex-wrap items-center ${className}`}
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
                            isSelected
                                ? "rounded-tl rounded-tr border border-b-transparent dark:border-slate-700 dark:border-b-transparent"
                                : "border-b dark:border-slate-700"
                        } cursor-pointer border-[#d1d1d1] px-6 py-2 text-[#424242] outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3B9DF8] dark:text-[#abc2d3]`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
};

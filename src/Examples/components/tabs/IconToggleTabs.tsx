import {useId, useState} from "react";
import type {ComponentType, CSSProperties} from "react";

type IconComponent = ComponentType<{className?: string}>;

export interface IconTabItem<T extends string = string> {
    id: T;
    /** Shown next to the icon while the tab is selected, and always read by screen readers. */
    label: string;
    icon: IconComponent;
    /** Icon shown while the tab is selected. Defaults to `icon`. */
    activeIcon?: IconComponent;
}

export interface IconToggleTabsProps<T extends string> {
    items: IconTabItem<T>[];
    /** Selected id when controlled. Pass `null` for no selection. */
    value?: T | null;
    /** Selected id on first render when uncontrolled. Nothing is selected by default. */
    defaultValue?: T;
    onChange?: (id: T) => void;
    /** Accessible name for the group. */
    label?: string;
    /** Background of the selected tab. */
    accentColor?: string;
    /** Radio group name. Generated when left out. */
    name?: string;
    className?: string;
}

/**
 * Round icon tabs. The selected one widens to show its label on the accent color.
 * Built on native radio inputs, so arrow keys move the selection.
 */
export const IconToggleTabs = <T extends string>({
    items,
    value,
    defaultValue,
    onChange,
    label = "Views",
    accentColor = "#3B9DF8",
    name,
    className = "",
}: IconToggleTabsProps<T>) => {
    const generatedName = useId();
    const [internal, setInternal] = useState<T | null>(defaultValue ?? null);
    const selected = value !== undefined ? value : internal;

    const select = (id: T) => {
        if (value === undefined) setInternal(id);
        onChange?.(id);
    };

    return (
        <div
            role="radiogroup"
            aria-label={label}
            className={`flex flex-wrap items-center justify-center gap-4 ${className}`}
            style={{"--tab-accent": accentColor} as CSSProperties}
        >
            {items.map((item) => {
                const Icon = item.icon;
                const ActiveIcon = item.activeIcon ?? item.icon;
                return (
                    <label
                        key={item.id}
                        className="flex w-14 cursor-pointer items-center justify-center overflow-hidden rounded-[1.6rem] border-2 border-transparent bg-gray-200 py-2.5 pl-3 text-gray-500 shadow transition-all duration-300 ease-in-out has-[:checked]:w-40 has-[:checked]:justify-center has-[:checked]:bg-[color:var(--tab-accent)] has-[:checked]:pl-0 has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[color:var(--tab-accent)] has-[:focus-visible]:ring-offset-2 motion-reduce:transition-none dark:bg-slate-800 dark:text-[#abc2d3] dark:has-[:checked]:bg-[color:var(--tab-accent)] dark:has-[:checked]:text-white dark:has-[:focus-visible]:ring-offset-slate-900"
                    >
                        <span className="flex items-center overflow-hidden">
                            <input
                                type="radio"
                                name={name ?? generatedName}
                                value={item.id}
                                checked={selected === item.id}
                                onChange={() => select(item.id)}
                                className="peer appearance-none"
                            />
                            <span
                                aria-hidden
                                className="relative h-7 w-8 shrink-0 peer-checked:[&_.active]:opacity-100 peer-checked:[&_.default]:opacity-0"
                            >
                                <Icon className="default absolute left-0 top-0 size-[25px] transition-opacity"/>
                                <ActiveIcon className="active absolute left-0 top-0 size-[25px] opacity-0 transition-opacity"/>
                            </span>
                            <span className="ml-1 whitespace-nowrap text-[0.9rem] font-normal tracking-wide text-white opacity-0 transition-all peer-checked:opacity-100">
                                {item.label}
                            </span>
                        </span>
                    </label>
                );
            })}
        </div>
    );
};

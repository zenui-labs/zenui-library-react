import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {motion, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {LuAlignJustify, LuLaptop, LuList, LuMoon, LuStretchVertical, LuSun} from "react-icons/lu";

interface IconOption<T extends string> {
    value: T;
    label: string;
    icon: IconType;
}

interface IconSegmentsProps<T extends string> {
    label: string;
    options: IconOption<T>[];
    value: T;
    onChange: (value: T) => void;
}

// Icon-only segments. Each button carries its own accessible name and shows it as a tooltip on hover and focus.
const IconSegments = <T extends string>({label, options, value, onChange}: IconSegmentsProps<T>) => {
    const id = useId();
    const reduceMotion = useReducedMotion();
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
        if (!step) return;
        event.preventDefault();
        const next = (index + step + options.length) % options.length;
        onChange(options[next].value);
        buttons.current[next]?.focus();
    };

    return (
        <div role="radiogroup" aria-label={label} className="inline-flex gap-0.5 rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 dark:border-white/10 dark:bg-white/[0.03]">
            {options.map((option, index) => {
                const checked = option.value === value;
                const Icon = option.icon;
                return (
                    <button
                        key={option.value}
                        ref={(node) => {
                            buttons.current[index] = node;
                        }}
                        type="button"
                        role="radio"
                        aria-checked={checked}
                        aria-label={option.label}
                        tabIndex={checked ? 0 : -1}
                        onClick={() => onChange(option.value)}
                        onKeyDown={(event) => onKeyDown(event, index)}
                        className={`group relative flex size-8 items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500/70 ${
                            checked ? "text-zinc-900 dark:text-white" : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200"
                        }`}
                    >
                        {checked && (
                            <motion.span
                                layoutId={`${id}-indicator`}
                                className="absolute inset-0 rounded-md bg-white shadow-sm ring-1 ring-zinc-950/[0.06] dark:bg-zinc-700 dark:ring-white/10"
                                transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 550, damping: 40}}
                            />
                        )}
                        <Icon className="relative size-4" aria-hidden/>
                        <span
                            className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-white dark:text-zinc-900"
                            aria-hidden
                        >
                            {option.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

type Theme = "light" | "dark" | "system";
type Density = "compact" | "default" | "comfortable";

const themes: IconOption<Theme>[] = [
    {value: "light", label: "Light", icon: LuSun},
    {value: "dark", label: "Dark", icon: LuMoon},
    {value: "system", label: "Match system", icon: LuLaptop},
];

const densities: IconOption<Density>[] = [
    {value: "compact", label: "Compact", icon: LuAlignJustify},
    {value: "default", label: "Default", icon: LuList},
    {value: "comfortable", label: "Comfortable", icon: LuStretchVertical},
];

const rowHeight: Record<Density, string> = {compact: "h-6", default: "h-8", comfortable: "h-10"};

const inbox = ["Quarterly planning notes", "Design review moved to 3 PM", "Invoice #4821 is ready", "New comment on ENG-482"];

const SettingsIconSegments = () => {
    const [theme, setTheme] = useState<Theme>("system");
    const [density, setDensity] = useState<Density>("default");
    const [systemDark, setSystemDark] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const sync = () => setSystemDark(media.matches);
        sync();
        media.addEventListener("change", sync);
        return () => media.removeEventListener("change", sync);
    }, []);

    const dark = theme === "dark" || (theme === "system" && systemDark);

    return (
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
            <div className="divide-y divide-zinc-100 dark:divide-white/[0.06]">
                <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">Appearance</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{themes.find((option) => option.value === theme)?.label}</p>
                    </div>
                    <IconSegments label="Appearance" options={themes} value={theme} onChange={(next) => setTheme(next)}/>
                </div>
                <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">Row density</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{densities.find((option) => option.value === density)?.label}</p>
                    </div>
                    <IconSegments label="Row density" options={densities} value={density} onChange={(next) => setDensity(next)}/>
                </div>
            </div>

            <div className="rounded-b-2xl border-t border-zinc-100 bg-zinc-50 p-5 dark:border-white/[0.06] dark:bg-black/20">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Preview</p>
                <div className={`rounded-xl border p-2 shadow-sm transition-colors duration-300 ${dark ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-white"}`}>
                    {inbox.map((subject, index) => (
                        <div
                            key={subject}
                            className={`flex items-center gap-2.5 rounded-md px-2 text-xs transition-all duration-300 ${rowHeight[density]} ${
                                index === 0 ? (dark ? "bg-white/[0.06]" : "bg-zinc-100") : ""
                            } ${dark ? "text-zinc-300" : "text-zinc-700"}`}
                        >
                            <span className={`size-1.5 rounded-full ${index < 2 ? "bg-indigo-500" : "bg-transparent"}`}/>
                            <span className="truncate">{subject}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SettingsIconSegments;

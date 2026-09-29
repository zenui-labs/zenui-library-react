import {useId, useState} from "react";
import type {ComponentType} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuX} from "react-icons/lu";

const stars = [
    {top: "22%", left: "18%", size: 3, delay: 0.05},
    {top: "55%", left: "30%", size: 2, delay: 0.12},
    {top: "30%", left: "42%", size: 2, delay: 0.18},
    {top: "68%", left: "14%", size: 2, delay: 0.24},
    {top: "40%", left: "8%", size: 1.5, delay: 0.3},
];

export interface DayNightSwitchProps {
    /** True shows night. Pass it with `onChange` to control the switch. */
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (night: boolean) => void;
    /** Accessible name of the switch. */
    label?: string;
    className?: string;
}

// A day and night switch: the sun rolls across and becomes a moon while stars come out.
export const DayNightSwitch = ({checked, defaultChecked = false, onChange, label = "Night mode", className = ""}: DayNightSwitchProps) => {
    const reduceMotion = useReducedMotion();
    const [innerNight, setInnerNight] = useState(defaultChecked);
    const night = checked ?? innerNight;
    const spring = reduceMotion ? {duration: 0} : {type: "spring" as const, stiffness: 260, damping: 22};

    const toggle = () => {
        const next = !night;
        if (checked === undefined) setInnerNight(next);
        onChange?.(next);
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={night}
            aria-label={label}
            onClick={toggle}
            className={`relative h-12 w-24 overflow-hidden rounded-full shadow-inner ring-1 ring-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:ring-white/10 dark:focus-visible:ring-offset-slate-950 ${className}`}
        >
            <span className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-500"/>
            <motion.span
                className="absolute inset-0 bg-gradient-to-b from-indigo-950 to-slate-800"
                initial={false}
                animate={{opacity: night ? 1 : 0}}
                transition={{duration: 0.4}}
            />

            {/* Clouds drift off to the right at night. */}
            <motion.span
                aria-hidden="true"
                className="absolute bottom-1 right-2 flex items-end"
                initial={false}
                animate={night ? {x: 40, opacity: 0} : {x: 0, opacity: 1}}
                transition={spring}
            >
                <span className="h-4 w-6 rounded-full bg-white"/>
                <span className="-ml-3 h-6 w-6 rounded-full bg-white"/>
                <span className="-ml-2 h-3.5 w-5 rounded-full bg-white/90"/>
            </motion.span>

            {stars.map((star) => (
                <motion.span
                    key={`${star.top}-${star.left}`}
                    aria-hidden="true"
                    className="absolute rounded-full bg-white"
                    style={{top: star.top, left: star.left, width: star.size, height: star.size}}
                    initial={false}
                    animate={night ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0}}
                    transition={reduceMotion ? {duration: 0} : {delay: night ? 0.15 + star.delay : 0, type: "spring", stiffness: 400, damping: 15}}
                />
            ))}

            <motion.span
                aria-hidden="true"
                className="absolute left-1.5 top-1.5 h-9 w-9 overflow-hidden rounded-full shadow-md"
                initial={false}
                animate={{x: night ? 48 : 0, rotate: night ? 360 : 0, backgroundColor: night ? "#e2e8f0" : "#facc15"}}
                transition={spring}
            >
                {/* The crescent shadow slides over the sun to make the moon. */}
                <motion.span
                    className="absolute -right-1 -top-1 h-8 w-8 rounded-full bg-slate-800"
                    initial={false}
                    animate={{x: night ? 0 : 30, y: night ? 0 : -30}}
                    transition={spring}
                />
                <motion.span
                    className="absolute bottom-2 left-2 h-2 w-2 rounded-full bg-slate-300"
                    initial={false}
                    animate={{opacity: night ? 1 : 0}}
                />
            </motion.span>
        </button>
    );
};

export interface SettingSwitchProps {
    label: string;
    /** Short line under the label that explains the setting. */
    hint: string;
    icon: ComponentType<{className?: string}>;
    /** Pass it with `onChange` to control the switch. */
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (on: boolean) => void;
    disabled?: boolean;
    className?: string;
}

// A standard switch row. Render it inside a <ul>. The knob stretches while pressed, like a physical toggle.
export const SettingSwitch = ({
    label,
    hint,
    icon: Icon,
    checked,
    defaultChecked = false,
    onChange,
    disabled = false,
    className = "",
}: SettingSwitchProps) => {
    const reduceMotion = useReducedMotion();
    const [innerOn, setInnerOn] = useState(defaultChecked);
    const [pressed, setPressed] = useState(false);
    const labelId = useId();
    const hintId = useId();
    const on = checked ?? innerOn;

    const toggle = () => {
        const next = !on;
        if (checked === undefined) setInnerOn(next);
        onChange?.(next);
    };

    return (
        <li className={`flex items-center gap-4 py-3.5 ${disabled ? "opacity-60" : ""} ${className}`}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-300" aria-hidden="true">
                <Icon className="h-4 w-4"/>
            </span>
            <span className="min-w-0 flex-1">
                <span id={labelId} className="block text-sm font-medium text-gray-900 dark:text-white">{label}</span>
                <span id={hintId} className="block text-xs text-gray-500 dark:text-slate-400">{hint}</span>
            </span>
            <button
                type="button"
                role="switch"
                aria-checked={on}
                aria-labelledby={labelId}
                aria-describedby={hintId}
                disabled={disabled}
                onClick={toggle}
                onPointerDown={() => setPressed(true)}
                onPointerUp={() => setPressed(false)}
                onPointerLeave={() => setPressed(false)}
                className={`flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:focus-visible:ring-offset-slate-900 ${
                    on ? "justify-end bg-emerald-500" : "justify-start bg-gray-300 dark:bg-slate-600"
                }`}
            >
                {/* Layout animation handles both the slide and the stretch, and keeps the icon undistorted. */}
                <motion.span
                    layout={!reduceMotion}
                    className={`flex h-6 items-center justify-center rounded-full bg-white text-gray-500 shadow ${pressed && !disabled ? "w-[30px]" : "w-6"}`}
                    style={{borderRadius: 9999}}
                    transition={{type: "spring", stiffness: 500, damping: 32}}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            layout={!reduceMotion}
                            key={on ? "on" : "off"}
                            initial={{scale: 0, rotate: -90}}
                            animate={{scale: 1, rotate: 0}}
                            exit={{scale: 0, rotate: 90}}
                            transition={{duration: 0.15}}
                        >
                            {on ? <LuCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true"/> : <LuX className="h-3 w-3" aria-hidden="true"/>}
                        </motion.span>
                    </AnimatePresence>
                </motion.span>
            </button>
        </li>
    );
};

export interface Setting {
    id: string;
    label: string;
    hint: string;
    icon: ComponentType<{className?: string}>;
    /** Starting state of the switch. */
    defaultOn?: boolean;
    disabled?: boolean;
}

export interface ToggleSwitchesProps {
    settings: Setting[];
    /** Text next to the day and night switch. */
    themeLabel?: string;
    defaultNight?: boolean;
    onNightChange?: (night: boolean) => void;
    onSettingChange?: (id: string, on: boolean) => void;
    className?: string;
}

/** A day and night theme switch above a list of settings switches. */
export const ToggleSwitches = ({
    settings,
    themeLabel = "Theme preview",
    defaultNight = false,
    onNightChange,
    onSettingChange,
    className = "",
}: ToggleSwitchesProps) => (
    <div className={`flex w-full max-w-md flex-col items-center gap-8 ${className}`}>
        <div className="flex items-center gap-4">
            <DayNightSwitch defaultChecked={defaultNight} onChange={onNightChange}/>
            <span className="text-sm text-gray-500 dark:text-slate-400">{themeLabel}</span>
        </div>
        <ul className="w-full divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white px-4 dark:divide-slate-800 dark:border-slate-700 dark:bg-slate-900">
            {settings.map((setting) => (
                <SettingSwitch
                    key={setting.id}
                    label={setting.label}
                    hint={setting.hint}
                    icon={setting.icon}
                    defaultChecked={setting.defaultOn}
                    disabled={setting.disabled}
                    onChange={(on) => onSettingChange?.(setting.id, on)}
                />
            ))}
        </ul>
    </div>
);

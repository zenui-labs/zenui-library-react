import {useState} from "react";
import type {ComponentType} from "react";
import {motion, useAnimationControls, useReducedMotion} from "framer-motion";

export interface Device {
    id: string;
    name: string;
    /** Second line under the name, such as the room. */
    room: string;
    icon: ComponentType<{className?: string}>;
    /** Status text while the device is on. */
    onLabel: string;
    /** Status text while the device is off. */
    offLabel: string;
    /** Starting state when the tile is uncontrolled. */
    defaultOn?: boolean;
}

export interface GlassTileProps {
    device: Device;
    /** Pass it with `onToggle` to control the tile. */
    on?: boolean;
    onToggle?: (on: boolean) => void;
    /** Seconds for the light to cross the tile. */
    sweepDuration?: number;
    className?: string;
}

// A band of light sweeps across the glass on hover, on keyboard focus and whenever the tile is toggled.
export const GlassTile = ({device, on: onProp, onToggle, sweepDuration = 0.9, className = ""}: GlassTileProps) => {
    const reduceMotion = useReducedMotion();
    const [internalOn, setInternalOn] = useState(device.defaultOn ?? false);
    const on = onProp ?? internalOn;
    const sweep = useAnimationControls();
    const Icon = device.icon;

    const playSweep = () => {
        if (reduceMotion) return;
        sweep.set({x: "-120%"});
        void sweep.start({x: "120%", transition: {duration: sweepDuration, ease: [0.4, 0, 0.2, 1]}});
    };

    return (
        <motion.button
            type="button"
            aria-pressed={on}
            onClick={() => {
                if (onProp === undefined) setInternalOn(!on);
                onToggle?.(!on);
                playSweep();
            }}
            onPointerEnter={playSweep}
            onFocus={playSweep}
            whileTap={{scale: 0.97}}
            className={`group relative overflow-hidden rounded-3xl border p-4 text-left backdrop-blur-xl transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:p-5 ${
                on
                    ? "border-white/70 bg-white/70 text-gray-900 dark:border-white/25 dark:bg-white/20 dark:text-white"
                    : "border-white/40 bg-white/25 text-gray-800 dark:border-white/10 dark:bg-white/5 dark:text-white/80"
            } ${className}`}
        >
            {/* Top edge highlight, like light catching the rim of the glass. */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80"/>
            <motion.span
                aria-hidden="true"
                initial={{x: "-120%"}}
                animate={sweep}
                style={{skewX: -20}}
                className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/25"
            />

            <span className="relative flex items-start justify-between">
                <motion.span
                    animate={{rotate: on ? 0 : -8, scale: on ? 1 : 0.94}}
                    transition={{type: "spring", stiffness: 400, damping: 20}}
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-colors duration-300 ${
                        on ? "bg-gray-900 text-amber-300 dark:bg-white dark:text-amber-500" : "bg-white/50 text-gray-600 dark:bg-white/10 dark:text-white/60"
                    }`}
                >
                    <Icon className="h-5 w-5" aria-hidden="true"/>
                </motion.span>
                <span
                    aria-hidden="true"
                    className={`relative mt-1 flex h-5 w-9 items-center rounded-full p-0.5 transition-colors duration-300 ${on ? "bg-gray-900 dark:bg-white" : "bg-gray-900/15 dark:bg-white/15"}`}
                >
                    <motion.span
                        layout
                        transition={{type: "spring", stiffness: 600, damping: 34}}
                        className={`h-4 w-4 rounded-full ${on ? "ml-auto bg-white dark:bg-slate-900" : "bg-white dark:bg-white/70"}`}
                    />
                </span>
            </span>
            <span className="relative mt-6 block text-sm font-semibold">{device.name}</span>
            <span className="relative block text-xs opacity-70">{device.room}</span>
            <span className="relative mt-2 block text-xs font-medium">{on ? device.onLabel : device.offLabel}</span>
        </motion.button>
    );
};

export interface GlassSweepTilesProps {
    devices: Device[];
    /** On or off state by device id. Devices left out of it manage their own state. */
    value?: Record<string, boolean>;
    onToggle?: (id: string, on: boolean) => void;
    title?: string;
    /** Small text on the right of the title, such as the active scene. */
    subtitle?: string;
    sweepDuration?: number;
    className?: string;
}

/** A panel of frosted control tiles over a colorful backdrop. */
export const GlassSweepTiles = ({devices, value, onToggle, title = "Home", subtitle, sweepDuration, className = ""}: GlassSweepTilesProps) => (
    <div className={`relative w-full max-w-xl overflow-hidden rounded-[32px] p-4 sm:p-6 ${className}`}>
        {/* Colorful backdrop, so the glass has something to blur. */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-sky-200 via-rose-100 to-amber-100 dark:from-indigo-950 dark:via-slate-900 dark:to-fuchsia-950"/>
        <div aria-hidden="true" className="absolute -left-10 top-6 h-44 w-44 rounded-full bg-sky-400/60 blur-2xl dark:bg-sky-500/40"/>
        <div aria-hidden="true" className="absolute -right-6 bottom-0 h-52 w-52 rounded-full bg-rose-400/60 blur-2xl dark:bg-fuchsia-500/40"/>
        <div aria-hidden="true" className="absolute left-1/3 top-1/3 h-32 w-32 rounded-full bg-amber-300/70 blur-2xl dark:bg-amber-500/30"/>

        <div className="relative">
            <div className="mb-4 flex items-baseline justify-between px-1">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
                {subtitle && <p className="text-xs text-gray-700 dark:text-white/70">{subtitle}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
                {devices.map((device) => (
                    <GlassTile
                        key={device.id}
                        device={device}
                        on={value?.[device.id]}
                        onToggle={onToggle ? (on) => onToggle(device.id, on) : undefined}
                        sweepDuration={sweepDuration}
                    />
                ))}
            </div>
        </div>
    </div>
);

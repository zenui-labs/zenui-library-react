import {useState} from "react";
import {motion, useAnimationControls, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {LuLightbulb, LuLock, LuThermometer, LuWind} from "react-icons/lu";

interface Device {
    id: string;
    name: string;
    room: string;
    icon: IconType;
    on: string;
    off: string;
    initial: boolean;
}

const devices: Device[] = [
    {id: "lights", name: "Ceiling lights", room: "Living room", icon: LuLightbulb, on: "On, 80%", off: "Off", initial: true},
    {id: "heat", name: "Heating", room: "Whole home", icon: LuThermometer, on: "Heating to 21°", off: "Eco, 17°", initial: false},
    {id: "lock", name: "Front door", room: "Entrance", icon: LuLock, on: "Locked", off: "Unlocked", initial: true},
    {id: "air", name: "Air purifier", room: "Bedroom", icon: LuWind, on: "Auto, quiet", off: "Off", initial: false},
];

interface TileProps {
    device: Device;
}

// A band of light sweeps across the glass on hover, on keyboard focus and whenever the tile is toggled.
const Tile = ({device}: TileProps) => {
    const reduceMotion = useReducedMotion();
    const [on, setOn] = useState(device.initial);
    const sweep = useAnimationControls();
    const Icon = device.icon;

    const playSweep = () => {
        if (reduceMotion) return;
        sweep.set({x: "-120%"});
        void sweep.start({x: "120%", transition: {duration: 0.9, ease: [0.4, 0, 0.2, 1]}});
    };

    return (
        <motion.button
            type="button"
            aria-pressed={on}
            onClick={() => {
                setOn((value) => !value);
                playSweep();
            }}
            onPointerEnter={playSweep}
            onFocus={playSweep}
            whileTap={{scale: 0.97}}
            className={`group relative overflow-hidden rounded-3xl border p-4 text-left backdrop-blur-xl transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:p-5 ${
                on
                    ? "border-white/70 bg-white/70 text-gray-900 dark:border-white/25 dark:bg-white/20 dark:text-white"
                    : "border-white/40 bg-white/25 text-gray-800 dark:border-white/10 dark:bg-white/5 dark:text-white/80"
            }`}
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
            <span className="relative mt-2 block text-xs font-medium">{on ? device.on : device.off}</span>
        </motion.button>
    );
};

const GlassSweepTiles = () => (
    <div className="relative w-full max-w-xl overflow-hidden rounded-[32px] p-4 sm:p-6">
        {/* Colorful backdrop, so the glass has something to blur. */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-sky-200 via-rose-100 to-amber-100 dark:from-indigo-950 dark:via-slate-900 dark:to-fuchsia-950"/>
        <div aria-hidden="true" className="absolute -left-10 top-6 h-44 w-44 rounded-full bg-sky-400/60 blur-2xl dark:bg-sky-500/40"/>
        <div aria-hidden="true" className="absolute -right-6 bottom-0 h-52 w-52 rounded-full bg-rose-400/60 blur-2xl dark:bg-fuchsia-500/40"/>
        <div aria-hidden="true" className="absolute left-1/3 top-1/3 h-32 w-32 rounded-full bg-amber-300/70 blur-2xl dark:bg-amber-500/30"/>

        <div className="relative">
            <div className="mb-4 flex items-baseline justify-between px-1">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Home</h3>
                <p className="text-xs text-gray-700 dark:text-white/70">Evening scene</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {devices.map((device) => (
                    <Tile key={device.id} device={device}/>
                ))}
            </div>
        </div>
    </div>
);

export default GlassSweepTiles;

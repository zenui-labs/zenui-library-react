import {useState} from "react";
import type {KeyboardEvent} from "react";
import {motion, MotionConfig} from "framer-motion";
import type {IconType} from "react-icons";
import {LuLayers, LuMic, LuMicOff, LuRadio, LuVideo} from "react-icons/lu";

interface KeycapProps {
    label: string;
    icon: IconType;
    /** Toggle keys stay partly pressed while on. Leave undefined for a plain push key. */
    pressed?: boolean;
    onPress: () => void;
    tone: "neutral" | "red" | "indigo";
    disabled?: boolean;
}

const tones = {
    neutral: {
        top: "bg-gradient-to-b from-white to-gray-100 text-gray-800 dark:from-slate-700 dark:to-slate-800 dark:text-slate-100",
        base: "bg-gray-300 dark:bg-slate-950",
        led: "bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.7)]",
    },
    red: {
        top: "bg-gradient-to-b from-rose-400 to-rose-500 text-white",
        base: "bg-rose-700 dark:bg-rose-900",
        led: "bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]",
    },
    indigo: {
        top: "bg-gradient-to-b from-indigo-400 to-indigo-600 text-white",
        base: "bg-indigo-800 dark:bg-indigo-950",
        led: "bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]",
    },
};

const DEPTH = 8;

// A key with a visible side. The cap travels down on press and springs back up on release.
// Toggle keys rest halfway down while they are on, with a lit indicator.
const Keycap = ({label, icon: Icon, pressed, onPress, tone, disabled = false}: KeycapProps) => {
    const [down, setDown] = useState(false);
    const style = tones[tone];
    const isToggle = pressed !== undefined;
    const travel = disabled ? DEPTH / 2 : down ? DEPTH - 1 : pressed ? DEPTH / 2 : 0;

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if ((event.key === " " || event.key === "Enter") && !event.repeat) setDown(true);
    };

    const handleKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === " " || event.key === "Enter") setDown(false);
    };

    return (
        <button
            type="button"
            aria-pressed={isToggle ? pressed : undefined}
            disabled={disabled}
            onClick={onPress}
            onPointerDown={() => setDown(true)}
            onPointerUp={() => setDown(false)}
            onPointerLeave={() => setDown(false)}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onBlur={() => setDown(false)}
            className="group relative block h-[92px] w-[88px] select-none rounded-2xl focus-visible:outline-none disabled:cursor-not-allowed"
            style={{paddingBottom: DEPTH}}
        >
            {/* The side of the key. */}
            <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 rounded-2xl ${style.base} ${disabled ? "opacity-50" : ""}`} style={{top: DEPTH}}/>
            <motion.span
                initial={false}
                animate={{y: travel}}
                transition={down ? {duration: 0.06} : {type: "spring", stiffness: 600, damping: 18}}
                className={`relative flex h-full w-full flex-col items-start justify-between rounded-2xl p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] ring-offset-2 group-focus-visible:ring-2 group-focus-visible:ring-indigo-500 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] dark:ring-offset-slate-950 ${style.top} ${disabled ? "opacity-50" : ""}`}
            >
                <span className="flex w-full items-center justify-between">
                    <Icon className="h-5 w-5" aria-hidden="true"/>
                    {isToggle && (
                        <motion.span
                            aria-hidden="true"
                            initial={false}
                            animate={{opacity: pressed ? 1 : 0.25, scale: pressed ? 1 : 0.8}}
                            className={`h-1.5 w-1.5 rounded-full ${pressed ? style.led : "bg-current"}`}
                        />
                    )}
                </span>
                <span className="text-left text-[11px] font-semibold leading-tight">{label}</span>
            </motion.span>
        </button>
    );
};

// A small stream deck: two toggle keys, a push key that counts presses and a disabled key.
const KeycapButtons = () => {
    const [muted, setMuted] = useState(false);
    const [recording, setRecording] = useState(true);
    const [scenes, setScenes] = useState(0);

    return (
        <MotionConfig reducedMotion="user">
            <div className="flex flex-col items-center gap-5">
                <div className="grid grid-cols-2 gap-3 rounded-[28px] border border-gray-200 bg-gray-100 p-4 shadow-inner dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-4">
                    <Keycap label={muted ? "Unmute" : "Mute mic"} icon={muted ? LuMicOff : LuMic} pressed={muted} onPress={() => setMuted((value) => !value)} tone="neutral"/>
                    <Keycap label="Record" icon={LuVideo} pressed={recording} onPress={() => setRecording((value) => !value)} tone="red"/>
                    <Keycap label="Next scene" icon={LuLayers} onPress={() => setScenes((value) => value + 1)} tone="indigo"/>
                    <Keycap label="Go live" icon={LuRadio} onPress={() => undefined} tone="neutral" disabled/>
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400" aria-live="polite">
                    Mic {muted ? "muted" : "on"}, {recording ? "recording" : "not recording"}, scene {(scenes % 4) + 1} of 4
                </p>
            </div>
        </MotionConfig>
    );
};

export default KeycapButtons;

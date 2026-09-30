import {useEffect, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {motion, useAnimationControls, useInView, useReducedMotion} from "framer-motion";

export type BreakerPosition = "on" | "off" | "tripped";

export interface Breaker {
    id: string;
    label: string;
    /** Config key, shown in mono under the label. */
    flag: string;
    on: boolean;
    /** Short note shown while the flag is live, e.g. "25% of EU traffic". */
    detail?: string;
    /** Trips the breaker once, this many ms after it is live and on screen. Use it to show a guard kicking in. */
    tripAfter?: number;
    /** Why it tripped, shown on the label. */
    tripReason?: string;
}

export interface BreakerPanelProps {
    breakers: Breaker[];
    /** Text on the riveted plate at the top. */
    title?: string;
    subtitle?: string;
    /** Called with whether a flag is actually live, which also depends on the main breaker. */
    onChange?: (id: string, live: boolean) => void;
    className?: string;
}

const HANDLE = {
    on: {y: 1, rotateX: 32},
    tripped: {y: 10, rotateX: 0},
    off: {y: 19, rotateX: -32},
};

const screwAngles = [24, -52, 71, 8];

const Screw = ({angle, className}: {angle: number; className: string}) => (
    <span aria-hidden="true" className={`absolute h-3 w-3 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f4f4f5,#a1a1aa_55%,#52525b)] shadow-[0_1px_1px_rgba(0,0,0,0.4)] ${className}`}>
        <span className="absolute left-1/2 top-1/2 h-[1.5px] w-2 bg-zinc-600" style={{transform: `translate(-50%, -50%) rotate(${angle}deg)`}}/>
    </span>
);

interface LeverProps {
    position: BreakerPosition;
    reduceMotion: boolean;
    wide?: boolean;
}

// A DIN-rail breaker handle. It slides in its slot and tips on a hinge, so it foreshortens as it throws;
// the stiff, lightly damped spring gives the over-centre snap of the real mechanism.
const Lever = ({position, reduceMotion, wide = false}: LeverProps) => (
    <span
        aria-hidden="true"
        className={`relative flex h-[60px] items-center justify-center rounded-[5px] bg-gradient-to-b from-zinc-700 to-zinc-900 shadow-[0_2px_3px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] dark:from-zinc-800 dark:to-black ${wide ? "w-[88px]" : "w-11"}`}
    >
        <span className="absolute top-[3px] font-mono text-[7px] font-bold tracking-wider text-white/55">ON</span>
        <span className="absolute bottom-[3px] font-mono text-[7px] font-bold tracking-wider text-white/40">OFF</span>
        <span className={`relative h-[38px] rounded-[3px] bg-black shadow-[inset_0_2px_3px_rgba(0,0,0,0.9)] ${wide ? "w-[64px]" : "w-5"}`} style={{perspective: 120}}>
            <motion.span
                className="absolute left-px right-px top-0 block h-[18px] rounded-[3px] bg-gradient-to-b from-zinc-400 via-zinc-600 to-zinc-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_2px_2px_rgba(0,0,0,0.6)]"
                initial={false}
                animate={HANDLE[position]}
                transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 1100, damping: 26, mass: 0.6}}
            >
                <span className="absolute inset-x-1 top-1/2 h-px -translate-y-1/2 bg-black/40"/>
            </motion.span>
        </span>
    </span>
);

interface LedProps {
    lit: boolean;
    flicker: boolean;
    delay: number;
    reduceMotion: boolean;
}

const Led = ({lit, flicker, delay, reduceMotion}: LedProps) => (
    <span aria-hidden="true" className="relative h-3 w-3 shrink-0 rounded-full bg-gradient-to-b from-zinc-400 to-zinc-200 p-[2px] shadow-[0_1px_0_rgba(255,255,255,0.6)] dark:from-zinc-600 dark:to-zinc-800 dark:shadow-none">
        <span className="absolute inset-[2px] rounded-full bg-amber-950/70"/>
        <motion.span
            className="absolute inset-[2px] rounded-full bg-amber-400 shadow-[0_0_8px_2px_rgba(251,191,36,0.65)]"
            initial={false}
            animate={{opacity: flicker && !reduceMotion ? [1, 0.2, 0.9, 0.05, 0.75, 0.1, 1, 0] : lit ? 1 : 0}}
            transition={flicker ? {duration: 0.7, ease: "linear"} : {duration: reduceMotion ? 0 : lit ? 0.16 : 0.1, delay: reduceMotion ? 0 : delay}}
        />
    </span>
);

interface RowProps {
    breaker: Breaker;
    index: number;
    position: BreakerPosition;
    powered: boolean;
    visible: boolean;
    reduceMotion: boolean;
    onThrow: (next: BreakerPosition) => void;
    onTrip: () => void;
}

const BreakerRow = ({breaker, index, position, powered, visible, reduceMotion, onThrow, onTrip}: RowProps) => {
    const lit = powered && position === "on";
    const [flicker, setFlicker] = useState(false);
    const hasTripped = useRef(false);
    const onTripRef = useRef(onTrip);
    onTripRef.current = onTrip;

    // The guard only fires while the flag is actually live, and only once, so a reset breaker stays on.
    useEffect(() => {
        if (!breaker.tripAfter || hasTripped.current || !visible || !lit) return;
        const timer = setTimeout(() => setFlicker(true), breaker.tripAfter);
        return () => clearTimeout(timer);
    }, [breaker.tripAfter, visible, lit]);

    useEffect(() => {
        if (!flicker) return;
        if (!lit) {
            setFlicker(false);
            return;
        }
        const timer = setTimeout(() => {
            hasTripped.current = true;
            setFlicker(false);
            onTripRef.current();
        }, reduceMotion ? 0 : 700);
        return () => clearTimeout(timer);
    }, [flicker, lit, reduceMotion]);

    // Like the real thing, a tripped breaker has to go fully off before it can go back on.
    const next: BreakerPosition = position === "off" ? "on" : "off";

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "ArrowUp" && position === "off") onThrow("on");
        else if (event.key === "ArrowDown" && position !== "off") onThrow("off");
        else return;
        event.preventDefault();
    };

    const status =
        position === "tripped"
            ? `Tripped${breaker.tripReason ? `: ${breaker.tripReason}` : ""}`
            : lit
                ? breaker.detail ?? "Live"
                : position === "on"
                    ? "On, no power from main"
                    : "Off";

    return (
        <li className="flex items-center gap-3">
            <span className="w-4 text-right font-mono text-[10px] tabular-nums text-zinc-500 dark:text-zinc-500">{String(index + 1).padStart(2, "0")}</span>
            <button
                type="button"
                role="switch"
                aria-checked={position === "on"}
                aria-label={`${breaker.label}, ${status}`}
                onClick={() => onThrow(next)}
                onKeyDown={handleKeyDown}
                className="shrink-0 rounded-[6px] outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-200 dark:focus-visible:ring-offset-zinc-800"
            >
                <Lever position={position} reduceMotion={reduceMotion}/>
            </button>
            <Led lit={lit} flicker={flicker} delay={index * 0.035} reduceMotion={reduceMotion}/>
            {/* Label holder: a white card behind a clear strip, like a panel's circuit directory. */}
            <span className="min-w-0 flex-1 rounded-[3px] border border-zinc-300 bg-white px-2.5 py-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)] dark:border-zinc-700 dark:bg-zinc-900">
                <span className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-[13px] font-medium text-zinc-900 dark:text-zinc-100">{breaker.label}</span>
                    <span className="shrink-0 font-mono text-[10px] text-zinc-400 dark:text-zinc-500">{breaker.flag}</span>
                </span>
                <span
                    className={`block truncate font-mono text-[10px] ${
                        position === "tripped" ? "text-red-600 dark:text-red-400" : lit ? "text-amber-700 dark:text-amber-400" : "text-zinc-400 dark:text-zinc-500"
                    }`}
                >
                    {status}
                </span>
            </span>
        </li>
    );
};

/**
 * Feature flags as an electrical panel. Each flag is a breaker that throws with a snap and shakes the panel a
 * little; the amber LED shows whether it is actually live. The main breaker cuts every circuit at once, and a
 * breaker can trip on its own, dropping to the middle until it is reset. Arrow keys throw the focused breaker.
 */
export const BreakerPanel = ({breakers, title = "Panel A", subtitle, onChange, className = ""}: BreakerPanelProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const panelRef = useRef<HTMLDivElement>(null);
    const visible = useInView(panelRef, {amount: 0.6});
    const shake = useAnimationControls();
    const [main, setMain] = useState(true);
    const [positions, setPositions] = useState<Record<string, BreakerPosition>>(() =>
        Object.fromEntries(breakers.map((breaker) => [breaker.id, breaker.on ? "on" : "off"])),
    );
    const [lastThrow, setLastThrow] = useState<string | null>(null);
    const [announcement, setAnnouncement] = useState("");

    const positionOf = (id: string) => positions[id] ?? "off";

    const jolt = (strength: number) => {
        if (reduceMotion) return;
        shake.start({
            x: [0, -strength, strength * 0.8, -strength * 0.4, 0],
            y: [0, strength * 0.5, -strength * 0.3, 0],
            transition: {duration: 0.24, delay: 0.04, ease: "easeOut"},
        });
    };

    const stamp = () => setLastThrow(new Date().toLocaleTimeString("en-GB", {hour: "2-digit", minute: "2-digit", second: "2-digit"}));

    const throwBreaker = (breaker: Breaker, next: BreakerPosition) => {
        setPositions((current) => ({...current, [breaker.id]: next}));
        onChange?.(breaker.id, main && next === "on");
        jolt(1.4);
        stamp();
    };

    const trip = (breaker: Breaker) => {
        setPositions((current) => ({...current, [breaker.id]: "tripped"}));
        onChange?.(breaker.id, false);
        setAnnouncement(`${breaker.label} tripped${breaker.tripReason ? `: ${breaker.tripReason}` : ""}.`);
        jolt(2);
        stamp();
    };

    const throwMain = () => {
        const next = !main;
        setMain(next);
        breakers.forEach((breaker) => {
            if (positionOf(breaker.id) === "on") onChange?.(breaker.id, next);
        });
        setAnnouncement(next ? "Main breaker on." : "Main breaker off. All flags are dark.");
        jolt(3);
        stamp();
    };

    const liveCount = breakers.filter((breaker) => main && positionOf(breaker.id) === "on").length;
    const trippedCount = breakers.filter((breaker) => positionOf(breaker.id) === "tripped").length;

    const handleMainKey = (event: KeyboardEvent<HTMLButtonElement>) => {
        if ((event.key === "ArrowUp" && !main) || (event.key === "ArrowDown" && main)) {
            event.preventDefault();
            throwMain();
        }
    };

    return (
        <motion.div
            ref={panelRef}
            animate={shake}
            className={`relative w-full max-w-md rounded-xl border border-zinc-400/60 bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 p-5 pt-6 shadow-[inset_0_1px_0_white,0_18px_40px_-18px_rgba(0,0,0,0.45)] dark:border-zinc-700 dark:from-zinc-800 dark:via-zinc-800 dark:to-zinc-900 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_40px_-18px_rgba(0,0,0,0.9)] ${className}`}
        >
            {/* Brushed steel grain. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl opacity-70 mix-blend-overlay dark:opacity-30"
                style={{backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0 1px, rgba(0,0,0,0.05) 1px 2px, transparent 2px 4px)"}}
            />
            <Screw angle={screwAngles[0]} className="left-2.5 top-2.5"/>
            <Screw angle={screwAngles[1]} className="right-2.5 top-2.5"/>
            <Screw angle={screwAngles[2]} className="bottom-2.5 left-2.5"/>
            <Screw angle={screwAngles[3]} className="bottom-2.5 right-2.5"/>

            <div className="relative">
                <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="rounded-[3px] border border-zinc-400/70 bg-gradient-to-b from-zinc-50 to-zinc-300 px-3 py-1.5 shadow-[inset_0_1px_0_white,0_1px_1px_rgba(0,0,0,0.15)] dark:border-zinc-600 dark:from-zinc-600 dark:to-zinc-700 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-700 dark:text-zinc-100">{title}</p>
                        {subtitle && <p className="font-mono text-[10px] text-zinc-500 dark:text-zinc-300">{subtitle}</p>}
                    </div>
                    <p className="text-right font-mono text-[10px] leading-relaxed tabular-nums text-zinc-500 dark:text-zinc-400">
                        {liveCount} of {breakers.length} live
                        {trippedCount > 0 && <span className="block text-red-600 dark:text-red-400">{trippedCount} tripped</span>}
                        <span className="block">last throw {lastThrow ?? "--:--:--"}</span>
                    </p>
                </div>

                {/* Main breaker, a double-width two pole unit. */}
                <div className="mb-4 flex items-center gap-3 border-b border-dashed border-zinc-400/70 pb-4 dark:border-zinc-600">
                    <span className="w-4"/>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={main}
                        aria-label={`Main breaker, ${main ? "on" : "off"}`}
                        onClick={throwMain}
                        onKeyDown={handleMainKey}
                        className="shrink-0 rounded-[6px] outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-200 dark:focus-visible:ring-offset-zinc-800"
                    >
                        <Lever position={main ? "on" : "off"} reduceMotion={reduceMotion} wide/>
                    </button>
                    <span>
                        <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-800 dark:text-zinc-100">Main</span>
                        <span className="block text-xs text-zinc-500 dark:text-zinc-400">{main ? "Feeds every circuit below" : "Everything on this panel is dark"}</span>
                    </span>
                </div>

                <ul className="flex flex-col gap-2.5">
                    {breakers.map((breaker, index) => (
                        <BreakerRow
                            key={breaker.id}
                            breaker={breaker}
                            index={index}
                            position={positionOf(breaker.id)}
                            powered={main}
                            visible={visible}
                            reduceMotion={reduceMotion}
                            onThrow={(next) => throwBreaker(breaker, next)}
                            onTrip={() => trip(breaker)}
                        />
                    ))}
                </ul>
            </div>
            <p aria-live="polite" className="sr-only">{announcement}</p>
        </motion.div>
    );
};

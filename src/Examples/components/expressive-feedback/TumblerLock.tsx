import {useEffect, useId, useRef, useState} from "react";
import {motion, useAnimate, useReducedMotion} from "framer-motion";
import {LuCheck, LuEye, LuEyeOff} from "react-icons/lu";

export interface TumblerRequirement {
    id: string;
    label: string;
    test: (value: string) => boolean;
}

export interface TumblerLockProps {
    /** One pin per requirement. Five reads best; between three and six fit the cylinder. */
    requirements?: TumblerRequirement[];
    label?: string;
    onChange?: (value: string, strong: boolean) => void;
    className?: string;
}

const COMMON = ["password", "123456", "qwerty", "letmein", "welcome", "iloveyou", "admin", "dragon", "monkey", "football", "sunshine", "princess", "abc123"];

const defaultRequirements: TumblerRequirement[] = [
    {id: "length", label: "12 or more characters", test: (value) => value.length >= 12},
    {id: "number", label: "A number", test: (value) => /\d/.test(value)},
    {id: "symbol", label: "A symbol", test: (value) => /[^A-Za-z0-9\s]/.test(value)},
    {id: "upper", label: "An uppercase letter", test: (value) => /[A-Z]/.test(value)},
    {
        id: "common",
        label: "Not a common password",
        test: (value) => {
            const plain = value.toLowerCase().replace(/[^a-z0-9]/g, "");
            return plain.length > 0 && !COMMON.some((word) => plain.includes(word));
        },
    },
];

// Cylinder geometry in SVG units. The shear line is the seam between housing and plug.
const SHEAR = 168;
const CHAMBER_TOP = 124;
const DRIVER = 20;
const KEY_REST = 204;
const AXIS = 196;
const KEY_PIN_LENGTHS = [22, 26, 20, 24, 23, 21];
// Cut too deep by this much, the driver pin straddles the shear line and blocks the plug.
const WRONG_CUT = 9;

const pinX = (index: number, count: number) => (count === 1 ? 148 : 88 + (120 / (count - 1)) * index);

// The key profile: flat lands under each pin, valleys between them, then the tip. Same number of points for any
// set of depths, so framer-motion can morph it.
const keyPath = (surfaces: number[], count: number) => {
    const points: string[] = ["M 18 207", "L 18 189", `L ${pinX(0, count) - 12} 189`];
    surfaces.forEach((surface, index) => {
        const x = pinX(index, count);
        points.push(`L ${x - 2.5} ${surface}`, `L ${x + 2.5} ${surface}`);
        if (index < count - 1) {
            const nextX = pinX(index + 1, count);
            const valley = Math.min(206, Math.max(surface, surfaces[index + 1]) + 4);
            points.push(`L ${(x + nextX) / 2} ${valley}`);
        }
    });
    points.push(`L ${pinX(count - 1, count) + 12} 196`, "L 224 203", "L 224 207", "Z");
    return points.join(" ");
};

const Spring = ({length}: {length: number}) => {
    // Drawn once at full length and squashed with scaleY; the stroke stays the same width either way.
    const coils = 7;
    const natural = 44;
    let d = "M 0 0";
    for (let index = 1; index <= coils * 2; index += 1) {
        d += ` L ${index % 2 ? 3.6 : -3.6} ${(natural / (coils * 2)) * index}`;
    }
    return (
        <motion.path
            d={d}
            fill="none"
            strokeWidth={1.1}
            vectorEffect="non-scaling-stroke"
            className="stroke-zinc-500 dark:stroke-zinc-400"
            style={{originY: 0}}
            initial={false}
            animate={{scaleY: Math.max(0.12, length / natural)}}
            transition={{type: "spring", stiffness: 520, damping: 26}}
        />
    );
};

/**
 * A password field whose strength meter is a padlock cut in half. Every requirement lifts one pin stack until its gap
 * sits on the shear line; with all of them set, the plug turns and the shackle springs open.
 */
export const TumblerLock = ({requirements = defaultRequirements, label = "New password", onChange, className = ""}: TumblerLockProps) => {
    const uid = useId().replace(/:/g, "");
    const reduceMotion = useReducedMotion() ?? false;
    const [value, setValue] = useState("");
    const [visible, setVisible] = useState(false);
    const [turned, setTurned] = useState(false);
    const [scope, animate] = useAnimate();
    const count = Math.min(requirements.length, KEY_PIN_LENGTHS.length);
    const pins = requirements.slice(0, count);
    const met = pins.map((requirement) => requirement.test(value));
    const metCount = met.filter(Boolean).length;
    const keyIn = value.length > 0;
    const open = keyIn && metCount === count;
    const previous = useRef(metCount);

    const surfaces = pins.map((_, index) => {
        if (!keyIn) return KEY_REST;
        const aligned = SHEAR + KEY_PIN_LENGTHS[index];
        return met[index] ? aligned : Math.min(KEY_REST, aligned + WRONG_CUT);
    });

    // Pins settle first, then the plug turns. Relocking drops the shackle straight away.
    useEffect(() => {
        if (!open) {
            setTurned(false);
            return;
        }
        const timeout = window.setTimeout(() => setTurned(true), reduceMotion ? 0 : 320);
        return () => window.clearTimeout(timeout);
    }, [open, reduceMotion]);

    // A one pixel knock through the whole lock each time a pin sets.
    useEffect(() => {
        if (metCount > previous.current && keyIn && !reduceMotion && scope.current) {
            animate(scope.current, {y: [0, -1.5, 0.5, 0]}, {duration: 0.22, ease: "easeOut"});
        }
        previous.current = metCount;
    }, [metCount, keyIn, reduceMotion, animate, scope]);

    const spring = reduceMotion ? {duration: 0} : {type: "spring" as const, stiffness: 520, damping: 26};
    const pinSpring = reduceMotion ? {duration: 0} : {type: "spring" as const, stiffness: 430, damping: 21, mass: 0.9};
    const status = open ? "Open · every pin on the shear line" : `Locked · ${keyIn ? metCount : 0} of ${count} pins set`;

    return (
        <div className={`grid w-full max-w-2xl items-center gap-6 rounded-2xl border border-zinc-200 bg-white p-5 sm:grid-cols-[minmax(0,240px)_1fr] sm:gap-8 sm:p-7 dark:border-zinc-800 dark:bg-zinc-950 ${className}`}>
            <figure className="mx-auto w-full max-w-[240px]">
                <div ref={scope}>
                    <svg viewBox="0 0 260 240" className="w-full" role="img" aria-label={`Lock cylinder, ${status}`}>
                        <defs>
                            <linearGradient id={`${uid}-steel`} x1="0" x2="1">
                                <stop offset="0" stopColor="#a1a1aa"/>
                                <stop offset="0.45" stopColor="#f4f4f5"/>
                                <stop offset="1" stopColor="#71717a"/>
                            </linearGradient>
                            <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#52525b"/>
                                <stop offset="1" stopColor="#27272a"/>
                            </linearGradient>
                            <linearGradient id={`${uid}-key`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#e4e4e7"/>
                                <stop offset="1" stopColor="#a1a1aa"/>
                            </linearGradient>
                            {/* Laminated steel plates, like a classic padlock body. */}
                            <pattern id={`${uid}-plates`} width="12" height="7" patternUnits="userSpaceOnUse">
                                <line x1="0" y1="0.5" x2="12" y2="0.5" stroke="white" strokeOpacity="0.09"/>
                                <line x1="0" y1="6.5" x2="12" y2="6.5" stroke="black" strokeOpacity="0.28"/>
                            </pattern>
                            {/* Section hatching: opposite angles tell the housing and the plug apart, as in a drawing. */}
                            <pattern id={`${uid}-hatch-a`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                                <rect width="5" height="5" className="fill-zinc-200 dark:fill-zinc-700"/>
                                <line x1="0" y1="0" x2="0" y2="5" strokeWidth="1" className="stroke-zinc-300 dark:stroke-zinc-600"/>
                            </pattern>
                            <pattern id={`${uid}-hatch-b`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
                                <rect width="5" height="5" className="fill-zinc-100 dark:fill-zinc-800"/>
                                <line x1="0" y1="0" x2="0" y2="5" strokeWidth="1" className="stroke-zinc-300 dark:stroke-zinc-600"/>
                            </pattern>
                            <clipPath id={`${uid}-keyway`}>
                                <rect x="0" y="180" width="232" height="32"/>
                            </clipPath>
                        </defs>

                        {/* Shackle. The short left leg is the one that pulls free. */}
                        <motion.g initial={false} animate={{y: turned ? -22 : 0}} transition={reduceMotion ? {duration: 0} : turned ? {type: "spring", stiffness: 640, damping: 13, delay: 0.3} : {type: "spring", stiffness: 900, damping: 30}}>
                            <path d="M108 118 V66 A42 42 0 0 1 192 66 V150" fill="none" stroke="#3f3f46" strokeWidth="17"/>
                            <path d="M108 118 V66 A42 42 0 0 1 192 66 V150" fill="none" stroke={`url(#${uid}-steel)`} strokeWidth="14"/>
                        </motion.g>

                        <rect x="52" y="104" width="196" height="128" rx="18" fill={`url(#${uid}-body)`} stroke="#18181b" strokeWidth="1.5"/>
                        <rect x="52" y="104" width="196" height="128" rx="18" fill={`url(#${uid}-plates)`}/>

                        {/* Cutaway. */}
                        <rect x="66" y="120" width="168" height="96" rx="6" fill={`url(#${uid}-hatch-a)`}/>
                        <rect x="66" y={SHEAR} width="160" height="44" fill={`url(#${uid}-hatch-b)`}/>
                        <rect x="52" y="184" width="176" height="24" rx="2" className="fill-white dark:fill-zinc-900"/>
                        {pins.map((pin, index) => (
                            <rect key={pin.id} x={pinX(index, count) - 6.5} y={CHAMBER_TOP} width="13" height={184 - CHAMBER_TOP} className="fill-white dark:fill-zinc-900"/>
                        ))}
                        <rect x="66" y="120" width="168" height="96" rx="6" fill="none" stroke="#18181b" strokeWidth="1.5"/>
                        <line x1="66" y1={SHEAR} x2="226" y2={SHEAR} strokeWidth="0.75" strokeDasharray="3 2" className="stroke-zinc-500 dark:stroke-zinc-400"/>
                        <text x="228" y="165" textAnchor="end" fontSize="5.5" letterSpacing="0.8" className="fill-zinc-500 font-mono dark:fill-zinc-400">SHEAR LINE</text>

                        {pins.map((pin, index) => {
                            const x = pinX(index, count);
                            const keyPinTop = surfaces[index] - KEY_PIN_LENGTHS[index];
                            const driverTop = keyPinTop - DRIVER;
                            return (
                                <g key={pin.id}>
                                    <text x={x} y="115" textAnchor="middle" fontSize="7" className="fill-zinc-400 font-mono">{index + 1}</text>
                                    <g transform={`translate(${x} ${CHAMBER_TOP})`}>
                                        <Spring length={driverTop - CHAMBER_TOP}/>
                                    </g>
                                    <motion.g initial={false} animate={{y: driverTop}} transition={pinSpring}>
                                        <rect x={x - 5.5} y="0" width="11" height={DRIVER} rx="1.5" className="fill-amber-600 stroke-amber-800" strokeWidth="0.75"/>
                                        <line x1={x - 3.5} y1="3" x2={x - 3.5} y2={DRIVER - 3} stroke="white" strokeOpacity="0.35" strokeWidth="1"/>
                                    </motion.g>
                                    <line
                                        x1={x - 8}
                                        y1={SHEAR}
                                        x2={x + 8}
                                        y2={SHEAR}
                                        strokeWidth="1.6"
                                        className={`transition-colors duration-300 ${keyIn && met[index] ? "stroke-emerald-500" : "stroke-transparent"}`}
                                    />
                                </g>
                            );
                        })}

                        {/* Everything that lives in the plug turns with it. Seen edge-on after a quarter turn, it flattens toward the axis. */}
                        <g
                            style={{
                                transform: `scaleY(${turned ? 0.16 : 1})`,
                                transformOrigin: `0px ${AXIS}px`,
                                transformBox: "view-box",
                                transition: reduceMotion ? "none" : `transform ${turned ? 0.45 : 0.3}s cubic-bezier(0.65, 0, 0.35, 1) ${turned ? "0s" : "0.12s"}`,
                            }}
                        >
                            {pins.map((pin, index) => {
                                const x = pinX(index, count);
                                const length = KEY_PIN_LENGTHS[index];
                                return (
                                    <motion.g key={pin.id} initial={false} animate={{y: surfaces[index] - length}} transition={pinSpring}>
                                        <path d={`M ${x - 5.5} 0 H ${x + 5.5} V ${length - 3} L ${x} ${length} L ${x - 5.5} ${length - 3} Z`} className="fill-amber-400 stroke-amber-700" strokeWidth="0.75"/>
                                        <line x1={x - 3.5} y1="3" x2={x - 3.5} y2={length - 5} stroke="white" strokeOpacity="0.45" strokeWidth="1"/>
                                    </motion.g>
                                );
                            })}
                            <motion.g initial={false} animate={{x: keyIn ? 0 : -150}} transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 260, damping: 28}}>
                                <g clipPath={`url(#${uid}-keyway)`}>
                                    <motion.path
                                        initial={false}
                                        animate={{d: keyPath(surfaces, count)}}
                                        transition={spring}
                                        fill={`url(#${uid}-key)`}
                                        stroke="#52525b"
                                        strokeWidth="0.75"
                                    />
                                </g>
                                <path d="M10 178 h20 a8 8 0 0 1 8 8 v22 a8 8 0 0 1 -8 8 h-20 a8 8 0 0 1 -8 -8 v-22 a8 8 0 0 1 8 -8 Z M20 191 a6 6 0 1 0 0.01 0 Z" fillRule="evenodd" fill={`url(#${uid}-key)`} stroke="#52525b" strokeWidth="0.75"/>
                            </motion.g>
                        </g>
                    </svg>
                </div>
                <figcaption aria-live="polite" className={`mt-2 text-center font-mono text-[11px] uppercase tracking-[0.14em] ${open ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500 dark:text-zinc-400"}`}>
                    {status}
                </figcaption>
            </figure>

            <div className="min-w-0">
                <label htmlFor={`${uid}-input`} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{label}</label>
                <div className="relative mt-2">
                    <input
                        id={`${uid}-input`}
                        type={visible ? "text" : "password"}
                        value={value}
                        autoComplete="new-password"
                        spellCheck={false}
                        aria-describedby={`${uid}-rules`}
                        onChange={(event) => {
                            const next = event.target.value;
                            setValue(next);
                            onChange?.(next, pins.every((requirement) => requirement.test(next)));
                        }}
                        className="h-11 w-full rounded-lg border border-zinc-300 bg-white pl-3 pr-11 font-mono text-[15px] tracking-wide text-zinc-900 outline-none transition-shadow placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-300 dark:focus:ring-zinc-100/10"
                    />
                    <button
                        type="button"
                        onClick={() => setVisible((current) => !current)}
                        aria-pressed={visible}
                        aria-label={visible ? "Hide password" : "Show password"}
                        className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-100"
                    >
                        {visible ? <LuEyeOff className="h-4 w-4" aria-hidden="true"/> : <LuEye className="h-4 w-4" aria-hidden="true"/>}
                    </button>
                </div>

                <ul id={`${uid}-rules`} className="mt-4 space-y-2">
                    {pins.map((pin, index) => {
                        const done = keyIn && met[index];
                        return (
                            <li key={pin.id} className="flex items-center gap-3 text-sm">
                                <span className="w-4 font-mono text-[11px] tabular-nums text-zinc-400">{index + 1}</span>
                                <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border transition-colors duration-200 ${done ? "border-emerald-500 bg-emerald-500 text-white" : "border-zinc-300 dark:border-zinc-700"}`}>
                                    {done && <LuCheck className="h-3 w-3" strokeWidth={3} aria-hidden="true"/>}
                                </span>
                                <span className={done ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400"}>
                                    {pin.label}
                                    <span className="sr-only">{done ? ", done" : ", not yet"}</span>
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

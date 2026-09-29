import {useEffect, useId, useRef, useState} from "react";
import {motion, MotionConfig} from "framer-motion";
import type {Transition} from "framer-motion";
import {LuArrowRight} from "react-icons/lu";

const draw: Transition = {duration: 0.55, ease: [0.65, 0, 0.35, 1]};

// Two strokes start at opposite corners and trace the outline until they meet.
const TraceButton = () => {
    const ref = useRef<HTMLButtonElement>(null);
    const [size, setSize] = useState({width: 0, height: 0});
    const [active, setActive] = useState(false);
    const gradientId = `trace-${useId().replace(/:/g, "")}`;

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new ResizeObserver(() => setSize({width: element.offsetWidth, height: element.offsetHeight}));
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const stroke = 1.5;
    const rect = {
        x: stroke / 2,
        y: stroke / 2,
        width: Math.max(0, size.width - stroke),
        height: Math.max(0, size.height - stroke),
        rx: 12 - stroke / 2,
    };

    return (
        <button
            ref={ref}
            type="button"
            onPointerEnter={() => setActive(true)}
            onPointerLeave={() => setActive(false)}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            className="group relative inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-colors duration-500 hover:border-transparent focus-visible:border-transparent focus-visible:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
            {size.width > 0 && (
                <svg aria-hidden="true" width={size.width} height={size.height} className="pointer-events-none absolute inset-0 overflow-visible">
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#6366f1"/>
                            <stop offset="55%" stopColor="#ec4899"/>
                            <stop offset="100%" stopColor="#f59e0b"/>
                        </linearGradient>
                    </defs>
                    {[0, 0.5].map((offset) => (
                        <motion.rect
                            key={offset}
                            {...rect}
                            fill="none"
                            stroke={`url(#${gradientId})`}
                            strokeWidth={stroke}
                            strokeLinecap="round"
                            initial={false}
                            animate={{pathLength: active ? 0.5 : 0, pathOffset: offset, opacity: active ? 1 : 0}}
                            transition={{...draw, opacity: {duration: active ? 0.1 : 0.4}}}
                        />
                    ))}
                </svg>
            )}
            <span className="relative">Start free trial</span>
            <LuArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" aria-hidden="true"/>
        </button>
    );
};

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const corners: {corner: Corner; horizontal: string; vertical: string}[] = [
    {corner: "top-left", horizontal: "left-0 top-0 origin-left", vertical: "left-0 top-0 origin-top"},
    {corner: "top-right", horizontal: "right-0 top-0 origin-right", vertical: "right-0 top-0 origin-top"},
    {corner: "bottom-left", horizontal: "bottom-0 left-0 origin-left", vertical: "bottom-0 left-0 origin-bottom"},
    {corner: "bottom-right", horizontal: "bottom-0 right-0 origin-right", vertical: "bottom-0 right-0 origin-bottom"},
];

// Corner brackets grow along each edge until they close into a full frame.
const BracketButton = () => {
    const [active, setActive] = useState(false);
    const spring: Transition = {type: "spring", stiffness: 260, damping: 26};

    return (
        <button
            type="button"
            onPointerEnter={() => setActive(true)}
            onPointerLeave={() => setActive(false)}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            className="relative px-7 py-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-gray-900 focus-visible:outline-none dark:text-white"
        >
            {corners.map(({corner, horizontal, vertical}) => (
                <span key={corner} aria-hidden="true">
                    <motion.span
                        className={`absolute h-[1.5px] w-full bg-gray-900 dark:bg-white ${horizontal}`}
                        initial={false}
                        animate={{scaleX: active ? 0.5 : 0.14}}
                        transition={spring}
                    />
                    <motion.span
                        className={`absolute h-full w-[1.5px] bg-gray-900 dark:bg-white ${vertical}`}
                        initial={false}
                        animate={{scaleY: active ? 0.5 : 0.3}}
                        transition={spring}
                    />
                </span>
            ))}
            <motion.span
                aria-hidden="true"
                className="absolute inset-1 bg-gray-900/5 dark:bg-white/10"
                initial={false}
                animate={{opacity: active ? 1 : 0, scale: active ? 1 : 0.9}}
                transition={spring}
            />
            <span className="relative">View pricing</span>
        </button>
    );
};

// The underline slides in from the left and leaves to the right, so it always moves forward.
const SweepLink = () => {
    const [active, setActive] = useState(false);

    return (
        <a
            href="#changelog"
            onClick={(event) => event.preventDefault()}
            onPointerEnter={() => setActive(true)}
            onPointerLeave={() => setActive(false)}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            className="relative rounded py-1 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 dark:text-slate-300 dark:hover:text-white dark:focus-visible:ring-offset-slate-950"
        >
            Read the changelog
            <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-indigo-500"
                initial={false}
                animate={{scaleX: active ? 1 : 0, originX: active ? 0 : 1}}
                transition={{scaleX: draw, originX: {duration: 0}}}
            />
        </a>
    );
};

const BorderDrawButton = () => (
    <MotionConfig reducedMotion="user">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-10">
            <TraceButton/>
            <BracketButton/>
            <SweepLink/>
        </div>
    </MotionConfig>
);

export default BorderDrawButton;

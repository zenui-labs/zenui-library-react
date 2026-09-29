import {useRef, useState} from "react";
import type {PointerEvent} from "react";
import {useMotionValue, useMotionValueEvent, useReducedMotion, useSpring} from "framer-motion";
import {LuEye, LuHeadphones, LuStar} from "react-icons/lu";

const SPOT = 120; // spotlight radius in px
const FULL = 1400; // large enough to uncover the whole card

// Wireframe placeholder: a gray block with a small label.
const Placeholder = ({label, className}: {label: string; className: string}) => (
    <div className={`flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-100 font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500 ${className}`}>
        {label}
    </div>
);

// Both layers share this grid, so the finished design lines up exactly with its wireframe.
const layout = "grid h-full grid-cols-1 gap-5 p-5 sm:grid-cols-[1fr_1.1fr] sm:p-8";

const Wireframe = () => (
    <div className={layout}>
        <Placeholder label="Product image" className="h-40 sm:h-full"/>
        <div className="flex flex-col gap-3">
            <Placeholder label="Eyebrow" className="h-4 w-24"/>
            <Placeholder label="Title" className="h-8 w-4/5"/>
            <Placeholder label="Rating" className="h-4 w-32"/>
            <Placeholder label="Description" className="h-16"/>
            <div className="mt-auto flex items-center gap-3">
                <Placeholder label="Price" className="h-10 w-24"/>
                <Placeholder label="Button" className="h-10 flex-1"/>
            </div>
        </div>
    </div>
);

const FinalDesign = () => (
    <div className={`${layout} bg-white dark:bg-slate-950`}>
        <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-orange-300 via-rose-400 to-fuchsia-500 sm:h-full dark:from-orange-500 dark:via-rose-600 dark:to-fuchsia-700">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.5),transparent_50%)]"/>
            <LuHeadphones className="relative h-20 w-20 text-white drop-shadow-lg" aria-hidden="true"/>
        </div>
        <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">New, in coral</p>
            <h3 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Aria Pro headphones</h3>
            <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-slate-400">
                {Array.from({length: 5}, (_, index) => (
                    <LuStar key={index} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true"/>
                ))}
                <span className="ml-1">4.9 from 2,318 reviews</span>
            </p>
            <p className="text-sm leading-6 text-gray-600 dark:text-slate-400">Adaptive noise canceling, 40 hour battery and a case that charges in 15 minutes.</p>
            <div className="mt-auto flex items-center gap-3">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">$349</span>
                <span className="flex h-10 flex-1 items-center justify-center rounded-lg bg-gray-900 text-sm font-medium text-white dark:bg-white dark:text-gray-900">Add to bag</span>
            </div>
        </div>
    </div>
);

// The finished design sits on top of the wireframe behind a radial mask. The mask center and radius are
// CSS variables written straight to the element, so pointer moves never re-render React.
const SpotlightReveal = () => {
    const areaRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const [showAll, setShowAll] = useState(false);
    const radius = useMotionValue(0);
    const smoothRadius = useSpring(radius, {stiffness: 170, damping: 24});

    const writeRadius = (value: number) => revealRef.current?.style.setProperty("--r", `${Math.max(0, value)}px`);
    useMotionValueEvent(smoothRadius, "change", (value) => {
        if (!reduceMotion) writeRadius(value);
    });
    useMotionValueEvent(radius, "change", (value) => {
        if (reduceMotion) writeRadius(value);
    });

    const moveTo = (event: PointerEvent<HTMLDivElement>) => {
        const reveal = revealRef.current;
        if (!reveal) return;
        const rect = event.currentTarget.getBoundingClientRect();
        reveal.style.setProperty("--x", `${event.clientX - rect.left}px`);
        reveal.style.setProperty("--y", `${event.clientY - rect.top}px`);
    };

    const toggle = () => {
        const next = !showAll;
        setShowAll(next);
        const area = areaRef.current;
        if (next && area) {
            revealRef.current?.style.setProperty("--x", `${area.clientWidth / 2}px`);
            revealRef.current?.style.setProperty("--y", `${area.clientHeight / 2}px`);
        }
        radius.set(next ? FULL : 0);
    };

    const mask = "radial-gradient(circle var(--r) at var(--x) var(--y), #000 55%, transparent 100%)";

    return (
        <div className="w-full max-w-3xl">
            <div
                ref={areaRef}
                onPointerMove={(event) => {
                    if (showAll) return;
                    moveTo(event);
                    if (radius.get() !== SPOT) radius.set(SPOT);
                }}
                onPointerDown={(event) => {
                    if (showAll) return;
                    moveTo(event);
                    radius.set(SPOT);
                }}
                onPointerLeave={() => {
                    if (!showAll) radius.set(0);
                }}
                className="relative h-[470px] overflow-hidden rounded-3xl border border-gray-200 bg-white sm:h-[340px] dark:border-slate-800 dark:bg-slate-950"
            >
                <div aria-hidden="true" className="h-full">
                    <Wireframe/>
                </div>
                <div
                    ref={revealRef}
                    style={{maskImage: mask, WebkitMaskImage: mask}}
                    className="absolute inset-0 [--r:0px] [--x:50%] [--y:50%]"
                >
                    <FinalDesign/>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-sm text-gray-500 dark:text-slate-400">Move over the wireframe to see the finished design.</p>
                <button
                    type="button"
                    aria-pressed={showAll}
                    onClick={toggle}
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
                >
                    <LuEye className="h-4 w-4" aria-hidden="true"/>
                    {showAll ? "Show wireframe" : "Show design"}
                </button>
            </div>
        </div>
    );
};

export default SpotlightReveal;

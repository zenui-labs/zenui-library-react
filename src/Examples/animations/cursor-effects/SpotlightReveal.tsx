import {useRef, useState} from "react";
import type {PointerEvent, ReactNode} from "react";
import {useMotionValue, useMotionValueEvent, useReducedMotion, useSpring} from "framer-motion";
import {LuEye} from "react-icons/lu";

const FULL = 1400; // large enough to uncover the whole card

export interface WireframePlaceholderProps {
    label: string;
    /** Size and layout classes for the block. */
    className?: string;
}

/** A gray dashed block with a small label, for drawing the wireframe layer. */
export const WireframePlaceholder = ({label, className = ""}: WireframePlaceholderProps) => (
    <div className={`flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-100 font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500 ${className}`}>
        {label}
    </div>
);

export interface SpotlightRevealProps {
    /** Layer shown by default, for example a wireframe. It is hidden from screen readers. */
    base: ReactNode;
    /** Layer the spotlight uncovers. Give it the same layout as `base` so the two line up. */
    reveal: ReactNode;
    /** Spotlight radius in px. */
    radius?: number;
    /** Line next to the toggle button. */
    hint?: ReactNode;
    /** Button label while the base layer shows. */
    showLabel?: string;
    /** Button label while the whole reveal layer shows. */
    hideLabel?: string;
    /** Height classes for the area. */
    areaClassName?: string;
    className?: string;
}

// The reveal layer sits on top of the base layer behind a radial mask. The mask center and radius are
// CSS variables written straight to the element, so pointer moves never re-render React.
export const SpotlightReveal = ({
    base,
    reveal,
    radius = 120,
    hint = "Move over the wireframe to see the finished design.",
    showLabel = "Show design",
    hideLabel = "Show wireframe",
    areaClassName = "h-[470px] sm:h-[340px]",
    className = "",
}: SpotlightRevealProps) => {
    const areaRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const [showAll, setShowAll] = useState(false);
    const spotRadius = useMotionValue(0);
    const smoothRadius = useSpring(spotRadius, {stiffness: 170, damping: 24});

    const writeRadius = (value: number) => revealRef.current?.style.setProperty("--r", `${Math.max(0, value)}px`);
    useMotionValueEvent(smoothRadius, "change", (value) => {
        if (!reduceMotion) writeRadius(value);
    });
    useMotionValueEvent(spotRadius, "change", (value) => {
        if (reduceMotion) writeRadius(value);
    });

    const moveTo = (event: PointerEvent<HTMLDivElement>) => {
        const layer = revealRef.current;
        if (!layer) return;
        const rect = event.currentTarget.getBoundingClientRect();
        layer.style.setProperty("--x", `${event.clientX - rect.left}px`);
        layer.style.setProperty("--y", `${event.clientY - rect.top}px`);
    };

    const toggle = () => {
        const next = !showAll;
        setShowAll(next);
        const area = areaRef.current;
        if (next && area) {
            revealRef.current?.style.setProperty("--x", `${area.clientWidth / 2}px`);
            revealRef.current?.style.setProperty("--y", `${area.clientHeight / 2}px`);
        }
        spotRadius.set(next ? FULL : 0);
    };

    const mask = "radial-gradient(circle var(--r) at var(--x) var(--y), #000 55%, transparent 100%)";

    return (
        <div className={`w-full max-w-3xl ${className}`}>
            <div
                ref={areaRef}
                onPointerMove={(event) => {
                    if (showAll) return;
                    moveTo(event);
                    if (spotRadius.get() !== radius) spotRadius.set(radius);
                }}
                onPointerDown={(event) => {
                    if (showAll) return;
                    moveTo(event);
                    spotRadius.set(radius);
                }}
                onPointerLeave={() => {
                    if (!showAll) spotRadius.set(0);
                }}
                className={`relative overflow-hidden rounded-3xl border border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-950 ${areaClassName}`}
            >
                <div aria-hidden="true" className="h-full">
                    {base}
                </div>
                <div
                    ref={revealRef}
                    style={{maskImage: mask, WebkitMaskImage: mask}}
                    className="absolute inset-0 [--r:0px] [--x:50%] [--y:50%]"
                >
                    {reveal}
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-sm text-gray-500 dark:text-slate-400">{hint}</p>
                <button
                    type="button"
                    aria-pressed={showAll}
                    onClick={toggle}
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
                >
                    <LuEye className="h-4 w-4" aria-hidden="true"/>
                    {showAll ? hideLabel : showLabel}
                </button>
            </div>
        </div>
    );
};

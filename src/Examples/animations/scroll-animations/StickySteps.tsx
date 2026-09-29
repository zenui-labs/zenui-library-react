import {useCallback, useEffect, useRef, useState} from "react";
import type {ComponentType, ReactNode, RefObject} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";

export interface StickyStep {
    title: string;
    body: string;
    icon: ComponentType<{className?: string}>;
    /** What the pinned panel shows while this step is active. It animates in each time the step becomes active. */
    visual: ReactNode;
}

export interface StepBarProps {
    label: string;
    /** Fill amount from 0 to 100. */
    value: number;
    /** Classes for the fill, usually a background color. */
    className: string;
}

/** A labeled bar that fills when it mounts. Handy inside a step visual. */
export const StepBar = ({label, value, className}: StepBarProps) => (
    <div>
        <div className="flex justify-between text-[11px] text-gray-500 dark:text-slate-400">
            <span>{label}</span>
            <span className="tabular-nums">{value}%</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800">
            <motion.div
                initial={{scaleX: 0}}
                animate={{scaleX: value / 100}}
                transition={{duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15}}
                className={`h-full origin-left rounded-full ${className}`}
            />
        </div>
    </div>
);

interface StepBlockProps {
    step: StickyStep;
    index: number;
    total: number;
    active: boolean;
    root: RefObject<HTMLDivElement>;
    onActive: (index: number) => void;
}

// A step becomes active when it crosses a thin line 65% down the panel, below the sticky visual on phones.
const StepBlock = ({step, index, total, active, root, onActive}: StepBlockProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, {root, margin: "-65% 0px -35% 0px"});
    const Icon = step.icon;

    useEffect(() => {
        if (inView) onActive(index);
    }, [inView, index, onActive]);

    return (
        <div ref={ref} className="flex min-h-[250px] flex-col justify-center px-5 py-8 sm:min-h-[320px] sm:px-8">
            <div className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-40"}`}>
                <span
                    aria-hidden="true"
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-500 ${active ? "border-violet-500 bg-violet-600 text-white dark:border-violet-400 dark:bg-violet-500" : "border-gray-200 text-gray-500 dark:border-slate-700 dark:text-slate-400"}`}
                >
                    <Icon className="h-4 w-4"/>
                </span>
                <p className="mt-4 text-xs font-medium text-gray-500 dark:text-slate-500">Step {index + 1} of {total}</p>
                <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">{step.body}</p>
            </div>
        </div>
    );
};

export interface StickyStepsProps {
    steps: StickyStep[];
    /** Called with the index of the step that just became active. */
    onStepChange?: (index: number) => void;
    /** Accessible name of the scrollable panel. */
    ariaLabel?: string;
    className?: string;
}

export const StickySteps = ({steps, onStepChange, ariaLabel = "How it works, scroll through the steps", className = ""}: StickyStepsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const reduceMotion = useReducedMotion();
    // Kept in a ref so a new callback from the parent does not re-run every step's effect.
    const onStepChangeRef = useRef(onStepChange);
    useEffect(() => {
        onStepChangeRef.current = onStepChange;
    }, [onStepChange]);
    const activeRef = useRef(0);

    const handleActive = useCallback((index: number) => {
        if (activeRef.current === index) return;
        activeRef.current = index;
        setActive(index);
        onStepChangeRef.current?.(index);
    }, []);

    return (
        <div className={`w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 ${className}`}>
            <div
                ref={containerRef}
                tabIndex={0}
                aria-label={ariaLabel}
                className="relative h-[460px] overflow-y-auto overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500"
            >
                <div className="flex flex-col sm:flex-row">
                    {/* The visual sticks to the top of the panel on phones and to the right side from sm up. */}
                    <div className="sticky top-0 z-10 h-[190px] border-b border-gray-200 bg-gray-50/95 backdrop-blur sm:order-2 sm:h-[460px] sm:w-1/2 sm:self-start sm:border-b-0 sm:border-l dark:border-slate-800 dark:bg-slate-900/95">
                        <div className="relative flex h-full items-center justify-center p-5 sm:p-8">
                            <div className="relative h-[120px] w-full max-w-[260px]">
                                <AnimatePresence initial={false}>
                                    <motion.div
                                        key={active}
                                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 24, scale: 0.96, filter: "blur(6px)"}}
                                        animate={{opacity: 1, y: 0, scale: 1, filter: "blur(0px)"}}
                                        exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: -24, scale: 0.96, filter: "blur(6px)"}}
                                        transition={{duration: 0.45, ease: [0.22, 1, 0.36, 1]}}
                                        className="absolute inset-0 flex flex-col justify-center"
                                    >
                                        {steps[active]?.visual}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 sm:bottom-6" aria-hidden="true">
                                {steps.map((step, index) => (
                                    <motion.span
                                        key={step.title}
                                        animate={{width: index === active ? 20 : 6}}
                                        className={`h-1.5 rounded-full ${index === active ? "bg-violet-600 dark:bg-violet-400" : "bg-gray-300 dark:bg-slate-700"}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="sm:w-1/2">
                        {steps.map((step, index) => (
                            <StepBlock
                                key={step.title}
                                step={step}
                                index={index}
                                total={steps.length}
                                active={index === active}
                                root={containerRef}
                                onActive={handleActive}
                            />
                        ))}
                        <div className="h-[120px] sm:h-[140px]" aria-hidden="true"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

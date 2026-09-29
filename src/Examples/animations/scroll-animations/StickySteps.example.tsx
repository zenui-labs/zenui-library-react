import {useEffect, useRef, useState} from "react";
import type {ReactNode, RefObject} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {LuBell, LuLandmark, LuTarget, LuTrendingUp} from "react-icons/lu";

interface Step {
    title: string;
    body: string;
    icon: IconType;
    visual: ReactNode;
}

const Bar = ({label, value, className}: {label: string; value: number; className: string}) => (
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

const steps: Step[] = [
    {
        title: "Connect your accounts",
        body: "Link checking, savings and cards from 11,000 banks. Transactions import in about a minute.",
        icon: LuLandmark,
        visual: (
            <div className="space-y-2">
                {["Chase checking", "Amex Gold", "Ally savings"].map((bank, index) => (
                    <motion.div
                        key={bank}
                        initial={{opacity: 0, x: -12}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: 0.1 + index * 0.08}}
                        className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-900"
                    >
                        <span className="font-medium text-gray-800 dark:text-slate-200">{bank}</span>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">Synced</span>
                    </motion.div>
                ))}
            </div>
        ),
    },
    {
        title: "Set a budget per category",
        body: "Pick limits for the categories that matter. We suggest amounts based on the last three months.",
        icon: LuTarget,
        visual: (
            <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                <Bar label="Groceries" value={64} className="bg-emerald-500"/>
                <Bar label="Dining out" value={88} className="bg-amber-500"/>
                <Bar label="Transport" value={41} className="bg-sky-500"/>
            </div>
        ),
    },
    {
        title: "Watch spending week by week",
        body: "Every purchase lands in the right category, and weekly totals show when a month starts to drift.",
        icon: LuTrendingUp,
        visual: (
            <div className="flex h-28 items-end gap-2 rounded-xl border border-gray-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                {[42, 68, 51, 90, 63, 38, 74].map((height, index) => (
                    <motion.div
                        key={index}
                        initial={{scaleY: 0}}
                        animate={{scaleY: 1}}
                        transition={{delay: 0.08 + index * 0.05, type: "spring", stiffness: 260, damping: 22}}
                        style={{height: `${height}%`}}
                        className={`flex-1 origin-bottom rounded-t-md ${index === 3 ? "bg-rose-500" : "bg-violet-500/80 dark:bg-violet-400/80"}`}
                    />
                ))}
            </div>
        ),
    },
    {
        title: "Get a Sunday summary",
        body: "One short note each week: what you spent, what is left and one change worth making.",
        icon: LuBell,
        visual: (
            <motion.div
                initial={{y: -16, opacity: 0, scale: 0.96}}
                animate={{y: 0, opacity: 1, scale: 1}}
                transition={{type: "spring", stiffness: 300, damping: 24, delay: 0.1}}
                className="rounded-xl border border-gray-200 bg-white p-3 shadow-lg shadow-gray-900/5 dark:border-slate-700 dark:bg-slate-900"
            >
                <p className="text-[11px] font-medium text-gray-500 dark:text-slate-400">Ledger, now</p>
                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">You have $412 left this month</p>
                <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-slate-400">Dining is 88% used with 9 days to go.</p>
            </motion.div>
        ),
    },
];

interface StepBlockProps {
    step: Step;
    index: number;
    active: boolean;
    root: RefObject<HTMLDivElement>;
    onActive: (index: number) => void;
}

// A step becomes active when it crosses a thin line 65% down the panel, below the sticky visual on phones.
const StepBlock = ({step, index, active, root, onActive}: StepBlockProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, {root, margin: "-65% 0px -35% 0px"});
    const Icon = step.icon;

    useEffect(() => {
        if (inView) onActive(index);
    }, [inView, index, onActive]);

    return (
        <div ref={ref} className="flex min-h-[250px] flex-col justify-center px-5 py-8 sm:min-h-[320px] sm:px-8">
            <div className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-40"}`}>
                <span className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-500 ${active ? "border-violet-500 bg-violet-600 text-white dark:border-violet-400 dark:bg-violet-500" : "border-gray-200 text-gray-500 dark:border-slate-700 dark:text-slate-400"}`}>
                    <Icon className="h-4 w-4" aria-hidden="true"/>
                </span>
                <p className="mt-4 text-xs font-medium text-gray-500 dark:text-slate-500">Step {index + 1} of {steps.length}</p>
                <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">{step.body}</p>
            </div>
        </div>
    );
};

const StickySteps = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const reduceMotion = useReducedMotion();

    return (
        <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div
                ref={containerRef}
                tabIndex={0}
                aria-label="How Ledger works, scroll through the steps"
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
                                        {steps[active].visual}
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
                            <StepBlock key={step.title} step={step} index={index} active={index === active} root={containerRef} onActive={setActive}/>
                        ))}
                        <div className="h-[120px] sm:h-[140px]" aria-hidden="true"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StickySteps;

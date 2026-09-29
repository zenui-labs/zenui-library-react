import {useRef} from "react";
import {motion, useInView, useReducedMotion} from "framer-motion";
import {LuCheck} from "react-icons/lu";

interface BeamProps {
    active: boolean;
    colors: [string, string];
    duration: number;
}

// A conic gradient spins behind the card. The card body covers everything except a thin edge,
// so only a short bright arc is visible as it travels around the border.
const Beam = ({active, colors, duration}: BeamProps) => (
    <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[260%] -translate-x-1/2 -translate-y-1/2"
    >
        <motion.div
            className="h-full w-full"
            style={{background: `conic-gradient(from 0deg, transparent 0deg, transparent 250deg, ${colors[0]} 310deg, ${colors[1]} 345deg, transparent 360deg)`}}
            initial={{rotate: 0}}
            animate={active ? {rotate: 360} : {rotate: 0}}
            transition={active ? {duration, ease: "linear", repeat: Infinity} : {duration: 0}}
        />
    </div>
);

export interface BorderBeamCardProps {
    /** Plan or card title, shown top left. */
    name: string;
    /** Formatted price, for example "$24". */
    price: string;
    description: string;
    perks: string[];
    /** Text after the price. */
    period?: string;
    /** Small pill next to the title. Pass an empty string to hide it. */
    badge?: string;
    actionLabel?: string;
    onAction?: () => void;
    /** Start and end color of the beam. */
    beamColors?: [string, string];
    /** Seconds for one trip around the border. */
    duration?: number;
    className?: string;
}

/** A card with a short beam of light that travels around its border while it is on screen. */
export const BorderBeamCard = ({
    name,
    price,
    description,
    perks,
    period = "per seat / month",
    badge = "Most popular",
    actionLabel = "Start 14-day trial",
    onAction,
    beamColors = ["#6366f1", "#22d3ee"],
    duration = 5,
    className = "",
}: BorderBeamCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const active = inView && !reduceMotion;

    return (
        <div ref={ref} className={`relative w-full max-w-sm ${className}`}>
            {/* Soft glow that follows the beam. */}
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-3xl opacity-40 blur-xl dark:opacity-60">
                <Beam active={active} colors={beamColors} duration={duration}/>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gray-200 p-[1.5px] dark:bg-slate-800">
                <Beam active={active} colors={beamColors} duration={duration}/>

                <div className="relative rounded-[22.5px] bg-white p-7 dark:bg-slate-950">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{name}</h3>
                        {badge && (
                            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                                {badge}
                            </span>
                        )}
                    </div>

                    <p className="mt-5 flex items-baseline gap-1.5">
                        <span className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">{price}</span>
                        {period && <span className="text-sm text-gray-500 dark:text-slate-400">{period}</span>}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">{description}</p>

                    <ul className="mt-6 space-y-3">
                        {perks.map((perk) => (
                            <li key={perk} className="flex items-center gap-3 text-sm text-gray-700 dark:text-slate-300">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white dark:bg-indigo-500">
                                    <LuCheck className="h-3 w-3" aria-hidden="true"/>
                                </span>
                                {perk}
                            </li>
                        ))}
                    </ul>

                    <button
                        type="button"
                        onClick={onAction}
                        className="mt-7 w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
                    >
                        {actionLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

import type {CSSProperties} from "react";

// The keyframes ship with the component, so no global CSS is needed.
const shimmerKeyframes = "@keyframes shimmer { 100% { transform: translateX(100%); } }";

export interface ShineCardSkeletonProps {
    className?: string;
}

/** One card with a light band that sweeps across it. Needs the keyframes from `ShineSkeleton`. */
export const ShineCardSkeleton = ({className = ""}: ShineCardSkeletonProps) => (
    <div
        className={`relative space-y-5 border border-slate-100 dark:border-slate-700 overflow-hidden rounded-2xl bg-white/5 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_var(--shimmer-duration,2s)_infinite] motion-reduce:before:animate-none before:border-t before:border-slate-100/10 before:bg-gradient-to-r before:from-transparent before:via-slate-100/70 dark:before:via-slate-100/10 before:to-transparent ${className}`}
    >
        <div className="h-24 rounded-lg dark:bg-slate-700 bg-slate-100/80"/>
        <div className="space-y-3">
            <div className="h-3 w-3/5 rounded-lg dark:bg-slate-700 bg-slate-100/50"/>
            <div className="h-3 w-4/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"/>
            <div className="h-3 w-2/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"/>
        </div>
    </div>
);

export interface ShineSkeletonProps {
    /** Number of cards in the grid. */
    count?: number;
    /** Seconds for one sweep of the shine. */
    duration?: number;
    /** Text read by screen readers while the content loads. */
    label?: string;
    className?: string;
}

/** A responsive grid of cards with a shimmer that sweeps across the placeholders. */
export const ShineSkeleton = ({count = 3, duration = 2, label = "Loading content", className = ""}: ShineSkeletonProps) => (
    <div
        role="status"
        aria-busy="true"
        className={`grid w-full px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ${className}`}
        style={{"--shimmer-duration": `${duration}s`} as CSSProperties}
    >
        <style>{shimmerKeyframes}</style>
        <span className="sr-only">{label}</span>
        {Array.from({length: count}, (_, index) => (
            <ShineCardSkeleton key={index}/>
        ))}
    </div>
);

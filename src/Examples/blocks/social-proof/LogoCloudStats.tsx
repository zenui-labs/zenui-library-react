import type {ReactNode} from "react";
import {motion, useReducedMotion} from "framer-motion";

export interface CloudLogo {
    name: string;
    /** Icon or SVG shown before the name. Mark it aria-hidden, the name is read instead. */
    mark: ReactNode;
}

export interface CloudStat {
    value: string;
    label: string;
    /** Small print under the label, for example where the number comes from. */
    detail: string;
}

const LogoRow = ({logos, hidden = false}: {logos: CloudLogo[]; hidden?: boolean}) => (
    <ul className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={hidden || undefined}>
        {logos.map((logo) => (
            <li key={logo.name}
                className="flex items-center gap-2 text-slate-400 transition-colors hover:text-slate-900 dark:text-slate-500 dark:hover:text-white">
                {logo.mark}
                <span className="text-lg font-semibold tracking-tight">{logo.name}</span>
            </li>
        ))}
    </ul>
);

export interface LogoCloudStatsProps {
    logos: CloudLogo[];
    /** Numbers for the band under the logos. The grid is laid out for four. */
    stats: CloudStat[];
    title?: string;
    /** Seconds for the logo row to scroll one full loop. */
    duration?: number;
    className?: string;
}

/** A scrolling row of customer logos above a stats band. The row stays still when reduced motion is on. */
export const LogoCloudStats = ({
    logos,
    stats,
    title = "Trusted by product and platform teams at 4,200 companies",
    duration = 32,
    className = "",
}: LogoCloudStatsProps) => {
    const reduceMotion = useReducedMotion();

    return (
        <section className={`w-full bg-white py-16 sm:py-20 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-5xl px-4 sm:px-8">
                <h2 className="text-center text-sm font-medium text-slate-500 dark:text-slate-400">
                    {title}
                </h2>
            </div>

            <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
                <motion.div
                    className="flex w-max"
                    animate={reduceMotion ? undefined : {x: ["0%", "-50%"]}}
                    transition={{duration, ease: "linear", repeat: Infinity}}
                >
                    <LogoRow logos={logos}/>
                    <LogoRow logos={logos} hidden/>
                </motion.div>
            </div>

            <div className="mx-auto mt-14 max-w-5xl px-4 sm:px-8">
                <dl className="grid grid-cols-2 overflow-hidden rounded-3xl border border-slate-200 md:grid-cols-4 dark:border-slate-800">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{opacity: 0, y: 12}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: i * 0.08, duration: 0.5}}
                            className={`relative flex flex-col gap-1 p-6 ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""} border-slate-200 dark:border-slate-800`}
                        >
                            <dt className="order-2 text-sm font-medium text-slate-900 dark:text-white">{stat.label}</dt>
                            <dd className="order-1 bg-gradient-to-br from-slate-900 to-slate-500 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl dark:from-white dark:to-slate-400">
                                {stat.value}
                            </dd>
                            <dd className="order-3 text-xs text-slate-500 dark:text-slate-400">{stat.detail}</dd>
                        </motion.div>
                    ))}
                </dl>
            </div>
        </section>
    );
};

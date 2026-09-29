import {useEffect, useRef, useState} from "react";
import type {ComponentType} from "react";
import {animate, motion, useInView, useReducedMotion} from "framer-motion";
import {LuArrowRight} from "react-icons/lu";

export interface FeatureStat {
    /** The number the counter animates to. */
    value: number;
    /** Digits after the decimal point. Defaults to 0. */
    decimals?: number;
    prefix?: string;
    suffix?: string;
    /** Caption under the number. */
    label: string;
    icon: ComponentType<{className?: string}>;
    title: string;
    body: string;
    /** Values for the small bar chart, 0 to 1. The last bar is highlighted. */
    trend: number[];
}

interface CountUpProps {
    stat: FeatureStat;
    duration: number;
}

const CountUp = ({stat, duration}: CountUpProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, {once: true, amount: 0.6});
    const reduceMotion = useReducedMotion();
    const [display, setDisplay] = useState(0);
    const decimals = stat.decimals ?? 0;

    useEffect(() => {
        if (!inView) return;
        if (reduceMotion) {
            setDisplay(stat.value);
            return;
        }
        const controls = animate(0, stat.value, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => setDisplay(latest),
        });
        return () => controls.stop();
    }, [inView, reduceMotion, stat.value, duration]);

    return (
        <>
            <span className="sr-only">{stat.prefix}{stat.value.toFixed(decimals)}{stat.suffix}</span>
            <span ref={ref} aria-hidden="true" className="tabular-nums">
                {stat.prefix}
                {display.toFixed(decimals)}
                {stat.suffix}
            </span>
        </>
    );
};

const TrendBars = ({values}: {values: number[]}) => (
    <div aria-hidden="true" className="flex h-12 items-end gap-1">
        {values.map((v, i) => (
            <motion.span
                key={i}
                initial={{scaleY: 0}}
                whileInView={{scaleY: 1}}
                viewport={{once: true}}
                transition={{delay: 0.2 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
                style={{height: `${v * 100}%`}}
                className={`w-2 origin-bottom rounded-sm ${i === values.length - 1 ? "bg-lime-500 dark:bg-lime-400" : "bg-slate-900/10 dark:bg-white/20"}`}
            />
        ))}
    </div>
);

export interface StatFeatureCardProps {
    stat: FeatureStat;
    /** Count-up duration in seconds. */
    duration?: number;
}

export const StatFeatureCard = ({stat, duration = 1.6}: StatFeatureCardProps) => {
    const Icon = stat.icon;
    return (
        <article className="flex flex-col bg-white p-6 sm:p-8 dark:bg-slate-950">
            <div className="flex items-start justify-between gap-4">
                <p className="text-5xl font-semibold tracking-tight sm:text-6xl">
                    <CountUp stat={stat} duration={duration}/>
                </p>
                <TrendBars values={stat.trend}/>
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            <div className="my-8 h-px bg-gradient-to-r from-slate-900/10 to-transparent dark:from-white/15"/>
            <h3 className="flex items-center gap-2 font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-lime-500/15 text-lime-700 dark:bg-lime-400/10 dark:text-lime-400">
                    <Icon className="h-4 w-4"/>
                </span>
                {stat.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{stat.body}</p>
        </article>
    );
};

export interface StatsFeaturesProps {
    stats: FeatureStat[];
    eyebrow?: string;
    title?: string;
    ctaLabel?: string;
    ctaHref?: string;
    /** Small print under the grid, for example where the numbers come from. */
    footnote?: string;
    /** Count-up duration in seconds. */
    duration?: number;
    className?: string;
}

/** Headline results that count up when they scroll into view, each paired with the feature behind it. */
export const StatsFeatures = ({
    stats,
    eyebrow = "Last delivery season, by the numbers",
    title = "Fewer miles, more stops, better arrival windows",
    ctaLabel = "Read the 2026 fleet report",
    ctaHref = "#",
    footnote = "Based on 1,140 fleets using Routewise between October 2025 and January 2026, compared with their previous quarter.",
    duration,
    className = "",
}: StatsFeaturesProps) => (
    <section className={`relative w-full overflow-hidden bg-slate-50 px-4 py-16 text-slate-900 sm:px-8 dark:bg-slate-950 dark:text-white sm:py-24 ${className}`}>
        <div aria-hidden="true"
             className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-lime-300/30 blur-3xl dark:bg-lime-400/10"/>
        <div aria-hidden="true"
             className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgb(15_23_42_/_0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(15_23_42_/_0.05)_1px,transparent_1px)] dark:opacity-40 dark:[background-image:linear-gradient(rgb(255_255_255_/_0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"/>

        <div className="relative mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div className="max-w-2xl">
                    {eyebrow && <p className="text-sm font-medium text-lime-700 dark:text-lime-400">{eyebrow}</p>}
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
                </div>
                {ctaLabel && (
                    <a
                        href={ctaHref}
                        className="group inline-flex w-fit items-center gap-2 rounded-full border border-slate-900/15 bg-white px-4 py-2 text-sm font-medium text-slate-900 outline-none transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-lime-500 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-lime-400"
                    >
                        {ctaLabel}
                        <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
                    </a>
                )}
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-slate-900/10 shadow-xl shadow-slate-900/5 lg:grid-cols-3 dark:bg-white/10 dark:shadow-none">
                {stats.map((stat) => <StatFeatureCard key={stat.label} stat={stat} duration={duration}/>)}
            </div>

            {footnote && <p className="mt-6 text-xs text-slate-500 dark:text-slate-500">{footnote}</p>}
        </div>
    </section>
);

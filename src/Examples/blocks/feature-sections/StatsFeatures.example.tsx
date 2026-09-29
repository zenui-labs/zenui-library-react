import {useEffect, useRef, useState} from "react";
import type {ReactNode} from "react";
import {animate, motion, useInView, useReducedMotion} from "framer-motion";
import {LuArrowRight, LuClock, LuLeaf, LuTruck} from "react-icons/lu";

interface Stat {
    value: number;
    decimals: number;
    prefix?: string;
    suffix: string;
    label: string;
    icon: ReactNode;
    title: string;
    body: string;
    // Weekly values for the small bar chart, 0 to 1.
    trend: number[];
}

const stats: Stat[] = [
    {
        value: 31,
        decimals: 0,
        suffix: "%",
        label: "fewer miles driven",
        icon: <LuLeaf className="h-4 w-4"/>,
        title: "Routes that adapt to the day",
        body: "Routewise re-plans every van when traffic, weather or a late pickup changes the picture, instead of once each morning.",
        trend: [0.35, 0.42, 0.4, 0.55, 0.6, 0.72, 0.8, 0.86],
    },
    {
        value: 2.4,
        decimals: 1,
        suffix: "M",
        label: "stops planned each week",
        icon: <LuTruck className="h-4 w-4"/>,
        title: "Built for fleets of any size",
        body: "Plan 12 vans or 4,000 across depots with capacity, skills and time windows, and get a plan back in under 20 seconds.",
        trend: [0.5, 0.55, 0.52, 0.6, 0.66, 0.7, 0.78, 0.92],
    },
    {
        value: 6,
        decimals: 0,
        prefix: "±",
        suffix: " min",
        label: "arrival accuracy",
        icon: <LuClock className="h-4 w-4"/>,
        title: "Arrival times customers believe",
        body: "Live ETAs learn from each driver's real pace, so the window in the text message is the window the doorbell rings.",
        trend: [0.9, 0.8, 0.74, 0.6, 0.52, 0.44, 0.38, 0.3],
    },
];

const CountUp = ({stat}: {stat: Stat}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, {once: true, amount: 0.6});
    const reduceMotion = useReducedMotion();
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        if (reduceMotion) {
            setDisplay(stat.value);
            return;
        }
        const controls = animate(0, stat.value, {
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => setDisplay(latest),
        });
        return () => controls.stop();
    }, [inView, reduceMotion, stat.value]);

    return (
        <>
            <span className="sr-only">{stat.prefix}{stat.value.toFixed(stat.decimals)}{stat.suffix}</span>
            <span ref={ref} aria-hidden="true" className="tabular-nums">
                {stat.prefix}
                {display.toFixed(stat.decimals)}
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

const StatsFeatures = () => (
    <section className="relative w-full overflow-hidden bg-slate-50 px-4 py-16 text-slate-900 sm:px-8 dark:bg-slate-950 dark:text-white sm:py-24">
        <div aria-hidden="true"
             className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-lime-300/30 blur-3xl dark:bg-lime-400/10"/>
        <div aria-hidden="true"
             className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgb(15_23_42_/_0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(15_23_42_/_0.05)_1px,transparent_1px)] dark:opacity-40 dark:[background-image:linear-gradient(rgb(255_255_255_/_0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"/>

        <div className="relative mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div className="max-w-2xl">
                    <p className="text-sm font-medium text-lime-700 dark:text-lime-400">Last delivery season, by the numbers</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
                        Fewer miles, more stops, better arrival windows
                    </h2>
                </div>
                <a
                    href="#"
                    className="group inline-flex w-fit items-center gap-2 rounded-full border border-slate-900/15 bg-white px-4 py-2 text-sm font-medium text-slate-900 outline-none transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-lime-500 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-lime-400"
                >
                    Read the 2026 fleet report
                    <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
                </a>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-slate-900/10 shadow-xl shadow-slate-900/5 lg:grid-cols-3 dark:bg-white/10 dark:shadow-none">
                {stats.map((stat) => (
                    <article key={stat.label} className="flex flex-col bg-white p-6 sm:p-8 dark:bg-slate-950">
                        <div className="flex items-start justify-between gap-4">
                            <p className="text-5xl font-semibold tracking-tight sm:text-6xl">
                                <CountUp stat={stat}/>
                            </p>
                            <TrendBars values={stat.trend}/>
                        </div>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                        <div className="my-8 h-px bg-gradient-to-r from-slate-900/10 to-transparent dark:from-white/15"/>
                        <h3 className="flex items-center gap-2 font-semibold">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-lime-500/15 text-lime-700 dark:bg-lime-400/10 dark:text-lime-400">{stat.icon}</span>
                            {stat.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{stat.body}</p>
                    </article>
                ))}
            </div>

            <p className="mt-6 text-xs text-slate-500 dark:text-slate-500">
                Based on 1,140 fleets using Routewise between October 2025 and January 2026, compared with their previous quarter.
            </p>
        </div>
    </section>
);

export default StatsFeatures;

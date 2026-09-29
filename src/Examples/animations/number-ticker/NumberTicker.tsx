import {useEffect, useRef, useState} from "react";
import {animate, useInView} from "framer-motion";

export interface NumberTickerProps {
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    /** Count-up length in seconds. */
    duration?: number;
    /** Locale used to group digits, for example "de-DE". */
    locale?: string;
    className?: string;
}

// Counts up from zero the first time the number scrolls into view.
export const NumberTicker = ({
    value,
    prefix = "",
    suffix = "",
    decimals = 0,
    duration = 1.8,
    locale = "en-US",
    className = "",
}: NumberTickerProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, {once: true});
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, value, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => setDisplay(latest),
        });
        return () => controls.stop();
    }, [inView, value, duration]);

    return (
        <span ref={ref} className={`tabular-nums ${className}`}>
            {prefix}
            {display.toLocaleString(locale, {minimumFractionDigits: decimals, maximumFractionDigits: decimals})}
            {suffix}
        </span>
    );
};

export interface Stat {
    label: string;
    value: number;
    /** Text before the number, such as a currency sign. */
    prefix?: string;
    /** Text after the number, such as "%" or "k". */
    suffix?: string;
    decimals?: number;
}

export interface StatCounterProps {
    stat: Stat;
    duration?: number;
}

export const StatCounter = ({stat, duration}: StatCounterProps) => (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-gray-500 dark:text-slate-400">{stat.label}</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            <NumberTicker
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
                duration={duration}
            />
        </p>
    </div>
);

export interface StatCountersProps {
    items: Stat[];
    /** Count-up length in seconds for every card. */
    duration?: number;
    className?: string;
}

/** A row of stat cards whose numbers count up once when they scroll into view. */
export const StatCounters = ({items, duration, className = ""}: StatCountersProps) => (
    <div className={`grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3 ${className}`}>
        {items.map((stat) => (
            <StatCounter key={stat.label} stat={stat} duration={duration}/>
        ))}
    </div>
);

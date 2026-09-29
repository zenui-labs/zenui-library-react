import {useEffect, useRef, useState} from "react";
import {animate, useInView} from "framer-motion";

interface TickerProps {
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
}

// Counts up from zero the first time the number scrolls into view.
const Ticker = ({value, prefix = "", suffix = "", decimals = 0}: TickerProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, {once: true});
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, value, {
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => setDisplay(latest),
        });
        return () => controls.stop();
    }, [inView, value]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}
            {display.toLocaleString("en-US", {minimumFractionDigits: decimals, maximumFractionDigits: decimals})}
            {suffix}
        </span>
    );
};

const stats = [
    {label: "Monthly revenue", value: 48250, prefix: "$"},
    {label: "Active users", value: 12.8, suffix: "k", decimals: 1},
    {label: "Uptime", value: 99.98, suffix: "%", decimals: 2},
];

const NumberTicker = () => {
    return (
        <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
                <div key={stat.label}
                     className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
                    <p className="text-sm text-gray-500 dark:text-slate-400">{stat.label}</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        <Ticker {...stat}/>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default NumberTicker;

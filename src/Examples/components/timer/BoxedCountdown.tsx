import {useEffect, useRef, useState} from "react";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** A Date, a timestamp in milliseconds or a date string such as "2026-12-31T23:59:59". */
export type CountdownTarget = Date | number | string;

export interface CountdownLabels {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}

const defaultLabels: CountdownLabels = {days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds"};

// Milliseconds left until the target, never below zero. An invalid date counts as zero.
const msLeft = (targetTime: number) => {
    const difference = targetTime - Date.now();
    return difference > 0 ? difference : 0;
};

// Ticks once a second, stops at zero and calls onComplete once per target.
const useCountdown = (target: CountdownTarget, onComplete?: () => void) => {
    const targetTime = new Date(target).getTime();
    const [remaining, setRemaining] = useState(() => msLeft(targetTime));
    const onCompleteRef = useRef(onComplete);
    const completedFor = useRef<number | null>(null);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        const tick = () => {
            const next = msLeft(targetTime);
            setRemaining(next);
            if (next > 0) return;
            window.clearInterval(timer);
            if (completedFor.current !== targetTime) {
                completedFor.current = targetTime;
                onCompleteRef.current?.();
            }
        };
        const timer = window.setInterval(tick, SECOND);
        tick();
        return () => window.clearInterval(timer);
    }, [targetTime]);

    return remaining;
};

const split = (remaining: number) => ({
    days: Math.floor(remaining / DAY),
    hours: Math.floor((remaining % DAY) / HOUR),
    minutes: Math.floor((remaining % HOUR) / MINUTE),
    seconds: Math.floor((remaining % MINUTE) / SECOND),
});

const pad = (value: number) => String(value).padStart(2, "0");

const UNITS = ["days", "hours", "minutes", "seconds"] as const;

// What screen readers hear, for example "3 days, 7 hours, 42 minutes, 18 seconds".
const describe = (parts: ReturnType<typeof split>, labels: CountdownLabels) =>
    UNITS.map((unit) => `${parts[unit]} ${labels[unit].toLowerCase()}`).join(", ");

export interface BoxedCountdownProps {
    /** The moment the countdown reaches zero. */
    target: CountdownTarget;
    /** Names under each number. */
    labels?: Partial<CountdownLabels>;
    /** Called once when the countdown reaches zero. */
    onComplete?: () => void;
    className?: string;
}

/** Days, hours, minutes and seconds in tinted boxes with a small label underneath. */
export const BoxedCountdown = ({target, labels, onComplete, className = ""}: BoxedCountdownProps) => {
    const parts = split(useCountdown(target, onComplete));
    const text = {...defaultLabels, ...labels};

    return (
        <div role="timer" aria-label={describe(parts, text)} className={`grid grid-cols-4 gap-[10px] mt-2 ${className}`}>
            {UNITS.map((unit) => (
                <div key={unit} aria-hidden="true" className="flex items-center justify-center flex-col gap-[0.2rem]">
                    <span className="py-2 px-3 dark:bg-slate-700 dark:text-[#abc2d3] bg-[#d2f1f7] text-[1.9rem] font-semibold">{pad(parts[unit])}</span>
                    <span className="text-[0.7rem]">{text[unit]}</span>
                </div>
            ))}
        </div>
    );
};

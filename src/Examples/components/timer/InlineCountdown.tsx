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

export interface InlineCountdownProps {
    /** The moment the countdown reaches zero. */
    target: CountdownTarget;
    /** Short marks after days, hours and minutes. Seconds show without one. */
    suffixes?: Partial<Record<"days" | "hours" | "minutes", string>>;
    /** Full unit names that screen readers hear. */
    labels?: Partial<CountdownLabels>;
    /** Called once when the countdown reaches zero. */
    onComplete?: () => void;
    className?: string;
}

const defaultSuffixes = {days: "d", hours: "h", minutes: "m"};

/** A compact one-line countdown: large days, hours and minutes with short marks, then smaller seconds. */
export const InlineCountdown = ({target, suffixes, labels, onComplete, className = ""}: InlineCountdownProps) => {
    const parts = split(useCountdown(target, onComplete));
    const marks = {...defaultSuffixes, ...suffixes};
    const text = {...defaultLabels, ...labels};

    return (
        <div role="timer" aria-label={describe(parts, text)} className={`flex items-end gap-[5px] p-4 ${className}`}>
            {(["days", "hours", "minutes"] as const).map((unit) => (
                <div key={unit} aria-hidden="true" className="flex items-end gap-[1px]">
                    <span className="text-[2.5rem] dark:text-[#abc2d3] sm:text-[3rem] leading-[45px] sm:leading-[50px] font-semibold text-gray-900">
                        {pad(parts[unit])}
                    </span>
                    <span className="text-[1.3rem] font-semibold text-orange-500">{marks[unit]}</span>
                </div>
            ))}
            <span aria-hidden="true" className="text-[1.3rem] dark:text-[#abc2d3] font-semibold text-gray-900">{pad(parts.seconds)}</span>
        </div>
    );
};

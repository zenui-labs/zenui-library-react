import {Fragment, useEffect, useRef, useState} from "react";

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

/** One part of the countdown. */
export type CountdownUnit = keyof CountdownLabels;

const UNIT_MS: Record<CountdownUnit, number> = {days: DAY, hours: HOUR, minutes: MINUTE, seconds: SECOND};
const NEXT_UP: Record<CountdownUnit, number> = {days: Infinity, hours: DAY, minutes: HOUR, seconds: MINUTE};

// The first unit shown also counts the larger units that are left out, so two days read as 48 hours.
const unitValue = (remaining: number, unit: CountdownUnit, leading: boolean) =>
    Math.floor((leading ? remaining : remaining % NEXT_UP[unit]) / UNIT_MS[unit]);

const pad = (value: number) => String(value).padStart(2, "0");

const describe = (remaining: number, units: CountdownUnit[], labels: CountdownLabels) =>
    units.map((unit, index) => `${unitValue(remaining, unit, index === 0)} ${labels[unit].toLowerCase()}`).join(", ");

export interface SplitDigitCountdownProps {
    /** The moment the countdown reaches zero. */
    target: CountdownTarget;
    /** Units to show, largest first. The first one also counts any larger units left out. */
    units?: CountdownUnit[];
    /** Names under each group of digits. */
    labels?: Partial<CountdownLabels>;
    /** Called once when the countdown reaches zero. */
    onComplete?: () => void;
    className?: string;
}

const defaultUnits: CountdownUnit[] = ["hours", "minutes", "seconds"];

/** Each digit on its own white tile over a gradient, with colons between hours, minutes and seconds. */
export const SplitDigitCountdown = ({
    target,
    units = defaultUnits,
    labels,
    onComplete,
    className = "",
}: SplitDigitCountdownProps) => {
    const remaining = useCountdown(target, onComplete);
    const text = {...defaultLabels, ...labels};

    return (
        <div
            role="timer"
            aria-label={describe(remaining, units, text)}
            className={`bg-gradient-to-b from-[#4c468f] to-[#c65f72] w-full py-12 rounded-md ${className}`}
        >
            <div aria-hidden="true" className="flex items-start gap-[5px] sm:gap-[15px] justify-center">
                {units.map((unit, index) => (
                    <Fragment key={unit}>
                        {index > 0 && <span className="text-[2.3rem] text-white sm:mt-1">:</span>}
                        <div className="flex items-center justify-center flex-col gap-[0.5rem]">
                            <div className="flex items-center gap-[8px]">
                                {pad(unitValue(remaining, unit, index === 0)).split("").map((digit, digitIndex) => (
                                    <span
                                        key={digitIndex}
                                        className="bg-white sm:px-4 py-3 w-[35px] sm:w-[50px] text-center rounded-sm text-gray-900 font-normal text-[1rem] sm:text-[2rem]"
                                    >
                                        {digit}
                                    </span>
                                ))}
                            </div>
                            <span className="text-white font-normal text-[0.8rem] sm:text-[0.9rem]">{text[unit]}</span>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

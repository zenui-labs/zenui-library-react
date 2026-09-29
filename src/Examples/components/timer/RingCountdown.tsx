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

/** One part of the countdown. */
export type CountdownUnit = keyof CountdownLabels;

const UNIT_MS: Record<CountdownUnit, number> = {days: DAY, hours: HOUR, minutes: MINUTE, seconds: SECOND};
const NEXT_UP: Record<CountdownUnit, number> = {days: Infinity, hours: DAY, minutes: HOUR, seconds: MINUTE};

// The first unit shown also counts the larger units that are left out, so two days read as 48 hours.
const unitValue = (remaining: number, unit: CountdownUnit, leading: boolean) =>
    Math.floor((leading ? remaining : remaining % NEXT_UP[unit]) / UNIT_MS[unit]);

const describe = (remaining: number, units: CountdownUnit[], labels: CountdownLabels) =>
    units.map((unit, index) => `${unitValue(remaining, unit, index === 0)} ${labels[unit].toLowerCase()}`).join(", ");

// A full ring for each unit. Days fill over a year.
const RING_MAX: Record<CountdownUnit, number> = {days: 365, hours: 24, minutes: 60, seconds: 60};

export interface CountdownRingProps {
    value: number;
    /** The value that fills the ring completely. Larger values show a full ring. */
    max: number;
    label: string;
    /** Width and height in px. */
    size?: number;
    strokeWidth?: number;
    /** Ring and number color. */
    color?: string;
}

/** A circular progress ring with a number and label in the middle. */
export const CountdownRing = ({value, max, label, size = 100, strokeWidth = 7, color = "#17b4d3"}: CountdownRingProps) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = max > 0 ? Math.min(value / max, 1) : 0;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <div className="relative" style={{width: size, height: size}}>
            {/* Background circle */}
            <svg aria-hidden="true" className="absolute top-0 left-0" width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke="#e5e5e5"
                    className="dark:stroke-[#1e293b]"
                    strokeWidth={strokeWidth}
                />
            </svg>

            {/* Progress circle */}
            <svg aria-hidden="true" className="absolute top-0 left-0" width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{
                        transition: "stroke-dashoffset 1s linear",
                        transform: "rotate(-90deg)",
                        transformOrigin: "50% 50%",
                    }}
                />
            </svg>

            {/* Time display */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                <div className="text-[1.2rem] font-semibold" style={{color}}>{value}</div>
                <div className="text-[0.6rem] text-gray-500">{label}</div>
            </div>
        </div>
    );
};

export interface RingCountdownProps {
    /** The moment the countdown reaches zero. */
    target: CountdownTarget;
    /** Units to show, largest first. The first one also counts any larger units left out. */
    units?: CountdownUnit[];
    /** Names inside each ring. */
    labels?: Partial<CountdownLabels>;
    /** Width and height of each ring in px. */
    size?: number;
    strokeWidth?: number;
    /** Ring and number color. */
    color?: string;
    /** Called once when the countdown reaches zero. */
    onComplete?: () => void;
    className?: string;
}

const defaultUnits: CountdownUnit[] = ["hours", "minutes", "seconds"];

/** A countdown where each unit is a ring that empties as its value drops. */
export const RingCountdown = ({
    target,
    units = defaultUnits,
    labels,
    size,
    strokeWidth,
    color,
    onComplete,
    className = "",
}: RingCountdownProps) => {
    const remaining = useCountdown(target, onComplete);
    const text = {...defaultLabels, ...labels};

    return (
        <div
            role="timer"
            aria-label={describe(remaining, units, text)}
            className={`flex flex-wrap justify-center items-center space-x-6 p-4 ${className}`}
        >
            {units.map((unit, index) => (
                <div key={unit} aria-hidden="true">
                    <CountdownRing
                        value={unitValue(remaining, unit, index === 0)}
                        max={RING_MAX[unit]}
                        label={text[unit]}
                        size={size}
                        strokeWidth={strokeWidth}
                        color={color}
                    />
                </div>
            ))}
        </div>
    );
};

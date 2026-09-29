import {useEffect, useState} from "react";
import {motion, useReducedMotion} from "framer-motion";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const split = (remaining: number) => ({
    days: Math.floor(remaining / DAY),
    hours: Math.floor((remaining % DAY) / HOUR),
    minutes: Math.floor((remaining % HOUR) / MINUTE),
    seconds: Math.floor((remaining % MINUTE) / SECOND),
});

const halfClass = "absolute inset-x-0 h-1/2 overflow-hidden bg-white dark:bg-slate-800";
const digitClass = "absolute inset-x-0 flex h-[200%] items-center justify-center";

interface FlipDigitProps {
    digit: string;
}

// A split-flap digit. When the value changes, the top half of the old digit folds down
// and the bottom half of the new digit swings into place behind it.
const FlipDigit = ({digit}: FlipDigitProps) => {
    const reduceMotion = useReducedMotion();
    const [current, setCurrent] = useState(digit);
    const [previous, setPrevious] = useState(digit);

    if (digit !== current) {
        setPrevious(current);
        setCurrent(digit);
    }

    const flipping = previous !== current && !reduceMotion;

    return (
        <div className="relative h-14 w-9 rounded-lg text-3xl font-semibold tabular-nums text-gray-900 shadow-sm [perspective:300px] dark:text-white sm:h-20 sm:w-14 sm:text-5xl">
            {/* Static top shows the new digit, static bottom shows the old one until the flap covers it. */}
            <div className={`${halfClass} top-0 rounded-t-lg`}>
                <span className={`${digitClass} top-0`}>{current}</span>
            </div>
            <div className={`${halfClass} bottom-0 rounded-b-lg`}>
                <span className={`${digitClass} bottom-0`}>{reduceMotion ? current : previous}</span>
            </div>

            {flipping && (
                <>
                    <motion.div
                        key={`top-${current}`}
                        className={`${halfClass} top-0 origin-bottom rounded-t-lg [backface-visibility:hidden]`}
                        initial={{rotateX: 0}}
                        animate={{rotateX: -90}}
                        transition={{duration: 0.3, ease: "easeIn"}}
                    >
                        <span className={`${digitClass} top-0`}>{previous}</span>
                    </motion.div>
                    <motion.div
                        key={`bottom-${current}`}
                        className={`${halfClass} bottom-0 origin-top rounded-b-lg [backface-visibility:hidden]`}
                        initial={{rotateX: 90}}
                        animate={{rotateX: 0}}
                        transition={{duration: 0.3, delay: 0.3, ease: "easeOut"}}
                    >
                        <span className={`${digitClass} bottom-0`}>{current}</span>
                    </motion.div>
                </>
            )}

            {/* Hinge line across the middle. */}
            <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gray-200 dark:bg-slate-950"/>
        </div>
    );
};

interface UnitProps {
    value: number;
    label: string;
}

const Unit = ({value, label}: UnitProps) => {
    const digits = String(value).padStart(2, "0").split("");
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
                {digits.map((digit, index) => (
                    <FlipDigit key={index} digit={digit}/>
                ))}
            </div>
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-slate-400">{label}</span>
        </div>
    );
};

const FlipCountdown = () => {
    // Launch is set a few days ahead of when the example first renders.
    const [target] = useState(() => Date.now() + 3 * DAY + 7 * HOUR + 42 * MINUTE + 18 * SECOND);
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const timer = window.setInterval(() => setNow(Date.now()), 250);
        return () => window.clearInterval(timer);
    }, []);

    const {days, hours, minutes, seconds} = split(Math.max(0, target - now));

    return (
        <div className="flex flex-col items-center rounded-3xl border border-gray-200 bg-gray-50 px-5 py-8 dark:border-slate-800 dark:bg-slate-900 sm:px-10">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Doors open for early access in</p>
            <div
                role="timer"
                aria-label={`${days} days, ${hours} hours and ${minutes} minutes`}
                className="mt-6 flex items-start gap-2 sm:gap-5"
            >
                <Unit value={days} label="Days"/>
                <Unit value={hours} label="Hours"/>
                <Unit value={minutes} label="Minutes"/>
                <Unit value={seconds} label="Seconds"/>
            </div>
        </div>
    );
};

export default FlipCountdown;

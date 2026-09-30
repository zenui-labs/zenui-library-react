import {useEffect, useId, useRef, useState} from "react";
import {useInView, useReducedMotion} from "framer-motion";

export interface NixieClockProps {
    /** 24 hour time. In 12 hour mode the leading hour tube goes dark before 10, as on real clocks. */
    hour24?: boolean;
    showSeconds?: boolean;
    /** Label engraved on the plinth. */
    label?: string;
    className?: string;
}

// Numerals drawn as single wire strokes in a 40 x 64 box, the way the cathodes are bent in an IN-14 tube.
const NUMERALS: Record<number, string> = {
    0: "M20 4C31 4 35.5 16 35.5 32S31 60 20 60 4.5 48 4.5 32 9 4 20 4Z",
    1: "M13 13 21.5 4V60",
    2: "M6 16C6 8 12 4 20 4S34 9 34 17C34 27 26 34 6 60H35",
    3: "M6 4H34L19 26C29 25 35 32 35 42S28 60 19 60C12 60 7 57 5 52",
    4: "M28 60V4L4 44H37",
    5: "M33 4H9L7 28C11 25 15 24 20 24 29 24 35 31 35 41S28 60 19 60C12 60 7 57 5 52",
    6: "M30 6C27 4.7 24 4 21 4 11 4 5 15 5 36 5 51 11 60 20 60S35 53 35 43 29 27 20 27C13 27 7 31 5 38",
    7: "M4 4H36L14 60",
    8: "M20 30C12 30 7 25 7 17S12 4 20 4 33 9 33 17 28 30 20 30C11 30 5 36 5 45S11 60 20 60 35 54 35 45 29 30 20 30Z",
    9: "M10 58C13 59.3 16 60 19 60 29 60 35 49 35 28 35 13 29 4 20 4S5 11 5 21 11 37 20 37C27 37 33 33 35 26",
};

// Cathodes are stacked front to back in this order, so the back ones sit a touch smaller and dimmer.
const STACK = [1, 6, 2, 7, 5, 0, 4, 9, 8, 3];

interface TubeProps {
    /** Lit digit, or null for a dark tube. */
    digit: number | null;
    filterId: string;
    /** Staggers the flicker so tubes do not pulse in sync. */
    index: number;
}

const Tube = ({digit, filterId, index}: TubeProps) => (
    <div className="relative aspect-[5/11] min-w-0 flex-1" style={{maxWidth: 62}}>
        {/* Glass envelope with its domed top and the pinched exhaust tip. */}
        <div className="absolute inset-x-0 bottom-[9%] top-0 overflow-hidden rounded-t-[999px] rounded-b-[14%] bg-[radial-gradient(120%_70%_at_50%_45%,rgba(255,120,40,0.08),rgba(20,12,8,0.55)_70%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),inset_0_-10px_18px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,0,0,0.35)]">
            <div className="absolute left-1/2 top-0 h-[5%] w-[16%] -translate-x-1/2 rounded-b-full bg-white/15"/>

            <svg viewBox="-6 -14 52 92" className="absolute inset-x-[6%] top-[12%] h-[74%] w-[88%] overflow-visible" preserveAspectRatio="xMidYMid meet">
                {/* Unlit cathodes: dull metal, visible behind the lit one like in a real tube. */}
                {STACK.slice().reverse().map((value) => {
                    const depth = STACK.indexOf(value);
                    const scale = 1 - depth * 0.014;
                    return (
                        <path
                            key={`off-${value}`}
                            d={NUMERALS[value]}
                            fill="none"
                            stroke="#a07a5c"
                            strokeOpacity={0.2 - depth * 0.009}
                            strokeWidth={1.4}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            transform={`translate(${20 * (1 - scale)} ${32 * (1 - scale)}) scale(${scale})`}
                        />
                    );
                })}
                {/* Lit cathodes. All ten stay mounted so switching crossfades, with the slow fade-out that gives the ghosting of real tubes. */}
                <g className="nixie-flicker" style={{animationDelay: `${index * -0.37}s`, animationDuration: `${2.3 + (index % 3) * 0.6}s`}}>
                    {STACK.map((value) => {
                        const depth = STACK.indexOf(value);
                        const scale = 1 - depth * 0.014;
                        const lit = digit === value;
                        return (
                            <g
                                key={`on-${value}`}
                                transform={`translate(${20 * (1 - scale)} ${32 * (1 - scale)}) scale(${scale})`}
                                style={{opacity: lit ? 1 : 0, transition: lit ? "opacity 40ms linear" : "opacity 180ms ease-out"}}
                            >
                                <path d={NUMERALS[value]} fill="none" stroke="#ff6a14" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" filter={`url(#${filterId})`}/>
                                <path d={NUMERALS[value]} fill="none" stroke="#ff9a3d" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"/>
                                <path d={NUMERALS[value]} fill="none" stroke="#ffe3bf" strokeWidth={0.9} strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                        );
                    })}
                </g>
            </svg>

            {/* The hexagonal anode mesh in front of the digits. */}
            <div className="absolute inset-0 opacity-50 [background-image:repeating-linear-gradient(60deg,rgba(0,0,0,0.5)_0_0.5px,transparent_0.5px_4px),repeating-linear-gradient(-60deg,rgba(0,0,0,0.5)_0_0.5px,transparent_0.5px_4px),repeating-linear-gradient(0deg,rgba(0,0,0,0.35)_0_0.5px,transparent_0.5px_3.5px)]"/>
            {/* Curved glass highlights: a hard streak on the left, a soft one on the right. */}
            <div className="absolute bottom-[8%] left-[12%] top-[10%] w-[9%] rounded-full bg-gradient-to-b from-white/35 via-white/10 to-transparent blur-[0.5px]"/>
            <div className="absolute bottom-[20%] right-[10%] top-[14%] w-[5%] rounded-full bg-gradient-to-b from-white/15 to-transparent"/>
        </div>
        {/* Bakelite socket. */}
        <div className="absolute inset-x-[6%] bottom-0 h-[11%] rounded-b-md rounded-t-sm bg-gradient-to-b from-[#2a2522] to-[#0f0d0c] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]"/>
        {/* Orange light pooling on the plinth under the tube. */}
        <div
            className="pointer-events-none absolute -bottom-[6%] left-1/2 h-[10%] w-[120%] -translate-x-1/2 rounded-[50%] bg-orange-500/30 blur-md transition-opacity duration-200"
            style={{opacity: digit === null ? 0 : 1}}
        />
    </div>
);

// A pair of INS-1 neon bulbs between hours, minutes and seconds.
const Separator = ({on}: {on: boolean}) => (
    <div className="flex shrink-0 flex-col items-center justify-center gap-3 self-stretch pb-[4%] sm:gap-5">
        {[0, 1].map((dot) => (
            <span
                key={dot}
                className="block aspect-[1/2] w-[7px] rounded-full border border-white/20 transition-[background-color,box-shadow] duration-150 sm:w-[9px]"
                style={{
                    backgroundColor: on ? "#ff7a3a" : "rgba(80,40,30,0.5)",
                    boxShadow: on ? "0 0 6px 2px rgba(255,90,40,0.6), 0 0 14px 4px rgba(255,80,20,0.25)" : "none",
                }}
            />
        ))}
    </div>
);

const digitsFor = (date: Date, hour24: boolean, showSeconds: boolean): (number | null)[] => {
    const raw = date.getHours();
    const hours = hour24 ? raw : raw % 12 || 12;
    const parts = [hours, date.getMinutes(), ...(showSeconds ? [date.getSeconds()] : [])];
    const digits = parts.flatMap((value) => [Math.floor(value / 10), value % 10]) as (number | null)[];
    if (!hour24 && hours < 10) digits[0] = null;
    return digits;
};

/**
 * A six-tube Nixie clock. Every minute it runs the cathode-poisoning cycle: each tube spins through all ten
 * numerals like a slot machine before settling, left to right. The brass button runs the cycle on demand.
 */
export const NixieClock = ({hour24 = true, showSeconds = true, label = "IN-14 × 6", className = ""}: NixieClockProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion() ?? false;
    const filterId = `nixie-${useId().replace(/:/g, "")}`;
    const [now, setNow] = useState(() => new Date());
    const [spin, setSpin] = useState<(number | null)[] | null>(null);
    const spinTimer = useRef(0);

    useEffect(() => {
        let timer = 0;
        const tick = () => {
            setNow(new Date());
            // Tick on every half second so the neon separators can blink at 1 Hz.
            timer = window.setTimeout(tick, 500 - (Date.now() % 500) + 5);
        };
        tick();
        return () => window.clearTimeout(timer);
    }, []);

    const actual = digitsFor(now, hour24, showSeconds);
    const tubes = actual.length;

    // Each tube cycles through every numeral for a while, then locks. Later tubes lock later, so the settle
    // travels across the clock.
    const runCycle = () => {
        if (reduceMotion) return;
        window.clearInterval(spinTimer.current);
        const start = performance.now();
        spinTimer.current = window.setInterval(() => {
            const elapsed = performance.now() - start;
            const frame = Math.floor(elapsed / 55);
            const next = Array.from({length: tubes}, (_, index) => (elapsed > 650 + index * 170 ? null : (frame + index * 3) % 10));
            if (next.every((value) => value === null)) {
                window.clearInterval(spinTimer.current);
                setSpin(null);
            } else {
                setSpin(next);
            }
        }, 55);
    };

    // Effects call the latest runCycle through a ref, so they only re-run when the minute or visibility changes.
    const cycleRef = useRef(runCycle);
    cycleRef.current = runCycle;

    const minute = now.getMinutes();
    const lastMinute = useRef(minute);
    useEffect(() => {
        if (minute !== lastMinute.current && inView) cycleRef.current();
        lastMinute.current = minute;
    }, [minute, inView]);

    // Spin once the first time the clock scrolls into view, so the cycle is not a once-a-minute secret.
    const greeted = useRef(false);
    useEffect(() => {
        if (!inView || greeted.current) return;
        greeted.current = true;
        cycleRef.current();
    }, [inView]);

    useEffect(() => () => window.clearInterval(spinTimer.current), []);

    const shown = actual.map((digit, index) => (spin && spin[index] !== null ? spin[index] : digit));
    const colonOn = reduceMotion || now.getMilliseconds() < 500;
    const timeText = now.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: !hour24});

    const groups = showSeconds ? [0, 2, 4] : [0, 2];

    return (
        <div
            ref={ref}
            className={`relative w-full max-w-xl overflow-hidden rounded-[22px] bg-gradient-to-b from-[#c79a6b] to-[#9c6d44] p-[10px] shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_30px_50px_-30px_rgba(80,40,10,0.6)] dark:from-[#3b2718] dark:to-[#1f140c] dark:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_30px_60px_-30px_rgba(0,0,0,0.9)] ${className}`}
        >
            <style>{`
                @keyframes nixie-flicker { 0%, 100% { opacity: 1; } 41% { opacity: 1; } 42% { opacity: 0.86; } 43% { opacity: 1; } 71% { opacity: 0.97; } 72% { opacity: 0.9; } 74% { opacity: 1; } }
                .nixie-flicker { animation: nixie-flicker 2.6s steps(1, end) infinite; }
                .nixie-paused .nixie-flicker { animation-play-state: paused; }
                @media (prefers-reduced-motion: reduce) { .nixie-flicker { animation: none; } }
            `}</style>
            <svg aria-hidden="true" className="absolute h-0 w-0">
                <defs>
                    <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3.2"/>
                    </filter>
                </defs>
            </svg>

            {/* Wood grain: long uneven stripes, multiplied into the case colour. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply [background-image:repeating-linear-gradient(88deg,transparent_0_7px,rgba(90,50,20,0.35)_7px_8px,transparent_8px_19px,rgba(90,50,20,0.2)_19px_21px),repeating-linear-gradient(92deg,transparent_0_31px,rgba(60,30,10,0.25)_31px_33px)] dark:opacity-60"
            />
            <div className="relative overflow-hidden rounded-[14px] bg-[#1a120d] px-3 pb-5 pt-6 shadow-[inset_0_2px_10px_rgba(0,0,0,0.7)] sm:px-6 sm:pt-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(255,110,30,0.10),transparent_70%)]"/>
                <div aria-hidden="true" className={`relative flex items-end justify-center gap-[1.5%] ${inView ? "" : "nixie-paused"}`}>
                    {groups.map((start) => (
                        <div key={start} className="flex min-w-0 flex-1 items-end justify-center gap-[3%]" style={{maxWidth: 136}}>
                            <Tube digit={shown[start]} filterId={filterId} index={start}/>
                            <Tube digit={shown[start + 1]} filterId={filterId} index={start + 1}/>
                        </div>
                    )).flatMap((node, group) => (group === 0 ? [node] : [<Separator key={`sep-${group}`} on={colonOn}/>, node]))}
                </div>

                <div className="relative mt-5 flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#b89572]/70">{label}</span>
                    <button
                        type="button"
                        onClick={runCycle}
                        disabled={reduceMotion}
                        className="group flex items-center gap-2 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] text-[#b89572]/80 outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a120d] disabled:opacity-40"
                    >
                        Cycle
                        <span className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f3d9a4,#b8893f_55%,#6d4a1c)] shadow-[0_2px_0_#3b2610,0_3px_6px_rgba(0,0,0,0.6)] transition-transform duration-75 group-active:translate-y-[2px] group-active:shadow-[0_0_0_#3b2610,0_1px_2px_rgba(0,0,0,0.6)]"/>
                    </button>
                </div>
            </div>

            <time className="sr-only" dateTime={now.toISOString()}>{timeText}</time>
        </div>
    );
};

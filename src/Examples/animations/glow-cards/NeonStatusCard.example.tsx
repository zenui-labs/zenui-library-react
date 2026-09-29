import {useEffect, useRef, useState} from "react";
import {motion, useAnimationControls, useInView, useReducedMotion} from "framer-motion";
import {LuHeadphones, LuMic, LuRadio} from "react-icons/lu";

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
};

// A neon sign that powers on with a flicker, then hums with a slow breathing glow.
// The glow is a blurred copy of the text, so only opacity animates.
const NeonStatusCard = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const [live, setLive] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const sign = useAnimationControls();

    useEffect(() => {
        if (!live) {
            void sign.start({opacity: 0.12, transition: {duration: 0.25}});
            return;
        }
        if (reduceMotion) {
            void sign.start({opacity: 1, transition: {duration: 0.2}});
            return;
        }
        // Power on: a few uneven flickers, then settle.
        void sign.start({
            opacity: [0.12, 1, 0.2, 0.9, 0.35, 1, 0.7, 1],
            transition: {duration: 0.9, times: [0, 0.1, 0.18, 0.3, 0.38, 0.55, 0.7, 1], ease: "linear"},
        });
    }, [live, reduceMotion, sign]);

    useEffect(() => {
        if (!live) return;
        const id = window.setInterval(() => setSeconds((value) => value + 1), 1000);
        return () => window.clearInterval(id);
    }, [live]);

    const toggle = () => {
        setLive((value) => !value);
        setSeconds(0);
    };

    const humming = live && inView && !reduceMotion;

    return (
        <div
            ref={ref}
            className="w-full max-w-md rounded-[28px] bg-gradient-to-b from-zinc-200 to-zinc-300 p-3 shadow-xl shadow-zinc-900/10 dark:from-zinc-900 dark:to-black dark:shadow-black/50"
        >
            <div className="relative overflow-hidden rounded-[20px] bg-[#0b0a12] px-6 pb-6 pt-10 ring-1 ring-black/40">
                {/* Brick texture behind the sign. */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:48px_22px,24px_22px]"
                />
                {/* Light spill on the wall. */}
                <motion.div
                    aria-hidden="true"
                    initial={false}
                    animate={{opacity: live ? 1 : 0}}
                    transition={{duration: 0.6, delay: live ? 0.5 : 0}}
                    className="pointer-events-none absolute left-1/2 top-4 h-40 w-72 -translate-x-1/2 rounded-full bg-rose-500/25 blur-3xl"
                />

                <div className="relative flex justify-center" aria-hidden="true">
                    <motion.div animate={sign} initial={{opacity: 0.12}} className="relative">
                        <motion.span
                            animate={humming ? {opacity: [0.75, 1, 0.8, 1]} : {opacity: 1}}
                            transition={humming ? {duration: 3.2, repeat: Infinity, ease: "easeInOut"} : {duration: 0.3}}
                            className="absolute inset-0 flex items-center justify-center rounded-2xl border-[3px] border-rose-400 text-4xl font-bold uppercase sm:text-5xl tracking-[0.14em] text-rose-300 blur-md"
                        >
                            On air
                        </motion.span>
                        <span className="relative flex items-center justify-center rounded-2xl border-[3px] border-rose-300 px-5 py-3 text-4xl font-bold uppercase sm:text-5xl tracking-[0.14em] text-rose-50 [text-shadow:0_0_6px_rgba(251,113,133,0.9),0_0_18px_rgba(244,63,94,0.7)] sm:px-9">
                            On air
                        </span>
                    </motion.div>
                </div>

                <div className="relative mt-8 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-white">
                    <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                            <LuRadio className="h-5 w-5 text-rose-300" aria-hidden="true"/>
                        </span>
                        <div>
                            <p className="text-sm font-semibold">Night Shift, episode 48</p>
                            <p className="flex items-center gap-3 text-xs text-white/60">
                                <span className="inline-flex items-center gap-1">
                                    <LuMic className="h-3 w-3" aria-hidden="true"/>
                                    <span className="tabular-nums">{live ? formatTime(seconds) : "Standby"}</span>
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <LuHeadphones className="h-3 w-3" aria-hidden="true"/>
                                    {live ? "1,204 listening" : "Studio B"}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Switch semantics: the state reads as on or off. */}
                    <button
                        type="button"
                        role="switch"
                        aria-checked={live}
                        aria-label="On air"
                        onClick={toggle}
                        className={`relative h-7 w-12 shrink-0 rounded-full p-0.5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0a12] ${
                            live ? "bg-rose-500 shadow-[0_0_16px_rgba(244,63,94,0.6)]" : "bg-white/15"
                        }`}
                    >
                        <motion.span
                            layout
                            transition={{type: "spring", stiffness: 600, damping: 32}}
                            className={`block h-6 w-6 rounded-full bg-white shadow ${live ? "ml-auto" : ""}`}
                        />
                    </button>
                </div>
                <p className="sr-only" role="status">{live ? "Studio is on air" : "Studio is on standby"}</p>
            </div>
        </div>
    );
};

export default NeonStatusCard;

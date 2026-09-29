import {useCallback, useEffect, useRef} from "react";
import {useAnimate, useInView, useReducedMotion} from "framer-motion";
import {LuRefreshCw, LuWifiOff} from "react-icons/lu";

const FRAMES = 7;
const AUTO_EVERY = 4200; // ms between automatic bursts

const random = (min: number, max: number) => min + Math.random() * (max - min);

// A horizontal slice of the text, described as a clip-path inset from the top and bottom.
const randomSlice = () => {
    const top = random(0, 85);
    const height = random(6, 28);
    return `inset(${top.toFixed(1)}% 0 ${Math.max(0, 100 - top - height).toFixed(1)}% 0)`;
};

// Two colored copies of the text sit on top of the original. A burst shows random slices of each copy,
// shifted sideways, for about 400 ms. Nothing moves between bursts, so the effect stays cheap.
const GlitchText = () => {
    const [scope, animate] = useAnimate<HTMLDivElement>();
    const inView = useInView(scope, {amount: 0.5});
    const reduceMotion = useReducedMotion();
    const busy = useRef(false);

    const burst = useCallback(async () => {
        if (busy.current || reduceMotion || !scope.current) return;
        busy.current = true;
        const layer = () => ({
            clipPath: [...Array.from({length: FRAMES}, randomSlice), "inset(50% 0 50% 0)"],
            x: [...Array.from({length: FRAMES}, () => random(-10, 10)), 0],
        });
        await Promise.all([
            animate(".glitch-cyan", layer(), {duration: 0.42, ease: "linear"}),
            animate(".glitch-rose", layer(), {duration: 0.42, ease: "linear"}),
            animate(".glitch-base", {x: [0, -2, 3, -1, 0], skewX: [0, 6, -4, 2, 0]}, {duration: 0.3, ease: "linear"}),
        ]);
        busy.current = false;
    }, [animate, reduceMotion, scope]);

    // Automatic bursts only while the headline is on screen and the tab is visible.
    useEffect(() => {
        if (!inView || reduceMotion) return;
        const timer = window.setInterval(() => {
            if (document.visibilityState === "visible") void burst();
        }, AUTO_EVERY);
        const first = window.setTimeout(() => void burst(), 600);
        return () => {
            window.clearInterval(timer);
            window.clearTimeout(first);
        };
    }, [burst, inView, reduceMotion]);

    const copyClassName = "pointer-events-none absolute inset-0 select-none [clip-path:inset(50%_0_50%_0)]";

    return (
        <div className="w-full max-w-xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                <LuWifiOff className="h-3.5 w-3.5" aria-hidden="true"/>
                Connection lost
            </span>

            <div ref={scope} onPointerEnter={() => void burst()} className="relative mx-auto mt-5 w-fit">
                <h2 className="glitch-base font-mono text-5xl font-black tracking-tight text-gray-900 sm:text-8xl dark:text-white">
                    Error 503
                </h2>
                <span aria-hidden="true" className={`glitch-cyan font-mono text-5xl font-black tracking-tight text-cyan-500 mix-blend-multiply sm:text-8xl dark:text-cyan-400 dark:mix-blend-screen ${copyClassName}`}>
                    Error 503
                </span>
                <span aria-hidden="true" className={`glitch-rose font-mono text-5xl font-black tracking-tight text-rose-500 mix-blend-multiply sm:text-8xl dark:text-rose-400 dark:mix-blend-screen ${copyClassName}`}>
                    Error 503
                </span>
            </div>

            <p className="mx-auto mt-5 max-w-sm text-base leading-7 text-gray-600 dark:text-slate-400">
                The billing service is not responding. Your data is safe and we are retrying automatically.
            </p>

            <button
                type="button"
                onClick={() => void burst()}
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98] dark:bg-white dark:text-gray-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
            >
                <LuRefreshCw className="h-4 w-4" aria-hidden="true"/>
                Retry connection
            </button>
        </div>
    );
};

export default GlitchText;

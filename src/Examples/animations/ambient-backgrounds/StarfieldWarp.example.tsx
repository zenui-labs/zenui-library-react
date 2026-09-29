import {useState} from "react";
import {useReducedMotion} from "framer-motion";
import {LuArrowLeft, LuRocket} from "react-icons/lu";
import {StarfieldWarp} from "./StarfieldWarp";

const StarfieldWarpExample = () => {
    const [warp, setWarp] = useState(false);
    // Warp is a motion effect, so the button is turned off for people who prefer reduced motion.
    const reduceMotion = useReducedMotion();

    return (
        <StarfieldWarp warp={warp}>
            <div className="relative max-w-md text-center">
                <p className="font-mono text-sm font-medium text-slate-500 dark:text-slate-400">Error 404</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                    This page drifted out of range
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                    The link may be old, or the page moved. Head back home, or take a short detour first.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a
                        href="#home"
                        onClick={(event) => event.preventDefault()}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus-visible:ring-offset-slate-950"
                    >
                        <LuArrowLeft className="h-4 w-4" aria-hidden="true"/>
                        Back to home
                    </a>
                    <button
                        type="button"
                        onClick={() => setWarp((value) => !value)}
                        aria-pressed={warp}
                        disabled={Boolean(reduceMotion)}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/60 px-5 py-2.5 text-sm font-medium text-slate-800 backdrop-blur transition hover:bg-white aria-pressed:border-indigo-500 aria-pressed:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:aria-pressed:border-indigo-400 dark:aria-pressed:text-indigo-300"
                    >
                        <LuRocket className="h-4 w-4" aria-hidden="true"/>
                        Warp speed
                    </button>
                </div>
            </div>
        </StarfieldWarp>
    );
};

export default StarfieldWarpExample;

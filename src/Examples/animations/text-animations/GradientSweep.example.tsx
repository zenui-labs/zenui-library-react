import {useRef} from "react";
import {motion, useInView, useReducedMotion} from "framer-motion";
import {LuArrowRight} from "react-icons/lu";

// The text is filled with a wide gradient: plain ink on both ends and a bright band in the middle.
// Moving the background position slides that band across the letters.
const sweepText =
    "bg-[linear-gradient(110deg,#0f172a_42%,#6366f1_47%,#ec4899_50%,#06b6d4_53%,#0f172a_58%)] dark:bg-[linear-gradient(110deg,#f8fafc_42%,#a5b4fc_47%,#f9a8d4_50%,#67e8f9_53%,#f8fafc_58%)] bg-[length:300%_100%] bg-clip-text text-transparent";

const GradientSweep = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, {amount: 0.4});
    const reduceMotion = useReducedMotion();
    // The sweep loops only while the headline is visible, and never with reduced motion.
    const playing = inView && !reduceMotion;

    return (
        <div ref={ref} className="w-full max-w-2xl text-center">
            <a
                href="#aurora"
                className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-1 pr-3 text-sm text-gray-700 shadow-sm transition hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:focus-visible:ring-offset-slate-950"
            >
                <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-semibold text-white dark:bg-indigo-500">New</span>
                {/* On hover, the link text runs a single sweep of its own. */}
                <motion.span
                    initial={{backgroundPosition: "100% 0%"}}
                    whileHover={reduceMotion ? undefined : {backgroundPosition: ["100% 0%", "0% 0%"], transition: {duration: 0.9, ease: "easeInOut"}}}
                    className={`font-medium ${sweepText}`}
                >
                    Aurora 2.0 is out, read the launch notes
                </motion.span>
                <LuArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true"/>
            </a>

            <motion.h2
                initial={{backgroundPosition: "100% 0%"}}
                animate={playing ? {backgroundPosition: ["100% 0%", "0% 0%"]} : {backgroundPosition: "100% 0%"}}
                transition={playing ? {duration: 2.6, ease: [0.45, 0, 0.55, 1], repeat: Infinity, repeatDelay: 1.4} : {duration: 0.4}}
                className={`mt-6 text-4xl font-bold tracking-tight sm:text-6xl ${sweepText}`}
            >
                Analytics that answer back
            </motion.h2>

            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-gray-600 dark:text-slate-400">
                Ask a question in plain words and get a chart, the query behind it and a short explanation.
            </p>
        </div>
    );
};

export default GradientSweep;

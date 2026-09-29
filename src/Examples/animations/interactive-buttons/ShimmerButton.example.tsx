import {motion, useReducedMotion} from "framer-motion";
import {LuArrowRight, LuSparkles} from "react-icons/lu";

// A band of light sweeps across the button every few seconds to draw the eye to the main action.
const ShimmerButton = () => {
    const reduceMotion = useReducedMotion();

    return (
        <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
                type="button"
                whileHover={reduceMotion ? undefined : {y: -2}}
                whileTap={{scale: 0.97}}
                transition={{type: "spring", stiffness: 400, damping: 25}}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:shadow-white/10 dark:focus-visible:ring-offset-slate-950"
            >
                {!reduceMotion && (
                    <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-indigo-400/30"
                        style={{skewX: -12}}
                        initial={{x: "-120%"}}
                        animate={{x: "320%"}}
                        transition={{duration: 1.4, ease: [0.4, 0, 0.2, 1], repeat: Infinity, repeatDelay: 2.2}}
                    />
                )}
                <LuSparkles className="relative h-4 w-4" aria-hidden="true"/>
                <span className="relative">Generate summary</span>
            </motion.button>

            <motion.button
                type="button"
                whileHover={reduceMotion ? undefined : {y: -2}}
                whileTap={{scale: 0.97}}
                transition={{type: "spring", stiffness: 400, damping: 25}}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:shadow-indigo-950/50 dark:focus-visible:ring-offset-slate-950"
            >
                {!reduceMotion && (
                    <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                        style={{skewX: -12}}
                        initial={{x: "-120%"}}
                        animate={{x: "320%"}}
                        transition={{duration: 1.4, ease: [0.4, 0, 0.2, 1], repeat: Infinity, repeatDelay: 2.2, delay: 0.7}}
                    />
                )}
                <span className="relative">Upgrade to Pro</span>
                <LuArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true"/>
            </motion.button>
        </div>
    );
};

export default ShimmerButton;

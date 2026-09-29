import {useEffect, useRef, useState} from "react";
import {motion, useAnimate, useReducedMotion} from "framer-motion";
import type {Variants} from "framer-motion";
import {LuHeadphones, LuListChecks, LuShoppingBag, LuX} from "react-icons/lu";

interface Finish {
    name: string;
    swatch: string;
    stage: string;
}

const finishes: Finish[] = [
    {name: "Graphite", swatch: "bg-slate-800", stage: "from-slate-200 to-slate-400 dark:from-slate-700 dark:to-slate-900"},
    {name: "Sandstone", swatch: "bg-amber-200", stage: "from-amber-100 to-orange-200 dark:from-amber-900/60 dark:to-orange-950"},
    {name: "Sage", swatch: "bg-emerald-300", stage: "from-emerald-100 to-teal-200 dark:from-emerald-900/60 dark:to-teal-950"},
];

const specs = [
    {label: "Battery life", value: "40 h", level: 0.9},
    {label: "Noise cancelling", value: "-38 dB", level: 0.8},
    {label: "Weight", value: "254 g", level: 0.45},
    {label: "Charging, 10 min", value: "5 h playback", level: 0.6},
];

// The spec rows fade in after the card has turned, one after another.
const list: Variants = {
    hidden: {},
    shown: {transition: {delayChildren: 0.35, staggerChildren: 0.07}},
};
const row: Variants = {
    hidden: {opacity: 0, y: 8},
    shown: {opacity: 1, y: 0, transition: {type: "spring", stiffness: 300, damping: 24}},
};

const faceClass = "col-start-1 row-start-1 rounded-3xl [-webkit-backface-visibility:hidden] [backface-visibility:hidden]";

// A product card that lifts, turns over to show specifications, and settles back down.
const ProductSpecs = () => {
    const reduceMotion = useReducedMotion();
    const [flipped, setFlipped] = useState(false);
    const [finish, setFinish] = useState(finishes[0]);
    const touched = useRef(false);
    const [scope, animate] = useAnimate<HTMLDivElement>();
    const frontRef = useRef<HTMLDivElement>(null);
    const backRef = useRef<HTMLDivElement>(null);
    const openButton = useRef<HTMLButtonElement>(null);
    const closeButton = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        frontRef.current?.toggleAttribute("inert", flipped);
        backRef.current?.toggleAttribute("inert", !flipped);
        if (touched.current) (flipped ? closeButton : openButton).current?.focus({preventScroll: true});
    }, [flipped]);

    const toggle = () => {
        touched.current = true;
        setFlipped((value) => !value);
        if (!reduceMotion) {
            animate(scope.current, {scale: [1, 0.9, 1], y: [0, -14, 0]}, {duration: 0.75, times: [0, 0.45, 1], ease: "easeInOut"});
        }
    };

    const iconButton =
        "flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-sm ring-1 ring-black/5 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:bg-slate-800/80 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-slate-800 dark:focus-visible:ring-white";

    return (
        <div className="w-full max-w-xs [perspective:1400px]">
            {/* The outer layer lifts and drops back, the inner layer turns. */}
            <div ref={scope} className="[transform-style:preserve-3d]">
                <motion.div
                    className="grid [transform-style:preserve-3d]"
                    initial={false}
                    animate={{rotateY: flipped ? 180 : 0}}
                    transition={reduceMotion ? {duration: 0} : {duration: 0.75, ease: [0.65, 0, 0.35, 1]}}
                >
                    <div ref={frontRef} className={`${faceClass} border border-gray-200 bg-white p-3 shadow-xl shadow-gray-900/5 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40`}>
                        <div className={`relative flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br ${finish.stage}`}>
                            <motion.div
                                key={finish.name}
                                initial={reduceMotion ? false : {scale: 0.85, rotate: -8, opacity: 0}}
                                animate={{scale: 1, rotate: 0, opacity: 1}}
                                transition={{type: "spring", stiffness: 260, damping: 18}}
                            >
                                <LuHeadphones className="h-28 w-28 text-gray-900/80 dark:text-white/85" strokeWidth={1.25} aria-hidden="true"/>
                            </motion.div>
                            <button ref={openButton} type="button" onClick={toggle} aria-label="Show specifications" className={`${iconButton} absolute right-3 top-3`}>
                                <LuListChecks className="h-4 w-4" aria-hidden="true"/>
                            </button>
                        </div>
                        <div className="px-2 pb-2 pt-4">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">Aura Studio ANC</h3>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">Over-ear, {finish.name}</p>
                                </div>
                                <p className="text-base font-semibold tabular-nums text-gray-900 dark:text-white">$349</p>
                            </div>
                            <fieldset className="mt-4">
                                <legend className="sr-only">Finish</legend>
                                <div className="flex gap-2">
                                    {finishes.map((option) => (
                                        <label key={option.name} className="relative flex h-8 w-8 cursor-pointer items-center justify-center">
                                            <input
                                                type="radio"
                                                name="headphone-finish"
                                                value={option.name}
                                                checked={finish.name === option.name}
                                                onChange={() => setFinish(option)}
                                                className="peer sr-only"
                                            />
                                            <span className="sr-only">{option.name}</span>
                                            {finish.name === option.name && (
                                                <motion.span
                                                    layoutId="finish-ring"
                                                    className="absolute inset-0 rounded-full ring-2 ring-gray-900 dark:ring-white"
                                                    transition={{type: "spring", stiffness: 420, damping: 30}}
                                                />
                                            )}
                                            <span className={`h-6 w-6 rounded-full ${option.swatch} ring-1 ring-black/10 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 dark:ring-white/15`}/>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>
                            <button
                                type="button"
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900"
                            >
                                <LuShoppingBag className="h-4 w-4" aria-hidden="true"/>
                                Add to bag
                            </button>
                        </div>
                    </div>

                    <div
                        ref={backRef}
                        className={`${faceClass} flex flex-col bg-gray-950 p-6 text-white shadow-xl shadow-gray-900/20 ring-1 ring-white/10 [transform:rotateY(180deg)]`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">Specifications</p>
                                <h3 className="mt-1 text-lg font-semibold">Aura Studio ANC</h3>
                            </div>
                            <button ref={closeButton} type="button" onClick={toggle} aria-label="Hide specifications" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                                <LuX className="h-4 w-4" aria-hidden="true"/>
                            </button>
                        </div>
                        <motion.dl className="mt-6 space-y-5" variants={list} initial={false} animate={flipped ? "shown" : "hidden"}>
                            {specs.map((spec) => (
                                <motion.div key={spec.label} variants={row}>
                                    <div className="flex items-baseline justify-between text-sm">
                                        <dt className="text-gray-400">{spec.label}</dt>
                                        <dd className="font-medium tabular-nums">{spec.value}</dd>
                                    </div>
                                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                                        <motion.div
                                            className="h-full origin-left rounded-full bg-gradient-to-r from-sky-400 to-indigo-400"
                                            initial={false}
                                            animate={{scaleX: flipped ? spec.level : 0}}
                                            transition={{type: "spring", stiffness: 120, damping: 20, delay: flipped ? 0.45 : 0}}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.dl>
                        <p className="mt-auto pt-6 text-xs text-gray-400">Bluetooth 5.3, USB-C, multipoint pairing with two devices.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductSpecs;

import {useEffect, useId, useRef, useState} from "react";
import type {ComponentType} from "react";
import {motion, useAnimate, useReducedMotion} from "framer-motion";
import type {Variants} from "framer-motion";
import {LuListChecks, LuShoppingBag, LuX} from "react-icons/lu";

export interface Finish {
    name: string;
    /** Tailwind background class for the swatch, for example "bg-slate-800". */
    swatch: string;
    /** Tailwind gradient stops for the product stage behind the icon. */
    stage: string;
}

export interface Spec {
    label: string;
    value: string;
    /** Bar fill from 0 to 1. */
    level: number;
}

export interface Product {
    name: string;
    /** Short line under the name. The selected finish is appended after a comma. */
    category: string;
    /** Price as displayed, for example "$349". */
    price: string;
    icon: ComponentType<{className?: string; strokeWidth?: number}>;
    finishes: Finish[];
    specs: Spec[];
    /** Small print at the bottom of the back face. */
    footnote?: string;
}

export interface ProductSpecsProps {
    product: Product;
    /** Controlled finish, by name. Leave it out to let the card manage its own state. */
    finish?: string;
    /** Name of the finish selected at first. Defaults to the first finish. */
    defaultFinish?: string;
    onFinishChange?: (finish: Finish) => void;
    /** Called when the add button is pressed, with the selected finish. */
    onAddToBag?: (product: Product, finish: Finish) => void;
    addLabel?: string;
    specsHeading?: string;
    className?: string;
}

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
export const ProductSpecs = ({
    product,
    finish: finishProp,
    defaultFinish,
    onFinishChange,
    onAddToBag,
    addLabel = "Add to bag",
    specsHeading = "Specifications",
    className = "",
}: ProductSpecsProps) => {
    const {finishes, specs, icon: Icon} = product;
    const reduceMotion = useReducedMotion();
    const id = useId();
    const [flipped, setFlipped] = useState(false);
    const [internalFinish, setInternalFinish] = useState(defaultFinish ?? finishes[0].name);
    const finishName = finishProp ?? internalFinish;
    const finish = finishes.find((option) => option.name === finishName) ?? finishes[0];
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

    const selectFinish = (option: Finish) => {
        if (finishProp === undefined) setInternalFinish(option.name);
        onFinishChange?.(option);
    };

    const iconButton =
        "flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-sm ring-1 ring-black/5 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:bg-slate-800/80 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-slate-800 dark:focus-visible:ring-white";

    return (
        <div className={`w-full max-w-xs [perspective:1400px] ${className}`}>
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
                                <Icon className="h-28 w-28 text-gray-900/80 dark:text-white/85" strokeWidth={1.25} aria-hidden="true"/>
                            </motion.div>
                            <button ref={openButton} type="button" onClick={toggle} aria-label={`Show ${specsHeading.toLowerCase()}`} className={`${iconButton} absolute right-3 top-3`}>
                                <LuListChecks className="h-4 w-4" aria-hidden="true"/>
                            </button>
                        </div>
                        <div className="px-2 pb-2 pt-4">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">{product.category}, {finish.name}</p>
                                </div>
                                <p className="text-base font-semibold tabular-nums text-gray-900 dark:text-white">{product.price}</p>
                            </div>
                            <fieldset className="mt-4">
                                <legend className="sr-only">Finish</legend>
                                <div className="flex gap-2">
                                    {finishes.map((option) => (
                                        <label key={option.name} className="relative flex h-8 w-8 cursor-pointer items-center justify-center">
                                            <input
                                                type="radio"
                                                name={`finish-${id}`}
                                                value={option.name}
                                                checked={finish.name === option.name}
                                                onChange={() => selectFinish(option)}
                                                className="peer sr-only"
                                            />
                                            <span className="sr-only">{option.name}</span>
                                            {finish.name === option.name && (
                                                <motion.span
                                                    layoutId={`finish-ring-${id}`}
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
                                onClick={() => onAddToBag?.(product, finish)}
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900"
                            >
                                <LuShoppingBag className="h-4 w-4" aria-hidden="true"/>
                                {addLabel}
                            </button>
                        </div>
                    </div>

                    <div
                        ref={backRef}
                        className={`${faceClass} flex flex-col bg-gray-950 p-6 text-white shadow-xl shadow-gray-900/20 ring-1 ring-white/10 [transform:rotateY(180deg)]`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">{specsHeading}</p>
                                <h3 className="mt-1 text-lg font-semibold">{product.name}</h3>
                            </div>
                            <button ref={closeButton} type="button" onClick={toggle} aria-label={`Hide ${specsHeading.toLowerCase()}`} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
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
                        {product.footnote && <p className="mt-auto pt-6 text-xs text-gray-400">{product.footnote}</p>}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};


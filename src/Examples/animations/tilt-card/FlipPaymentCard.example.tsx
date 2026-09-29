import {useState} from "react";
import type {PointerEvent} from "react";
import {motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuRotateCw, LuWifi} from "react-icons/lu";

const tiltSpring = {stiffness: 220, damping: 22, mass: 0.6};

// A payment card that tilts toward the pointer and flips to show its back.
// Tilt and flip are separate springs that add up, so the card keeps tilting while it turns.
const FlipPaymentCard = () => {
    const reduceMotion = useReducedMotion();
    const [flipped, setFlipped] = useState(false);
    const pointerX = useMotionValue(0.5);
    const pointerY = useMotionValue(0.5);
    const flipTarget = useMotionValue(0);

    const x = useSpring(pointerX, tiltSpring);
    const y = useSpring(pointerY, tiltSpring);
    const flip = useSpring(flipTarget, reduceMotion ? {stiffness: 1000, damping: 100} : {stiffness: 90, damping: 16, mass: 1});
    const tilt = reduceMotion ? 0 : 1;

    const tiltY = useTransform(x, [0, 1], [-14 * tilt, 14 * tilt]);
    const rotateX = useTransform(y, [0, 1], [10 * tilt, -10 * tilt]);
    const rotateY = useTransform(() => tiltY.get() + flip.get());
    // The sheen moves with the pointer across the face that is showing.
    const sheenX = useTransform(x, [0, 1], [0, 100]);
    const sheenY = useTransform(y, [0, 1], [0, 100]);
    const sheen = useMotionTemplate`radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.28), transparent 55%)`;

    const toggle = () => {
        const next = !flipped;
        setFlipped(next);
        flipTarget.set(next ? 180 : 0);
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width);
        pointerY.set((event.clientY - rect.top) / rect.height);
    };

    const face = "absolute inset-0 overflow-hidden rounded-2xl [backface-visibility:hidden] sm:rounded-3xl";

    return (
        <div className="flex w-full flex-col items-center gap-6">
            <div
                onPointerMove={handlePointerMove}
                onPointerLeave={() => {
                    pointerX.set(0.5);
                    pointerY.set(0.5);
                }}
                onClick={toggle}
                className="w-full max-w-[22rem] cursor-pointer [perspective:1200px]"
            >
                <motion.div
                    style={{rotateX, rotateY, transformStyle: "preserve-3d"}}
                    className="relative aspect-[1.586] w-full select-none"
                >
                    {/* Front. */}
                    <div
                        aria-hidden={flipped}
                        className={`${face} bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-900 p-5 text-white shadow-2xl shadow-indigo-950/40 sm:p-6`}
                    >
                        <div aria-hidden="true" className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-violet-500/30 blur-2xl"/>
                        <div aria-hidden="true" className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full border-[28px] border-white/5"/>
                        <motion.div aria-hidden="true" style={{background: sheen}} className="pointer-events-none absolute inset-0"/>

                        <div className="relative flex h-full flex-col justify-between">
                            <div className="flex items-start justify-between">
                                <p className="text-sm font-semibold tracking-wide">Northwind</p>
                                <LuWifi className="h-5 w-5 rotate-90 text-white/70" aria-hidden="true"/>
                            </div>
                            {/* EMV chip. */}
                            <div aria-hidden="true" className="h-8 w-11 rounded-md bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 p-1">
                                <div className="grid h-full grid-cols-3 gap-px rounded-sm border border-amber-700/30">
                                    <span className="border-r border-amber-700/30"/>
                                    <span className="border-r border-amber-700/30"/>
                                    <span/>
                                </div>
                            </div>
                            <p className="font-mono text-lg tracking-[0.18em] sm:text-xl">
                                <span className="sr-only">Card ending in </span>
                                <span aria-hidden="true">•••• •••• •••• </span>4821
                            </p>
                            <div className="flex items-end justify-between text-xs">
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-white/50">Card holder</p>
                                    <p className="mt-0.5 font-medium tracking-wide">Jordan Ellis</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-white/50">Expires</p>
                                    <p className="mt-0.5 font-medium">09/29</p>
                                </div>
                                <div aria-hidden="true" className="flex">
                                    <span className="h-7 w-7 rounded-full bg-rose-500/90"/>
                                    <span className="-ml-3 h-7 w-7 rounded-full bg-amber-400/90 mix-blend-screen"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back, turned half a rotation so it faces forward once the card has flipped. */}
                    <div
                        aria-hidden={!flipped}
                        className={`${face} bg-gradient-to-br from-slate-800 via-indigo-950 to-slate-900 text-white shadow-2xl shadow-indigo-950/40 [transform:rotateY(180deg)]`}
                    >
                        <motion.div aria-hidden="true" style={{background: sheen}} className="pointer-events-none absolute inset-0"/>
                        <div className="relative mt-6 h-11 bg-black/80"/>
                        <div className="relative mx-5 mt-5 flex items-center gap-3 sm:mx-6">
                            <div className="h-9 flex-1 rounded bg-[repeating-linear-gradient(135deg,#f1f5f9_0px,#f1f5f9_6px,#e2e8f0_6px,#e2e8f0_12px)]"/>
                            <div className="rounded bg-white px-2.5 py-1.5 font-mono text-sm text-slate-900">
                                <span className="sr-only">Security code hidden</span>
                                <span aria-hidden="true">•••</span>
                            </div>
                        </div>
                        <p className="relative mx-5 mt-4 text-[10px] leading-4 text-white/50 sm:mx-6">
                            Issued by Northwind Bank. If found, call +1 415 555 0142.
                        </p>
                    </div>
                </motion.div>
            </div>

            <button
                type="button"
                onClick={toggle}
                aria-pressed={flipped}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
                <LuRotateCw className="h-4 w-4" aria-hidden="true"/>
                {flipped ? "Show front" : "Show back"}
            </button>
        </div>
    );
};

export default FlipPaymentCard;

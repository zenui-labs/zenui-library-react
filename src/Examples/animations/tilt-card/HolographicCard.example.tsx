import type {PointerEvent} from "react";
import {motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuSparkles} from "react-icons/lu";

const spring = {stiffness: 180, damping: 20, mass: 0.5};

const stats = [
    {label: "Commits", value: "4,812"},
    {label: "Reviews", value: "1,093"},
    {label: "Streak", value: "212d"},
];

// A collectible card with holographic foil. The rainbow layer slides as the card tilts, and blend modes
// make it shimmer only over the lighter parts of the artwork, the way printed foil does.
const HolographicCard = () => {
    const reduceMotion = useReducedMotion();
    const pointerX = useMotionValue(0.5);
    const pointerY = useMotionValue(0.5);
    const hover = useMotionValue(0);

    const x = useSpring(pointerX, spring);
    const y = useSpring(pointerY, spring);
    const active = useSpring(hover, {stiffness: 160, damping: 26});

    const rotateX = useTransform(y, [0, 1], reduceMotion ? [0, 0] : [14, -14]);
    const rotateY = useTransform(x, [0, 1], reduceMotion ? [0, 0] : [-16, 16]);
    const foilX = useTransform(x, [0, 1], [0, 100]);
    const foilY = useTransform(y, [0, 1], [0, 100]);
    const sparkleX = useTransform(x, [0, 1], [60, 40]);
    const sparkleY = useTransform(y, [0, 1], [60, 40]);
    const glareX = useTransform(x, [0, 1], [10, 90]);
    const glareY = useTransform(y, [0, 1], [10, 90]);
    const foilOpacity = useTransform(active, [0, 1], [0.25, 0.75]);
    const glareOpacity = useTransform(active, [0, 1], [0, 0.9]);

    const foilPosition = useMotionTemplate`${foilX}% ${foilY}%`;
    const sparklePosition = useMotionTemplate`${sparkleX}% ${sparkleY}%`;
    const glare = useMotionTemplate`radial-gradient(farthest-corner circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 30%, rgba(0,0,0,0.25) 90%)`;

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width);
        pointerY.set((event.clientY - rect.top) / rect.height);
    };

    const handlePointerLeave = () => {
        pointerX.set(0.5);
        pointerY.set(0.5);
        hover.set(0);
    };

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerEnter={() => hover.set(1)}
            onPointerLeave={handlePointerLeave}
            className="w-full max-w-[17rem] [perspective:900px]"
        >
            <motion.article
                style={{rotateX, rotateY, transformStyle: "preserve-3d"}}
                aria-label="Ada Park, founding member card"
                className="relative aspect-[5/7] w-full select-none overflow-hidden rounded-[22px] bg-slate-900 p-2 shadow-2xl shadow-slate-900/40 dark:shadow-black/70"
            >
                <div className="relative flex h-full flex-col overflow-hidden rounded-[16px] bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 p-4 text-slate-900">
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                        <span>Founding member</span>
                        <span className="font-mono">#0042</span>
                    </div>

                    {/* Artwork window. */}
                    <div className="relative mt-3 flex flex-1 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-sky-400 to-emerald-300">
                        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.7),transparent_45%)]"/>
                        <div aria-hidden="true" className="absolute -bottom-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full border-[14px] border-white/30"/>
                        <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/85 text-3xl font-bold text-indigo-700 shadow-xl ring-4 ring-white/60">
                            AP
                        </span>
                    </div>

                    <div className="mt-3 flex items-end justify-between">
                        <div>
                            <h3 className="text-lg font-bold leading-tight">Ada Park</h3>
                            <p className="text-xs text-slate-600">Maintainer since 2019</p>
                        </div>
                        <LuSparkles className="h-5 w-5 text-indigo-600" aria-hidden="true"/>
                    </div>

                    <dl className="mt-3 grid grid-cols-3 gap-1.5 text-center">
                        {stats.map((stat) => (
                            <div key={stat.label} className="rounded-lg bg-white/70 px-1 py-1.5">
                                <dt className="text-[10px] uppercase tracking-wider text-slate-500">{stat.label}</dt>
                                <dd className="text-sm font-semibold">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Rainbow foil. */}
                <motion.div
                    aria-hidden="true"
                    style={{backgroundPosition: foilPosition, opacity: foilOpacity}}
                    className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(115deg,#ff7eb3_0%,#ffd86b_7%,#7cffcb_14%,#6bc8ff_21%,#b18cff_28%,#ff7eb3_35%)] bg-[length:300%_300%] mix-blend-color-dodge"
                />
                {/* Fine sparkle texture, moving against the foil. */}
                <motion.div
                    aria-hidden="true"
                    style={{backgroundPosition: sparklePosition, opacity: foilOpacity}}
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.9)_0.6px,transparent_1.2px)] bg-[length:9px_9px] mix-blend-overlay"
                />
                <motion.div
                    aria-hidden="true"
                    style={{background: glare, opacity: glareOpacity}}
                    className="pointer-events-none absolute inset-0 mix-blend-overlay"
                />
            </motion.article>
        </div>
    );
};

export default HolographicCard;

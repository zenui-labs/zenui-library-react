import type {PointerEvent} from "react";
import {motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuMapPin, LuTicket} from "react-icons/lu";

const spring = {stiffness: 220, damping: 22, mass: 0.6};

// Tilts toward the pointer and moves a light reflection across the surface.
const GlareCard = () => {
    const reduceMotion = useReducedMotion();

    // Pointer position inside the card, from 0 to 1 on each axis.
    const pointerX = useMotionValue(0.5);
    const pointerY = useMotionValue(0.5);
    const glareOpacity = useMotionValue(0);

    const x = useSpring(pointerX, spring);
    const y = useSpring(pointerY, spring);
    const rotateX = useTransform(y, [0, 1], reduceMotion ? [0, 0] : [12, -12]);
    const rotateY = useTransform(x, [0, 1], reduceMotion ? [0, 0] : [-14, 14]);
    const glareX = useTransform(x, [0, 1], [0, 100]);
    const glareY = useTransform(y, [0, 1], [0, 100]);
    const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.32), rgba(255, 255, 255, 0) 50%)`;
    const opacity = useSpring(glareOpacity, {stiffness: 200, damping: 30});

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width);
        pointerY.set((event.clientY - rect.top) / rect.height);
    };

    const handlePointerLeave = () => {
        pointerX.set(0.5);
        pointerY.set(0.5);
        glareOpacity.set(0);
    };

    return (
        // Pointer events are read on the flat wrapper, so the tilt does not change the measured size.
        <div
            onPointerMove={handlePointerMove}
            onPointerEnter={() => glareOpacity.set(1)}
            onPointerLeave={handlePointerLeave}
            className="w-full max-w-[22rem] [perspective:1000px]"
        >
            <motion.div
                style={{rotateX, rotateY, transformStyle: "preserve-3d"}}
                className="relative w-full select-none overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-6 text-white shadow-2xl shadow-indigo-500/30 dark:shadow-indigo-950/60"
            >
                {/* Holographic sheen, fixed to the card. */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.12)_40%,transparent_60%)]"
                />
                <motion.div
                    aria-hidden="true"
                    style={{background: glare, opacity}}
                    className="pointer-events-none absolute inset-0"
                />

                <div className="relative flex items-start justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">Admit one</p>
                        <h3 className="mt-2 text-2xl font-semibold leading-tight">Frontend Summit 2026</h3>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
                        <LuTicket className="h-5 w-5" aria-hidden="true"/>
                    </span>
                </div>

                <div className="relative mt-8 grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-white/60">Date</p>
                        <p className="mt-0.5 font-medium">Oct 14 and 15</p>
                    </div>
                    <div>
                        <p className="text-white/60">Seat</p>
                        <p className="mt-0.5 font-medium">Hall B, row 7</p>
                    </div>
                </div>

                {/* Perforation line between the ticket and its stub. */}
                <div aria-hidden="true" className="relative my-6 border-t border-dashed border-white/30"/>

                <div className="relative flex items-end justify-between">
                    <div className="flex items-center gap-2 text-sm text-white/80">
                        <LuMapPin className="h-4 w-4" aria-hidden="true"/>
                        Pier 27, San Francisco
                    </div>
                    <p className="font-mono text-xs text-white/70">FS-2026-0417</p>
                </div>
            </motion.div>
        </div>
    );
};

export default GlareCard;

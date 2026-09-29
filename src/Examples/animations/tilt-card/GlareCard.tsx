import type {ComponentType, PointerEvent} from "react";
import {motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuMapPin, LuTicket} from "react-icons/lu";

export interface TicketDetail {
    label: string;
    value: string;
}

export interface GlareCardProps {
    title: string;
    /** Label and value pairs shown in two columns, such as the date and seat. */
    details: TicketDetail[];
    /** Small uppercase line above the title. */
    eyebrow?: string;
    /** Place shown next to the pin at the bottom left. */
    location?: string;
    /** Reference code shown at the bottom right, such as a ticket number. */
    code?: string;
    icon?: ComponentType<{className?: string}>;
    /** Largest tilt in degrees on the horizontal axis. The vertical axis uses a little less. */
    maxTilt?: number;
    className?: string;
}

const spring = {stiffness: 220, damping: 22, mass: 0.6};

// Tilts toward the pointer and moves a light reflection across the surface.
export const GlareCard = ({
    title,
    details,
    eyebrow = "Admit one",
    location,
    code,
    icon: Icon = LuTicket,
    maxTilt = 14,
    className = "",
}: GlareCardProps) => {
    const reduceMotion = useReducedMotion();
    const tiltY = reduceMotion ? 0 : maxTilt;
    const tiltX = reduceMotion ? 0 : maxTilt * (12 / 14);

    // Pointer position inside the card, from 0 to 1 on each axis.
    const pointerX = useMotionValue(0.5);
    const pointerY = useMotionValue(0.5);
    const glareOpacity = useMotionValue(0);

    const x = useSpring(pointerX, spring);
    const y = useSpring(pointerY, spring);
    const rotateX = useTransform(y, [0, 1], [tiltX, -tiltX]);
    const rotateY = useTransform(x, [0, 1], [-tiltY, tiltY]);
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
            className={`w-full max-w-[22rem] [perspective:1000px] ${className}`}
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
                        {eyebrow && <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">{eyebrow}</p>}
                        <h3 className="mt-2 text-2xl font-semibold leading-tight">{title}</h3>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
                        <Icon className="h-5 w-5" aria-hidden="true"/>
                    </span>
                </div>

                <div className="relative mt-8 grid grid-cols-2 gap-4 text-sm">
                    {details.map((detail) => (
                        <div key={detail.label}>
                            <p className="text-white/60">{detail.label}</p>
                            <p className="mt-0.5 font-medium">{detail.value}</p>
                        </div>
                    ))}
                </div>

                {/* Perforation line between the ticket and its stub. */}
                <div aria-hidden="true" className="relative my-6 border-t border-dashed border-white/30"/>

                <div className="relative flex items-end justify-between">
                    <div className="flex items-center gap-2 text-sm text-white/80">
                        {location && (
                            <>
                                <LuMapPin className="h-4 w-4" aria-hidden="true"/>
                                {location}
                            </>
                        )}
                    </div>
                    {code && <p className="font-mono text-xs text-white/70">{code}</p>}
                </div>
            </motion.div>
        </div>
    );
};

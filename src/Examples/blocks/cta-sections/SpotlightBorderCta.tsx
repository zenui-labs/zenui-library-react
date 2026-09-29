import {useRef} from "react";
import type {ComponentType, PointerEvent} from "react";
import {motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion} from "framer-motion";
import {LuArrowRight, LuCalendar} from "react-icons/lu";

export interface Proof {
    icon: ComponentType<{className?: string}>;
    title: string;
    detail: string;
}

export interface SpotlightBorderCtaProps {
    /** Proof points listed under the actions, three fit one row. */
    proofs: Proof[];
    eyebrow?: string;
    title?: string;
    description?: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    /** Seconds for one full turn of the border gradient. */
    spinDuration?: number;
    className?: string;
}

/** A centered card with a rotating gradient border, a pointer spotlight, two actions and a row of proof points. */
export const SpotlightBorderCta = ({
    proofs,
    eyebrow = "Switch before your next planning cycle",
    title = "Move your team to Beacon this quarter",
    description = "Our migration team maps your workflows, imports every issue and comment, and stays on call for the first two weeks. You keep your current tool until the switch is done.",
    primaryLabel = "Start your migration",
    primaryHref = "#",
    secondaryLabel = "Book a 20 minute walkthrough",
    secondaryHref = "#",
    spinDuration = 7,
    className = "",
}: SpotlightBorderCtaProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const inView = useInView(cardRef, {margin: "100px"});
    const reduceMotion = useReducedMotion();
    const spin = inView && !reduceMotion;

    // Spotlight position in px, relative to the card.
    const mouseX = useMotionValue(-400);
    const mouseY = useMotionValue(-400);
    const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgb(129 140 248 / 0.16), transparent 70%)`;

    const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
    };

    return (
        <section className={`w-full bg-slate-100 px-4 py-16 sm:px-8 sm:py-24 dark:bg-black ${className}`}>
            <div ref={cardRef} className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] p-px">
                <div aria-hidden="true" className="absolute inset-0 rounded-[2rem] bg-slate-300/70 dark:bg-white/10"/>
                {/* Rotating conic gradient, clipped to a 1px ring by the inner card. */}
                <motion.div
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 aspect-square w-[160%] bg-[conic-gradient(from_0deg,transparent_0deg,#6366f1_60deg,#ec4899_120deg,transparent_180deg,transparent_360deg)]"
                    style={{x: "-50%", y: "-50%"}}
                    animate={spin ? {rotate: 360} : {rotate: 0}}
                    transition={spin ? {duration: spinDuration, ease: "linear", repeat: Infinity} : {duration: 0}}
                />

                <div onPointerMove={onPointerMove}
                     className="group relative overflow-hidden rounded-[calc(2rem-1px)] bg-white px-6 py-14 text-center sm:px-14 dark:bg-slate-950">
                    <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                style={{background: spotlight}}/>
                    <div aria-hidden="true"
                         className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgb(99_102_241/0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgb(99_102_241/0.25),transparent_70%)]"/>

                    <div className="relative">
                        {eyebrow && <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{eyebrow}</p>}
                        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                            {title}
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
                            {description}
                        </p>

                        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                            <a href={primaryHref}
                               className="group/cta inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white outline-none transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950">
                                {primaryLabel}
                                <LuArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5"/>
                            </a>
                            {secondaryLabel && (
                                <a href={secondaryHref}
                                   className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:text-white dark:hover:bg-slate-900">
                                    <LuCalendar className="h-4 w-4"/>
                                    {secondaryLabel}
                                </a>
                            )}
                        </div>

                        <ul className="mt-12 grid gap-6 border-t border-slate-200 pt-8 text-left sm:grid-cols-3 dark:border-slate-800">
                            {proofs.map((proof) => (
                                <li key={proof.title} className="flex gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/20">
                                        <proof.icon className="h-4 w-4"/>
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{proof.title}</p>
                                        <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{proof.detail}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

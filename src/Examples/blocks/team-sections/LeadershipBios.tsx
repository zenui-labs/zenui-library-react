import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuArrowUpRight, LuChevronLeft, LuChevronRight, LuLinkedin, LuX} from "react-icons/lu";

export interface Leader {
    name: string;
    role: string;
    /** Portrait URL, shown at a 4:5 ratio in the grid. */
    photo: string;
    /** Short line above the name in the dialog, for example "Joined 2021". */
    joined: string;
    /** One or two sentences shown under the card. */
    summary: string;
    /** Paragraphs of the full bio shown in the dialog. */
    bio: string[];
    /** Past roles listed in the dialog. */
    previously: string[];
    /** LinkedIn profile URL. The dialog hides the link when it is missing. */
    linkedin?: string;
}

interface BioDialogProps {
    leader: Leader;
    index: number;
    total: number;
    previouslyLabel: string;
    onClose: () => void;
    onStep: (direction: 1 | -1) => void;
}

const BioDialog = ({leader, index, total, previouslyLabel, onClose, onStep}: BioDialogProps) => {
    const nameId = useId();
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        closeRef.current?.focus();
    }, []);

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") {
            event.stopPropagation();
            onClose();
            return;
        }
        if (event.key === "ArrowRight") onStep(1);
        if (event.key === "ArrowLeft") onStep(-1);
        if (event.key !== "Tab" || !dialogRef.current) return;
        // Keep focus inside the dialog.
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    return (
        <motion.div className="absolute inset-0 z-20 flex items-center justify-center p-4"
                    initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true"/>
            <motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={nameId} onKeyDown={onKeyDown}
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 24, scale: 0.97}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: 16, scale: 0.98}}
                        transition={{type: "spring", stiffness: 320, damping: 30}}
                        className="relative grid max-h-full w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl sm:grid-cols-[240px_minmax(0,1fr)] dark:bg-slate-900 dark:ring-1 dark:ring-white/10">
                <img src={leader.photo} alt="" className="h-56 w-full object-cover sm:h-full"/>
                <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-teal-600 dark:text-teal-400">{leader.joined}</p>
                            <h3 id={nameId} className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">{leader.name}</h3>
                            <p className="text-slate-500 dark:text-slate-400">{leader.role}</p>
                        </div>
                        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 outline-none transition-colors hover:bg-slate-200 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-teal-500 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white">
                            <LuX className="h-4 w-4"/>
                        </button>
                    </div>
                    <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {leader.bio.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
                    </div>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-500">{previouslyLabel}</p>
                    <ul className="mt-2 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                        {leader.previously.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                        {leader.linkedin ? (
                            <a href={leader.linkedin} className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-slate-700 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-slate-300 dark:hover:text-white">
                                <LuLinkedin className="h-4 w-4"/> LinkedIn <LuArrowUpRight className="h-3.5 w-3.5"/>
                            </a>
                        ) : <span/>}
                        <div className="flex items-center gap-1">
                            <span className="mr-2 text-xs tabular-nums text-slate-500">{index + 1} of {total}</span>
                            <button type="button" onClick={() => onStep(-1)} aria-label="Previous leader"
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                                <LuChevronLeft className="h-4 w-4"/>
                            </button>
                            <button type="button" onClick={() => onStep(1)} aria-label="Next leader"
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                                <LuChevronRight className="h-4 w-4"/>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export interface LeadershipBiosProps {
    leaders: Leader[];
    eyebrow?: string;
    title?: ReactNode;
    description?: ReactNode;
    /** Label that slides up over a portrait on hover or focus. */
    readBioLabel?: string;
    /** Heading above the past roles in the dialog. */
    previouslyLabel?: string;
    className?: string;
}

/**
 * Leadership portraits that open a dialog with the full bio. The dialog traps focus, closes on Escape and steps
 * through leaders with the arrow keys.
 */
export const LeadershipBios = ({
    leaders,
    eyebrow = "Leadership",
    title = "The people accountable for Meridian",
    description = "Our executive team has run supply chains, sold enterprise software and built forecasting systems. Select anyone to read their full bio.",
    readBioLabel = "Read bio",
    previouslyLabel = "Previously",
    className = "",
}: LeadershipBiosProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const triggers = useRef<(HTMLButtonElement | null)[]>([]);
    const lastOpened = useRef(0);

    const open = (index: number) => {
        lastOpened.current = index;
        setOpenIndex(index);
    };

    const close = () => {
        setOpenIndex(null);
        // Return focus to the card that opened the dialog.
        window.requestAnimationFrame(() => triggers.current[lastOpened.current]?.focus());
    };

    const step = (direction: 1 | -1) =>
        setOpenIndex((current) => {
            if (current === null) return current;
            const next = (current + direction + leaders.length) % leaders.length;
            lastOpened.current = next;
            return next;
        });

    return (
        <section className={`relative w-full bg-white px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-6xl">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">{eyebrow}</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">
                        {description}
                    </p>
                </div>

                <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                    {leaders.map((leader, i) => (
                        <li key={leader.name}>
                            <button ref={(el) => {
                                triggers.current[i] = el;
                            }}
                                    type="button" onClick={() => open(i)} aria-haspopup="dialog"
                                    className="group block w-full rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-950">
                                <span className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                                    <img src={leader.photo} alt="" loading="lazy"
                                         className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                                    <span className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-between rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 dark:bg-slate-900/90 dark:text-white">
                                        {readBioLabel}
                                        <LuArrowUpRight className="h-4 w-4"/>
                                    </span>
                                </span>
                                <span className="mt-4 block text-lg font-semibold text-slate-900 dark:text-white">{leader.name}</span>
                                <span className="block text-sm text-teal-700 dark:text-teal-400">{leader.role}</span>
                                <span className="mt-2 block text-sm leading-relaxed text-slate-600 dark:text-slate-400">{leader.summary}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <AnimatePresence>
                {openIndex !== null && (
                    <BioDialog key="dialog" leader={leaders[openIndex]} index={openIndex} total={leaders.length}
                               previouslyLabel={previouslyLabel} onClose={close} onStep={step}/>
                )}
            </AnimatePresence>
        </section>
    );
};


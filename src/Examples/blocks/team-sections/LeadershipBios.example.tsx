import {useEffect, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuArrowUpRight, LuChevronLeft, LuChevronRight, LuLinkedin, LuX} from "react-icons/lu";

interface Leader {
    name: string;
    role: string;
    photo: string;
    joined: string;
    summary: string;
    bio: string[];
    previously: string[];
}

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=600&h=750&fit=crop&crop=faces&q=75`;

const leaders: Leader[] = [
    {
        name: "Nadia Haddad", role: "Chief Executive Officer", photo: photo("1573496359142-b8d87734a5a2"), joined: "Co-founded 2019",
        summary: "Sets company strategy and spends a day a week with customers.",
        bio: [
            "Nadia started Meridian after six years running logistics for a grocery chain, where she watched planners rebuild the same forecast in spreadsheets every Monday.",
            "She leads strategy, fundraising and the customer advisory board, and still answers the first support ticket of every new enterprise account.",
        ],
        previously: ["VP Operations, FreshCart", "Supply chain analyst, Maersk"],
    },
    {
        name: "Daniel Okoro", role: "Chief Technology Officer", photo: photo("1507003211169-0a1dd7228f2d"), joined: "Co-founded 2019",
        summary: "Owns the forecasting engine, infrastructure and security.",
        bio: [
            "Daniel wrote the first version of the forecasting engine in a weekend and has rewritten it twice since, most recently to run 40 times faster on the same hardware.",
            "He leads 38 engineers across platform, data and security, and runs the monthly architecture review that anyone in the company can join.",
        ],
        previously: ["Staff engineer, Stripe", "Research engineer, Ocado"],
    },
    {
        name: "Mei Tanaka", role: "Chief Product Officer", photo: photo("1580489944761-15a19d654956"), joined: "Joined 2021",
        summary: "Leads product and design across planning and analytics.",
        bio: [
            "Mei joined from a design agency where she built tools for retail buyers. She introduced the weekly customer call rotation that every product manager now joins.",
            "Her team shipped scenario planning, which is now used by 70 percent of customers each week.",
        ],
        previously: ["Design director, Northbound Studio", "Product designer, Shopify"],
    },
    {
        name: "Samuel Reyes", role: "Chief Revenue Officer", photo: photo("1500648767791-00dcc994a43e"), joined: "Joined 2022",
        summary: "Runs sales, customer success and partnerships.",
        bio: [
            "Samuel built the sales team from four people to sixty and set up the partner program with three of the largest ERP resellers.",
            "He cares most about net retention, which has stayed above 120 percent for eight quarters.",
        ],
        previously: ["VP Sales, Linehaul", "Account director, Oracle NetSuite"],
    },
];

interface BioDialogProps {
    leader: Leader;
    index: number;
    onClose: () => void;
    onStep: (direction: 1 | -1) => void;
}

const BioDialog = ({leader, index, onClose, onStep}: BioDialogProps) => {
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
            <motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="leader-dialog-name" onKeyDown={onKeyDown}
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
                            <h3 id="leader-dialog-name" className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">{leader.name}</h3>
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
                    <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Previously</p>
                    <ul className="mt-2 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                        {leader.previously.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                        <a href="#" className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-slate-700 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-slate-300 dark:hover:text-white">
                            <LuLinkedin className="h-4 w-4"/> LinkedIn <LuArrowUpRight className="h-3.5 w-3.5"/>
                        </a>
                        <div className="flex items-center gap-1">
                            <span className="mr-2 text-xs tabular-nums text-slate-500">{index + 1} of {leaders.length}</span>
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

const LeadershipBios = () => {
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
        <section className="relative w-full bg-white px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950">
            <div className="mx-auto max-w-6xl">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">Leadership</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">The people accountable for Meridian</h2>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">
                        Our executive team has run supply chains, sold enterprise software and built forecasting systems. Select
                        anyone to read their full bio.
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
                                        Read bio
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
                    <BioDialog key="dialog" leader={leaders[openIndex]} index={openIndex} onClose={close} onStep={step}/>
                )}
            </AnimatePresence>
        </section>
    );
};

export default LeadershipBios;

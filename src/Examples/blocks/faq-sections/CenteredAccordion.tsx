import {useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuChevronDown} from "react-icons/lu";

export interface AccordionFaq {
    id: string;
    question: string;
    answer: string;
}

export interface CenteredAccordionProps {
    items: AccordionFaq[];
    /** Ids of the questions open on first render. Defaults to the first question. */
    defaultOpenIds?: string[];
    eyebrow?: string;
    title?: string;
    description?: string;
    expandAllLabel?: string;
    collapseAllLabel?: string;
    /** Text before the link under the list. */
    footerText?: string;
    footerLinkLabel?: string;
    footerHref?: string;
    className?: string;
}

/** A single column of questions that can open together, with an expand all toggle and arrow key navigation. */
export const CenteredAccordion = ({
    items,
    defaultOpenIds,
    eyebrow = "FAQ",
    title = "Questions we hear every week",
    description = "Short answers about privacy, performance and billing. Everything else is in the docs.",
    expandAllLabel = "Expand all",
    collapseAllLabel = "Collapse all",
    footerText = "Did not find your answer?",
    footerLinkLabel = "Email the team",
    footerHref = "#",
    className = "",
}: CenteredAccordionProps) => {
    const [open, setOpen] = useState<Set<string>>(() => new Set(defaultOpenIds ?? items.slice(0, 1).map((i) => i.id)));
    const uid = useId();
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const allOpen = open.size === items.length;

    const toggle = (id: string) => {
        setOpen((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    // Up, Down, Home and End move focus between questions, following the WAI-ARIA accordion pattern.
    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        let next: number | null = null;
        if (event.key === "ArrowDown") next = (index + 1) % items.length;
        else if (event.key === "ArrowUp") next = (index - 1 + items.length) % items.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = items.length - 1;
        if (next === null) return;
        event.preventDefault();
        buttonRefs.current[next]?.focus();
    };

    return (
        <section className={`w-full bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-2xl">
                <div className="text-center">
                    {eyebrow && <p className="text-sm font-medium text-teal-600 dark:text-teal-400">{eyebrow}</p>}
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        {title}
                    </h2>
                    {description && <p className="mt-4 text-slate-600 dark:text-slate-400">{description}</p>}
                </div>

                <div className="mt-12 flex justify-end">
                    <button
                        type="button"
                        onClick={() => setOpen(allOpen ? new Set() : new Set(items.map((i) => i.id)))}
                        className="rounded-md text-sm font-medium text-teal-700 outline-none hover:text-teal-900 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:text-teal-400 dark:hover:text-teal-300 dark:focus-visible:ring-offset-slate-950"
                    >
                        {allOpen ? collapseAllLabel : expandAllLabel}
                    </button>
                </div>

                <div className="mt-3 space-y-3">
                    {items.map((item, index) => {
                        const isOpen = open.has(item.id);
                        return (
                            <div
                                key={item.id}
                                className={`rounded-2xl border transition-colors duration-300 ${isOpen
                                    ? "border-teal-200 bg-teal-50/50 dark:border-teal-500/30 dark:bg-teal-500/5"
                                    : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"}`}
                            >
                                <h3>
                                    <button
                                        ref={(el) => {
                                            buttonRefs.current[index] = el;
                                        }}
                                        type="button"
                                        id={`${uid}-${item.id}-button`}
                                        aria-expanded={isOpen}
                                        aria-controls={`${uid}-${item.id}-panel`}
                                        onClick={() => toggle(item.id)}
                                        onKeyDown={(e) => onKeyDown(e, index)}
                                        className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-medium text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-teal-500 sm:px-6 sm:py-5 dark:text-white"
                                    >
                                        {item.question}
                                        <motion.span
                                            animate={{rotate: isOpen ? 180 : 0}}
                                            transition={{duration: 0.25}}
                                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${isOpen ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}
                                        >
                                            <LuChevronDown className="h-4 w-4"/>
                                        </motion.span>
                                    </button>
                                </h3>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={`${uid}-${item.id}-panel`}
                                            role="region"
                                            aria-labelledby={`${uid}-${item.id}-button`}
                                            initial={{height: 0, opacity: 0}}
                                            animate={{height: "auto", opacity: 1}}
                                            exit={{height: 0, opacity: 0}}
                                            transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-5 pb-5 pr-14 text-sm leading-relaxed text-slate-600 sm:px-6 sm:pr-16 dark:text-slate-300">{item.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {footerLinkLabel && (
                    <p className="mt-10 text-center text-sm text-slate-600 dark:text-slate-400">
                        {footerText}{" "}
                        <a href={footerHref} className="rounded font-medium text-slate-900 underline decoration-teal-500 decoration-2 underline-offset-4 outline-none hover:decoration-teal-700 focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-white">
                            {footerLinkLabel}
                        </a>
                    </p>
                )}
            </div>
        </section>
    );
};

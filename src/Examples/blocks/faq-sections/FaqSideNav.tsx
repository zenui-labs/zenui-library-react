import {useEffect, useId, useRef, useState} from "react";
import type {ComponentType, MouseEvent} from "react";
import {motion, useReducedMotion} from "framer-motion";

export type FaqSectionIcon = ComponentType<{className?: string}>;

export interface SideNavFaq {
    question: string;
    answer: string;
}

export interface SideNavSection {
    /** Used for the section's anchor, so keep it URL safe. */
    id: string;
    title: string;
    icon: FaqSectionIcon;
    faqs: SideNavFaq[];
}

export interface SideNavHelpCard {
    title: string;
    text: string;
    actionLabel: string;
    href: string;
}

const defaultHelpCard: SideNavHelpCard = {
    title: "Need a hand?",
    text: "Book a 20 minute call with a data specialist.",
    actionLabel: "Pick a time",
    href: "#",
};

export interface FaqSideNavProps {
    sections: SideNavSection[];
    title?: string;
    description?: string;
    /** Accessible name of the topic navigation. */
    navLabel?: string;
    /** The small card under the navigation on large screens. Pass null to hide it. */
    helpCard?: SideNavHelpCard | null;
    className?: string;
}

/** A long FAQ split into sections, with a navigation list that tracks the section in view. */
export const FaqSideNav = ({
    sections,
    title = "Help and answers",
    description = "Everything teams ask about Chartwell before and after they sign up, grouped by topic.",
    navLabel = "FAQ topics",
    helpCard = defaultHelpCard,
    className = "",
}: FaqSideNavProps) => {
    const [active, setActive] = useState(sections[0]?.id ?? "");
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const reduceMotion = useReducedMotion();
    // Prefixes anchor ids and the highlight's layoutId so two instances on one page do not clash.
    const prefix = `faq-${useId().replace(/:/g, "")}`;

    // Highlight the section nearest the top third of the viewport.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length === 0) return;
                visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                const id = (visible[0].target as HTMLElement).dataset.section;
                if (id) setActive(id);
            },
            {rootMargin: "-20% 0px -60% 0px"},
        );
        sectionRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, [sections]);

    const jumpTo = (event: MouseEvent<HTMLAnchorElement>, id: string, index: number) => {
        event.preventDefault();
        setActive(id);
        const target = sectionRefs.current[index];
        target?.scrollIntoView({behavior: reduceMotion ? "auto" : "smooth", block: "start"});
        target?.focus({preventScroll: true});
    };

    return (
        <section className={`w-full bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-6xl">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
                    {description && <p className="mt-3 text-slate-600 dark:text-slate-400">{description}</p>}
                </div>

                <div className="mt-12 grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
                    <nav aria-label={navLabel} className="lg:sticky lg:top-8 lg:self-start">
                        <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
                            {sections.map((section, i) => {
                                const isActive = section.id === active;
                                const Icon = section.icon;
                                return (
                                    <li key={section.id} className="shrink-0">
                                        <a
                                            href={`#${prefix}-${section.id}`}
                                            onClick={(e) => jumpTo(e, section.id, i)}
                                            aria-current={isActive ? "location" : undefined}
                                            className={`relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 ${isActive
                                                ? "text-indigo-700 dark:text-indigo-300"
                                                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
                                        >
                                            {isActive && (
                                                <motion.span layoutId={`${prefix}-active`}
                                                             transition={{type: "spring", bounce: 0.15, duration: 0.4}}
                                                             className="absolute inset-0 rounded-lg bg-indigo-50 dark:bg-indigo-500/10"/>
                                            )}
                                            <span className="relative"><Icon className="h-4 w-4"/></span>
                                            <span className="relative whitespace-nowrap">{section.title}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        {helpCard && (
                            <div className="mt-8 hidden rounded-2xl border border-slate-200 p-4 lg:block dark:border-slate-800">
                                <p className="text-sm font-medium text-slate-900 dark:text-white">{helpCard.title}</p>
                                <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{helpCard.text}</p>
                                <a href={helpCard.href} className="mt-3 inline-block rounded text-xs font-semibold text-indigo-600 outline-none hover:text-indigo-800 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-400">
                                    {helpCard.actionLabel}
                                </a>
                            </div>
                        )}
                    </nav>

                    <div className="space-y-14">
                        {sections.map((section, i) => {
                            const Icon = section.icon;
                            return (
                                <section
                                    key={section.id}
                                    id={`${prefix}-${section.id}`}
                                    ref={(el) => {
                                        sectionRefs.current[i] = el;
                                    }}
                                    data-section={section.id}
                                    tabIndex={-1}
                                    aria-labelledby={`${prefix}-${section.id}-title`}
                                    className="scroll-mt-8 outline-none"
                                >
                                    <h3 id={`${prefix}-${section.id}-title`} className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-white">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white"><Icon className="h-4 w-4"/></span>
                                        {section.title}
                                    </h3>
                                    <dl className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-2">
                                        {section.faqs.map((faq) => (
                                            <div key={faq.question}>
                                                <dt className="font-medium text-slate-900 dark:text-white">{faq.question}</dt>
                                                <dd className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{faq.answer}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </section>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

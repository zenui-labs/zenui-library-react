import {useId} from "react";
import type {ComponentType} from "react";
import {motion} from "framer-motion";
import {LuArrowRight} from "react-icons/lu";

export type FaqTopicIcon = ComponentType<{className?: string}>;

export interface FaqPair {
    question: string;
    answer: string;
}

export interface FaqTopic {
    /** Used for the jump link, so keep it URL safe. */
    id: string;
    title: string;
    icon: FaqTopicIcon;
    /** Tailwind classes for the icon badge, for example "bg-sky-100 text-sky-700". */
    tone?: string;
    faqs: FaqPair[];
    /** Where the link at the bottom of the card goes. */
    href?: string;
}

export interface FaqTopicCardProps {
    topic: FaqTopic;
    /** Position in the grid, used to stagger the entrance. */
    index?: number;
    /** The element id, which the jump links point to. */
    anchorId?: string;
    /** Builds the link text at the bottom of the card from the topic title. */
    moreLabel?: (title: string) => string;
}

const defaultTone = "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300";
const defaultMoreLabel = (title: string) => `More about ${title.toLowerCase()}`;

/** A single topic card with every answer visible. */
export const FaqTopicCard = ({topic, index = 0, anchorId, moreLabel = defaultMoreLabel}: FaqTopicCardProps) => {
    const fallbackId = useId();
    const id = anchorId ?? fallbackId;
    const Icon = topic.icon;
    return (
        <motion.section
            id={id}
            aria-labelledby={`${id}-title`}
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{delay: (index % 2) * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
            className="scroll-mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900"
        >
            <h3 id={`${id}-title`} className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-white">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${topic.tone ?? defaultTone}`}><Icon className="h-4 w-4"/></span>
                {topic.title}
            </h3>
            <dl className="mt-6 divide-y divide-slate-100 dark:divide-slate-800">
                {topic.faqs.map((faq) => (
                    <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
                        <dt className="font-medium text-slate-900 dark:text-white">{faq.question}</dt>
                        <dd className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{faq.answer}</dd>
                    </div>
                ))}
            </dl>
            <a
                href={topic.href ?? "#"}
                className="group mt-6 inline-flex items-center gap-1 rounded text-sm font-medium text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-white"
            >
                {moreLabel(topic.title)}
                <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
            </a>
        </motion.section>
    );
};

export interface FaqCardGridProps {
    topics: FaqTopic[];
    title?: string;
    description?: string;
    /** Accessible name of the topic links at the top. */
    navLabel?: string;
    moreLabel?: (title: string) => string;
    className?: string;
}

/** Topic cards with every answer visible and jump links to each topic. */
export const FaqCardGrid = ({
    topics,
    title = "Good to know before you switch",
    description = "The questions studios and clinics ask most often when they move their bookings to Slotwise.",
    navLabel = "Jump to topic",
    moreLabel,
    className = "",
}: FaqCardGridProps) => {
    // Prefixes the anchor ids so two grids on one page do not clash.
    const prefix = `faq-grid-${useId().replace(/:/g, "")}`;
    return (
        <section className={`w-full bg-slate-50 px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                            {title}
                        </h2>
                        {description && <p className="mt-3 text-slate-600 dark:text-slate-400">{description}</p>}
                    </div>
                    <nav aria-label={navLabel}>
                        <ul className="flex flex-wrap gap-2">
                            {topics.map((topic) => {
                                const Icon = topic.icon;
                                return (
                                    <li key={topic.id}>
                                        <a
                                            href={`#${prefix}-${topic.id}`}
                                            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 outline-none transition-colors hover:border-slate-300 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white"
                                        >
                                            <Icon className="h-4 w-4"/> {topic.title}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>

                <div className="mt-12 grid gap-5 md:grid-cols-2">
                    {topics.map((topic, g) => (
                        <FaqTopicCard key={topic.id} topic={topic} index={g} anchorId={`${prefix}-${topic.id}`} moreLabel={moreLabel}/>
                    ))}
                </div>
            </div>
        </section>
    );
};

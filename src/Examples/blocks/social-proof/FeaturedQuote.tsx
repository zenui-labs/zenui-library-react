import type {ReactNode} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuArrowUpRight} from "react-icons/lu";

export interface QuoteMetric {
    value: string;
    label: string;
}

export interface QuoteAuthor {
    name: string;
    /** Job title and company on the line under the name. */
    title: string;
    initials: string;
    /** Tailwind gradient classes for the initials avatar. Defaults to amber to orange. */
    avatar?: string;
}

export interface QuoteLink {
    label: string;
    href: string;
}

export interface FeaturedQuoteProps {
    /** Plain text quote. It is revealed word by word, and screen readers get it in one piece. */
    quote: string;
    author: QuoteAuthor;
    /** Company logo or wordmark shown above the quote. */
    logo?: ReactNode;
    metrics: QuoteMetric[];
    /** Label at the top of the results card. */
    metricsTitle?: string;
    /** Link at the bottom of the results card, for example to the full case study. */
    link?: QuoteLink;
    /** Seconds between each word of the reveal. */
    wordDelay?: number;
    className?: string;
}

/** A single large customer quote with a word by word reveal, next to a card of measured results. */
export const FeaturedQuote = ({
    quote,
    author,
    logo,
    metrics,
    metricsTitle = "Results after 12 months",
    link,
    wordDelay = 0.035,
    className = "",
}: FeaturedQuoteProps) => {
    const reduceMotion = useReducedMotion();
    const words = quote.split(" ");

    return (
        <section className={`w-full bg-stone-50 px-4 py-16 sm:px-8 sm:py-24 dark:bg-stone-950 ${className}`}>
            <div className="mx-auto max-w-6xl">
                <figure className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
                    <div>
                        {logo}
                        <blockquote className="mt-10 font-serif text-3xl leading-[1.25] tracking-tight text-stone-900 sm:text-4xl lg:text-[2.75rem] dark:text-stone-50">
                            <span aria-hidden="true" className="-ml-3 mr-1 text-stone-300 dark:text-stone-700">“</span>
                            {/* Screen readers get the sentence in one piece; the animated words are hidden from them. */}
                            <span className="sr-only">{quote}</span>
                            <span aria-hidden="true">
                                {words.map((word, i) => (
                                    <motion.span
                                        key={i}
                                        className="inline-block"
                                        initial={reduceMotion ? false : {opacity: 0.15}}
                                        whileInView={{opacity: 1}}
                                        viewport={{once: true, amount: 0.8}}
                                        transition={{delay: i * wordDelay, duration: 0.4}}
                                    >
                                        {word}&nbsp;
                                    </motion.span>
                                ))}
                            </span>
                            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">”</span>
                        </blockquote>
                        <figcaption className="mt-10 flex items-center gap-4">
                            <span className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-lg font-semibold text-white ring-4 ring-white dark:ring-stone-900 ${author.avatar ?? "from-amber-300 to-orange-500"}`}>
                                {author.initials}
                            </span>
                            <span>
                                <span className="block font-semibold text-stone-900 dark:text-white">{author.name}</span>
                                <span className="block text-sm text-stone-500 dark:text-stone-400">{author.title}</span>
                            </span>
                        </figcaption>
                    </div>

                    <div className="relative overflow-hidden rounded-[2rem] bg-stone-900 p-8 text-white dark:bg-stone-900 dark:ring-1 dark:ring-white/10">
                        <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl"/>
                        <p className="relative text-sm font-medium text-orange-300">{metricsTitle}</p>
                        <dl className="relative mt-8 space-y-7">
                            {metrics.map((metric, i) => (
                                <motion.div
                                    key={metric.label}
                                    initial={{opacity: 0, y: 12}}
                                    whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: true}}
                                    transition={{delay: 0.2 + i * 0.12, duration: 0.5}}
                                    className="flex flex-col border-t border-white/10 pt-6 first:border-t-0 first:pt-0"
                                >
                                    <dt className="order-2 mt-1 text-sm text-stone-400">{metric.label}</dt>
                                    <dd className="order-1 text-4xl font-semibold tracking-tight">{metric.value}</dd>
                                </motion.div>
                            ))}
                        </dl>
                        {link && (
                            <a
                                href={link.href}
                                className="group relative mt-10 flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4 text-sm font-medium outline-none transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-orange-300"
                            >
                                {link.label}
                                <LuArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
                            </a>
                        )}
                    </div>
                </figure>
            </div>
        </section>
    );
};

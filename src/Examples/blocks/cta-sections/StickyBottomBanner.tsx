import {useEffect, useId, useRef, useState} from "react";
import type {ChangeEvent, FormEvent} from "react";
import {AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll} from "framer-motion";
import {LuCheck, LuX} from "react-icons/lu";

export interface BlogPost {
    /** Small label above the title, for example "Engineering". */
    category: string;
    title: string;
    /** Author and reading time line under the title. */
    byline: string;
    paragraphs: string[];
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface SubscribeBannerProps {
    open: boolean;
    /** True once the reader subscribed, which swaps the form for the confirmation. */
    subscribed: boolean;
    onSubscribe: (email: string) => void;
    onDismiss: () => void;
    title?: string;
    description?: string;
    buttonLabel?: string;
    placeholder?: string;
    successMessage?: string;
    invalidEmailMessage?: string;
    ariaLabel?: string;
    className?: string;
}

/** The dark subscribe bar that slides up from the bottom. Place it inside a sticky or fixed wrapper. */
export const SubscribeBanner = ({
    open,
    subscribed,
    onSubscribe,
    onDismiss,
    title = "Get the next engineering post by email",
    description = "Two posts a month. No product announcements.",
    buttonLabel = "Subscribe",
    placeholder = "you@company.com",
    successMessage = "Subscribed. The next post lands in about two weeks.",
    invalidEmailMessage = "Enter a valid email address",
    ariaLabel = "Subscribe to the engineering blog",
    className = "",
}: SubscribeBannerProps) => {
    const reduceMotion = useReducedMotion();
    const inputId = useId();
    const errorId = useId();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!emailPattern.test(email.trim())) {
            setError(invalidEmailMessage);
            return;
        }
        setError("");
        onSubscribe(email.trim());
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.aside
                    aria-label={ariaLabel}
                    initial={reduceMotion ? {opacity: 0} : {y: "120%", opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    exit={reduceMotion ? {opacity: 0} : {y: "120%", opacity: 0}}
                    transition={{type: "spring", stiffness: 260, damping: 28}}
                    className={`pointer-events-auto relative rounded-2xl bg-slate-900 p-4 text-white shadow-2xl ring-1 ring-black/5 sm:p-5 dark:bg-slate-800 dark:ring-white/10 ${className}`}
                >
                    <button type="button" onClick={onDismiss} aria-label="Dismiss"
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-teal-400">
                        <LuX className="h-4 w-4"/>
                    </button>

                    {subscribed ? (
                        <p role="status" className="flex items-center gap-2 pr-8 text-sm font-medium">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-400 text-slate-900">
                                <LuCheck className="h-3.5 w-3.5"/>
                            </span>
                            {successMessage}
                        </p>
                    ) : (
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
                            <div className="pr-8 md:pr-0">
                                <p className="text-sm font-semibold">{title}</p>
                                <p className="mt-0.5 text-xs text-slate-400">{description}</p>
                            </div>
                            <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col gap-1.5 md:pr-8">
                                <div className="flex gap-2">
                                    <label htmlFor={inputId} className="sr-only">Email address</label>
                                    <input id={inputId} type="email" autoComplete="email" value={email} placeholder={placeholder}
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                               setEmail(e.target.value);
                                               if (error) setError("");
                                           }}
                                           aria-invalid={error ? true : undefined}
                                           aria-describedby={error ? errorId : undefined}
                                           className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30"/>
                                    <button type="submit"
                                            className="shrink-0 rounded-lg bg-teal-400 px-4 py-2 text-sm font-semibold text-slate-900 outline-none transition-colors hover:bg-teal-300 focus-visible:ring-2 focus-visible:ring-white">
                                        {buttonLabel}
                                    </button>
                                </div>
                                {error && <p id={errorId} className="text-xs text-rose-300">{error}</p>}
                            </form>
                        </div>
                    )}
                </motion.aside>
            )}
        </AnimatePresence>
    );
};

export interface StickyBottomBannerProps {
    post: BlogPost;
    /** Share of the post, from 0 to 1, the reader scrolls before the banner appears. */
    threshold?: number;
    /** Milliseconds the confirmation stays before the banner hides. */
    hideAfter?: number;
    onSubscribe?: (email: string) => void;
    onDismiss?: () => void;
    /** Hint above the preview box. Pass an empty string to hide it. */
    hint?: string;
    showAgainLabel?: string;
    bannerTitle?: string;
    bannerDescription?: string;
    className?: string;
}

/** A blog post preview with a reading progress bar and a dismissible subscribe banner that slides up partway through. */
export const StickyBottomBanner = ({
    post,
    threshold = 0.33,
    hideAfter = 2600,
    onSubscribe,
    onDismiss,
    hint = "Scroll the post to see the banner appear.",
    showAgainLabel = "Show the banner again",
    bannerTitle,
    bannerDescription,
    className = "",
}: StickyBottomBannerProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const {scrollYProgress} = useScroll({container: scrollRef});
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    // Bumped by "show again" so the banner starts over with an empty field.
    const [round, setRound] = useState(0);

    // Show the banner once the reader passes the threshold.
    useMotionValueEvent(scrollYProgress, "change", (value) => setVisible(value > threshold));

    // Hide the banner a moment after a successful signup.
    useEffect(() => {
        if (!subscribed) return;
        const timer = window.setTimeout(() => setDismissed(true), hideAfter);
        return () => window.clearTimeout(timer);
    }, [subscribed, hideAfter]);

    const handleSubscribe = (email: string) => {
        setSubscribed(true);
        onSubscribe?.(email);
    };

    const handleDismiss = () => {
        setDismissed(true);
        onDismiss?.();
    };

    const open = visible && !dismissed;

    return (
        <section className={`w-full bg-slate-100 px-4 py-12 sm:px-8 dark:bg-slate-900 ${className}`}>
            {hint && (
                <p className="mx-auto mb-4 max-w-3xl text-center text-sm text-slate-500 dark:text-slate-400">
                    {hint}
                </p>
            )}

            <div ref={scrollRef} tabIndex={0} aria-label="Blog post preview"
                 className="relative mx-auto h-[560px] max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-slate-800 dark:bg-slate-950">
                {/* Reading progress */}
                <div className="sticky top-0 z-10 h-1 bg-slate-100 dark:bg-slate-900">
                    <motion.div className="h-full origin-left bg-teal-500" style={{scaleX: scrollYProgress}}/>
                </div>

                <article className="px-5 pb-40 pt-10 sm:px-12">
                    <p className="text-sm font-medium text-teal-600 dark:text-teal-400">{post.category}</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                        {post.title}
                    </h2>
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{post.byline}</p>
                    <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                        {post.paragraphs.map((text) => <p key={text.slice(0, 24)}>{text}</p>)}
                    </div>
                </article>

                <div className="pointer-events-none sticky bottom-0 z-10 px-3 pb-3 sm:px-4 sm:pb-4">
                    <SubscribeBanner
                        key={round}
                        open={open}
                        subscribed={subscribed}
                        onSubscribe={handleSubscribe}
                        onDismiss={handleDismiss}
                        title={bannerTitle}
                        description={bannerDescription}
                    />
                </div>
            </div>

            {dismissed && (
                <div className="mx-auto mt-4 flex max-w-3xl justify-center">
                    <button type="button"
                            onClick={() => {
                                setDismissed(false);
                                setSubscribed(false);
                                setRound((value) => value + 1);
                            }}
                            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-slate-400 dark:hover:text-white">
                        {showAgainLabel}
                    </button>
                </div>
            )}
        </section>
    );
};

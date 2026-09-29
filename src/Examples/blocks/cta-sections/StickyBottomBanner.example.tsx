import {useEffect, useRef, useState} from "react";
import type {ChangeEvent, FormEvent} from "react";
import {AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll} from "framer-motion";
import {LuCheck, LuX} from "react-icons/lu";

type Status = "idle" | "done";

const paragraphs: string[] = [
    "Our API gateway used to take 1.8 seconds to answer its first request after a deploy. For most endpoints nobody noticed. For the checkout webhook, it meant a retry storm every Tuesday afternoon.",
    "We started by measuring where the time went. Almost half of it was spent loading configuration for 40 tenants that the new instance would never serve. The rest was split between opening database pools and compiling route handlers on demand.",
    "The first fix was the boring one. We moved tenant configuration behind a lazy loader with a small in-memory cache, so an instance only pays for the tenants it actually receives. That alone took cold starts from 1.8 seconds to 1.1.",
    "Database pools were next. Instead of opening ten connections up front, each instance now opens two and grows under load. Our connection proxy already handled bursts, so the only change we saw in production was a shorter boot log.",
    "Route compilation was the most interesting part. We generate a manifest at build time and ship it with the container, so the router starts with every handler already resolved. This saved another 300 milliseconds and removed a class of errors that only appeared on the first request.",
    "The result is a cold start of 720 milliseconds, down 60 percent, and no retry storms since March. Next quarter we want to move the manifest step into the shared build image so every service gets it for free.",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const StickyBottomBanner = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const {scrollYProgress} = useScroll({container: scrollRef});
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [status, setStatus] = useState<Status>("idle");

    // Show the banner once the reader is a third of the way through the post.
    useMotionValueEvent(scrollYProgress, "change", (value) => setVisible(value > 0.33));

    // Hide the banner a moment after a successful signup.
    useEffect(() => {
        if (status !== "done") return;
        const timer = window.setTimeout(() => setDismissed(true), 2600);
        return () => window.clearTimeout(timer);
    }, [status]);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!emailPattern.test(email.trim())) {
            setError("Enter a valid email address");
            return;
        }
        setError("");
        setStatus("done");
    };

    const open = visible && !dismissed;

    return (
        <section className="w-full bg-slate-100 px-4 py-12 sm:px-8 dark:bg-slate-900">
            <p className="mx-auto mb-4 max-w-3xl text-center text-sm text-slate-500 dark:text-slate-400">
                Scroll the post to see the banner appear.
            </p>

            <div ref={scrollRef} tabIndex={0} aria-label="Blog post preview"
                 className="relative mx-auto h-[560px] max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-slate-800 dark:bg-slate-950">
                {/* Reading progress */}
                <div className="sticky top-0 z-10 h-1 bg-slate-100 dark:bg-slate-900">
                    <motion.div className="h-full origin-left bg-teal-500" style={{scaleX: scrollYProgress}}/>
                </div>

                <article className="px-5 pb-40 pt-10 sm:px-12">
                    <p className="text-sm font-medium text-teal-600 dark:text-teal-400">Engineering</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                        How we cut cold start time by 60 percent
                    </h2>
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Hana Okafor, platform team. 7 min read</p>
                    <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                        {paragraphs.map((text) => <p key={text.slice(0, 24)}>{text}</p>)}
                    </div>
                </article>

                <div className="pointer-events-none sticky bottom-0 z-10 px-3 pb-3 sm:px-4 sm:pb-4">
                    <AnimatePresence>
                        {open && (
                            <motion.aside
                                aria-label="Subscribe to the engineering blog"
                                initial={reduceMotion ? {opacity: 0} : {y: "120%", opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                exit={reduceMotion ? {opacity: 0} : {y: "120%", opacity: 0}}
                                transition={{type: "spring", stiffness: 260, damping: 28}}
                                className="pointer-events-auto relative rounded-2xl bg-slate-900 p-4 text-white shadow-2xl ring-1 ring-black/5 sm:p-5 dark:bg-slate-800 dark:ring-white/10"
                            >
                                <button type="button" onClick={() => setDismissed(true)} aria-label="Dismiss"
                                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-teal-400">
                                    <LuX className="h-4 w-4"/>
                                </button>

                                {status === "done" ? (
                                    <p role="status" className="flex items-center gap-2 pr-8 text-sm font-medium">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-400 text-slate-900">
                                            <LuCheck className="h-3.5 w-3.5"/>
                                        </span>
                                        Subscribed. The next post lands in about two weeks.
                                    </p>
                                ) : (
                                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
                                        <div className="pr-8 md:pr-0">
                                            <p className="text-sm font-semibold">Get the next engineering post by email</p>
                                            <p className="mt-0.5 text-xs text-slate-400">Two posts a month. No product announcements.</p>
                                        </div>
                                        <form onSubmit={onSubmit} noValidate className="flex flex-1 flex-col gap-1.5 md:pr-8">
                                            <div className="flex gap-2">
                                                <label htmlFor="post-banner-email" className="sr-only">Email address</label>
                                                <input id="post-banner-email" type="email" autoComplete="email" value={email} placeholder="you@company.com"
                                                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                           setEmail(e.target.value);
                                                           if (error) setError("");
                                                       }}
                                                       aria-invalid={error ? true : undefined}
                                                       aria-describedby={error ? "post-banner-error" : undefined}
                                                       className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30"/>
                                                <button type="submit"
                                                        className="shrink-0 rounded-lg bg-teal-400 px-4 py-2 text-sm font-semibold text-slate-900 outline-none transition-colors hover:bg-teal-300 focus-visible:ring-2 focus-visible:ring-white">
                                                    Subscribe
                                                </button>
                                            </div>
                                            {error && <p id="post-banner-error" className="text-xs text-rose-300">{error}</p>}
                                        </form>
                                    </div>
                                )}
                            </motion.aside>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {dismissed && (
                <div className="mx-auto mt-4 flex max-w-3xl justify-center">
                    <button type="button"
                            onClick={() => {
                                setDismissed(false);
                                setStatus("idle");
                                setEmail("");
                            }}
                            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-slate-400 dark:hover:text-white">
                        Show the banner again
                    </button>
                </div>
            )}
        </section>
    );
};

export default StickyBottomBanner;

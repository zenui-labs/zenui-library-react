import {useId, useMemo, useState} from "react";
import type {ChangeEvent, FormEvent, KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {FaApple, FaGooglePlay} from "react-icons/fa";
import {LuCheck, LuLoader, LuStar, LuTrophy} from "react-icons/lu";

type Tab = "scan" | "text";
type SendStatus = "idle" | "sending" | "sent";

const QR_SIZE = 25;

// Small seeded random generator so the placeholder QR pattern is identical on every render.
const seeded = (seed: number) => () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const inFinder = (x: number, y: number) => {
    const corners: [number, number][] = [[0, 0], [QR_SIZE - 7, 0], [0, QR_SIZE - 7]];
    return corners.some(([cx, cy]) => x >= cx - 1 && x <= cx + 7 && y >= cy - 1 && y <= cy + 7);
};

const buildModules = (seed: number) => {
    const random = seeded(seed);
    const cells: [number, number][] = [];
    for (let y = 0; y < QR_SIZE; y++) {
        for (let x = 0; x < QR_SIZE; x++) {
            if (!inFinder(x, y) && random() > 0.52) cells.push([x, y]);
        }
    }
    return cells;
};

const Finder = ({x, y}: {x: number; y: number}) => (
    <g>
        <rect x={x} y={y} width="7" height="7" rx="1.6" fill="currentColor"/>
        <rect x={x + 1} y={y + 1} width="5" height="5" rx="1.1" className="fill-white"/>
        <rect x={x + 2} y={y + 2} width="3" height="3" rx="0.8" fill="currentColor"/>
    </g>
);

export interface PlaceholderQrCodeProps {
    /** Accessible name, for example "QR code that opens the download page". */
    label: string;
    /** Changes the pattern. */
    seed?: number;
    className?: string;
}

/** A decorative QR-style pattern for mockups. Generate a real code from your download link in production. */
export const PlaceholderQrCode = ({label, seed = 42, className = ""}: PlaceholderQrCodeProps) => {
    const modules = useMemo(() => buildModules(seed), [seed]);
    return (
        <svg viewBox={`-1 -1 ${QR_SIZE + 2} ${QR_SIZE + 2}`} role="img" aria-label={label}
             className={`h-36 w-36 rounded-xl bg-white p-2 text-slate-900 ${className}`}>
            {modules.map(([x, y]) => <rect key={`${x}-${y}`} x={x + 0.08} y={y + 0.08} width="0.84" height="0.84" rx="0.25" fill="currentColor"/>)}
            <Finder x={0} y={0}/>
            <Finder x={QR_SIZE - 7} y={0}/>
            <Finder x={0} y={QR_SIZE - 7}/>
        </svg>
    );
};

export interface DailyStat {
    /** Short day label under the bar, for example "M". */
    day: string;
    value: number;
}

export interface PhoneAchievement {
    title: string;
    detail: string;
}

export interface PhoneStatsMockupProps {
    /** Bars along the bottom of the screen, one per day. */
    days: DailyStat[];
    /** Share of the goal reached, from 0 to 1. */
    progress: number;
    /** Headline figure, for example "35.3 km". */
    total: string;
    periodLabel?: string;
    /** Text under the percentage, for example "of 50 km goal". */
    goalLabel?: string;
    /** Floating card beside the phone. Leave out to hide it. */
    achievement?: PhoneAchievement;
    className?: string;
}

/** A phone frame showing a goal ring and a weekly bar chart that animate in when scrolled into view. */
export const PhoneStatsMockup = ({
    days,
    progress,
    total,
    periodLabel = "This week",
    goalLabel = "of goal",
    achievement,
    className = "",
}: PhoneStatsMockupProps) => {
    const reduceMotion = useReducedMotion();
    const max = Math.max(...days.map((d) => d.value)) || 1;
    return (
        <div className={`relative mx-auto w-[260px] ${className}`}>
            <div className="rounded-[2.75rem] border border-white/10 bg-slate-950 p-2.5 shadow-2xl shadow-emerald-950/50">
                <div className="relative overflow-hidden rounded-[2.2rem] bg-gradient-to-b from-slate-900 to-slate-950 px-5 pb-6 pt-10">
                    <span aria-hidden="true" className="absolute left-1/2 top-2.5 h-5 w-20 -translate-x-1/2 rounded-full bg-black"/>
                    <p className="text-xs text-slate-400">{periodLabel}</p>
                    <p className="text-2xl font-semibold text-white">{total}</p>

                    <div className="relative mx-auto mt-5 h-36 w-36">
                        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
                            <circle cx="60" cy="60" r="50" fill="none" strokeWidth="10" className="stroke-white/10"/>
                            <motion.circle cx="60" cy="60" r="50" fill="none" strokeWidth="10" strokeLinecap="round"
                                           className="stroke-emerald-400"
                                           initial={{pathLength: reduceMotion ? progress : 0}}
                                           whileInView={{pathLength: progress}}
                                           viewport={{once: true}}
                                           transition={{duration: 1.2, ease: "easeOut", delay: 0.3}}/>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-semibold text-white">{Math.round(progress * 100)}%</span>
                            <span className="text-[10px] text-slate-400">{goalLabel}</span>
                        </div>
                    </div>

                    <div className="mt-6 flex h-20 items-end justify-between gap-1.5" aria-hidden="true">
                        {days.map((d, i) => (
                            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                                <motion.span className="w-full origin-bottom rounded-md bg-emerald-400/80"
                                             style={{height: `${Math.max(6, (d.value / max) * 56)}px`}}
                                             initial={{scaleY: reduceMotion ? 1 : 0}}
                                             whileInView={{scaleY: 1}}
                                             viewport={{once: true}}
                                             transition={{delay: 0.5 + i * 0.06, duration: 0.4}}/>
                                <span className="text-[10px] text-slate-500">{d.day}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {achievement && (
                <motion.div initial={{opacity: 0, x: -16}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{delay: 1.1}}
                            className="absolute -left-4 top-24 flex items-center gap-2.5 rounded-2xl bg-white px-3 py-2.5 shadow-xl sm:-left-16 dark:bg-slate-800">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-400/15 dark:text-amber-300">
                        <LuTrophy className="h-4 w-4"/>
                    </span>
                    <div>
                        <p className="text-xs font-semibold text-slate-900 dark:text-white">{achievement.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{achievement.detail}</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export interface StoreRating {
    /** Average score out of 5. */
    score: number;
    count: number;
}

export interface AppDownloadProps {
    /** Used in the store badge labels, for example "Download Stride on the App Store". */
    appName: string;
    appStoreHref: string;
    playStoreHref: string;
    /** The code shown on the Scan tab, for example a PlaceholderQrCode or your generated code. */
    qrCode: ReactNode;
    /** The visual on the right, for example a PhoneStatsMockup or a screenshot. */
    preview: ReactNode;
    /** Stars above the heading. Leave out to hide them. */
    rating?: StoreRating;
    /** Called with the number as typed. Return a promise to show the loading state until it settles. */
    onSendLink?: (phone: string) => void | Promise<unknown>;
    title?: string;
    description?: string;
    handoffLabel?: string;
    scanTabLabel?: string;
    textTabLabel?: string;
    scanHint?: string;
    phoneLabel?: string;
    phonePlaceholder?: string;
    sendLabel?: string;
    phoneHint?: string;
    /** Shown after "Link sent to {phone}." */
    sentNote?: string;
    invalidPhoneMessage?: string;
    failedMessage?: string;
    className?: string;
}

/** A mobile app promotion with store badges, a product visual and a desktop hand-off with a QR code or a text message link. */
export const AppDownload = ({
    appName,
    appStoreHref,
    playStoreHref,
    qrCode,
    preview,
    rating,
    onSendLink,
    title = "Every run, planned and tracked from your pocket",
    description = "Stride builds a training plan around your race date, adjusts it after each run and works offline on the trail. Free for 30 days on iPhone and Android.",
    handoffLabel = "Get the app on your phone",
    scanTabLabel = "Scan code",
    textTabLabel = "Text me a link",
    scanHint = "Point your phone camera at the code. It opens the right store for your device.",
    phoneLabel = "Mobile number",
    phonePlaceholder = "(555) 010 2231",
    sendLabel = "Send link",
    phoneHint = "One text, no marketing messages.",
    sentNote = "It expires in 24 hours.",
    invalidPhoneMessage = "Enter a 10 digit mobile number",
    failedMessage = "We could not send the link. Try again in a moment.",
    className = "",
}: AppDownloadProps) => {
    const id = useId();
    const [tab, setTab] = useState<Tab>("scan");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [sendStatus, setSendStatus] = useState<SendStatus>("idle");

    const tabs: {id: Tab; label: string}[] = [
        {id: "scan", label: scanTabLabel},
        {id: "text", label: textTabLabel},
    ];
    const tabId = (t: Tab) => `${id}-tab-${t}`;
    const panelId = (t: Tab) => `${id}-panel-${t}`;
    const phoneId = `${id}-phone`;
    const phoneErrorId = `${id}-phone-error`;
    const phoneHintId = `${id}-phone-hint`;

    const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const next: Tab = tab === "scan" ? "text" : "scan";
        setTab(next);
        document.getElementById(tabId(next))?.focus();
    };

    const onSend = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (phone.replace(/\D/g, "").length < 10) {
            setError(invalidPhoneMessage);
            return;
        }
        setError("");
        setSendStatus("sending");
        try {
            await onSendLink?.(phone);
            setSendStatus("sent");
        } catch {
            setSendStatus("idle");
            setError(failedMessage);
        }
    };

    return (
        <section className={`relative w-full overflow-hidden bg-emerald-950 px-4 py-16 sm:px-8 sm:py-20 ${className}`}>
            <div aria-hidden="true" className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-emerald-500/20 blur-3xl"/>
            <div aria-hidden="true" className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-lime-400/10 blur-3xl"/>

            <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
                <div>
                    {rating && (
                        <div className="mb-4 flex items-center gap-2 text-sm text-emerald-100/80">
                            <span className="flex text-amber-300" aria-hidden="true">
                                {Array.from({length: 5}, (_, i) => <LuStar key={i} className="h-4 w-4 fill-current"/>)}
                            </span>
                            {rating.score} from {rating.count.toLocaleString("en-US")} ratings
                        </div>
                    )}
                    <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                        {title}
                    </h2>
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-emerald-100/75">
                        {description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href={appStoreHref} aria-label={`Download ${appName} on the App Store`}
                           className="inline-flex items-center gap-3 rounded-xl bg-white px-4 py-2.5 text-slate-900 outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950">
                            <FaApple className="h-7 w-7"/>
                            <span className="text-left leading-tight">
                                <span className="block text-[10px]">Download on the</span>
                                <span className="block text-base font-semibold">App Store</span>
                            </span>
                        </a>
                        <a href={playStoreHref} aria-label={`Get ${appName} on Google Play`}
                           className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-black/40 px-4 py-2.5 text-white outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950">
                            <FaGooglePlay className="h-6 w-6"/>
                            <span className="text-left leading-tight">
                                <span className="block text-[10px] uppercase tracking-wide">Get it on</span>
                                <span className="block text-base font-semibold">Google Play</span>
                            </span>
                        </a>
                    </div>

                    {/* Hand-off from desktop to phone. Hidden on small screens, where the store badges are enough. */}
                    <div className="mt-10 hidden max-w-md rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur md:block">
                        <div role="tablist" aria-label={handoffLabel} className="flex gap-1 rounded-lg bg-black/20 p-1">
                            {tabs.map((t) => (
                                <button key={t.id} id={tabId(t.id)} type="button" role="tab"
                                        aria-selected={tab === t.id} aria-controls={panelId(t.id)}
                                        tabIndex={tab === t.id ? 0 : -1}
                                        onClick={() => setTab(t.id)} onKeyDown={onTabKeyDown}
                                        className="relative flex-1 rounded-md px-3 py-1.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-lime-300">
                                    {tab === t.id && <motion.span layoutId={`${id}-tab`} className="absolute inset-0 rounded-md bg-white/15" transition={{type: "spring", bounce: 0.2, duration: 0.4}}/>}
                                    <span className={`relative ${tab === t.id ? "text-white" : "text-emerald-100/70"}`}>{t.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="mt-4 min-h-[148px]">
                            <AnimatePresence mode="wait" initial={false}>
                                {tab === "scan" ? (
                                    <motion.div key="scan" id={panelId("scan")} role="tabpanel" aria-labelledby={tabId("scan")}
                                                initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -6}}
                                                className="flex items-center gap-5">
                                        {qrCode}
                                        <p className="text-sm leading-relaxed text-emerald-100/80">
                                            {scanHint}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div key="text" id={panelId("text")} role="tabpanel" aria-labelledby={tabId("text")}
                                                initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -6}}>
                                        {sendStatus === "sent" ? (
                                            <p role="status" className="flex items-center gap-2 rounded-xl bg-lime-300/15 p-4 text-sm text-lime-100">
                                                <LuCheck className="h-4 w-4 shrink-0"/>
                                                Link sent to {phone}. {sentNote}
                                            </p>
                                        ) : (
                                            <form onSubmit={onSend} noValidate>
                                                <label htmlFor={phoneId} className="text-sm font-medium text-white">{phoneLabel}</label>
                                                <div className="mt-2 flex gap-2">
                                                    <input id={phoneId} type="tel" inputMode="tel" autoComplete="tel" value={phone}
                                                           placeholder={phonePlaceholder}
                                                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                               setPhone(e.target.value);
                                                               if (error) setError("");
                                                           }}
                                                           aria-invalid={error ? true : undefined}
                                                           aria-describedby={error ? phoneErrorId : phoneHintId}
                                                           className="min-w-0 flex-1 rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-emerald-100/40 focus:border-lime-300 focus:ring-2 focus:ring-lime-300/30"/>
                                                    <button type="submit" disabled={sendStatus === "sending"}
                                                            className="inline-flex items-center gap-2 rounded-lg bg-lime-300 px-4 py-2 text-sm font-semibold text-emerald-950 outline-none transition-colors hover:bg-lime-200 focus-visible:ring-2 focus-visible:ring-white disabled:opacity-70">
                                                        {sendStatus === "sending" && <LuLoader className="h-4 w-4 animate-spin"/>}
                                                        {sendLabel}
                                                    </button>
                                                </div>
                                                {error
                                                    ? <p id={phoneErrorId} className="mt-2 text-sm text-rose-300">{error}</p>
                                                    : <p id={phoneHintId} className="mt-2 text-xs text-emerald-100/60">{phoneHint}</p>}
                                            </form>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {preview}
            </div>
        </section>
    );
};

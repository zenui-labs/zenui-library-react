import {useEffect, useRef, useState} from "react";
import {animate, AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useTransform} from "framer-motion";
import {LuArrowDownRight, LuArrowUpRight} from "react-icons/lu";

export interface StockQuote {
    symbol: string;
    name: string;
    /** Price at the open. The change badge compares against it. */
    open: number;
    price: number;
    /** Recent prices, oldest first, drawn as the sparkline. */
    history: number[];
}

const sparkPath = (values: number[], width: number, height: number) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    return values
        .map((value, index) => {
            const x = (index / (values.length - 1)) * width;
            const y = height - ((value - min) / range) * height;
            return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
        })
        .join(" ");
};

const changeOf = (quote: StockQuote) => ((quote.price - quote.open) / quote.open) * 100;

export interface TickingPriceProps {
    value: number;
    /** 1 rolls new characters in from below, -1 from above. */
    direction: 1 | -1;
}

// Only the characters that changed roll in, from below on a rise and from above on a drop.
export const TickingPrice = ({value, direction}: TickingPriceProps) => {
    const instant = useReducedMotion() ?? false;
    const chars = value.toFixed(2).split("");
    return (
        <span className="relative inline-flex overflow-hidden tabular-nums">
            <AnimatePresence initial={false} mode="popLayout">
                {chars.map((char, index) => (
                    <motion.span
                        key={`${chars.length - index}-${char}`}
                        initial={instant ? false : {y: direction > 0 ? "100%" : "-100%", opacity: 0}}
                        animate={{y: "0%", opacity: 1}}
                        exit={instant ? undefined : {y: direction > 0 ? "-100%" : "100%", opacity: 0}}
                        transition={{type: "spring", stiffness: 380, damping: 32}}
                        className="inline-block"
                    >
                        {char}
                    </motion.span>
                ))}
            </AnimatePresence>
        </span>
    );
};

export interface TickerTapeProps {
    quotes: StockQuote[];
    /** Set to false to stop the tape, for example while it is off screen. */
    play?: boolean;
    /** Seconds for one full loop. */
    duration?: number;
}

// A ticker tape that scrolls forever. Two copies of the list sit side by side, so the loop has no seam.
// Stopping resumes from the same spot, so the tape never jumps when it scrolls back into view.
export const TickerTape = ({quotes, play = true, duration = 28}: TickerTapeProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const offset = useMotionValue(0);
    const x = useTransform(offset, (value) => `${value}%`);
    const running = play && !reduceMotion;

    useEffect(() => {
        if (!running) return;
        let controls: ReturnType<typeof animate> | undefined;
        const run = () => {
            const from = offset.get();
            controls = animate(offset, -50, {
                duration: ((50 + from) / 50) * duration,
                ease: "linear",
                onComplete: () => {
                    offset.set(0);
                    run();
                },
            });
        };
        run();
        return () => controls?.stop();
    }, [running, offset, duration]);

    return (
        // The table below carries the same prices, so the tape is hidden from screen readers.
        <div aria-hidden="true" className="relative overflow-hidden border-b border-gray-200 py-2.5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] dark:border-slate-800">
            <motion.div className="flex w-max" style={{x}}>
                {[0, 1].map((copy) => (
                    <div key={copy} className="flex shrink-0">
                        {quotes.map((quote) => {
                            const change = changeOf(quote);
                            const up = change >= 0;
                            return (
                                <span key={quote.symbol} className="flex items-center gap-2 px-5 text-xs">
                                    <span className="font-semibold text-gray-900 dark:text-white">{quote.symbol}</span>
                                    <span className="tabular-nums text-gray-600 dark:text-slate-300">{quote.price.toFixed(2)}</span>
                                    <span className={`tabular-nums ${up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                                        {up ? "+" : ""}
                                        {change.toFixed(2)}%
                                    </span>
                                </span>
                            );
                        })}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

interface RowProps {
    quote: StockQuote;
    reduceMotion: boolean;
}

const WatchlistRow = ({quote, reduceMotion}: RowProps) => {
    // Remember the last price in state. `tick` increments on every change, so the row flash can replay.
    const [last, setLast] = useState<{price: number; tick: number; direction: 1 | -1}>({price: quote.price, tick: 0, direction: 1});
    if (last.price !== quote.price) {
        setLast({price: quote.price, tick: last.tick + 1, direction: quote.price > last.price ? 1 : -1});
    }

    const change = changeOf(quote);
    const up = change >= 0;
    const Arrow = up ? LuArrowUpRight : LuArrowDownRight;

    return (
        <tr className="relative border-t border-gray-100 dark:border-slate-800/80">
            <th scope="row" className="relative px-5 py-3 text-left font-normal sm:px-6">
                {/* Row flash. A new key per tick restarts the fade. */}
                {last.tick > 0 && !reduceMotion && (
                    <motion.span
                        key={last.tick}
                        aria-hidden="true"
                        initial={{opacity: 1}}
                        animate={{opacity: 0}}
                        transition={{duration: 1.1, ease: "easeOut"}}
                        className={`pointer-events-none absolute inset-y-0 left-0 w-[200vw] max-w-[40rem] ${
                            last.direction > 0 ? "bg-emerald-500/10" : "bg-rose-500/10"
                        }`}
                    />
                )}
                <span className="relative block font-semibold text-gray-900 dark:text-white">{quote.symbol}</span>
                <span className="relative block text-xs text-gray-500 dark:text-slate-400">{quote.name}</span>
            </th>
            <td className="hidden px-2 sm:table-cell">
                <svg viewBox="0 0 96 28" className="h-7 w-24" aria-hidden="true">
                    <path
                        d={sparkPath(quote.history, 96, 28)}
                        fill="none"
                        strokeWidth={1.75}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        className={`transition-colors duration-500 ${up ? "stroke-emerald-500" : "stroke-rose-500"}`}
                    />
                </svg>
            </td>
            <td className="px-2 text-right font-medium text-gray-900 dark:text-white">
                <TickingPrice value={quote.price} direction={last.direction}/>
            </td>
            <td className="px-5 py-3 text-right sm:px-6">
                <motion.span
                    layout={!reduceMotion}
                    className={`inline-flex min-w-[5.25rem] items-center justify-end gap-1 rounded-lg px-2 py-1 text-xs font-semibold tabular-nums transition-colors duration-500 ${
                        up
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
                    }`}
                >
                    <Arrow className="h-3.5 w-3.5" aria-hidden="true"/>
                    {up ? "+" : ""}
                    {change.toFixed(2)}%
                </motion.span>
            </td>
        </tr>
    );
};

export interface StockWatchlistProps {
    quotes: StockQuote[];
    title?: string;
    /** Text next to the pulsing dot. */
    status?: string;
    /** Table caption for screen readers. */
    caption?: string;
    /** Called every `pollInterval` ms while the list is on screen and the tab is visible. Fetch new prices here. */
    onPoll?: () => void;
    pollInterval?: number;
    /** Seconds for one full loop of the ticker tape. */
    tapeDuration?: number;
    className?: string;
}

// A watchlist with live prices. Rows flash green or red on each move, and polling pauses when off screen.
export const StockWatchlist = ({
    quotes,
    title = "Watchlist",
    status = "Market open",
    caption,
    onPoll,
    pollInterval = 700,
    tapeDuration,
    className = "",
}: StockWatchlistProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion() ?? false;
    const onPollRef = useRef(onPoll);
    onPollRef.current = onPoll;

    useEffect(() => {
        if (!inView) return;
        const id = window.setInterval(() => {
            if (document.hidden) return;
            onPollRef.current?.();
        }, pollInterval);
        return () => window.clearInterval(id);
    }, [inView, pollInterval]);

    return (
        <div
            ref={ref}
            className={`w-full max-w-xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-900/5 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/40 ${className}`}
        >
            <TickerTape quotes={quotes} play={inView} duration={tapeDuration}/>

            <div className="flex items-center justify-between px-5 pb-2 pt-5 sm:px-6">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
                <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400">
                    <span className="relative flex h-2 w-2">
                        {inView && !reduceMotion && (
                            <motion.span
                                className="absolute inset-0 rounded-full bg-emerald-500"
                                animate={{scale: [1, 2.4], opacity: [0.6, 0]}}
                                transition={{duration: 1.6, repeat: Infinity, ease: "easeOut"}}
                            />
                        )}
                        <span className="relative h-2 w-2 rounded-full bg-emerald-500"/>
                    </span>
                    {status}
                </span>
            </div>

            <table className="w-full text-sm">
                <caption className="sr-only">{caption ?? `Live prices for ${quotes.length} watched stocks`}</caption>
                <thead className="sr-only">
                    <tr>
                        <th scope="col">Company</th>
                        <th scope="col">Trend</th>
                        <th scope="col">Price</th>
                        <th scope="col">Change today</th>
                    </tr>
                </thead>
                <tbody>
                    {quotes.map((quote) => (
                        <WatchlistRow key={quote.symbol} quote={quote} reduceMotion={reduceMotion}/>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

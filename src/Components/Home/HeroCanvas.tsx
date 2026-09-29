import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue} from "framer-motion";
import {LuArrowRight, LuCheck, LuChevronLeft, LuChevronRight, LuHeart, LuStar, LuX} from "react-icons/lu";

import AnimatedTooltipExample from "@/Components/Home/AnimatedCards/AnimatedTooltipExample.tsx";
import {cn} from "@utils/Style.ts";

// Live pieces taken from the library, laid out loosely under the hero copy.
// Nothing sits on a card: each piece is the component itself, using the site tokens.

const useTicker = (ms, active = true) => {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        if (!active) return;
        const timer = setInterval(() => setTick((t) => t + 1), ms);
        return () => clearInterval(timer);
    }, [ms, active]);
    return tick;
};

const Switch = ({on, onChange, label}: {on: boolean; onChange: (on: boolean) => void; label: string}) => (
    <button role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)}
            className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300", on ? "bg-accent" : "bg-hairline-strong")}>
        <motion.span layout transition={{type: "spring", stiffness: 600, damping: 32}}
                     className={cn("absolute top-1 size-4 rounded-full bg-white shadow", on ? "right-1" : "left-1")}/>
    </button>
);

const Switches = () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    return (
        <div className="flex flex-col gap-3.5">
            {([["Email alerts", a, setA], ["Dark previews", b, setB]] as const).map(([label, on, set]) => (
                <label key={label} className="flex items-center gap-3 text-[0.85rem] text-ink-muted">
                    <Switch on={on} onChange={set} label={label}/>
                    {label}
                </label>
            ))}
        </div>
    );
};

const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#abcdef0123456789";
const phrases = ["copy, paste, ship", "no install step", "dark mode ready", "800+ components"];

const ScrambleText = () => {
    const tick = useTicker(2600);
    const [text, setText] = useState(phrases[0]);

    useEffect(() => {
        const target = phrases[tick % phrases.length];
        let frame = 0;
        const timer = setInterval(() => {
            frame += 1;
            setText(target.split("").map((char, i) => {
                if (char === " " || i < frame / 2) return char;
                return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            }).join(""));
            if (frame / 2 > target.length) clearInterval(timer);
        }, 28);
        return () => clearInterval(timer);
    }, [tick]);

    return (
        <p className="whitespace-nowrap font-mono text-[1.4rem] tracking-tight text-ink" aria-label={phrases[tick % phrases.length]}>
            <span className="text-accent-strong">$ </span>{text}<span className="ml-0.5 inline-block h-5 w-2 translate-y-0.5 animate-pulse bg-ink"/>
        </p>
    );
};

const Tabs = () => {
    const tabs = ["Preview", "Code", "Props"];
    const tick = useTicker(2200);
    const [manual, setManual] = useState(null);
    const active = manual ?? tabs[tick % tabs.length];
    return (
        <div className="flex rounded-full border border-hairline p-1">
            {tabs.map((tab) => (
                <button key={tab} onClick={() => setManual(tab)}
                        className={cn("relative h-8 rounded-full px-4 text-[0.82rem] font-medium transition-colors", active === tab ? "text-canvas" : "text-ink-muted")}>
                    {active === tab && <motion.span layoutId="hero-tab" className="absolute inset-0 rounded-full bg-ink"
                                                    transition={{type: "spring", stiffness: 500, damping: 36}}/>}
                    <span className="relative">{tab}</span>
                </button>
            ))}
        </div>
    );
};

const Otp = () => {
    const code = ["2", "0", "4", "8"];
    const tick = useTicker(480);
    const filled = tick % (code.length + 5);
    const done = filled >= code.length;
    return (
        <div className="flex flex-col items-start gap-2">
            <div className="flex gap-2">
                {code.map((digit, index) => (
                    <div key={index}
                         className={cn("flex size-11 items-center justify-center rounded-xl border font-mono text-[1.1rem] transition-colors duration-200",
                             done ? "border-emerald-500/60 text-emerald-600 dark:text-emerald-400" : index === filled ? "border-accent text-ink" : "border-hairline-strong text-ink")}>
                        <AnimatePresence>
                            {index < filled && <motion.span initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}}>{digit}</motion.span>}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
            <p className={cn("flex items-center gap-1 text-[0.75rem] text-emerald-600 transition-opacity dark:text-emerald-400", done ? "opacity-100" : "opacity-0")}>
                <LuCheck className="size-3.5"/> Code accepted
            </p>
        </div>
    );
};

const Rating = () => {
    const [value, setValue] = useState(4);
    const [hover, setHover] = useState(0);
    return (
        <div className="flex items-center gap-3">
            <div className="flex gap-0.5" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button key={star} whileTap={{scale: 0.8}} onMouseEnter={() => setHover(star)} onClick={() => setValue(star)}
                                   aria-label={`Rate ${star} out of 5`}>
                        <LuStar className={cn("size-6 transition-colors", star <= (hover || value) ? "fill-amber-400 text-amber-400" : "text-hairline-strong")}/>
                    </motion.button>
                ))}
            </div>
            <span className="font-mono text-[0.85rem] text-ink-muted">{(hover || value).toFixed(1)}</span>
        </div>
    );
};

const ActivityGraph = () => {
    const cols = 18;
    const [cells, setCells] = useState(() => Array.from({length: cols * 7}, () => Math.floor(Math.random() * 5) * (Math.random() > 0.35 ? 1 : 0)));
    const tick = useTicker(700);
    useEffect(() => {
        setCells((current) => current.map((level) => (Math.random() < 0.07 ? Math.floor(Math.random() * 5) : level)));
    }, [tick]);
    const alpha = [0, 0.25, 0.45, 0.7, 1];
    return (
        <div>
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
                {cells.map((level, index) => (
                    <span key={index} className="size-[11px] rounded-[3px] transition-colors duration-500"
                          style={{background: level ? `rgb(var(--accent) / ${alpha[level]})` : "rgb(var(--hairline))"}}/>
                ))}
            </div>
            <p className="mt-2 text-[0.72rem] text-ink-subtle">1,284 contributions this year</p>
        </div>
    );
};

const Pagination = () => {
    const tick = useTicker(1500);
    const [manual, setManual] = useState(null);
    const page = manual ?? (tick % 5) + 1;
    return (
        <nav aria-label="Example pagination" className="flex items-center gap-1">
            <button onClick={() => setManual(Math.max(1, page - 1))} className="flex size-9 items-center justify-center rounded-full text-ink-subtle hover:text-ink" aria-label="Previous">
                <LuChevronLeft className="size-4"/>
            </button>
            {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setManual(n)}
                        className={cn("relative size-9 rounded-full text-[0.85rem] font-medium transition-colors", page === n ? "text-canvas" : "text-ink-muted hover:text-ink")}>
                    {page === n && <motion.span layoutId="hero-page" className="absolute inset-0 rounded-full bg-ink" transition={{type: "spring", stiffness: 500, damping: 34}}/>}
                    <span className="relative">{n}</span>
                </button>
            ))}
            <button onClick={() => setManual(Math.min(5, page + 1))} className="flex size-9 items-center justify-center rounded-full text-ink-subtle hover:text-ink" aria-label="Next">
                <LuChevronRight className="size-4"/>
            </button>
        </nav>
    );
};

const ProgressRing = () => {
    const tick = useTicker(90);
    const value = tick % 120 > 100 ? 100 : tick % 120;
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    return (
        <div className="relative size-[76px]">
            <svg viewBox="0 0 76 76" className="size-full -rotate-90">
                <circle cx="38" cy="38" r={radius} fill="none" strokeWidth="5" style={{stroke: "rgb(var(--hairline))"}}/>
                <circle cx="38" cy="38" r={radius} fill="none" strokeWidth="5" strokeLinecap="round"
                        strokeDasharray={circumference} strokeDashoffset={circumference * (1 - value / 100)}
                        style={{stroke: "rgb(var(--accent))", transition: "stroke-dashoffset 90ms linear"}}/>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[0.85rem] tabular-nums text-ink">{value}%</span>
        </div>
    );
};

const initialChips = ["React", "Tailwind CSS", "Accessible", "Dark mode"];

const Chips = () => {
    const [chips, setChips] = useState(initialChips);
    return (
        <div className="flex max-w-[300px] flex-wrap gap-2">
            <AnimatePresence mode="popLayout">
                {chips.map((chip) => (
                    <motion.button layout key={chip} initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.8}}
                                   onClick={() => setChips(chips.filter((c) => c !== chip))}
                                   className="flex h-8 items-center gap-1.5 rounded-full border border-hairline-strong pl-3 pr-2 text-[0.8rem] text-ink-muted hover:text-ink">
                        {chip} <LuX className="size-3.5"/>
                    </motion.button>
                ))}
            </AnimatePresence>
            {chips.length < initialChips.length && (
                <motion.button layout onClick={() => setChips(initialChips)} className="h-8 px-2 text-[0.8rem] font-medium text-accent-strong">Reset</motion.button>
            )}
        </div>
    );
};

const Range = () => {
    const tick = useTicker(60);
    const [manual, setManual] = useState(null);
    const value = manual ?? Math.round(50 + 38 * Math.sin(tick / 22));
    return (
        <div className="w-[240px]">
            <div className="mb-3 flex justify-between text-[0.78rem] text-ink-subtle">
                <span>Volume</span><span className="font-mono tabular-nums text-ink">{value}</span>
            </div>
            <div className="relative h-5">
                <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-hairline"/>
                <div className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-accent" style={{width: `${value}%`}}/>
                <div className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-white shadow" style={{left: `${value}%`}}/>
                <input type="range" min="0" max="100" value={value} onChange={(event) => setManual(Number(event.target.value))}
                       aria-label="Volume" className="absolute inset-0 w-full cursor-pointer opacity-0"/>
            </div>
        </div>
    );
};

const reactions = ["❤️", "🔥", "✨", "👏", "🚀"];

const ReactionButton = () => {
    const [bursts, setBursts] = useState([]);
    const [count, setCount] = useState(128);
    const burst = () => {
        const id = Date.now() + Math.random();
        setCount((c) => c + 1);
        setBursts((list) => [...list, {id, emoji: reactions[Math.floor(Math.random() * reactions.length)], x: (Math.random() - 0.5) * 70}]);
        setTimeout(() => setBursts((list) => list.filter((b) => b.id !== id)), 1100);
    };
    const tick = useTicker(2400);
    useEffect(() => {
        if (tick) burst();
    }, [tick]);

    return (
        <div className="relative">
            <AnimatePresence>
                {bursts.map((b) => (
                    <motion.span key={b.id} className="pointer-events-none absolute left-1/2 top-0 text-[1.3rem]"
                                 initial={{opacity: 0, y: 0, x: "-50%", scale: 0.6}}
                                 animate={{opacity: [0, 1, 0], y: -70, x: `calc(-50% + ${b.x}px)`, scale: 1.1}}
                                 transition={{duration: 1, ease: "easeOut"}}>
                        {b.emoji}
                    </motion.span>
                ))}
            </AnimatePresence>
            <motion.button whileTap={{scale: 0.9}} onClick={burst}
                           className="flex h-11 items-center gap-2 rounded-full border border-hairline-strong px-4 text-[0.85rem] font-medium text-ink">
                <LuHeart className="size-4 fill-rose-500 text-rose-500"/>
                <span className="tabular-nums">{count}</span>
            </motion.button>
        </div>
    );
};

const Keycaps = () => {
    const tick = useTicker(1300);
    const pressed = tick % 3;
    return (
        <div className="flex items-center gap-2">
            {["⌘", "K"].map((key, index) => (
                <motion.kbd key={key}
                            animate={pressed === index + 1 || pressed === 2 ? {y: 3, boxShadow: "0 0 0 0 rgb(var(--hairline-strong))"} : {y: 0, boxShadow: "0 4px 0 0 rgb(var(--hairline-strong))"}}
                            transition={{duration: 0.12}}
                            className="flex size-12 items-center justify-center rounded-xl border border-hairline-strong bg-surface font-mono text-[1.1rem] text-ink">
                    {key}
                </motion.kbd>
            ))}
        </div>
    );
};

const GlowButton = () => (
    <a href="/components/animated-button" className="group relative inline-flex overflow-hidden rounded-full p-[1.5px]">
        <motion.span aria-hidden="true" className="absolute inset-[-100%]"
                     animate={{rotate: 360}} transition={{duration: 3, repeat: Infinity, ease: "linear"}}
                     style={{background: "conic-gradient(from 0deg, transparent 0 200deg, rgb(var(--accent) / 0.4) 280deg, rgb(var(--accent)) 360deg)"}}/>
        <span className="relative flex h-11 items-center gap-2 rounded-full bg-canvas px-5 text-[0.88rem] font-medium text-ink">
            Animated button
            <LuArrowRight className="size-4 transition-transform group-hover:translate-x-0.5"/>
        </span>
    </a>
);

const steps = ["Cart", "Shipping", "Payment", "Done"];

const Stepper = () => {
    const tick = useTicker(1200);
    const current = tick % (steps.length + 1);
    return (
        <div className="flex items-start">
            {steps.map((step, index) => (
                <div key={step} className="flex items-start">
                    <div className="flex w-16 flex-col items-center gap-2">
                        <span className={cn("flex size-7 items-center justify-center rounded-full border text-[0.72rem] font-semibold transition-colors duration-300",
                            index < current ? "border-accent bg-accent text-white" : index === current ? "border-accent text-accent-strong" : "border-hairline-strong text-ink-subtle")}>
                            {index < current ? <LuCheck className="size-3.5"/> : index + 1}
                        </span>
                        <span className={cn("text-[0.72rem]", index <= current ? "text-ink" : "text-ink-subtle")}>{step}</span>
                    </div>
                    {index < steps.length - 1 && (
                        <span className="relative mt-3.5 h-px w-8 bg-hairline-strong">
                            <span className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-500" style={{width: index < current ? "100%" : "0%"}}/>
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

// left / top place each piece on the 1180 x 560 stage, tilt gives the loose feel, depth drives parallax.
const pieces = [
    {id: "tooltip", el: <AnimatedTooltipExample/>, left: "1%", top: 70, tilt: -3, depth: 0.9},
    {id: "glow", el: <GlowButton/>, left: "30%", top: 0, tilt: 2, depth: 0.5},
    {id: "tabs", el: <Tabs/>, left: "58%", top: 52, tilt: -2, depth: 0.8},
    {id: "keys", el: <Keycaps/>, left: "87%", top: 12, tilt: 7, depth: 1.2},
    {id: "scramble", el: <ScrambleText/>, left: "9%", top: 214, tilt: 0, depth: 0.6},
    {id: "switches", el: <Switches/>, left: "41%", top: 128, tilt: -3, depth: 1},
    {id: "graph", el: <ActivityGraph/>, left: "69%", top: 176, tilt: 3, depth: 0.7},
    {id: "rating", el: <Rating/>, left: "2%", top: 330, tilt: -4, depth: 1.1},
    {id: "otp", el: <Otp/>, left: "36%", top: 268, tilt: 2, depth: 0.6},
    {id: "ring", el: <ProgressRing/>, left: "55%", top: 330, tilt: 0, depth: 1.2},
    {id: "pagination", el: <Pagination/>, left: "70%", top: 372, tilt: -2, depth: 0.8},
    {id: "chips", el: <Chips/>, left: "13%", top: 432, tilt: 3, depth: 0.7},
    {id: "range", el: <Range/>, left: "40%", top: 410, tilt: -2, depth: 1},
    {id: "stepper", el: <Stepper/>, left: "56%", top: 492, tilt: 1, depth: 0.6},
    {id: "reaction", el: <ReactionButton/>, left: "90%", top: 470, tilt: 6, depth: 1.1},
];

interface PieceProps {
    piece: (typeof pieces)[number];
    index: number;
    pointerX: MotionValue<number>;
    pointerY: MotionValue<number>;
    scroll: MotionValue<number>;
}

const Piece = ({piece, index, pointerX, pointerY, scroll}: PieceProps) => {
    const x = useTransform(pointerX, (v) => v * piece.depth * 28);
    const y = useTransform([pointerY, scroll], ([p, s]: number[]) => p * piece.depth * 20 - s * piece.depth * 90);

    return (
        <motion.div className="absolute" style={{left: piece.left, top: piece.top, x, y, rotate: piece.tilt}}>
            <motion.div
                initial={{opacity: 0, y: 24, filter: "blur(8px)"}}
                animate={{opacity: 1, y: 0, filter: "blur(0px)"}}
                transition={{duration: 0.9, delay: 0.55 + index * 0.05, ease: [0.16, 1, 0.3, 1]}}
            >
                <motion.div
                    animate={{y: [0, -5, 0]}}
                    transition={{duration: 4 + (index % 4), repeat: Infinity, ease: "easeInOut", delay: index * 0.3}}
                >
                    {piece.el}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const DESKTOP = "(min-width: 1024px)";

const useIsDesktop = () => {
    const [matches, setMatches] = useState(() => window.matchMedia(DESKTOP).matches);
    useEffect(() => {
        const query = window.matchMedia(DESKTOP);
        const onChange = () => setMatches(query.matches);
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    }, []);
    return matches;
};

const mobileIds = ["tooltip", "tabs", "switches", "otp", "rating", "graph", "chips", "reaction"];

const HeroCanvas = () => {
    const stageRef = useRef(null);
    const isDesktop = useIsDesktop();
    const pointerX = useSpring(useMotionValue(0), {stiffness: 60, damping: 20});
    const pointerY = useSpring(useMotionValue(0), {stiffness: 60, damping: 20});
    const {scrollYProgress} = useScroll({target: stageRef, offset: ["start end", "end start"]});

    const onPointerMove = (event) => {
        const rect = stageRef.current.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <div className="relative mt-16 1024px:mt-20">
            {/* Desktop: loose layout with parallax. Only one layout mounts so the live pieces run once. */}
            {isDesktop ? (
            <div
                ref={stageRef}
                onPointerMove={onPointerMove}
                onPointerLeave={() => {
                    pointerX.set(0);
                    pointerY.set(0);
                }}
                className="relative mx-auto h-[560px] w-full max-w-[1180px]"
            >
                {pieces.map((piece, index) => (
                    <Piece key={piece.id} piece={piece} index={index} pointerX={pointerX} pointerY={pointerY} scroll={scrollYProgress}/>
                ))}
            </div>
            ) : (
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-10">
                {pieces.filter((piece) => mobileIds.includes(piece.id)).map((piece, index) => (
                    <motion.div key={piece.id}
                                initial={{opacity: 0, y: 16}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{duration: 0.6, delay: index * 0.04}}>
                        {piece.el}
                    </motion.div>
                ))}
            </div>
            )}

            <p className="mt-10 text-center text-[0.82rem] text-ink-subtle">
                Everything above is a live ZenUI component. Click, hover and drag.
            </p>
        </div>
    );
};

export default HeroCanvas;

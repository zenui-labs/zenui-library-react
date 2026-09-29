import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuChevronDown, LuCopy} from "react-icons/lu";

type Format = "hex" | "rgb" | "hsl" | "css";

interface Swatch {
    name: string;
    token: string;
    hex: string;
}

const swatches: Swatch[] = [
    {name: "Lagoon", token: "brand-500", hex: "#0EA5A4"},
    {name: "Ember", token: "accent-500", hex: "#F97316"},
    {name: "Iris", token: "primary-600", hex: "#5B5BD6"},
    {name: "Moss", token: "success-600", hex: "#4D7C0F"},
    {name: "Ink", token: "neutral-900", hex: "#1C1917"},
];

const formatLabels: Record<Format, string> = {hex: "HEX", rgb: "RGB", hsl: "HSL", css: "CSS variable"};
const formatOrder: Format[] = ["hex", "rgb", "hsl", "css"];

const toRgb = (hex: string) => {
    const value = parseInt(hex.slice(1), 16);
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255] as const;
};

const toHsl = (hex: string) => {
    const [r, g, b] = toRgb(hex).map((channel) => channel / 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const light = (max + min) / 2;
    const delta = max - min;
    let hue = 0;
    let sat = 0;
    if (delta) {
        sat = delta / (1 - Math.abs(2 * light - 1));
        if (max === r) hue = ((g - b) / delta) % 6;
        else if (max === g) hue = (b - r) / delta + 2;
        else hue = (r - g) / delta + 4;
        hue = Math.round(hue * 60 + 360) % 360;
    }
    return [hue, Math.round(sat * 100), Math.round(light * 100)] as const;
};

const formatColor = (swatch: Swatch, format: Format) => {
    if (format === "hex") return swatch.hex;
    if (format === "rgb") return `rgb(${toRgb(swatch.hex).join(" ")})`;
    if (format === "hsl") {
        const [h, s, l] = toHsl(swatch.hex);
        return `hsl(${h} ${s}% ${l}%)`;
    }
    return `--${swatch.token}: ${swatch.hex};`;
};

const ColorFormats = () => {
    const [swatch, setSwatch] = useState<Swatch>(swatches[0]);
    const [format, setFormat] = useState<Format>("hex");
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [copied, setCopied] = useState<Format | null>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const timer = useRef<number | undefined>(undefined);
    const id = useId();
    const reduceMotion = useReducedMotion();

    useEffect(() => () => window.clearTimeout(timer.current), []);

    useEffect(() => {
        if (!open) return;
        itemRefs.current[activeIndex]?.focus();
    }, [open, activeIndex]);

    useEffect(() => {
        if (!open) return;
        const onPointerDown = (event: PointerEvent) => {
            const target = event.target as Node;
            if (!menuRef.current?.contains(target) && !toggleRef.current?.contains(target)) setOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open]);

    const copy = async (nextFormat: Format) => {
        try {
            await navigator.clipboard.writeText(formatColor(swatch, nextFormat));
            setCopied(nextFormat);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(null), 1600);
        } catch {
            setCopied(null);
        }
    };

    const openMenu = () => {
        setActiveIndex(formatOrder.indexOf(format));
        setOpen(true);
    };

    const closeMenu = () => {
        setOpen(false);
        toggleRef.current?.focus();
    };

    // Picking a format copies it and makes it the default for the main button.
    const pick = (nextFormat: Format) => {
        setFormat(nextFormat);
        copy(nextFormat);
        closeMenu();
    };

    const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowDown") setActiveIndex((index) => (index + 1) % formatOrder.length);
        else if (event.key === "ArrowUp") setActiveIndex((index) => (index - 1 + formatOrder.length) % formatOrder.length);
        else if (event.key === "Home") setActiveIndex(0);
        else if (event.key === "End") setActiveIndex(formatOrder.length - 1);
        else if (event.key === "Escape") closeMenu();
        else if (event.key === "Tab") setOpen(false);
        else return;
        if (event.key !== "Tab") event.preventDefault();
    };

    const [r, g, b] = toRgb(swatch.hex);
    const isLight = (r * 299 + g * 587 + b * 114) / 1000 > 150;

    return (
        <div className="w-full max-w-sm min-h-[400px]">
            <motion.div
                className="relative flex h-40 flex-col justify-between rounded-2xl p-5 shadow-lg ring-1 ring-inset ring-black/5"
                animate={{backgroundColor: swatch.hex}}
                transition={{duration: reduceMotion ? 0 : 0.35}}
                style={{backgroundColor: swatch.hex}}
            >
                <p className={`text-xs font-medium ${isLight ? "text-black/60" : "text-white/70"}`}>{swatch.token}</p>
                <div className={isLight ? "text-black" : "text-white"}>
                    <p className="text-2xl font-semibold tracking-tight">{swatch.name}</p>
                    <p className="mt-0.5 font-mono text-sm opacity-80">{formatColor(swatch, format)}</p>
                </div>
            </motion.div>

            <fieldset className="mt-4">
                <legend className="sr-only">Color</legend>
                <div className="flex gap-2">
                    {swatches.map((item) => (
                        <label key={item.hex} className="relative cursor-pointer">
                            <input
                                type="radio"
                                name={`${id}-swatch`}
                                checked={swatch.hex === item.hex}
                                onChange={() => setSwatch(item)}
                                aria-label={item.name}
                                className="peer sr-only"
                            />
                            <span
                                className="block size-8 rounded-full ring-1 ring-inset ring-black/10 ring-offset-2 ring-offset-white transition peer-checked:ring-2 peer-checked:ring-zinc-900 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-indigo-500 dark:ring-white/10 dark:ring-offset-zinc-950 dark:peer-checked:ring-white"
                                style={{backgroundColor: item.hex}}
                                aria-hidden
                            />
                        </label>
                    ))}
                </div>
            </fieldset>

            <div className="relative mt-5 inline-flex rounded-xl shadow-sm">
                <button
                    type="button"
                    onClick={() => copy(format)}
                    className="inline-flex h-10 items-center gap-2 rounded-l-xl border border-zinc-200 bg-white pl-3.5 pr-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                    {copied === format ? <LuCheck className="size-4 text-emerald-600 dark:text-emerald-400" aria-hidden/> : <LuCopy className="size-4 text-zinc-500" aria-hidden/>}
                    <span className="min-w-[7.5rem] text-left">{copied === format ? `${formatLabels[format]} copied` : `Copy ${formatLabels[format]}`}</span>
                </button>
                <button
                    ref={toggleRef}
                    type="button"
                    onClick={() => (open ? setOpen(false) : openMenu())}
                    onKeyDown={(event) => {
                        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                            event.preventDefault();
                            openMenu();
                        }
                    }}
                    aria-label="More copy formats"
                    aria-haspopup="menu"
                    aria-expanded={open}
                    aria-controls={`${id}-menu`}
                    className="-ml-px inline-flex h-10 w-10 items-center justify-center rounded-r-xl border border-zinc-200 bg-white text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                >
                    <LuChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden/>
                </button>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            ref={menuRef}
                            id={`${id}-menu`}
                            role="menu"
                            aria-label="Copy as"
                            onKeyDown={onMenuKeyDown}
                            className="absolute left-0 top-full z-20 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-xl border border-zinc-200 bg-white p-1 shadow-xl shadow-zinc-950/10 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/40"
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: -4, scale: 0.98}}
                            animate={{opacity: 1, y: 0, scale: 1}}
                            exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: -4, scale: 0.98}}
                            transition={{duration: 0.14}}
                            style={{transformOrigin: "top left"}}
                        >
                            {formatOrder.map((item, index) => (
                                <button
                                    key={item}
                                    ref={(element) => {
                                        itemRefs.current[index] = element;
                                    }}
                                    type="button"
                                    role="menuitemradio"
                                    aria-checked={format === item}
                                    tabIndex={index === activeIndex ? 0 : -1}
                                    onClick={() => pick(item)}
                                    onMouseMove={() => setActiveIndex(index)}
                                    className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left outline-none focus:bg-zinc-100 dark:focus:bg-white/[0.07]"
                                >
                                    <span className="w-24 shrink-0 text-sm text-zinc-700 dark:text-zinc-200">{formatLabels[item]}</span>
                                    <span className="min-w-0 flex-1 truncate font-mono text-xs text-zinc-500 dark:text-zinc-400">{formatColor(swatch, item)}</span>
                                    <LuCheck className={`size-4 shrink-0 text-indigo-600 dark:text-indigo-400 ${format === item ? "" : "invisible"}`} aria-hidden/>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <p className="sr-only" aria-live="polite">{copied ? `${formatLabels[copied]} copied` : ""}</p>
        </div>
    );
};

export default ColorFormats;

import {useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent} from "react";
import {createPortal} from "react-dom";
import {AnimatePresence, motion} from "framer-motion";
import type {IconType} from "react-icons";
import {
    LuExpand,
    LuExternalLink,
    LuLaptop,
    LuMaximize,
    LuMonitor,
    LuMoon,
    LuRotateCcw,
    LuShrink,
    LuSmartphone,
    LuSun,
    LuTablet,
    LuX,
} from "react-icons/lu";

import type {PreviewPattern, Theme} from "@/Store/Index.ts";
import {embedUrl} from "@/Helpers/embed.ts";
import {cn} from "@utils/Style.ts";

type Width = number | "full";

const presets: {id: string; label: string; width: Width; icon: IconType}[] = [
    {id: "mobile", label: "Mobile", width: 375, icon: LuSmartphone},
    {id: "tablet", label: "Tablet", width: 768, icon: LuTablet},
    {id: "laptop", label: "Laptop", width: 1024, icon: LuLaptop},
    {id: "desktop", label: "Desktop", width: 1280, icon: LuMonitor},
    {id: "full", label: "Full width", width: "full", icon: LuMaximize},
];

// Tailwind's default breakpoints, to show which one the current width falls into.
const breakpoints: [string, number][] = [["2xl", 1536], ["xl", 1280], ["lg", 1024], ["md", 768], ["sm", 640]];
const breakpointFor = (width: number) => breakpoints.find(([, min]) => width >= min)?.[0] ?? "base";

const MIN_WIDTH = 320;
const GUTTER = 48;

interface ResponsivePreviewProps {
    open: boolean;
    onClose: () => void;
    /** Position of the preview frame on the page (see Helpers/embed.ts). */
    index: number;
    title: string;
    theme: Theme;
    pattern: PreviewPattern;
}

/**
 * Full-screen viewer for one example. The example loads in an iframe (the same page in embed mode),
 * so resizing the frame changes the real viewport width and Tailwind breakpoints respond to it.
 */
const ResponsivePreview = ({open, onClose, index, title, theme: initialTheme, pattern}: ResponsivePreviewProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const drag = useRef<{x: number; width: number; side: 1 | -1} | null>(null);

    const [width, setWidth] = useState<Width>("full");
    const [maxWidth, setMaxWidth] = useState(1200);
    const [height, setHeight] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [theme, setTheme] = useState<Theme>(initialTheme);
    const [src, setSrc] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [nativeFullscreen, setNativeFullscreen] = useState(false);

    // Fresh state each time it opens.
    useEffect(() => {
        if (!open) return;
        setTheme(initialTheme);
        setWidth("full");
        setLoaded(false);
        setSrc(embedUrl(index, initialTheme, pattern));
    }, [open, index, initialTheme, pattern]);

    // Page scroll lock, Escape to close, focus handling.
    useEffect(() => {
        if (!open) return;
        const returnFocus = document.activeElement as HTMLElement | null;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !document.fullscreenElement) onClose();
        };
        document.addEventListener("keydown", onKeyDown);
        requestAnimationFrame(() => closeRef.current?.focus({preventScroll: true}));
        return () => {
            document.body.style.overflow = previous;
            document.removeEventListener("keydown", onKeyDown);
            returnFocus?.focus?.({preventScroll: true});
        };
    }, [open, onClose]);

    useEffect(() => {
        const onChange = () => setNativeFullscreen(Boolean(document.fullscreenElement));
        document.addEventListener("fullscreenchange", onChange);
        return () => document.removeEventListener("fullscreenchange", onChange);
    }, []);

    // Available space for the frame.
    useLayoutEffect(() => {
        if (!open || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const measure = () => {
            setMaxWidth(Math.max(MIN_WIDTH, canvas.clientWidth - GUTTER));
            setHeight(canvas.clientHeight - GUTTER);
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(canvas);
        return () => observer.disconnect();
    }, [open]);

    const frameWidth = width === "full" ? maxWidth : Math.min(width, maxWidth);

    // Switch the iframe's theme in place, without reloading the example.
    useEffect(() => {
        const doc = iframeRef.current?.contentDocument;
        if (doc && loaded) doc.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme, loaded]);

    const startDrag = (side: 1 | -1) => (event: ReactPointerEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = {x: event.clientX, width: frameWidth, side};
        setDragging(true);
    };

    const onDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (!drag.current) return;
        // The frame is centered, so each side moves by the pointer distance and the width changes twice as much.
        const next = drag.current.width + (event.clientX - drag.current.x) * 2 * drag.current.side;
        setWidth(Math.round(Math.min(maxWidth, Math.max(MIN_WIDTH, next))));
    };

    const endDrag = () => {
        drag.current = null;
        setDragging(false);
    };

    const nudge = useCallback((delta: number) => {
        setWidth((current) => Math.min(maxWidth, Math.max(MIN_WIDTH, (current === "full" ? maxWidth : current) + delta)));
    }, [maxWidth]);

    const toggleNativeFullscreen = () => {
        if (document.fullscreenElement) document.exitFullscreen();
        else rootRef.current?.requestFullscreen?.();
    };

    const reload = () => {
        setLoaded(false);
        iframeRef.current?.contentWindow?.location.reload();
    };

    if (typeof document === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    ref={rootRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Responsive preview: ${title}`}
                    className="fixed inset-0 z-[1100] flex flex-col bg-canvas text-ink"
                    initial={{opacity: 0, scale: 0.985}}
                    animate={{opacity: 1, scale: 1}}
                    // pointerEvents is applied at once, so the closing overlay never blocks the page.
                    exit={{opacity: 0, scale: 0.985, pointerEvents: "none", transition: {duration: 0.15}}}
                    transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
                >
                    {/* Toolbar */}
                    <div className="flex h-14 shrink-0 items-center gap-3 border-b border-hairline px-3 640px:px-4">
                        <div className="hidden min-w-0 flex-1 1024px:block">
                            <p className="truncate text-[0.9rem] font-medium text-ink first-letter:uppercase">{title}</p>
                        </div>

                        <div role="radiogroup" aria-label="Preview width"
                             className="scroll-none flex min-w-0 items-center overflow-x-auto rounded-[10px] border border-hairline bg-surface p-0.5">
                            {presets.map((preset) => {
                                const active = preset.width === width || (preset.width !== "full" && preset.width === frameWidth && width !== "full");
                                return (
                                    <button
                                        key={preset.id}
                                        role="radio"
                                        aria-checked={active}
                                        title={preset.width === "full" ? preset.label : `${preset.label} (${preset.width}px)`}
                                        onClick={() => setWidth(preset.width)}
                                        // No layoutId here: a shared-layout element inside an exiting AnimatePresence
                                        // tree stops the exit from finishing and leaves an invisible overlay behind.
                                        className={cn(
                                            "flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-[0.78rem] font-medium transition-colors",
                                            active ? "bg-raised text-ink" : "text-ink-subtle hover:text-ink-muted"
                                        )}
                                    >
                                        <preset.icon className="size-4"/>
                                        <span className="hidden 768px:inline">{preset.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="hidden items-center gap-1.5 font-mono text-[0.75rem] text-ink-muted 640px:flex">
                            <label className="flex h-8 items-center rounded-lg border border-hairline bg-surface pl-2 pr-1.5 focus-within:border-hairline-strong">
                                <span className="sr-only">Width in pixels</span>
                                <input
                                    type="number"
                                    min={MIN_WIDTH}
                                    max={maxWidth}
                                    value={frameWidth}
                                    onChange={(event) => {
                                        const value = Number(event.target.value);
                                        if (Number.isFinite(value)) setWidth(Math.min(maxWidth, Math.max(MIN_WIDTH, value)));
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
                                            event.preventDefault();
                                            nudge((event.key === "ArrowUp" ? 1 : -1) * (event.shiftKey ? 10 : 1));
                                        }
                                    }}
                                    className="w-12 bg-transparent text-right tabular-nums text-ink outline-none focus-visible:outline-none"
                                />
                                <span className="ml-1 text-ink-subtle">px</span>
                            </label>
                            <span className="rounded-md bg-accent/15 px-1.5 py-1 text-[0.7rem] font-semibold text-accent-strong" title="Active Tailwind breakpoint">
                                {breakpointFor(frameWidth)}
                            </span>
                        </div>

                        <div className="ml-auto flex items-center gap-1 1024px:ml-0 1024px:flex-1 1024px:justify-end">
                            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="icon-btn"
                                    aria-label={`Preview in ${theme === "dark" ? "light" : "dark"} mode`} title="Toggle preview theme">
                                {theme === "dark" ? <LuMoon className="size-4"/> : <LuSun className="size-4"/>}
                            </button>
                            <button onClick={reload} className="icon-btn" aria-label="Reload preview" title="Reload">
                                <LuRotateCcw className="size-4"/>
                            </button>
                            <a href={src} target="_blank" rel="noreferrer" className="icon-btn hidden 640px:inline-flex"
                               aria-label="Open preview in a new tab" title="Open in new tab">
                                <LuExternalLink className="size-4"/>
                            </a>
                            <button onClick={toggleNativeFullscreen} className="icon-btn hidden 640px:inline-flex"
                                    aria-label={nativeFullscreen ? "Exit full screen" : "Enter full screen"}
                                    title={nativeFullscreen ? "Exit full screen" : "Full screen"}>
                                {nativeFullscreen ? <LuShrink className="size-4"/> : <LuExpand className="size-4"/>}
                            </button>
                            <span className="mx-1 hidden h-5 w-px bg-hairline 640px:block"/>
                            <button ref={closeRef} onClick={onClose} className="btn-ghost h-9 px-3 text-[0.82rem]" title="Close (Esc)">
                                <LuX className="size-4"/>
                                <span className="hidden 640px:inline">Close</span>
                            </button>
                        </div>
                    </div>

                    {/* Canvas */}
                    <div
                        ref={canvasRef}
                        className="relative flex flex-1 items-start justify-center overflow-hidden [background-image:radial-gradient(rgb(var(--ink)/0.08)_1px,transparent_1px)] [background-size:16px_16px]"
                        style={{padding: GUTTER / 2}}
                    >
                        <div className="relative" style={{width: frameWidth, height: Math.max(0, height)}}>
                            <iframe
                                ref={iframeRef}
                                src={src}
                                title={`${title} preview`}
                                onLoad={() => setLoaded(true)}
                                className={cn(
                                    "size-full rounded-xl border border-hairline-strong bg-surface shadow-overlay transition-opacity duration-300",
                                    loaded ? "opacity-100" : "opacity-0"
                                )}
                            />

                            {!loaded && (
                                <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-hairline bg-surface">
                                    <span className="h-px w-24 overflow-hidden bg-hairline">
                                        <span className="block h-full w-1/3 animate-slide-x bg-accent"/>
                                    </span>
                                </div>
                            )}

                            {/* Keeps pointer events away from the iframe while resizing. */}
                            {dragging && <div className="absolute inset-0 cursor-ew-resize"/>}

                            {([-1, 1] as const).map((side) => (
                                <div
                                    key={side}
                                    role="separator"
                                    aria-orientation="vertical"
                                    aria-label={side < 0 ? "Resize from the left" : "Resize from the right"}
                                    aria-valuenow={frameWidth}
                                    aria-valuemin={MIN_WIDTH}
                                    aria-valuemax={maxWidth}
                                    tabIndex={0}
                                    onPointerDown={startDrag(side)}
                                    onPointerMove={onDrag}
                                    onPointerUp={endDrag}
                                    onPointerCancel={endDrag}
                                    onKeyDown={(event) => {
                                        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                                            event.preventDefault();
                                            const outward = (event.key === "ArrowRight") === (side > 0);
                                            nudge((outward ? 1 : -1) * (event.shiftKey ? 40 : 8));
                                        }
                                    }}
                                    className={cn(
                                        "group absolute top-1/2 flex h-24 w-4 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center",
                                        side < 0 ? "-left-4" : "-right-4"
                                    )}
                                >
                                    <span className={cn(
                                        "h-12 w-1.5 rounded-full transition-colors",
                                        dragging ? "bg-accent" : "bg-hairline-strong group-hover:bg-ink-subtle group-focus-visible:bg-accent"
                                    )}/>
                                </div>
                            ))}

                            <AnimatePresence>
                                {dragging && (
                                    <motion.div
                                        initial={{opacity: 0, y: 4}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: 4}}
                                        style={{x: "-50%"}}
                                        className="pointer-events-none absolute bottom-4 left-1/2 rounded-full bg-ink px-3 py-1.5 font-mono text-[0.75rem] text-canvas shadow-float"
                                    >
                                        {frameWidth}px · {breakpointFor(frameWidth)}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ResponsivePreview;

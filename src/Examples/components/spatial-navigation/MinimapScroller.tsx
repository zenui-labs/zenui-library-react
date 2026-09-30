import {useCallback, useEffect, useId, useMemo, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent, ReactNode} from "react";
import {animate, motion, useMotionValue, useReducedMotion, useTransform} from "framer-motion";
import type {AnimationPlaybackControls} from "framer-motion";

export interface MinimapScrollerProps {
    /** Any content. Text, code, images and headings are measured and drawn in the minimap. */
    children: ReactNode;
    /** Height of the panel in px. */
    height?: number;
    /** Elements that get a labelled tick beside the minimap. */
    headingSelector?: string;
    /** Style plain HTML children (headings, paragraphs, lists, code, quotes) as an article. */
    prose?: boolean;
    /** Accessible name of the scrolling region. */
    label?: string;
    className?: string;
}

type LineKind = "text" | "heading" | "code" | "link" | "quote";
type BoxKind = "code" | "media" | "quote" | "rule";

interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface Line extends Rect {
    kind: LineKind;
}

interface Box extends Rect {
    kind: BoxKind;
}

interface Heading {
    y: number;
    label: string;
    level: number;
}

interface Doc {
    width: number;
    height: number;
    lines: Line[];
    boxes: Box[];
    headings: Heading[];
}

// The minimap never draws the document larger than this, so short documents do not look zoomed in.
const MAX_SCALE = 0.22;
const LABEL_H = 13;
const PAD_Y = 12;
const FOOTER_H = 18;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const lineKind = (el: Element | null): LineKind => {
    if (!el) return "text";
    if (el.closest("h1, h2, h3, h4, h5, h6")) return "heading";
    if (el.closest("pre, code, kbd")) return "code";
    if (el.closest("a")) return "link";
    if (el.closest("blockquote")) return "quote";
    return "text";
};

// Reads the real layout: every line box of every text node through Range.getClientRects, so each bar in the
// minimap is as long as the line it stands for.
const measure = (content: HTMLElement, headingSelector: string): Doc => {
    const base = content.getBoundingClientRect();
    const local = (r: DOMRect): Rect => ({x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height});
    const lines: Line[] = [];
    const range = document.createRange();
    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (!node.textContent?.trim()) continue;
        const kind = lineKind(node.parentElement);
        range.selectNodeContents(node);
        for (const rect of Array.from(range.getClientRects())) {
            if (rect.width < 1 || rect.height < 1) continue;
            const line = {...local(rect), kind};
            const prev = lines[lines.length - 1];
            // Inline elements split one visual line into several rects. Join touching pieces of the same kind.
            if (prev && prev.kind === kind && Math.abs(prev.y - line.y) < 2 && line.x >= prev.x && line.x - (prev.x + prev.w) < 6) {
                prev.w = line.x + line.w - prev.x;
            } else {
                lines.push(line);
            }
        }
    }

    const boxes: Box[] = [];
    content.querySelectorAll("pre, img, svg, video, canvas, blockquote, hr").forEach((el) => {
        if (el.parentElement?.closest("svg, pre")) return;
        const rect = local(el.getBoundingClientRect());
        const tag = el.tagName.toLowerCase();
        const kind: BoxKind = tag === "pre" ? "code" : tag === "blockquote" ? "quote" : tag === "hr" ? "rule" : "media";
        // Inline icons are too small to matter at minimap scale.
        if (kind === "media" && (rect.w < 32 || rect.h < 32)) return;
        boxes.push({...rect, kind});
    });

    const headings = Array.from(content.querySelectorAll<HTMLElement>(headingSelector)).map((el) => ({
        y: el.getBoundingClientRect().top - base.top,
        label: el.textContent?.trim() ?? "",
        level: Number(el.tagName[1]) || 2,
    }));

    return {width: Math.max(1, base.width), height: Math.max(1, base.height), lines, boxes, headings};
};

const LINE_CLASS: Record<LineKind, string> = {
    text: "fill-zinc-300 dark:fill-zinc-700",
    heading: "fill-zinc-800 dark:fill-zinc-200",
    code: "fill-zinc-400 dark:fill-zinc-500",
    link: "fill-orange-400 dark:fill-orange-400/80",
    quote: "fill-zinc-400 dark:fill-zinc-600",
};

const PROSE = [
    "text-[15px] leading-7 text-zinc-600 dark:text-zinc-400",
    "[&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-zinc-900 dark:[&_h1]:text-white",
    "[&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-zinc-900 dark:[&_h2]:text-white",
    "[&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-zinc-800 dark:[&_h3]:text-zinc-200",
    "[&_p]:my-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1",
    "[&_a]:text-orange-600 [&_a]:underline [&_a]:underline-offset-2 dark:[&_a]:text-orange-400",
    "[&_strong]:font-semibold [&_strong]:text-zinc-900 dark:[&_strong]:text-white",
    "[&_code]:font-mono [&_code]:text-[13px] [&_code]:text-zinc-800 dark:[&_code]:text-zinc-200",
    "[&_pre]:my-5 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-zinc-100 [&_pre]:p-4 [&_pre]:text-[12.5px] [&_pre]:leading-6 dark:[&_pre]:bg-zinc-900",
    "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-orange-500 [&_blockquote]:pl-4 [&_blockquote]:text-zinc-800 dark:[&_blockquote]:text-zinc-200",
    "[&_figure]:my-6 [&_figcaption]:mt-2 [&_figcaption]:text-xs [&_figcaption]:text-zinc-500",
].join(" ");

/**
 * A scrolling panel with a code-editor style minimap. The map is measured from the live layout, the viewport
 * window drags, a click jumps, and headings get labelled ticks that stay legible when they crowd together.
 */
export const MinimapScroller = ({children, height = 460, headingSelector = "h1, h2, h3", prose = true, label = "Document", className = ""}: MinimapScrollerProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const id = `minimap-${useId().replace(/:/g, "")}`;
    const scrollRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const scrollAnim = useRef<AnimationPlaybackControls | null>(null);
    const drag = useRef<{grab: number} | null>(null);
    const [doc, setDoc] = useState<Doc | null>(null);
    const [viewport, setViewport] = useState(height);
    const [active, setActive] = useState(0);
    const [percent, setPercent] = useState(0);
    const [dragging, setDragging] = useState(false);
    const windowTop = useMotionValue(0);
    const hoverY = useMotionValue(0);
    const hoverOpacity = useMotionValue(0);
    const hoverTop = useTransform(hoverY, (y) => y - 0.5);

    const mapH = height - PAD_Y * 2 - FOOTER_H;
    const trackH = doc ? Math.min(mapH, doc.height * MAX_SCALE) : mapH;
    const scale = doc ? trackH / doc.height : 0;

    const sync = useCallback(() => {
        const scroller = scrollRef.current;
        if (!scroller || !doc) return;
        const top = scroller.scrollTop;
        windowTop.set(top * scale);
        const max = scroller.scrollHeight - scroller.clientHeight;
        setPercent(max > 0 ? Math.round((top / max) * 100) : 0);
        let current = 0;
        if (max > 0 && top >= max - 2) current = doc.headings.length - 1;
        else doc.headings.forEach((heading, index) => {
            if (heading.y <= top + 32) current = index;
        });
        setActive(Math.max(0, current));
    }, [doc, scale, windowTop]);

    useEffect(() => {
        const content = contentRef.current;
        const scroller = scrollRef.current;
        if (!content || !scroller) return;
        let frame = 0;
        const run = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                setDoc(measure(content, headingSelector));
                setViewport(scroller.clientHeight);
            });
        };
        const observer = new ResizeObserver(run);
        observer.observe(content);
        observer.observe(scroller);
        document.fonts?.ready.then(run);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [headingSelector]);

    useEffect(sync, [sync]);

    const scrollToY = (y: number, smooth: boolean) => {
        const scroller = scrollRef.current;
        if (!scroller) return;
        const target = clamp(y, 0, scroller.scrollHeight - scroller.clientHeight);
        scrollAnim.current?.stop();
        if (!smooth || reduceMotion) {
            scroller.scrollTop = target;
            return;
        }
        scrollAnim.current = animate(scroller.scrollTop, target, {
            type: "spring",
            stiffness: 170,
            damping: 28,
            restDelta: 0.5,
            onUpdate: (v) => {
                scroller.scrollTop = v;
            },
        });
    };

    const trackY = (event: PointerEvent<HTMLDivElement>) => event.clientY - event.currentTarget.getBoundingClientRect().top;

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (!scale || event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        const y = trackY(event);
        const top = windowTop.get();
        const h = viewport * scale;
        if (y >= top && y <= top + h) {
            drag.current = {grab: y - top};
        } else {
            // Jump so the click lands in the middle of the window, then keep following the pointer.
            drag.current = {grab: h / 2};
            scrollToY((y - h / 2) / scale, true);
        }
        setDragging(true);
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const y = trackY(event);
        hoverY.set(clamp(y, 0, trackH));
        if (!drag.current || !scale) return;
        scrollAnim.current?.stop();
        const scroller = scrollRef.current;
        if (scroller) scroller.scrollTop = (y - drag.current.grab) / scale;
    };

    const endDrag = () => {
        drag.current = null;
        setDragging(false);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const scroller = scrollRef.current;
        if (!scroller) return;
        const page = scroller.clientHeight * 0.85;
        const moves: Record<string, number> = {
            ArrowDown: 56,
            ArrowUp: -56,
            PageDown: page,
            PageUp: -page,
            Home: -scroller.scrollHeight,
            End: scroller.scrollHeight,
        };
        if (!(event.key in moves)) return;
        event.preventDefault();
        scrollToY(scroller.scrollTop + moves[event.key], true);
    };

    // Labels want to sit level with their tick. Where they would overlap they are pushed apart, first
    // downward and then back up from the bottom, and a leader line joins each label to its true position.
    const labels = useMemo(() => {
        if (!doc) return [];
        const placed = doc.headings.map((heading) => ({...heading, tick: heading.y * scale, top: 0}));
        let floor = -Infinity;
        placed.forEach((p) => {
            p.top = Math.max(p.tick - LABEL_H / 2, floor);
            floor = p.top + LABEL_H;
        });
        let ceiling = trackH - LABEL_H / 2;
        for (let i = placed.length - 1; i >= 0; i--) {
            placed[i].top = Math.min(placed[i].top, ceiling);
            ceiling = placed[i].top - LABEL_H;
        }
        return placed;
    }, [doc, scale, trackH]);

    const map = useMemo(() => {
        if (!doc) return null;
        return (
            <svg aria-hidden="true" viewBox={`0 0 ${doc.width} ${doc.height}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                {doc.boxes.map((box, index) => {
                    if (box.kind === "quote") return <rect key={`b${index}`} x={box.x} y={box.y} width={doc.width * 0.02} height={box.h} className="fill-orange-500"/>;
                    if (box.kind === "rule") return <rect key={`b${index}`} x={box.x} y={box.y} width={box.w} height={1 / scale} className="fill-zinc-200 dark:fill-zinc-800"/>;
                    return (
                        <rect
                            key={`b${index}`}
                            x={box.x}
                            y={box.y}
                            width={box.w}
                            height={box.h}
                            vectorEffect="non-scaling-stroke"
                            strokeWidth={1}
                            className={box.kind === "code" ? "fill-zinc-100 stroke-zinc-200 dark:fill-zinc-900 dark:stroke-zinc-800" : "fill-zinc-200 stroke-zinc-300 dark:fill-zinc-800 dark:stroke-zinc-700"}
                        />
                    );
                })}
                {doc.lines.map((line, index) => {
                    const thick = line.kind === "heading" ? 0.72 : 0.5;
                    return (
                        <rect
                            key={index}
                            x={line.x}
                            y={line.y + (line.h * (1 - thick)) / 2}
                            width={line.w}
                            height={line.h * thick}
                            className={LINE_CLASS[line.kind]}
                        />
                    );
                })}
            </svg>
        );
    }, [doc, scale]);

    return (
        <div className={`flex w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 ${className}`} style={{height}}>
            <div
                ref={scrollRef}
                id={`${id}-doc`}
                role="region"
                aria-label={label}
                tabIndex={0}
                onScroll={sync}
                onWheel={() => scrollAnim.current?.stop()}
                onPointerDown={() => scrollAnim.current?.stop()}
                className="relative min-w-0 flex-1 overflow-y-auto outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500/50 [&::-webkit-scrollbar]:hidden"
            >
                <div ref={contentRef} className={`px-5 py-8 sm:px-10 ${prose ? PROSE : ""}`}>
                    {children}
                </div>
            </div>

            <div className="relative flex w-[68px] shrink-0 border-l border-zinc-200 bg-zinc-50/70 pr-2 dark:border-zinc-800 dark:bg-zinc-900/40 sm:w-[172px]" style={{paddingTop: PAD_Y, paddingBottom: PAD_Y}}>
                <nav aria-label="Outline" className="relative hidden w-[104px] shrink-0 sm:block" style={{height: trackH}}>
                    <svg aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
                        {labels.map((p, index) => (
                            <path
                                key={index}
                                d={`M 86 ${p.top + LABEL_H / 2} H 92 L 100 ${p.tick} H 104`}
                                fill="none"
                                strokeWidth={1}
                                className={index === active ? "stroke-orange-500" : "stroke-zinc-300 dark:stroke-zinc-700"}
                            />
                        ))}
                    </svg>
                    {labels.map((p, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => scrollToY(p.y - 16, true)}
                            aria-current={index === active ? "location" : undefined}
                            className={`absolute left-1 block w-[82px] truncate rounded-sm text-right text-[9.5px] leading-[13px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-orange-500/60 ${
                                index === active
                                    ? "font-semibold text-zinc-900 dark:text-white"
                                    : `hover:text-zinc-900 dark:hover:text-white ${p.level > 2 ? "text-zinc-400 dark:text-zinc-500" : "text-zinc-500 dark:text-zinc-400"}`
                            }`}
                            style={{top: p.top, height: LABEL_H}}
                        >
                            {p.label}
                        </button>
                    ))}
                </nav>

                <div className="flex min-w-0 flex-1 flex-col">
                    <div
                        ref={trackRef}
                        role="scrollbar"
                        aria-controls={`${id}-doc`}
                        aria-orientation="vertical"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={percent}
                        aria-label="Minimap"
                        tabIndex={0}
                        onKeyDown={handleKeyDown}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={endDrag}
                        onPointerCancel={endDrag}
                        onPointerEnter={() => hoverOpacity.set(1)}
                        onPointerLeave={() => hoverOpacity.set(0)}
                        className="relative ml-1 cursor-pointer touch-none select-none rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
                        style={{height: trackH}}
                    >
                        {map}
                        {labels.map((p, index) => (
                            <span
                                key={index}
                                aria-hidden="true"
                                className={`absolute -left-1 h-px ${p.level > 2 ? "w-1.5" : "w-2.5"} ${index === active ? "bg-orange-500" : "bg-zinc-400 dark:bg-zinc-500"}`}
                                style={{top: p.tick}}
                            />
                        ))}
                        <motion.span aria-hidden="true" className="pointer-events-none absolute inset-x-0 h-px bg-zinc-900/25 dark:bg-white/25" style={{top: hoverTop, opacity: dragging ? 0 : hoverOpacity}}/>
                        {doc && (
                            <motion.div
                                aria-hidden="true"
                                className={`absolute -inset-x-1 cursor-grab rounded-[3px] border transition-colors active:cursor-grabbing ${
                                    dragging
                                        ? "border-orange-500/70 bg-orange-500/[0.07]"
                                        : "border-zinc-900/15 bg-zinc-900/[0.05] hover:bg-zinc-900/[0.08] dark:border-white/20 dark:bg-white/[0.06] dark:hover:bg-white/[0.09]"
                                }`}
                                style={{top: windowTop, height: Math.min(trackH, viewport * scale)}}
                            />
                        )}
                    </div>
                    <p aria-hidden="true" className="mt-auto pl-1 font-mono text-[9.5px] tabular-nums text-zinc-400 dark:text-zinc-500" style={{height: FOOTER_H, lineHeight: `${FOOTER_H}px`}}>
                        {percent}%
                    </p>
                </div>
            </div>
        </div>
    );
};

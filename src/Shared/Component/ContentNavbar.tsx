import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import {animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";
import {LuArrowUp, LuBug, LuLightbulb} from "react-icons/lu";
import {cn} from "@utils/Style.ts";

const REPO_URL = "https://github.com/Asfak00/zenui-library";

const issueUrl = (type) => {
    const path = encodeURIComponent(window.location.pathname);
    return type === "bug"
        ? `${REPO_URL}/issues/new?title=%5BBUG%5D:+${path}&labels=bug&template=bug_report.md`
        : `${REPO_URL}/issues/new?title=%5Bfeat%5D:+${path}&labels=enhancement&template=feature_request.md`;
};

/** "On this page" column for docs pages. */
interface ContentNavbarProps {
    contents: {id?: number | string; title: string; href: string}[];
    /** The scroll spy's pick. Used only until the headings can be measured. */
    activeSection?: string | null;
    /** Accepted for older call sites; the column has a fixed width now. */
    width?: string;
}

// The reading line sits 40% down the viewport, the same line the scroll spy uses to pick a section.
const READING_LINE = 0.4;
// x of the rail inside the list, in px. Labels are indented past it.
const RAIL_X = 4.5;
const SPARKS = [0, 60, 120, 180, 240, 300];

interface ItemBox {
    top: number;
    height: number;
}

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/**
 * Reading progress through the page's sections, as a float: 0 at the first heading, 1 at the second, and the
 * number of sections at the end of the page. Everything on the rail is driven from this one value.
 */
const readProgress = (ids: string[]) => {
    const tops = ids.map((id) => document.getElementById(id)?.getBoundingClientRect().top);
    if (tops.some((top) => top === undefined)) return null;
    const line = window.innerHeight * READING_LINE;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= maxScroll - 2) return ids.length;
    // The last section ends where the reading line stops when the page is fully scrolled.
    const end = maxScroll - window.scrollY + line;
    for (let index = ids.length - 1; index >= 0; index--) {
        if (line >= tops[index]) {
            const next = index + 1 < ids.length ? tops[index + 1] : end;
            const span = Math.max(1, next - tops[index]);
            return index + Math.min(1, (line - tops[index]) / span);
        }
    }
    return 0;
};

/**
 * The label resolves left to right each time its section becomes active: letters not yet reached are blurred and
 * tinted with the accent. Only color and blur change, never the glyphs or the weight, so the label keeps its exact
 * width and never re-wraps mid-animation.
 */
const DecodeText = ({text, active, still}: {text: string; active: boolean; still: boolean}) => {
    const [shown, setShown] = useState(text.length);

    useEffect(() => {
        if (!active || still) {
            setShown(text.length);
            return;
        }
        let frame = 0;
        const start = performance.now();
        const duration = Math.min(650, 240 + text.length * 14);
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            setShown(Math.floor(t * text.length));
            if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [active, still, text]);

    return (
        <span key={active ? "on" : "off"} className={active ? "toc-shimmer" : undefined}>
            {text.slice(0, shown)}
            {shown < text.length && <span className="text-accent/70 blur-[1.5px]">{text.slice(shown)}</span>}
        </span>
    );
};

interface TocItemProps {
    title: string;
    href: string;
    index: number;
    count: number;
    active: boolean;
    read: boolean;
    progress: MotionValue<number>;
    still: boolean;
    onHover: (index: number | null) => void;
    itemRef: (node: HTMLLIElement | null) => void;
}

// One entry. A focus lens rides the reading position: labels far from it fade, soften and curve away, like a
// camera pulling focus down the list. Hovering or focusing the rail drops the lens so every label is crisp.
const TocItem = ({title, href, index, count, active, read, progress, still, onHover, itemRef}: TocItemProps) => {
    const distance = useTransform(progress, (value) => Math.abs(index - Math.min(count - 1, Math.max(-0.5, value - 0.5))));
    const opacity = useTransform(distance, (d) => (still ? 1 : 1 - Math.min(5, d) * 0.12));
    const filter = useTransform(distance, (d) => (still || d <= 1.5 ? "blur(0px)" : `blur(${Math.min(1.6, (d - 1.5) * 0.55).toFixed(2)}px)`));
    const x = useTransform(distance, (d) => (still ? 0 : -Math.min(6, d * d * 0.45)));

    return (
        <li ref={itemRef} className="relative" onPointerEnter={() => onHover(index)}>
            {/* A node on the rail for each section. It lights up once the thread passes it. */}
            <span
                aria-hidden="true"
                className={cn(
                    "absolute top-1/2 size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[background-color,border-color,transform,box-shadow] duration-300",
                    active
                        ? "scale-[1.4] border-accent bg-accent shadow-[0_0_0_3px_rgb(var(--accent)/0.18)]"
                        : read
                            ? "border-accent/70 bg-accent/70"
                            : "border-hairline-strong bg-canvas"
                )}
                style={{left: RAIL_X + 0.25}}
            />
            <motion.a
                href={href}
                aria-current={active ? "location" : undefined}
                onFocus={() => onHover(index)}
                style={{opacity, filter, x}}
                className={cn(
                    "relative block py-1.5 pl-[22px] pr-2 text-[0.82rem] leading-snug transition-colors duration-300",
                    "group-hover/toc:!opacity-100 group-hover/toc:![filter:none] group-hover/toc:![transform:none]",
                    "group-focus-within/toc:!opacity-100 group-focus-within/toc:![filter:none] group-focus-within/toc:![transform:none]",
                    active ? "text-ink" : read ? "text-ink-muted hover:text-ink" : "text-ink-subtle hover:text-ink-muted"
                )}
            >
                <DecodeText text={capitalize(title)} active={active} still={still}/>
            </motion.a>
        </li>
    );
};

interface Burst {
    key: number;
    y: number;
}

const ContentNavbar = ({contents, activeSection}: ContentNavbarProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const listRef = useRef<HTMLUListElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const [boxes, setBoxes] = useState<ItemBox[]>([]);
    const [measured, setMeasured] = useState(false);
    // Whole sections reached, so nodes and labels re-render once per section rather than on every scroll frame.
    const [reached, setReached] = useState(-1);
    const [hover, setHover] = useState<number | null>(null);
    const [bursts, setBursts] = useState<Burst[]>([]);
    const lastReached = useRef(-1);

    const ids = contents?.map((item) => item.href.slice(1)) ?? [];
    const idsKey = ids.join("|");
    const spyIndex = ids.indexOf(activeSection ?? "");
    const activeIndex = measured ? Math.min(reached, ids.length - 1) : spyIndex;

    // Raw progress and a smoothed copy that everything draws from.
    const progress = useMotionValue(0);
    const smooth = useSpring(progress, reduceMotion ? {stiffness: 1000, damping: 100} : {stiffness: 140, damping: 26, mass: 0.6});
    const percent = useTransform(smooth, (value) => (ids.length ? Math.round((value / ids.length) * 100) : 0));
    const ringLength = useTransform(smooth, (value) => (ids.length ? Math.max(0.001, value / ids.length) : 0.001));

    // Thread length follows progress between item centers, so it reaches each label as its section starts.
    const threadEnd = useTransform(smooth, (value) => {
        if (!boxes.length || value <= 0) return 0;
        const index = Math.min(Math.floor(value), boxes.length - 1);
        const from = boxes[index].top + boxes[index].height / 2;
        const last = boxes[boxes.length - 1];
        const to = index + 1 < boxes.length ? boxes[index + 1].top + boxes[index + 1].height / 2 : last.top + last.height;
        return from + (to - from) * Math.min(1, value - index);
    });

    // The capsule behind the active label. Its edges animate separately, so it stretches like a drop of
    // liquid when it jumps between sections and settles back to the label's height.
    const capTop = useMotionValue(0);
    const capBottom = useMotionValue(0);
    const capHeight = useTransform(() => Math.max(0, capBottom.get() - capTop.get()));
    const capPlaced = useRef(false);

    // A fainter capsule glides after the pointer, so the rail answers before you click.
    const ghostTop = useSpring(0, {stiffness: 420, damping: 34});
    const ghostHeight = useSpring(0, {stiffness: 420, damping: 34});

    const measure = useCallback(() => {
        setBoxes(itemRefs.current.slice(0, contents?.length ?? 0).map((node) => ({top: node?.offsetTop ?? 0, height: node?.offsetHeight ?? 0})));
    }, [contents?.length]);

    useLayoutEffect(() => {
        measure();
        const list = listRef.current;
        if (!list) return;
        const observer = new ResizeObserver(measure);
        observer.observe(list);
        return () => observer.disconnect();
    }, [measure, idsKey]);

    // Scroll drives the progress value directly. React state only changes when a new section is reached.
    useEffect(() => {
        const sectionIds = idsKey ? idsKey.split("|") : [];
        if (!sectionIds.length) return;
        let frame = 0;
        const update = () => {
            frame = 0;
            const value = readProgress(sectionIds);
            if (value === null) return;
            setMeasured(true);
            progress.set(value);
            setReached(value <= 0 ? -1 : Math.min(Math.floor(value), sectionIds.length - 1));
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        schedule();
        // Example pages load their sections after the first paint; keep checking until the headings exist.
        const retry = window.setInterval(schedule, 400);
        const stopRetry = window.setTimeout(() => window.clearInterval(retry), 4000);
        window.addEventListener("scroll", schedule, {passive: true});
        window.addEventListener("resize", schedule);
        return () => {
            cancelAnimationFrame(frame);
            window.clearInterval(retry);
            window.clearTimeout(stopRetry);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
        };
    }, [idsKey, progress]);

    // Reaching a new section going down ignites its node: a ring and a spray of sparks.
    useEffect(() => {
        const previous = lastReached.current;
        lastReached.current = reached;
        const box = boxes[reached];
        if (reduceMotion || !box || reached <= previous || previous < 0) return;
        const key = performance.now();
        setBursts((current) => [...current.slice(-2), {key, y: box.top + box.height / 2}]);
        const timer = window.setTimeout(() => setBursts((current) => current.filter((burst) => burst.key !== key)), 900);
        return () => window.clearTimeout(timer);
    }, [reached, boxes, reduceMotion]);

    // Move the capsule. Moving down, the bottom edge leads on a stiff spring and the top trails on a soft one;
    // moving up it is the other way round.
    useEffect(() => {
        const box = boxes[activeIndex];
        if (!box) return;
        const top = box.top;
        const bottom = box.top + box.height;
        if (!capPlaced.current || reduceMotion) {
            capTop.set(top);
            capBottom.set(bottom);
            capPlaced.current = true;
            return;
        }
        const down = top > capTop.get();
        const lead = {type: "spring", stiffness: 520, damping: 38, mass: 0.7} as const;
        const trail = {type: "spring", stiffness: 170, damping: 22, mass: 0.9} as const;
        const controls = [animate(capTop, top, down ? trail : lead), animate(capBottom, bottom, down ? lead : trail)];
        return () => controls.forEach((control) => control.stop());
    }, [activeIndex, boxes, reduceMotion, capTop, capBottom]);

    useEffect(() => {
        const box = hover === null ? null : boxes[hover];
        if (!box) return;
        if (reduceMotion) {
            ghostTop.jump(box.top);
            ghostHeight.jump(box.height);
        } else {
            ghostTop.set(box.top);
            ghostHeight.set(box.height);
        }
    }, [hover, boxes, reduceMotion, ghostTop, ghostHeight]);

    // Keep the active label in view when the list is taller than its column.
    useEffect(() => {
        const scroller = scrollerRef.current;
        const box = boxes[activeIndex];
        if (!scroller || !box || scroller.scrollHeight <= scroller.clientHeight) return;
        if (box.top >= scroller.scrollTop + 24 && box.top + box.height <= scroller.scrollTop + scroller.clientHeight - 24) return;
        scroller.scrollTo({top: box.top - scroller.clientHeight / 2 + box.height / 2, behavior: reduceMotion ? "auto" : "smooth"});
    }, [activeIndex, boxes, reduceMotion]);

    const hasActive = activeIndex >= 0 && boxes.length > 0;
    const showGhost = hover !== null && hover !== activeIndex && boxes[hover] !== undefined;

    return (
        <nav aria-label="On this page" className="group/toc sticky top-[84px] hidden w-[208px] shrink-0 1260px:block">
            <div className="flex items-center justify-between">
                <p className="eyebrow">On this page</p>
                {ids.length > 0 && (
                    <span className="flex items-center gap-1.5 font-mono text-[0.68rem] tabular-nums text-ink-subtle" aria-hidden="true">
                        <motion.span>{percent}</motion.span>%
                        <svg viewBox="0 0 16 16" className="size-3.5 -rotate-90">
                            <circle cx="8" cy="8" r="6.25" fill="none" strokeWidth="1.5" className="stroke-hairline"/>
                            <motion.circle cx="8" cy="8" r="6.25" fill="none" strokeWidth="1.5" strokeLinecap="round" className="stroke-accent" style={{pathLength: ringLength}}/>
                        </svg>
                    </span>
                )}
            </div>

            {/* The scroll area clips its content, so it reaches past the rail with padding (and a matching negative margin)
                to leave room for the node rings and the ignition bursts. */}
            <div ref={scrollerRef} className="scroll-thin relative -mb-3 -ml-5 mt-0 max-h-[calc(100vh-336px)] overflow-y-auto py-3 pl-5 pr-1">
                <ul ref={listRef} className="relative flex flex-col" onPointerLeave={() => setHover(null)} onBlur={() => setHover(null)}>
                    {/* Track and the read thread, with energy flowing down it into the active node. */}
                    <span aria-hidden="true" className="pointer-events-none absolute bottom-0 top-0 w-px bg-hairline" style={{left: RAIL_X}}/>
                    <motion.span
                        aria-hidden="true"
                        className="toc-flow pointer-events-none absolute top-0 w-[1.5px] rounded-full"
                        style={{left: RAIL_X - 0.25, height: threadEnd}}
                    />

                    {bursts.map((burst) => (
                        <span key={burst.key} aria-hidden="true" className="pointer-events-none absolute z-10" style={{left: RAIL_X + 0.5, top: burst.y}}>
                            <motion.span
                                className="absolute -left-2 -top-2 size-4 rounded-full border border-accent"
                                initial={{scale: 0.3, opacity: 0.9}}
                                animate={{scale: 2.4, opacity: 0}}
                                transition={{duration: 0.7, ease: [0.16, 1, 0.3, 1]}}
                            />
                            {SPARKS.map((angle) => {
                                const radians = (angle * Math.PI) / 180;
                                return (
                                    <motion.span
                                        key={angle}
                                        className="absolute -left-[1px] -top-[1px] size-[2px] rounded-full bg-accent"
                                        initial={{x: 0, y: 0, opacity: 1}}
                                        animate={{x: Math.cos(radians) * 13, y: Math.sin(radians) * 13, opacity: 0}}
                                        transition={{duration: 0.6, ease: "easeOut"}}
                                    />
                                );
                            })}
                        </span>
                    ))}

                    <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 right-0 rounded-[9px] bg-ink/[0.04] transition-opacity duration-200"
                        style={{top: ghostTop, height: ghostHeight, opacity: showGhost ? 1 : 0}}
                    />
                    {/* The liquid capsule behind the active label. */}
                    {hasActive && (
                        <motion.span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-3 right-0 rounded-[9px] border border-accent/20 bg-accent/[0.07]"
                            style={{top: capTop, height: capHeight}}
                        />
                    )}

                    {contents?.map((item, index) => (
                        <TocItem
                            key={item.id ?? item.href}
                            title={item.title}
                            href={item.href}
                            index={index}
                            count={contents.length}
                            active={index === activeIndex}
                            read={measured && index < activeIndex}
                            progress={smooth}
                            still={reduceMotion}
                            onHover={setHover}
                            itemRef={(node) => (itemRefs.current[index] = node)}
                        />
                    ))}
                </ul>
            </div>

            <div className="mt-6 flex flex-col gap-2 border-t border-hairline pt-5 text-[0.82rem]">
                <a href={issueUrl("bug")} target="_blank" rel="noreferrer"
                   className="flex items-center gap-2 text-ink-subtle transition-colors hover:text-ink">
                    <LuBug className="size-3.5"/> Report an issue
                </a>
                <a href={issueUrl("feature")} target="_blank" rel="noreferrer"
                   className="flex items-center gap-2 text-ink-subtle transition-colors hover:text-ink">
                    <LuLightbulb className="size-3.5"/> Request a feature
                </a>
                <button onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
                        className="flex items-center gap-2 text-left text-ink-subtle transition-colors hover:text-ink">
                    <LuArrowUp className="size-3.5"/> Back to top
                </button>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
                <a href="https://readmestudio.zenui.net/" target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border border-hairline">
                    <img src="https://i.ibb.co.com/svzKxvxY/small-ads-for-zenui.png" alt="Readme Studio: build a GitHub README visually"
                         loading="lazy" className="w-full grayscale transition-[filter] duration-300 hover:grayscale-0"/>
                </a>
                <a href="https://react-hooks.zenui.net/" target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border border-hairline">
                    <img src="https://i.ibb.co.com/wNSCP9X1/small-ads-for-zenui-1.png" alt="ZenUI React Hooks"
                         loading="lazy" className="w-full grayscale transition-[filter] duration-300 hover:grayscale-0"/>
                </a>
            </div>
        </nav>
    );
};

export default ContentNavbar;

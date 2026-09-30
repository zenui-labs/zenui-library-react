import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent, ReactNode} from "react";
import {motion, useReducedMotion} from "framer-motion";

export type FolderTint = "manila" | "kraft" | "slate" | "sage" | "rose";

export interface Folder {
    id: string;
    /** Typed on the sticker on the folder's tab. Keep it to one short word. */
    label: string;
    /** A handwritten note in the top corner of the folder, such as a revision or a date. */
    note?: string;
    /** Paper stock. Defaults to manila. */
    tint?: FolderTint;
    content: ReactNode;
}

export interface FolderTabsProps {
    folders: Folder[];
    /** Id of the open folder when controlled. */
    value?: string;
    defaultValue?: string;
    onChange?: (id: string) => void;
    /** Accessible name of the tab list. */
    label: string;
    /** Height of a folder body in px. */
    height?: number;
    className?: string;
}

const TAB_H = 34;
// How far each folder further back peeks out above the one in front of it.
const PEEK = 8;
// How high the chosen folder is drawn up out of the stack before it drops in front.
const LIFT = 34;
const INSET = 2;

const TINTS: Record<FolderTint, string> = {
    manila: "bg-[#ead7a4] dark:bg-[#4a3f2a]",
    kraft: "bg-[#d6b488] dark:bg-[#453526]",
    slate: "bg-[#d2d8dc] dark:bg-[#2f363d]",
    sage: "bg-[#d0d9bf] dark:bg-[#333b2d]",
    rose: "bg-[#eacbbf] dark:bg-[#422f2b]",
};

// Paper grain and long horizontal fibres, drawn by two stretched turbulence filters.
const PAPER = `url("data:image/svg+xml,${encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>"
    + "<filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/>"
    + "<feColorMatrix values='0 0 0 0 0.28  0 0 0 0 0.2  0 0 0 0 0.08  0.45 0 0 0 -0.14'/></filter>"
    + "<filter id='f'><feTurbulence type='fractalNoise' baseFrequency='0.008 0.45' numOctaves='2' stitchTiles='stitch'/>"
    + "<feColorMatrix values='0 0 0 0 0.28  0 0 0 0 0.2  0 0 0 0 0.08  0.3 0 0 0 -0.1'/></filter>"
    + "<rect width='100%' height='100%' filter='url(#g)'/><rect width='100%' height='100%' filter='url(#f)'/></svg>",
)}")`;

// Real stacks are never square. Each folder keeps its own small, stable misalignment while it sits at the back.
const jitter = (index: number) => ({x: ((index * 53) % 5 - 2) * 1.4, rotate: ((index * 37) % 7 - 3) * 0.14});

const shadow = (lift: number, strength: number) =>
    `drop-shadow(0px ${2 + lift * 0.5}px ${3 + lift * 0.7}px rgba(40, 26, 6, ${0.08 + strength * 0.12})) drop-shadow(0px 1px 1px rgba(40, 26, 6, ${0.1 + strength * 0.05}))`;

/**
 * Tabs drawn as a stack of paper file folders. The chosen folder is drawn up out of the stack, crosses over
 * the others and drops in front while the rest slide back into place.
 */
export const FolderTabs = ({folders, value, defaultValue, onChange, label, height = 300, className = ""}: FolderTabsProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const id = `folders-${useId().replace(/:/g, "")}`;
    const [inner, setInner] = useState(defaultValue ?? folders[0]?.id);
    const selected = value ?? inner;
    // What is drawn in front lags the selection for a moment so the new folder can rise before it crosses over.
    const [front, setFront] = useState(selected);
    const [rising, setRising] = useState<string | null>(null);
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const n = folders.length;
    const slot = (100 - INSET * 2) / n;
    const bodyTop = LIFT + TAB_H + (n - 1) * PEEK;

    useEffect(() => {
        if (selected === front) return;
        if (reduceMotion) {
            setFront(selected);
            setRising(null);
            return;
        }
        setRising(selected);
        const timer = window.setTimeout(() => {
            setFront(selected);
            setRising(null);
        }, 240);
        return () => window.clearTimeout(timer);
    }, [selected, front, reduceMotion]);

    // Folders that are not open stay on screen as paper, but out of the tab order and the accessibility tree.
    useEffect(() => {
        Object.entries(panelRefs.current).forEach(([key, el]) => {
            if (el) el.inert = key !== selected;
        });
    }, [selected]);

    const others = folders.filter((folder) => folder.id !== front);
    const depthOf = (folderId: string) => (folderId === front ? 0 : others.findIndex((folder) => folder.id === folderId) + 1);

    const pose = (folderId: string, index: number) => {
        const depth = depthOf(folderId);
        const isRising = folderId === rising;
        const j = depth === 0 || isRising ? {x: 0, rotate: 0} : jitter(index);
        return {
            depth,
            y: -depth * PEEK - (isRising ? LIFT : 0),
            x: j.x,
            rotate: j.rotate,
            rotateX: isRising ? 7 : 0,
            filter: isRising ? shadow(18, 1) : depth === 0 ? shadow(8, 0.8) : shadow(0, 0),
        };
    };

    const select = (folderId: string, focus = false) => {
        if (value === undefined) setInner(folderId);
        onChange?.(folderId);
        if (focus) tabRefs.current[folderId]?.focus();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const moves: Record<string, number> = {ArrowRight: index + 1, ArrowDown: index + 1, ArrowLeft: index - 1, ArrowUp: index - 1, Home: 0, End: n - 1};
        if (!(event.key in moves)) return;
        event.preventDefault();
        select(folders[(moves[event.key] + n) % n].id, true);
    };

    const spring = reduceMotion ? {duration: 0} : {type: "spring" as const, stiffness: 360, damping: 30, mass: 0.9};
    const lift = reduceMotion ? {duration: 0} : {duration: 0.24, ease: [0.3, 0, 0.2, 1] as const};

    return (
        <div className={`relative w-full max-w-2xl select-none ${className}`} style={{height: bodyTop + height + 16, perspective: 1600}}>
            {folders.map((folder, index) => {
                const p = pose(folder.id, index);
                const isRising = folder.id === rising;
                const tint = TINTS[folder.tint ?? "manila"];
                const shade = p.depth * 0.05;
                return (
                    <motion.div
                        key={folder.id}
                        className="absolute inset-x-0"
                        style={{top: bodyTop, height, zIndex: n - p.depth, transformOrigin: "50% 100%"}}
                        initial={false}
                        animate={{y: p.y, x: p.x, rotate: p.rotate, rotateX: p.rotateX, filter: p.filter}}
                        transition={isRising ? lift : spring}
                    >
                        <div className="absolute bottom-full" style={{left: `${INSET + index * slot}%`, width: `${slot}%`, height: TAB_H}}>
                            <span
                                className={`absolute inset-x-0 -bottom-px top-0 rounded-t-[10px] ${tint}`}
                                style={{backgroundImage: PAPER, transform: "perspective(90px) rotateX(11deg)", transformOrigin: "50% 100%"}}
                            >
                                <motion.span className="absolute inset-0 rounded-t-[10px] bg-stone-900 dark:bg-black" initial={false} animate={{opacity: shade}} transition={spring}/>
                            </span>
                            <span className="relative flex h-full items-center justify-center px-1.5 pt-1">
                                <span
                                    className="max-w-full truncate rounded-[2px] bg-[#fbf8ef] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-stone-700 shadow-[0_1px_0_rgba(0,0,0,0.1)] dark:bg-[#d8d1bf] dark:text-stone-800"
                                    style={{transform: `rotate(${((index * 29) % 5 - 2) * 0.6}deg)`}}
                                >
                                    {folder.label}
                                </span>
                            </span>
                        </div>

                        <div className={`absolute inset-0 overflow-hidden rounded-md rounded-tl-sm ${tint}`} style={{backgroundImage: PAPER}}>
                            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-white/50 dark:bg-white/10"/>
                            {/* The score line where the folder bends. */}
                            <span aria-hidden="true" className="absolute inset-x-0 top-3 h-px bg-black/[0.07] shadow-[0_1px_0_rgba(255,255,255,0.35)] dark:bg-black/30 dark:shadow-[0_1px_0_rgba(255,255,255,0.05)]"/>
                            {folder.note && (
                                <span
                                    aria-hidden="true"
                                    className="absolute right-5 top-5 font-serif text-[15px] italic text-[#2c4a7a] opacity-80 dark:text-[#9db3d8]"
                                    style={{transform: `rotate(${-2 - (index % 3)}deg)`}}
                                >
                                    {folder.note}
                                </span>
                            )}
                            <div
                                ref={(el) => {
                                    panelRefs.current[folder.id] = el;
                                }}
                                id={`${id}-panel-${folder.id}`}
                                role="tabpanel"
                                aria-labelledby={`${id}-tab-${folder.id}`}
                                aria-hidden={folder.id !== selected}
                                tabIndex={folder.id === selected ? 0 : -1}
                                className="relative h-full overflow-y-auto px-5 pb-5 pt-11 text-stone-800 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2c4a7a]/50 dark:text-stone-200 sm:px-7"
                            >
                                {folder.content}
                            </div>
                            <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-stone-900 dark:bg-black" initial={false} animate={{opacity: shade}} transition={spring}/>
                        </div>
                    </motion.div>
                );
            })}

            {/* Real tabs sit in their own layer above every folder and ride along with the paper tab they cover. */}
            <div role="tablist" aria-label={label} className="absolute inset-x-0 top-0" style={{zIndex: n + 1}}>
                {folders.map((folder, index) => {
                    const p = pose(folder.id, index);
                    const isSelected = folder.id === selected;
                    return (
                        <motion.button
                            key={folder.id}
                            ref={(el) => {
                                tabRefs.current[folder.id] = el;
                            }}
                            type="button"
                            role="tab"
                            id={`${id}-tab-${folder.id}`}
                            aria-selected={isSelected}
                            aria-controls={`${id}-panel-${folder.id}`}
                            tabIndex={isSelected ? 0 : -1}
                            onClick={() => select(folder.id)}
                            onKeyDown={(event) => handleKeyDown(event, index)}
                            className="absolute rounded-t-[10px] outline-none focus-visible:ring-2 focus-visible:ring-[#2c4a7a]/60 dark:focus-visible:ring-[#9db3d8]/70"
                            style={{top: bodyTop - TAB_H, left: `${INSET + index * slot}%`, width: `${slot}%`, height: TAB_H}}
                            initial={false}
                            animate={{y: p.y}}
                            transition={folder.id === rising ? lift : spring}
                        >
                            <span className="sr-only">{folder.label}</span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

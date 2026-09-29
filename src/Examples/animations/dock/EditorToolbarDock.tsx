import {Fragment, useEffect, useId, useRef, useState} from "react";
import type {ComponentType, KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, LayoutGroup, motion, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";

export interface EditorTool {
    id: string;
    label: string;
    /** Single key that selects the tool while the canvas has focus. */
    shortcut: string;
    icon: ComponentType<{className?: string}>;
    /** Instruction shown in the canvas corner while the tool is selected. */
    hint: string;
}

export interface EditorCanvasState {
    tool: EditorTool;
    color: string;
}

interface ToolButtonProps {
    tool: EditorTool;
    active: boolean;
    pointerX: MotionValue<number>;
    reduceMotion: boolean;
    tabbable: boolean;
    highlightId: string;
    baseSize: number;
    maxSize: number;
    range: number;
    onSelect: () => void;
    onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
    buttonRef: (element: HTMLButtonElement | null) => void;
}

const ToolButton = ({tool, active, pointerX, reduceMotion, tabbable, highlightId, baseSize, maxSize, range, onSelect, onKeyDown, buttonRef}: ToolButtonProps) => {
    const ref = useRef<HTMLButtonElement | null>(null);
    const [tip, setTip] = useState(false);
    const distance = useTransform(pointerX, (value) => {
        const rect = ref.current?.getBoundingClientRect();
        return rect ? value - (rect.left + rect.width / 2) : range;
    });
    const target = useTransform(distance, [-range, 0, range], reduceMotion ? [baseSize, baseSize, baseSize] : [baseSize, maxSize, baseSize]);
    const size = useSpring(target, {stiffness: 420, damping: 30, mass: 0.2});
    const Icon = tool.icon;

    return (
        <div className="relative flex items-end">
            <motion.button
                ref={(element) => {
                    ref.current = element;
                    buttonRef(element);
                }}
                type="button"
                aria-pressed={active}
                aria-keyshortcuts={tool.shortcut}
                aria-label={tool.label}
                tabIndex={tabbable ? 0 : -1}
                onClick={onSelect}
                onKeyDown={onKeyDown}
                onPointerEnter={() => setTip(true)}
                onPointerLeave={() => setTip(false)}
                onFocus={() => setTip(true)}
                onBlur={() => setTip(false)}
                style={{width: size, height: size}}
                className={`relative flex items-center justify-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                    active ? "text-white" : "text-gray-600 hover:text-gray-900 dark:text-slate-300 dark:hover:text-white"
                }`}
            >
                {active && (
                    <motion.span
                        layoutId={highlightId}
                        transition={{type: "spring", stiffness: 500, damping: 34}}
                        className="absolute inset-0 rounded-xl bg-indigo-600 shadow-md shadow-indigo-600/30 dark:bg-indigo-500"
                    />
                )}
                <Icon className="relative h-4 w-4" aria-hidden="true"/>
            </motion.button>
            <AnimatePresence>
                {tip && (
                    <motion.span
                        role="tooltip"
                        initial={{opacity: 0, y: 4, x: "-50%"}}
                        animate={{opacity: 1, y: 0, x: "-50%"}}
                        exit={{opacity: 0, y: 2, x: "-50%"}}
                        transition={{duration: 0.12}}
                        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-3 flex items-center gap-2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-xs font-medium text-white shadow-lg dark:bg-slate-700"
                    >
                        {tool.label}
                        <kbd className="rounded bg-white/15 px-1.5 font-sans text-[10px] text-white/80">{tool.shortcut}</kbd>
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
};

export interface EditorToolbarDockProps {
    tools: EditorTool[];
    /** Fill colors offered in the color popover, as CSS colors. */
    colors: string[];
    /** Id of the selected tool. Pass it with `onToolChange` to control it. */
    toolId?: string;
    defaultToolId?: string;
    onToolChange?: (id: string) => void;
    /** Selected fill color. Pass it with `onColorChange` to control it. */
    color?: string;
    defaultColor?: string;
    onColorChange?: (color: string) => void;
    /** Draws what sits on the canvas, above the dot grid and below the toolbar. */
    renderCanvas?: (state: EditorCanvasState) => ReactNode;
    /** Shortcut keys named in the note under the canvas. Pass an empty array to hide the note. */
    hintShortcuts?: string[];
    /** Accessible name for the color button. */
    colorLabel?: string;
    /** Icon size in px at rest. */
    baseSize?: number;
    /** Icon size in px right under the pointer. */
    maxSize?: number;
    /** Distance in px from the pointer at which icons stop growing. */
    range?: number;
    className?: string;
}

const defaultHintShortcuts = ["V", "R", "T"];

// A floating toolbar for a canvas editor. It magnifies under the pointer, the selected tool is marked
// by a sliding highlight, and single-key shortcuts work while the canvas has focus.
export const EditorToolbarDock = ({
    tools,
    colors,
    toolId,
    defaultToolId,
    onToolChange,
    color,
    defaultColor,
    onColorChange,
    renderCanvas,
    hintShortcuts = defaultHintShortcuts,
    colorLabel = "Fill color",
    baseSize = 32,
    maxSize = 46,
    range = 90,
    className = "",
}: EditorToolbarDockProps) => {
    const highlightId = `${useId()}-active-tool`;
    const reduceMotion = useReducedMotion() ?? false;
    const pointerX = useMotionValue(Infinity);
    const [internalToolId, setInternalToolId] = useState(defaultToolId ?? tools[0]?.id ?? "");
    const [internalColor, setInternalColor] = useState(defaultColor ?? colors[1] ?? colors[0] ?? "#6366f1");
    const currentToolId = toolId ?? internalToolId;
    const currentColor = color ?? internalColor;
    const [focusIndex, setFocusIndex] = useState(() => Math.max(0, tools.findIndex((item) => item.id === currentToolId)));
    const [paletteOpen, setPaletteOpen] = useState(false);
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const canvasRef = useRef<HTMLDivElement>(null);
    const tool = tools.find((item) => item.id === currentToolId) ?? tools[0];

    useEffect(() => {
        if (!paletteOpen) return;
        const close = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") setPaletteOpen(false);
        };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [paletteOpen]);

    const selectTool = (id: string) => {
        if (toolId === undefined) setInternalToolId(id);
        onToolChange?.(id);
    };

    const selectColor = (value: string) => {
        if (color === undefined) setInternalColor(value);
        onColorChange?.(value);
    };

    // Roving tab index: one tab stop for the toolbar, arrow keys move inside it.
    const moveFocus = (index: number) => {
        const next = (index + tools.length) % tools.length;
        setFocusIndex(next);
        buttons.current[next]?.focus();
    };

    const handleToolKey = (index: number) => (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            moveFocus(index + 1);
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            moveFocus(index - 1);
        }
    };

    const handleCanvasKey = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.metaKey || event.ctrlKey || event.altKey) return;
        const match = tools.find((item) => item.shortcut.toLowerCase() === event.key.toLowerCase());
        if (match) {
            event.preventDefault();
            selectTool(match.id);
            setFocusIndex(tools.indexOf(match));
        }
    };

    if (!tool) return null;

    return (
        <div className={`w-full max-w-3xl ${className}`}>
            <div
                ref={canvasRef}
                tabIndex={0}
                role="application"
                aria-roledescription="canvas"
                onKeyDown={handleCanvasKey}
                aria-label={`Canvas. Current tool: ${tool.label}. Press a tool's letter to switch.`}
                className="relative h-80 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900"
            >
                <div aria-hidden="true" className="absolute inset-0 [background-image:radial-gradient(rgba(100,116,139,0.35)_1px,transparent_1px)] [background-size:20px_20px]"/>

                {renderCanvas?.({tool, color: currentColor})}

                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs text-gray-600 shadow-sm ring-1 ring-gray-200 backdrop-blur dark:bg-slate-950/80 dark:text-slate-300 dark:ring-slate-800" aria-live="polite">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span key={tool.id} initial={{opacity: 0, y: 4}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -4}} transition={{duration: 0.15}} className="block">
                            {tool.hint}
                        </motion.span>
                    </AnimatePresence>
                </div>

                {/* Toolbar. */}
                <div className="absolute inset-x-0 bottom-4 flex justify-center px-2">
                    <LayoutGroup>
                        <div
                            role="toolbar"
                            aria-label="Tools"
                            onPointerMove={(event) => pointerX.set(event.clientX)}
                            onPointerLeave={() => pointerX.set(Infinity)}
                            className="flex h-[54px] items-end gap-0 overflow-visible rounded-2xl border border-gray-200 bg-white/90 px-2 pb-[10px] shadow-xl shadow-gray-900/10 backdrop-blur-md sm:gap-1 dark:border-slate-700 dark:bg-slate-950/90 dark:shadow-black/40"
                        >
                            {tools.map((item, index) => (
                                <ToolButton
                                    key={item.id}
                                    tool={item}
                                    active={item.id === tool.id}
                                    pointerX={pointerX}
                                    reduceMotion={reduceMotion}
                                    tabbable={index === focusIndex}
                                    highlightId={highlightId}
                                    baseSize={baseSize}
                                    maxSize={maxSize}
                                    range={range}
                                    onSelect={() => {
                                        selectTool(item.id);
                                        setFocusIndex(index);
                                    }}
                                    onKeyDown={handleToolKey(index)}
                                    buttonRef={(element) => {
                                        buttons.current[index] = element;
                                    }}
                                />
                            ))}

                            <span aria-hidden="true" className="mx-1 mb-1.5 h-6 w-px self-end bg-gray-200 dark:bg-slate-700"/>

                            <div className="relative">
                                <button
                                    type="button"
                                    aria-label={colorLabel}
                                    aria-expanded={paletteOpen}
                                    onClick={() => setPaletteOpen((value) => !value)}
                                    className="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:hover:bg-slate-800"
                                >
                                    <motion.span
                                        animate={{backgroundColor: currentColor}}
                                        className="h-5 w-5 rounded-full ring-2 ring-white shadow dark:ring-slate-900"
                                    />
                                </button>
                                <AnimatePresence>
                                    {paletteOpen && (
                                        <motion.div
                                            initial={{opacity: 0, y: 8, scale: 0.95}}
                                            animate={{opacity: 1, y: 0, scale: 1}}
                                            exit={{opacity: 0, y: 6, scale: 0.97}}
                                            transition={{type: "spring", stiffness: 500, damping: 32}}
                                            style={{originX: 1, originY: 1}}
                                            className="absolute bottom-full right-0 z-20 mb-3 grid grid-cols-3 gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900"
                                        >
                                            {colors.map((swatch, index) => (
                                                <motion.button
                                                    key={swatch}
                                                    type="button"
                                                    aria-label={`Color ${index + 1}`}
                                                    aria-pressed={swatch === currentColor}
                                                    initial={{opacity: 0, scale: 0.6}}
                                                    animate={{opacity: 1, scale: 1}}
                                                    transition={{delay: index * 0.03}}
                                                    onClick={() => {
                                                        selectColor(swatch);
                                                        setPaletteOpen(false);
                                                    }}
                                                    style={{backgroundColor: swatch}}
                                                    className={`h-7 w-7 rounded-full ring-offset-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:ring-offset-slate-900 ${
                                                        swatch === currentColor ? "ring-2 ring-gray-900 dark:ring-white" : ""
                                                    }`}
                                                />
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </LayoutGroup>
                </div>
            </div>
            {hintShortcuts.length > 0 && (
                <p className="mt-3 text-center text-xs text-gray-500 dark:text-slate-400">
                    Focus the canvas and press{" "}
                    {hintShortcuts.map((key, index) => (
                        <Fragment key={key}>
                            {index === 0 ? "" : index === hintShortcuts.length - 1 ? " or " : ", "}
                            <kbd className="rounded border border-gray-200 px-1 font-sans dark:border-slate-700">{key}</kbd>
                        </Fragment>
                    ))}{" "}
                    to switch tools.
                </p>
            )}
        </div>
    );
};

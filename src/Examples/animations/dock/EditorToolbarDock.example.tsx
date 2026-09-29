import {useEffect, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, LayoutGroup, motion, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";
import type {IconType} from "react-icons";
import {LuCircle, LuFrame, LuHand, LuMessageCircle, LuMousePointer, LuPenTool, LuSquare, LuType} from "react-icons/lu";

interface Tool {
    id: string;
    label: string;
    shortcut: string;
    icon: IconType;
    hint: string;
}

const tools: Tool[] = [
    {id: "move", label: "Move", shortcut: "V", icon: LuMousePointer, hint: "Click a layer to select it"},
    {id: "hand", label: "Hand", shortcut: "H", icon: LuHand, hint: "Drag to pan the canvas"},
    {id: "frame", label: "Frame", shortcut: "F", icon: LuFrame, hint: "Drag to draw a frame"},
    {id: "rectangle", label: "Rectangle", shortcut: "R", icon: LuSquare, hint: "Drag to draw a rectangle"},
    {id: "ellipse", label: "Ellipse", shortcut: "O", icon: LuCircle, hint: "Drag to draw an ellipse"},
    {id: "pen", label: "Pen", shortcut: "P", icon: LuPenTool, hint: "Click to add points, Enter to finish"},
    {id: "text", label: "Text", shortcut: "T", icon: LuType, hint: "Click anywhere to add text"},
    {id: "comment", label: "Comment", shortcut: "C", icon: LuMessageCircle, hint: "Click to leave a comment"},
];

const colors = ["#0f172a", "#6366f1", "#ec4899", "#f59e0b", "#10b981", "#0ea5e9"];

const BASE = 32;
const MAX = 46;
const RANGE = 90;

interface ToolButtonProps {
    tool: Tool;
    active: boolean;
    pointerX: MotionValue<number>;
    reduceMotion: boolean;
    tabbable: boolean;
    onSelect: () => void;
    onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
    buttonRef: (element: HTMLButtonElement | null) => void;
}

const ToolButton = ({tool, active, pointerX, reduceMotion, tabbable, onSelect, onKeyDown, buttonRef}: ToolButtonProps) => {
    const ref = useRef<HTMLButtonElement | null>(null);
    const [tip, setTip] = useState(false);
    const distance = useTransform(pointerX, (value) => {
        const rect = ref.current?.getBoundingClientRect();
        return rect ? value - (rect.left + rect.width / 2) : RANGE;
    });
    const target = useTransform(distance, [-RANGE, 0, RANGE], reduceMotion ? [BASE, BASE, BASE] : [BASE, MAX, BASE]);
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
                        layoutId="active-tool"
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

// A floating toolbar for a canvas editor. It magnifies under the pointer, the selected tool is marked
// by a sliding highlight, and single-key shortcuts work while the canvas has focus.
const EditorToolbarDock = () => {
    const reduceMotion = useReducedMotion() ?? false;
    const pointerX = useMotionValue(Infinity);
    const [toolId, setToolId] = useState("move");
    const [focusIndex, setFocusIndex] = useState(0);
    const [color, setColor] = useState(colors[1]);
    const [paletteOpen, setPaletteOpen] = useState(false);
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const canvasRef = useRef<HTMLDivElement>(null);
    const tool = tools.find((item) => item.id === toolId) ?? tools[0];

    useEffect(() => {
        if (!paletteOpen) return;
        const close = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") setPaletteOpen(false);
        };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [paletteOpen]);

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
            setToolId(match.id);
            setFocusIndex(tools.indexOf(match));
        }
    };

    return (
        <div className="w-full max-w-3xl">
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

                {/* Sample artboard. */}
                <div aria-hidden="true" className="absolute left-1/2 top-10 w-56 -translate-x-1/2 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-slate-950 dark:ring-slate-800">
                    <p className="text-[10px] text-gray-400 dark:text-slate-500">Onboarding / Welcome</p>
                    <motion.div animate={{backgroundColor: color}} className="mt-2 h-16 rounded-lg"/>
                    <div className="mt-3 h-2 w-3/4 rounded-full bg-gray-200 dark:bg-slate-800"/>
                    <div className="mt-2 h-2 w-1/2 rounded-full bg-gray-100 dark:bg-slate-800/60"/>
                </div>

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
                                    active={item.id === toolId}
                                    pointerX={pointerX}
                                    reduceMotion={reduceMotion}
                                    tabbable={index === focusIndex}
                                    onSelect={() => {
                                        setToolId(item.id);
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
                                    aria-label="Fill color"
                                    aria-expanded={paletteOpen}
                                    onClick={() => setPaletteOpen((value) => !value)}
                                    className="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:hover:bg-slate-800"
                                >
                                    <motion.span
                                        animate={{backgroundColor: color}}
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
                                                    aria-pressed={swatch === color}
                                                    initial={{opacity: 0, scale: 0.6}}
                                                    animate={{opacity: 1, scale: 1}}
                                                    transition={{delay: index * 0.03}}
                                                    onClick={() => {
                                                        setColor(swatch);
                                                        setPaletteOpen(false);
                                                    }}
                                                    style={{backgroundColor: swatch}}
                                                    className={`h-7 w-7 rounded-full ring-offset-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:ring-offset-slate-900 ${
                                                        swatch === color ? "ring-2 ring-gray-900 dark:ring-white" : ""
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
            <p className="mt-3 text-center text-xs text-gray-500 dark:text-slate-400">
                Focus the canvas and press <kbd className="rounded border border-gray-200 px-1 font-sans dark:border-slate-700">V</kbd>,{" "}
                <kbd className="rounded border border-gray-200 px-1 font-sans dark:border-slate-700">R</kbd> or{" "}
                <kbd className="rounded border border-gray-200 px-1 font-sans dark:border-slate-700">T</kbd> to switch tools.
            </p>
        </div>
    );
};

export default EditorToolbarDock;

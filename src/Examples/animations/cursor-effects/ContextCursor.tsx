import {useEffect, useState} from "react";
import type {PointerEvent, ReactNode} from "react";
import {AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring} from "framer-motion";
import {LuArrowLeftRight, LuEye} from "react-icons/lu";

const useFinePointer = () => {
    const [fine, setFine] = useState(false);
    useEffect(() => {
        const query = window.matchMedia("(hover: hover) and (pointer: fine)");
        const update = () => setFine(query.matches);
        update();
        query.addEventListener("change", update);
        return () => query.removeEventListener("change", update);
    }, []);
    return fine;
};

/** Values an element can set in its `data-cursor` attribute. */
export type CursorMode = "default" | "view" | "drag" | "link" | "text";

interface CursorShape {
    width: number;
    height: number;
    borderRadius: number;
}

const shapes: Record<CursorMode, CursorShape> = {
    default: {width: 12, height: 12, borderRadius: 999},
    view: {width: 84, height: 84, borderRadius: 999},
    drag: {width: 76, height: 40, borderRadius: 999},
    link: {width: 44, height: 44, borderRadius: 999},
    text: {width: 3, height: 26, borderRadius: 2},
};

const isMode = (value: string | null): value is CursorMode => value !== null && value in shapes;

export interface ContextCursorProps {
    /** Content of the area. Mark elements with `data-cursor="view" | "drag" | "link" | "text"`. */
    children: ReactNode;
    /** Label inside the cursor over `data-cursor="view"`. */
    viewLabel?: string;
    /** Label inside the cursor over `data-cursor="drag"`. */
    dragLabel?: string;
    className?: string;
}

// Elements opt into a cursor style with data-cursor. The cursor reads the closest one under the pointer
// and morphs its size, shape and label to match.
export const ContextCursor = ({children, viewLabel = "View", dragLabel = "Drag", className = ""}: ContextCursorProps) => {
    const fine = useFinePointer();
    const reduceMotion = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, {stiffness: 500, damping: 40, mass: 0.5});
    const springY = useSpring(y, {stiffness: 500, damping: 40, mass: 0.5});
    const [mode, setMode] = useState<CursorMode>("default");
    const [visible, setVisible] = useState(false);

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        const pointX = event.clientX - rect.left;
        const pointY = event.clientY - rect.top;
        x.set(pointX);
        y.set(pointY);
        if (!visible) {
            springX.jump(pointX);
            springY.jump(pointY);
            setVisible(true);
        }
        const target = event.target instanceof Element ? event.target.closest("[data-cursor]") : null;
        const next = target ? target.getAttribute("data-cursor") : null;
        const nextMode = isMode(next) ? next : "default";
        if (nextMode !== mode) setMode(nextMode);
    };

    const inverted = mode === "view" || mode === "drag";

    return (
        <div
            onPointerMove={fine ? handlePointerMove : undefined}
            onPointerLeave={() => setVisible(false)}
            className={`relative w-full max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 sm:p-8 dark:border-slate-800 dark:bg-slate-950 ${fine ? "cursor-none [&_*]:cursor-none" : ""} ${className}`}
        >
            {children}

            {fine && (
                <motion.div
                    aria-hidden="true"
                    style={{x: reduceMotion ? x : springX, y: reduceMotion ? y : springY}}
                    className="pointer-events-none absolute left-0 top-0 z-20"
                >
                    <motion.div
                        style={{x: "-50%", y: "-50%"}}
                        animate={{...shapes[mode], opacity: visible ? 1 : 0}}
                        transition={{type: "spring", stiffness: 420, damping: 30}}
                        className={`flex items-center justify-center overflow-hidden transition-colors duration-200 ${
                            inverted
                                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                                : mode === "link"
                                  ? "border-2 border-gray-900 bg-transparent dark:border-white"
                                  : "bg-gray-900 dark:bg-white"
                        }`}
                    >
                        <AnimatePresence mode="wait">
                            {inverted && (
                                <motion.span
                                    key={mode}
                                    initial={{opacity: 0, scale: 0.6}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0, scale: 0.6}}
                                    transition={{duration: 0.15}}
                                    className="flex items-center gap-1 text-xs font-semibold"
                                >
                                    {mode === "view" ? <LuEye className="h-3.5 w-3.5"/> : <LuArrowLeftRight className="h-3.5 w-3.5"/>}
                                    {mode === "view" ? viewLabel : dragLabel}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

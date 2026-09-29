import {useEffect, useRef, useState} from "react";
import type {PointerEvent} from "react";
import {AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring} from "framer-motion";
import {LuArrowLeftRight, LuArrowUpRight, LuEye} from "react-icons/lu";

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

type CursorMode = "default" | "view" | "drag" | "link" | "text";

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

const projects = [
    {name: "Moss banking", year: "2025", className: "from-emerald-300 to-teal-600 dark:from-emerald-600 dark:to-teal-900"},
    {name: "Lumen health", year: "2024", className: "from-amber-200 to-rose-500 dark:from-amber-600 dark:to-rose-900"},
];

const clients = ["Tidewater", "Oakline", "Parcel & Co", "Groundwork", "Northstar", "Fieldnote", "Harbor"];

// Elements opt into a cursor style with data-cursor. The cursor reads the closest one under the pointer
// and morphs its size, shape and label to match.
const ContextCursor = () => {
    const fine = useFinePointer();
    const reduceMotion = useReducedMotion();
    const stripRef = useRef<HTMLDivElement>(null);
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
            className={`relative w-full max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 sm:p-8 dark:border-slate-800 dark:bg-slate-950 ${fine ? "cursor-none [&_*]:cursor-none" : ""}`}
        >
            <div className="grid gap-4 sm:grid-cols-2">
                {projects.map((project) => (
                    <a
                        key={project.name}
                        href="#project"
                        data-cursor="view"
                        className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 dark:focus-visible:ring-white dark:focus-visible:ring-offset-slate-950"
                    >
                        <div className={`h-36 overflow-hidden rounded-2xl bg-gradient-to-br sm:h-44 ${project.className}`}>
                            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.45),transparent_55%)] transition-transform duration-700 ease-out group-hover:scale-110"/>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="font-semibold text-gray-900 dark:text-white">{project.name}</span>
                            <span className="text-gray-500 dark:text-slate-400">{project.year}</span>
                        </div>
                    </a>
                ))}
            </div>

            <p data-cursor="text" className="mt-6 max-w-xl text-sm leading-6 text-gray-600 dark:text-slate-400">
                Brand, product and motion work for companies in finance and health. Hover the projects, drag the client list, or read this line to see the cursor change.
            </p>

            <div ref={stripRef} data-cursor="drag" className="mt-5 overflow-hidden rounded-xl border border-gray-200 py-3 dark:border-slate-800">
                <motion.ul
                    drag="x"
                    dragConstraints={stripRef}
                    dragElastic={0.15}
                    aria-label="Clients"
                    className="flex w-max gap-6 px-4"
                >
                    {clients.map((client) => (
                        <li key={client} className="select-none whitespace-nowrap text-lg font-semibold tracking-tight text-gray-400 dark:text-slate-500">
                            {client}
                        </li>
                    ))}
                </motion.ul>
            </div>

            <a
                href="mailto:hello@studio-orbit.com"
                data-cursor="link"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition hover:decoration-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:text-white dark:decoration-slate-600 dark:hover:decoration-white dark:focus-visible:ring-white"
            >
                hello@studio-orbit.com
                <LuArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/>
            </a>

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
                                    {mode === "view" ? "View" : "Drag"}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default ContextCursor;

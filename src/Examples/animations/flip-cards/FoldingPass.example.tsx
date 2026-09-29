import {useEffect, useId, useRef, useState} from "react";
import {motion, useReducedMotion} from "framer-motion";
import type {Transition} from "framer-motion";
import {LuChevronDown, LuPlane, LuWallet} from "react-icons/lu";

const PANEL_HEIGHT = 136;

// Bar widths for the decorative barcode, fixed so it looks the same on every render.
const bars = [3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1, 1, 2, 3];

const panelClass = "relative h-[136px] overflow-hidden [-webkit-backface-visibility:hidden] [backface-visibility:hidden]";

// A boarding pass folded in three. Opening it swings each panel down from behind the one above.
const FoldingPass = () => {
    const reduceMotion = useReducedMotion();
    const [open, setOpen] = useState(false);
    const detailsId = useId();
    const foldRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        foldRef.current?.toggleAttribute("inert", !open);
    }, [open]);

    // Unfold top to bottom, fold bottom to top.
    const hinge = (order: number): Transition =>
        reduceMotion
            ? {duration: 0}
            : {type: "spring", stiffness: 90, damping: 15, delay: open ? order * 0.18 : (1 - order) * 0.18};

    return (
        <div className="w-full max-w-sm">
            <motion.div
                className="[perspective:1100px]"
                initial={false}
                animate={{height: open ? PANEL_HEIGHT * 3 : PANEL_HEIGHT}}
                transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 90, damping: 18}}
            >
                <div className="relative [transform-style:preserve-3d]">
                    {/* Panel 1 sits a little forward in 3D space so it always covers the folded panels. */}
                    <div className={`${panelClass} rounded-t-3xl [transform:translateZ(2px)] bg-gradient-to-br from-sky-500 to-indigo-600 p-5 text-white ${open ? "" : "rounded-b-3xl"} transition-[border-radius] duration-300`}>
                        <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.18em] text-sky-100">
                            <span>Northwind Air · NW 482</span>
                            <span>Oct 14</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <div>
                                <p className="text-3xl font-semibold tracking-tight">SFO</p>
                                <p className="text-xs text-sky-100">San Francisco</p>
                            </div>
                            <div className="flex flex-1 items-center gap-2 px-3 text-sky-100" aria-hidden="true">
                                <span className="h-px flex-1 border-t border-dashed border-white/50"/>
                                <LuPlane className="h-4 w-4"/>
                                <span className="h-px flex-1 border-t border-dashed border-white/50"/>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-semibold tracking-tight">JFK</p>
                                <p className="text-xs text-sky-100">New York</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            aria-expanded={open}
                            aria-controls={detailsId}
                            onClick={() => setOpen((value) => !value)}
                            className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium ring-1 ring-inset ring-white/25 transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                            {open ? "Fold pass" : "Open pass"}
                            <motion.span animate={{rotate: open ? 180 : 0}} transition={{type: "spring", stiffness: 300, damping: 20}}>
                                <LuChevronDown className="h-3.5 w-3.5" aria-hidden="true"/>
                            </motion.span>
                        </button>
                    </div>

                    <div ref={foldRef} id={detailsId}>
                        {/* Panel 2 is hinged on its top edge. */}
                        <motion.div
                            className="origin-top [transform-style:preserve-3d]"
                            initial={false}
                            animate={{rotateX: open ? 0 : -180}}
                            transition={hinge(0)}
                        >
                            <div className={`${panelClass} border-x border-gray-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900`}>
                                <div aria-hidden="true" className="absolute inset-x-5 top-0 border-t border-dashed border-gray-200 dark:border-slate-700"/>
                                <dl className="grid grid-cols-3 gap-x-4 gap-y-3 text-sm">
                                    {[
                                        ["Passenger", "Maya Okafor"],
                                        ["Seat", "14A"],
                                        ["Gate", "B22"],
                                        ["Boarding", "7:25 AM"],
                                        ["Class", "Economy"],
                                    ].map(([label, value]) => (
                                        <div key={label} className={label === "Passenger" ? "col-span-2" : ""}>
                                            <dt className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-slate-500">{label}</dt>
                                            <dd className="truncate font-medium text-gray-900 dark:text-white">{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                                <motion.div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 to-black/10"
                                    initial={false}
                                    animate={{opacity: open ? 0 : 1}}
                                    transition={hinge(0)}
                                />
                            </div>

                            {/* Panel 3 is hinged on the bottom edge of panel 2, so it moves with it. */}
                            <motion.div
                                className="origin-top [transform-style:preserve-3d]"
                                initial={false}
                                animate={{rotateX: open ? 0 : 180}}
                                transition={hinge(1)}
                            >
                                <div className={`${panelClass} flex items-center gap-4 rounded-b-3xl border-x border-b border-gray-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900`}>
                                    <div aria-hidden="true" className="absolute inset-x-5 top-0 border-t border-dashed border-gray-200 dark:border-slate-700"/>
                                    <div className="flex h-16 flex-1 items-stretch gap-[2px]" role="img" aria-label="Boarding pass barcode">
                                        {bars.map((width, index) => (
                                            <span key={index} style={{flexGrow: width}} className={index % 2 === 0 ? "bg-gray-900 dark:bg-white" : "bg-transparent"}/>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gray-900 px-3.5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900"
                                    >
                                        <LuWallet className="h-4 w-4" aria-hidden="true"/>
                                        Add to wallet
                                    </button>
                                    <motion.div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-black/10"
                                        initial={false}
                                        animate={{opacity: open ? 0 : 1}}
                                        transition={hinge(1)}
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default FoldingPass;

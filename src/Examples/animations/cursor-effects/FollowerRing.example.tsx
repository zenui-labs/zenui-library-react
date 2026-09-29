import {useEffect, useState} from "react";
import type {PointerEvent} from "react";
import {motion, useMotionValue, useReducedMotion, useSpring} from "framer-motion";
import {LuArrowUpRight} from "react-icons/lu";

// True on devices with a mouse or trackpad. Touch screens keep their normal behavior.
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

const links = ["Case studies", "Writing", "Contact"];

// A dot sits exactly on the pointer while a ring trails behind it on a spring.
// Over links and buttons the ring grows and fills; pressing squeezes it.
const FollowerRing = () => {
    const fine = useFinePointer();
    const reduceMotion = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const ringX = useSpring(x, {stiffness: 180, damping: 20, mass: 0.6});
    const ringY = useSpring(y, {stiffness: 180, damping: 20, mass: 0.6});

    const [visible, setVisible] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [pressed, setPressed] = useState(false);

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
        if (!visible) {
            // Jump the ring to the entry point so it does not fly in from the corner.
            ringX.jump(event.clientX - rect.left);
            ringY.jump(event.clientY - rect.top);
            setVisible(true);
        }
        const overTarget = event.target instanceof Element && event.target.closest("a, button") !== null;
        if (overTarget !== hovering) setHovering(overTarget);
    };

    const ringSize = hovering ? 64 : 36;

    return (
        <div
            onPointerMove={fine ? handlePointerMove : undefined}
            onPointerLeave={() => {
                setVisible(false);
                setPressed(false);
            }}
            onPointerDown={() => setPressed(true)}
            onPointerUp={() => setPressed(false)}
            className={`relative w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 py-12 sm:px-12 sm:py-16 dark:border-slate-800 dark:bg-slate-950 ${fine ? "cursor-none [&_*]:cursor-none" : ""}`}
        >
            <p className="text-sm font-medium text-gray-500 dark:text-slate-400">Lina Park, product designer in Seoul</p>
            <h2 className="mt-3 max-w-lg text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                I design banking and health apps that people open every day.
            </h2>
            <nav aria-label="Portfolio" className="mt-8 flex flex-wrap gap-2">
                {links.map((link) => (
                    <a
                        key={link}
                        href={`#${link.toLowerCase().replace(" ", "-")}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition hover:border-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:text-slate-200 dark:hover:border-white dark:focus-visible:ring-offset-slate-950"
                    >
                        {link}
                        <LuArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/>
                    </a>
                ))}
            </nav>

            {fine && (
                <>
                    <motion.div
                        aria-hidden="true"
                        style={{x: reduceMotion ? x : ringX, y: reduceMotion ? y : ringY}}
                        className="pointer-events-none absolute left-0 top-0 z-10"
                    >
                        {/* Centering uses motion x/y, because an animated scale replaces any transform class. */}
                        <motion.div
                            style={{x: "-50%", y: "-50%"}}
                            animate={{
                                width: ringSize,
                                height: ringSize,
                                opacity: visible ? 1 : 0,
                                scale: pressed ? 0.8 : 1,
                            }}
                            transition={{type: "spring", stiffness: 400, damping: 28}}
                            className={`rounded-full border transition-colors duration-300 ${hovering ? "border-indigo-500/0 bg-indigo-500/15 dark:bg-indigo-400/20" : "border-gray-900/40 dark:border-white/50"}`}
                        />
                    </motion.div>
                    <motion.div aria-hidden="true" style={{x, y}} className="pointer-events-none absolute left-0 top-0 z-10">
                        <motion.div
                            style={{x: "-50%", y: "-50%"}}
                            animate={{opacity: visible ? 1 : 0, scale: hovering ? 0 : 1}}
                            transition={{duration: 0.2}}
                            className="h-2 w-2 rounded-full bg-gray-900 dark:bg-white"
                        />
                    </motion.div>
                </>
            )}
        </div>
    );
};

export default FollowerRing;

import {useRef} from "react";
import type {PointerEvent, ReactNode} from "react";
import {motion, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring} from "framer-motion";
import type {MotionValue} from "framer-motion";
import type {IconType} from "react-icons";
import {LuArrowRight, LuCalendar, LuMail, LuMessageCircle, LuPhone} from "react-icons/lu";

interface Point {
    x: number;
    y: number;
}

interface MagneticProps {
    pointer: MotionValue<Point | null>;
    /** How strongly the element leans toward the pointer, from 0 to 1. */
    strength?: number;
    /** Extra reach around the element, in px, where the pull starts. */
    reach?: number;
    className?: string;
    children: (inner: {x: MotionValue<number>; y: MotionValue<number>}) => ReactNode;
}

const spring = {stiffness: 220, damping: 16, mass: 0.5};

// Every magnetic element listens to one shared pointer value from the area around it.
// Inside its reach it leans toward the pointer, and its content leans a little further for depth.
const Magnetic = ({pointer, strength = 0.35, reach = 70, className = "", children}: MagneticProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useSpring(0, spring);
    const y = useSpring(0, spring);
    const innerX = useSpring(0, spring);
    const innerY = useSpring(0, spring);

    useMotionValueEvent(pointer, "change", (point) => {
        const element = ref.current;
        if (!element) return;
        // The measured box includes the current offset, so remove it to get the resting position.
        const rect = element.getBoundingClientRect();
        const left = rect.left - x.get();
        const top = rect.top - y.get();
        const centerX = left + rect.width / 2;
        const centerY = top + rect.height / 2;
        const inRange =
            point !== null &&
            point.x > left - reach && point.x < left + rect.width + reach &&
            point.y > top - reach && point.y < top + rect.height + reach;

        if (!inRange || point === null) {
            x.set(0);
            y.set(0);
            innerX.set(0);
            innerY.set(0);
            return;
        }
        const dx = point.x - centerX;
        const dy = point.y - centerY;
        x.set(dx * strength);
        y.set(dy * strength);
        innerX.set(dx * strength * 0.4);
        innerY.set(dy * strength * 0.4);
    });

    return (
        <motion.div ref={ref} style={{x, y}} className={className}>
            {children({x: innerX, y: innerY})}
        </motion.div>
    );
};

interface Channel {
    label: string;
    icon: IconType;
    href: string;
}

const channels: Channel[] = [
    {label: "Email us", icon: LuMail, href: "#email"},
    {label: "Call sales", icon: LuPhone, href: "#call"},
    {label: "Open chat", icon: LuMessageCircle, href: "#chat"},
    {label: "Book a demo", icon: LuCalendar, href: "#demo"},
];

const MagneticArea = () => {
    const reduceMotion = useReducedMotion();
    const pointer = useMotionValue<Point | null>(null);

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (reduceMotion || event.pointerType !== "mouse") return;
        pointer.set({x: event.clientX, y: event.clientY});
    };

    return (
        <section
            onPointerMove={handlePointerMove}
            onPointerLeave={() => pointer.set(null)}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white px-6 py-12 text-center sm:px-12 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950"
        >
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Talk to a real person</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-600 dark:text-slate-400">
                Our support team answers in under five minutes, Monday to Saturday.
            </p>

            <div className="mt-8 flex justify-center">
                <Magnetic pointer={pointer} strength={0.3} reach={90}>
                    {(inner) => (
                        <a
                            href="#start"
                            className="group inline-flex items-center rounded-full bg-gray-900 p-1.5 text-sm font-medium text-white shadow-lg shadow-gray-900/20 transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-gray-900 dark:shadow-black/40 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
                        >
                            <motion.span style={inner} className="flex items-center gap-3 pl-5">
                                Start a free trial
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-[-45deg] dark:bg-gray-900/10">
                                    <LuArrowRight className="h-4 w-4" aria-hidden="true"/>
                                </span>
                            </motion.span>
                        </a>
                    )}
                </Magnetic>
            </div>

            <ul className="mt-8 flex flex-wrap justify-center gap-3">
                {channels.map((channel) => {
                    const Icon = channel.icon;
                    return (
                        <li key={channel.label}>
                            <Magnetic pointer={pointer} strength={0.45} reach={40}>
                                {(inner) => (
                                    <a
                                        href={channel.href}
                                        aria-label={channel.label}
                                        title={channel.label}
                                        className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:border-indigo-300 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-500/60 dark:hover:text-indigo-300 dark:focus-visible:ring-offset-slate-950"
                                    >
                                        <motion.span style={inner} className="flex">
                                            <Icon className="h-5 w-5" aria-hidden="true"/>
                                        </motion.span>
                                    </a>
                                )}
                            </Magnetic>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default MagneticArea;

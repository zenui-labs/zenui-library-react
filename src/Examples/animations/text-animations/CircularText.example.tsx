import {useId, useRef, useState} from "react";
import {motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion} from "framer-motion";
import {LuArrowUpRight} from "react-icons/lu";

const RADIUS = 78;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const label = "Now booking spring projects \u2022 Halden Studio \u2022 ";

const BASE_SPEED = 0.012; // degrees per ms, one turn every 30 seconds
const HOVER_SPEED = 0.07;

// Text set on a circular path that turns slowly and speeds up while hovered or focused.
// Speed changes are eased each frame, so the badge never jumps.
const CircularText = () => {
    const ref = useRef<HTMLDivElement>(null);
    const pathId = `circle-${useId().replace(/:/g, "")}`;
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const [active, setActive] = useState(false);

    const rotate = useMotionValue(0);
    const speed = useRef(BASE_SPEED);

    useAnimationFrame((_, delta) => {
        if (!inView || reduceMotion) return;
        const target = active ? HOVER_SPEED : BASE_SPEED;
        // Move 6% of the way toward the target speed each frame.
        speed.current += (target - speed.current) * 0.06;
        rotate.set((rotate.get() + speed.current * delta) % 360);
    });

    return (
        <div ref={ref} className="flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
            <a
                href="#contact"
                onPointerEnter={() => setActive(true)}
                onPointerLeave={() => setActive(false)}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                aria-label="Book a call with Halden Studio"
                className="group relative flex h-48 w-48 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-950"
            >
                <motion.svg aria-hidden="true" viewBox="0 0 200 200" style={{rotate}} className="absolute inset-0 h-full w-full">
                    <defs>
                        <path id={pathId} d={`M 100,100 m -${RADIUS},0 a ${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a ${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`}/>
                    </defs>
                    {/* textLength stretches the label so it closes the circle exactly. */}
                    <text className="fill-gray-900 text-[13px] font-semibold uppercase dark:fill-white" letterSpacing="2">
                        <textPath href={`#${pathId}`} textLength={CIRCUMFERENCE - 2} lengthAdjust="spacing">
                            {label}
                        </textPath>
                    </text>
                </motion.svg>

                <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-focus-visible:scale-110 dark:bg-orange-400 dark:text-gray-950">
                    <LuArrowUpRight className="h-8 w-8 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true"/>
                </span>
            </a>

            <div className="max-w-xs text-center sm:text-left">
                <h3 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Brand and product design for small teams</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-slate-400">
                    Two open slots from March. Projects start at six weeks and include a full design system.
                </p>
            </div>
        </div>
    );
};

export default CircularText;

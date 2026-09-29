import {useId, useRef, useState} from "react";
import type {ComponentType} from "react";
import {motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion} from "framer-motion";
import {LuArrowUpRight} from "react-icons/lu";

const RADIUS = 78;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export interface CircularTextBadgeProps {
    /** Text set around the circle. It is stretched to close the ring, so end it with a separator. */
    label: string;
    href: string;
    /** Accessible name for the link, since the ring text is hidden from screen readers. */
    linkLabel: string;
    /** Icon in the center disc. */
    icon?: ComponentType<{className?: string}>;
    /** Color classes for the center disc. */
    accentClassName?: string;
    /** Degrees per millisecond at rest. The default makes one turn every 30 seconds. */
    speed?: number;
    /** Degrees per millisecond while hovered or focused. */
    hoverSpeed?: number;
    className?: string;
}

// Text set on a circular path that turns slowly and speeds up while hovered or focused.
// Speed changes are eased each frame, so the badge never jumps.
export const CircularTextBadge = ({
    label,
    href,
    linkLabel,
    icon: Icon = LuArrowUpRight,
    accentClassName = "bg-orange-500 text-white shadow-orange-500/30 dark:bg-orange-400 dark:text-gray-950",
    speed = 0.012,
    hoverSpeed = 0.07,
    className = "",
}: CircularTextBadgeProps) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const pathId = `circle-${useId().replace(/:/g, "")}`;
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const [active, setActive] = useState(false);

    const rotate = useMotionValue(0);
    const currentSpeed = useRef(speed);

    useAnimationFrame((_, delta) => {
        if (!inView || reduceMotion) return;
        const target = active ? hoverSpeed : speed;
        // Move 6% of the way toward the target speed each frame.
        currentSpeed.current += (target - currentSpeed.current) * 0.06;
        rotate.set((rotate.get() + currentSpeed.current * delta) % 360);
    });

    return (
        <a
            ref={ref}
            href={href}
            onPointerEnter={() => setActive(true)}
            onPointerLeave={() => setActive(false)}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            aria-label={linkLabel}
            className={`group relative flex h-48 w-48 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-950 ${className}`}
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

            <span className={`relative flex h-24 w-24 items-center justify-center rounded-full shadow-lg transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-focus-visible:scale-110 ${accentClassName}`}>
                <span aria-hidden="true" className="flex transition-transform duration-500 group-hover:rotate-45">
                    <Icon className="h-8 w-8"/>
                </span>
            </span>
        </a>
    );
};

export interface CircularTextProps extends Omit<CircularTextBadgeProps, "className"> {
    /** Heading next to the badge. */
    title?: string;
    /** Supporting text under the heading. */
    description?: string;
    className?: string;
}

// The badge with a short heading and description beside it.
export const CircularText = ({title, description, className = "", ...badgeProps}: CircularTextProps) => (
    <div className={`flex flex-col items-center gap-8 sm:flex-row sm:gap-12 ${className}`}>
        <CircularTextBadge {...badgeProps}/>

        {(title || description) && (
            <div className="max-w-xs text-center sm:text-left">
                {title && <h3 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h3>}
                {description && <p className={`${title ? "mt-3 " : ""}text-sm leading-6 text-gray-600 dark:text-slate-400`}>{description}</p>}
            </div>
        )}
    </div>
);

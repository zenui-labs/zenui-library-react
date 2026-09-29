import {useEffect, useRef, useState} from "react";
import type {ElementType, ReactNode} from "react";
import {animate, motion, useInView} from "framer-motion";
import {cn} from "@utils/Style.ts";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Fades and lifts children into place the first time they scroll into view. */
interface RevealProps {
    children: ReactNode;
    delay?: number;
    y?: number;
    className?: string;
    as?: "div" | "p" | "h2" | "li" | "section";
}

export const Reveal = ({children, delay = 0, y = 18, className, as = "div"}: RevealProps) => {
    const Component = motion[as];
    return (
        <Component
            className={className}
            initial={{opacity: 0, y, filter: "blur(6px)"}}
            whileInView={{opacity: 1, y: 0, filter: "blur(0px)"}}
            viewport={{once: true, margin: "0px 0px -12% 0px"}}
            transition={{duration: 0.8, delay, ease: EASE}}
        >
            {children}
        </Component>
    );
};

/**
 * Full-width band with hairlines at the top and on both sides of the content column.
 * Stacked bands read as one continuous blueprint down the page.
 */
export const Band = ({children, className, innerClassName, id}: {children: ReactNode; className?: string; innerClassName?: string; id?: string}) => (
    <section id={id} className={cn("border-t border-hairline", className)}>
        <div className={cn("mx-auto w-full max-w-[1240px] border-hairline 1260px:border-x", innerClassName)}>
            {children}
        </div>
    </section>
);

/** Section heading: eyebrow label, title, optional supporting line and action. */
interface SectionIntroProps {
    label: string;
    title: ReactNode;
    description?: ReactNode;
    action?: ReactNode;
    align?: "left" | "center";
    className?: string;
}

export const SectionIntro = ({label, title, description, action, align = "left", className}: SectionIntroProps) => (
    <div className={cn("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
        <Reveal as="p" className="eyebrow">
            {label}
        </Reveal>
        <Reveal as="h2" delay={0.05}
                className="max-w-[18ch] text-balance text-[2.1rem] font-semibold leading-[1.05] tracking-display text-ink 640px:text-[2.75rem] 1024px:text-[3.25rem]">
            {title}
        </Reveal>
        {description && (
            <Reveal as="p" delay={0.1} className="max-w-[52ch] text-pretty text-[1rem] leading-relaxed text-ink-muted 640px:text-[1.075rem]">
                {description}
            </Reveal>
        )}
        {action && <Reveal delay={0.15}>{action}</Reveal>}
    </div>
);

/** Counts up to `value` once visible. Non-numeric suffixes (k, +) are kept. */
export const Counter = ({value, suffix = "", decimals = 0, className}: {value: number; suffix?: string; decimals?: number; className?: string}) => {
    const ref = useRef(null);
    const inView = useInView(ref, {once: true, margin: "0px 0px -10% 0px"});
    const [display, setDisplay] = useState<number>(0);

    useEffect(() => {
        if (!inView) return;
        const controls = animate<number>(0, value, {duration: 1.6, ease: EASE, onUpdate: (latest: number) => setDisplay(latest)});
        return () => controls.stop();
    }, [inView, value]);

    return (
        <span ref={ref} className={cn("tabular-nums", className)}>
            {display.toFixed(decimals)}{suffix}
        </span>
    );
};

/** Card with a soft light that follows the pointer along its border. */
interface SpotlightCardProps {
    children: ReactNode;
    className?: string;
    as?: ElementType;
    [key: string]: unknown;
}

export const SpotlightCard = ({children, className, as: Component = "div", ...props}: SpotlightCardProps) => {
    const ref = useRef(null);

    const onMove = (event) => {
        const rect = ref.current.getBoundingClientRect();
        ref.current.style.setProperty("--x", `${event.clientX - rect.left}px`);
        ref.current.style.setProperty("--y", `${event.clientY - rect.top}px`);
    };

    return (
        <Component
            ref={ref}
            onPointerMove={onMove}
            className={cn(
                "group/spot relative isolate overflow-hidden rounded-shell border border-hairline bg-surface",
                "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
                "before:bg-[radial-gradient(420px_circle_at_var(--x)_var(--y),rgb(var(--accent)/0.10),transparent_60%)]",
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
};

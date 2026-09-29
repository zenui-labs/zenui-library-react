import {useEffect, useRef, useState} from "react";

export interface MarqueeLink {
    title: string;
    url: string;
}

// The keyframes ship with the component, so no global CSS is needed.
const keyframes =
    "@keyframes zenui-marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }" +
    "@keyframes zenui-marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }";

const pillClasses =
    "block py-2 px-6 dark:bg-[#0FABCA]/90 bg-[#0FABCA] capitalize border dark:border-[#0FABCA]/90 border-[#0FABCA] text-white rounded font-medium whitespace-nowrap";

// Measures one copy of the items so the loop moves at the same speed whatever the number of items.
const useLoopDuration = (speed: number) => {
    const ref = useRef<HTMLUListElement>(null);
    const [duration, setDuration] = useState<number | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const update = () => setDuration(element.offsetWidth > 0 ? element.offsetWidth / speed : null);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(element);
        return () => observer.disconnect();
    }, [speed]);

    return [ref, duration] as const;
};

export interface MarqueeRowProps {
    /** Links to show. Pass enough of them to fill the row at least once. */
    items: MarqueeLink[];
    direction?: "left" | "right";
    /** Scroll speed in pixels per second. */
    speed?: number;
    pauseOnHover?: boolean;
    className?: string;
}

/** One row of links that scrolls sideways in a continuous loop. */
export const MarqueeRow = ({items, direction = "left", speed = 48, pauseOnHover = true, className = ""}: MarqueeRowProps) => {
    const [copyRef, duration] = useLoopDuration(speed);

    return (
        <div
            className={`group w-full min-w-0 relative overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] ${className}`}
        >
            <style>{keyframes}</style>
            {/* Two copies of the items side by side. Moving by half the track brings the second copy exactly where the first started. */}
            <div
                className={`flex w-max motion-reduce:[animation-play-state:paused] ${
                    pauseOnHover ? "group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]" : ""
                }`}
                style={
                    duration
                        ? {
                              animationName: `zenui-marquee-${direction}`,
                              animationDuration: `${duration}s`,
                              animationTimingFunction: "linear",
                              animationIterationCount: "infinite",
                          }
                        : undefined
                }
            >
                {[0, 1].map((copy) => (
                    <ul
                        key={copy}
                        ref={copy === 0 ? copyRef : undefined}
                        aria-hidden={copy === 1 ? true : undefined}
                        className="flex shrink-0 items-center gap-5 pr-5"
                    >
                        {items.map((item, index) => (
                            <li key={`${item.url}-${index}`}>
                                <a href={item.url} tabIndex={copy === 1 ? -1 : undefined} className={pillClasses}>
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    );
};

export interface HorizontalMarqueeProps {
    /** Links to show in both rows. */
    items: MarqueeLink[];
    /** Scroll speed in pixels per second. */
    speed?: number;
    pauseOnHover?: boolean;
    className?: string;
}

/** Two rows of links that scroll in opposite directions and pause on hover. */
export const HorizontalMarquee = ({items, speed, pauseOnHover, className = ""}: HorizontalMarqueeProps) => (
    <div className={`flex w-full min-w-0 flex-col gap-5 ${className}`}>
        <MarqueeRow items={items} direction="left" speed={speed} pauseOnHover={pauseOnHover}/>
        <MarqueeRow items={items} direction="right" speed={speed} pauseOnHover={pauseOnHover}/>
    </div>
);

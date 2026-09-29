import {useEffect, useRef, useState} from "react";

export interface MarqueeLink {
    title: string;
    url: string;
}

// The keyframes ship with the component, so no global CSS is needed.
const keyframes =
    "@keyframes zenui-marquee-up { from { transform: translateY(0); } to { transform: translateY(-50%); } }" +
    "@keyframes zenui-marquee-down { from { transform: translateY(-50%); } to { transform: translateY(0); } }";

const pillClasses =
    "block py-2 px-4 sm:px-6 w-32 sm:w-48 text-center dark:bg-[#0FABCA]/90 bg-[#0FABCA] capitalize border dark:border-[#0FABCA]/90 border-[#0FABCA] text-white rounded font-medium";

// Measures one copy of the items so the loop moves at the same speed whatever the number of items.
const useLoopDuration = (speed: number) => {
    const ref = useRef<HTMLUListElement>(null);
    const [duration, setDuration] = useState<number | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const update = () => setDuration(element.offsetHeight > 0 ? element.offsetHeight / speed : null);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(element);
        return () => observer.disconnect();
    }, [speed]);

    return [ref, duration] as const;
};

export interface MarqueeColumnProps {
    /** Links to show. Pass enough of them to fill the column at least once. */
    items: MarqueeLink[];
    direction?: "up" | "down";
    /** Scroll speed in pixels per second. */
    speed?: number;
    pauseOnHover?: boolean;
    className?: string;
}

/** One column of links that scrolls up or down in a continuous loop. */
export const MarqueeColumn = ({items, direction = "up", speed = 48, pauseOnHover = true, className = ""}: MarqueeColumnProps) => {
    const [copyRef, duration] = useLoopDuration(speed);

    return (
        <div
            className={`group h-80 w-full relative overflow-hidden [mask-image:_linear-gradient(to_bottom,transparent_0,_black_60px,_black_calc(100%-60px),transparent_100%)] ${className}`}
        >
            <style>{keyframes}</style>
            {/* Two copies of the items stacked. Moving by half the track brings the second copy exactly where the first started. */}
            <div
                className={`flex flex-col motion-reduce:[animation-play-state:paused] ${
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
                        className="flex flex-col items-center gap-5 pb-5"
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

export interface VerticalMarqueeProps {
    /** Links to show in both columns. */
    items: MarqueeLink[];
    /** Scroll speed in pixels per second. */
    speed?: number;
    pauseOnHover?: boolean;
    className?: string;
}

/** Two columns of links that scroll in opposite directions and pause on hover. */
export const VerticalMarquee = ({items, speed, pauseOnHover, className = ""}: VerticalMarqueeProps) => (
    <div className={`flex gap-5 ${className}`}>
        <MarqueeColumn items={items} direction="up" speed={speed} pauseOnHover={pauseOnHover}/>
        <MarqueeColumn items={items} direction="down" speed={speed} pauseOnHover={pauseOnHover}/>
    </div>
);

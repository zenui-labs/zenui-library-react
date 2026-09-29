import {useEffect, useId, useState} from "react";
import type {PointerEvent, ReactNode} from "react";
import {motion, useMotionValue, useReducedMotion, useSpring} from "framer-motion";
import type {MotionValue} from "framer-motion";

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

/** One circle of the blob. */
export interface BlobCircle {
    /** Diameter in px. */
    size: number;
    /** Spring stiffness. Lower values trail further behind the pointer. */
    stiffness: number;
}

interface BlobProps extends BlobCircle {
    x: MotionValue<number>;
    y: MotionValue<number>;
    growScale: number;
    grow: boolean;
    visible: boolean;
    still: boolean;
}

// One circle of the blob. Softer springs trail further behind, which stretches the blob as it moves.
const Blob = ({x, y, size, stiffness, growScale, grow, visible, still}: BlobProps) => {
    const springX = useSpring(x, {stiffness, damping: 18, mass: 0.6});
    const springY = useSpring(y, {stiffness, damping: 18, mass: 0.6});

    // When the pointer enters, start at the pointer instead of flying in from the corner.
    useEffect(() => {
        if (!visible) return;
        springX.jump(x.get());
        springY.jump(y.get());
    }, [visible, springX, springY, x, y]);

    return (
        <motion.div style={{x: still ? x : springX, y: still ? y : springY}} className="absolute left-0 top-0">
            <motion.div
                style={{width: size, height: size, x: "-50%", y: "-50%"}}
                animate={{scale: visible ? (grow ? growScale : 1) : 0}}
                transition={{type: "spring", stiffness: 260, damping: 20}}
                className="rounded-full bg-white"
            />
        </motion.div>
    );
};

const defaultCircles: BlobCircle[] = [
    {size: 84, stiffness: 420},
    {size: 60, stiffness: 180},
    {size: 40, stiffness: 90},
];

export interface BlobCursorProps {
    /** Content of the area. Add `data-blob-grow` to an element to make the blob grow over it. */
    children: ReactNode;
    /** Circles from the leading one to the last. With reduced motion only the first is drawn. */
    circles?: BlobCircle[];
    /** How much the blob scales over a `data-blob-grow` element. */
    growScale?: number;
    className?: string;
}

// A gooey blob made of trailing circles. An SVG filter blurs them together and sharpens the edge
// again, and mix-blend-difference inverts whatever is underneath, so the text flips color inside it.
export const BlobCursor = ({children, circles = defaultCircles, growScale = 2.2, className = ""}: BlobCursorProps) => {
    const fine = useFinePointer();
    const reduceMotion = useReducedMotion() ?? false;
    const filterId = `goo-${useId().replace(/:/g, "")}`;
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [visible, setVisible] = useState(false);
    const [grow, setGrow] = useState(false);

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
        if (!visible) setVisible(true);
        const overGrowTarget = event.target instanceof Element && event.target.closest("[data-blob-grow]") !== null;
        if (overGrowTarget !== grow) setGrow(overGrowTarget);
    };

    // With reduced motion only the leading circle is drawn and it follows the pointer exactly.
    const shown = reduceMotion ? circles.slice(0, 1) : circles;

    return (
        <div
            onPointerMove={fine ? handlePointerMove : undefined}
            onPointerLeave={() => setVisible(false)}
            className={`relative isolate flex min-h-[380px] w-full max-w-3xl flex-col justify-center overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 py-12 sm:px-12 dark:border-slate-800 dark:bg-slate-950 ${fine ? "cursor-none [&_*]:cursor-none" : ""} ${className}`}
        >
            {children}

            {fine && (
                <>
                    <svg aria-hidden="true" className="absolute h-0 w-0">
                        <defs>
                            <filter id={filterId}>
                                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="goo"/>
                                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                            </filter>
                        </defs>
                    </svg>
                    <div aria-hidden="true" style={{filter: `url(#${filterId})`}} className="pointer-events-none absolute inset-0 mix-blend-difference">
                        {shown.map((circle, index) => (
                            <Blob
                                key={`${index}-${circle.size}`}
                                x={x}
                                y={y}
                                size={circle.size}
                                stiffness={circle.stiffness}
                                growScale={growScale}
                                grow={grow}
                                visible={visible}
                                still={reduceMotion}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

import {useEffect, useId, useState} from "react";
import type {PointerEvent} from "react";
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

interface BlobProps {
    x: MotionValue<number>;
    y: MotionValue<number>;
    size: number;
    stiffness: number;
    grow: boolean;
    visible: boolean;
    still: boolean;
}

// One circle of the blob. Softer springs trail further behind, which stretches the blob as it moves.
const Blob = ({x, y, size, stiffness, grow, visible, still}: BlobProps) => {
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
                animate={{scale: visible ? (grow ? 2.2 : 1) : 0}}
                transition={{type: "spring", stiffness: 260, damping: 20}}
                className="rounded-full bg-white"
            />
        </motion.div>
    );
};

const blobs = [
    {size: 84, stiffness: 420},
    {size: 60, stiffness: 180},
    {size: 40, stiffness: 90},
];

// A gooey blob made of three trailing circles. An SVG filter blurs them together and sharpens the
// edge again, and mix-blend-difference inverts whatever is underneath, so the text flips color inside it.
const BlobCursor = () => {
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
        const overHeadline = event.target instanceof Element && event.target.closest("[data-blob-grow]") !== null;
        if (overHeadline !== grow) setGrow(overHeadline);
    };

    // With reduced motion only the leading circle is drawn and it follows the pointer exactly.
    const shown = reduceMotion ? blobs.slice(0, 1) : blobs;

    return (
        <div
            onPointerMove={fine ? handlePointerMove : undefined}
            onPointerLeave={() => setVisible(false)}
            className={`relative isolate flex min-h-[380px] w-full max-w-3xl flex-col justify-center overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 py-12 sm:px-12 dark:border-slate-800 dark:bg-slate-950 ${fine ? "cursor-none [&_*]:cursor-none" : ""}`}
        >
            <p className="text-sm font-medium text-gray-500 dark:text-slate-400">Motion studio, Lisbon</p>
            <h2 data-blob-grow="" className="mt-4 max-w-xl text-5xl font-bold leading-[0.95] tracking-tighter text-gray-900 sm:text-7xl dark:text-white">
                We make interfaces feel alive
            </h2>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-600 dark:text-slate-400">
                <span>Product motion</span>
                <span>Brand systems</span>
                <span>Prototyping</span>
            </div>

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
                        {shown.map((blob) => (
                            <Blob key={blob.size} x={x} y={y} size={blob.size} stiffness={blob.stiffness} grow={grow} visible={visible} still={reduceMotion}/>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default BlobCursor;

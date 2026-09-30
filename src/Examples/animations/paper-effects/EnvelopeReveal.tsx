import {useId, useState} from "react";
import type {ReactNode} from "react";
import {useAnimate, useReducedMotion} from "framer-motion";

export interface EnvelopeRevealProps {
    /** The card inside the envelope. It is hidden from screen readers until the envelope is open. */
    letter: ReactNode;
    /** Up to three letters pressed into the wax seal. */
    monogram?: string;
    /** Small print along the bottom flap, like a return address. */
    returnAddress?: string;
    openLabel?: string;
    closeLabel?: string;
    className?: string;
}

// A slightly lumpy circle, so the wax looks poured rather than drawn with a compass.
const WAX_EDGE = (() => {
    const points: string[] = [];
    const steps = 36;
    for (let i = 0; i < steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        const r = 28.5 + Math.sin(angle * 5 + 0.6) * 0.9 + Math.sin(angle * 11 + 2.1) * 0.55 + (i % 7 === 3 ? 1.3 : 0);
        points.push(`${(32 + Math.cos(angle) * r).toFixed(2)},${(32 + Math.sin(angle) * r).toFixed(2)}`);
    }
    return `M${points.join(" L")} Z`;
})();

// Where the wax splits, top to bottom.
const CRACK: [number, number][] = [[33.5, 2], [31.2, 11], [34.2, 19], [30.4, 27], [33.8, 35], [31, 43], [34, 52], [32.2, 62]];
const CRACK_PATH = `M${CRACK.map(([x, y]) => `${x},${y}`).join(" L")}`;
const LEFT_HALF = `0,0 ${CRACK.map(([x, y]) => `${x + 0.4},${y}`).join(" ")} 0,64`;
const RIGHT_HALF = `64,0 ${CRACK.map(([x, y]) => `${x - 0.4},${y}`).join(" ")} 64,64`;

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

const Wax = ({id, monogram, clip}: {id: string; monogram: string; clip: string}) => (
    <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
            <clipPath id={`${id}-clip`}>
                <polygon points={clip}/>
            </clipPath>
            <radialGradient id={`${id}-wax`} cx="0.38" cy="0.32" r="0.75">
                <stop offset="0" stopColor="#c0453a"/>
                <stop offset="0.45" stopColor="#962219"/>
                <stop offset="1" stopColor="#5e0f0a"/>
            </radialGradient>
        </defs>
        <g clipPath={`url(#${id}-clip)`}>
            <path d={WAX_EDGE} fill={`url(#${id}-wax)`}/>
            {/* Pressed ring: a dark groove with a lit lower lip. */}
            <circle cx="32" cy="32" r="19.5" fill="none" stroke="#4a0906" strokeOpacity="0.55" strokeWidth="1.6"/>
            <circle cx="32" cy="32.8" r="19.5" fill="none" stroke="#ffb3a3" strokeOpacity="0.18" strokeWidth="0.8"/>
            <text x="32" y="37.6" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fontSize="14" fill="#ffc9bb" fillOpacity="0.2">{monogram}</text>
            <text x="32" y="36.8" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fontSize="14" fill="#4a0906" fillOpacity="0.8">{monogram}</text>
            <ellipse cx="24" cy="20" rx="7" ry="3.2" fill="#fff" fillOpacity="0.14" transform="rotate(-30 24 20)"/>
        </g>
    </svg>
);

/**
 * A lined envelope that opens in three steps: the wax seal cracks and falls, the flap swings open in 3D,
 * and the card slides out and comes forward. Layers swap stacking order halfway through each move, which is
 * what lets the flap pass behind the card and the card step in front of the envelope.
 */
export const EnvelopeReveal = ({
    letter,
    monogram = "I·T",
    returnAddress,
    openLabel = "Open the envelope",
    closeLabel = "Put the card back",
    className = "",
}: EnvelopeRevealProps) => {
    const uid = useId().replace(/:/g, "");
    const reduceMotion = useReducedMotion();
    const [scope, animate] = useAnimate<HTMLDivElement>();
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);

    const setZ = (selector: string, z: number) => {
        const element = scope.current?.querySelector<HTMLElement>(selector);
        if (element) element.style.zIndex = String(z);
    };

    const openUp = async () => {
        if (reduceMotion) {
            setZ("[data-flap]", 5);
            await Promise.all([
                animate("[data-seal]", {opacity: 0}, {duration: 0.2}),
                animate("[data-flap-shadow]", {opacity: 0}, {duration: 0}),
                animate("[data-flap]", {rotateX: 180}, {duration: 0}),
            ]);
            setZ("[data-letter]", 50);
            await animate("[data-letter]", {y: "-40%", scale: 1.04, opacity: [0, 1]}, {duration: 0.3});
            return;
        }
        // The wax takes the strain first, then splits along the crack.
        await animate("[data-seal]", {x: [0, -1.4, 1.2, -0.7, 0], rotate: [0, -2, 1.5, 0]}, {duration: 0.26});
        await animate("[data-seal-crack]", {pathLength: [0, 1], opacity: [1, 1]}, {duration: 0.16, ease: "easeOut"});
        const flap = animate("[data-flap]", {rotateX: 180}, {duration: 0.75, ease: [0.45, 0, 0.2, 1], delay: 0.1});
        await Promise.all([
            animate("[data-seal-left]", {x: -18, y: 58, rotate: -42, opacity: [1, 1, 0]}, {duration: 0.7, ease: [0.5, 0, 0.9, 0.6]}),
            animate("[data-seal-right]", {x: 15, y: 64, rotate: 34, opacity: [1, 1, 0]}, {duration: 0.74, ease: [0.5, 0, 0.9, 0.6]}),
            animate("[data-seal-crack]", {opacity: 0}, {duration: 0.12}),
            animate("[data-flap-shadow]", {opacity: 0}, {duration: 0.2, delay: 0.1}),
            // Past 90 degrees the flap points up and must drop behind the card.
            wait(430).then(() => setZ("[data-flap]", 5)),
            flap,
        ]);
        await animate("[data-letter]", {y: "-106%"}, {duration: 0.8, ease: [0.35, 0, 0.12, 1]});
        setZ("[data-letter]", 50);
        await animate("[data-letter]", {
            y: "-40%",
            scale: 1.08,
            boxShadow: "0 24px 48px -16px rgba(40,28,14,0.45), 0 2px 6px rgba(40,28,14,0.12)",
        }, {type: "spring", stiffness: 150, damping: 19});
    };

    const close = async () => {
        if (reduceMotion) {
            await animate("[data-letter]", {opacity: 0}, {duration: 0.2});
            await animate("[data-letter]", {y: "0%", scale: 1, opacity: 1}, {duration: 0});
            setZ("[data-letter]", 10);
            await animate("[data-flap]", {rotateX: 0}, {duration: 0});
            setZ("[data-flap]", 30);
            await Promise.all([
                animate("[data-flap-shadow]", {opacity: 1}, {duration: 0}),
                animate("[data-seal-left], [data-seal-right]", {x: 0, y: 0, rotate: 0, opacity: 1}, {duration: 0}),
                animate("[data-seal]", {opacity: 1}, {duration: 0.2}),
            ]);
            return;
        }
        await animate("[data-letter]", {
            y: "-106%",
            scale: 1,
            boxShadow: "0 6px 14px -8px rgba(40,28,14,0.3), 0 1px 2px rgba(40,28,14,0.08)",
        }, {duration: 0.5, ease: [0.4, 0, 0.2, 1]});
        setZ("[data-letter]", 10);
        await animate("[data-letter]", {y: "0%"}, {duration: 0.6, ease: [0.5, 0, 0.5, 1]});
        await Promise.all([
            animate("[data-flap]", {rotateX: 0}, {duration: 0.65, ease: [0.5, 0, 0.3, 1]}),
            wait(330).then(() => setZ("[data-flap]", 30)),
            animate("[data-flap-shadow]", {opacity: 1}, {duration: 0.3, delay: 0.45}),
        ]);
        // A fresh seal is pressed on: the halves are reset while hidden, then the whole seal stamps down.
        await animate("[data-seal]", {opacity: 0}, {duration: 0});
        await animate("[data-seal-left], [data-seal-right]", {x: 0, y: 0, rotate: 0, opacity: 1}, {duration: 0});
        await animate("[data-seal]", {scale: [1.4, 0.94, 1], opacity: [0, 1, 1]}, {duration: 0.45, times: [0, 0.7, 1], ease: "easeOut"});
    };

    const toggle = async () => {
        if (busy) return;
        const next = !open;
        setBusy(true);
        setOpen(next);
        await (next ? openUp() : close());
        setBusy(false);
    };

    const faceStyle = {backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden"} as const;

    return (
        <div className={`flex w-full max-w-[360px] flex-col items-center ${className}`}>
            <div ref={scope} onClick={toggle} className="relative w-full cursor-pointer select-none px-2 pt-[74%]">
                <div className="relative aspect-[340/236] w-full" style={{perspective: 1100, perspectiveOrigin: "50% 0%"}}>
                    {/* Inside of the back panel, lined like the flap. */}
                    <div className="absolute inset-0 overflow-hidden rounded-[5px] bg-[#1f3b33] shadow-[0_18px_40px_-18px_rgba(40,28,14,0.55),0_2px_4px_rgba(40,28,14,0.12)] dark:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.8)]">
                        <div className="absolute inset-0 opacity-60 [background-image:repeating-linear-gradient(45deg,rgba(214,182,110,0.35)_0_1px,transparent_1px_9px),repeating-linear-gradient(-45deg,rgba(214,182,110,0.35)_0_1px,transparent_1px_9px)]"/>
                    </div>

                    <div
                        data-flap=""
                        className="absolute inset-x-0 top-0 h-[58%]"
                        style={{zIndex: 30, transformOrigin: "50% 0%", transformStyle: "preserve-3d"}}
                    >
                        <div
                            className="absolute inset-0 bg-gradient-to-b from-[#f3ebdd] to-[#e6d9c3] [clip-path:polygon(0_0,100%_0,52%_98%,50%_100%,48%_98%)] dark:from-[#ddd2bf] dark:to-[#cbbca3]"
                            style={faceStyle}
                        />
                        <div
                            className="absolute inset-0 bg-[#1f3b33] [clip-path:polygon(0_100%,100%_100%,52%_2%,50%_0,48%_2%)]"
                            style={{...faceStyle, transform: "rotateX(180deg)"}}
                        >
                            <div className="absolute inset-0 opacity-60 [background-image:repeating-linear-gradient(45deg,rgba(214,182,110,0.35)_0_1px,transparent_1px_9px),repeating-linear-gradient(-45deg,rgba(214,182,110,0.35)_0_1px,transparent_1px_9px)]"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"/>
                        </div>
                    </div>

                    <div
                        data-letter=""
                        aria-hidden={!open}
                        className="absolute inset-x-[4%] bottom-[3%] h-[92%] overflow-hidden rounded-[3px] bg-[#fcf9f3] text-[#2c2419]"
                        style={{zIndex: 10, boxShadow: "0 6px 14px -8px rgba(40,28,14,0.3), 0 1px 2px rgba(40,28,14,0.08)"}}
                    >
                        <div className="absolute inset-[7px] rounded-[2px] border border-[#b79b6a]/40"/>
                        <div className="relative h-full">{letter}</div>
                    </div>

                    {/* The pocket: two side flaps under a bottom flap. */}
                    <svg aria-hidden="true" viewBox="0 0 340 236" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" style={{zIndex: 20}}>
                        <defs>
                            <linearGradient id={`${uid}-bottom`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" className="[stop-color:#f4ede1] dark:[stop-color:#ddd3c2]"/>
                                <stop offset="1" className="[stop-color:#e9dfcd] dark:[stop-color:#cfc3ae]"/>
                            </linearGradient>
                            <filter id={`${uid}-lift`} x="-10%" y="-20%" width="120%" height="140%">
                                <feDropShadow dx="0" dy="-1" stdDeviation="1.6" floodColor="#4a3218" floodOpacity="0.2"/>
                            </filter>
                        </defs>
                        <path d="M0,4 Q0,0 4,0 L166,118 Q170,122 166,126 L4,236 Q0,236 0,232 Z" className="fill-[#e8ddca] dark:fill-[#d2c6b1]"/>
                        <path d="M340,4 Q340,0 336,0 L174,118 Q170,122 174,126 L336,236 Q340,236 340,232 Z" className="fill-[#e4d8c3] dark:fill-[#cdc0aa]"/>
                        <path d="M0,232 L162,110 Q170,104 178,110 L340,232 Q340,236 336,236 L4,236 Q0,236 0,232 Z" fill={`url(#${uid}-bottom)`} filter={`url(#${uid}-lift)`}/>
                    </svg>
                    {returnAddress && (
                        <p aria-hidden="true" className="absolute inset-x-0 bottom-[7%] text-center text-[8.5px] uppercase tracking-[0.22em] text-[#9a8462] dark:text-[#7d6a4d]" style={{zIndex: 21}}>
                            {returnAddress}
                        </p>
                    )}

                    {/* Soft shadow the closed flap casts on the pocket. */}
                    <svg data-flap-shadow="" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[60%] w-full overflow-visible" style={{zIndex: 25}}>
                        <defs>
                            <filter id={`${uid}-blur`}>
                                <feGaussianBlur stdDeviation="1.4"/>
                            </filter>
                        </defs>
                        <polygon points="0,1 100,1 50,99" fill="#3b2812" fillOpacity="0.22" filter={`url(#${uid}-blur)`}/>
                    </svg>

                    <div data-seal="" aria-hidden="true" className="absolute left-[calc(50%-30px)] top-[calc(58%-38px)] h-[60px] w-[60px]" style={{zIndex: 40}}>
                        <div className="absolute inset-0 rounded-full shadow-[0_3px_5px_rgba(60,10,6,0.35)]"/>
                        <div data-seal-left="" className="absolute inset-0">
                            <Wax id={`${uid}-l`} monogram={monogram} clip={LEFT_HALF}/>
                        </div>
                        <div data-seal-right="" className="absolute inset-0">
                            <Wax id={`${uid}-r`} monogram={monogram} clip={RIGHT_HALF}/>
                        </div>
                        <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full overflow-visible">
                            <path data-seal-crack="" d={CRACK_PATH} fill="none" stroke="#2a0503" strokeWidth="1.1" strokeLinejoin="round" opacity="0"/>
                        </svg>
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={toggle}
                disabled={busy}
                aria-expanded={open}
                className="mt-7 inline-flex h-9 items-center rounded-full border border-stone-300 px-4 text-xs font-medium tracking-wide text-stone-700 transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#962219] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800 dark:focus-visible:ring-offset-stone-950"
            >
                {open ? closeLabel : openLabel}
            </button>
        </div>
    );
};

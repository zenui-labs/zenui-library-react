import {useEffect, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform, useVelocity} from "framer-motion";

export interface PolaroidDevelopProps {
    /** Photo URL. A landscape or square image works best; it is cropped to a square. */
    src: string;
    alt: string;
    /** Written on the bottom border once the photo has developed. */
    caption: string;
    /** Seconds the photo takes to develop when left alone. */
    developSeconds?: number;
    className?: string;
}

type Stage = "ejecting" | "developing" | "done";

const smooth = (from: number, to: number, value: number) => {
    const t = Math.min(1, Math.max(0, (value - from) / (to - from)));
    return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

// Instant film starts as a murky blue-brown, brightens first, and only gets its color and deep blacks at the end.
const developFilter = (d: number) => [
    `sepia(${mix(0.8, 0, smooth(0.1, 1, d)).toFixed(3)})`,
    `hue-rotate(${mix(190, 0, smooth(0, 0.5, d)).toFixed(1)}deg)`,
    `saturate(${mix(0.15, 1.05, smooth(0.25, 1, d)).toFixed(3)})`,
    `contrast(${mix(0.55, 1.05, smooth(0.1, 1, d)).toFixed(3)})`,
    `brightness(${mix(0.6, 1, smooth(0, 0.8, d)).toFixed(3)})`,
].join(" ");

const HANDWRITING = "\"Bradley Hand\", \"Segoe Print\", \"Noteworthy\", \"Chalkboard SE\", cursive";

interface InstantPhotoProps {
    src: string;
    alt: string;
    caption: string;
    developSeconds: number;
    reduceMotion: boolean;
    onEjected: () => void;
}

const InstantPhoto = ({src, alt, caption, developSeconds, reduceMotion, onEjected}: InstantPhotoProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const inView = useInView(ref);
    const [stage, setStage] = useState<Stage>(reduceMotion ? "developing" : "ejecting");
    const [loaded, setLoaded] = useState(false);
    const [shakes, setShakes] = useState(0);
    const develop = useMotionValue(0);
    const shakeX = useMotionValue(0);
    const restTilt = useMotionValue(0);
    // The photo swings with how fast it is moving, like a card held by one corner.
    const swing = useSpring(useTransform(useVelocity(shakeX), [-1600, 1600], [-9, 9]), {stiffness: 300, damping: 18});
    const rotate = useTransform([restTilt, swing], ([tilt, s]: number[]) => tilt + s);
    const filter = useTransform(develop, developFilter);
    const veil = useTransform(develop, (d) => 1 - smooth(0.04, 0.62, d));
    // The glare slides across the gloss as the photo moves.
    const glare = useTransform(shakeX, [-70, 70], ["20% 0%", "80% 0%"]);
    const readout = useTransform(develop, (d) => `${Math.round(d * 100)}%`);
    const reversal = useRef({x: 0, t: 0, direction: 0, lastX: 0, active: false, startX: 0});

    useEffect(() => {
        if (imageRef.current?.complete) setLoaded(true);
    }, []);

    useEffect(() => {
        if (stage !== "developing" || !loaded || !inView) return;
        if (reduceMotion) {
            const controls = animate(develop, 1, {duration: 1.2, ease: "easeOut", onComplete: () => setStage("done")});
            return () => controls.stop();
        }
        let frame = 0;
        let last = performance.now();
        const tick = (now: number) => {
            const seconds = Math.min(0.05, (now - last) / 1000);
            last = now;
            const next = Math.min(1, develop.get() + seconds / developSeconds);
            develop.set(next);
            if (next >= 1) {
                setStage("done");
                return;
            }
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [stage, loaded, inView, reduceMotion, develop, developSeconds]);

    const finishEject = () => {
        setStage("developing");
        onEjected();
        animate(restTilt, -2.5, {type: "spring", stiffness: 180, damping: 14});
    };

    const registerShake = () => {
        setShakes((count) => count + 1);
        if (develop.get() < 1) develop.set(Math.min(1, develop.get() + 0.03));
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (stage === "ejecting") return;
        event.currentTarget.setPointerCapture(event.pointerId);
        shakeX.stop();
        reversal.current = {x: event.clientX, t: event.timeStamp, direction: 0, lastX: event.clientX, active: true, startX: event.clientX - shakeX.get() / 0.8};
    };

    // A shake is a quick change of direction after enough travel, the way a wrist flicks back and forth.
    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const state = reversal.current;
        if (!state.active) return;
        shakeX.set(Math.max(-70, Math.min(70, (event.clientX - state.startX) * 0.8)));
        const dx = event.clientX - state.lastX;
        const direction = Math.sign(dx);
        if (direction !== 0 && direction !== state.direction) {
            if (state.direction !== 0 && Math.abs(state.lastX - state.x) > 16 && event.timeStamp - state.t < 450) registerShake();
            state.direction = direction;
            state.x = state.lastX;
            state.t = event.timeStamp;
        }
        state.lastX = event.clientX;
    };

    const handlePointerUp = () => {
        if (!reversal.current.active) return;
        reversal.current.active = false;
        animate(shakeX, 0, {type: "spring", stiffness: 260, damping: 16});
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (stage === "ejecting" || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
        event.preventDefault();
        const side = event.key === "ArrowLeft" ? -1 : 1;
        animate(shakeX, reduceMotion ? 0 : [shakeX.get(), side * 34, 0], {duration: 0.28, ease: "easeInOut"});
        registerShake();
    };

    return (
        <motion.div
            ref={ref}
            className="absolute inset-x-0 top-0 flex flex-col items-center"
            exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: 40, rotate: 7, transition: {duration: 0.45, ease: [0.5, 0, 0.9, 0.5]}}}
        >
            {/* Clips the photo to the slot while it is ejecting. */}
            <div className={`w-[212px] ${stage === "ejecting" ? "overflow-hidden" : ""}`} style={{height: 250}}>
                <motion.div
                    initial={reduceMotion ? false : {y: "-100%"}}
                    animate={{y: "0%"}}
                    transition={{duration: 2.1, ease: [0.25, 0.1, 0.6, 1]}}
                    onAnimationComplete={() => stage === "ejecting" && finishEject()}
                >
                    <motion.div
                        tabIndex={0}
                        role="img"
                        aria-label={`${alt}. Instant photo, ${stage === "done" ? "developed" : "still developing"}. Arrow keys shake it.`}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                        onKeyDown={handleKeyDown}
                        style={{x: shakeX, rotate, originY: 0}}
                        className="relative mx-auto w-[212px] cursor-grab touch-none select-none rounded-[3px] bg-[#f5f3ed] px-3 pb-[50px] pt-3 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_14px_28px_-12px_rgba(20,16,10,0.45),0_2px_4px_rgba(20,16,10,0.12)] outline-none focus-visible:ring-2 focus-visible:ring-[#e2552c] focus-visible:ring-offset-4 active:cursor-grabbing dark:bg-[#ebe8e0] dark:shadow-[0_14px_28px_-10px_rgba(0,0,0,0.85)] dark:focus-visible:ring-offset-stone-950"
                    >
                        <div className="relative aspect-square overflow-hidden bg-[#2a3038]">
                            <motion.img
                                ref={imageRef}
                                src={src}
                                alt=""
                                draggable={false}
                                onLoad={() => setLoaded(true)}
                                className="pointer-events-none h-full w-full object-cover"
                                style={{filter}}
                            />
                            <motion.div className="absolute inset-0 bg-[linear-gradient(160deg,#26303a,#3b3029)]" style={{opacity: veil}}/>
                            <motion.div
                                className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.16)_48%,transparent_60%)] bg-[length:250%_100%]"
                                style={{backgroundPosition: glare}}
                            />
                            <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.18),inset_0_2px_6px_rgba(0,0,0,0.25)]"/>
                        </div>
                        <motion.p
                            aria-hidden="true"
                            className="absolute inset-x-4 bottom-[13px] -rotate-[1.5deg] truncate text-[19px] leading-none text-[#28325a]"
                            style={{fontFamily: HANDWRITING}}
                            initial={{clipPath: "inset(0 100% 0 0)"}}
                            animate={{clipPath: stage === "done" ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)"}}
                            transition={{duration: reduceMotion ? 0 : 1.6, ease: [0.4, 0, 0.6, 1]}}
                        >
                            {caption}
                        </motion.p>
                    </motion.div>
                </motion.div>
            </div>

            <div className="mt-4 flex h-10 w-full flex-col items-center text-center text-[11px] text-stone-500 dark:text-stone-400">
                {stage === "done" ? (
                    <p aria-live="polite">Developed. {caption}</p>
                ) : (
                    <p>
                        {stage === "ejecting" ? "Ejecting" : "Developing"}
                        {stage === "developing" && <> · <motion.span className="font-mono tabular-nums">{readout}</motion.span></>}
                        {stage === "developing" && " · drag it side to side to shake"}
                    </p>
                )}
                <AnimatePresence>
                    {shakes >= 3 && stage !== "done" && (
                        <motion.p
                            initial={{opacity: 0, y: 4}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0}}
                            className="mt-1 italic text-stone-400 dark:text-stone-500"
                        >
                            Shaking doesn't help real instant film. Here it does, a little.
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

/**
 * An instant camera that ejects a photo from its slot when you press the shutter. The photo develops over
 * several seconds from a murky blue-brown through animated CSS filters and a fading chemical veil, and shaking
 * it by dragging quickly side to side (or with the arrow keys) nudges it along.
 */
export const PolaroidDevelop = ({src, alt, caption, developSeconds = 12, className = ""}: PolaroidDevelopProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const [shot, setShot] = useState(0);
    const [ejecting, setEjecting] = useState(false);

    const takePhoto = () => {
        if (ejecting) return;
        setShot((count) => count + 1);
        setEjecting(!reduceMotion);
    };

    return (
        <div className={`relative flex w-full max-w-[320px] flex-col items-center ${className}`}>
            <motion.div
                className="relative z-20 h-[116px] w-[276px] rounded-[26px] bg-gradient-to-b from-[#3b3c41] via-[#2a2b2f] to-[#1b1c1f] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-2px_0_rgba(0,0,0,0.4),0_18px_30px_-16px_rgba(0,0,0,0.6)] dark:ring-1 dark:ring-white/10"
                animate={ejecting ? {x: [0, -0.7, 0.6, -0.5, 0.4, 0]} : {x: 0}}
                transition={ejecting ? {duration: 0.16, repeat: Infinity} : {duration: 0.1}}
            >
                {/* Ribbed grip. */}
                <div className="absolute bottom-7 left-4 top-4 w-11 rounded-[10px] bg-[repeating-linear-gradient(90deg,#232427_0_2px,#303136_2px_4px)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"/>
                {/* Viewfinder. */}
                <div className="absolute right-5 top-4 h-6 w-9 rounded-md bg-[radial-gradient(circle_at_30%_30%,#4b5563,#0b0d10_70%)] shadow-[inset_0_0_0_2px_#18191c,0_1px_0_rgba(255,255,255,0.08)]"/>
                {/* Flash window, lit briefly on each shot. */}
                <div className="absolute right-5 top-12 h-5 w-9 overflow-hidden rounded bg-[repeating-linear-gradient(90deg,#c9ccd1_0_1px,#9da1a8_1px_3px)] opacity-80">
                    <AnimatePresence>
                        {shot > 0 && !reduceMotion && (
                            <motion.div
                                key={shot}
                                className="absolute inset-0 bg-white"
                                initial={{opacity: 1}}
                                animate={{opacity: 0}}
                                transition={{duration: 0.5, ease: "easeOut"}}
                            />
                        )}
                    </AnimatePresence>
                </div>
                {/* Lens. */}
                <div className="absolute left-1/2 top-[9px] h-[82px] w-[82px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#45464c] to-[#141517] p-[6px] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    <div className="h-full w-full rounded-full bg-[#0d0e10] p-[7px] shadow-[inset_0_2px_3px_rgba(0,0,0,0.8)]">
                        <div className="relative h-full w-full rounded-full bg-[radial-gradient(circle_at_50%_55%,#1b2433_0%,#0a0c11_55%,#050608_100%)] shadow-[inset_0_0_0_1px_rgba(120,140,170,0.18)]">
                            <div className="absolute left-[24%] top-[20%] h-[22%] w-[30%] -rotate-[25deg] rounded-full bg-white/25 blur-[1.5px]"/>
                            <div className="absolute bottom-[24%] right-[26%] h-[8%] w-[10%] rounded-full bg-[#6b8cc4]/40 blur-[1px]"/>
                        </div>
                    </div>
                </div>
                <p className="absolute bottom-[26px] right-5 font-mono text-[7.5px] tracking-[0.2em] text-white/30">116 mm f/14</p>
                <button
                    type="button"
                    onClick={takePhoto}
                    disabled={ejecting}
                    aria-label="Take a photo"
                    className="absolute bottom-[22px] left-[70px] h-7 w-7 rounded-full bg-gradient-to-b from-[#f06a3f] to-[#c9431d] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_0_#7a2710,0_3px_6px_rgba(0,0,0,0.5)] transition-transform active:translate-y-[2px] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_0_0_#7a2710,0_1px_2px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f06a3f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2a2b2f] disabled:cursor-wait"
                />
                {/* Film slot. */}
                <div className="absolute bottom-3 left-1/2 h-[5px] w-[226px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_1px_2px_rgba(0,0,0,1),0_1px_0_rgba(255,255,255,0.1)]"/>
            </motion.div>

            <div className="relative z-30 -mt-[14px] h-[310px] w-full">
                <AnimatePresence>
                    {shot > 0 && (
                        <InstantPhoto
                            key={shot}
                            src={src}
                            alt={alt}
                            caption={caption}
                            developSeconds={developSeconds}
                            reduceMotion={reduceMotion}
                            onEjected={() => setEjecting(false)}
                        />
                    )}
                </AnimatePresence>
                {shot === 0 && (
                    <p className="pt-10 text-center text-xs text-stone-500 dark:text-stone-400">
                        Press the orange shutter to take a photo.
                    </p>
                )}
            </div>
        </div>
    );
};

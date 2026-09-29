import {useRef} from "react";
import {motion, useReducedMotion, useScroll, useSpring, useTransform} from "framer-motion";
import {LuMapPin} from "react-icons/lu";

const PANEL_HEIGHT = 440;
const image = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80";

// While the tall section scrolls through the panel, a small photo grows until it fills the frame
// and the two halves of the headline move apart to make room.
const ZoomOnScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLElement>(null);
    const reduceMotion = useReducedMotion();

    const {scrollYProgress} = useScroll({container: containerRef, target: trackRef, offset: ["start start", "end end"]});
    const progress = useSpring(scrollYProgress, {stiffness: 260, damping: 40, restDelta: 0.001});

    const scale = useTransform(progress, [0, 0.7], [0.42, 1]);
    const radius = useTransform(progress, [0, 0.7], [40, 0]);
    const imageScale = useTransform(progress, [0, 0.7], [1.35, 1]);
    const topY = useTransform(progress, [0, 0.5], ["0%", "-160%"]);
    const bottomY = useTransform(progress, [0, 0.5], ["0%", "160%"]);
    const wordsOpacity = useTransform(progress, [0.2, 0.45], [1, 0]);
    const captionOpacity = useTransform(progress, [0.7, 0.85], [0, 1]);
    const captionY = useTransform(progress, [0.7, 0.85], [16, 0]);

    return (
        <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div
                ref={containerRef}
                tabIndex={0}
                aria-label="Field jacket story, scroll to continue"
                style={{height: PANEL_HEIGHT}}
                className="relative overflow-y-auto overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500"
            >
                <div className="flex h-[180px] flex-col justify-end px-6 pb-6 sm:px-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">Field jacket, third edition</p>
                    <p className="mt-2 max-w-md text-sm leading-6 text-gray-600 dark:text-slate-400">
                        Tested for 14 months on the Dolomites high routes. Keep scrolling.
                    </p>
                </div>

                <section ref={trackRef} className="relative h-[1100px]">
                    <div style={{height: PANEL_HEIGHT}} className="sticky top-0 flex items-center justify-center overflow-hidden">
                        <motion.div
                            style={reduceMotion ? {borderRadius: 0} : {scale, borderRadius: radius}}
                            className="absolute inset-0 overflow-hidden bg-gradient-to-br from-slate-400 to-slate-700"
                        >
                            <motion.img
                                src={image}
                                alt="Morning light over a rocky mountain range above the clouds"
                                style={reduceMotion ? undefined : {scale: imageScale}}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
                            <motion.div
                                style={reduceMotion ? undefined : {opacity: captionOpacity, y: captionY}}
                                className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5 text-white sm:p-8"
                            >
                                <div>
                                    <p className="text-2xl font-semibold tracking-tight sm:text-3xl">Built for the outdoors</p>
                                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/80">
                                        <LuMapPin className="h-4 w-4" aria-hidden="true"/>
                                        Seceda ridge, 2,519 m
                                    </p>
                                </div>
                                <a
                                    href="#shop"
                                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                                >
                                    Shop the jacket
                                </a>
                            </motion.div>
                        </motion.div>

                        {!reduceMotion && (
                            <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-6 text-center text-4xl font-bold tracking-tight text-gray-900 sm:py-4 sm:text-6xl dark:text-white">
                                <motion.span style={{y: topY, opacity: wordsOpacity}}>Built for</motion.span>
                                <motion.span style={{y: bottomY, opacity: wordsOpacity}}>the outdoors</motion.span>
                            </div>
                        )}
                    </div>
                </section>

                <div className="px-6 py-10 sm:px-10">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Three layers, 780 grams</h3>
                    <p className="mt-2 max-w-lg text-sm leading-6 text-gray-600 dark:text-slate-400">
                        A recycled shell, a grid fleece that dries in under an hour and a hood that fits over a helmet. Every seam is taped by hand.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ZoomOnScroll;

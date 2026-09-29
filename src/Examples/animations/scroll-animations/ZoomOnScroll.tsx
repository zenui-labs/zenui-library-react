import {useRef} from "react";
import {motion, useReducedMotion, useScroll, useSpring, useTransform} from "framer-motion";
import {LuMapPin} from "react-icons/lu";

const PANEL_HEIGHT = 440;

export interface ZoomOnScrollProps {
    /** URL of the photo that grows to fill the frame. */
    image: string;
    imageAlt: string;
    /** The two halves of the headline that move apart while the photo grows. */
    headline: [string, string];
    /** Title in the caption over the full photo. Defaults to both halves of the headline. */
    captionTitle?: string;
    /** Place shown with a pin icon in the caption. */
    location?: string;
    ctaLabel?: string;
    ctaHref?: string;
    /** Small label above the intro. */
    eyebrow?: string;
    /** Short text above the photo. */
    intro?: string;
    /** Heading of the text block after the photo. */
    detailsTitle?: string;
    detailsBody?: string;
    /** Accessible name of the scrollable panel. */
    ariaLabel?: string;
    className?: string;
}

// While the tall section scrolls through the panel, a small photo grows until it fills the frame
// and the two halves of the headline move apart to make room.
export const ZoomOnScroll = ({
    image,
    imageAlt,
    headline,
    captionTitle = headline.join(" "),
    location,
    ctaLabel,
    ctaHref = "#",
    eyebrow,
    intro,
    detailsTitle,
    detailsBody,
    ariaLabel = "Story, scroll to continue",
    className = "",
}: ZoomOnScrollProps) => {
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
        <div className={`w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 ${className}`}>
            <div
                ref={containerRef}
                tabIndex={0}
                aria-label={ariaLabel}
                style={{height: PANEL_HEIGHT}}
                className="relative overflow-y-auto overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500"
            >
                <div className="flex h-[180px] flex-col justify-end px-6 pb-6 sm:px-10">
                    {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">{eyebrow}</p>}
                    {intro && <p className="mt-2 max-w-md text-sm leading-6 text-gray-600 dark:text-slate-400">{intro}</p>}
                </div>

                <section ref={trackRef} className="relative h-[1100px]">
                    <div style={{height: PANEL_HEIGHT}} className="sticky top-0 flex items-center justify-center overflow-hidden">
                        <motion.div
                            style={reduceMotion ? {borderRadius: 0} : {scale, borderRadius: radius}}
                            className="absolute inset-0 overflow-hidden bg-gradient-to-br from-slate-400 to-slate-700"
                        >
                            <motion.img
                                src={image}
                                alt={imageAlt}
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
                                    <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{captionTitle}</p>
                                    {location && (
                                        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/80">
                                            <LuMapPin className="h-4 w-4" aria-hidden="true"/>
                                            {location}
                                        </p>
                                    )}
                                </div>
                                {ctaLabel && (
                                    <a
                                        href={ctaHref}
                                        className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                                    >
                                        {ctaLabel}
                                    </a>
                                )}
                            </motion.div>
                        </motion.div>

                        {!reduceMotion && (
                            <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-6 text-center text-4xl font-bold tracking-tight text-gray-900 sm:py-4 sm:text-6xl dark:text-white">
                                <motion.span style={{y: topY, opacity: wordsOpacity}}>{headline[0]}</motion.span>
                                <motion.span style={{y: bottomY, opacity: wordsOpacity}}>{headline[1]}</motion.span>
                            </div>
                        )}
                    </div>
                </section>

                <div className="px-6 py-10 sm:px-10">
                    {detailsTitle && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{detailsTitle}</h3>}
                    {detailsBody && <p className="mt-2 max-w-lg text-sm leading-6 text-gray-600 dark:text-slate-400">{detailsBody}</p>}
                </div>
            </div>
        </div>
    );
};

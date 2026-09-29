import {useCallback, useEffect, useRef, useState} from "react";
import type {KeyboardEvent, ReactNode} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuArrowLeft, LuArrowRight, LuQuote} from "react-icons/lu";

export interface CarouselMember {
    name: string;
    role: string;
    /** Portrait URL, shown at a 4:5 ratio. */
    photo: string;
    /** A topic this person likes to talk about. Shown lowercased after `askLabel`. */
    askMeAbout: string;
    quote: string;
}

export interface TeamCarouselCardProps {
    member: CarouselMember;
    /** Text before the topic in the badge. */
    askLabel?: string;
}

/** One card: portrait with name and role, then a quote and a topic badge. */
export const TeamCarouselCard = ({member, askLabel = "Ask me about"}: TeamCarouselCardProps) => (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
        <div className="relative aspect-[4/5] overflow-hidden bg-slate-200 dark:bg-slate-800">
            <img src={member.photo} alt={`Portrait of ${member.name}`} loading="lazy" draggable={false}
                 className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 pt-16">
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-white/80">{member.role}</p>
            </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
            <LuQuote className="h-5 w-5 text-orange-400" aria-hidden="true"/>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{member.quote}</p>
            <p className="mt-4 inline-flex self-start rounded-full bg-orange-100 px-2.5 py-1 text-xs font-medium text-orange-800 dark:bg-orange-500/15 dark:text-orange-300">
                {askLabel} {member.askMeAbout.toLowerCase()}
            </p>
        </div>
    </article>
);

export interface TeamCarouselProps {
    members: CarouselMember[];
    /** Small label above the title. Also the accessible name of the carousel. */
    eyebrow?: string;
    title?: ReactNode;
    description?: ReactNode;
    /** Text before each person's topic in the badge. */
    askLabel?: string;
    className?: string;
}

/** A scroll-snap carousel of team cards with arrow buttons, arrow key support and a progress bar. */
export const TeamCarousel = ({
    members,
    eyebrow = "Meet the team",
    title = "The people who answer your emails",
    description = "Each of us lists one topic we could talk about for an hour. Ask us on your next call.",
    askLabel = "Ask me about",
    className = "",
}: TeamCarouselProps) => {
    const trackRef = useRef<HTMLUListElement>(null);
    const reduceMotion = useReducedMotion();
    const [progress, setProgress] = useState(0);
    const [edges, setEdges] = useState({start: true, end: false});

    const measure = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;
        const max = track.scrollWidth - track.clientWidth;
        const ratio = max > 0 ? track.scrollLeft / max : 0;
        setProgress(ratio);
        setEdges({start: track.scrollLeft <= 4, end: track.scrollLeft >= max - 4});
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        measure();
        track.addEventListener("scroll", measure, {passive: true});
        const observer = new ResizeObserver(measure);
        observer.observe(track);
        return () => {
            track.removeEventListener("scroll", measure);
            observer.disconnect();
        };
    }, [measure]);

    const scrollByCard = (direction: 1 | -1) => {
        const track = trackRef.current;
        const card = track?.querySelector("li");
        if (!track || !card) return;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        track.scrollBy({left: direction * (card.offsetWidth + gap), behavior: reduceMotion ? "auto" : "smooth"});
    };

    const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollByCard(1);
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollByCard(-1);
        }
    };

    const buttonClass = "flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 outline-none transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:disabled:hover:bg-slate-900";

    return (
        <section aria-roledescription="carousel" aria-label={eyebrow}
                 className={`w-full overflow-hidden bg-orange-50/60 py-16 sm:py-20 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-6xl px-4 sm:px-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-xl">
                        <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">{eyebrow}</p>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
                        <p className="mt-3 text-slate-600 dark:text-slate-400">{description}</p>
                    </div>
                    <div className="flex gap-2">
                        <button type="button" onClick={() => scrollByCard(-1)} disabled={edges.start} aria-label="Previous people" className={buttonClass}>
                            <LuArrowLeft className="h-4 w-4"/>
                        </button>
                        <button type="button" onClick={() => scrollByCard(1)} disabled={edges.end} aria-label="Next people" className={buttonClass}>
                            <LuArrowRight className="h-4 w-4"/>
                        </button>
                    </div>
                </div>
            </div>

            <ul ref={trackRef} tabIndex={0} onKeyDown={onKeyDown} aria-label="Team members, use arrow keys to scroll"
                className="mx-auto mt-10 flex max-w-6xl snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-4 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500 sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden">
                {members.map((member, i) => (
                    <motion.li key={member.name}
                               initial={reduceMotion ? false : {opacity: 0, y: 16}}
                               whileInView={{opacity: 1, y: 0}}
                               viewport={{once: true}}
                               transition={{delay: Math.min(i, 4) * 0.06, duration: 0.4}}
                               aria-roledescription="slide" aria-label={`${i + 1} of ${members.length}: ${member.name}`}
                               className="w-[78%] shrink-0 snap-start sm:w-[300px]">
                        <TeamCarouselCard member={member} askLabel={askLabel}/>
                    </motion.li>
                ))}
            </ul>

            <div className="mx-auto mt-6 max-w-6xl px-4 sm:px-8">
                <div className="h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" aria-hidden="true">
                    <motion.div className="h-full origin-left rounded-full bg-orange-500" animate={{scaleX: Math.max(0.08, progress)}} transition={{duration: 0.1}}/>
                </div>
            </div>
        </section>
    );
};


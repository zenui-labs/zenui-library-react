import {useCallback, useEffect, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuArrowLeft, LuArrowRight, LuQuote} from "react-icons/lu";

interface Member {
    name: string;
    role: string;
    photo: string;
    askMeAbout: string;
    quote: string;
}

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=480&h=600&fit=crop&crop=faces&q=75`;

const members: Member[] = [
    {name: "Lena Fischer", role: "Head of Research", photo: photo("1494790108377-be9c29b29330"), askMeAbout: "Diary studies", quote: "I read every churn survey. The patterns show up before the charts do."},
    {name: "Marcus Bell", role: "Senior Engineer", photo: photo("1472099645785-5658abf4ff4e"), askMeAbout: "Postgres tuning", quote: "Most slow pages are one missing index away from fast."},
    {name: "Priya Shah", role: "Product Manager", photo: photo("1544005313-94ddf0286df2"), askMeAbout: "Pricing tests", quote: "We ship small, measure for two weeks and write down what we learned."},
    {name: "Tom Oduya", role: "Customer Success", photo: photo("1506794778202-cad84cf45f1d"), askMeAbout: "Onboarding calls", quote: "The first 30 days decide whether a team stays for three years."},
    {name: "Julia Novak", role: "Design Lead", photo: photo("1534528741775-53994a69daeb"), askMeAbout: "Type systems", quote: "Good defaults beat a settings page with forty toggles."},
    {name: "Ahmed Saleh", role: "Security Engineer", photo: photo("1519085360753-af0119f7cbe7"), askMeAbout: "Threat modeling", quote: "I would rather review a design doc than a breach report."},
    {name: "Rosa Jiménez", role: "Data Scientist", photo: photo("1438761681033-6461ffad8d80"), askMeAbout: "Forecasting", quote: "A forecast is only useful if people know how wrong it can be."},
];

const TeamCarousel = () => {
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
        <section aria-roledescription="carousel" aria-label="Meet the team"
                 className="w-full overflow-hidden bg-orange-50/60 py-16 sm:py-20 dark:bg-slate-950">
            <div className="mx-auto max-w-6xl px-4 sm:px-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-xl">
                        <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">Meet the team</p>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">The people who answer your emails</h2>
                        <p className="mt-3 text-slate-600 dark:text-slate-400">Each of us lists one topic we could talk about for an hour. Ask us on your next call.</p>
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
                                    Ask me about {member.askMeAbout.toLowerCase()}
                                </p>
                            </div>
                        </article>
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

export default TeamCarousel;

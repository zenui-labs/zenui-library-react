import {useEffect, useRef, useState} from "react";
import type {FocusEvent, MouseEvent, PointerEvent} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuArrowRight, LuCalendarDays, LuMapPin} from "react-icons/lu";

interface Trip {
    id: string;
    city: string;
    country: string;
    nights: number;
    price: number;
    season: string;
    highlights: string[];
    gradient: string;
}

const trips: Trip[] = [
    {
        id: "lisbon",
        city: "Lisbon",
        country: "Portugal",
        nights: 5,
        price: 1240,
        season: "April to June",
        highlights: ["Tram 28 and an Alfama walking tour", "Day trip to Sintra palaces", "Fado dinner in Bairro Alto"],
        gradient: "from-amber-400 via-orange-500 to-rose-500",
    },
    {
        id: "kyoto",
        city: "Kyoto",
        country: "Japan",
        nights: 7,
        price: 2890,
        season: "March to May",
        highlights: ["Sunrise at Fushimi Inari", "Tea ceremony in Gion", "Arashiyama bamboo grove by bike"],
        gradient: "from-rose-400 via-fuchsia-500 to-indigo-500",
    },
    {
        id: "reykjavik",
        city: "Reykjavik",
        country: "Iceland",
        nights: 4,
        price: 1780,
        season: "September to March",
        highlights: ["Golden Circle day tour", "Northern lights boat trip", "Evening at the Sky Lagoon"],
        gradient: "from-sky-400 via-cyan-500 to-emerald-500",
    },
];

const faceClass = "col-start-1 row-start-1 [-webkit-backface-visibility:hidden] [backface-visibility:hidden]";

// Flips when a mouse hovers it, when it receives keyboard focus, or when it is tapped on touch screens.
const TripCard = ({trip}: {trip: Trip}) => {
    const reduceMotion = useReducedMotion();
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [tapped, setTapped] = useState(false);
    const lastPointer = useRef("mouse");
    const backRef = useRef<HTMLDivElement>(null);
    const flipped = hovered || focused || tapped;

    // The hidden face should not be reachable with Tab or read by screen readers.
    useEffect(() => {
        backRef.current?.toggleAttribute("inert", !flipped);
    }, [flipped]);

    const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType === "mouse") setHovered(true);
    };

    const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType === "mouse") setHovered(false);
    };

    const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
        // Only keyboard focus flips the card, so a mouse click does not leave it stuck open.
        if (event.target !== event.currentTarget || event.currentTarget.matches(":focus-visible")) setFocused(true);
    };

    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setFocused(false);
            setTapped(false);
        }
    };

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        const onControl = event.target instanceof Element && event.target.closest("a, button");
        if (lastPointer.current !== "mouse" && !onControl) setTapped((value) => !value);
    };

    return (
        <div
            role="group"
            aria-label={`${trip.city}, ${trip.country}`}
            tabIndex={0}
            onPointerDown={(event) => {
                lastPointer.current = event.pointerType;
            }}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleClick}
            className="group rounded-3xl [perspective:1200px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-950"
        >
            <motion.div
                className="grid min-h-[19rem] [transform-style:preserve-3d]"
                initial={false}
                animate={{rotateY: flipped ? 180 : 0}}
                transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 140, damping: 18, mass: 0.9}}
            >
                {/* Front */}
                <div aria-hidden={flipped} className={`${faceClass} relative overflow-hidden rounded-3xl bg-gradient-to-br ${trip.gradient} p-6 text-white shadow-xl shadow-black/10 dark:shadow-black/40`}>
                    <svg aria-hidden="true" viewBox="0 0 200 120" className="absolute inset-x-0 bottom-0 w-full opacity-40">
                        <circle cx="150" cy="40" r="22" fill="white" fillOpacity="0.55"/>
                        <path d="M0 95 Q40 60 80 88 T160 80 T200 86 V120 H0 Z" fill="white" fillOpacity="0.35"/>
                        <path d="M0 108 Q50 84 100 104 T200 100 V120 H0 Z" fill="white" fillOpacity="0.5"/>
                    </svg>
                    <div className="relative flex h-full flex-col">
                        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/80">
                            <LuMapPin className="h-3.5 w-3.5" aria-hidden="true"/>
                            {trip.country}
                        </p>
                        <h3 className="mt-2 text-3xl font-semibold tracking-tight">{trip.city}</h3>
                        <p className="mt-1 text-sm text-white/85">
                            {trip.nights} nights from ${trip.price.toLocaleString("en-US")}
                        </p>
                        <p className="mt-auto pt-10 text-xs font-medium text-white/80">Hover, focus or tap for details</p>
                    </div>
                </div>

                {/* Back */}
                <div
                    ref={backRef}
                    className={`${faceClass} flex flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-black/5 [transform:rotateY(180deg)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40`}
                >
                    <p className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-slate-400">
                        <LuCalendarDays className="h-3.5 w-3.5" aria-hidden="true"/>
                        Best time: {trip.season}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">What is included</h3>
                    <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-slate-300">
                        {trip.highlights.map((item) => (
                            <li key={item} className="flex gap-2">
                                <span aria-hidden="true" className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br ${trip.gradient}`}/>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <a
                        href="#itinerary"
                        onClick={(event) => event.preventDefault()}
                        className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900"
                    >
                        View itinerary
                        <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true"/>
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

const HoverFlip = () => (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip}/>
        ))}
    </div>
);

export default HoverFlip;

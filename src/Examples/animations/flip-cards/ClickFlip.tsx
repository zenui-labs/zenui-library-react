import {useEffect, useRef, useState} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuArrowLeft, LuClock, LuGithub, LuMail, LuPhone, LuRotateCw} from "react-icons/lu";

export interface ProfileStat {
    label: string;
    value: string;
}

export interface Person {
    name: string;
    /** Shown in the avatar tile on the front face. */
    initials: string;
    role: string;
    team: string;
    location: string;
    email: string;
    /** Phone number as displayed. The tel: link is built from its digits. */
    phone: string;
    /** GitHub username, without the domain. */
    github: string;
    /** Working hours, for example "9:00 to 17:30 ET". */
    hours: string;
    /** Up to three short numbers shown on the front face. */
    stats: ProfileStat[];
}

export interface ProfileFlipCardProps {
    person: Person;
    /** Controlled flip state. Leave it out to let the card manage its own state. */
    flipped?: boolean;
    defaultFlipped?: boolean;
    onFlippedChange?: (flipped: boolean) => void;
    showContactLabel?: string;
    backLabel?: string;
    /** Small heading at the top of the back face. */
    contactHeading?: string;
    className?: string;
}

const faceClass = "col-start-1 row-start-1 rounded-3xl [-webkit-backface-visibility:hidden] [backface-visibility:hidden]";
const buttonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900";

// A profile card that flips on a button press and moves focus to the face that is now showing.
export const ProfileFlipCard = ({
    person,
    flipped: flippedProp,
    defaultFlipped = false,
    onFlippedChange,
    showContactLabel = "Show contact details",
    backLabel = "Back to profile",
    contactHeading = "Contact",
    className = "",
}: ProfileFlipCardProps) => {
    const reduceMotion = useReducedMotion();
    const [internalFlipped, setInternalFlipped] = useState(defaultFlipped);
    const flipped = flippedProp ?? internalFlipped;
    const hasInteracted = useRef(false);
    const frontRef = useRef<HTMLDivElement>(null);
    const backRef = useRef<HTMLDivElement>(null);
    const frontButton = useRef<HTMLButtonElement>(null);
    const backButton = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        frontRef.current?.toggleAttribute("inert", flipped);
        backRef.current?.toggleAttribute("inert", !flipped);
        // Move focus only after the user flipped the card, never on first render.
        if (hasInteracted.current) (flipped ? backButton : frontButton).current?.focus({preventScroll: true});
    }, [flipped]);

    const flip = () => {
        hasInteracted.current = true;
        const next = !flipped;
        if (flippedProp === undefined) setInternalFlipped(next);
        onFlippedChange?.(next);
    };

    return (
        <div className={`w-full max-w-sm [perspective:1400px] ${className}`}>
            <motion.div
                className="grid [transform-style:preserve-3d]"
                initial={false}
                animate={flipped ? {rotateY: 180} : {rotateY: 0}}
                transition={
                    reduceMotion
                        ? {duration: 0}
                        : {rotateY: {type: "spring", stiffness: 120, damping: 16, mass: 1}}
                }
            >
                {/* Front */}
                <div
                    ref={frontRef}
                    className={`${faceClass} overflow-hidden border border-gray-200 bg-white shadow-xl shadow-gray-900/5 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40`}
                >
                    <div className="h-24 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"/>
                    <div className="-mt-10 px-6 pb-6">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-900 text-2xl font-semibold text-white ring-4 ring-white dark:bg-slate-100 dark:text-slate-900 dark:ring-slate-900">
                            {person.initials}
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{person.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-slate-400">
                            {person.role} · {person.team}
                        </p>
                        <dl className="mt-5 grid grid-cols-3 divide-x divide-gray-100 rounded-2xl bg-gray-50 py-3 text-center dark:divide-slate-800 dark:bg-slate-800/60">
                            {person.stats.map((stat) => (
                                <div key={stat.label}>
                                    <dt className="text-xs text-gray-500 dark:text-slate-400">{stat.label}</dt>
                                    <dd className="text-lg font-semibold tabular-nums text-gray-900 dark:text-white">{stat.value}</dd>
                                </div>
                            ))}
                        </dl>
                        <button
                            ref={frontButton}
                            type="button"
                            onClick={flip}
                            className={`${buttonClass} mt-5 w-full bg-violet-600 text-white hover:bg-violet-500 dark:bg-violet-500 dark:hover:bg-violet-400`}
                        >
                            <LuRotateCw className="h-4 w-4" aria-hidden="true"/>
                            {showContactLabel}
                        </button>
                    </div>
                </div>

                {/* Back */}
                <div
                    ref={backRef}
                    className={`${faceClass} flex flex-col bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950 p-6 text-white shadow-xl shadow-violet-900/20 [transform:rotateY(180deg)] dark:from-slate-800 dark:via-slate-900 dark:to-violet-950 dark:ring-1 dark:ring-slate-700`}
                >
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">{contactHeading}</p>
                    <h3 className="mt-2 text-xl font-semibold">{person.name}</h3>
                    <p className="text-sm text-slate-400">Based in {person.location}</p>
                    <ul className="mt-6 space-y-3 text-sm">
                        <li>
                            <a href={`mailto:${person.email}`} className="flex items-center gap-3 rounded-lg text-slate-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">
                                <LuMail className="h-4 w-4 text-violet-300" aria-hidden="true"/>
                                {person.email}
                            </a>
                        </li>
                        <li>
                            <a href={`tel:${person.phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-3 rounded-lg text-slate-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">
                                <LuPhone className="h-4 w-4 text-violet-300" aria-hidden="true"/>
                                {person.phone}
                            </a>
                        </li>
                        <li className="flex items-center gap-3 text-slate-200">
                            <LuGithub className="h-4 w-4 text-violet-300" aria-hidden="true"/>
                            github.com/{person.github}
                        </li>
                        <li className="flex items-center gap-3 text-slate-200">
                            <LuClock className="h-4 w-4 text-violet-300" aria-hidden="true"/>
                            {person.hours}
                        </li>
                    </ul>
                    <button
                        ref={backButton}
                        type="button"
                        onClick={flip}
                        className={`${buttonClass} mt-auto w-full bg-white/10 text-white ring-1 ring-inset ring-white/15 hover:bg-white/15`}
                    >
                        <LuArrowLeft className="h-4 w-4" aria-hidden="true"/>
                        {backLabel}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};


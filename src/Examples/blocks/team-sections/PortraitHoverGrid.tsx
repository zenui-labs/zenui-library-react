import {useState} from "react";
import type {ReactNode} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuGithub, LuGlobe, LuLinkedin, LuTwitter} from "react-icons/lu";

export interface PortraitLinks {
    linkedin?: string;
    github?: string;
    /** Profile on X. */
    twitter?: string;
    /** Personal website. */
    site?: string;
}

export interface PortraitMember {
    name: string;
    role: string;
    /** Square photo URL. Initials show instead if it fails to load. */
    photo: string;
    links: PortraitLinks;
}

export interface Advisor {
    name: string;
    /** One line under the name, for example a past role. */
    note: string;
    /** Letters in the avatar. Defaults to the first letter of each word, ignoring a leading "Dr.". */
    initials?: string;
}

const Social = ({href, label, children}: {href: string; label: string; children: ReactNode}) => (
    <a href={href} aria-label={label}
       className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white outline-none backdrop-blur transition-colors hover:bg-white hover:text-slate-900 focus-visible:bg-white focus-visible:text-slate-900 focus-visible:ring-2 focus-visible:ring-white">
        {children}
    </a>
);

const Portrait = ({member}: {member: PortraitMember}) => {
    const [failed, setFailed] = useState(false);
    const initials = member.name.split(" ").map((p) => p[0]).join("");
    return failed ? (
        <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-300 to-slate-400 text-3xl font-semibold text-white dark:from-slate-700 dark:to-slate-800">
            {initials}
        </span>
    ) : (
        <img src={member.photo} alt={`Portrait of ${member.name}`} loading="lazy" onError={() => setFailed(true)}
             className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0 group-focus-within:grayscale-0 [@media(hover:none)]:grayscale-0"/>
    );
};

export interface PortraitCardProps {
    member: PortraitMember;
}

/** A square portrait that turns to color on hover or focus and reveals the member's links. */
export const PortraitCard = ({member}: PortraitCardProps) => (
    <article className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100 sm:rounded-3xl dark:bg-slate-800">
        <Portrait member={member}/>
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent p-3 sm:p-5">
            <h3 className="text-sm font-semibold text-white sm:text-lg">{member.name}</h3>
            <p className="text-xs text-white/75 sm:text-sm">{member.role}</p>
            <div className="mt-0 flex max-h-0 gap-1.5 overflow-hidden opacity-0 transition-all duration-300 group-focus-within:mt-3 group-focus-within:max-h-12 group-focus-within:opacity-100 group-hover:mt-3 group-hover:max-h-12 group-hover:opacity-100 [@media(hover:none)]:mt-3 [@media(hover:none)]:max-h-12 [@media(hover:none)]:opacity-100">
                {member.links.linkedin && <Social href={member.links.linkedin} label={`${member.name} on LinkedIn`}><LuLinkedin className="h-4 w-4"/></Social>}
                {member.links.github && <Social href={member.links.github} label={`${member.name} on GitHub`}><LuGithub className="h-4 w-4"/></Social>}
                {member.links.twitter && <Social href={member.links.twitter} label={`${member.name} on X`}><LuTwitter className="h-4 w-4"/></Social>}
                {member.links.site && <Social href={member.links.site} label={`${member.name}'s website`}><LuGlobe className="h-4 w-4"/></Social>}
            </div>
        </div>
    </article>
);

export interface PortraitHoverGridProps {
    members: PortraitMember[];
    /** People listed in a row under the portraits. Leave it out to hide the row. */
    advisors?: Advisor[];
    title?: ReactNode;
    description?: ReactNode;
    advisorsTitle?: string;
    className?: string;
}

/** Square portraits in a grid that fade in on scroll, with an optional advisors row below. */
export const PortraitHoverGrid = ({
    members,
    advisors = [],
    title = "Eight people, one transcription engine",
    description = "Verbatim is built by a small team of engineers, designers and researchers who used to do this work by hand.",
    advisorsTitle = "Advisors",
    className = "",
}: PortraitHoverGridProps) => {
    const reduceMotion = useReducedMotion();

    return (
        <section className={`w-full bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">{title}</h2>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">
                        {description}
                    </p>
                </div>

                <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                    {members.map((member, i) => (
                        <motion.li key={member.name}
                                   initial={reduceMotion ? false : {opacity: 0, y: 20}}
                                   whileInView={{opacity: 1, y: 0}}
                                   viewport={{once: true, margin: "-60px"}}
                                   transition={{delay: (i % 4) * 0.07, duration: 0.45}}>
                            <PortraitCard member={member}/>
                        </motion.li>
                    ))}
                </ul>

                {advisors.length > 0 && (
                    <div className="mt-16 rounded-3xl border border-slate-200 p-6 sm:p-8 dark:border-slate-800">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{advisorsTitle}</h3>
                        <ul className="mt-5 grid gap-5 sm:grid-cols-3">
                            {advisors.map((advisor) => (
                                <li key={advisor.name} className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                        {advisor.initials ?? advisor.name.replace("Dr. ", "").split(" ").map((p) => p[0]).join("")}
                                    </span>
                                    <span>
                                        <span className="block text-sm font-semibold text-slate-900 dark:text-white">{advisor.name}</span>
                                        <span className="block text-sm text-slate-500 dark:text-slate-400">{advisor.note}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
};

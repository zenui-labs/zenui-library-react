import {useId, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowRight, LuClock} from "react-icons/lu";

export type StoryArtPattern = "grid" | "dunes" | "rings";

export interface MagazineStory {
    slug: string;
    /** Section label above the headline, for example "Energy". */
    kicker: string;
    title: string;
    /** Standfirst under the headline. Only the lead story shows it. */
    dek?: string;
    author: string;
    minutes: number;
    art: StoryArtPattern;
    /** Tailwind gradient classes for the art, for example "from-amber-300 via-orange-400 to-rose-500". */
    tone: string;
    /** Link to the story. Defaults to "#". */
    href?: string;
}

export interface RankedStory {
    slug: string;
    kicker: string;
    title: string;
    href?: string;
}

export interface MostReadRange {
    id: string;
    /** Button label, for example "Today". */
    label: string;
    /** Stories in rank order. */
    stories: RankedStory[];
}

export interface NewsBrief {
    slug: string;
    kicker: string;
    title: string;
    /** Relative time, for example "2h ago". */
    time: string;
    href?: string;
}

export interface StoryArtProps {
    story: Pick<MagazineStory, "art" | "tone">;
    className?: string;
}

/** Generated story art: a gradient with an SVG pattern that zooms slightly on hover. */
export const StoryArt = ({story, className = ""}: StoryArtProps) => (
    <div className={`relative overflow-hidden bg-gradient-to-br ${story.tone} ${className}`}>
        <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
             className="absolute inset-0 h-full w-full text-white transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            {story.art === "grid" && (
                <g fill="currentColor">
                    {Array.from({length: 7}).map((_, row) =>
                        Array.from({length: 11}).map((__, col) => (
                            <rect key={`${row}-${col}`} x={20 + col * 34} y={40 + row * 30} width="26" height="20" rx="3"
                                  fillOpacity={((row * 3 + col * 7) % 10) / 22 + 0.06}/>
                        )),
                    )}
                    <circle cx="330" cy="46" r="26" fillOpacity="0.85"/>
                </g>
            )}
            {story.art === "dunes" && (
                <g fill="currentColor">
                    <circle cx="300" cy="80" r="34" fillOpacity="0.7"/>
                    <path d="M0 190 Q100 130 200 180 T400 170 V260 H0Z" fillOpacity="0.25"/>
                    <path d="M0 220 Q120 170 240 215 T400 205 V260 H0Z" fillOpacity="0.4"/>
                </g>
            )}
            {story.art === "rings" && (
                <g fill="none" stroke="currentColor" strokeWidth="2">
                    {[20, 45, 70, 95, 120, 145].map((r, i) => (
                        <circle key={r} cx="90" cy="220" r={r} strokeOpacity={0.6 - i * 0.08}/>
                    ))}
                </g>
            )}
        </svg>
    </div>
);

const headlineLink = "outline-none bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px] focus-visible:rounded focus-visible:ring-2 focus-visible:ring-rose-500 after:absolute after:inset-0";

export interface MagazineFrontProps {
    lead: MagazineStory;
    /** Stories in the middle column. Two fit the layout best. */
    secondary: MagazineStory[];
    /** Periods for the most read list. The first one is selected on load. */
    mostRead: MostReadRange[];
    briefs: NewsBrief[];
    /** Publication name in the masthead. */
    masthead?: string;
    /** Date line on the right of the masthead. */
    dateline?: string;
    mostReadLabel?: string;
    briefsLabel?: string;
    allNewsLabel?: string;
    allNewsHref?: string;
    className?: string;
}

/** An editorial front page: lead story, secondary stories, a switchable most read list and a row of briefs. */
export const MagazineFront = ({
    lead,
    secondary,
    mostRead,
    briefs,
    masthead = "The Long View",
    dateline,
    mostReadLabel = "Most read",
    briefsLabel = "In brief",
    allNewsLabel = "All news",
    allNewsHref = "#",
    className = "",
}: MagazineFrontProps) => {
    const mostReadId = useId();
    const [rangeId, setRangeId] = useState(mostRead[0]?.id ?? "");
    const range = mostRead.find((r) => r.id === rangeId) ?? mostRead[0];

    return (
        <section className={`w-full bg-[#fbfaf7] px-4 py-12 text-stone-900 sm:px-8 dark:bg-stone-950 dark:text-stone-100 ${className}`}>
            <div className="mx-auto max-w-6xl">
                <header className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-stone-900 pb-3 dark:border-stone-100">
                    <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">{masthead}</h2>
                    {dateline && (
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                            {dateline}
                        </p>
                    )}
                </header>

                <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-8">
                    {/* Lead story */}
                    <article className="group relative lg:col-span-6">
                        <StoryArt story={lead} className="aspect-[16/10] rounded-sm"/>
                        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-rose-700 dark:text-rose-400">{lead.kicker}</p>
                        <h3 className="mt-2 font-serif text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
                            <a href={lead.href ?? "#"} className={headlineLink}>{lead.title}</a>
                        </h3>
                        {lead.dek && <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-stone-600 dark:text-stone-400">{lead.dek}</p>}
                        <p className="mt-4 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                            By <span className="font-semibold text-stone-800 dark:text-stone-200">{lead.author}</span>
                            <span aria-hidden="true">/</span>
                            <LuClock className="h-3.5 w-3.5" aria-hidden="true"/> {lead.minutes} min read
                        </p>
                    </article>

                    {/* Secondary stories */}
                    <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1 lg:border-l lg:border-stone-300 lg:pl-8 dark:lg:border-stone-800">
                        {secondary.map((story) => (
                            <article key={story.slug} className="group relative">
                                <StoryArt story={story} className="aspect-[3/2] rounded-sm"/>
                                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-700 dark:text-rose-400">{story.kicker}</p>
                                <h3 className="mt-1.5 font-serif text-xl font-bold leading-snug">
                                    <a href={story.href ?? "#"} className={headlineLink}>{story.title}</a>
                                </h3>
                                <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                                    {story.author}, {story.minutes} min
                                </p>
                            </article>
                        ))}
                    </div>

                    {/* Most read */}
                    <aside aria-labelledby={mostReadId} className="lg:col-span-3 lg:border-l lg:border-stone-300 lg:pl-8 dark:lg:border-stone-800">
                        <div className="flex items-center justify-between gap-2 border-b border-stone-300 pb-2 dark:border-stone-800">
                            <h3 id={mostReadId} className="text-xs font-bold uppercase tracking-[0.16em]">{mostReadLabel}</h3>
                            {mostRead.length > 1 && (
                                <div role="group" aria-label="Most read period" className="flex gap-0.5 rounded-full bg-stone-200/70 p-0.5 dark:bg-stone-800">
                                    {mostRead.map((r) => (
                                        <button key={r.id} type="button" aria-pressed={range?.id === r.id} onClick={() => setRangeId(r.id)}
                                                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 ${range?.id === r.id
                                                    ? "bg-white text-stone-900 shadow-sm dark:bg-stone-100 dark:text-stone-900"
                                                    : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"}`}>
                                            {r.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.ol key={range?.id}
                                       initial={{opacity: 0, y: 6}}
                                       animate={{opacity: 1, y: 0}}
                                       exit={{opacity: 0, y: -6}}
                                       transition={{duration: 0.18}}
                                       className="divide-y divide-stone-200 dark:divide-stone-800">
                                {range?.stories.map((item, i) => (
                                    <li key={item.slug} className="group relative flex gap-4 py-4">
                                        <span className="font-serif text-3xl font-bold leading-none text-stone-300 tabular-nums dark:text-stone-700" aria-hidden="true">
                                            {i + 1}
                                        </span>
                                        <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">{item.kicker}</p>
                                            <p className="mt-1 font-serif text-[15px] font-semibold leading-snug">
                                                <a href={item.href ?? "#"} className={headlineLink}>{item.title}</a>
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </motion.ol>
                        </AnimatePresence>
                    </aside>
                </div>

                {/* Briefs */}
                <div className="mt-12 border-t border-stone-900 pt-4 dark:border-stone-100">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-[0.16em]">{briefsLabel}</h3>
                        {allNewsLabel && (
                            <a href={allNewsHref} className="inline-flex items-center gap-1 rounded text-xs font-semibold text-rose-700 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-rose-400">
                                {allNewsLabel} <LuArrowRight className="h-3.5 w-3.5" aria-hidden="true"/>
                            </a>
                        )}
                    </div>
                    <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {briefs.map((brief) => (
                            <li key={brief.slug} className="group relative">
                                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                                    <span className="font-semibold uppercase tracking-[0.14em] text-stone-700 dark:text-stone-300">{brief.kicker}</span>
                                    <span aria-hidden="true"> / </span>{brief.time}
                                </p>
                                <p className="mt-1.5 text-sm font-medium leading-snug">
                                    <a href={brief.href ?? "#"} className={headlineLink}>{brief.title}</a>
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

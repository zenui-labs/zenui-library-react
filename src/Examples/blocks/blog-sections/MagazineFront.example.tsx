import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowRight, LuClock} from "react-icons/lu";

interface Story {
    slug: string;
    kicker: string;
    title: string;
    dek?: string;
    author: string;
    minutes: number;
    art: "grid" | "dunes" | "rings";
    tone: string;
}

const lead: Story = {
    slug: "grid-batteries",
    kicker: "Energy",
    title: "The quiet race to build batteries the size of city blocks",
    dek: "Utilities in Texas and South Australia now store more solar power than they did in all of 2023. We visited three of the largest sites to see what comes next.",
    author: "Hannah Okafor",
    minutes: 14,
    art: "grid",
    tone: "from-amber-300 via-orange-400 to-rose-500",
};

const secondary: Story[] = [
    {
        slug: "night-trains",
        kicker: "Travel",
        title: "Night trains are back, and they are fully booked",
        author: "Mateo Ruiz",
        minutes: 7,
        art: "dunes",
        tone: "from-indigo-400 to-violet-600",
    },
    {
        slug: "soil-carbon",
        kicker: "Climate",
        title: "Can farmers really bank carbon in their soil?",
        author: "Priya Raman",
        minutes: 9,
        art: "rings",
        tone: "from-emerald-300 to-teal-600",
    },
];

const mostRead: Record<"today" | "week", {slug: string; title: string; kicker: string}[]> = {
    today: [
        {slug: "chip-tariffs", kicker: "Business", title: "What the new chip tariffs mean for laptop prices"},
        {slug: "four-hour-rule", kicker: "Work", title: "The four hour rule for meetings, one year in"},
        {slug: "sourdough", kicker: "Food", title: "Why your sourdough starter smells like nail polish"},
        {slug: "rent-data", kicker: "Cities", title: "Rents fell in 31 of the 50 largest US metros"},
    ],
    week: [
        {slug: "grid-batteries", kicker: "Energy", title: "The quiet race to build batteries the size of city blocks"},
        {slug: "moon-dust", kicker: "Science", title: "Moon dust is sharper than anyone planned for"},
        {slug: "night-trains", kicker: "Travel", title: "Night trains are back, and they are fully booked"},
        {slug: "ai-tutors", kicker: "Education", title: "Inside a school where every student has an AI tutor"},
    ],
};

const briefs: {slug: string; kicker: string; title: string; time: string}[] = [
    {slug: "heat-pumps", kicker: "Homes", title: "Heat pump sales pass gas furnaces for the third year", time: "2h ago"},
    {slug: "ferry", kicker: "Cities", title: "Oslo puts its first electric car ferry into service", time: "4h ago"},
    {slug: "wheat", kicker: "Markets", title: "Wheat futures drop after a record Argentine harvest", time: "5h ago"},
    {slug: "museum", kicker: "Culture", title: "The Met returns 14 bronzes to Nigeria", time: "7h ago"},
];

const Art = ({story, className = ""}: {story: Story; className?: string}) => (
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

const MagazineFront = () => {
    const [range, setRange] = useState<"today" | "week">("today");

    return (
        <section className="w-full bg-[#fbfaf7] px-4 py-12 text-stone-900 sm:px-8 dark:bg-stone-950 dark:text-stone-100">
            <div className="mx-auto max-w-6xl">
                <header className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-stone-900 pb-3 dark:border-stone-100">
                    <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">The Long View</h2>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                        Tuesday, September 29, 2026
                    </p>
                </header>

                <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-8">
                    {/* Lead story */}
                    <article className="group relative lg:col-span-6">
                        <Art story={lead} className="aspect-[16/10] rounded-sm"/>
                        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-rose-700 dark:text-rose-400">{lead.kicker}</p>
                        <h3 className="mt-2 font-serif text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
                            <a href="#" className={headlineLink}>{lead.title}</a>
                        </h3>
                        <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-stone-600 dark:text-stone-400">{lead.dek}</p>
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
                                <Art story={story} className="aspect-[3/2] rounded-sm"/>
                                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-700 dark:text-rose-400">{story.kicker}</p>
                                <h3 className="mt-1.5 font-serif text-xl font-bold leading-snug">
                                    <a href="#" className={headlineLink}>{story.title}</a>
                                </h3>
                                <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                                    {story.author}, {story.minutes} min
                                </p>
                            </article>
                        ))}
                    </div>

                    {/* Most read */}
                    <aside aria-labelledby="magazine-most-read" className="lg:col-span-3 lg:border-l lg:border-stone-300 lg:pl-8 dark:lg:border-stone-800">
                        <div className="flex items-center justify-between gap-2 border-b border-stone-300 pb-2 dark:border-stone-800">
                            <h3 id="magazine-most-read" className="text-xs font-bold uppercase tracking-[0.16em]">Most read</h3>
                            <div role="group" aria-label="Most read period" className="flex gap-0.5 rounded-full bg-stone-200/70 p-0.5 dark:bg-stone-800">
                                {(["today", "week"] as const).map((r) => (
                                    <button key={r} type="button" aria-pressed={range === r} onClick={() => setRange(r)}
                                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 ${range === r
                                                ? "bg-white text-stone-900 shadow-sm dark:bg-stone-100 dark:text-stone-900"
                                                : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"}`}>
                                        {r === "today" ? "Today" : "This week"}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.ol key={range}
                                       initial={{opacity: 0, y: 6}}
                                       animate={{opacity: 1, y: 0}}
                                       exit={{opacity: 0, y: -6}}
                                       transition={{duration: 0.18}}
                                       className="divide-y divide-stone-200 dark:divide-stone-800">
                                {mostRead[range].map((item, i) => (
                                    <li key={item.slug} className="group relative flex gap-4 py-4">
                                        <span className="font-serif text-3xl font-bold leading-none text-stone-300 tabular-nums dark:text-stone-700" aria-hidden="true">
                                            {i + 1}
                                        </span>
                                        <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">{item.kicker}</p>
                                            <p className="mt-1 font-serif text-[15px] font-semibold leading-snug">
                                                <a href="#" className={headlineLink}>{item.title}</a>
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
                        <h3 className="text-xs font-bold uppercase tracking-[0.16em]">In brief</h3>
                        <a href="#" className="inline-flex items-center gap-1 rounded text-xs font-semibold text-rose-700 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-rose-400">
                            All news <LuArrowRight className="h-3.5 w-3.5" aria-hidden="true"/>
                        </a>
                    </div>
                    <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {briefs.map((brief) => (
                            <li key={brief.slug} className="group relative">
                                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                                    <span className="font-semibold uppercase tracking-[0.14em] text-stone-700 dark:text-stone-300">{brief.kicker}</span>
                                    <span aria-hidden="true"> / </span>{brief.time}
                                </p>
                                <p className="mt-1.5 text-sm font-medium leading-snug">
                                    <a href="#" className={headlineLink}>{brief.title}</a>
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default MagazineFront;

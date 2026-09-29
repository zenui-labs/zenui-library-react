import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowUpRight} from "react-icons/lu";

type Topic = "Engineering" | "Design" | "Company";

interface Cover {
    from: string;
    to: string;
    shape: "circles" | "bars" | "wave";
}

interface Post {
    slug: string;
    topic: Topic;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readMinutes: number;
    cover: Cover;
}

const posts: Post[] = [
    {
        slug: "postgres-queue",
        topic: "Engineering",
        title: "We replaced our job queue with a Postgres table",
        excerpt: "Three years, 2 billion jobs and one very long migration later, here is what we learned about SKIP LOCKED and why we are not going back.",
        author: "Nadia Patel",
        date: "Sep 18, 2026",
        readMinutes: 12,
        cover: {from: "from-indigo-500", to: "to-sky-400", shape: "bars"},
    },
    {
        slug: "empty-states",
        topic: "Design",
        title: "Designing empty states people actually read",
        excerpt: "Most empty states explain the feature. The good ones give you one thing to do next.",
        author: "Leo Martins",
        date: "Sep 9, 2026",
        readMinutes: 6,
        cover: {from: "from-amber-400", to: "to-rose-500", shape: "circles"},
    },
    {
        slug: "four-day-week",
        topic: "Company",
        title: "One year of the four day week",
        excerpt: "What happened to shipping speed, support response times and hiring after we moved to Monday through Thursday.",
        author: "Grace Kim",
        date: "Aug 28, 2026",
        readMinutes: 8,
        cover: {from: "from-emerald-400", to: "to-teal-600", shape: "wave"},
    },
    {
        slug: "flaky-tests",
        topic: "Engineering",
        title: "How we found 214 flaky tests in a weekend",
        excerpt: "A small script, a lot of CI minutes and a leaderboard nobody wanted to top.",
        author: "Omar Haddad",
        date: "Aug 14, 2026",
        readMinutes: 7,
        cover: {from: "from-fuchsia-500", to: "to-violet-600", shape: "circles"},
    },
    {
        slug: "type-scale",
        topic: "Design",
        title: "A type scale for dense dashboards",
        excerpt: "Why we dropped to a 13 pixel base size and added a fourth weight.",
        author: "Leo Martins",
        date: "Jul 30, 2026",
        readMinutes: 5,
        cover: {from: "from-slate-700", to: "to-slate-500", shape: "bars"},
    },
];

const topics: ("All" | Topic)[] = ["All", "Engineering", "Design", "Company"];

const CoverArt = ({cover, large = false}: {cover: Cover; large?: boolean}) => (
    <div className={`relative overflow-hidden bg-gradient-to-br ${cover.from} ${cover.to} ${large ? "aspect-[16/10] md:aspect-auto md:h-full md:min-h-[280px]" : "aspect-[16/9]"}`}>
        <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice"
             className="absolute inset-0 h-full w-full text-white transition-transform duration-500 group-hover:scale-105" aria-hidden="true">
            {cover.shape === "circles" && (
                <g fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5">
                    {[30, 55, 80, 105].map((r) => <circle key={r} cx="250" cy="40" r={r}/>)}
                    <circle cx="250" cy="40" r="14" fill="currentColor" fillOpacity="0.6"/>
                </g>
            )}
            {cover.shape === "bars" && (
                <g fill="currentColor">
                    {[70, 110, 90, 140, 120, 160, 130].map((h, i) => (
                        <rect key={i} x={40 + i * 36} y={180 - h} width="22" height={h} rx="4" fillOpacity={0.15 + i * 0.07}/>
                    ))}
                </g>
            )}
            {cover.shape === "wave" && (
                <g fill="none" stroke="currentColor" strokeWidth="2">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <path key={i} strokeOpacity={0.2 + i * 0.12}
                              d={`M-10 ${70 + i * 20} C 60 ${30 + i * 20}, 120 ${110 + i * 20}, 190 ${70 + i * 20} S 290 ${30 + i * 20}, 340 ${70 + i * 20}`}/>
                    ))}
                </g>
            )}
        </svg>
    </div>
);

const initials = (name: string) => name.split(" ").map((p) => p[0]).join("");

const Meta = ({post}: {post: Post}) => (
    <div className="flex items-center gap-3 text-xs">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[11px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {initials(post.author)}
        </span>
        <div className="min-w-0">
            <p className="font-medium text-slate-900 dark:text-slate-200">{post.author}</p>
            <p className="text-slate-500 dark:text-slate-400">
                <time>{post.date}</time> <span aria-hidden="true">·</span> {post.readMinutes} min read
            </p>
        </div>
    </div>
);

const BlogGrid = () => {
    const [topic, setTopic] = useState<"All" | Topic>("All");
    const filtered = posts.filter((post) => topic === "All" || post.topic === topic);
    const [featured, ...rest] = filtered;

    return (
        <section className="w-full bg-white px-4 py-16 sm:px-8 dark:bg-slate-950">
            <div className="mx-auto max-w-5xl">
                <div className="flex flex-col gap-6 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">From the blog</h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">Notes from the people building Lattice.</p>
                    </div>
                    <div className="flex gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-900" role="group" aria-label="Filter posts by topic">
                        {topics.map((t) => (
                            <button key={t} type="button" aria-pressed={topic === t} onClick={() => setTopic(t)}
                                    className={`rounded-lg px-3 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 ${topic === t
                                        ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                                        : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div key={topic}
                                initial={{opacity: 0, y: 8}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -8}}
                                transition={{duration: 0.2}}>
                        {featured && (
                            <article className="group relative mt-8 grid overflow-hidden rounded-3xl border border-slate-200 bg-white md:grid-cols-2 dark:border-slate-800 dark:bg-slate-900">
                                <CoverArt cover={featured.cover} large/>
                                <div className="flex flex-col p-6 sm:p-8">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                        Featured, {featured.topic}
                                    </p>
                                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                                        <a href="#" className="outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-2 focus-visible:after:ring-indigo-500">
                                            {featured.title}
                                        </a>
                                    </h3>
                                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{featured.excerpt}</p>
                                    <div className="mt-6"><Meta post={featured}/></div>
                                </div>
                                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-900 opacity-0 shadow transition-opacity group-hover:opacity-100 dark:bg-slate-900/90 dark:text-white">
                                    <LuArrowUpRight className="h-4 w-4"/>
                                </span>
                            </article>
                        )}

                        {rest.length > 0 && (
                            <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                                {rest.map((post) => (
                                    <article key={post.slug}
                                             className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none">
                                        <CoverArt cover={post.cover}/>
                                        <div className="flex flex-1 flex-col p-5">
                                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{post.topic}</p>
                                            <h3 className="mt-2 font-semibold leading-snug text-slate-900 dark:text-white">
                                                <a href="#" className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-indigo-500">
                                                    {post.title}
                                                </a>
                                            </h3>
                                            <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-600 dark:text-slate-400">{post.excerpt}</p>
                                            <div className="mt-5"><Meta post={post}/></div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <div className="mt-10 text-center">
                    <a href="#" className="inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-slate-900 outline-none hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-white dark:hover:text-indigo-400">
                        View all 86 posts <LuArrowUpRight className="h-4 w-4"/>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BlogGrid;

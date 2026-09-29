import {useState} from "react";
import {motion} from "framer-motion";
import {LuChevronDown, LuStar} from "react-icons/lu";

interface Testimonial {
    name: string;
    role: string;
    company: string;
    quote: string;
    // Gradient used for the initials avatar.
    avatar: string;
    rating?: number;
    highlight?: boolean;
}

const testimonials: Testimonial[] = [
    {
        name: "Priya Raman",
        role: "Head of Support",
        company: "Northbeam",
        quote: "We cut first response time from 9 hours to 40 minutes in the first month. The shared inbox finally feels like one queue instead of five.",
        avatar: "from-amber-400 to-orange-500",
        rating: 5,
        highlight: true,
    },
    {
        name: "Marcus Webb",
        role: "Founder",
        company: "Quillo",
        quote: "Setup took an afternoon. We imported three years of tickets and nothing was lost.",
        avatar: "from-sky-400 to-indigo-500",
    },
    {
        name: "Elena Sokolova",
        role: "Support Operations",
        company: "Halcyon Health",
        quote: "The audit log and role permissions were the reason our compliance team signed off. Macros are the reason my agents like it.",
        avatar: "from-emerald-400 to-teal-500",
        rating: 5,
    },
    {
        name: "Daniel Okafor",
        role: "CX Lead",
        company: "Ferrox",
        quote: "Routing rules replaced a spreadsheet and two automation scripts. I no longer get paged when someone is on vacation.",
        avatar: "from-fuchsia-400 to-pink-500",
    },
    {
        name: "Hannah Lee",
        role: "Support Engineer",
        company: "Brightline",
        quote: "The API is well documented and the webhooks are signed. We built a custom escalation bot in two days.",
        avatar: "from-violet-400 to-purple-500",
        rating: 5,
    },
    {
        name: "Tomás Herrera",
        role: "COO",
        company: "Arcadia Labs",
        quote: "We grew from 4 to 26 agents without adding a second tool. Reporting shows exactly where the backlog comes from each week.",
        avatar: "from-rose-400 to-red-500",
    },
    {
        name: "Aisha Bello",
        role: "Team Lead",
        company: "Parcelly",
        quote: "Customers reply to satisfaction surveys now because they are one click inside the email.",
        avatar: "from-lime-400 to-green-500",
        rating: 4,
    },
    {
        name: "Jonas Berg",
        role: "Support Manager",
        company: "Fjord Outdoor",
        quote: "Holiday season used to mean a 3 day backlog. This year we closed every ticket within 24 hours, with the same headcount.",
        avatar: "from-cyan-400 to-blue-500",
    },
    {
        name: "Mei Tanaka",
        role: "Customer Success",
        company: "Lumen Studio",
        quote: "Side conversations let me pull in an engineer without forwarding the whole thread. Small feature, big difference.",
        avatar: "from-yellow-400 to-amber-500",
        rating: 5,
    },
];

const initials = (name: string) => name.split(" ").map((part) => part[0]).join("").slice(0, 2);

const Stars = ({rating}: {rating: number}) => (
    <div className="flex gap-0.5" aria-label={`Rated ${rating} out of 5`}>
        {Array.from({length: 5}, (_, i) => (
            <LuStar key={i} aria-hidden="true"
                    className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-600"}`}/>
        ))}
    </div>
);

const TestimonialWall = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <section className="w-full bg-slate-50 px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950">
            <div className="mx-auto max-w-5xl">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Stars rating={5}/>
                        <span><strong className="font-semibold text-slate-900 dark:text-white">4.9</strong> from 2,300 reviews</span>
                    </div>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        Support teams that switched, in their own words
                    </h2>
                </div>

                <div className="relative mt-12">
                    <motion.div
                        id="testimonial-wall"
                        initial={false}
                        animate={{height: expanded ? "auto" : 560}}
                        transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
                        className="overflow-hidden"
                    >
                        <div className="columns-1 gap-4 sm:columns-2 md:columns-3">
                            {testimonials.map((t) => (
                                <figure key={t.name}
                                        className={`mb-4 break-inside-avoid rounded-2xl border p-6 ${t.highlight
                                            ? "border-transparent bg-slate-900 text-white shadow-xl shadow-slate-900/10 dark:bg-white dark:text-slate-900"
                                            : "border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"}`}>
                                    {t.rating !== undefined && <Stars rating={t.rating}/>}
                                    <blockquote className={`${t.rating ? "mt-3" : ""} ${t.highlight ? "text-lg leading-relaxed" : "text-sm leading-relaxed"}`}>
                                        <p>&ldquo;{t.quote}&rdquo;</p>
                                    </blockquote>
                                    <figcaption className="mt-5 flex items-center gap-3">
                                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white ${t.avatar}`}>
                                            {initials(t.name)}
                                        </span>
                                        <span>
                                            <span className={`block text-sm font-semibold ${t.highlight ? "" : "text-slate-900 dark:text-white"}`}>{t.name}</span>
                                            <span className={`block text-xs ${t.highlight ? "text-white/60 dark:text-slate-500" : "text-slate-500"}`}>
                                                {t.role}, {t.company}
                                            </span>
                                        </span>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </motion.div>

                    {!expanded && (
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-950"/>
                    )}
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        type="button"
                        onClick={() => setExpanded((v) => !v)}
                        aria-expanded={expanded}
                        aria-controls="testimonial-wall"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        {expanded ? "Show fewer reviews" : "Show all reviews"}
                        <LuChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}/>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialWall;

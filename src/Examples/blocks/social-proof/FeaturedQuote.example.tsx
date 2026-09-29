import {FeaturedQuote, type QuoteAuthor, type QuoteMetric} from "./FeaturedQuote";

const metrics: QuoteMetric[] = [
    {value: "62%", label: "less time spent on month end close"},
    {value: "$1.8M", label: "in duplicate payments caught in year one"},
    {value: "3 weeks", label: "from contract to go live across 14 entities"},
];

const author: QuoteAuthor = {name: "Maya Okonkwo", title: "Chief Financial Officer, Halcyon Health", initials: "MO"};

const quote = "We used to close the books in eleven days and still find surprises in the audit. Now we close in four, and the auditors ask us how we did it.";

// A simple geometric wordmark drawn with SVG, so the block has no image dependencies.
const HalcyonLogo = () => (
    <span className="flex items-center gap-2 text-slate-900 dark:text-white">
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2"/>
            <circle cx="12" cy="12" r="5" fill="currentColor"/>
        </svg>
        <span className="text-xl font-semibold tracking-tight">Halcyon Health</span>
    </span>
);

const FeaturedQuoteExample = () => (
    <FeaturedQuote
        quote={quote}
        author={author}
        logo={<HalcyonLogo/>}
        metrics={metrics}
        link={{label: "Read the Halcyon case study", href: "#"}}
    />
);

export default FeaturedQuoteExample;

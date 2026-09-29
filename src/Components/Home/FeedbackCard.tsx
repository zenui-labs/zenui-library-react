
const sources = {
    product_hunt: {label: "Product Hunt", logo: "https://cdn.worldvectorlogo.com/logos/product-hunt.svg"},
    linkedin: {label: "LinkedIn", logo: "https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"},
    daily_dev: {label: "daily.dev", logo: "https://i.ibb.co.com/hLZFKK2/unnamed.png"},
};

const FeedbackCard = ({feedback}) => {
    const source = sources[feedback?.source];

    return (
        <figure className="rounded-2xl border border-hairline bg-surface p-5">
            <blockquote className="whitespace-pre-line text-[0.92rem] leading-relaxed text-ink-muted">
                {feedback?.review}
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
                <img src={feedback?.avatar} alt="" loading="lazy" className="size-9 rounded-full object-cover ring-1 ring-hairline"/>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.85rem] font-medium text-ink">{feedback?.name}</p>
                    {source && <p className="text-[0.75rem] text-ink-subtle">via {source.label}</p>}
                </div>
                {source && <img src={source.logo} alt="" loading="lazy" className="size-4 rounded-full opacity-70"/>}
            </figcaption>
        </figure>
    );
};

export default FeedbackCard;

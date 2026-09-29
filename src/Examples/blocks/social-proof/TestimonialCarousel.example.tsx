import {TestimonialCarousel, type CarouselTestimonial} from "./TestimonialCarousel";

const testimonials: CarouselTestimonial[] = [
    {
        name: "Aisha Bello",
        role: "VP of Growth",
        company: "Northbeam",
        quote: "We ran more experiments in the first quarter than in the whole previous year. The difference was that product managers could launch a test without waiting for an engineer.",
        metric: "4.2x",
        metricLabel: "more experiments per quarter",
        initials: "AB",
        avatar: "from-orange-400 to-rose-500",
    },
    {
        name: "Jonas Lindqvist",
        role: "Staff Engineer",
        company: "Parcelly",
        quote: "Flags evaluate locally in under a millisecond and the SDK never blocks a request. We removed our homegrown system in a week and nobody on call has noticed a thing since.",
        metric: "0.4 ms",
        metricLabel: "median flag evaluation",
        initials: "JL",
        avatar: "from-sky-400 to-indigo-500",
    },
    {
        name: "Carmen Ruiz",
        role: "Director of Product",
        company: "Halcyon Health",
        quote: "Every rollout now has a kill switch and an owner. When a release misbehaved on Android last spring we turned it off for 3% of users in seconds, not hours.",
        metric: "11 sec",
        metricLabel: "to roll back a bad release",
        initials: "CR",
        avatar: "from-emerald-400 to-teal-500",
    },
    {
        name: "Wei Chen",
        role: "Head of Data",
        company: "Quillo",
        quote: "The stats engine explains its results in plain language. Our analysts stopped rebuilding every test in a notebook just to trust the numbers.",
        metric: "31%",
        metricLabel: "lift in checkout conversion",
        initials: "WC",
        avatar: "from-fuchsia-400 to-violet-500",
    },
];

const TestimonialCarouselExample = () => <TestimonialCarousel testimonials={testimonials}/>;

export default TestimonialCarouselExample;

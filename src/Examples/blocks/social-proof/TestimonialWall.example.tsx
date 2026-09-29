import {TestimonialWall, type Testimonial} from "./TestimonialWall";

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

const TestimonialWallExample = () => (
    <TestimonialWall testimonials={testimonials} summary={{score: 4.9, caption: "from 2,300 reviews"}}/>
);

export default TestimonialWallExample;

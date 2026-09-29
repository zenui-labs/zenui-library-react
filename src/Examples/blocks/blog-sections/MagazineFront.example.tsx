import {MagazineFront, type MagazineStory, type MostReadRange, type NewsBrief} from "./MagazineFront";

const lead: MagazineStory = {
    slug: "grid-batteries",
    kicker: "Energy",
    title: "The quiet race to build batteries the size of city blocks",
    dek: "Utilities in Texas and South Australia now store more solar power than they did in all of 2023. We visited three of the largest sites to see what comes next.",
    author: "Hannah Okafor",
    minutes: 14,
    art: "grid",
    tone: "from-amber-300 via-orange-400 to-rose-500",
};

const secondary: MagazineStory[] = [
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

const mostRead: MostReadRange[] = [
    {
        id: "today",
        label: "Today",
        stories: [
            {slug: "chip-tariffs", kicker: "Business", title: "What the new chip tariffs mean for laptop prices"},
            {slug: "four-hour-rule", kicker: "Work", title: "The four hour rule for meetings, one year in"},
            {slug: "sourdough", kicker: "Food", title: "Why your sourdough starter smells like nail polish"},
            {slug: "rent-data", kicker: "Cities", title: "Rents fell in 31 of the 50 largest US metros"},
        ],
    },
    {
        id: "week",
        label: "This week",
        stories: [
            {slug: "grid-batteries", kicker: "Energy", title: "The quiet race to build batteries the size of city blocks"},
            {slug: "moon-dust", kicker: "Science", title: "Moon dust is sharper than anyone planned for"},
            {slug: "night-trains", kicker: "Travel", title: "Night trains are back, and they are fully booked"},
            {slug: "ai-tutors", kicker: "Education", title: "Inside a school where every student has an AI tutor"},
        ],
    },
];

const briefs: NewsBrief[] = [
    {slug: "heat-pumps", kicker: "Homes", title: "Heat pump sales pass gas furnaces for the third year", time: "2h ago"},
    {slug: "ferry", kicker: "Cities", title: "Oslo puts its first electric car ferry into service", time: "4h ago"},
    {slug: "wheat", kicker: "Markets", title: "Wheat futures drop after a record Argentine harvest", time: "5h ago"},
    {slug: "museum", kicker: "Culture", title: "The Met returns 14 bronzes to Nigeria", time: "7h ago"},
];

const MagazineFrontExample = () => (
    <MagazineFront
        lead={lead}
        secondary={secondary}
        mostRead={mostRead}
        briefs={briefs}
        dateline="Tuesday, September 29, 2026"
    />
);

export default MagazineFrontExample;

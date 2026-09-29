import {HorizontalScroll, type CaseStudy} from "./HorizontalScroll";

const studies: CaseStudy[] = [
    {client: "Tidewater Bank", title: "A mobile app for first time savers", metric: "+41%", metricLabel: "monthly active users", cover: "from-sky-400 via-cyan-300 to-emerald-300 dark:from-sky-700 dark:via-cyan-700 dark:to-emerald-700"},
    {client: "Oakline Health", title: "Booking a clinic visit in three taps", metric: "2.1 min", metricLabel: "average booking time", cover: "from-rose-400 via-orange-300 to-amber-200 dark:from-rose-700 dark:via-orange-700 dark:to-amber-700"},
    {client: "Parcel & Co", title: "Live tracking for 900 couriers", metric: "-27%", metricLabel: "where is my order tickets", cover: "from-violet-500 via-fuchsia-400 to-pink-300 dark:from-violet-800 dark:via-fuchsia-700 dark:to-pink-700"},
    {client: "Groundwork", title: "A design system for 14 product teams", metric: "320", metricLabel: "shared components", cover: "from-lime-300 via-emerald-400 to-teal-500 dark:from-lime-700 dark:via-emerald-700 dark:to-teal-800"},
    {client: "Northstar Air", title: "Rebooking flights during delays", metric: "4.8", metricLabel: "App Store rating", cover: "from-indigo-500 via-blue-400 to-sky-300 dark:from-indigo-800 dark:via-blue-700 dark:to-sky-700"},
];

const HorizontalScrollExample = () => <HorizontalScroll items={studies}/>;

export default HorizontalScrollExample;

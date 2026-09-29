import {TeamProfileExpand, type Member} from "./TeamProfileExpand";

const members: Member[] = [
    {
        id: "lena",
        name: "Lena Fischer",
        role: "Product designer",
        initials: "LF",
        tint: "from-rose-400 to-orange-400",
        location: "Berlin",
        localTime: "6:40 PM",
        status: "online",
        bio: "Leads checkout and payments design. Previously built the design system at a fintech in Munich.",
        stats: [{label: "Projects", value: "14"}, {label: "Reviews", value: "212"}, {label: "Joined", value: "2022"}],
        skills: ["Interaction design", "Prototyping", "Research"],
    },
    {
        id: "david",
        name: "David Okafor",
        role: "Staff engineer",
        initials: "DO",
        tint: "from-sky-400 to-indigo-500",
        location: "Lagos",
        localTime: "5:40 PM",
        status: "away",
        bio: "Owns the sync engine and the public API. Happy to pair on anything involving offline data.",
        stats: [{label: "Projects", value: "9"}, {label: "Reviews", value: "486"}, {label: "Joined", value: "2020"}],
        skills: ["TypeScript", "Postgres", "Distributed systems"],
    },
    {
        id: "sofia",
        name: "Sofía Márquez",
        role: "Engineering manager",
        initials: "SM",
        tint: "from-emerald-400 to-teal-500",
        location: "Mexico City",
        localTime: "10:40 AM",
        status: "online",
        bio: "Manages the platform team of eight. Runs the Thursday architecture review, open to anyone.",
        stats: [{label: "Reports", value: "8"}, {label: "Reviews", value: "131"}, {label: "Joined", value: "2021"}],
        skills: ["Hiring", "Planning", "Go"],
    },
    {
        id: "arjun",
        name: "Arjun Mehta",
        role: "Data analyst",
        initials: "AM",
        tint: "from-violet-400 to-fuchsia-500",
        location: "Pune",
        localTime: "10:10 PM",
        status: "offline",
        bio: "Builds the growth dashboards and runs experiment readouts. Ask him before you trust a funnel chart.",
        stats: [{label: "Dashboards", value: "37"}, {label: "Readouts", value: "58"}, {label: "Joined", value: "2023"}],
        skills: ["SQL", "Experiment design", "dbt"],
    },
];

const TeamProfileExpandExample = () => <TeamProfileExpand members={members} defaultValue="lena"/>;

export default TeamProfileExpandExample;

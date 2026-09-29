import {LeadershipBios, type Leader} from "./LeadershipBios";

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=600&h=750&fit=crop&crop=faces&q=75`;

const leaders: Leader[] = [
    {
        name: "Nadia Haddad", role: "Chief Executive Officer", photo: photo("1573496359142-b8d87734a5a2"), joined: "Co-founded 2019",
        summary: "Sets company strategy and spends a day a week with customers.",
        bio: [
            "Nadia started Meridian after six years running logistics for a grocery chain, where she watched planners rebuild the same forecast in spreadsheets every Monday.",
            "She leads strategy, fundraising and the customer advisory board, and still answers the first support ticket of every new enterprise account.",
        ],
        linkedin: "#",
        previously: ["VP Operations, FreshCart", "Supply chain analyst, Maersk"],
    },
    {
        name: "Daniel Okoro", role: "Chief Technology Officer", photo: photo("1507003211169-0a1dd7228f2d"), joined: "Co-founded 2019",
        summary: "Owns the forecasting engine, infrastructure and security.",
        bio: [
            "Daniel wrote the first version of the forecasting engine in a weekend and has rewritten it twice since, most recently to run 40 times faster on the same hardware.",
            "He leads 38 engineers across platform, data and security, and runs the monthly architecture review that anyone in the company can join.",
        ],
        linkedin: "#",
        previously: ["Staff engineer, Stripe", "Research engineer, Ocado"],
    },
    {
        name: "Mei Tanaka", role: "Chief Product Officer", photo: photo("1580489944761-15a19d654956"), joined: "Joined 2021",
        summary: "Leads product and design across planning and analytics.",
        bio: [
            "Mei joined from a design agency where she built tools for retail buyers. She introduced the weekly customer call rotation that every product manager now joins.",
            "Her team shipped scenario planning, which is now used by 70 percent of customers each week.",
        ],
        linkedin: "#",
        previously: ["Design director, Northbound Studio", "Product designer, Shopify"],
    },
    {
        name: "Samuel Reyes", role: "Chief Revenue Officer", photo: photo("1500648767791-00dcc994a43e"), joined: "Joined 2022",
        summary: "Runs sales, customer success and partnerships.",
        bio: [
            "Samuel built the sales team from four people to sixty and set up the partner program with three of the largest ERP resellers.",
            "He cares most about net retention, which has stayed above 120 percent for eight quarters.",
        ],
        linkedin: "#",
        previously: ["VP Sales, Linehaul", "Account director, Oracle NetSuite"],
    },
];

const LeadershipBiosExample = () => <LeadershipBios leaders={leaders}/>;

export default LeadershipBiosExample;

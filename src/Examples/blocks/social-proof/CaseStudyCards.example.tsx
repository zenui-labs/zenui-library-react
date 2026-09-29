import {CaseStudyCards, type CaseStudy} from "./CaseStudyCards";

const studies: CaseStudy[] = [
    {
        id: "ferrox",
        company: "Ferrox",
        industry: "Fintech",
        headline: "Ferrox cut card fraud losses while approving more legitimate payments",
        metric: "-48%",
        metricLabel: "fraud losses",
        secondary: "2.1 pt higher approval rate",
        tone: "from-sky-500 to-indigo-600",
        mark: "F",
    },
    {
        id: "halcyon",
        company: "Halcyon Health",
        industry: "Healthcare",
        headline: "How Halcyon moved 40 clinics to one scheduling system in a quarter",
        metric: "19 min",
        metricLabel: "saved per front desk shift",
        secondary: "HIPAA audit passed first time",
        tone: "from-emerald-500 to-teal-600",
        mark: "H",
    },
    {
        id: "arcadia",
        company: "Arcadia Goods",
        industry: "Retail",
        headline: "Arcadia doubled repeat purchases with personalized restock reminders",
        metric: "2.1x",
        metricLabel: "repeat purchase rate",
        secondary: "$4.3M added revenue",
        tone: "from-rose-500 to-orange-500",
        mark: "A",
    },
    {
        id: "parcelly",
        company: "Parcelly",
        industry: "Logistics",
        headline: "Parcelly reached 99.2% on time delivery during peak season",
        metric: "99.2%",
        metricLabel: "on time deliveries",
        secondary: "Across 1.4M December parcels",
        tone: "from-amber-500 to-yellow-500",
        mark: "P",
    },
    {
        id: "northbeam",
        company: "Northbeam Bank",
        industry: "Fintech",
        headline: "Northbeam opened accounts in minutes instead of days",
        metric: "6 min",
        metricLabel: "median account opening",
        secondary: "From 3 days before",
        tone: "from-violet-500 to-fuchsia-600",
        mark: "N",
    },
    {
        id: "brightline",
        company: "Brightline Pharmacy",
        industry: "Healthcare",
        headline: "Brightline answers refill questions before patients call",
        metric: "-37%",
        metricLabel: "inbound call volume",
        secondary: "4.8 average patient rating",
        tone: "from-cyan-500 to-blue-600",
        mark: "B",
    },
];

const CaseStudyCardsExample = () => <CaseStudyCards studies={studies}/>;

export default CaseStudyCardsExample;

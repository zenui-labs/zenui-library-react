import {NewsletterArchive, type NewsletterIssue} from "./NewsletterArchive";

const issues: NewsletterIssue[] = [
    {
        number: 142,
        date: "Sep 25, 2026",
        subject: "The case for fewer dashboards",
        preview: "Plus: a font made for tables, and the best writing on on-call this month.",
        intro: "This week I kept coming back to one question from a reader: how many dashboards does a 30 person team actually need? My answer is three. Here is how we got there, along with the links that shaped my thinking.",
        links: [
            {label: "Tabular figures and why your numbers wiggle", source: "typography.guide"},
            {label: "On-call without burnout, a year of data", source: "incident.io"},
            {label: "The metrics we deleted, and why", source: "posthog.com"},
        ],
        minutes: 6,
    },
    {
        number: 141,
        date: "Sep 18, 2026",
        subject: "What a good handoff doc looks like",
        preview: "A template I have used for eight years, and three that I stopped using.",
        intro: "Handoffs fail quietly. Nobody notices until the person who knew the answer is on vacation. Below is the one page template I give every new lead, with notes on each section.",
        links: [
            {label: "Writing for the reader who is in a hurry", source: "stripe.press"},
            {label: "Runbooks that people actually open", source: "increment.com"},
        ],
        minutes: 5,
    },
    {
        number: 140,
        date: "Sep 11, 2026",
        subject: "Pricing pages are product pages",
        preview: "Five teardowns, from Linear to Figma, and what they all get right.",
        intro: "I spent the week reading pricing pages so you do not have to. The common thread: the best ones answer who it is for before they say how much it costs.",
        links: [
            {label: "A teardown of 40 SaaS pricing pages", source: "growth.design"},
            {label: "Anchoring, explained with coffee", source: "behavioraleconomics.com"},
            {label: "Why we removed our free plan", source: "basecamp.com"},
        ],
        minutes: 8,
    },
    {
        number: 139,
        date: "Sep 4, 2026",
        subject: "Notes from a week without Slack",
        preview: "What broke, what did not, and the one habit I kept.",
        intro: "I turned off Slack for five working days and told my team to email me instead. Fewer things broke than I expected, and one thing got much better.",
        links: [{label: "The cost of interrupted work", source: "ics.uci.edu"}],
        minutes: 4,
    },
];

const NewsletterArchiveExample = () => (
    <NewsletterArchive issues={issues} badge="Every Thursday, 142 issues so far"/>
);

export default NewsletterArchiveExample;

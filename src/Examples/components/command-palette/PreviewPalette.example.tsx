import {PreviewPalette, type PreviewResult} from "./PreviewPalette";

const results: PreviewResult[] = [
    {
        kind: "doc",
        id: "onboarding",
        title: "Engineering onboarding",
        path: ["Handbook", "Engineering"],
        excerpt: "Your first week covers local setup, a pairing session with your buddy and a small starter issue that ships to production by Friday.",
        author: "Priya Nair",
        updated: "Updated 3 days ago",
        readTime: "6 min read",
    },
    {
        kind: "doc",
        id: "incident",
        title: "Incident response runbook",
        path: ["Handbook", "Operations"],
        excerpt: "Page the on-call engineer, open an incident channel and post a status update every 30 minutes until the issue is resolved.",
        author: "Ravi Kapoor",
        updated: "Updated last week",
        readTime: "9 min read",
    },
    {
        kind: "doc",
        id: "roadmap",
        title: "Q4 product roadmap",
        path: ["Product", "Planning"],
        excerpt: "Three themes this quarter: faster search, offline support in the mobile app and a new billing page for team plans.",
        author: "Aisha Bello",
        updated: "Updated yesterday",
        readTime: "4 min read",
    },
    {kind: "person", id: "maya", title: "Maya Chen", role: "Product designer", team: "Design systems", localTime: "10:42 AM in Toronto", status: "In a meeting until 11:30"},
    {kind: "person", id: "diego", title: "Diego Ramos", role: "Frontend engineer", team: "Web platform", localTime: "4:42 PM in Madrid", status: "Available"},
    {
        kind: "channel",
        id: "design-crit",
        title: "design-crit",
        topic: "Share work in progress and get feedback every Thursday",
        members: 38,
        lastMessage: {author: "Sofia Rossi", text: "Posted the new empty states, comments welcome before 3pm.", time: "12m ago"},
    },
    {
        kind: "channel",
        id: "releases",
        title: "releases",
        topic: "Release notes and deploy announcements",
        members: 214,
        lastMessage: {author: "Tom Becker", text: "Version 4.18 is rolling out to 25% of workspaces.", time: "1h ago"},
    },
];

const PreviewPaletteExample = () => <PreviewPalette results={results}/>;

export default PreviewPaletteExample;

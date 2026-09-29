import {BlogGrid, type BlogPost} from "./BlogGrid";

const posts: BlogPost[] = [
    {
        slug: "postgres-queue",
        topic: "Engineering",
        title: "We replaced our job queue with a Postgres table",
        excerpt: "Three years, 2 billion jobs and one very long migration later, here is what we learned about SKIP LOCKED and why we are not going back.",
        author: "Nadia Patel",
        date: "Sep 18, 2026",
        readMinutes: 12,
        cover: {from: "from-indigo-500", to: "to-sky-400", shape: "bars"},
    },
    {
        slug: "empty-states",
        topic: "Design",
        title: "Designing empty states people actually read",
        excerpt: "Most empty states explain the feature. The good ones give you one thing to do next.",
        author: "Leo Martins",
        date: "Sep 9, 2026",
        readMinutes: 6,
        cover: {from: "from-amber-400", to: "to-rose-500", shape: "circles"},
    },
    {
        slug: "four-day-week",
        topic: "Company",
        title: "One year of the four day week",
        excerpt: "What happened to shipping speed, support response times and hiring after we moved to Monday through Thursday.",
        author: "Grace Kim",
        date: "Aug 28, 2026",
        readMinutes: 8,
        cover: {from: "from-emerald-400", to: "to-teal-600", shape: "wave"},
    },
    {
        slug: "flaky-tests",
        topic: "Engineering",
        title: "How we found 214 flaky tests in a weekend",
        excerpt: "A small script, a lot of CI minutes and a leaderboard nobody wanted to top.",
        author: "Omar Haddad",
        date: "Aug 14, 2026",
        readMinutes: 7,
        cover: {from: "from-fuchsia-500", to: "to-violet-600", shape: "circles"},
    },
    {
        slug: "type-scale",
        topic: "Design",
        title: "A type scale for dense dashboards",
        excerpt: "Why we dropped to a 13 pixel base size and added a fourth weight.",
        author: "Leo Martins",
        date: "Jul 30, 2026",
        readMinutes: 5,
        cover: {from: "from-slate-700", to: "to-slate-500", shape: "bars"},
    },
];

const BlogGridExample = () => (
    <BlogGrid
        posts={posts}
        topics={["Engineering", "Design", "Company"]}
        viewAllLabel="View all 86 posts"
    />
);

export default BlogGridExample;

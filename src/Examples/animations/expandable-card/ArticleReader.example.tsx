import {ArticleReader, type Article} from "./ArticleReader";

const articles: Article[] = [
    {
        id: "edge-search",
        category: "Engineering",
        title: "Why we moved search to the edge",
        excerpt: "Median search latency went from 180 ms to 38 ms. Here is what it took and what we would do differently.",
        author: "Ines Duarte",
        initials: "ID",
        minutes: 6,
        cover: "from-cyan-400 via-sky-500 to-indigo-600",
        body: [
            "For three years our search ran in one region. Customers in Sydney and São Paulo waited on a round trip across an ocean for every keystroke, and it showed in the numbers: people outside North America searched 40% less.",
            "We started by measuring where the time went. Only a quarter of it was the query itself. The rest was network, TLS setup and a cold cache that rarely helped anyone outside our home region.",
            "The fix was not a faster database. We split the index into a small, hot shard with the most searched documents and a long tail that stays central. The hot shard is replicated to 14 edge locations and answers about 85% of queries on its own.",
            "Keeping replicas fresh was the hard part. We moved from nightly rebuilds to a change stream, so an edit reaches every edge location in under four seconds. Stale results are now rare enough that we alert on them.",
            "If we did it again, we would have measured per-region search volume from day one. The drop outside North America was visible for years; we simply were not looking at it.",
        ],
    },
    {
        id: "support-calls",
        category: "Research",
        title: "What 400 support calls taught us about onboarding",
        excerpt: "Most new teams got stuck on the same two screens. Fixing them cut first-week support tickets by a third.",
        author: "Theo Brandt",
        initials: "TB",
        minutes: 5,
        cover: "from-amber-300 via-orange-400 to-rose-500",
        body: [
            "Over six weeks, we listened to 400 recorded support calls from teams in their first week. We tagged every moment someone sounded unsure, and two screens came up again and again.",
            "The first was workspace setup. We asked for a URL slug before people knew what it was for. Moving that step to after the first project, with a sensible default, removed a whole category of calls.",
            "The second was inviting teammates. People expected an invite link; we only offered email invites. Adding a link that expires after seven days was a two-day change.",
            "First-week tickets dropped by 34%, and teams that invite someone in their first hour are twice as likely to still be active a month later.",
        ],
    },
];

const ArticleReaderExample = () => <ArticleReader articles={articles}/>;

export default ArticleReaderExample;

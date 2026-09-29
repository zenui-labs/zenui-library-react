import {ArticleHeader, type ArticleAuthor, type ArticleSection, type Breadcrumb} from "./ArticleHeader";

const breadcrumbs: Breadcrumb[] = [{label: "Blog"}, {label: "Data"}];

const authors: ArticleAuthor[] = [{name: "Aisha Siddiqui"}, {name: "Tomas Berg"}];

const sections: ArticleSection[] = [
    {
        id: "article-why",
        title: "Why we stopped trusting our dashboards",
        paragraphs: [
            "For two years, our conversion dashboard said checkout was fine. Support tickets said otherwise. The gap came down to a single event that fired twice on Safari and zero times when the payment sheet opened in a new tab.",
            "We did not have a data problem so much as a definitions problem. Nobody could say, in one sentence, what a completed checkout was.",
        ],
    },
    {
        id: "article-contract",
        title: "Writing the event contract",
        paragraphs: [
            "We wrote every event down in a single YAML file with an owner, a trigger, a schema and an example payload. Any event not in the file is dropped at the edge and reported to the owning team.",
            "The first version listed 312 events. After a week of pruning, 94 were left, and 11 of those had no owner willing to claim them.",
        ],
    },
    {
        id: "article-rollout",
        title: "Rolling it out without a freeze",
        paragraphs: [
            "We ran the old and new pipelines side by side for six weeks and diffed the daily totals. Any metric that drifted by more than half a percent opened a ticket automatically.",
        ],
    },
];

const ArticleHeaderExample = () => (
    <ArticleHeader
        title="We deleted 218 analytics events and our numbers got better"
        dek="How one YAML file, six weeks of side by side pipelines and a lot of polite arguments gave us a checkout funnel we can finally trust."
        breadcrumbs={breadcrumbs}
        authors={authors}
        date="Sep 22, 2026"
        dateTime="2026-09-22"
        readMinutes={11}
        sections={sections}
    />
);

export default ArticleHeaderExample;

import type {Example} from "../../types.ts";
import BlogGrid from "./BlogGrid.example.tsx";
import blogGridSource from "./BlogGrid.example.tsx?raw";
import blogGridComponentSource from "./BlogGrid.tsx?raw";
import ChangelogTimeline from "./ChangelogTimeline.example.tsx";
import changelogTimelineSource from "./ChangelogTimeline.example.tsx?raw";
import changelogTimelineComponentSource from "./ChangelogTimeline.tsx?raw";
import MagazineFront from "./MagazineFront.example.tsx";
import magazineFrontSource from "./MagazineFront.example.tsx?raw";
import magazineFrontComponentSource from "./MagazineFront.tsx?raw";
import BlogListSidebar from "./BlogListSidebar.example.tsx";
import blogListSidebarSource from "./BlogListSidebar.example.tsx?raw";
import blogListSidebarComponentSource from "./BlogListSidebar.tsx?raw";
import MinimalArchive from "./MinimalArchive.example.tsx";
import minimalArchiveSource from "./MinimalArchive.example.tsx?raw";
import minimalArchiveComponentSource from "./MinimalArchive.tsx?raw";
import ArticleHeader from "./ArticleHeader.example.tsx";
import articleHeaderSource from "./ArticleHeader.example.tsx?raw";
import articleHeaderComponentSource from "./ArticleHeader.tsx?raw";
import RelatedPostsRow from "./RelatedPostsRow.example.tsx";
import relatedPostsRowSource from "./RelatedPostsRow.example.tsx?raw";
import relatedPostsRowComponentSource from "./RelatedPostsRow.tsx?raw";
import NewsletterArchive from "./NewsletterArchive.example.tsx";
import newsletterArchiveSource from "./NewsletterArchive.example.tsx?raw";
import newsletterArchiveComponentSource from "./NewsletterArchive.tsx?raw";

const examples: Example[] = [
    {
        id: "blog-grid",
        title: "Blog grid with featured post",
        description: "A featured article above a grid of post cards with generated cover art and topic filters. Use it for a blog index or a resources page.",
        component: BlogGrid,
        source: blogGridSource,
        files: [{name: "BlogGrid.tsx", source: blogGridComponentSource}],
        layout: "full",
        minHeight: 820,
    },
    {
        id: "changelog-timeline",
        title: "Changelog timeline",
        description: "Releases on a vertical timeline with version, date and labeled changes, plus an email subscribe form. Use it for a public changelog or release notes page.",
        component: ChangelogTimeline,
        source: changelogTimelineSource,
        files: [{name: "ChangelogTimeline.tsx", source: changelogTimelineComponentSource}],
        layout: "full",
        minHeight: 640,
    },
    {
        id: "magazine-front",
        title: "Magazine front page",
        description: "An editorial layout with a lead story, two secondary stories, a most read list you can switch between today and this week, and a row of news briefs. Use it for publications with many sections.",
        component: MagazineFront,
        source: magazineFrontSource,
        files: [{name: "MagazineFront.tsx", source: magazineFrontComponentSource}],
        layout: "full",
        minHeight: 900,
    },
    {
        id: "list-with-sidebar",
        title: "Post list with category sidebar",
        description: "A dated list of posts with a sticky sidebar for search, categories with counts, topic tags and a newsletter signup. Includes an empty search state and a load more button.",
        component: BlogListSidebar,
        source: blogListSidebarSource,
        files: [{name: "BlogListSidebar.tsx", source: blogListSidebarComponentSource}],
        layout: "full",
        minHeight: 900,
    },
    {
        id: "minimal-archive",
        title: "Minimal text archive",
        description: "A text-only writing archive grouped by year, with monospaced dates and a filter for essays, notes and talks. Suits a personal site or an engineering blog.",
        component: MinimalArchive,
        source: minimalArchiveSource,
        files: [{name: "MinimalArchive.tsx", source: minimalArchiveComponentSource}],
        layout: "full",
        minHeight: 760,
    },
    {
        id: "article-header",
        title: "Article header with reading progress",
        description: "The top of an article page with breadcrumbs, co-authors, reading time, copy link and save actions, a reading progress bar and a table of contents that tracks the current section.",
        component: ArticleHeader,
        source: articleHeaderSource,
        files: [{name: "ArticleHeader.tsx", source: articleHeaderComponentSource}],
        layout: "full",
        minHeight: 900,
    },
    {
        id: "related-posts-row",
        title: "Related posts carousel",
        description: "A scroll-snapping row of related posts with previous and next buttons, a position indicator and a save toggle on each card. Place it at the end of an article.",
        component: RelatedPostsRow,
        source: relatedPostsRowSource,
        files: [{name: "RelatedPostsRow.tsx", source: relatedPostsRowComponentSource}],
        layout: "full",
        minHeight: 520,
    },
    {
        id: "newsletter-archive",
        title: "Newsletter archive",
        description: "Past issues in a list next to an email-style preview of the selected issue, with arrow key browsing and a subscribe form with validation and a confirmation state.",
        component: NewsletterArchive,
        source: newsletterArchiveSource,
        files: [{name: "NewsletterArchive.tsx", source: newsletterArchiveComponentSource}],
        layout: "full",
        minHeight: 820,
    },
];

export default examples;

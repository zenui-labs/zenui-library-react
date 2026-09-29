import {RelatedPostsRow, type RelatedPost} from "./RelatedPostsRow";

const posts: RelatedPost[] = [
    {slug: "edge-caching", tag: "Performance", title: "Caching at the edge without serving stale prices", author: "Ines Duarte", minutes: 9, hue: "from-sky-500 to-cyan-400", glyph: "stack"},
    {slug: "feature-flags", tag: "Process", title: "Feature flags are a debt you pay monthly", author: "Karim Aziz", minutes: 6, hue: "from-rose-500 to-orange-400", glyph: "zig"},
    {slug: "search-relevance", tag: "Search", title: "Tuning search relevance with 40 hand labeled queries", author: "Mei Tanaka", minutes: 12, hue: "from-violet-600 to-indigo-400", glyph: "dots"},
    {slug: "accessibility-audit", tag: "Accessibility", title: "What we fixed after our first accessibility audit", author: "Sam Oduya", minutes: 8, hue: "from-emerald-500 to-lime-400", glyph: "arc"},
    {slug: "cost-per-request", tag: "Infrastructure", title: "Pricing every API request to the tenth of a cent", author: "Ines Duarte", minutes: 10, hue: "from-amber-500 to-yellow-300", glyph: "stack"},
    {slug: "design-tokens", tag: "Design systems", title: "Three years of design tokens, and what we would redo", author: "Lucas Petit", minutes: 7, hue: "from-fuchsia-600 to-pink-400", glyph: "arc"},
];

const RelatedPostsRowExample = () => <RelatedPostsRow posts={posts} defaultSavedSlugs={["search-relevance"]}/>;

export default RelatedPostsRowExample;

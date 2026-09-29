import type {Example} from "../../types.ts";
import TestimonialWall from "./TestimonialWall.example.tsx";
import testimonialWallSource from "./TestimonialWall.example.tsx?raw";
import testimonialWallComponentSource from "./TestimonialWall.tsx?raw";
import LogoCloudStats from "./LogoCloudStats.example.tsx";
import logoCloudStatsSource from "./LogoCloudStats.example.tsx?raw";
import logoCloudStatsComponentSource from "./LogoCloudStats.tsx?raw";
import TestimonialCarousel from "./TestimonialCarousel.example.tsx";
import testimonialCarouselSource from "./TestimonialCarousel.example.tsx?raw";
import testimonialCarouselComponentSource from "./TestimonialCarousel.tsx?raw";
import FeaturedQuote from "./FeaturedQuote.example.tsx";
import featuredQuoteSource from "./FeaturedQuote.example.tsx?raw";
import featuredQuoteComponentSource from "./FeaturedQuote.tsx?raw";
import LogoMarqueeRows from "./LogoMarqueeRows.example.tsx";
import logoMarqueeRowsSource from "./LogoMarqueeRows.example.tsx?raw";
import logoMarqueeRowsComponentSource from "./LogoMarqueeRows.tsx?raw";
import CaseStudyCards from "./CaseStudyCards.example.tsx";
import caseStudyCardsSource from "./CaseStudyCards.example.tsx?raw";
import caseStudyCardsComponentSource from "./CaseStudyCards.tsx?raw";
import ReviewSummary from "./ReviewSummary.example.tsx";
import reviewSummarySource from "./ReviewSummary.example.tsx?raw";
import reviewSummaryComponentSource from "./ReviewSummary.tsx?raw";
import SocialPostGrid from "./SocialPostGrid.example.tsx";
import socialPostGridSource from "./SocialPostGrid.example.tsx?raw";
import socialPostGridComponentSource from "./SocialPostGrid.tsx?raw";

const examples: Example[] = [
    {
        id: "testimonial-wall",
        title: "Testimonial wall",
        description: "A masonry wall of customer quotes with ratings and one highlighted review. It starts collapsed and expands to show every review.",
        component: TestimonialWall,
        source: testimonialWallSource,
        files: [{name: "TestimonialWall.tsx", source: testimonialWallComponentSource}],
        layout: "full",
        minHeight: 760,
    },
    {
        id: "logo-cloud-stats",
        title: "Logo cloud with stats",
        description: "A scrolling row of customer logos above a four-part stats band. Use it right below a hero to show who uses the product and at what scale.",
        component: LogoCloudStats,
        source: logoCloudStatsSource,
        files: [{name: "LogoCloudStats.tsx", source: logoCloudStatsComponentSource}],
        layout: "full",
        minHeight: 420,
    },
    {
        id: "testimonial-carousel",
        title: "Testimonial carousel",
        description: "One story at a time with a headline metric, company tabs with a progress bar, and autoplay that pauses on hover, focus or when off screen. Use it when a few detailed stories matter more than many short quotes.",
        component: TestimonialCarousel,
        source: testimonialCarouselSource,
        files: [{name: "TestimonialCarousel.tsx", source: testimonialCarouselComponentSource}],
        layout: "full",
        minHeight: 720,
    },
    {
        id: "featured-quote",
        title: "Featured quote",
        description: "A single large quote from a named customer, revealed word by word, next to a card of measured results. Use it between sections of a landing page or at the top of an enterprise page.",
        component: FeaturedQuote,
        source: featuredQuoteSource,
        files: [{name: "FeaturedQuote.tsx", source: featuredQuoteComponentSource}],
        layout: "full",
        minHeight: 640,
    },
    {
        id: "logo-marquee-rows",
        title: "Logo marquee rows",
        description: "Three rows of customer logos grouped by industry, moving in opposite directions with a pause button and a static grid for reduced motion. Use it when the list of customers is long enough to be the message.",
        component: LogoMarqueeRows,
        source: logoMarqueeRowsSource,
        files: [{name: "LogoMarqueeRows.tsx", source: logoMarqueeRowsComponentSource}],
        layout: "full",
        minHeight: 520,
    },
    {
        id: "case-study-cards",
        title: "Case study cards",
        description: "Cards with a headline metric per customer and an industry filter that animates the grid. Use it on a customers page or as the entry point to longer case studies.",
        component: CaseStudyCards,
        source: caseStudyCardsSource,
        files: [{name: "CaseStudyCards.tsx", source: caseStudyCardsComponentSource}],
        layout: "full",
        minHeight: 860,
    },
    {
        id: "review-summary",
        title: "Ratings summary with reviews",
        description: "An average score, rating bars that filter the list, aspect scores, sorting and helpful votes. Use it where buyers compare products and expect to see the critical reviews too.",
        component: ReviewSummary,
        source: reviewSummarySource,
        files: [{name: "ReviewSummary.tsx", source: reviewSummaryComponentSource}],
        layout: "full",
        minHeight: 900,
    },
    {
        id: "social-post-grid",
        title: "Social post cards",
        description: "Posts from customers in a masonry grid with highlighted mentions and tags and a working like button. Use it for developer tools and communities where public praise carries weight.",
        component: SocialPostGrid,
        source: socialPostGridSource,
        files: [{name: "SocialPostGrid.tsx", source: socialPostGridComponentSource}],
        layout: "full",
        minHeight: 860,
    },
];

export default examples;

import type {Example} from "../../types.ts";
import ReadingProgress from "./ReadingProgress.example.tsx";
import readingProgressSource from "./ReadingProgress.example.tsx?raw";
import ScrollWordReveal from "./ScrollWordReveal.example.tsx";
import scrollWordRevealSource from "./ScrollWordReveal.example.tsx?raw";
import StickySteps from "./StickySteps.example.tsx";
import stickyStepsSource from "./StickySteps.example.tsx?raw";
import HorizontalScroll from "./HorizontalScroll.example.tsx";
import horizontalScrollSource from "./HorizontalScroll.example.tsx?raw";
import ParallaxLayers from "./ParallaxLayers.example.tsx";
import parallaxLayersSource from "./ParallaxLayers.example.tsx?raw";
import ZoomOnScroll from "./ZoomOnScroll.example.tsx";
import zoomOnScrollSource from "./ZoomOnScroll.example.tsx?raw";
import ScrollCountUp from "./ScrollCountUp.example.tsx";
import scrollCountUpSource from "./ScrollCountUp.example.tsx?raw";
import VelocityMarquee from "./VelocityMarquee.example.tsx";
import velocityMarqueeSource from "./VelocityMarquee.example.tsx?raw";

const examples: Example[] = [
    {
        id: "reading-progress",
        title: "Reading progress bar and ring",
        description: "A thin bar and a percentage ring fill as the article scrolls, with an estimate of the minutes left. Use it for blog posts, docs and long reports.",
        component: ReadingProgress,
        source: readingProgressSource,
        minHeight: 520,
    },
    {
        id: "scroll-word-reveal",
        title: "Scroll linked word reveal",
        description: "Each word of a paragraph fades from faint to full as it scrolls past, so the text reads at the pace of the scroll. Use it for manifestos and mission statements.",
        component: ScrollWordReveal,
        source: scrollWordRevealSource,
        minHeight: 500,
    },
    {
        id: "sticky-steps",
        title: "Sticky steps with swapping visuals",
        description: "A visual stays pinned while the steps scroll past, and changes to match the active step. Use it for onboarding tours and how it works sections.",
        component: StickySteps,
        source: stickyStepsSource,
        minHeight: 540,
    },
    {
        id: "horizontal-scroll",
        title: "Horizontal scroll section",
        description: "Scrolling down moves a row of case study cards sideways, with a counter and progress line. Use it for portfolios and product galleries.",
        component: HorizontalScroll,
        source: horizontalScrollSource,
        minHeight: 520,
    },
    {
        id: "parallax-layers",
        title: "Parallax layers",
        description: "Sun, ridges and headline sink at different speeds as the hero scrolls away, which gives the scene depth. The scene stays still with reduced motion.",
        component: ParallaxLayers,
        source: parallaxLayersSource,
        minHeight: 520,
    },
    {
        id: "zoom-on-scroll",
        title: "Zoom on scroll image",
        description: "A small photo grows to fill the frame while the headline splits apart, then a caption fades in. Use it for product stories and editorial features.",
        component: ZoomOnScroll,
        source: zoomOnScrollSource,
        minHeight: 520,
    },
    {
        id: "scroll-count-up",
        title: "Numbers that count with scroll",
        description: "Stats and bars move through five years of data as the panel scrolls, and count back down when scrolling up. Use it for annual reviews and investor pages.",
        component: ScrollCountUp,
        source: scrollCountUpSource,
        minHeight: 520,
    },
    {
        id: "velocity-marquee",
        title: "Scroll velocity marquee",
        description: "Two rows of type drift on their own, speed up and lean with fast scrolling, and reverse when scrolling up. The rows pause off screen and with reduced motion.",
        component: VelocityMarquee,
        source: velocityMarqueeSource,
        minHeight: 520,
    },
];

export default examples;

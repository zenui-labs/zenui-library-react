import type {Example} from "../../types.ts";
import ArrowCarousel from "./ArrowCarousel.example.tsx";
import arrowCarouselSource from "./ArrowCarousel.example.tsx?raw";
import arrowCarouselComponentSource from "./ArrowCarousel.tsx?raw";
import AutoplayCarousel from "./AutoplayCarousel.example.tsx";
import autoplayCarouselSource from "./AutoplayCarousel.example.tsx?raw";
import autoplayCarouselComponentSource from "./AutoplayCarousel.tsx?raw";
import FadingCarousel from "./FadingCarousel.example.tsx";
import fadingCarouselSource from "./FadingCarousel.example.tsx?raw";
import fadingCarouselComponentSource from "./FadingCarousel.tsx?raw";

const examples: Example[] = [
    {
        id: "normal-carousel",
        title: "Carousel with arrows",
        description: "A carousel with previous and next arrows for moving between slides. It wraps around at both ends.",
        component: ArrowCarousel,
        source: arrowCarouselSource,
        files: [{name: "ArrowCarousel.tsx", source: arrowCarouselComponentSource}],
        minHeight: 480,
    },
    {
        id: "second-carousel",
        title: "Autoplay carousel",
        description: "A carousel that moves to the next slide on a timer. The arrows still work, and the timer pauses on hover or focus.",
        component: AutoplayCarousel,
        source: autoplayCarouselSource,
        files: [{name: "AutoplayCarousel.tsx", source: autoplayCarouselComponentSource}],
        minHeight: 480,
    },
    {
        id: "fading-carousel",
        title: "Fading carousel",
        description: "A carousel that changes slides on its own and fades slowly from one image to the next.",
        component: FadingCarousel,
        source: fadingCarouselSource,
        files: [{name: "FadingCarousel.tsx", source: fadingCarouselComponentSource}],
        minHeight: 480,
    },
];

export default examples;

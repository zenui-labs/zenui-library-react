import type {Example} from "../../types.ts";
import DestinationSlider from "./DestinationSlider.example.tsx";
import destinationSliderSource from "./DestinationSlider.example.tsx?raw";
import destinationSliderComponentSource from "./DestinationSlider.tsx?raw";

const examples: Example[] = [
    {
        // Kept from the old page so existing links still land here.
        id: "responsive_footer_1",
        title: "Cube hero slider",
        description: "A hero slider built with Swiper that turns between slides with a cube effect, with autoplay, arrows and pagination dots.",
        component: DestinationSlider,
        source: destinationSliderSource,
        files: [{name: "DestinationSlider.tsx", source: destinationSliderComponentSource}],
        minHeight: 640,
    },
];

export default examples;

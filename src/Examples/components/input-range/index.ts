import type {Example} from "../../types.ts";
import RangeSlider from "./RangeSlider.example.tsx";
import rangeSliderSource from "./RangeSlider.example.tsx?raw";
import rangeSliderComponentSource from "./RangeSlider.tsx?raw";
import BreakpointSlider from "./BreakpointSlider.example.tsx";
import breakpointSliderSource from "./BreakpointSlider.example.tsx?raw";
import breakpointSliderComponentSource from "./BreakpointSlider.tsx?raw";

const examples: Example[] = [
    {
        id: "slider",
        title: "Slider",
        description: "A slider with a filled track and a draggable handle for choosing a value. Clicking the track or using the arrow keys also works.",
        component: RangeSlider,
        source: rangeSliderSource,
        files: [{name: "RangeSlider.tsx", source: rangeSliderComponentSource}],
    },
    {
        id: "breakpoint_range_slider",
        title: "Breakpoint range slider",
        description: "A range slider that snaps to set breakpoints, for choices that only make sense at fixed intervals.",
        component: BreakpointSlider,
        source: breakpointSliderSource,
        files: [{name: "BreakpointSlider.tsx", source: breakpointSliderComponentSource}],
    },
];

export default examples;

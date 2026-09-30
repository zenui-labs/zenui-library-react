import type {Example} from "../../types.ts";
import MoodSlider from "./MoodSlider.example.tsx";
import moodSliderSource from "./MoodSlider.example.tsx?raw";
import moodSliderComponentSource from "./MoodSlider.tsx?raw";
import HarmonyWheel from "./HarmonyWheel.example.tsx";
import harmonyWheelSource from "./HarmonyWheel.example.tsx?raw";
import harmonyWheelComponentSource from "./HarmonyWheel.tsx?raw";
import RadialTimeRange from "./RadialTimeRange.example.tsx";
import radialTimeRangeSource from "./RadialTimeRange.example.tsx?raw";
import radialTimeRangeComponentSource from "./RadialTimeRange.tsx?raw";
import PatternLock from "./PatternLock.example.tsx";
import patternLockSource from "./PatternLock.example.tsx?raw";
import patternLockComponentSource from "./PatternLock.tsx?raw";
import EasingEditor from "./EasingEditor.example.tsx";
import easingEditorSource from "./EasingEditor.example.tsx?raw";
import easingEditorComponentSource from "./EasingEditor.tsx?raw";

const examples: Example[] = [
    {
        id: "mood-slider",
        title: "Mood slider",
        description: "A feedback slider with a drawn face whose brows, eyelids, mouth and cheeks change smoothly with the value. Works with the arrow keys, and the face stops leaning with reduced motion.",
        component: MoodSlider,
        source: moodSliderSource,
        files: [{name: "MoodSlider.tsx", source: moodSliderComponentSource}],
        minHeight: 480,
    },
    {
        id: "harmony-wheel",
        title: "Color harmony wheel",
        description: "Drag a handle around a color wheel and linked handles follow a complementary, analogous, triadic or split harmony. Each color shows its hex code with a copy button, and the arrow keys rotate the hue.",
        component: HarmonyWheel,
        source: harmonyWheelSource,
        files: [{name: "HarmonyWheel.tsx", source: harmonyWheelComponentSource}],
        minHeight: 560,
    },
    {
        id: "radial-time-range",
        title: "24-hour range ring",
        description: "Pick a time range on a 24-hour clock by dragging the start and end handles, or drag the arc to move both. Snaps to 5 minutes and both handles work with the arrow keys.",
        component: RadialTimeRange,
        source: radialTimeRangeSource,
        files: [{name: "RadialTimeRange.tsx", source: radialTimeRangeComponentSource}],
        minHeight: 560,
    },
    {
        id: "pattern-lock",
        title: "Pattern lock",
        description: "Draw through the dots to unlock. Dots you pass over in a straight line are added for you, a correct pattern pulses green and a wrong one shakes. It also works with arrow keys and Enter.",
        component: PatternLock,
        source: patternLockSource,
        files: [{name: "PatternLock.tsx", source: patternLockComponentSource}],
        minHeight: 560,
    },
    {
        id: "easing-editor",
        title: "Easing curve editor",
        description: "Shape a cubic-bezier curve by dragging two handles and watch it play on a loop. Pick a preset, nudge handles with the arrow keys and copy the CSS value.",
        component: EasingEditor,
        source: easingEditorSource,
        files: [{name: "EasingEditor.tsx", source: easingEditorComponentSource}],
        minHeight: 480,
    },
];

export default examples;

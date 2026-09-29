import type {Example} from "../../types.ts";
import SpoilerText from "./SpoilerText.example.tsx";
import spoilerTextSource from "./SpoilerText.example.tsx?raw";
import spoilerTextComponentSource from "./SpoilerText.tsx?raw";
import TextReveal from "./TextReveal.example.tsx";
import textRevealSource from "./TextReveal.example.tsx?raw";
import textRevealComponentSource from "./TextReveal.tsx?raw";
import ThreeDTransformText from "./ThreeDTransformText.example.tsx";
import threeDTransformTextSource from "./ThreeDTransformText.example.tsx?raw";
import threeDTransformTextComponentSource from "./ThreeDTransformText.tsx?raw";
import ScrambleText from "./ScrambleText.example.tsx";
import scrambleTextSource from "./ScrambleText.example.tsx?raw";
import scrambleTextComponentSource from "./ScrambleText.tsx?raw";
import WaveText from "./WaveText.example.tsx";
import waveTextSource from "./WaveText.example.tsx?raw";
import waveTextComponentSource from "./WaveText.tsx?raw";
import ThreeDRotationText from "./ThreeDRotationText.example.tsx";
import threeDRotationTextSource from "./ThreeDRotationText.example.tsx?raw";
import threeDRotationTextComponentSource from "./ThreeDRotationText.tsx?raw";
import MagneticText from "./MagneticText.example.tsx";
import magneticTextSource from "./MagneticText.example.tsx?raw";
import magneticTextComponentSource from "./MagneticText.tsx?raw";
import TypewriterText from "./TypewriterText.example.tsx";
import typewriterTextSource from "./TypewriterText.example.tsx?raw";
import typewriterTextComponentSource from "./TypewriterText.tsx?raw";
import FloatingText from "./FloatingText.example.tsx";
import floatingTextSource from "./FloatingText.example.tsx?raw";
import floatingTextComponentSource from "./FloatingText.tsx?raw";
import ElasticText from "./ElasticText.example.tsx";
import elasticTextSource from "./ElasticText.example.tsx?raw";
import elasticTextComponentSource from "./ElasticText.tsx?raw";

const examples: Example[] = [
    {
        id: "spoiler-text-animation",
        title: "Spoiler text animation",
        description: "Particles hide words until the reader clicks them, then scatter while the words wave into view. Use it for spoilers, answers and hidden details inside a sentence.",
        component: SpoilerText,
        source: spoilerTextSource,
        files: [{name: "SpoilerText.tsx", source: spoilerTextComponentSource}],
        minHeight: 360,
    },
    {
        id: "text-reveal-animation",
        title: "Text reveal animation",
        description: "Wipes text in from left to right while it fades in. Use it for headlines that should appear with a single smooth motion.",
        component: TextReveal,
        source: textRevealSource,
        files: [{name: "TextReveal.tsx", source: textRevealComponentSource}],
    },
    {
        id: "3d-transform-animation",
        title: "3D transform animation",
        description: "Each letter flips upright on the X axis from a large, blurred state, one after another.",
        component: ThreeDTransformText,
        source: threeDTransformTextSource,
        files: [{name: "ThreeDTransformText.tsx", source: threeDTransformTextComponentSource}],
    },
    {
        id: "text-scramble-animation",
        title: "Text scramble animation",
        description: "Letters cycle through random characters before they lock into the final text, for a glitch style reveal.",
        component: ScrambleText,
        source: scrambleTextSource,
        files: [{name: "ScrambleText.tsx", source: scrambleTextComponentSource}],
    },
    {
        id: "text-wave-animation",
        title: "Text wave animation",
        description: "Letters rise and fall in sequence, so a single wave runs through the text.",
        component: WaveText,
        source: waveTextSource,
        files: [{name: "WaveText.tsx", source: waveTextComponentSource}],
    },
    {
        id: "3d-rotation-animation",
        title: "3D rotation animation",
        description: "Letters swing forward on the X axis one after another until they face the reader, which adds depth to a heading.",
        component: ThreeDRotationText,
        source: threeDRotationTextSource,
        files: [{name: "ThreeDRotationText.tsx", source: threeDRotationTextComponentSource}],
    },
    {
        id: "magnetic-text-animation",
        title: "Magnetic text animation",
        description: "Letters spring up from below the line, overshoot a little and snap into place as if pulled by a magnet.",
        component: MagneticText,
        source: magneticTextSource,
        files: [{name: "MagneticText.tsx", source: magneticTextComponentSource}],
    },
    {
        id: "typewriter-animation",
        title: "Typewriter animation",
        description: "Types text out letter by letter behind a blinking cursor, then starts again after a short pause.",
        component: TypewriterText,
        source: typewriterTextSource,
        files: [{name: "TypewriterText.tsx", source: typewriterTextComponentSource}],
    },
    {
        id: "text-floating-animation",
        title: "Text floating animation",
        description: "Letters rise into place and bob gently a couple of times before they settle.",
        component: FloatingText,
        source: floatingTextSource,
        files: [{name: "FloatingText.tsx", source: floatingTextComponentSource}],
    },
    {
        id: "text-elastic-animation",
        title: "Text elastic animation",
        description: "Letters arrive squashed and stretched, then spring back to their normal shape like elastic.",
        component: ElasticText,
        source: elasticTextSource,
        files: [{name: "ElasticText.tsx", source: elasticTextComponentSource}],
    },
];

export default examples;

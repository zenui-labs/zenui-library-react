import type {Example} from "../../types.ts";
import FollowerRing from "./FollowerRing.example.tsx";
import followerRingSource from "./FollowerRing.example.tsx?raw";
import ContextCursor from "./ContextCursor.example.tsx";
import contextCursorSource from "./ContextCursor.example.tsx?raw";
import MagneticArea from "./MagneticArea.example.tsx";
import magneticAreaSource from "./MagneticArea.example.tsx?raw";
import SpotlightReveal from "./SpotlightReveal.example.tsx";
import spotlightRevealSource from "./SpotlightReveal.example.tsx?raw";
import ParticleTrail from "./ParticleTrail.example.tsx";
import particleTrailSource from "./ParticleTrail.example.tsx?raw";
import ImageTrail from "./ImageTrail.example.tsx";
import imageTrailSource from "./ImageTrail.example.tsx?raw";
import BlobCursor from "./BlobCursor.example.tsx";
import blobCursorSource from "./BlobCursor.example.tsx?raw";

const examples: Example[] = [
    {
        id: "follower-ring",
        title: "Dot and trailing ring",
        description: "A dot sits on the pointer while a ring follows on a spring, grows over links and squeezes on press. Use it for portfolios and personal sites.",
        component: FollowerRing,
        source: followerRingSource,
        minHeight: 420,
    },
    {
        id: "context-cursor",
        title: "Context aware cursor",
        description: "The cursor turns into a View badge over projects, a Drag pill over a draggable list, a ring over links and a caret over text. Elements opt in with a data attribute.",
        component: ContextCursor,
        source: contextCursorSource,
        minHeight: 560,
    },
    {
        id: "magnetic-area",
        title: "Magnetic buttons",
        description: "Buttons lean toward the pointer as it gets close, and their content leans a little further. One listener on the section drives every button.",
        component: MagneticArea,
        source: magneticAreaSource,
        minHeight: 420,
    },
    {
        id: "spotlight-reveal",
        title: "Spotlight reveal",
        description: "A soft circle follows the pointer and uncovers the finished design on top of its wireframe. A toggle shows the whole design for keyboard and touch users.",
        component: SpotlightReveal,
        source: spotlightRevealSource,
        minHeight: 560,
    },
    {
        id: "particle-trail",
        title: "Particle trail",
        description: "Colored particles fall from the pointer path, drift and fade on a canvas that only draws while particles are alive. Nothing is emitted with reduced motion.",
        component: ParticleTrail,
        source: particleTrailSource,
        minHeight: 400,
    },
    {
        id: "image-trail",
        title: "Image trail gallery",
        description: "Photos pop up along the pointer path and fall away a moment later. Use it for photographer, studio and archive landing pages.",
        component: ImageTrail,
        source: imageTrailSource,
        minHeight: 440,
    },
    {
        id: "blob-cursor",
        title: "Gooey blob cursor",
        description: "Three trailing circles melt into one blob that inverts the text beneath it and grows over the headline. Use it for bold agency and studio sites.",
        component: BlobCursor,
        source: blobCursorSource,
        minHeight: 440,
    },
];

export default examples;

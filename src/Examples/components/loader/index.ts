import type {Example} from "../../types.ts";
import CircleLoader from "./CircleLoader.example.tsx";
import circleLoaderSource from "./CircleLoader.example.tsx?raw";
import circleLoaderComponentSource from "./CircleLoader.tsx?raw";
import DashedLoader from "./DashedLoader.example.tsx";
import dashedLoaderSource from "./DashedLoader.example.tsx?raw";
import dashedLoaderComponentSource from "./DashedLoader.tsx?raw";
import OpacityLoader from "./OpacityLoader.example.tsx";
import opacityLoaderSource from "./OpacityLoader.example.tsx?raw";
import opacityLoaderComponentSource from "./OpacityLoader.tsx?raw";
import WaveLoader from "./WaveLoader.example.tsx";
import waveLoaderSource from "./WaveLoader.example.tsx?raw";
import waveLoaderComponentSource from "./WaveLoader.tsx?raw";
import ChaseLoader from "./ChaseLoader.example.tsx";
import chaseLoaderSource from "./ChaseLoader.example.tsx?raw";
import chaseLoaderComponentSource from "./ChaseLoader.tsx?raw";
import DotLoader from "./DotLoader.example.tsx";
import dotLoaderSource from "./DotLoader.example.tsx?raw";
import dotLoaderComponentSource from "./DotLoader.tsx?raw";
import ShapeLoader from "./ShapeLoader.example.tsx";
import shapeLoaderSource from "./ShapeLoader.example.tsx?raw";
import shapeLoaderComponentSource from "./ShapeLoader.tsx?raw";
import FlipLoader from "./FlipLoader.example.tsx";
import flipLoaderSource from "./FlipLoader.example.tsx?raw";
import flipLoaderComponentSource from "./FlipLoader.tsx?raw";

const examples: Example[] = [
    {
        id: "circle_loader",
        title: "Circle loader",
        description: "A spinning ring with one colored arc, or any loader icon set to spin. Use it for buttons, cards and short waits.",
        component: CircleLoader,
        source: circleLoaderSource,
        files: [{name: "CircleLoader.tsx", source: circleLoaderComponentSource}],
    },
    {
        id: "dashed_loader",
        title: "Dashed loader",
        description: "A thick dashed ring that spins while content loads.",
        component: DashedLoader,
        source: dashedLoaderSource,
        files: [{name: "DashedLoader.tsx", source: dashedLoaderComponentSource}],
    },
    {
        id: "opacity_loader",
        title: "Opacity loader",
        description: "Two nested rings that grow and fade out, a quiet way to show that something is loading.",
        component: OpacityLoader,
        source: opacityLoaderSource,
        files: [{name: "OpacityLoader.tsx", source: opacityLoaderComponentSource}],
    },
    {
        id: "wave_loader",
        title: "Wave loader",
        description: "Bars arranged in a circle push outward one after another, so a wave runs around the ring.",
        component: WaveLoader,
        source: waveLoaderSource,
        files: [{name: "WaveLoader.tsx", source: waveLoaderComponentSource}],
    },
    {
        id: "chase_loader",
        title: "Chase loader",
        description: "Two dots orbit the same ring half a second apart, so one chases the other while content loads.",
        component: ChaseLoader,
        source: chaseLoaderSource,
        files: [{name: "ChaseLoader.tsx", source: chaseLoaderComponentSource}],
    },
    {
        id: "dot_loader",
        title: "Dot loader",
        description: "Four dots in a cross turn together with a short pause between turns.",
        component: DotLoader,
        source: dotLoaderSource,
        files: [{name: "DotLoader.tsx", source: dotLoaderComponentSource}],
    },
    {
        id: "shape_loader",
        title: "Shape loader",
        description: "A circle splits into four corner pieces, turns a quarter and closes again while content loads.",
        component: ShapeLoader,
        source: shapeLoaderSource,
        files: [{name: "ShapeLoader.tsx", source: shapeLoaderComponentSource}],
    },
    {
        id: "flip_loader",
        title: "Flip loader",
        description: "A three by three grid of tiles that flip in one after another and fade out.",
        component: FlipLoader,
        source: flipLoaderSource,
        files: [{name: "FlipLoader.tsx", source: flipLoaderComponentSource}],
    },
];

export default examples;

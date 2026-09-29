import type {Example} from "../../types.ts";
import CircleSwitch from "./CircleSwitch.example.tsx";
import circleSwitchSource from "./CircleSwitch.example.tsx?raw";
import circleSwitchComponentSource from "./CircleSwitch.tsx?raw";
import SquareSwitch from "./SquareSwitch.example.tsx";
import squareSwitchSource from "./SquareSwitch.example.tsx?raw";
import squareSwitchComponentSource from "./SquareSwitch.tsx?raw";
import AnimatedSwitch from "./AnimatedSwitch.example.tsx";
import animatedSwitchSource from "./AnimatedSwitch.example.tsx?raw";
import animatedSwitchComponentSource from "./AnimatedSwitch.tsx?raw";

const examples: Example[] = [
    {
        id: "circle_switch",
        title: "Circle switch",
        description: "A switch with a round thumb for turning an option on or off, in four sizes.",
        component: CircleSwitch,
        source: circleSwitchSource,
        files: [{name: "CircleSwitch.tsx", source: circleSwitchComponentSource}],
    },
    {
        id: "square_switch",
        title: "Square switch",
        description: "A switch with a square thumb that turns a quarter turn as it slides, in four sizes.",
        component: SquareSwitch,
        source: squareSwitchSource,
        files: [{name: "SquareSwitch.tsx", source: squareSwitchComponentSource}],
    },
    {
        id: "animated_switch",
        title: "Animated switch",
        description: "A switch whose thumb stretches when pressed and then slides between its on and off states.",
        component: AnimatedSwitch,
        source: animatedSwitchSource,
        files: [{name: "AnimatedSwitch.tsx", source: animatedSwitchComponentSource}],
    },
];

export default examples;

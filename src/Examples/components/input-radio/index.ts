import type {Example} from "../../types.ts";
import CircleRadioGroup from "./CircleRadioGroup.example.tsx";
import circleRadioGroupSource from "./CircleRadioGroup.example.tsx?raw";
import circleRadioGroupComponentSource from "./CircleRadioGroup.tsx?raw";
import SquareRadioGroup from "./SquareRadioGroup.example.tsx";
import squareRadioGroupSource from "./SquareRadioGroup.example.tsx?raw";
import squareRadioGroupComponentSource from "./SquareRadioGroup.tsx?raw";

const examples: Example[] = [
    {
        id: "circle_radio",
        title: "Circle radio",
        description: "Circular radio buttons for choosing one option from a set. The dot grows in when an option is selected.",
        component: CircleRadioGroup,
        source: circleRadioGroupSource,
        files: [{name: "CircleRadioGroup.tsx", source: circleRadioGroupComponentSource}],
    },
    {
        id: "square_radio",
        title: "Square radio",
        description: "Square radio buttons with rounded corners for choosing one option from a set.",
        component: SquareRadioGroup,
        source: squareRadioGroupSource,
        files: [{name: "SquareRadioGroup.tsx", source: squareRadioGroupComponentSource}],
    },
];

export default examples;

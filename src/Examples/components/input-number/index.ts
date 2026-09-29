import type {Example} from "../../types.ts";
import MiniNumberInput from "./MiniNumberInput.example.tsx";
import miniNumberInputSource from "./MiniNumberInput.example.tsx?raw";
import miniNumberInputComponentSource from "./MiniNumberInput.tsx?raw";
import RoundedNumberInput from "./RoundedNumberInput.example.tsx";
import roundedNumberInputSource from "./RoundedNumberInput.example.tsx?raw";
import roundedNumberInputComponentSource from "./RoundedNumberInput.tsx?raw";
import PositionedNumberInput from "./PositionedNumberInput.example.tsx";
import positionedNumberInputSource from "./PositionedNumberInput.example.tsx?raw";
import positionedNumberInputComponentSource from "./PositionedNumberInput.tsx?raw";

const examples: Example[] = [
    {
        id: "mini_number_input",
        title: "Mini number input",
        description: "A compact number input with minus and plus buttons for entering small numeric values precisely.",
        component: MiniNumberInput,
        source: miniNumberInputSource,
        files: [{name: "MiniNumberInput.tsx", source: miniNumberInputComponentSource}],
    },
    {
        id: "rounded_button",
        title: "Rounded button",
        description: "A number input with round buttons for increasing or decreasing the value.",
        component: RoundedNumberInput,
        source: roundedNumberInputSource,
        files: [{name: "RoundedNumberInput.tsx", source: roundedNumberInputComponentSource}],
    },
    {
        id: "rounded_button_position",
        title: "Rounded button position",
        description: "A number input with both round buttons grouped on the left or the right of the field.",
        component: PositionedNumberInput,
        source: positionedNumberInputSource,
        files: [{name: "PositionedNumberInput.tsx", source: positionedNumberInputComponentSource}],
    },
];

export default examples;

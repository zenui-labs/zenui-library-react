import type {Example} from "../../types.ts";
import Checkbox from "./Checkbox.example.tsx";
import checkboxSource from "./Checkbox.example.tsx?raw";
import checkboxComponentSource from "./Checkbox.tsx?raw";
import AnimatedCheckbox from "./AnimatedCheckbox.example.tsx";
import animatedCheckboxSource from "./AnimatedCheckbox.example.tsx?raw";
import animatedCheckboxComponentSource from "./AnimatedCheckbox.tsx?raw";
import CheckboxGroup from "./CheckboxGroup.example.tsx";
import checkboxGroupSource from "./CheckboxGroup.example.tsx?raw";
import checkboxGroupComponentSource from "./CheckboxGroup.tsx?raw";

const examples: Example[] = [
    {
        id: "normal_checkbox",
        title: "Normal checkbox",
        description: "A standard checkbox for selecting or clearing an option.",
        component: Checkbox,
        source: checkboxSource,
        files: [{name: "Checkbox.tsx", source: checkboxComponentSource}],
    },
    {
        id: "animated_checkbox",
        title: "Animated checkbox",
        description: "A checkbox whose check mark scales and fades in when it is checked.",
        component: AnimatedCheckbox,
        source: animatedCheckboxSource,
        files: [{name: "AnimatedCheckbox.tsx", source: animatedCheckboxComponentSource}],
    },
    {
        id: "checkbox_group",
        title: "Checkbox group",
        description: "A group of checkboxes for choosing several options from a list. It returns every checked value.",
        component: CheckboxGroup,
        source: checkboxGroupSource,
        files: [{name: "CheckboxGroup.tsx", source: checkboxGroupComponentSource}],
    },
];

export default examples;

import type {Example} from "../../types.ts";
import NumberStepper from "./NumberStepper.example.tsx";
import numberStepperSource from "./NumberStepper.example.tsx?raw";
import numberStepperComponentSource from "./NumberStepper.tsx?raw";
import LineStepper from "./LineStepper.example.tsx";
import lineStepperSource from "./LineStepper.example.tsx?raw";
import lineStepperComponentSource from "./LineStepper.tsx?raw";
import VerticalStepper from "./VerticalStepper.example.tsx";
import verticalStepperSource from "./VerticalStepper.example.tsx?raw";
import verticalStepperComponentSource from "./VerticalStepper.tsx?raw";

const examples: Example[] = [
    {
        id: "number_stepper",
        title: "Number stepper",
        description: "A stepper that guides users through a multi-step process and shows how far along they are.",
        component: NumberStepper,
        source: numberStepperSource,
        files: [{name: "NumberStepper.tsx", source: numberStepperComponentSource}],
    },
    {
        id: "no_text_stepper",
        title: "No text stepper",
        description: "A stepper that labels each step with a number only, joined by lines, without step names.",
        component: LineStepper,
        source: lineStepperSource,
        files: [{name: "LineStepper.tsx", source: lineStepperComponentSource}],
    },
    {
        id: "vertical_stepper",
        title: "Vertical stepper",
        description: "A stepper that lists the steps from top to bottom, each with a title and a short description.",
        component: VerticalStepper,
        source: verticalStepperSource,
        files: [{name: "VerticalStepper.tsx", source: verticalStepperComponentSource}],
        minHeight: 420,
    },
];

export default examples;

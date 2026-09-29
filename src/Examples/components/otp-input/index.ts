import type {Example} from "../../types.ts";
import OtpInput from "./OtpInput.example.tsx";
import otpInputSource from "./OtpInput.example.tsx?raw";
import otpInputComponentSource from "./OtpInput.tsx?raw";
import AutoAdvanceOtpInput from "./AutoAdvanceOtpInput.example.tsx";
import autoAdvanceOtpInputSource from "./AutoAdvanceOtpInput.example.tsx?raw";
import autoAdvanceOtpInputComponentSource from "./AutoAdvanceOtpInput.tsx?raw";

const examples: Example[] = [
    {
        id: "custom_navigation",
        title: "Custom navigation",
        description: "An OTP input with one box per digit where the user moves between boxes with Tab or a click. Each box accepts a single digit.",
        component: OtpInput,
        source: otpInputSource,
        files: [{name: "OtpInput.tsx", source: otpInputComponentSource}],
    },
    {
        id: "keyboard_navigation",
        title: "Keyboard navigation",
        description: "An OTP input that moves to the next box after each digit. Backspace and the arrow keys move between boxes, and pasted codes keep only the numbers.",
        component: AutoAdvanceOtpInput,
        source: autoAdvanceOtpInputSource,
        files: [{name: "AutoAdvanceOtpInput.tsx", source: autoAdvanceOtpInputComponentSource}],
    },
];

export default examples;

import type {Example} from "../../types.ts";
import ShimmerButton from "./ShimmerButton.example.tsx";
import shimmerButtonSource from "./ShimmerButton.example.tsx?raw";
import shimmerButtonComponentSource from "./ShimmerButton.tsx?raw";
import RippleButton from "./RippleButton.example.tsx";
import rippleButtonSource from "./RippleButton.example.tsx?raw";
import rippleButtonComponentSource from "./RippleButton.tsx?raw";
import ConfettiButton from "./ConfettiButton.example.tsx";
import confettiButtonSource from "./ConfettiButton.example.tsx?raw";
import confettiButtonComponentSource from "./ConfettiButton.tsx?raw";
import HoldToConfirm from "./HoldToConfirm.example.tsx";
import holdToConfirmSource from "./HoldToConfirm.example.tsx?raw";
import holdToConfirmComponentSource from "./HoldToConfirm.tsx?raw";
import MagneticButton from "./MagneticButton.example.tsx";
import magneticButtonSource from "./MagneticButton.example.tsx?raw";
import magneticButtonComponentSource from "./MagneticButton.tsx?raw";
import MorphSubmitButton from "./MorphSubmitButton.example.tsx";
import morphSubmitButtonSource from "./MorphSubmitButton.example.tsx?raw";
import morphSubmitButtonComponentSource from "./MorphSubmitButton.tsx?raw";
import LiquidFillButton from "./LiquidFillButton.example.tsx";
import liquidFillButtonSource from "./LiquidFillButton.example.tsx?raw";
import liquidFillButtonComponentSource from "./LiquidFillButton.tsx?raw";
import BorderDrawButton from "./BorderDrawButton.example.tsx";
import borderDrawButtonSource from "./BorderDrawButton.example.tsx?raw";
import borderDrawButtonComponentSource from "./BorderDrawButton.tsx?raw";
import PaperPlaneSend from "./PaperPlaneSend.example.tsx";
import paperPlaneSendSource from "./PaperPlaneSend.example.tsx?raw";
import paperPlaneSendComponentSource from "./PaperPlaneSend.tsx?raw";
import KeycapButtons from "./KeycapButtons.example.tsx";
import keycapButtonsSource from "./KeycapButtons.example.tsx?raw";
import keycapButtonsComponentSource from "./KeycapButtons.tsx?raw";

const examples: Example[] = [
    {
        id: "shimmer-button",
        title: "Shimmer button",
        description: "A band of light sweeps across the button every few seconds. Use it sparingly for the one action you want people to take.",
        component: ShimmerButton,
        source: shimmerButtonSource,
        files: [{name: "ShimmerButton.tsx", source: shimmerButtonComponentSource}],
    },
    {
        id: "ripple-button",
        title: "Ripple button",
        description: "Each press spreads a ripple from the point that was clicked, or from the center when using the keyboard.",
        component: RippleButton,
        source: rippleButtonSource,
        files: [{name: "RippleButton.tsx", source: rippleButtonComponentSource}],
    },
    {
        id: "confetti-button",
        title: "Confetti button",
        description: "Completing a task sends a burst of confetti from the button, built with framer-motion and no extra library.",
        component: ConfettiButton,
        source: confettiButtonSource,
        files: [{name: "ConfettiButton.tsx", source: confettiButtonComponentSource}],
        minHeight: 380,
    },
    {
        id: "hold-to-confirm",
        title: "Hold to confirm",
        description: "A destructive action that only runs after the button is held for a second. Letting go early cancels it.",
        component: HoldToConfirm,
        source: holdToConfirmSource,
        files: [{name: "HoldToConfirm.tsx", source: holdToConfirmComponentSource}],
    },
    {
        id: "magnetic-button",
        title: "Magnetic button",
        description: "The button leans toward the pointer as it gets close and the label moves a little further, which reads as depth. Touch devices and reduced motion skip the pull.",
        component: MagneticButton,
        source: magneticButtonSource,
        files: [{name: "MagneticButton.tsx", source: magneticButtonComponentSource}],
    },
    {
        id: "morph-submit-button",
        title: "Morphing submit button",
        description: "A save button that shrinks into a spinner while the request runs, then draws a check. A failed request shakes the button and offers a retry.",
        component: MorphSubmitButton,
        source: morphSubmitButtonSource,
        files: [{name: "MorphSubmitButton.tsx", source: morphSubmitButtonComponentSource}],
    },
    {
        id: "liquid-fill-button",
        title: "Liquid fill download",
        description: "A wavy fill rises a little on hover and fills the button as the download progresses. The label turns white exactly where the liquid covers it.",
        component: LiquidFillButton,
        source: liquidFillButtonSource,
        files: [{name: "LiquidFillButton.tsx", source: liquidFillButtonComponentSource}],
    },
    {
        id: "border-draw-buttons",
        title: "Border draw buttons",
        description: "Three hover treatments that draw an outline instead of changing color: a gradient trace, corner brackets that close into a frame, and an underline that always moves forward.",
        component: BorderDrawButton,
        source: borderDrawButtonSource,
        files: [{name: "BorderDrawButton.tsx", source: borderDrawButtonComponentSource}],
    },
    {
        id: "paper-plane-send",
        title: "Paper plane send",
        description: "An email composer whose send button launches a paper plane along a curved path, confirms the send, then glides a new plane back in.",
        component: PaperPlaneSend,
        source: paperPlaneSendSource,
        files: [{name: "PaperPlaneSend.tsx", source: paperPlaneSendComponentSource}],
        minHeight: 360,
    },
    {
        id: "keycap-buttons",
        title: "Keycap buttons",
        description: "Chunky 3D keys with a visible side that travel down on press. Toggle keys rest halfway down with a lit indicator while on, and they work with Space and Enter.",
        component: KeycapButtons,
        source: keycapButtonsSource,
        files: [{name: "KeycapButtons.tsx", source: keycapButtonsComponentSource}],
        minHeight: 360,
    },
];

export default examples;

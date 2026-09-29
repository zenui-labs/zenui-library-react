import type {Example} from "../../types.ts";
import ClickFeedbackButtons from "./ClickFeedbackButtons.example.tsx";
import clickFeedbackButtonsSource from "./ClickFeedbackButtons.example.tsx?raw";
import clickFeedbackButtonsComponentSource from "./ClickFeedbackButtons.tsx?raw";
import BorderHoverButtons from "./BorderHoverButtons.example.tsx";
import borderHoverButtonsSource from "./BorderHoverButtons.example.tsx?raw";
import borderHoverButtonsComponentSource from "./BorderHoverButtons.tsx?raw";
import DirectionalFillButton from "./DirectionalFillButton.example.tsx";
import directionalFillButtonSource from "./DirectionalFillButton.example.tsx?raw";
import directionalFillButtonComponentSource from "./DirectionalFillButton.tsx?raw";
import SlideUpFillButton from "./SlideUpFillButton.example.tsx";
import slideUpFillButtonSource from "./SlideUpFillButton.example.tsx?raw";
import slideUpFillButtonComponentSource from "./SlideUpFillButton.tsx?raw";
import SlideRevealButton from "./SlideRevealButton.example.tsx";
import slideRevealButtonSource from "./SlideRevealButton.example.tsx?raw";
import slideRevealButtonComponentSource from "./SlideRevealButton.tsx?raw";
import BounceFillButton from "./BounceFillButton.example.tsx";
import bounceFillButtonSource from "./BounceFillButton.example.tsx?raw";
import bounceFillButtonComponentSource from "./BounceFillButton.tsx?raw";
import OffsetLayerButton from "./OffsetLayerButton.example.tsx";
import offsetLayerButtonSource from "./OffsetLayerButton.example.tsx?raw";
import offsetLayerButtonComponentSource from "./OffsetLayerButton.tsx?raw";
import CircleFillButton from "./CircleFillButton.example.tsx";
import circleFillButtonSource from "./CircleFillButton.example.tsx?raw";
import circleFillButtonComponentSource from "./CircleFillButton.tsx?raw";
import MergeLayersButton from "./MergeLayersButton.example.tsx";
import mergeLayersButtonSource from "./MergeLayersButton.example.tsx?raw";
import mergeLayersButtonComponentSource from "./MergeLayersButton.tsx?raw";
import DayNightToggle from "./DayNightToggle.example.tsx";
import dayNightToggleSource from "./DayNightToggle.example.tsx?raw";
import dayNightToggleComponentSource from "./DayNightToggle.tsx?raw";
import CelebrationButton from "./CelebrationButton.example.tsx";
import celebrationButtonSource from "./CelebrationButton.example.tsx?raw";
import celebrationButtonComponentSource from "./CelebrationButton.tsx?raw";

const examples: Example[] = [
    {
        id: "click_animation",
        title: "Click animation",
        description: "Buttons that play a short animation when pressed, so people see right away that their click registered.",
        component: ClickFeedbackButtons,
        source: clickFeedbackButtonsSource,
        files: [{name: "ClickFeedbackButtons.tsx", source: clickFeedbackButtonsComponentSource}],
    },
    {
        id: "border_animated",
        title: "Border hover animation",
        description: "Buttons with a border that draws in around the edges on hover.",
        component: BorderHoverButtons,
        source: borderHoverButtonsSource,
        files: [{name: "BorderHoverButtons.tsx", source: borderHoverButtonsComponentSource}],
    },
    {
        id: "bg_hover_animation",
        title: "Background hover animation",
        description: "An outlined button whose background slides in on hover. Pick the direction it enters from.",
        component: DirectionalFillButton,
        source: directionalFillButtonSource,
        files: [{name: "DirectionalFillButton.tsx", source: directionalFillButtonComponentSource}],
    },
    {
        id: "bg_slide_up_animation",
        title: "Background slide up animation",
        description: "A button whose background color rises from a bar at the bottom on hover while the arrow swaps sides.",
        component: SlideUpFillButton,
        source: slideUpFillButtonSource,
        files: [{name: "SlideUpFillButton.tsx", source: slideUpFillButtonComponentSource}],
    },
    {
        id: "bg_slide_animation",
        title: "Background slide animation",
        description: "A pill button where a filled panel with an arrow slides in from the left and pushes the label out on hover.",
        component: SlideRevealButton,
        source: slideRevealButtonSource,
        files: [{name: "SlideRevealButton.tsx", source: slideRevealButtonComponentSource}],
    },
    {
        id: "bg_bounce_up_animation",
        title: "Background bounce up animation",
        description: "A pill button whose fill opens from the middle on hover while an arrow slides in beside the label.",
        component: BounceFillButton,
        source: bounceFillButtonSource,
        files: [{name: "BounceFillButton.tsx", source: bounceFillButtonComponentSource}],
    },
    {
        id: "bottom_border_animation",
        title: "Bottom border animation",
        description: "A button with a colored edge peeking out below it that slides into place and fills the button on hover.",
        component: OffsetLayerButton,
        source: offsetLayerButtonSource,
        files: [{name: "OffsetLayerButton.tsx", source: offsetLayerButtonComponentSource}],
    },
    {
        id: "hover_bg_fill_animation",
        title: "Hover background fill animation",
        description: "A button where a circle grows from the center until the background is filled on hover.",
        component: CircleFillButton,
        source: circleFillButtonSource,
        files: [{name: "CircleFillButton.tsx", source: circleFillButtonComponentSource}],
    },
    {
        id: "2_part_marge_animation",
        title: "Two part merge animation",
        description: "A button made of two offset color layers that merge into one shape on hover.",
        component: MergeLayersButton,
        source: mergeLayersButtonSource,
        files: [{name: "MergeLayersButton.tsx", source: mergeLayersButtonComponentSource}],
    },
    {
        id: "theme_toggle_animation",
        title: "Theme toggle animation",
        description: "A switch for light and dark mode drawn as a sky, where the sun turns into the moon and clouds give way to stars.",
        component: DayNightToggle,
        source: dayNightToggleSource,
        files: [{name: "DayNightToggle.tsx", source: dayNightToggleComponentSource}],
    },
    {
        id: "celebration_button",
        title: "Celebration button",
        description: "A button that shows a spinner, then bursts into confetti. Use it as feedback after a successful action such as claiming a reward.",
        component: CelebrationButton,
        source: celebrationButtonSource,
        files: [{name: "CelebrationButton.tsx", source: celebrationButtonComponentSource}],
        minHeight: 420,
    },
];

export default examples;

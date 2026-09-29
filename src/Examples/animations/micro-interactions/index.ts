import type {Example} from "../../types.ts";
import ToggleSwitches from "./ToggleSwitches.example.tsx";
import toggleSwitchesSource from "./ToggleSwitches.example.tsx?raw";
import ReactionButtons from "./ReactionButtons.example.tsx";
import reactionButtonsSource from "./ReactionButtons.example.tsx?raw";
import DrawnChecklist from "./DrawnChecklist.example.tsx";
import drawnChecklistSource from "./DrawnChecklist.example.tsx?raw";
import MorphingIcons from "./MorphingIcons.example.tsx";
import morphingIconsSource from "./MorphingIcons.example.tsx?raw";
import CopyButtons from "./CopyButtons.example.tsx";
import copyButtonsSource from "./CopyButtons.example.tsx?raw";
import FollowButton from "./FollowButton.example.tsx";
import followButtonSource from "./FollowButton.example.tsx?raw";
import StarRating from "./StarRating.example.tsx";
import starRatingSource from "./StarRating.example.tsx?raw";
import PasswordStrength from "./PasswordStrength.example.tsx";
import passwordStrengthSource from "./PasswordStrength.example.tsx?raw";

const examples: Example[] = [
    {
        id: "toggle-switches",
        title: "Toggle switches",
        description: "A day and night switch where the sun rolls over and becomes a moon, plus settings switches whose knob stretches while pressed.",
        component: ToggleSwitches,
        source: toggleSwitchesSource,
        minHeight: 420,
    },
    {
        id: "reaction-buttons",
        title: "Like, repost and save",
        description: "Post actions with a heart that bursts, counts that roll to the new number, and a bookmark that fills from the bottom.",
        component: ReactionButtons,
        source: reactionButtonsSource,
    },
    {
        id: "drawn-checklist",
        title: "Checklist with drawn ticks",
        description: "Checking a task draws the tick, strikes through the label across wrapped lines and moves the progress ring.",
        component: DrawnChecklist,
        source: drawnChecklistSource,
        minHeight: 420,
    },
    {
        id: "morphing-icons",
        title: "Morphing icon buttons",
        description: "Menu to close, play to pause, add to added and sound to muted. Each icon changes shape instead of swapping.",
        component: MorphingIcons,
        source: morphingIconsSource,
    },
    {
        id: "copy-buttons",
        title: "Copy to clipboard",
        description: "Three copy patterns for commands, API keys and invite links. Each confirms with a drawn tick and handles a blocked clipboard.",
        component: CopyButtons,
        source: copyButtonsSource,
        minHeight: 400,
    },
    {
        id: "follow-button",
        title: "Follow button states",
        description: "Follow shows a short loading state, settles on Following, and offers Unfollow on hover. A bell for notifications slides in once you follow.",
        component: FollowButton,
        source: followButtonSource,
    },
    {
        id: "star-rating",
        title: "Star rating",
        description: "Hover previews the score, choosing one pops the stars in sequence with a spark, and a comment box opens underneath.",
        component: StarRating,
        source: starRatingSource,
        minHeight: 460,
    },
    {
        id: "password-strength",
        title: "Password strength meter",
        description: "A segmented meter and a rule checklist that ticks off as you type. Saving a weak password shakes the field and explains why.",
        component: PasswordStrength,
        source: passwordStrengthSource,
        minHeight: 480,
    },
];

export default examples;

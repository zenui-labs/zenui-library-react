import type {Example} from "../../types.ts";
import AvatarStack from "./AvatarStack.example.tsx";
import avatarStackSource from "./AvatarStack.example.tsx?raw";
import avatarStackComponentSource from "./AvatarStack.tsx?raw";
import AvatarStatus from "./AvatarStatus.example.tsx";
import avatarStatusSource from "./AvatarStatus.example.tsx?raw";
import avatarStatusComponentSource from "./AvatarStatus.tsx?raw";
import ExpandingStack from "./ExpandingStack.example.tsx";
import expandingStackSource from "./ExpandingStack.example.tsx?raw";
import expandingStackComponentSource from "./ExpandingStack.tsx?raw";
import ReviewerRings from "./ReviewerRings.example.tsx";
import reviewerRingsSource from "./ReviewerRings.example.tsx?raw";
import reviewerRingsComponentSource from "./ReviewerRings.tsx?raw";
import AssigneePicker from "./AssigneePicker.example.tsx";
import assigneePickerSource from "./AssigneePicker.example.tsx?raw";
import assigneePickerComponentSource from "./AssigneePicker.tsx?raw";
import LivePresence from "./LivePresence.example.tsx";
import livePresenceSource from "./LivePresence.example.tsx?raw";
import livePresenceComponentSource from "./LivePresence.tsx?raw";
import WorkspaceRail from "./WorkspaceRail.example.tsx";
import workspaceRailSource from "./WorkspaceRail.example.tsx?raw";
import workspaceRailComponentSource from "./WorkspaceRail.tsx?raw";

const examples: Example[] = [
    {
        id: "avatar-stack",
        title: "Avatar stack",
        description: "Overlapping avatars with a count for the rest. The count opens a list of everyone who is hidden.",
        component: AvatarStack,
        source: avatarStackSource,
        files: [{name: "AvatarStack.tsx", source: avatarStackComponentSource}],
        minHeight: 440,
    },
    {
        id: "presence-list",
        title: "Presence list",
        description: "Avatars with online, away, busy and offline dots, plus a menu for setting your own status.",
        component: AvatarStatus,
        source: avatarStatusSource,
        files: [{name: "AvatarStatus.tsx", source: avatarStatusComponentSource}],
        minHeight: 460,
    },
    {
        id: "expanding-stack",
        title: "Expanding stack",
        description: "Overlapping avatars that fan out on hover or keyboard focus, with a name and detail for each person.",
        component: ExpandingStack,
        source: expandingStackSource,
        files: [{name: "ExpandingStack.tsx", source: expandingStackComponentSource}],
        minHeight: 420,
    },
    {
        id: "reviewer-rings",
        title: "Reviewers with status rings",
        description: "Avatars with a colored ring and badge for each review state, plus an approvals meter. Re-request a review and the ring changes.",
        component: ReviewerRings,
        source: reviewerRingsSource,
        files: [{name: "ReviewerRings.tsx", source: reviewerRingsComponentSource}],
        minHeight: 560,
    },
    {
        id: "assignee-picker",
        title: "Assignee picker",
        description: "A field that shows assignees as a stack and opens a searchable multi-select list. Avatars pop in and out as you pick people.",
        component: AssigneePicker,
        source: assigneePickerSource,
        files: [{name: "AssigneePicker.tsx", source: assigneePickerComponentSource}],
        minHeight: 520,
    },
    {
        id: "live-presence",
        title: "Live viewers",
        description: "A document header showing who is viewing right now. People join and leave in a simulation that pauses when the card is off screen.",
        component: LivePresence,
        source: livePresenceSource,
        files: [{name: "LivePresence.tsx", source: livePresenceComponentSource}],
        minHeight: 440,
    },
    {
        id: "workspace-rail",
        title: "Workspace switcher",
        description: "Square workspace icons in a vertical rail with unread badges, a selection indicator and name tooltips.",
        component: WorkspaceRail,
        source: workspaceRailSource,
        files: [{name: "WorkspaceRail.tsx", source: workspaceRailComponentSource}],
        minHeight: 480,
    },
];

export default examples;

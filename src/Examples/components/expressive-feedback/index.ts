import type {Example} from "../../types.ts";
import ShredderDelete from "./ShredderDelete.example.tsx";
import shredderDeleteSource from "./ShredderDelete.example.tsx?raw";
import shredderDeleteComponentSource from "./ShredderDelete.tsx?raw";
import DissolveDelete from "./DissolveDelete.example.tsx";
import dissolveDeleteSource from "./DissolveDelete.example.tsx?raw";
import dissolveDeleteComponentSource from "./DissolveDelete.tsx?raw";
import TumblerLock from "./TumblerLock.example.tsx";
import tumblerLockSource from "./TumblerLock.example.tsx?raw";
import tumblerLockComponentSource from "./TumblerLock.tsx?raw";
import RubberStamp from "./RubberStamp.example.tsx";
import rubberStampSource from "./RubberStamp.example.tsx?raw";
import rubberStampComponentSource from "./RubberStamp.tsx?raw";
import HourglassCooldown from "./HourglassCooldown.example.tsx";
import hourglassCooldownSource from "./HourglassCooldown.example.tsx?raw";
import hourglassCooldownComponentSource from "./HourglassCooldown.tsx?raw";

const examples: Example[] = [
    {
        id: "shredder-delete",
        title: "Shredder delete",
        description: "Deleting a file feeds it through a paper shredder, and it falls into the bin as strips cut from the document itself. Undo runs the same timeline backwards. With reduced motion the row just fades.",
        component: ShredderDelete,
        source: shredderDeleteSource,
        files: [{name: "ShredderDelete.tsx", source: shredderDeleteComponentSource}],
        minHeight: 720,
    },
    {
        id: "dissolve-delete",
        title: "Dissolve to dust",
        description: "Dismissed notifications crumble into dust that drifts to the right, and Restore all puts them back together. It is built from one SVG filter per card. With reduced motion the cards fade instead.",
        component: DissolveDelete,
        source: dissolveDeleteSource,
        files: [{name: "DissolveDelete.tsx", source: dissolveDeleteComponentSource}],
        minHeight: 560,
    },
    {
        id: "tumbler-lock",
        title: "Tumbler lock strength meter",
        description: "A password strength meter drawn as a padlock cut open. Each requirement you meet lifts one pin to the shear line, and when all five are set the plug turns and the shackle opens. The checklist reports progress to screen readers.",
        component: TumblerLock,
        source: tumblerLockSource,
        files: [{name: "TumblerLock.tsx", source: tumblerLockComponentSource}],
        minHeight: 420,
    },
    {
        id: "rubber-stamp",
        title: "Rubber stamp approval",
        description: "Approving or rejecting an expense report brings a rubber stamp down onto the page in perspective. It leaves an uneven ink impression with the date on it. Use it for sign-off steps, and Withdraw to take a decision back.",
        component: RubberStamp,
        source: rubberStampSource,
        files: [{name: "RubberStamp.tsx", source: rubberStampComponentSource}],
        minHeight: 480,
    },
    {
        id: "hourglass-cooldown",
        title: "Hourglass cooldown",
        description: "A rate-limited Resend code button that uses an hourglass as its timer. Pressing it flips the glass, the sand drains while the button counts down, and it unlocks when the top is empty. The sand stops drawing while off screen.",
        component: HourglassCooldown,
        source: hourglassCooldownSource,
        files: [{name: "HourglassCooldown.tsx", source: hourglassCooldownComponentSource}],
        minHeight: 340,
    },
];

export default examples;

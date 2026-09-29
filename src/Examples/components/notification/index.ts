import type {Example} from "../../types.ts";
import ProgressNotification from "./ProgressNotification.example.tsx";
import progressNotificationSource from "./ProgressNotification.example.tsx?raw";
import progressNotificationComponentSource from "./ProgressNotification.tsx?raw";
import BorderNotification from "./BorderNotification.example.tsx";
import borderNotificationSource from "./BorderNotification.example.tsx?raw";
import borderNotificationComponentSource from "./BorderNotification.tsx?raw";
import DismissibleNotification from "./DismissibleNotification.example.tsx";
import dismissibleNotificationSource from "./DismissibleNotification.example.tsx?raw";
import dismissibleNotificationComponentSource from "./DismissibleNotification.tsx?raw";
import PositionedNotification from "./PositionedNotification.example.tsx";
import positionedNotificationSource from "./PositionedNotification.example.tsx?raw";
import positionedNotificationComponentSource from "./PositionedNotification.tsx?raw";
import PushNotification from "./PushNotification.example.tsx";
import pushNotificationSource from "./PushNotification.example.tsx?raw";
import pushNotificationComponentSource from "./PushNotification.tsx?raw";

const examples: Example[] = [
    {
        id: "progressive_notification",
        title: "Progress notification",
        description: "A notification with a progress bar that empties while it is open. When the bar runs out, the notification closes itself.",
        component: ProgressNotification,
        source: progressNotificationSource,
        files: [{name: "ProgressNotification.tsx", source: progressNotificationComponentSource}],
    },
    {
        id: "border_notification",
        title: "Border notification",
        description: "A notification with a colored border that makes important messages stand out. Click it to close it.",
        component: BorderNotification,
        source: borderNotificationSource,
        files: [{name: "BorderNotification.tsx", source: borderNotificationComponentSource}],
    },
    {
        id: "cross_icon_notification",
        title: "Cross icon notification",
        description: "A notification in four status colors with a close icon so users can dismiss it.",
        component: DismissibleNotification,
        source: dismissibleNotificationSource,
        files: [{name: "DismissibleNotification.tsx", source: dismissibleNotificationComponentSource}],
    },
    {
        id: "customize_positioning_notification",
        title: "Custom position notification",
        description: "A notification with a close icon that slides in from the top, left, right or bottom edge of its container.",
        component: PositionedNotification,
        source: positionedNotificationSource,
        files: [{name: "PositionedNotification.tsx", source: positionedNotificationComponentSource}],
        minHeight: 560,
    },
    {
        id: "push_notification",
        title: "Push notification",
        description: "A toast in the corner of the screen that alerts users about updates or messages. It can close on a timer or wait for the user to close it.",
        component: PushNotification,
        source: pushNotificationSource,
        files: [{name: "PushNotification.tsx", source: pushNotificationComponentSource}],
    },
];

export default examples;

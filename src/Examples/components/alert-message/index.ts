import type {Example} from "../../types.ts";
import SoftAlert from "./SoftAlert.example.tsx";
import softAlertSource from "./SoftAlert.example.tsx?raw";
import softAlertComponentSource from "./SoftAlert.tsx?raw";
import TitledAlert from "./TitledAlert.example.tsx";
import titledAlertSource from "./TitledAlert.example.tsx?raw";
import titledAlertComponentSource from "./TitledAlert.tsx?raw";
import OutlinedAlert from "./OutlinedAlert.example.tsx";
import outlinedAlertSource from "./OutlinedAlert.example.tsx?raw";
import outlinedAlertComponentSource from "./OutlinedAlert.tsx?raw";
import DismissibleAlert from "./DismissibleAlert.example.tsx";
import dismissibleAlertSource from "./DismissibleAlert.example.tsx?raw";
import dismissibleAlertComponentSource from "./DismissibleAlert.tsx?raw";

const examples: Example[] = [
    {
        id: "alert_message_with_background",
        title: "Alert message with background",
        description: "An alert with a different background color for each type, so the status is easy to recognize.",
        component: SoftAlert,
        source: softAlertSource,
        files: [{name: "SoftAlert.tsx", source: softAlertComponentSource}],
    },
    {
        id: "alert_message_with_title",
        title: "Alert message with title",
        description: "An alert with a title and a background color that matches the alert type.",
        component: TitledAlert,
        source: titledAlertSource,
        files: [{name: "TitledAlert.tsx", source: titledAlertComponentSource}],
        minHeight: 420,
    },
    {
        id: "alert_message_with_border",
        title: "Alert message with border",
        description: "An alert with a border color that matches the alert type and no background.",
        component: OutlinedAlert,
        source: outlinedAlertSource,
        files: [{name: "OutlinedAlert.tsx", source: outlinedAlertComponentSource}],
    },
    {
        id: "message_take_action",
        title: "Alert message with close action",
        description: "An alert with a background color for each type and a close button that dismisses it.",
        component: DismissibleAlert,
        source: dismissibleAlertSource,
        files: [{name: "DismissibleAlert.tsx", source: dismissibleAlertComponentSource}],
    },
];

export default examples;

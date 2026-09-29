import type {Example} from "../../types.ts";
import AccountPickerDialog from "./AccountPickerDialog.example.tsx";
import accountPickerDialogSource from "./AccountPickerDialog.example.tsx?raw";
import accountPickerDialogComponentSource from "./AccountPickerDialog.tsx?raw";
import AlertDialog from "./AlertDialog.example.tsx";
import alertDialogSource from "./AlertDialog.example.tsx?raw";
import alertDialogComponentSource from "./AlertDialog.tsx?raw";

const examples: Example[] = [
    {
        id: "basic_dialog",
        title: "Basic dialog",
        description: "A modal dialog that asks the user to pick one option, here a backup account, in a focused window.",
        component: AccountPickerDialog,
        source: accountPickerDialogSource,
        files: [{name: "AccountPickerDialog.tsx", source: accountPickerDialogComponentSource}],
    },
    {
        id: "alert_dialog",
        title: "Alert dialog",
        description: "A dialog that asks the user to confirm a critical action, such as deleting an item, before it happens.",
        component: AlertDialog,
        source: alertDialogSource,
        files: [{name: "AlertDialog.tsx", source: alertDialogComponentSource}],
    },
];

export default examples;

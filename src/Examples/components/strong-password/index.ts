import type {Example} from "../../types.ts";
import PasswordStrengthMessage from "./PasswordStrengthMessage.example.tsx";
import passwordStrengthMessageSource from "./PasswordStrengthMessage.example.tsx?raw";
import passwordStrengthMessageComponentSource from "./PasswordStrengthMessage.tsx?raw";
import PasswordStrengthMeter from "./PasswordStrengthMeter.example.tsx";
import passwordStrengthMeterSource from "./PasswordStrengthMeter.example.tsx?raw";
import passwordStrengthMeterComponentSource from "./PasswordStrengthMeter.tsx?raw";
import PasswordChecklist from "./PasswordChecklist.example.tsx";
import passwordChecklistSource from "./PasswordChecklist.example.tsx?raw";
import passwordChecklistComponentSource from "./PasswordChecklist.tsx?raw";
import PasswordHintDropdown from "./PasswordHintDropdown.example.tsx";
import passwordHintDropdownSource from "./PasswordHintDropdown.example.tsx?raw";
import passwordHintDropdownComponentSource from "./PasswordHintDropdown.tsx?raw";

const examples: Example[] = [
    {
        id: "check_inline",
        title: "Check inline",
        description: "A password field that checks the password as it is typed and shows the first rule it still fails, or a success message.",
        component: PasswordStrengthMessage,
        source: passwordStrengthMessageSource,
        files: [{name: "PasswordStrengthMessage.tsx", source: passwordStrengthMessageComponentSource}],
    },
    {
        id: "check_by_indicator",
        title: "Check by indicator",
        description: "A password field with a segmented meter that fills one bar for each rule the password meets.",
        component: PasswordStrengthMeter,
        source: passwordStrengthMeterSource,
        files: [{name: "PasswordStrengthMeter.tsx", source: passwordStrengthMeterComponentSource}],
    },
    {
        id: "check_password_with_hint",
        title: "Check password with hints",
        description: "A password field with a checklist of rules under it. Each rule turns green once the password meets it.",
        component: PasswordChecklist,
        source: passwordChecklistSource,
        files: [{name: "PasswordChecklist.tsx", source: passwordChecklistComponentSource}],
        minHeight: 380,
    },
    {
        id: "show_hint_in_dropdown",
        title: "Show hints in a dropdown",
        description: "The same checklist of rules in a dropdown that opens while the field has focus.",
        component: PasswordHintDropdown,
        source: passwordHintDropdownSource,
        files: [{name: "PasswordHintDropdown.tsx", source: passwordHintDropdownComponentSource}],
        minHeight: 400,
    },
];

export default examples;

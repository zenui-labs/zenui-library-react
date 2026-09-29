import type {Example} from "../../types.ts";
import PublishDropdownButton from "./PublishDropdownButton.example.tsx";
import publishDropdownButtonSource from "./PublishDropdownButton.example.tsx?raw";
import publishDropdownButtonComponentSource from "./PublishDropdownButton.tsx?raw";
import ActionDropdownButton from "./ActionDropdownButton.example.tsx";
import actionDropdownButtonSource from "./ActionDropdownButton.example.tsx?raw";
import actionDropdownButtonComponentSource from "./ActionDropdownButton.tsx?raw";
import SendDropdownButton from "./SendDropdownButton.example.tsx";
import sendDropdownButtonSource from "./SendDropdownButton.example.tsx?raw";
import sendDropdownButtonComponentSource from "./SendDropdownButton.tsx?raw";

const examples: Example[] = [
    {
        id: "publish_button",
        title: "Publish button",
        description: "A publish button with an arrow that opens a menu of publishing options. The picked option becomes the button label.",
        component: PublishDropdownButton,
        source: publishDropdownButtonSource,
        files: [{name: "PublishDropdownButton.tsx", source: publishDropdownButtonComponentSource}],
        minHeight: 260,
    },
    {
        id: "action_button",
        title: "Action button",
        description: "An action button with a menu of quick actions, each shown with an icon.",
        component: ActionDropdownButton,
        source: actionDropdownButtonSource,
        files: [{name: "ActionDropdownButton.tsx", source: actionDropdownButtonComponentSource}],
        minHeight: 280,
    },
    {
        id: "send_button_with_arrow",
        title: "Send button with arrow",
        description: "A send button whose arrow opens a menu of other ways to send, such as scheduling or saving a draft.",
        component: SendDropdownButton,
        source: sendDropdownButtonSource,
        files: [{name: "SendDropdownButton.tsx", source: sendDropdownButtonComponentSource}],
        minHeight: 300,
    },
];

export default examples;

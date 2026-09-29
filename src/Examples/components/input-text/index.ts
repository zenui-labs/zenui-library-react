import type {Example} from "../../types.ts";
import LabeledInput from "./LabeledInput.example.tsx";
import labeledInputSource from "./LabeledInput.example.tsx?raw";
import labeledInputComponentSource from "./LabeledInput.tsx?raw";
import UnderlineInput from "./UnderlineInput.example.tsx";
import underlineInputSource from "./UnderlineInput.example.tsx?raw";
import underlineInputComponentSource from "./UnderlineInput.tsx?raw";
import FloatingLabelInput from "./FloatingLabelInput.example.tsx";
import floatingLabelInputSource from "./FloatingLabelInput.example.tsx?raw";
import floatingLabelInputComponentSource from "./FloatingLabelInput.tsx?raw";
import IconInput from "./IconInput.example.tsx";
import iconInputSource from "./IconInput.example.tsx?raw";
import iconInputComponentSource from "./IconInput.tsx?raw";
import PasswordInput from "./PasswordInput.example.tsx";
import passwordInputSource from "./PasswordInput.example.tsx?raw";
import passwordInputComponentSource from "./PasswordInput.tsx?raw";
import UrlInput from "./UrlInput.example.tsx";
import urlInputSource from "./UrlInput.example.tsx?raw";
import urlInputComponentSource from "./UrlInput.tsx?raw";
import PriceInput from "./PriceInput.example.tsx";
import priceInputSource from "./PriceInput.example.tsx?raw";
import priceInputComponentSource from "./PriceInput.tsx?raw";
import SearchInput from "./SearchInput.example.tsx";
import searchInputSource from "./SearchInput.example.tsx?raw";
import searchInputComponentSource from "./SearchInput.tsx?raw";
import SubscribeInput from "./SubscribeInput.example.tsx";
import subscribeInputSource from "./SubscribeInput.example.tsx?raw";
import subscribeInputComponentSource from "./SubscribeInput.tsx?raw";
import PhoneInput from "./PhoneInput.example.tsx";
import phoneInputSource from "./PhoneInput.example.tsx?raw";
import phoneInputComponentSource from "./PhoneInput.tsx?raw";

const examples: Example[] = [
    {
        id: "primary_input",
        title: "Required input",
        description: "A standard text input with a visible label and a required marker, for collecting information in forms.",
        component: LabeledInput,
        source: labeledInputSource,
        files: [{name: "LabeledInput.tsx", source: labeledInputComponentSource}],
    },
    {
        id: "bottom_bordered_input",
        title: "Bottom bordered input",
        description: "A text input with only a bottom border, for a lighter, minimal form style.",
        component: UnderlineInput,
        source: underlineInputSource,
        files: [{name: "UnderlineInput.tsx", source: underlineInputComponentSource}],
    },
    {
        id: "animate_label_input",
        title: "Animated label input",
        description: "A text input whose label moves above the field when it gets focus or has a value.",
        component: FloatingLabelInput,
        source: floatingLabelInputSource,
        files: [{name: "FloatingLabelInput.tsx", source: floatingLabelInputComponentSource}],
    },
    {
        id: "input_with_icon",
        title: "Input with icon",
        description: "Text inputs with a leading icon that shows what each field is for.",
        component: IconInput,
        source: iconInputSource,
        files: [{name: "IconInput.tsx", source: iconInputComponentSource}],
    },
    {
        id: "password_input",
        title: "Password input",
        description: "A password input with a button that shows or hides the password.",
        component: PasswordInput,
        source: passwordInputSource,
        files: [{name: "PasswordInput.tsx", source: passwordInputComponentSource}],
    },
    {
        id: "link_input",
        title: "Link input",
        description: "An input for a website address, with a fixed https:// prefix in front of the field.",
        component: UrlInput,
        source: urlInputSource,
        files: [{name: "UrlInput.tsx", source: urlInputComponentSource}],
    },
    {
        id: "price_input",
        title: "Price input",
        description: "A number input for an amount with a currency picker. The symbol on the left follows the selected currency.",
        component: PriceInput,
        source: priceInputSource,
        files: [{name: "PriceInput.tsx", source: priceInputComponentSource}],
        minHeight: 380,
    },
    {
        id: "search_input",
        title: "Search input",
        description: "Search fields in three styles: an icon button, a text button and a rounded field on a colored bar. Press Enter or the button to search.",
        component: SearchInput,
        source: searchInputSource,
        files: [{name: "SearchInput.tsx", source: searchInputComponentSource}],
    },
    {
        id: "join_us_input",
        title: "Join us input",
        description: "An email field with a subscribe button, for newsletter or membership sign-ups.",
        component: SubscribeInput,
        source: subscribeInputSource,
        files: [{name: "SubscribeInput.tsx", source: subscribeInputComponentSource}],
    },
    {
        id: "internation_number_input",
        title: "International phone number input",
        description: "A phone number input with a country code picker in front of the number.",
        component: PhoneInput,
        source: phoneInputSource,
        files: [{name: "PhoneInput.tsx", source: phoneInputComponentSource}],
        minHeight: 420,
    },
];

export default examples;

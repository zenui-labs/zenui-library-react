import {HorizontalMarquee, type MarqueeLink} from "./HorizontalMarquee";

const links: MarqueeLink[] = [
    {title: "Input", url: "/components/input-text"},
    {title: "Textarea", url: "/components/input-textarea"},
    {title: "Switch", url: "/components/input-switch"},
    {title: "Radio", url: "/components/input-radio"},
    {title: "Checkbox", url: "/components/input-checkbox"},
    {title: "OTP input", url: "/components/otp-input"},
    {title: "File upload", url: "/components/input-file"},
    {title: "Button", url: "/components/normal-button"},
    {title: "Dropdown button", url: "/components/dropdown-button"},
    {title: "Chip", url: "/components/chip"},
    {title: "Breadcrumb", url: "/components/breadcrumb"},
    {title: "Stepper", url: "/components/stepper"},
    {title: "Tabs", url: "/components/tabs"},
    {title: "Modal", url: "/components/modal"},
    {title: "Tooltip", url: "/components/tooltip"},
    {title: "Badge", url: "/components/badge"},
    {title: "Table", url: "/components/table"},
    {title: "Skeleton", url: "/components/skeleton"},
];

const HorizontalMarqueeExample = () => <HorizontalMarquee items={links}/>;

export default HorizontalMarqueeExample;

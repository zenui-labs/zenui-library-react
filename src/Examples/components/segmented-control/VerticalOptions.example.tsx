import {LuAtSign, LuBell, LuBellOff, LuMessageCircle} from "react-icons/lu";
import {VerticalOptions, type VerticalOption} from "./VerticalOptions";

type Level = "all" | "mentions" | "direct" | "none";

const levels: VerticalOption<Level>[] = [
    {value: "all", label: "All activity", description: "Every new message, reaction and file", icon: LuBell, note: "About 120 notifications a day, based on the last 30 days"},
    {value: "mentions", label: "Mentions and replies", description: "When someone @mentions you or replies to a thread you follow", icon: LuAtSign, note: "About 14 notifications a day, based on the last 30 days"},
    {value: "direct", label: "Direct messages only", description: "Only messages sent to you", icon: LuMessageCircle, note: "About 5 notifications a day, based on the last 30 days"},
    {value: "none", label: "Nothing", description: "Mute this channel. You can still open it any time", icon: LuBellOff, note: "You will not get notifications from this channel", muted: true},
];

const VerticalOptionsExample = () => <VerticalOptions title="Notifications for #product-launch" options={levels} defaultValue="mentions"/>;

export default VerticalOptionsExample;

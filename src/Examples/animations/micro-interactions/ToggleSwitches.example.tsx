import {LuBell, LuMail, LuMapPin} from "react-icons/lu";
import {ToggleSwitches, type Setting} from "./ToggleSwitches";

const settings: Setting[] = [
    {id: "push", label: "Push notifications", hint: "Mentions, replies and reminders", icon: LuBell, defaultOn: true},
    {id: "digest", label: "Weekly digest", hint: "A summary email every Monday", icon: LuMail},
    {id: "location", label: "Share location", hint: "Managed by your organization", icon: LuMapPin, disabled: true},
];

const ToggleSwitchesExample = () => <ToggleSwitches settings={settings}/>;

export default ToggleSwitchesExample;

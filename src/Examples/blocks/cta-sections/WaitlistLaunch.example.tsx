import {useState} from "react";
import {WaitlistLaunch, type WaitlistAvatar} from "./WaitlistLaunch";

const avatars: WaitlistAvatar[] = [
    {initials: "JK", color: "bg-rose-400"},
    {initials: "AM", color: "bg-amber-400"},
    {initials: "SL", color: "bg-emerald-400"},
    {initials: "RD", color: "bg-sky-400"},
    {initials: "TN", color: "bg-violet-400"},
];

// Replace with a request to your waitlist endpoint.
const joinWaitlist = () => new Promise<void>((resolve) => window.setTimeout(resolve, 900));

const WaitlistLaunchExample = () => {
    // Launch date for the demo: 12 days and 6 hours from the first render.
    const [launchAt] = useState(() => Date.now() + 12 * 86_400_000 + 6 * 3_600_000);

    return <WaitlistLaunch launchAt={launchAt} joinedCount={1283} avatars={avatars} onSubmit={joinWaitlist}/>;
};

export default WaitlistLaunchExample;

import {LuBellRing, LuRefreshCw, LuScrollText, LuShieldCheck} from "react-icons/lu";
import {SpotlightGrid, type SpotlightFeature} from "./SpotlightGrid";

const features: SpotlightFeature[] = [
    {title: "Realtime sync", description: "Changes reach every device in under 200 ms, even on slow networks.", icon: LuRefreshCw},
    {title: "Access control", description: "Give each role the exact permissions it needs, down to a single field.", icon: LuShieldCheck},
    {title: "Audit log", description: "Every change is recorded with who made it, when and from where.", icon: LuScrollText},
    {title: "Usage alerts", description: "Get notified before a workspace reaches its plan limits.", icon: LuBellRing},
];

const SpotlightGridExample = () => <SpotlightGrid items={features}/>;

export default SpotlightGridExample;

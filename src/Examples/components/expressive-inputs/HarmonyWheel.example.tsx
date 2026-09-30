import {HarmonyWheel} from "./HarmonyWheel";

// Brand palette builder for a bakery rebrand, starting from their existing green.
const HarmonyWheelExample = () => (
    <HarmonyWheel
        defaultHue={158}
        defaultLightness={40}
        defaultHarmony="split"
        saturation={58}
    />
);

export default HarmonyWheelExample;

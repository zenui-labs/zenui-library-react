import {useState} from "react";
import {RingCountdown} from "./RingCountdown";

// The offer ends later today, a few hours after the example first renders.
const endsIn = (8 * 60 + 42) * 60_000 + 18_000;

const RingCountdownExample = () => {
    const [offerEnds] = useState(() => Date.now() + endsIn);
    return <RingCountdown target={offerEnds}/>;
};

export default RingCountdownExample;

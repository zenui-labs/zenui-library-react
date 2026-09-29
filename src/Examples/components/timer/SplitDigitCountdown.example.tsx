import {useState} from "react";
import {SplitDigitCountdown} from "./SplitDigitCountdown";

// The offer ends later today, a few hours after the example first renders.
const endsIn = (8 * 60 + 42) * 60_000 + 18_000;

const SplitDigitCountdownExample = () => {
    const [offerEnds] = useState(() => Date.now() + endsIn);
    return <SplitDigitCountdown target={offerEnds}/>;
};

export default SplitDigitCountdownExample;

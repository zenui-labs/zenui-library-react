import {useState} from "react";
import {FlipCountdown} from "./FlipCountdown";

// Launch is set a few days ahead of when the example first renders.
const launchIn = ((3 * 24 + 7) * 60 + 42) * 60_000 + 18_000;

const FlipCountdownExample = () => {
    const [launch] = useState(() => Date.now() + launchIn);
    return <FlipCountdown target={launch}/>;
};

export default FlipCountdownExample;

import {useState} from "react";
import {MinimalCountdown} from "./MinimalCountdown";

// The sale ends a few days after the example first renders.
const endsIn = ((3 * 24 + 7) * 60 + 42) * 60_000 + 18_000;

const MinimalCountdownExample = () => {
    const [saleEnds] = useState(() => Date.now() + endsIn);
    return <MinimalCountdown target={saleEnds}/>;
};

export default MinimalCountdownExample;

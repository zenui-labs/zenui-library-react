import {useState} from "react";
import {BoxedCountdown} from "./BoxedCountdown";

// The sale ends a few days after the example first renders.
const endsIn = ((3 * 24 + 7) * 60 + 42) * 60_000 + 18_000;

const BoxedCountdownExample = () => {
    const [saleEnds] = useState(() => Date.now() + endsIn);
    return <BoxedCountdown target={saleEnds}/>;
};

export default BoxedCountdownExample;

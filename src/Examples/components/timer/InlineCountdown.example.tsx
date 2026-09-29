import {useState} from "react";
import {InlineCountdown} from "./InlineCountdown";

// The sale ends a few days after the example first renders.
const endsIn = ((3 * 24 + 7) * 60 + 42) * 60_000 + 18_000;

const InlineCountdownExample = () => {
    const [saleEnds] = useState(() => Date.now() + endsIn);
    return <InlineCountdown target={saleEnds}/>;
};

export default InlineCountdownExample;

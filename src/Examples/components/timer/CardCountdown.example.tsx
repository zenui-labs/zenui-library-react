import {useState} from "react";
import {CardCountdown} from "./CardCountdown";

// The sale ends a few days after the example first renders.
const endsIn = ((3 * 24 + 7) * 60 + 42) * 60_000 + 18_000;

const CardCountdownExample = () => {
    const [saleEnds] = useState(() => Date.now() + endsIn);
    return <CardCountdown target={saleEnds}/>;
};

export default CardCountdownExample;

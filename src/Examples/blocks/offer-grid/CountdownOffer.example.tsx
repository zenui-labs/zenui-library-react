import {useState} from "react";
import {CountdownOffer} from "./CountdownOffer";

// Ends three days after the page opens, so the demo always shows a running timer.
const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

const CountdownOfferExample = () => {
    const [expiresAt] = useState(() => Date.now() + THREE_DAYS);

    return (
        <div className="flex justify-center p-8">
            <CountdownOffer
                image="https://i.ibb.co.com/wpZ3Vhc/Paste-image.png"
                imageAlt="Electronics on sale"
                expiresAt={expiresAt}
                title="Hurry up, 40% off"
                description="Thousands of high tech products are waiting for you"
                href="#sale"
            />
        </div>
    );
};

export default CountdownOfferExample;

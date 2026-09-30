import {RotaryPhoneDial} from "./RotaryPhoneDial";

// For the demo the code is printed on the card. In a real app, check it on the server.
const RotaryPhoneDialExample = () => (
    <RotaryPhoneDial
        label="Enter the 4-digit door code"
        length={4}
        validate={(code) => code === "1947"}
        card={{eyebrow: "Flat 3B", title: "Door entry", caption: "Demo code 1947"}}
        acceptedText="Door released. Push within 5 seconds."
        rejectedText="That code didn't open the door."
    />
);

export default RotaryPhoneDialExample;

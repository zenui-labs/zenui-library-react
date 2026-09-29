import {useState} from "react";
import {PositionedNumberInput} from "./PositionedNumberInput";

// Both fields share one value, so either set of buttons changes the same number.
const PositionedNumberInputExample = () => {
    const [seats, setSeats] = useState(0);

    return (
        <div className="flex flex-col items-center gap-5">
            <PositionedNumberInput buttonPosition="left" label="Seats" value={seats} onChange={setSeats}/>
            <PositionedNumberInput buttonPosition="right" label="Seats" value={seats} onChange={setSeats}/>
        </div>
    );
};

export default PositionedNumberInputExample;

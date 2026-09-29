import {useState} from "react";
import {RangeSlider} from "./RangeSlider";

const RangeSliderExample = () => {
    const [volume, setVolume] = useState(0);

    return <RangeSlider label="Volume" value={volume} onChange={setVolume}/>;
};

export default RangeSliderExample;

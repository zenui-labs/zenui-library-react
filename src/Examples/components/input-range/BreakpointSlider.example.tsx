import {useState} from "react";
import {BreakpointSlider} from "./BreakpointSlider";

const zoomLevels: number[] = [0, 25, 50, 75, 100];

const BreakpointSliderExample = () => {
    const [zoom, setZoom] = useState(50);

    return <BreakpointSlider label="Zoom" breakpoints={zoomLevels} value={zoom} onChange={setZoom}/>;
};

export default BreakpointSliderExample;

import {ScrubInput, type ShapeStyle} from "./ScrubInput";

const heroCard: ShapeStyle = {width: 200, height: 128, radius: 24, rotation: -8, opacity: 90};

const ScrubInputExample = () => <ScrubInput defaultValue={heroCard}/>;

export default ScrubInputExample;

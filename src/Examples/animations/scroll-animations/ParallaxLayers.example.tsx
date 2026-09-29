import {LuMountain, LuTent, LuTrees} from "react-icons/lu";
import {ParallaxLayers, type Trail} from "./ParallaxLayers";

const trails: Trail[] = [
    {name: "Larch Lake loop", distance: "9.4 km", climb: "410 m", icon: LuTrees},
    {name: "Grey Ridge traverse", distance: "16.2 km", climb: "1,080 m", icon: LuMountain},
    {name: "Cedar Flats camp", distance: "5.8 km", climb: "120 m", icon: LuTent},
];

const ParallaxLayersExample = () => (
    <ParallaxLayers trails={trails} listDescription="Snow has cleared below 2,000 m. Trailheads open at 6 am."/>
);

export default ParallaxLayersExample;

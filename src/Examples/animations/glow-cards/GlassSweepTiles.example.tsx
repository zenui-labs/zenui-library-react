import {LuLightbulb, LuLock, LuThermometer, LuWind} from "react-icons/lu";
import {GlassSweepTiles, type Device} from "./GlassSweepTiles";

const devices: Device[] = [
    {id: "lights", name: "Ceiling lights", room: "Living room", icon: LuLightbulb, onLabel: "On, 80%", offLabel: "Off", defaultOn: true},
    {id: "heat", name: "Heating", room: "Whole home", icon: LuThermometer, onLabel: "Heating to 21°", offLabel: "Eco, 17°"},
    {id: "lock", name: "Front door", room: "Entrance", icon: LuLock, onLabel: "Locked", offLabel: "Unlocked", defaultOn: true},
    {id: "air", name: "Air purifier", room: "Bedroom", icon: LuWind, onLabel: "Auto, quiet", offLabel: "Off"},
];

const GlassSweepTilesExample = () => <GlassSweepTiles devices={devices} subtitle="Evening scene"/>;

export default GlassSweepTilesExample;

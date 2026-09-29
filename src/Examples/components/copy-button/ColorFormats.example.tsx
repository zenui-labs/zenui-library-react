import {ColorFormats, type ColorSwatch} from "./ColorFormats";

const swatches: ColorSwatch[] = [
    {name: "Lagoon", token: "brand-500", hex: "#0EA5A4"},
    {name: "Ember", token: "accent-500", hex: "#F97316"},
    {name: "Iris", token: "primary-600", hex: "#5B5BD6"},
    {name: "Moss", token: "success-600", hex: "#4D7C0F"},
    {name: "Ink", token: "neutral-900", hex: "#1C1917"},
];

const ColorFormatsExample = () => <ColorFormats swatches={swatches}/>;

export default ColorFormatsExample;

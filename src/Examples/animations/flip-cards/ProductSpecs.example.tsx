import {LuHeadphones} from "react-icons/lu";
import {ProductSpecs, type Finish, type Product, type Spec} from "./ProductSpecs";

const finishes: Finish[] = [
    {name: "Graphite", swatch: "bg-slate-800", stage: "from-slate-200 to-slate-400 dark:from-slate-700 dark:to-slate-900"},
    {name: "Sandstone", swatch: "bg-amber-200", stage: "from-amber-100 to-orange-200 dark:from-amber-900/60 dark:to-orange-950"},
    {name: "Sage", swatch: "bg-emerald-300", stage: "from-emerald-100 to-teal-200 dark:from-emerald-900/60 dark:to-teal-950"},
];

const specs: Spec[] = [
    {label: "Battery life", value: "40 h", level: 0.9},
    {label: "Noise cancelling", value: "-38 dB", level: 0.8},
    {label: "Weight", value: "254 g", level: 0.45},
    {label: "Charging, 10 min", value: "5 h playback", level: 0.6},
];

const product: Product = {
    name: "Aura Studio ANC",
    category: "Over-ear",
    price: "$349",
    icon: LuHeadphones,
    finishes,
    specs,
    footnote: "Bluetooth 5.3, USB-C, multipoint pairing with two devices.",
};

const ProductSpecsExample = () => <ProductSpecs product={product}/>;

export default ProductSpecsExample;

import {ProductSpecCompare, type Spec, type SpecProduct} from "./ProductSpecCompare";

const products: SpecProduct[] = [
    {id: "one", name: "Aria One", price: 149, rating: 4.5, reviews: 1204, colorways: [{name: "Graphite", hex: "#334155"}, {name: "Sand", hex: "#d6c7ae"}, {name: "Sage", hex: "#84a98c"}]},
    {id: "pro", name: "Aria Pro", price: 279, rating: 4.8, reviews: 3410, colorways: [{name: "Midnight", hex: "#1e293b"}, {name: "Silver", hex: "#cbd5e1"}, {name: "Cobalt", hex: "#3b5bdb"}]},
    {id: "studio", name: "Aria Studio", price: 399, rating: 4.7, reviews: 612, colorways: [{name: "Walnut", hex: "#7c4a2d"}, {name: "Onyx", hex: "#0f172a"}]},
];

const specs: Spec[] = [
    {kind: "number", label: "Battery life", unit: "h", better: "higher", values: {one: 30, pro: 40, studio: 24}},
    {kind: "number", label: "Weight", unit: "g", better: "lower", values: {one: 220, pro: 254, studio: 310}},
    {kind: "text", label: "Noise cancelling", values: {one: "Standard", pro: "Adaptive, 6 mics", studio: "Adaptive, 8 mics"}},
    {kind: "text", label: "Drivers", values: {one: "32 mm dynamic", pro: "40 mm dynamic", studio: "50 mm planar"}},
    {kind: "text", label: "Codecs", values: {one: "AAC, SBC", pro: "AAC, LDAC", studio: "AAC, LDAC, aptX Lossless"}},
    {kind: "number", label: "Fast charge, 10 minutes", unit: "h", better: "higher", values: {one: 5, pro: 7, studio: 3}},
    {kind: "text", label: "Water resistance", values: {one: "None", pro: "IPX4", studio: "None"}},
    {kind: "text", label: "In the box", values: {one: "Cable", pro: "Case, cable", studio: "Hard case, cable, flight adapter"}},
];

const Headphones = ({color}: {color: string}) => (
    <svg viewBox="0 0 120 100" className="h-24 w-28" aria-hidden="true">
        <path d="M20 62 C20 20, 100 20, 100 62" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"/>
        <path d="M24 60 C26 30, 94 30, 96 60" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2"/>
        <rect x="10" y="54" width="22" height="36" rx="10" fill={color}/>
        <rect x="88" y="54" width="22" height="36" rx="10" fill={color}/>
        <rect x="14" y="60" width="6" height="24" rx="3" fill="white" fillOpacity="0.2"/>
        <rect x="92" y="60" width="6" height="24" rx="3" fill="white" fillOpacity="0.2"/>
    </svg>
);

const ProductSpecCompareExample = () => (
    <ProductSpecCompare
        products={products}
        specs={specs}
        title="Which Aria is right for you"
        description="All three fold flat, pair with two devices at once and come with a two-year warranty."
        caption="Aria headphones specifications"
        renderImage={(_, colorway) => <Headphones color={colorway.hex}/>}
    />
);

export default ProductSpecCompareExample;

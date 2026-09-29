import {ProductTiltCard, type Finish} from "./ProductTiltCard";

const finishes: Finish[] = [
    {name: "Graphite", shell: "#27272a", band: "#3f3f46", cushion: "#52525b", backdrop: "from-zinc-200 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900", swatch: "bg-zinc-800"},
    {name: "Sand", shell: "#d6c3a5", band: "#bca68a", cushion: "#f1e7d6", backdrop: "from-amber-100 to-orange-50 dark:from-amber-950/60 dark:to-zinc-900", swatch: "bg-[#d6c3a5]"},
    {name: "Harbor", shell: "#1e3a5f", band: "#2b4f7e", cushion: "#94a3b8", backdrop: "from-sky-200 to-sky-50 dark:from-sky-950 dark:to-zinc-900", swatch: "bg-[#1e3a5f]"},
    {name: "Sage", shell: "#7c8f7a", band: "#667a64", cushion: "#dfe7dc", backdrop: "from-emerald-100 to-lime-50 dark:from-emerald-950/70 dark:to-zinc-900", swatch: "bg-[#7c8f7a]"},
];

const ProductTiltCardExample = () => (
    <ProductTiltCard
        name="Arc Studio headphones"
        price="$249"
        rating={4.8}
        reviewCount={2113}
        badge="New"
        finishes={finishes}
    />
);

export default ProductTiltCardExample;

import {CopyButtons, type Swatch} from "./CopyButtons";

const swatches: Swatch[] = [
    {name: "Indigo 500", hex: "#6366F1", fillClassName: "bg-indigo-500"},
    {name: "Emerald 500", hex: "#10B981", fillClassName: "bg-emerald-500"},
    {name: "Amber 400", hex: "#FBBF24", fillClassName: "bg-amber-400"},
    {name: "Rose 500", hex: "#F43F5E", fillClassName: "bg-rose-500"},
    {name: "Zinc 900", hex: "#18181B", fillClassName: "bg-zinc-900 dark:ring-1 dark:ring-inset dark:ring-white/15"},
];

const CopyButtonsExample = () => (
    <CopyButtons idValue="ord_8F2K4D91" link="https://app.example.com/join/atlas-team" swatches={swatches}/>
);

export default CopyButtonsExample;

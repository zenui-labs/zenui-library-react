import {ColoredBreadcrumb, type BreadcrumbItem, type BreadcrumbTone} from "./ColoredBreadcrumb";

const items: BreadcrumbItem[] = [
    {label: "Home"},
    {label: "Category"},
    {label: "Sub Category"},
    {label: "Current Page"},
];

const tones: BreadcrumbTone[] = ["blue", "orange", "green"];

const ColoredBreadcrumbExample = () => (
    <div className="flex flex-col gap-[10px]">
        {tones.map((tone) => (
            <ColoredBreadcrumb key={tone} items={items} tone={tone}/>
        ))}
    </div>
);

export default ColoredBreadcrumbExample;

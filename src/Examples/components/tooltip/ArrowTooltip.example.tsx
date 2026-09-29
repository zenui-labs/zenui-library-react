import {ArrowTooltip, type ArrowAlign} from "./ArrowTooltip";

const tooltips: {label: string; arrow: ArrowAlign}[] = [
    {label: "Left", arrow: "left"},
    {label: "Center", arrow: "center"},
    {label: "Right", arrow: "right"},
];

const ArrowTooltipExample = () => (
    <div className="flex items-center gap-6">
        {tooltips.map((tooltip) => (
            <ArrowTooltip key={tooltip.arrow} label={tooltip.label} content={tooltip.label} arrow={tooltip.arrow}/>
        ))}
    </div>
);

export default ArrowTooltipExample;

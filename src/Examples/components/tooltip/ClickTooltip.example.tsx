import {ClickTooltip, type ClickTooltipSide} from "./ClickTooltip";

const tooltips: {label: string; content: string; side: ClickTooltipSide}[] = [
    {label: "Left", content: "Left tooltip", side: "left"},
    {label: "Top", content: "Top tooltip", side: "top"},
    {label: "Bottom", content: "Bottom tooltip", side: "bottom"},
    {label: "Right", content: "Right tooltip", side: "right"},
];

const ClickTooltipExample = () => (
    <div className="flex items-center gap-[10px] justify-center flex-wrap">
        {tooltips.map((tooltip) => (
            <ClickTooltip key={tooltip.side} label={tooltip.label} content={tooltip.content} side={tooltip.side}/>
        ))}
    </div>
);

export default ClickTooltipExample;

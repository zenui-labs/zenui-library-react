import {SlideTooltip, type TooltipSide} from "./SlideTooltip";

const tooltips: {label: string; content: string; side: TooltipSide}[] = [
    {label: "Left", content: "Left tooltip", side: "left"},
    {label: "Top", content: "Top tooltip", side: "top"},
    {label: "Bottom", content: "Bottom tooltip", side: "bottom"},
    {label: "Right", content: "Right tooltip", side: "right"},
];

const SlideTooltipExample = () => (
    <div className="flex items-center gap-6 flex-wrap">
        {tooltips.map((tooltip) => (
            <SlideTooltip key={tooltip.side} label={tooltip.label} content={tooltip.content} side={tooltip.side}/>
        ))}
    </div>
);

export default SlideTooltipExample;

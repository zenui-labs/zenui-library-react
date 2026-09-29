import {DirectionalFillButton, type FillDirection} from "./DirectionalFillButton";

const buttons: {direction: FillDirection; label: string}[] = [
    {direction: "left-bottom", label: "Left bottom"},
    {direction: "right-top", label: "Right top"},
    {direction: "left", label: "Left"},
    {direction: "right", label: "Right"},
    {direction: "top", label: "Top"},
    {direction: "bottom", label: "Bottom"},
];

const DirectionalFillButtonExample = () => (
    <div className="flex flex-wrap items-center justify-center gap-5">
        {buttons.map((button) => (
            <DirectionalFillButton key={button.direction} direction={button.direction}>
                {button.label}
            </DirectionalFillButton>
        ))}
    </div>
);

export default DirectionalFillButtonExample;

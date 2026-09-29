import {FlashPressButton, ScalePressButton} from "./ClickFeedbackButtons";

const ClickFeedbackButtonsExample = () => (
    <div className="flex flex-wrap items-center justify-center gap-5">
        <ScalePressButton>Click me</ScalePressButton>
        <FlashPressButton>Click me</FlashPressButton>
    </div>
);

export default ClickFeedbackButtonsExample;

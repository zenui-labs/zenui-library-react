import {MoodSlider} from "./MoodSlider";

const MoodSliderExample = () => (
    <MoodSlider
        question="How was your checkout today?"
        context="Order #48213 · collected at Linden Street, 14:02"
        defaultValue={64}
    />
);

export default MoodSliderExample;

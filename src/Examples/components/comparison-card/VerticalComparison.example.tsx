import {VerticalComparison, type ComparisonImage} from "./VerticalComparison";

const before: ComparisonImage = {src: "https://i.ibb.co.com/YXzxRBv/before.png", alt: "Before"};
const after: ComparisonImage = {src: "https://i.ibb.co.com/1ZKL4wK/after.png", alt: "After"};

const VerticalComparisonExample = () => (
    <div className="h-[336px] w-full">
        <VerticalComparison before={before} after={after}/>
    </div>
);

export default VerticalComparisonExample;

import {HorizontalComparison, type ComparisonImage} from "./HorizontalComparison";

const before: ComparisonImage = {src: "https://i.ibb.co.com/YXzxRBv/before.png", alt: "Before"};
const after: ComparisonImage = {src: "https://i.ibb.co.com/1ZKL4wK/after.png", alt: "After"};

const HorizontalComparisonExample = () => <HorizontalComparison before={before} after={after}/>;

export default HorizontalComparisonExample;

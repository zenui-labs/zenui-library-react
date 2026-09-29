import {BubbleSort} from "./BubbleSort";

// Ten bars with random heights between 20 and 119 percent of the chart.
const values: number[] = Array.from({length: 10}, () => Math.floor(Math.random() * 100) + 20);

const BubbleSortExample = () => <BubbleSort values={values}/>;

export default BubbleSortExample;

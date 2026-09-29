import {ShuffleSort, type ShuffleSortItem} from "./ShuffleSort";

// Twelve tiles with random values between 0 and 99.
const items: ShuffleSortItem[] = Array.from({length: 12}, (_, index) => ({
    id: String(index + 1),
    value: Math.floor(Math.random() * 100),
}));

const ShuffleSortExample = () => <ShuffleSort items={items}/>;

export default ShuffleSortExample;

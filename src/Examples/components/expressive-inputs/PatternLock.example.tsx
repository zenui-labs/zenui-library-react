import {PatternLock} from "./PatternLock";

// A "Z": along the top row, down the diagonal (through the centre dot) and along the bottom row.
const unlockPattern = [0, 1, 2, 4, 6, 7, 8];

const PatternLockExample = () => (
    <PatternLock
        pattern={unlockPattern}
        title="Draw your unlock pattern"
        hint="Hint: the first letter of your dog's name"
    />
);

export default PatternLockExample;

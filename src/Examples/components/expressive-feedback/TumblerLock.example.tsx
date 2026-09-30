import {TumblerLock, type TumblerRequirement} from "./TumblerLock";

// Passwords seen most often in breach dumps. Anything containing one of them fails the last pin.
const breached = ["password", "123456", "qwerty", "letmein", "welcome", "iloveyou", "admin", "dragon", "football", "sunshine"];

const requirements: TumblerRequirement[] = [
    {id: "length", label: "12 or more characters", test: (value) => value.length >= 12},
    {id: "number", label: "A number", test: (value) => /\d/.test(value)},
    {id: "symbol", label: "A symbol, like ! or #", test: (value) => /[^A-Za-z0-9\s]/.test(value)},
    {id: "upper", label: "An uppercase letter", test: (value) => /[A-Z]/.test(value)},
    {
        id: "common",
        label: "Not a breached password",
        test: (value) => value.length > 0 && !breached.some((word) => value.toLowerCase().includes(word)),
    },
];

const TumblerLockExample = () => <TumblerLock label="Choose a password" requirements={requirements}/>;

export default TumblerLockExample;

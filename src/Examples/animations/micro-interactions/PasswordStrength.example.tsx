import {PasswordStrength, type PasswordRule} from "./PasswordStrength";

const rules: PasswordRule[] = [
    {label: "At least 12 characters", test: (value) => value.length >= 12},
    {label: "Upper and lowercase letters", test: (value) => /[a-z]/.test(value) && /[A-Z]/.test(value)},
    {label: "At least one number", test: (value) => /\d/.test(value)},
    {label: "At least one symbol", test: (value) => /[^A-Za-z0-9]/.test(value)},
];

const PasswordStrengthExample = () => <PasswordStrength rules={rules}/>;

export default PasswordStrengthExample;

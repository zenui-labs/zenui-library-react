import {PasswordStrengthMeter, type PasswordRule} from "./PasswordStrengthMeter";

const rules: PasswordRule[] = [
    {label: "Lowercase letter", test: (password) => /[a-z]/.test(password)},
    {label: "Uppercase letter", test: (password) => /[A-Z]/.test(password)},
    {label: "Number", test: (password) => /[0-9]/.test(password)},
    {label: "Special character", test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password)},
    {label: "At least 8 characters", test: (password) => password.length >= 8},
];

const PasswordStrengthMeterExample = () => (
    <div className="w-full md:w-[80%]">
        <PasswordStrengthMeter rules={rules} name="password" autoComplete="new-password"/>
    </div>
);

export default PasswordStrengthMeterExample;

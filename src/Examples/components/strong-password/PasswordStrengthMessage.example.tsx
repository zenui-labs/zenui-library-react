import {PasswordStrengthMessage, type PasswordMessageRule} from "./PasswordStrengthMessage";

const rules: PasswordMessageRule[] = [
    {message: "Password must contain at least one lowercase letter.", test: (password) => /[a-z]/.test(password)},
    {message: "Password must contain at least one uppercase letter.", test: (password) => /[A-Z]/.test(password)},
    {message: "Password must contain at least one number.", test: (password) => /[0-9]/.test(password)},
    {message: "Password must contain at least one special character.", test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password)},
    {message: "Password must be at least 8 characters long.", test: (password) => password.length >= 8},
];

const PasswordStrengthMessageExample = () => (
    <div className="w-full md:w-[80%]">
        <PasswordStrengthMessage rules={rules} name="password" autoComplete="new-password"/>
    </div>
);

export default PasswordStrengthMessageExample;

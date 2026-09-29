import {PasswordChecklist, type PasswordRule} from "./PasswordChecklist";

const rules: PasswordRule[] = [
    {label: "Minimum number of characters is 8.", test: (password) => password.length >= 8},
    {label: "Should contain uppercase.", test: (password) => /[A-Z]/.test(password)},
    {label: "Should contain lowercase.", test: (password) => /[a-z]/.test(password)},
    {label: "Should contain numbers.", test: (password) => /[0-9]/.test(password)},
    {label: "Should contain special characters.", test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password)},
];

const PasswordChecklistExample = () => (
    <div className="w-full md:w-[80%]">
        <PasswordChecklist rules={rules} name="password" autoComplete="new-password"/>
    </div>
);

export default PasswordChecklistExample;

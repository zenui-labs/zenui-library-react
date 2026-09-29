import {PasswordResetFlow, type ResetPasswordRule} from "./PasswordResetFlow";

// The last rule stands in for a history check. In your app, check reused passwords on the server.
const rules: ResetPasswordRule[] = [
    {label: "At least 12 characters", test: (v) => v.length >= 12},
    {label: "An uppercase and a lowercase letter", test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v)},
    {label: "A number or symbol", test: (v) => /[\d\W_]/.test(v)},
    {label: "Not one of your last 3 passwords", test: (v) => v.length > 0 && v !== "Password1234"},
];

// Replace with your API requests.
const wait = () => new Promise<void>((resolve) => window.setTimeout(resolve, 800));

const PasswordResetFlowExample = () => (
    <PasswordResetFlow
        rules={rules}
        onRequestLink={wait}
        onSavePassword={wait}
        otherDevices={3}
        linkShortcut
        resetLabel="Restart the demo"
    />
);

export default PasswordResetFlowExample;

import {TwoFactorCode, type TwoFactorMethod} from "./TwoFactorCode";

// The demo accepts this code, or any recovery code shaped like a1b2-c3d4.
const DEMO_CODE = "428193";

// Replace with your API call.
const verifyCode = (code: string, method: TwoFactorMethod) =>
    new Promise<boolean>((resolve) => {
        window.setTimeout(() => resolve(code === DEMO_CODE || (method === "recovery" && /^[a-z0-9]{4}-[a-z0-9]{4}$/i.test(code))), 800);
    });

const TwoFactorCodeExample = () => (
    <TwoFactorCode
        onVerify={verifyCode}
        device="Chrome on macOS, San Francisco"
        hint={<>Demo code: <span className="font-mono text-zinc-600 dark:text-zinc-300">{DEMO_CODE}</span></>}
        resetLabel="Run the demo again"
    />
);

export default TwoFactorCodeExample;

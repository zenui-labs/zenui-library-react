import {SsoPasskeySignIn, type SsoProvider} from "./SsoPasskeySignIn";

// Domains with SSO configured. In production, look this up on your server as the user types.
const ssoDomains: Record<string, SsoProvider> = {
    "acme.com": {org: "Acme Corporation", name: "Okta"},
    "globex.io": {org: "Globex", name: "Microsoft Entra ID"},
    "initech.co": {org: "Initech", name: "Google Workspace"},
};

// Replace with navigator.credentials.get({publicKey: ..., signal}) using options from your server.
const signInWithPasskey = (signal: AbortSignal) =>
    new Promise<string>((resolve, reject) => {
        const id = window.setTimeout(() => resolve("Dana Whitfield"), 2200);
        signal.addEventListener("abort", () => {
            window.clearTimeout(id);
            reject(new Error("Cancelled"));
        });
    });

// Replace with a redirect to the identity provider.
const redirectToProvider = () => new Promise<void>((resolve) => window.setTimeout(resolve, 1600));

const SsoPasskeySignInExample = () => (
    <SsoPasskeySignIn
        ssoDomains={ssoDomains}
        onPasskey={signInWithPasskey}
        onSsoContinue={redirectToProvider}
        hintEmail="dana@acme.com"
    />
);

export default SsoPasskeySignInExample;

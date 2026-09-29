import {EmailLinkSignIn} from "./EmailLinkSignIn";

// Replace with a request that emails a one-time sign-in link.
const sendLink = () => new Promise<void>((resolve) => window.setTimeout(resolve, 900));

const EmailLinkSignInExample = () => <EmailLinkSignIn onSend={sendLink}/>;

export default EmailLinkSignInExample;

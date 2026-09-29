import {SignUpCard} from "./SignUpCard";

// Replace with your sign-up request. The demo waits a second, then shows the check your inbox step.
const createWorkspace = () => new Promise<void>((resolve) => window.setTimeout(resolve, 1000));

const SignUpCardExample = () => <SignUpCard onSubmit={createWorkspace}/>;

export default SignUpCardExample;

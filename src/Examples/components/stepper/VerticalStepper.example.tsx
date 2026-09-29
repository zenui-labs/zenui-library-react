import {VerticalStepper, type VerticalStep} from "./VerticalStepper";

const steps: VerticalStep[] = [
    {title: "Create account", description: "Pick a username and password"},
    {title: "Verify email", description: "Open the link we sent you"},
    {title: "Set up profile", description: "Add a photo and a short bio"},
    {title: "Invite your team", description: "Send invites by email"},
];

const VerticalStepperExample = () => <VerticalStepper steps={steps} activeStep={1}/>;

export default VerticalStepperExample;

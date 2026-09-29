import {NumberStepper} from "./NumberStepper";

const steps = ["Cart items", "Payment process", "Success"];

const NumberStepperExample = () => <NumberStepper steps={steps} activeStep={0}/>;

export default NumberStepperExample;

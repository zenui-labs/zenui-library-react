import {LabeledInput} from "./LabeledInput";

const LabeledInputExample = () => (
    <div className="w-full md:w-[80%]">
        <LabeledInput label="Name" name="name" placeholder="Your name" autoComplete="name" required/>
    </div>
);

export default LabeledInputExample;

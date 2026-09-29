import {LabeledTextarea} from "./LabeledTextarea";

const LabeledTextareaExample = () => (
    <div className="w-full md:w-[80%]">
        <LabeledTextarea label="Description" name="description" placeholder="Write something about zenUI" required/>
    </div>
);

export default LabeledTextareaExample;

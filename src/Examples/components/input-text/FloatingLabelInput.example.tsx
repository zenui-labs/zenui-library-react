import {useState} from "react";
import {FloatingLabelInput} from "./FloatingLabelInput";

const FloatingLabelInputExample = () => {
    const [name, setName] = useState("");

    return (
        <div className="w-full md:w-[80%]">
            <FloatingLabelInput label="Your name" name="name" autoComplete="name" value={name} onChange={setName}/>
        </div>
    );
};

export default FloatingLabelInputExample;

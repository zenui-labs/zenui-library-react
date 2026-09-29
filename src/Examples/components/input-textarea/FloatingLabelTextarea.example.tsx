import {useState} from "react";
import {FloatingLabelTextarea} from "./FloatingLabelTextarea";

const FloatingLabelTextareaExample = () => {
    const [message, setMessage] = useState("");

    return (
        <div className="w-full md:w-[80%]">
            <FloatingLabelTextarea label="Write something about zenUI" name="message" value={message} onChange={setMessage}/>
        </div>
    );
};

export default FloatingLabelTextareaExample;

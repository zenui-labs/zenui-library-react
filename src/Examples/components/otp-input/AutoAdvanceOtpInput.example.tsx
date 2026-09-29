import {useState} from "react";
import {AutoAdvanceOtpInput} from "./AutoAdvanceOtpInput";

const AutoAdvanceOtpInputExample = () => {
    const [code, setCode] = useState("");

    return (
        <div className="w-full md:w-[50%]">
            <AutoAdvanceOtpInput length={4} value={code} onChange={setCode}/>
        </div>
    );
};

export default AutoAdvanceOtpInputExample;

import {useState} from "react";
import {OtpInput} from "./OtpInput";

const OtpInputExample = () => {
    const [code, setCode] = useState("");

    return (
        <div className="w-full md:w-[50%]">
            <OtpInput length={4} value={code} onChange={setCode}/>
        </div>
    );
};

export default OtpInputExample;

import {useState} from "react";
import {SubscribeInput} from "./SubscribeInput";

const SubscribeInputExample = () => {
    const [subscribed, setSubscribed] = useState("");

    return (
        <div className="w-full md:w-[80%]">
            <SubscribeInput name="email" onSubscribe={setSubscribed}/>
            <p role="status" className="mt-3 text-sm text-gray-500 dark:text-slate-400">
                {subscribed && `Subscribed ${subscribed}.`}
            </p>
        </div>
    );
};

export default SubscribeInputExample;

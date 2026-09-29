import {LuSend} from "react-icons/lu";
import {RippleButton} from "./RippleButton";

const RippleButtonExample = () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
        <RippleButton>
            <LuSend className="h-4 w-4" aria-hidden="true"/>
            Send invite
        </RippleButton>
        <RippleButton variant="secondary">Save draft</RippleButton>
        <RippleButton variant="ghost">Cancel</RippleButton>
    </div>
);

export default RippleButtonExample;

import {LuHash, LuMail, LuMapPin, LuPhone} from "react-icons/lu";
import {CopyToast, type ContactDetail} from "./CopyToast";

const details: ContactDetail[] = [
    {label: "Email", value: "billing@harborline.co", icon: LuMail},
    {label: "Phone", value: "+1 (415) 555-0142", icon: LuPhone},
    {label: "Tax ID", value: "US 84-2917305", icon: LuHash, mono: true},
    {label: "Address", value: "220 Brannan St, Suite 400, San Francisco, CA 94107", icon: LuMapPin},
];

const CopyToastExample = () => <CopyToast title="Harborline Logistics" subtitle="Billing contact" details={details}/>;

export default CopyToastExample;

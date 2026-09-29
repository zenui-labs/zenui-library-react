import {LuCalendar, LuCreditCard, LuFileText, LuHardDrive, LuLifeBuoy, LuMail, LuMessageCircle, LuUsers} from "react-icons/lu";
import {OrbitNetwork, type OrbitRing} from "./OrbitNetwork";

const innerRing: OrbitRing = {
    size: 0.56,
    speed: 9,
    stroke: 0.55,
    apps: [
        {id: "payments", label: "Payments", icon: LuCreditCard, angle: -90, outbound: false},
        {id: "crm", label: "CRM", icon: LuUsers, angle: 30, outbound: true},
        {id: "mail", label: "Email", icon: LuMail, angle: 150, outbound: false},
    ],
};

const outerRing: OrbitRing = {
    size: 0.94,
    speed: -5,
    stroke: 0.35,
    apps: [
        {id: "calendar", label: "Calendar", icon: LuCalendar, angle: -20, outbound: true},
        {id: "support", label: "Support", icon: LuLifeBuoy, angle: 52, outbound: false},
        {id: "storage", label: "Storage", icon: LuHardDrive, angle: 124, outbound: true},
        {id: "chat", label: "Chat", icon: LuMessageCircle, angle: 196, outbound: false},
        {id: "billing", label: "Invoices", icon: LuFileText, angle: 268, outbound: true},
    ],
};

const OrbitNetworkExample = () => (
    <OrbitNetwork
        innerRing={innerRing}
        outerRing={outerRing}
        caption={
            <>
                <span className="font-medium text-gray-900 dark:text-white">Nimbus</span> keeps 8 apps in sync, 1.2 million records today.
            </>
        }
    />
);

export default OrbitNetworkExample;

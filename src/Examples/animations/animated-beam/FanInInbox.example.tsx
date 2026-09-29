import {LuAtSign, LuClipboardList, LuMail, LuMessageCircle, LuPhone} from "react-icons/lu";
import {FanInInbox, type InboxChannel} from "./FanInInbox";

const channels: InboxChannel[] = [
    {id: "email", label: "Email", icon: LuMail, samples: ["Carla Ruiz: Refund for order #20931", "Ben Adler: Can't reset my password"]},
    {id: "chat", label: "Live chat", icon: LuMessageCircle, samples: ["Visitor from Oslo: Do you ship to Norway?", "Aiko Tan: Discount code not applying"]},
    {id: "phone", label: "Phone", icon: LuPhone, samples: ["Missed call from +1 415 555 0142", "Voicemail from Omar Haddad, 0:48"]},
    {id: "social", label: "Social", icon: LuAtSign, samples: ["@petraknits: Is the wool set back in stock?", "@dev_sam mentioned your status page"]},
    {id: "forms", label: "Forms", icon: LuClipboardList, samples: ["Wholesale inquiry from Juniper & Co", "Bug report: export button greyed out"]},
];

const FanInInboxExample = () => (
    <FanInInbox
        channels={channels}
        startCount={1284}
        caption="Every channel lands in one queue, so nobody has to check five tools."
    />
);

export default FanInInboxExample;

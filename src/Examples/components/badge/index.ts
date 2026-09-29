import type {Example} from "../../types.ts";
import MessageBadge from "./MessageBadge.example.tsx";
import messageBadgeSource from "./MessageBadge.example.tsx?raw";
import messageBadgeComponentSource from "./MessageBadge.tsx?raw";
import CartBadge from "./CartBadge.example.tsx";
import cartBadgeSource from "./CartBadge.example.tsx?raw";
import cartBadgeComponentSource from "./CartBadge.tsx?raw";
import OnlineAvatar from "./OnlineAvatar.example.tsx";
import onlineAvatarSource from "./OnlineAvatar.example.tsx?raw";
import onlineAvatarComponentSource from "./OnlineAvatar.tsx?raw";
import VerifiedAvatar from "./VerifiedAvatar.example.tsx";
import verifiedAvatarSource from "./VerifiedAvatar.example.tsx?raw";
import verifiedAvatarComponentSource from "./VerifiedAvatar.tsx?raw";

const examples: Example[] = [
    {
        id: "message_badge",
        title: "Message badge",
        description: "A mail icon with a count or a small dot that flags new messages or notifications.",
        component: MessageBadge,
        source: messageBadgeSource,
        files: [{name: "MessageBadge.tsx", source: messageBadgeComponentSource}],
    },
    {
        id: "cart_badge",
        title: "Cart badge",
        description: "A cart icon with a count that shows how many items are in the cart.",
        component: CartBadge,
        source: cartBadgeSource,
        files: [{name: "CartBadge.tsx", source: cartBadgeComponentSource}],
    },
    {
        id: "online_badge",
        title: "Online badge",
        description: "An avatar with a green dot that shows the person is online, in four sizes.",
        component: OnlineAvatar,
        source: onlineAvatarSource,
        files: [{name: "OnlineAvatar.tsx", source: onlineAvatarComponentSource}],
    },
    {
        id: "verified_badge",
        title: "Verified badge",
        description: "An avatar with a check mark that marks a person or account as verified, in four sizes.",
        component: VerifiedAvatar,
        source: verifiedAvatarSource,
        files: [{name: "VerifiedAvatar.tsx", source: verifiedAvatarComponentSource}],
    },
];

export default examples;

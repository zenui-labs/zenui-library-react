import {InviteAcceptance, type Invite} from "./InviteAcceptance";

const invite: Invite = {
    inviterName: "Maya Chen",
    inviterInitials: "MC",
    inviterColor: "bg-pink-500",
    workspace: "Northwind Design",
    memberCount: 22,
    members: [
        {initials: "MC", color: "bg-pink-500"},
        {initials: "TA", color: "bg-sky-500"},
        {initials: "RB", color: "bg-amber-500"},
        {initials: "JK", color: "bg-emerald-500"},
    ],
    role: "Editor",
    email: "sam.rivera@northwind.design",
    expiresIn: "6 days",
};

// Replace with your accept-invite request.
const acceptInvite = () => new Promise<void>((resolve) => window.setTimeout(resolve, 1100));

const InviteAcceptanceExample = () => (
    <InviteAcceptance
        invite={invite}
        onAccept={acceptInvite}
        joinedMessage="Maya can see you are in. Your first file, Brand refresh 2027, is waiting."
        declinedMessage="We let Maya know. If this was a mistake, ask her to send a new invite."
        resetLabel="Replay demo"
    />
);

export default InviteAcceptanceExample;

import {InboxListDetail, type Message} from "./InboxListDetail";

const messages: Message[] = [
    {
        id: "renewal",
        from: "Dana Whitfield",
        company: "Acme Logistics",
        initials: "DW",
        color: "bg-violet-500",
        subject: "Renewal terms for 2027",
        preview: "Thanks for the call on Tuesday. Before we sign, could you confirm...",
        time: "9:42 AM",
        unread: true,
        attachment: "Acme_renewal_draft.pdf",
        body: [
            "Thanks for the call on Tuesday. Before we sign, could you confirm the per-seat price holds if we grow past 40 seats mid-year?",
            "Our finance team also asked whether annual billing can start on January 1 instead of the signature date. I attached the draft with both changes marked.",
        ],
    },
    {
        id: "launch",
        from: "Kenji Watanabe",
        company: "Northwind",
        initials: "KW",
        color: "bg-sky-500",
        subject: "Launch checklist, final pass",
        preview: "Everything is green except the status page copy. Can you take a look...",
        time: "8:15 AM",
        unread: true,
        body: [
            "Everything is green except the status page copy. Can you take a look before 3 PM so we can publish with the release notes?",
            "Support has the macros ready, and the rollback plan is linked in the doc.",
        ],
    },
    {
        id: "design",
        from: "Amara Osei",
        company: "Design team",
        initials: "AO",
        color: "bg-emerald-500",
        subject: "New onboarding screens",
        preview: "I pushed the second round. Main change is the progress step at the top...",
        time: "Yesterday",
        body: [
            "I pushed the second round. Main change is the progress step at the top, which now shows how many steps are left.",
            "Would love your notes on the empty state for teams with no projects yet.",
        ],
    },
    {
        id: "invoice",
        from: "Ledgerly",
        company: "Billing",
        initials: "L",
        color: "bg-indigo-500",
        subject: "Your September invoice is ready",
        preview: "Invoice INV-2026-0931 for $1,284.00 is now available to download...",
        time: "Sep 28",
        body: ["Invoice INV-2026-0931 for $1,284.00 is now available. It will be charged to the card on file on October 1."],
    },
];

const InboxListDetailExample = () => <InboxListDetail messages={messages}/>;

export default InboxListDetailExample;

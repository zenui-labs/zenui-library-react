import {MailShell} from "./MailShell";
import type {MailLabel, MailMessage} from "./MailShell";

const messages: MailMessage[] = [
    {
        id: 1, from: "Elena Vasquez", email: "elena@parallel.studio", subject: "Revised proposal for the Q4 rebrand",
        preview: "Thanks for the notes on Tuesday. I folded them into a revised scope and moved the brand workshop to week two.",
        body: [
            "Hi Marcus,",
            "Thanks for the notes on Tuesday. I folded them into a revised scope and moved the brand workshop to week two so your leadership team can join.",
            "The fee stays the same. The only change is that we deliver the motion guidelines in January instead of December. The updated proposal is attached.",
            "Could you confirm by Friday so we can hold the dates?",
            "Elena",
        ],
        time: "9:41 AM", unread: true, starred: true, folder: "Inbox", label: {name: "Clients", color: "bg-violet-500"}, attachment: {name: "Parallel_Rebrand_v3.pdf", size: "2.4 MB"},
    },
    {
        id: 2, from: "GitHub", email: "noreply@github.com", subject: "[northwind/api] PR #482 approved",
        preview: "Kai Nakamura approved these changes. Ready to merge once checks pass.",
        body: ["Kai Nakamura approved these changes on pull request #482, Rate limit webhooks per tenant.", "All 214 checks passed. You can merge this pull request."],
        time: "8:15 AM", unread: true, starred: false, folder: "Inbox",
    },
    {
        id: 3, from: "Priya Shah", email: "priya@northwind.io", subject: "Offsite dates in Lisbon",
        preview: "Two options for the November offsite, both near the river. Can you vote by Thursday?",
        body: ["Hi all,", "Two options for the November offsite: the 12th to 14th or the 19th to 21st. Both hotels are near the river and have a room for 30.", "Vote in the thread by Thursday and I will book."],
        time: "Yesterday", unread: false, starred: false, folder: "Inbox", label: {name: "Team", color: "bg-emerald-500"},
    },
    {
        id: 4, from: "Stripe", email: "receipts@stripe.com", subject: "Your receipt from Linear, $96.00",
        preview: "Receipt #2291-4410 for the Business plan, billed monthly.",
        body: ["Amount paid: $96.00", "Date paid: September 28, 2026", "Payment method: Visa ending 4242"],
        time: "Yesterday", unread: false, starred: false, folder: "Inbox", label: {name: "Receipts", color: "bg-amber-500"},
    },
    {
        id: 5, from: "Tomás Ferreira", email: "tomas@halcyon.vc", subject: "Intro: Northwind and Halcyon",
        preview: "Marcus, meet Jada. Jada leads platform investments at Halcyon and asked about your API usage numbers.",
        body: ["Marcus, meet Jada.", "Jada leads platform investments at Halcyon and has been following Northwind since your launch post. I will let you two take it from here."],
        time: "Mon", unread: false, starred: true, folder: "Inbox",
    },
    {
        id: 6, from: "Marcus Webb", email: "marcus@northwind.io", subject: "Re: Security review timeline",
        preview: "Works for us. We can share the pen test report under NDA next week.",
        body: ["Works for us. We can share the pen test report under NDA next week.", "Marcus"],
        time: "Mon", unread: false, starred: false, folder: "Sent",
    },
];

const labels: MailLabel[] = [
    {name: "Clients", color: "bg-violet-500"},
    {name: "Team", color: "bg-emerald-500"},
    {name: "Receipts", color: "bg-amber-500"},
];

const MailShellExample = () => <MailShell messages={messages} labels={labels} userName="Marcus Webb"/>;

export default MailShellExample;

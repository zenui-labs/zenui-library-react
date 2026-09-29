import {LuCreditCard, LuScanLine, LuWorkflow} from "react-icons/lu";
import {AlternatingRows, ApprovalFlow, CardLimit, ReceiptScan} from "./AlternatingRows";
import type {ApprovalRule, FeatureRow, ReceiptLine} from "./AlternatingRows";

const receipt: ReceiptLine[] = [
    {item: "Oat latte", price: "5.75"},
    {item: "Almond croissant", price: "4.50"},
    {item: "Cold brew", price: "5.25"},
    {item: "Tax", price: "1.43"},
];

const rules: ApprovalRule[] = [
    {label: "Over $500", detail: "Route to finance", tone: "amber"},
    {label: "Software", detail: "Needs IT review", tone: "sky"},
    {label: "Under $75", detail: "Auto approve", tone: "emerald"},
];

const rows: FeatureRow[] = [
    {
        id: "capture",
        eyebrow: "Receipt capture",
        icon: LuScanLine,
        title: "Snap a receipt and it files itself",
        body: "Ledgerly reads the merchant, amount and tax from a photo, matches it to the card charge and picks the category your team used last time.",
        points: ["Works with paper, email and PDF receipts", "Matches 94% of receipts without a tap", "Flags duplicates before they reach review"],
        linkLabel: "See how capture works",
        visual: <ReceiptScan merchant="Blue Bottle Cafe" timestamp="Oct 14, 2026 · 8:42 AM" lines={receipt} total="$16.93"
                             matchCategory="Meals · Client visit" matchDetail="Card ending 4021"/>,
    },
    {
        id: "approvals",
        eyebrow: "Approvals",
        icon: LuWorkflow,
        title: "Rules that send each expense to the right person",
        body: "Write policies once in plain terms. Small purchases clear on their own, and anything unusual lands with the right approver along with the context they need.",
        points: ["Conditions on amount, category and team", "Reminders after 48 hours without a decision", "A full history for every approval"],
        linkLabel: "Explore approval rules",
        visual: <ApprovalFlow title="Approval policy" trigger="When an expense is submitted" rules={rules}/>,
    },
    {
        id: "cards",
        eyebrow: "Corporate cards",
        icon: LuCreditCard,
        title: "A card for every subscription, with a limit that holds",
        body: "Issue virtual cards in seconds, tie them to a vendor and a budget, and freeze them when a tool is no longer needed. Nobody has to share the company card again.",
        points: ["Per vendor and per month limits", "Instant freeze from web or mobile", "Unlimited virtual cards at no cost"],
        linkLabel: "Compare card plans",
        visual: <CardLimit brand="Ledgerly" last4="4021" holder="Design team · Figma seats" spent={1240} limit={2000}
                           footnote="Resets Nov 1 · Locks at the limit"/>,
    },
];

const AlternatingRowsExample = () => <AlternatingRows rows={rows}/>;

export default AlternatingRowsExample;

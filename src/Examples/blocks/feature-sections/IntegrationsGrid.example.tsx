import {IntegrationsGrid, type Integration} from "./IntegrationsGrid";

const integrations: Integration[] = [
    {id: "chatter", name: "Chatter", category: "Communication", description: "Post new orders and refunds to any channel.", initials: "Ch", tile: "from-fuchsia-500 to-pink-500", installs: "12.4k"},
    {id: "mailroom", name: "Mailroom", category: "Communication", description: "Send receipts and shipping updates from your domain.", initials: "Mr", tile: "from-sky-500 to-blue-600", installs: "8.1k"},
    {id: "ledgerly", name: "Ledgerly", category: "Payments", description: "Sync invoices and payouts to your accounting ledger.", initials: "Lg", tile: "from-emerald-500 to-teal-600", installs: "6.7k"},
    {id: "tender", name: "Tender", category: "Payments", description: "Accept cards, wallets and bank debits in 40 countries.", initials: "Td", tile: "from-indigo-500 to-violet-600", installs: "21.9k"},
    {id: "warehouse", name: "Coldstore", category: "Data", description: "Stream events to your warehouse every five minutes.", initials: "Cs", tile: "from-cyan-500 to-sky-600", installs: "3.2k"},
    {id: "sheets", name: "Gridline", category: "Data", description: "Keep a live spreadsheet of orders for your finance team.", initials: "Gl", tile: "from-lime-500 to-green-600", installs: "9.8k"},
    {id: "hooks", name: "Webhooks", category: "Developer", description: "Signed HTTP callbacks for 38 event types with replay.", initials: "Wh", tile: "from-slate-600 to-slate-800", installs: "15.3k"},
    {id: "repo", name: "Commitly", category: "Developer", description: "Link deploys to incidents and show who shipped what.", initials: "Cm", tile: "from-orange-500 to-amber-500", installs: "4.6k"},
    {id: "status", name: "Beacon", category: "Developer", description: "Publish status updates when checkout degrades.", initials: "Bc", tile: "from-rose-500 to-red-600", installs: "2.9k"},
];

const IntegrationsGridExample = () => <IntegrationsGrid integrations={integrations} defaultInstalled={["tender", "hooks"]}/>;

export default IntegrationsGridExample;

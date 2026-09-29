import {LuCreditCard, LuGitBranch, LuMessageSquare, LuRocket, LuUserPlus} from "react-icons/lu";
import {NotificationStream, type StreamNotification} from "./NotificationStream";

const notifications: StreamNotification[] = [
    {title: "Payment received", detail: "$1,240.00 from Northwind Traders", icon: LuCreditCard, tone: "bg-emerald-500"},
    {title: "New sign-up", detail: "maria@hollowbrook.io joined the Team plan", icon: LuUserPlus, tone: "bg-sky-500"},
    {title: "Deploy finished", detail: "web-app to production in 48s", icon: LuRocket, tone: "bg-violet-500"},
    {title: "New comment", detail: "Dana on Q3 roadmap: \"Can we move this up?\"", icon: LuMessageSquare, tone: "bg-amber-500"},
    {title: "Pull request merged", detail: "#482 Add CSV export to reports", icon: LuGitBranch, tone: "bg-rose-500"},
];

const NotificationStreamExample = () => <NotificationStream notifications={notifications}/>;

export default NotificationStreamExample;

import {LuCreditCard, LuGitBranch, LuHardDrive, LuMessageSquare, LuPlane} from "react-icons/lu";
import {DissolveDelete, type DissolveNotification} from "./DissolveDelete";

const notifications: DissolveNotification[] = [
    {id: "deploy", icon: LuGitBranch, title: "Deploy to production finished", body: "web-app @ 3f9c2e1 is live on eu-west-1. 42 files changed, build took 3m 18s.", time: "2m"},
    {id: "comment", icon: LuMessageSquare, title: "Priya Raman replied", body: "“Can we move the pricing table above the fold for the Q4 launch?”", time: "14m"},
    {id: "payment", icon: LuCreditCard, title: "Invoice INV-2041 paid", body: "€1,240.00 from Halvorsen & Co. landed in the operating account.", time: "1h"},
    {id: "storage", icon: LuHardDrive, title: "Backup volume at 92%", body: "vol-backup-02 will be full in about 4 days at the current rate.", time: "3h"},
    {id: "flight", icon: LuPlane, title: "LH 1491 to Lisbon is boarding", body: "Gate B22 · Seat 14C · Boarding closes 14:35.", time: "5h"},
];

const DissolveDeleteExample = () => <DissolveDelete notifications={notifications}/>;

export default DissolveDeleteExample;

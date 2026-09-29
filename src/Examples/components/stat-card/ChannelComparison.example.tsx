import {ChannelComparison, type Channel} from "./ChannelComparison";

const channels: Channel[] = [
    {name: "Organic search", current: 18_420, previous: 15_310, color: "bg-indigo-500"},
    {name: "Direct", current: 9_860, previous: 10_240, color: "bg-sky-500"},
    {name: "Referral", current: 6_130, previous: 4_020, color: "bg-emerald-500"},
    {name: "Paid social", current: 4_770, previous: 6_950, color: "bg-amber-500"},
    {name: "Email", current: 2_940, previous: 2_610, color: "bg-rose-500"},
];

const ChannelComparisonExample = () => <ChannelComparison channels={channels}/>;

export default ChannelComparisonExample;

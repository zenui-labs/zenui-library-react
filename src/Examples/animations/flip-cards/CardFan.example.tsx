import {CardFan, type WalletCard} from "./CardFan";

const cards: WalletCard[] = [
    {id: "everyday", name: "Everyday debit", last4: "4821", balance: "$2,418.60", gradient: "from-slate-800 via-slate-900 to-black"},
    {id: "travel", name: "Travel rewards", last4: "9034", balance: "$640.12", gradient: "from-sky-500 via-blue-600 to-indigo-700"},
    {id: "savings", name: "High-yield savings", last4: "1177", balance: "$18,905.00", gradient: "from-emerald-500 via-teal-600 to-cyan-700"},
    {id: "business", name: "Studio business", last4: "6650", balance: "$7,212.45", gradient: "from-rose-500 via-pink-600 to-purple-700"},
];

const CardFanExample = () => <CardFan cards={cards}/>;

export default CardFanExample;

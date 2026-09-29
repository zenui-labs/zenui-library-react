import {useState} from "react";
import {LiveLeaderboard, type LeaderboardEntry} from "./LiveLeaderboard";

const initialReps: LeaderboardEntry[] = [
    {id: "ana", name: "Ana Souza", detail: "São Paulo", initials: "AS", color: "from-rose-400 to-pink-500", total: 48200},
    {id: "kofi", name: "Kofi Mensah", detail: "Accra", initials: "KM", color: "from-amber-400 to-orange-500", total: 45900},
    {id: "lin", name: "Lin Wei", detail: "Singapore", initials: "LW", color: "from-sky-400 to-blue-500", total: 44100},
    {id: "noah", name: "Noah Fischer", detail: "Berlin", initials: "NF", color: "from-emerald-400 to-teal-500", total: 41800},
    {id: "maya", name: "Maya Patel", detail: "Toronto", initials: "MP", color: "from-violet-400 to-purple-500", total: 40300},
    {id: "leo", name: "Leo Martin", detail: "Lyon", initials: "LM", color: "from-cyan-400 to-sky-500", total: 38700},
];

// Stand-in for real data: one or two reps close a deal. Lower ranks get slightly bigger deals so the order keeps changing.
const closeDeals = (reps: LeaderboardEntry[]) => {
    const ranked = [...reps].sort((a, b) => b.total - a.total);
    const winners = new Set<string>();
    const picks = Math.random() > 0.55 ? 2 : 1;
    while (winners.size < picks) winners.add(ranked[Math.floor(Math.random() * ranked.length)].id);
    return ranked.map((rep, rank) =>
        winners.has(rep.id) ? {...rep, total: rep.total + Math.round((1200 + Math.random() * 2600 + rank * 700) / 50) * 50} : rep,
    );
};

const LiveLeaderboardExample = () => {
    const [reps, setReps] = useState(initialReps);
    return <LiveLeaderboard entries={reps} onTick={() => setReps(closeDeals)}/>;
};

export default LiveLeaderboardExample;

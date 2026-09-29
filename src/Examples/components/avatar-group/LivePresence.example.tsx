import {LivePresence, type Viewer} from "./LivePresence";

// The first person is you. The others join and leave at random.
const people: Viewer[] = [
    {id: "maya", name: "Maya Chen", color: "bg-rose-500", ring: "ring-rose-500"},
    {id: "diego", name: "Diego Ramos", color: "bg-sky-500", ring: "ring-sky-500"},
    {id: "priya", name: "Priya Nair", color: "bg-amber-500", ring: "ring-amber-500"},
    {id: "tom", name: "Tom Becker", color: "bg-emerald-500", ring: "ring-emerald-500"},
    {id: "aisha", name: "Aisha Bello", color: "bg-violet-500", ring: "ring-violet-500"},
    {id: "lucas", name: "Lucas Moreau", color: "bg-cyan-500", ring: "ring-cyan-500"},
    {id: "hana", name: "Hana Sato", color: "bg-fuchsia-500", ring: "ring-fuchsia-500"},
];

const LivePresenceExample = () => <LivePresence title="Pricing page copy" people={people}/>;

export default LivePresenceExample;

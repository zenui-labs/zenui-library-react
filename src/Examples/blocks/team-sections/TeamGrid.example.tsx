import {TeamGrid, type HiringCardContent, type TeamMember} from "./TeamGrid";

const members: TeamMember[] = [
    {name: "Ana Ribeiro", role: "Co-founder and CEO", team: "Leadership", location: "Lisbon", bio: "Previously ran payments at a travel startup. Writes the Friday update.", gradient: "from-rose-400 to-orange-400", links: {linkedin: "#", twitter: "#"}},
    {name: "Kwame Asante", role: "Co-founder and CTO", team: "Leadership", location: "Accra", bio: "Built the first sync engine on a train between two cities.", gradient: "from-sky-400 to-indigo-500", links: {github: "#", linkedin: "#"}},
    {name: "Sofia Lindqvist", role: "Staff Engineer", team: "Engineering", location: "Stockholm", bio: "Owns the query planner and the on-call rotation rules.", gradient: "from-emerald-400 to-cyan-500", links: {github: "#"}},
    {name: "Ravi Menon", role: "Product Designer", team: "Design", location: "Bengaluru", bio: "Designs the editor and keeps the icon set at exactly 212 icons.", gradient: "from-violet-400 to-fuchsia-500", links: {twitter: "#", linkedin: "#"}},
    {name: "Chloe Martin", role: "Engineering Manager", team: "Engineering", location: "Montreal", bio: "Runs the platform team and the monthly architecture review.", gradient: "from-amber-400 to-yellow-500", links: {github: "#", linkedin: "#"}},
    {name: "Yuki Sato", role: "Design Engineer", team: "Design", location: "Osaka", bio: "Prototypes interactions in code before they reach a mockup.", gradient: "from-pink-400 to-rose-500", links: {github: "#", twitter: "#"}},
    {name: "Mateo Alvarez", role: "Backend Engineer", team: "Engineering", location: "Buenos Aires", bio: "Made exports 10 times faster and now looks after billing.", gradient: "from-teal-400 to-emerald-600", links: {github: "#"}},
];

const hiring: HiringCardContent = {
    title: "4 open roles, fully remote",
    body: "Senior frontend, platform engineer, support lead and a product designer.",
    href: "#",
};

const TeamGridExample = () => <TeamGrid members={members} hiring={hiring}/>;

export default TeamGridExample;

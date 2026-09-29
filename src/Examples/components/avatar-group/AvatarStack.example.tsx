import {ProjectMembers, type Member, type Project} from "./AvatarStack";

const team: Member[] = [
    {name: "Maya Chen", role: "Product designer"},
    {name: "Diego Ramos", role: "Frontend engineer"},
    {name: "Priya Nair", role: "Engineering manager"},
    {name: "Tom Becker", role: "Backend engineer"},
    {name: "Aisha Bello", role: "Product manager"},
    {name: "Lucas Moreau", role: "iOS engineer"},
    {name: "Hana Sato", role: "Data analyst"},
    {name: "Owen Walsh", role: "QA engineer"},
    {name: "Sofia Rossi", role: "Content designer"},
    {name: "Kofi Mensah", role: "Android engineer"},
    {name: "Elena Petrova", role: "Security engineer"},
    {name: "Ravi Kapoor", role: "Site reliability"},
];

const projects: Project[] = [
    {name: "Atlas mobile app", meta: "Updated 2 hours ago", members: team},
    {name: "Billing migration", meta: "Updated yesterday", members: team.slice(2, 9), max: 3, size: "sm"},
    {name: "Marketing site refresh", meta: "Updated Sep 18", members: team.slice(8, 11), size: "sm"},
];

const AvatarStackExample = () => <ProjectMembers projects={projects}/>;

export default AvatarStackExample;

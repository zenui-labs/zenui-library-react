import {HiringRoles, type FloatingAvatar, type HiringStat, type OpenRole} from "./HiringRoles";

const roles: OpenRole[] = [
    {title: "Senior Frontend Engineer", department: "Engineering", location: "Remote, Europe", type: "Full time", salary: "€85k to €110k"},
    {title: "Platform Engineer, Storage", department: "Engineering", location: "Remote, Americas", type: "Full time", salary: "$150k to $190k"},
    {title: "Engineering Manager, Payments", department: "Engineering", location: "Berlin or remote", type: "Full time", salary: "€115k to €140k"},
    {title: "Product Designer, Editor", department: "Design", location: "Remote, anywhere", type: "Full time", salary: "$120k to $150k"},
    {title: "Account Executive, Mid-market", department: "Sales", location: "New York", type: "Full time", salary: "$95k base, $190k OTE"},
    {title: "Support Engineer, APAC hours", department: "Support", location: "Remote, Asia Pacific", type: "Full time", salary: "A$110k to A$130k"},
];

// Marketing has no open roles, so its tab shows the empty state.
const departments: string[] = ["Engineering", "Design", "Sales", "Support", "Marketing"];

const avatars: FloatingAvatar[] = [
    {initials: "RA", tone: "bg-rose-400", x: "8%", y: "10%", size: "h-16 w-16"},
    {initials: "JM", tone: "bg-sky-400", x: "42%", y: "0%", size: "h-20 w-20"},
    {initials: "TK", tone: "bg-amber-400", x: "76%", y: "14%", size: "h-14 w-14"},
    {initials: "LS", tone: "bg-emerald-400", x: "22%", y: "46%", size: "h-14 w-14"},
    {initials: "OB", tone: "bg-violet-400", x: "58%", y: "40%", size: "h-24 w-24"},
    {initials: "NC", tone: "bg-teal-400", x: "4%", y: "74%", size: "h-12 w-12"},
    {initials: "PD", tone: "bg-orange-400", x: "38%", y: "76%", size: "h-16 w-16"},
    {initials: "EW", tone: "bg-fuchsia-400", x: "80%", y: "72%", size: "h-14 w-14"},
];

const stats: HiringStat[] = [
    {value: "46", label: "People"},
    {value: "19", label: "Countries"},
    {value: "4.8", label: "Glassdoor rating"},
];

const HiringRolesExample = () => <HiringRoles roles={roles} departments={departments} avatars={avatars} stats={stats}/>;

export default HiringRolesExample;

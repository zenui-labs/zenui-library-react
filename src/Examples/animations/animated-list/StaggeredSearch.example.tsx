import {LuFileText, LuFolder, LuSettings, LuUser} from "react-icons/lu";
import {StaggeredSearch, type SearchResult} from "./StaggeredSearch";

const results: SearchResult[] = [
    {id: "p1", group: "Pages", title: "Pricing experiments 2026", meta: "Growth / Edited 2h ago", icon: LuFileText},
    {id: "p2", group: "Pages", title: "Onboarding checklist", meta: "Customer success / Edited yesterday", icon: LuFileText},
    {id: "p3", group: "Pages", title: "Incident review: payments outage", meta: "Engineering / Edited Mar 14", icon: LuFileText},
    {id: "p4", group: "Pages", title: "Brand guidelines", meta: "Design / Edited last week", icon: LuFolder},
    {id: "p5", group: "Pages", title: "Quarterly planning notes", meta: "Leadership / Edited Apr 2", icon: LuFileText},
    {id: "u1", group: "People", title: "Priya Raman", meta: "Product designer, Lisbon", icon: LuUser},
    {id: "u2", group: "People", title: "Marcus Oyelaran", meta: "Payments engineer, Lagos", icon: LuUser},
    {id: "u3", group: "People", title: "Elena Park", meta: "Head of growth, Seattle", icon: LuUser},
    {id: "s1", group: "Settings", title: "Billing and invoices", meta: "Workspace settings", icon: LuSettings},
    {id: "s2", group: "Settings", title: "Notification preferences", meta: "Your account", icon: LuSettings},
    {id: "s3", group: "Settings", title: "Single sign-on", meta: "Security", icon: LuSettings},
];

const StaggeredSearchExample = () => <StaggeredSearch items={results}/>;

export default StaggeredSearchExample;

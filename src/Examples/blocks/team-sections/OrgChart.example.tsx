import {OrgChart, type OrgGroup, type OrgPerson} from "./OrgChart";

const head: OrgPerson = {name: "Hannah Brooks", role: "Chief Executive Officer", tone: "from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white dark:text-slate-900"};

const groups: OrgGroup[] = [
    {
        id: "product",
        name: "Product and engineering",
        lead: {name: "Oliver Nguyen", role: "VP Engineering", tone: "from-indigo-500 to-violet-600"},
        reports: [
            {name: "Sara Ali", role: "Engineering Manager, Core", tone: "from-indigo-400 to-indigo-600"},
            {name: "Jakob Berg", role: "Engineering Manager, Mobile", tone: "from-indigo-400 to-indigo-600"},
            {name: "Leah Cohen", role: "Head of Design", tone: "from-violet-400 to-violet-600"},
            {name: "Noah Park", role: "Group Product Manager", tone: "from-violet-400 to-violet-600"},
        ],
    },
    {
        id: "revenue",
        name: "Revenue",
        lead: {name: "Camila Duarte", role: "VP Sales", tone: "from-amber-500 to-orange-600"},
        reports: [
            {name: "Ethan Moore", role: "Sales Director, North America", tone: "from-amber-400 to-amber-600"},
            {name: "Ingrid Solberg", role: "Sales Director, Europe", tone: "from-amber-400 to-amber-600"},
            {name: "Kofi Mensah", role: "Head of Customer Success", tone: "from-orange-400 to-orange-600"},
        ],
    },
    {
        id: "operations",
        name: "Operations",
        lead: {name: "Rebecca Stone", role: "Chief Operating Officer", tone: "from-emerald-500 to-teal-600"},
        reports: [
            {name: "Victor Huang", role: "Head of Finance", tone: "from-emerald-400 to-emerald-600"},
            {name: "Amara Obi", role: "Head of People", tone: "from-teal-400 to-teal-600"},
            {name: "Luca Romano", role: "Legal Counsel", tone: "from-teal-400 to-teal-600"},
        ],
    },
];

const OrgChartExample = () => <OrgChart head={head} groups={groups} defaultExpanded={["product"]}/>;

export default OrgChartExample;

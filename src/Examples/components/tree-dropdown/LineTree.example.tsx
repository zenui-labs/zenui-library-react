import {LineTree, type LineTreeNode} from "./LineTree";

const company: LineTreeNode[] = [
    {
        label: "Company Headquarters",
        children: [
            {
                label: "HR Department",
                children: [
                    {label: "Employee Relations", children: [{label: "Benefits Team"}]},
                    {label: "Recruitment", children: [{label: "Talent Acquisition Team"}]},
                ],
            },
            {
                label: "IT Department",
                children: [
                    {label: "Infrastructure Team", children: [{label: "Network Support"}]},
                    {label: "Software Development", children: [{label: "Frontend Team"}, {label: "Backend Team"}]},
                ],
            },
        ],
    },
    {
        label: "Regional Office",
        children: [{label: "Sales Department"}, {label: "Customer Support"}],
    },
];

const LineTreeExample = () => <LineTree nodes={company}/>;

export default LineTreeExample;

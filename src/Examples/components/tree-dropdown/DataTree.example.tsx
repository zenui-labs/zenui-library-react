import {DataTree, type DataTreeNode} from "./DataTree";

const departments: DataTreeNode[] = [
    {
        label: "Corporate Office",
        children: [
            {
                label: "Finance Department",
                children: [
                    {label: "Accounting Team", children: [{label: "Payroll Management"}]},
                    {label: "Audit and Compliance"},
                ],
            },
            {label: "Legal Department"},
        ],
    },
    {
        label: "Regional Office, Europe",
        children: [
            {
                label: "Marketing Department",
                children: [{label: "Digital Marketing"}, {label: "Market Research"}],
            },
            {label: "Operations Team"},
        ],
    },
];

const DataTreeExample = () => <DataTree nodes={departments}/>;

export default DataTreeExample;

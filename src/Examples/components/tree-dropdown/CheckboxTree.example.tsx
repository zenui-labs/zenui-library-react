import {useState} from "react";
import {CheckboxTree, type CheckboxTreeNode} from "./CheckboxTree";

const campuses: CheckboxTreeNode[] = [
    {
        label: "University Campus",
        children: [
            {
                label: "Faculty of Business and Economics",
                children: [
                    {label: "Department of Finance", children: [{label: "Corporate Finance Course"}]},
                    {label: "Department of Accounting", children: [{label: "Financial Accounting Course"}]},
                ],
            },
            {
                label: "Faculty of Law",
                children: [{label: "International Law Course"}, {label: "Business Law Course"}],
            },
        ],
    },
    {
        label: "Regional Campus, Europe",
        children: [
            {
                label: "Faculty of Arts and Humanities",
                children: [
                    {label: "Department of Literature", children: [{label: "Modern Literature Course"}]},
                    {label: "Department of Philosophy", children: [{label: "Ethics and Morality Course"}]},
                ],
            },
            {
                label: "Faculty of Social Sciences",
                children: [{label: "Sociology Course"}, {label: "Political Science Course"}],
            },
        ],
    },
];

const CheckboxTreeExample = () => {
    const [checked, setChecked] = useState<string[]>([]);

    return <CheckboxTree nodes={campuses} checked={checked} onCheckedChange={setChecked}/>;
};

export default CheckboxTreeExample;

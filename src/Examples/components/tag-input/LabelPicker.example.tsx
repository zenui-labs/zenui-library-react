import {LabelPicker, type Label, type LabelPickerDetail} from "./LabelPicker";

const labels: Label[] = [
    {name: "bug", color: "red", description: "Something is not working"},
    {name: "regression", color: "orange", description: "Worked in an earlier release"},
    {name: "needs design", color: "violet", description: "Waiting on a design decision"},
    {name: "good first issue", color: "green", description: "A small, well scoped task"},
    {name: "docs", color: "blue", description: "Documentation changes"},
    {name: "performance", color: "teal"},
    {name: "wontfix", color: "gray", description: "Not planned"},
];

const details: LabelPickerDetail[] = [
    {label: "Assignee", value: "Priya Nair"},
    {label: "Milestone", value: "v2.4 release"},
];

const LabelPickerExample = () => <LabelPicker labels={labels} defaultValue={["bug", "regression"]} details={details}/>;

export default LabelPickerExample;

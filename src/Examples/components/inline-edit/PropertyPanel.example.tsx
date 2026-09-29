import {PropertyPanel, type PickerOption, type ProjectProperties} from "./PropertyPanel";

const statusOptions: PickerOption[] = [
    {value: "Not started", label: "Not started", adornment: <span className="size-2 rounded-full bg-zinc-400"/>},
    {value: "In progress", label: "In progress", adornment: <span className="size-2 rounded-full bg-sky-500"/>},
    {value: "Blocked", label: "Blocked", adornment: <span className="size-2 rounded-full bg-rose-500"/>},
    {value: "Done", label: "Done", adornment: <span className="size-2 rounded-full bg-emerald-500"/>},
];

const owners = ["Ava Lindqvist", "Jonah Reyes", "Mei Watanabe", "Tariq Aziz"];

// A local YYYY-MM-DD date a number of days from today.
const daysFromNow = (days: number) => {
    const date = new Date(Date.now() + days * 86_400_000);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
};

const project: ProjectProperties = {
    status: "In progress",
    owner: "Mei Watanabe",
    due: daysFromNow(12),
    budget: {amount: 18500, currency: "EUR"},
};

const PropertyPanelExample = () => (
    <PropertyPanel title="Q4 brand refresh" statusOptions={statusOptions} owners={owners} defaultValue={project}/>
);

export default PropertyPanelExample;

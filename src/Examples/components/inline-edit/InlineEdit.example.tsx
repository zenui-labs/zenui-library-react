import {InlineEdit, type InlineEditField} from "./InlineEdit";

const fields: InlineEditField[] = [
    {
        id: "name",
        label: "Name",
        defaultValue: "Northwind Labs",
        validate: (value) => (value.length < 2 ? "Use at least 2 characters." : null),
    },
    {
        id: "url",
        label: "URL",
        prefix: "app.example.com/",
        defaultValue: "northwind",
        validate: (value) => (/^[a-z0-9-]{3,32}$/.test(value) ? null : "Use 3 to 32 lowercase letters, numbers or hyphens."),
    },
    {
        id: "billingEmail",
        label: "Billing email",
        type: "email",
        defaultValue: "finance@northwind.dev",
        validate: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Enter a valid email address."),
    },
];

// Stand-in for a network request.
const save = () => new Promise<void>((resolve) => window.setTimeout(resolve, 700));

const InlineEditExample = () => <InlineEdit fields={fields} onSave={save}/>;

export default InlineEditExample;

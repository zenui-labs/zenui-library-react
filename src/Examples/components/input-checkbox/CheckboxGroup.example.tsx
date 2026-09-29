import {CheckboxGroup, type CheckboxOption} from "./CheckboxGroup";

const options: CheckboxOption[] = [
    {value: "product-updates", label: "Product updates"},
    {value: "weekly-digest", label: "Weekly digest"},
    {value: "event-invites", label: "Event invites"},
];

const CheckboxGroupExample = () => (
    <CheckboxGroup options={options} name="emails" label="Emails to receive"/>
);

export default CheckboxGroupExample;

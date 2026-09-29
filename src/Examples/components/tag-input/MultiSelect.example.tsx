import {MultiSelect, type Person} from "./MultiSelect";

const people: Person[] = [
    {id: "maya", name: "Maya Chen", detail: "Design"},
    {id: "diego", name: "Diego Ramos", detail: "Web"},
    {id: "priya", name: "Priya Nair", detail: "Platform"},
    {id: "tom", name: "Tom Becker", detail: "Platform"},
    {id: "aisha", name: "Aisha Bello", detail: "Product"},
    {id: "lucas", name: "Lucas Moreau", detail: "Mobile"},
    {id: "hana", name: "Hana Sato", detail: "Data"},
    {id: "kofi", name: "Kofi Mensah", detail: "Mobile"},
];

const MultiSelectExample = () => <MultiSelect people={people} defaultValue={["maya", "priya", "lucas"]}/>;

export default MultiSelectExample;

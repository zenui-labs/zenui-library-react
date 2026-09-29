import {AssigneePicker, type Person} from "./AssigneePicker";

const people: Person[] = [
    {id: "maya", name: "Maya Chen", role: "Product designer"},
    {id: "diego", name: "Diego Ramos", role: "Frontend engineer"},
    {id: "priya", name: "Priya Nair", role: "Engineering manager"},
    {id: "tom", name: "Tom Becker", role: "Backend engineer"},
    {id: "aisha", name: "Aisha Bello", role: "Product manager"},
    {id: "lucas", name: "Lucas Moreau", role: "iOS engineer"},
    {id: "hana", name: "Hana Sato", role: "Data analyst"},
    {id: "owen", name: "Owen Walsh", role: "QA engineer"},
];

const AssigneePickerExample = () => (
    <AssigneePicker people={people} defaultValue={["maya", "tom"]} eyebrow="ENG-1482" title="Export audit logs as CSV"/>
);

export default AssigneePickerExample;

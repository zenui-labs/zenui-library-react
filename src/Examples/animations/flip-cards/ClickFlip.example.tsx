import {ProfileFlipCard, type Person} from "./ClickFlip";

const person: Person = {
    name: "Priya Raman",
    initials: "PR",
    role: "Staff product designer",
    team: "Payments platform",
    location: "Toronto",
    email: "priya.raman@northwind.dev",
    phone: "+1 (416) 555 0142",
    github: "priyaraman",
    hours: "9:00 to 17:30 ET",
    stats: [
        {label: "Projects", value: "38"},
        {label: "Reviews", value: "412"},
        {label: "Years", value: "7"},
    ],
};

const ClickFlipExample = () => <ProfileFlipCard person={person}/>;

export default ClickFlipExample;

import {AvatarStatus, type Person, type Teammate} from "./AvatarStatus";

const me: Person = {name: "Priya Nair", role: "Engineering manager"};

const teammates: Teammate[] = [
    {name: "Maya Chen", role: "Product designer", presence: "online", localTime: "9:42 AM"},
    {name: "Diego Ramos", role: "Frontend engineer", presence: "busy", localTime: "11:42 AM"},
    {name: "Aisha Bello", role: "Product manager", presence: "away", localTime: "5:42 PM"},
    {name: "Lucas Moreau", role: "iOS engineer", presence: "offline", localTime: "6:42 PM"},
];

const AvatarStatusExample = () => <AvatarStatus currentUser={me} teammates={teammates}/>;

export default AvatarStatusExample;

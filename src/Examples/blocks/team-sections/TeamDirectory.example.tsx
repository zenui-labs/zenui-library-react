import {TeamDirectory, type DirectoryPerson} from "./TeamDirectory";

const people: DirectoryPerson[] = [
    {name: "Aiko Watanabe", role: "Frontend Engineer", department: "Engineering", city: "Tokyo", timeZone: "Asia/Tokyo", started: 2021, email: "aiko@parcel.dev"},
    {name: "Benjamin Clarke", role: "Account Executive", department: "Sales", city: "London", timeZone: "Europe/London", started: 2023, email: "ben@parcel.dev"},
    {name: "Carla Mendes", role: "Support Lead", department: "Support", city: "São Paulo", timeZone: "America/Sao_Paulo", started: 2020, email: "carla@parcel.dev"},
    {name: "David Kim", role: "Platform Engineer", department: "Engineering", city: "Seoul", timeZone: "Asia/Seoul", started: 2022, email: "david@parcel.dev"},
    {name: "Elena Popescu", role: "Product Designer", department: "Design", city: "Bucharest", timeZone: "Europe/Bucharest", started: 2021, email: "elena@parcel.dev"},
    {name: "Farid Rahman", role: "Data Engineer", department: "Engineering", city: "Dhaka", timeZone: "Asia/Dhaka", started: 2024, email: "farid@parcel.dev"},
    {name: "Grace Mwangi", role: "Head of Operations", department: "Operations", city: "Nairobi", timeZone: "Africa/Nairobi", started: 2019, email: "grace@parcel.dev"},
    {name: "Hugo Lefèvre", role: "Brand Designer", department: "Design", city: "Paris", timeZone: "Europe/Paris", started: 2023, email: "hugo@parcel.dev"},
    {name: "Isabel Torres", role: "Sales Engineer", department: "Sales", city: "Mexico City", timeZone: "America/Mexico_City", started: 2022, email: "isabel@parcel.dev"},
    {name: "Jonah Weiss", role: "Support Engineer", department: "Support", city: "Toronto", timeZone: "America/Toronto", started: 2024, email: "jonah@parcel.dev"},
    {name: "Kiri Parata", role: "Engineering Manager", department: "Engineering", city: "Auckland", timeZone: "Pacific/Auckland", started: 2020, email: "kiri@parcel.dev"},
    {name: "Lucía Romero", role: "People Partner", department: "Operations", city: "Madrid", timeZone: "Europe/Madrid", started: 2022, email: "lucia@parcel.dev"},
];

const departments: string[] = ["Engineering", "Design", "Sales", "Support", "Operations"];

const TeamDirectoryExample = () => <TeamDirectory people={people} departments={departments}/>;

export default TeamDirectoryExample;

import {DraggableProfileList, type Profile} from "./DraggableProfileList";

const team: Profile[] = [
    {id: 1, name: "John Doe", avatar: "https://randomuser.me/api/portraits/men/1.jpg", title: "Software Engineer"},
    {id: 2, name: "Jane Smith", avatar: "https://randomuser.me/api/portraits/women/2.jpg", title: "Product Manager"},
    {id: 3, name: "Michael Johnson", avatar: "https://randomuser.me/api/portraits/men/3.jpg", title: "UX Designer"},
    {id: 4, name: "Emily Davis", avatar: "https://randomuser.me/api/portraits/women/4.jpg", title: "Marketing Specialist"},
    {id: 5, name: "David Wilson", avatar: "https://randomuser.me/api/portraits/men/5.jpg", title: "Data Analyst"},
    {id: 6, name: "Sophia Brown", avatar: "https://randomuser.me/api/portraits/women/6.jpg", title: "Project Coordinator"},
];

const DraggableProfileListExample = () => <DraggableProfileList items={team}/>;

export default DraggableProfileListExample;

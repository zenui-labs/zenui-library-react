import {useState} from "react";
import {MdDeleteOutline, MdOutlineEdit} from "react-icons/md";
import {IoEyeOutline} from "react-icons/io5";
import {SearchableTable, type TableAction, type TableColumn} from "./SearchableTable";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
}

const users: User[] = [
    {id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active"},
    {id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive"},
    {id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "Active"},
    {id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "Active"},
    {id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Admin", status: "Inactive"},
];

const columns: TableColumn<User>[] = [
    {key: "name", header: "Name"},
    {key: "email", header: "Email"},
    {key: "role", header: "Role"},
    {key: "status", header: "Status"},
];

const actions: TableAction[] = [
    {id: "edit", label: "Edit", icon: MdOutlineEdit},
    {id: "delete", label: "Delete", icon: MdDeleteOutline},
    {id: "view", label: "View details", icon: IoEyeOutline},
];

const SearchableTableExample = () => {
    const [rows, setRows] = useState(users);

    // Delete removes the row; wire edit and view to your own screens.
    const handleAction = (actionId: string, user: User) => {
        if (actionId === "delete") setRows((current) => current.filter((row) => row.id !== user.id));
    };

    return <SearchableTable rows={rows} columns={columns} actions={actions} onAction={handleAction}/>;
};

export default SearchableTableExample;

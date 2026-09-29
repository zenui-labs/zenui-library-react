import {IoIosNotifications} from "react-icons/io";
import {IoCartOutline} from "react-icons/io5";
import {ActionsAppBar, type AppBarAction} from "./ActionsAppBar";

const actions: AppBarAction[] = [
    {label: "Cart", icon: IoCartOutline, count: 10},
    {label: "Notifications", icon: IoIosNotifications, count: 10},
];

const ActionsAppBarExample = () => <ActionsAppBar actions={actions}/>;

export default ActionsAppBarExample;

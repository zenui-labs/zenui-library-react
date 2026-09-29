import type {Example} from "../../types.ts";
import ProfileAppBar from "./ProfileAppBar.example.tsx";
import profileAppBarSource from "./ProfileAppBar.example.tsx?raw";
import profileAppBarComponentSource from "./ProfileAppBar.tsx?raw";
import SearchAppBar from "./SearchAppBar.example.tsx";
import searchAppBarSource from "./SearchAppBar.example.tsx?raw";
import searchAppBarComponentSource from "./SearchAppBar.tsx?raw";
import ActionsAppBar from "./ActionsAppBar.example.tsx";
import actionsAppBarSource from "./ActionsAppBar.example.tsx?raw";
import actionsAppBarComponentSource from "./ActionsAppBar.tsx?raw";

const examples: Example[] = [
    {
        id: "app_bar_with_manu_&__profile",
        title: "App bar with menu and profile",
        description: "An app bar with a menu button and a profile button. The switch below it signs the user out and hides the profile button.",
        component: ProfileAppBar,
        source: profileAppBarSource,
        files: [{name: "ProfileAppBar.tsx", source: profileAppBarComponentSource}],
    },
    {
        id: "app_bar_with_search_bar",
        title: "App bar with search bar",
        description: "An app bar with a menu button and a search field for quick navigation.",
        component: SearchAppBar,
        source: searchAppBarSource,
        files: [{name: "SearchAppBar.tsx", source: searchAppBarComponentSource}],
    },
    {
        id: "app_bar_with_search_and_icons",
        title: "App bar with search and icons",
        description: "An app bar with a menu button, a search field, and cart and notification buttons with count badges.",
        component: ActionsAppBar,
        source: actionsAppBarSource,
        files: [{name: "ActionsAppBar.tsx", source: actionsAppBarComponentSource}],
    },
];

export default examples;

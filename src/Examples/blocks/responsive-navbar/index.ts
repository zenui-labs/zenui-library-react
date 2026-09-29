import type {Example} from "../../types.ts";
import BasicNavbar from "./BasicNavbar.example.tsx";
import basicNavbarSource from "./BasicNavbar.example.tsx?raw";
import basicNavbarComponentSource from "./BasicNavbar.tsx?raw";
import AccountMegaMenuNavbar from "./AccountMegaMenuNavbar.example.tsx";
import accountMegaMenuNavbarSource from "./AccountMegaMenuNavbar.example.tsx?raw";
import accountMegaMenuNavbarComponentSource from "./AccountMegaMenuNavbar.tsx?raw";
import MegaMenuNavbar from "./MegaMenuNavbar.example.tsx";
import megaMenuNavbarSource from "./MegaMenuNavbar.example.tsx?raw";
import megaMenuNavbarComponentSource from "./MegaMenuNavbar.tsx?raw";
import StandardNavbar from "./StandardNavbar.example.tsx";
import standardNavbarSource from "./StandardNavbar.example.tsx?raw";
import standardNavbarComponentSource from "./StandardNavbar.tsx?raw";

const examples: Example[] = [
    {
        id: "basic_navbar",
        title: "Basic navbar",
        description: "A top navigation bar with links, a search field and social icons. On small screens the links and search move into a menu.",
        component: BasicNavbar,
        source: basicNavbarSource,
        files: [{name: "BasicNavbar.tsx", source: basicNavbarComponentSource}],
        layout: "full",
        minHeight: 360,
    },
    {
        id: "mega_menu_navbar_with_account_dropdown",
        title: "Mega menu navbar with account dropdown",
        description: "A navbar with a product mega menu of grouped links and promos, plus an account dropdown for profile, settings and log out.",
        component: AccountMegaMenuNavbar,
        source: accountMegaMenuNavbarSource,
        files: [{name: "AccountMegaMenuNavbar.tsx", source: accountMegaMenuNavbarComponentSource}],
        layout: "full",
        minHeight: 820,
    },
    {
        id: "megamenu_navbar",
        title: "Mega menu navbar",
        description: "A navbar whose items open wide panels with links, highlights and an image. Use it when a few top-level items group many pages.",
        component: MegaMenuNavbar,
        source: megaMenuNavbarSource,
        files: [{name: "MegaMenuNavbar.tsx", source: megaMenuNavbarComponentSource}],
        layout: "full",
        minHeight: 520,
    },
    {
        id: "standard_navbar",
        title: "Standard navbar",
        description: "A rounded navbar with underlined links and sign in and sign up buttons. On small screens the links move into a menu with a search field.",
        component: StandardNavbar,
        source: standardNavbarSource,
        files: [{name: "StandardNavbar.tsx", source: standardNavbarComponentSource}],
        layout: "full",
        minHeight: 400,
    },
];

export default examples;

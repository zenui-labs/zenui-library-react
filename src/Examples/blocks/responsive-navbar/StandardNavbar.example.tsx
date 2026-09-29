import {StandardNavbar, type NavLink} from "./StandardNavbar";

const links: NavLink[] = [
    {label: "Home", href: "#"},
    {label: "Features", href: "#"},
    {label: "Blog", href: "#"},
    {label: "Shop", href: "#"},
];

const StandardNavbarExample = () => (
    <div className="p-8">
        <StandardNavbar
            logo={<img src="https://i.ibb.co/0BZfPq6/darklogo.png" alt="Company logo" className="w-[55px]"/>}
            links={links}
        />
    </div>
);

export default StandardNavbarExample;

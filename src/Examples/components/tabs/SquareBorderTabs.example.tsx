import {SquareBorderTabs, type TabItem} from "./SquareBorderTabs";

const tabs: TabItem[] = [
    {id: "home", label: "Home"},
    {id: "about", label: "About"},
    {id: "support", label: "Support"},
    {id: "contact", label: "Contact"},
];

const SquareBorderTabsExample = () => <SquareBorderTabs tabs={tabs}/>;

export default SquareBorderTabsExample;

import {PillTabs, type TabItem} from "./PillTabs";

const tabs: TabItem[] = [
    {id: "home", label: "Home"},
    {id: "about", label: "About"},
    {id: "support", label: "Support"},
    {id: "contact", label: "Contact"},
];

const PillTabsExample = () => <PillTabs tabs={tabs}/>;

export default PillTabsExample;

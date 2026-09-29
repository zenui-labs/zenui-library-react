import {TopBorderTabs, type TabItem} from "./TopBorderTabs";

const tabs: TabItem[] = [
    {id: "home", label: "Home"},
    {id: "about", label: "About"},
    {id: "support", label: "Support"},
    {id: "contact", label: "Contact"},
];

const TopBorderTabsExample = () => <TopBorderTabs tabs={tabs}/>;

export default TopBorderTabsExample;

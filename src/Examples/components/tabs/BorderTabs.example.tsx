import {BorderTabs, type TabItem} from "./BorderTabs";

const tabs: TabItem[] = [
    {id: "home", label: "Home"},
    {id: "about", label: "About"},
    {id: "support", label: "Support"},
];

const BorderTabsExample = () => <BorderTabs tabs={tabs}/>;

export default BorderTabsExample;

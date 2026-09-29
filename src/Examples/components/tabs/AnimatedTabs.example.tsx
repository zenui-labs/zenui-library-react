import {AnimatedTabs, type TabItem} from "./AnimatedTabs";

const tabs: TabItem[] = [
    {id: "home", label: "Home"},
    {id: "about", label: "About"},
    {id: "support", label: "Support"},
    {id: "contact", label: "Contact"},
];

const AnimatedTabsExample = () => <AnimatedTabs tabs={tabs}/>;

export default AnimatedTabsExample;

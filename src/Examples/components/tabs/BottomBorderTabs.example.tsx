import {BottomBorderTabs, type TabItem} from "./BottomBorderTabs";

const tabs: TabItem[] = [
    {id: "home", label: "Home"},
    {id: "about", label: "About"},
    {id: "support", label: "Support"},
];

const BottomBorderTabsExample = () => <BottomBorderTabs tabs={tabs}/>;

export default BottomBorderTabsExample;

import {BsChatDots, BsChatDotsFill, BsMegaphone, BsMegaphoneFill} from "react-icons/bs";
import {PiShoppingCartSimple, PiShoppingCartSimpleFill} from "react-icons/pi";
import {IconToggleTabs, type IconTabItem} from "./IconToggleTabs";

const items: IconTabItem[] = [
    {id: "transactions", label: "Transactions", icon: PiShoppingCartSimple, activeIcon: PiShoppingCartSimpleFill},
    {id: "updates", label: "Updates", icon: BsChatDots, activeIcon: BsChatDotsFill},
    {id: "promotions", label: "Promotions", icon: BsMegaphone, activeIcon: BsMegaphoneFill},
];

const IconToggleTabsExample = () => <IconToggleTabs items={items}/>;

export default IconToggleTabsExample;

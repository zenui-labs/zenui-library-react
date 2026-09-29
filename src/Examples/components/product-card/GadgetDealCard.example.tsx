import {IoGift} from "react-icons/io5";
import {MdLocalShipping} from "react-icons/md";
import {GadgetDealCard, type GadgetDeal} from "./GadgetDealCard";

const product: GadgetDeal = {
    brand: "Apple",
    description: "2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage), Silver",
    image: "https://i.ibb.co.com/z4BV3S2/image-1.png",
    price: "$1024.99+",
    discount: "35% off",
    badge: "Best value",
    perks: [
        {label: "Free shipping", icon: MdLocalShipping},
        {label: "Free gift", icon: IoGift},
    ],
};

const GadgetDealCardExample = () => <GadgetDealCard product={product}/>;

export default GadgetDealCardExample;

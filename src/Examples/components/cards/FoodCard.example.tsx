import {BiSolidLeaf} from "react-icons/bi";
import {FaFire} from "react-icons/fa";
import {FoodCard, type FoodBadge} from "./FoodCard";

const badges: FoodBadge[] = [
    {icon: BiSolidLeaf, label: "Vegetarian", className: "bg-green-300 text-green-900"},
    {icon: FaFire, label: "Popular", className: "bg-red-300 text-red-800"},
];

const FoodCardExample = () => (
    <FoodCard
        title="Strawberry Cake"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
        imageSrc="https://img.freepik.com/free-photo/strawberry-dessert-gourmet-sweet-food-chocolate-indulgence-generative-ai_188544-8522.jpg?t=st=1722622233~exp=1722625833~hmac=92966e9ba3da795adaeb9da7587107d51eaff15f0424bf9628d286a28b2486b6&w=1060"
        imageAlt="Strawberry cake with chocolate"
        price="$13.90"
        originalPrice="$18.90"
        badges={badges}
    />
);

export default FoodCardExample;

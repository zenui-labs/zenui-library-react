import {ParallaxProductCard, type ProductColor} from "./ParallaxProductCard";

const colors: ProductColor[] = [
    {name: "Red", className: "bg-red-600"},
    {name: "Yellow", className: "bg-yellow-400"},
    {name: "Blue", className: "bg-blue-500"},
    {name: "Cyan", className: "bg-cyan-400"},
];

const ParallaxProductCardExample = () => (
    <ParallaxProductCard
        name="Brogue"
        imageSrc="https://i.ibb.co/1z7dSw8/shoe1.png"
        imageAlt="Brogue"
        rating={2}
        sizes={[7, 8, 9, 10, 11]}
        colors={colors}
        price="$127"
    />
);

export default ParallaxProductCardExample;

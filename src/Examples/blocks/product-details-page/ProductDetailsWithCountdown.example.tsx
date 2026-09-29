import {useState} from "react";
import {ProductDetailsWithCountdown, type CountdownProductColor} from "./ProductDetailsWithCountdown";

const images = [
    "https://i.ibb.co.com/8ck41d5/Paste-image.png",
    "https://i.ibb.co.com/0QhryRt/Paste-Image.png",
    "https://i.ibb.co.com/JsJcVYZ/Paste-Image.png",
    "https://i.ibb.co.com/n6sF5wz/Paste-Image.png",
];

const colors: CountdownProductColor[] = [
    {name: "black", className: "bg-black"},
    {name: "beige", className: "bg-[#D2C4B5]"},
    {name: "red", className: "bg-red-500"},
    {name: "white", className: "bg-white"},
];

// The sale ends 2 days, 12 hours, 45 minutes and 5 seconds after the page opens.
const SALE_LENGTH = (((2 * 24 + 12) * 60 + 45) * 60 + 5) * 1000;

const ProductDetailsWithCountdownExample = () => {
    const [expiresAt] = useState(() => Date.now() + SALE_LENGTH);
    const [added, setAdded] = useState("");

    return (
        <div className="p-8">
            <ProductDetailsWithCountdown
                name="Tray table"
                description="Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks."
                price="$199.00"
                compareAtPrice="$400.00"
                images={images}
                colors={colors}
                rating={5}
                reviewCount={11}
                expiresAt={expiresAt}
                measurements={"17 1/2×20 5/8\""}
                badge="NEW"
                discountLabel="-50%"
                onAddToCart={({color, quantity}) => setAdded(`Added ${quantity} × ${color} tray table to your cart.`)}
            />
            {added && <p role="status" className="mt-4 text-sm text-gray-600 dark:text-slate-400">{added}</p>}
        </div>
    );
};

export default ProductDetailsWithCountdownExample;

import {useState} from "react";
import {ProductDetailsWithSizes, type SizedProductColor} from "./ProductDetailsWithSizes";

const images = [
    "https://i.ibb.co.com/LxyQVtG/image-19.png",
    "https://i.ibb.co.com/d6RXLM2/image-22.png",
    "https://i.ibb.co.com/17yKVQm/image-19.png",
    "https://i.ibb.co.com/NCQFGJr/image-21.png",
    "https://i.ibb.co.com/2tWVrdD/image-23.png",
];

const colors: SizedProductColor[] = [
    {name: "Royal Brown", className: "bg-[#654321]"},
    {name: "Light Gray", className: "bg-gray-200"},
    {name: "Steel Blue", className: "bg-[#4682B4]"},
    {name: "Navy", className: "bg-[#1F2A44]"},
];

const ProductDetailsWithSizesExample = () => {
    const [message, setMessage] = useState("");

    return (
        <div className="p-8">
            <ProductDetailsWithSizes
                brand="John Lewis ANYDAY"
                name="Long Sleeve Overshirt, Khaki, 6"
                price="£28.00"
                compareAtPrice="£40.00"
                rating={4.5}
                soldCount={1238}
                images={images}
                colors={colors}
                sizes={["6", "8", "10", "14", "18", "20"]}
                defaultSize="8"
                description="A relaxed overshirt in soft cotton twill with two chest pockets and a curved hem. Wear it buttoned up or open over a T-shirt."
                moreDescription="Machine washable at 30 degrees. The model is 5 ft 9 in and wears a size 8."
                sizeChartHref="#size-chart"
                onAddToCart={({color, size}) => setMessage(`Added ${color}, size ${size} to your cart.`)}
                onCheckout={({color, size}) => setMessage(`Checking out ${color}, size ${size}.`)}
            />
            {message && <p role="status" className="mt-4 text-sm text-gray-600 dark:text-slate-400">{message}</p>}
        </div>
    );
};

export default ProductDetailsWithSizesExample;

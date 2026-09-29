import {GroceryProductCard, type GroceryProduct} from "./GroceryProductCard";

const product: GroceryProduct = {
    name: "Cucumber",
    image: "https://i.ibb.co.com/p0CjNLD/Link-11-png.png",
    price: "$70.21",
    originalPrice: "$80.50",
    rating: 5,
};

const GroceryProductCardExample = () => <GroceryProductCard product={product}/>;

export default GroceryProductCardExample;

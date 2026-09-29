import {ClothingProductCard, type ClothingProduct} from "./ClothingProductCard";

const product: ClothingProduct = {
    name: "Drop-shoulder synthetic",
    price: "Tk 1,800.00",
    image: "https://wpbingo-fashow.myshopify.com/cdn/shop/products/62.jpg?v=1665549687",
    hoverImage: "https://wpbingo-fashow.myshopify.com/cdn/shop/products/63.jpg?v=1665549687",
    rating: 5,
    ratingNote: "43",
    colors: [
        {name: "Red", value: "#ef4444"},
        {name: "Green", value: "#22c55e"},
        {name: "Blue", value: "#3b82f6"},
    ],
};

const ClothingProductCardExample = () => <ClothingProductCard product={product}/>;

export default ClothingProductCardExample;

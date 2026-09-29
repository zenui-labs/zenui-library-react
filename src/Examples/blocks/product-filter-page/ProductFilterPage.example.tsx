import {useState} from "react";
import {ProductFilterPage, type FilterProduct, type PriceRange} from "./ProductFilterPage";

const products: FilterProduct[] = [
    {id: "1", name: "2020 M1 True Wireless Bluetooth Headphones", price: 299.99, rating: 4.5, reviews: 128, brand: "Apple", image: "https://i.ibb.co.com/phjMmsG/Image-11.png", categories: ["Electronics Devices", "Headphones"], tags: ["iPhone"]},
    {id: "2", name: "Samsung Electronics Ultrawide Gaming Monitor", price: 499.99, rating: 4.8, reviews: 256, brand: "Samsung", image: "https://i.ibb.co.com/fdz6djB/Image-10.png", categories: ["Electronics Devices", "Computer Accessories"], tags: ["Game"]},
    {id: "3", name: "Professional Gaming Mechanical Keyboard", price: 159.99, rating: 4.7, reviews: 89, brand: "Razer", image: "https://i.ibb.co.com/Tk4kb93/Image-17.png", categories: ["Computer Accessories"], tags: ["Game"]},
    {id: "4", name: "4K Ultra HD Smart TV", price: 899.99, rating: 4.6, reviews: 312, brand: "LG", image: "https://i.ibb.co.com/ZVsvWnM/Image-12.png", categories: ["Electronics Devices", "TV & Home Appliances"], tags: ["TV", "Smart TV"]},
    {id: "5", name: "Wireless Security Camera", price: 79.99, rating: 4.3, reviews: 167, brand: "Xiaomi", image: "https://i.ibb.co.com/nMgLvb1/Image-19.png", categories: ["Camera & Photo"]},
    {id: "6", name: "Professional Noise-Cancelling Headphones", price: 349.99, rating: 4.9, reviews: 423, brand: "Sony", image: "https://i.ibb.co.com/Nx6H5s3/Image-16.png", categories: ["Electronics Devices", "Headphones"], tags: ["Speaker"]},
    {id: "7", name: "High-Performance Gaming Laptop", price: 1299.99, rating: 4.7, reviews: 89, brand: "ASUS", image: "https://i.ibb.co.com/H74t7f2/Image-21.png", categories: ["Computer & Laptop"], tags: ["Asus Laptops", "SSD", "Game"]},
    {id: "11", name: "4K Action Camera", price: 399.99, rating: 4.8, reviews: 178, brand: "GoPro", image: "https://i.ibb.co.com/cgxVvgP/Image-20.png", categories: ["Camera & Photo"]},
    {id: "14", name: "Wireless Gaming Controller", price: 59.99, rating: 4.5, reviews: 203, brand: "Microsoft", image: "https://i.ibb.co.com/xS5hwjd/Image-22.png", categories: ["Gaming Console"], tags: ["Game"]},
    {id: "15", name: "Smart Thermostat", price: 249.99, rating: 4.6, reviews: 187, brand: "Nest", image: "https://i.ibb.co.com/b5c4Z7r/Image-23.png", categories: ["TV & Home Appliances"]},
];

const categories = [
    "Electronics Devices",
    "Computer & Laptop",
    "Computer Accessories",
    "Smartphone",
    "Headphones",
    "Mobile Accessories",
    "Gaming Console",
    "Camera & Photo",
    "TV & Home Appliances",
    "Watches & Accessories",
    "GPS & Navigation",
];

const priceRanges: PriceRange[] = [
    {label: "All prices", min: 0},
    {label: "Under $20", min: 0, max: 20},
    {label: "$20 to $100", min: 20, max: 100},
    {label: "$100 to $300", min: 100, max: 300},
    {label: "$300 to $500", min: 300, max: 500},
    {label: "$500 to $1,000", min: 500, max: 1000},
    {label: "$1,000 to $10,000", min: 1000, max: 10000},
];

const brands = ["Apple", "Microsoft", "Google", "Samsung", "Dell", "HP", "Symphony", "Xiaomi", "Sony", "Panasonic", "LG"];

const tags = ["Game", "iPhone", "TV", "Asus Laptops", "Macbook", "SSD", "Graphics Card", "Power Bank", "Smart TV", "Speaker", "Tablet"];

const ProductFilterPageExample = () => {
    const [message, setMessage] = useState("");

    return (
        <div className="w-full">
            <ProductFilterPage
                products={products}
                categories={categories}
                priceRanges={priceRanges}
                brands={brands}
                tags={tags}
                onWishlist={(product) => setMessage(`${product.name} added to your wishlist.`)}
                onCompare={(product) => setMessage(`${product.name} added to compare.`)}
                onQuickView={(product) => setMessage(`Quick view for ${product.name}.`)}
            />
            {message && (
                <p role="status" className="mt-4 px-4 text-sm text-gray-600 dark:text-slate-400">
                    {message}
                </p>
            )}
        </div>
    );
};

export default ProductFilterPageExample;

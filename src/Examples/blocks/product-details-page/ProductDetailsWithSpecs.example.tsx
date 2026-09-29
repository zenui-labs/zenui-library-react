import {useState} from "react";
import {FiCpu, FiSmartphone} from "react-icons/fi";
import {IoMdCamera} from "react-icons/io";
import {MdBatteryChargingFull} from "react-icons/md";
import {GoVerified} from "react-icons/go";
import {IoStorefrontOutline} from "react-icons/io5";
import {CiDeliveryTruck} from "react-icons/ci";
import {ProductDetailsWithSpecs, type ProductColor, type ProductPerk, type ProductSpec} from "./ProductDetailsWithSpecs";

const images = [
    "https://i.ibb.co.com/GTGBw03/image-323.png",
    "https://i.ibb.co.com/thxkk1x/image-320.png",
    "https://i.ibb.co.com/MckV93r/image-320.png",
    "https://i.ibb.co.com/ZGWRGDT/image-320.png",
];

const colors: ProductColor[] = [
    {name: "Black", className: "bg-black"},
    {name: "Purple", className: "bg-purple-600"},
    {name: "Red", className: "bg-red-600"},
    {name: "Yellow", className: "bg-yellow-500"},
    {name: "Gray", className: "bg-gray-200"},
];

const specs: ProductSpec[] = [
    {icon: FiSmartphone, label: "Screen size", value: "6.7\""},
    {icon: FiCpu, label: "CPU", value: "Apple A16 Bionic"},
    {icon: IoMdCamera, label: "Camera", value: "48-12-12 MP"},
    {icon: MdBatteryChargingFull, label: "Battery", value: "4323 mAh"},
];

const perks: ProductPerk[] = [
    {icon: CiDeliveryTruck, label: "Free delivery", value: "1-2 days"},
    {icon: IoStorefrontOutline, label: "In stock", value: "Today"},
    {icon: GoVerified, label: "Guaranteed", value: "1 year"},
];

const ProductDetailsWithSpecsExample = () => {
    const [added, setAdded] = useState("");

    return (
        <div className="p-8">
            <ProductDetailsWithSpecs
                name="Apple iPhone 14 Pro Max"
                price="$1399"
                compareAtPrice="$1499"
                images={images}
                colors={colors}
                storageOptions={["128GB", "256GB", "512GB", "1TB"]}
                defaultStorage="1TB"
                specs={specs}
                perks={perks}
                description="Enhanced capabilities thanks to a larger 6.7 inch display and a battery that lasts through the day. Sharp photos in low and bright light with the new camera system."
                moreDescription="The always-on display keeps the time and your widgets visible without waking the phone."
                onAddToCart={({color, storage}) => setAdded(`Added ${color}, ${storage} to your cart.`)}
            />
            {added && <p role="status" className="mt-4 text-sm text-gray-600 dark:text-slate-400">{added}</p>}
        </div>
    );
};

export default ProductDetailsWithSpecsExample;

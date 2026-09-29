import {GadgetQuickViewCard, type GadgetProduct} from "./GadgetQuickViewCard";

const product: GadgetProduct = {
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphones",
    image: "https://i.ibb.co.com/kcYX9md/Image-2.png",
    price: "$70",
    badge: "HOT",
    rating: 5,
    ratingNote: "738",
};

const GadgetQuickViewCardExample = () => <GadgetQuickViewCard product={product}/>;

export default GadgetQuickViewCardExample;

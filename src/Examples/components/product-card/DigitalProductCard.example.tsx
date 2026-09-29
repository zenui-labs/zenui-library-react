import {DigitalProductCard, type DigitalProduct} from "./DigitalProductCard";

const product: DigitalProduct = {
    title: "Criphin - Contemporary Business Keynote",
    image: "https://i.ibb.co.com/cTTfNRw/Link-1.png",
    author: "Criphin",
    category: "Graphics",
    price: "$52.00",
    sales: 168,
    rating: 5,
    ratingNote: "4.8",
};

const DigitalProductCardExample = () => <DigitalProductCard product={product}/>;

export default DigitalProductCardExample;

import {JuiceProductCard, type JuiceProduct} from "./JuiceProductCard";

const product: JuiceProduct = {
    name: "Frooti Mango Drink",
    image: "https://i.ibb.co.com/VN5sNHX/Link-14-png.png",
    price: "$ 80.00",
    size: "1 KG",
    rating: 5,
    ratingNote: "43",
};

const JuiceProductCardExample = () => <JuiceProductCard product={product}/>;

export default JuiceProductCardExample;

import {RatedProductListCard, type RatedListProduct} from "./RatedProductListCard";

const product: RatedListProduct = {
    name: "Good Life Raw Peanuts",
    image: "https://i.ibb.co.com/HHP2J04/7-jpg.png",
    price: "$85.00",
    rating: 5,
    ratingNote: "4.8",
};

const RatedProductListCardExample = () => <RatedProductListCard product={product}/>;

export default RatedProductListCardExample;

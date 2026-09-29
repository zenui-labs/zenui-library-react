import {BookProductCard, type BookProduct} from "./BookProductCard";

const product: BookProduct = {
    title: "Home Decor Lucky Deer Family Matte Finish Ceramic Figures",
    image: "https://i.ibb.co.com/wrYPvfd/Link-31-jpg.png",
    category: "Biography",
    author: "Ellie Thomson, Henry",
    price: "$80.00",
    badge: "Best",
};

const BookProductCardExample = () => <BookProductCard product={product}/>;

export default BookProductCardExample;

import {ProductListCard, type ListProduct} from "./ProductListCard";

const product: ListProduct = {
    name: "Portable Washing Machine, 11lbs capacity Model 18NMF",
    image: "https://i.ibb.co.com/FDsyM7X/Image-4.png",
    price: "$1,500",
};

const ProductListCardExample = () => <ProductListCard product={product}/>;

export default ProductListCardExample;

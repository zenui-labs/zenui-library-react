import {ProductCard} from "./ProductCard";

const ProductCardExample = () => (
    <ProductCard
        name="Shoes"
        imageSrc="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNob2VzfGVufDB8fDB8fHww"
        imageAlt="White sneakers on a plain background"
        description="Lightweight everyday sneakers with a breathable knit upper and a cushioned sole that stays comfortable from morning to night."
        price="$25"
        views={50}
        likes={10}
    />
);

export default ProductCardExample;

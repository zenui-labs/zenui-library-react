import {ProductPromoBanner} from "./ProductPromoBanner";

const ProductPromoBannerExample = () => (
    <div className="flex justify-center p-8">
        <ProductPromoBanner
            badge="SAVE UP TO $200.00"
            title="Macbook Pro"
            description="Apple M1 Max Chip. 32GB Unified Memory, 1TB SSD Storage"
            price="$1999"
            image="https://i.ibb.co.com/zSm0TRR/Image-6.png"
            imageAlt="MacBook Pro laptop"
            href="#macbook-pro"
        />
    </div>
);

export default ProductPromoBannerExample;

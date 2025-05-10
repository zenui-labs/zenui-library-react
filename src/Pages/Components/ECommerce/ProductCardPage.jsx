import React from "react";

// components
import ProductCard from "@components/ECommerce/ProductCard.jsx";
import ContentPageLayout from "@shared/ContentPageLayout.jsx";

const ProductCardPage = () => {
    return (
        <ContentPageLayout>
            <ProductCard/>
        </ContentPageLayout>
    );
};

export default ProductCardPage;

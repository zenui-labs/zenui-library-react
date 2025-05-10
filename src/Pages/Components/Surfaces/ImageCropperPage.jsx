import React from "react";

// components
import ImageCropper from "@components/Surfaces/ImageCroppers/Index.jsx";
import ContentPageLayout from "@shared/ContentPageLayout.jsx";

const CarouselPage = () => {
    return (
        <ContentPageLayout>
            <ImageCropper/>
        </ContentPageLayout>
    );
};

export default CarouselPage;

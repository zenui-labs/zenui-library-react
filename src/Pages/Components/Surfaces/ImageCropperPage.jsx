import React from "react";

// components
import ImageCropper from "../../../Components/Overview/SidebarContent/Content/Surfaces/ImageCroppers/Index.jsx";
import ContentPageLayout from "../../../Shared/ContentPageLayout.jsx";

const CarouselPage = () => {
    return (
        <ContentPageLayout>
            <ImageCropper />
        </ContentPageLayout>
    );
};

export default CarouselPage;

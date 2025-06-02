import React from "react";

// components
import Skeleton from "@components/Feedback/Skeleton";
import ContentPageLayout from "@shared/ContentPageLayout.jsx";

const SkeletonPage = () => {
    return (
        <ContentPageLayout>
            <Skeleton/>
        </ContentPageLayout>
    );
};

export default SkeletonPage;

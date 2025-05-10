import React from "react";

// components
import Loader from "@components/Feedback/Loader";
import ContentPageLayout from "@shared/ContentPageLayout.jsx";

const LoaderPage = () => {
    return (
        <ContentPageLayout>
            <Loader/>
        </ContentPageLayout>
    );
};

export default LoaderPage;

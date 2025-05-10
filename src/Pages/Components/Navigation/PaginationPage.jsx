import React from "react";

// components
import Pagination from "@components/Navigation/Pagination";
import ContentPageLayout from "@shared/ContentPageLayout.jsx";

const PaginationPage = () => {
    return (
        <ContentPageLayout>
            <Pagination/>
        </ContentPageLayout>
    );
};

export default PaginationPage;

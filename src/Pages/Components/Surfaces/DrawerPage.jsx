import React from "react";

// components
import Drawer from "@components/Surfaces/Drawer/Index.jsx";
import ContentPageLayout from "@shared/ContentPageLayout.jsx";

const DrawerPage = () => {
    return (
        <ContentPageLayout>
            <Drawer/>
        </ContentPageLayout>
    );
};

export default DrawerPage;

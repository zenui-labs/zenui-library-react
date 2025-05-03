import React from 'react';

// components
import Navbar from "../Components/Home/Navbar.jsx";
import Footer from "../Components/Home/Footer.jsx";
import TagMaster from "../SemanticTagMaster/Index.jsx";
import MobileNavbar from "../Components/Home/MobileNavbar.jsx";
import AnimatedDarkBg from "../Shared/AnimatedDarkBg.jsx";
import NewsBoard from "../Components/Home/NewsBoard.jsx";

const ZenUIHeroDocsPage = () => {
    return (
        <div>
            <Navbar/>
            <MobileNavbar/>
            <TagMaster/>
            <Footer/>

            <AnimatedDarkBg/>
        </div>
    );
};

export default ZenUIHeroDocsPage;

import React from 'react';

// components
import Navbar from "@/Components/Home/Navbar.jsx";
import Footer from "@/Components/Home/Footer.jsx";
import TagMaster from "../Tools/SemanticTagMaster/Index.jsx";
import MobileNavbar from "@/Components/Home/MobileNavbar.jsx";
import AnimatedDarkBg from "@shared/AnimatedDarkBg.jsx";

const ZenUIHeroDocsPage = () => {
    return (
        <>
            <Navbar/>
            <MobileNavbar/>
            <TagMaster/>
            <Footer/>

            <AnimatedDarkBg/>
        </>
    );
};

export default ZenUIHeroDocsPage;

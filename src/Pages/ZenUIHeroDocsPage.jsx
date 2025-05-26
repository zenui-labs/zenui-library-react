import React from 'react';

// components
import Navbar from "@/Components/Home/Navbar.jsx";
import Footer from "@/Components/Home/Footer.jsx";
import BecomeZenUIHero from "../Components/BecomeZenUIHero/Index.jsx";
import MobileNavbar from "@/Components/Home/MobileNavbar.jsx";
import AnimatedDarkBg from "@shared/AnimatedDarkBg.jsx";

const ZenUIHeroDocsPage = () => {
    return (
        <div className='overflow-clip'>
            <Navbar/>
            <MobileNavbar/>
            <BecomeZenUIHero/>
            <Footer/>

            <AnimatedDarkBg/>
        </div>
    );
};

export default ZenUIHeroDocsPage;

import React from "react";

// components
import Navbar from "@/Components/Home/Navbar.jsx";
import Footer from "@/Components/Home/Footer.jsx";
import PrivacyPolicy from "@/Components/Home/PrivacyPolicy.jsx";
import MobileNavbar from "@/Components/Home/MobileNavbar.jsx";
import AnimatedDarkBg from "@shared/AnimatedDarkBg.jsx";


const AboutUsPage = () => {
    
    return (
        <div className='overflow-clip'>
            <Navbar/>
            <MobileNavbar/>
            <PrivacyPolicy/>
            <Footer/>

            <AnimatedDarkBg/>
        </div>
    );
};

export default AboutUsPage;

import React from "react";

// components
import AboutUs from "../Components/Home/AboutUs.jsx";
import Navbar from "../Components/Home/Navbar.jsx";
import Footer from "../Components/Home/Footer.jsx";
import MobileNavbar from "../Components/Home/MobileNavbar.jsx";
import AnimatedDarkBg from "../Shared/AnimatedDarkBg.jsx";
import NewsBoard from "../Components/Home/NewsBoard.jsx";


const AboutUsPage = () => {

    const getTheRouteName = () => {
        return window.location.pathname
    }

    console.log(getTheRouteName())

    return (
        <div className='overflow-x-hidden'>
            <NewsBoard/>
            <Navbar/>
            <MobileNavbar/>
            <AboutUs/>
            <Footer/>

            <AnimatedDarkBg/>
        </div>
    );
};

export default AboutUsPage;

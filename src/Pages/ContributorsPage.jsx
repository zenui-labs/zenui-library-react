import React from "react";

// components
import AboutUs from "@/Components/Home/Contributors.jsx";
import Navbar from "@/Components/Home/Navbar.jsx";
import Footer from "@/Components/Home/Footer.jsx";
import MobileNavbar from "@/Components/Home/MobileNavbar.jsx";
import AnimatedDarkBg from "@shared/AnimatedDarkBg.jsx";
import NewsBoard from "@/Components/Home/NewsBoard.jsx";


const ContributorsPage = () => {

    const getTheRouteName = () => {
        return window.location.pathname
    }

    console.log(getTheRouteName())

    return (
        <div className='overflow-clip'>
            <Navbar/>
            <MobileNavbar/>
            <AboutUs/>
            <Footer/>

            <AnimatedDarkBg/>
        </div>
    );
};

export default ContributorsPage;

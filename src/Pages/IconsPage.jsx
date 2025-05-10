import React from 'react';

// components
import Icons from "../Icons/Icons.jsx"
import Navbar from "@/Components/Home/Navbar.jsx";
import Footer from "@/Components/Home/Footer.jsx";
import MobileNavbar from "@/Components/Home/MobileNavbar.jsx";
import AnimatedDarkBg from "@shared/AnimatedDarkBg.jsx";
import NewsBoard from "@/Components/Home/NewsBoard.jsx";

const IconsPage = () => {
    return (
        <div>
            <MobileNavbar/>
            <Navbar/>
            <Icons/>
            <Footer/>

            <AnimatedDarkBg/>
        </div>
    );
};

export default IconsPage;

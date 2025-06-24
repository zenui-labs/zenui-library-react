import React from 'react';

// components
import LayoutPlayground from "../LayoutPlayground/CelebrationButton.jsx";
import Navbar from "@/Components/Home/Navbar.jsx";
import Footer from "@/Components/Home/Footer.jsx";
import MobileNavbar from "@/Components/Home/MobileNavbar.jsx";

const LayoutPlaygroundPage = () => {
    return (
        <>
            <Navbar/>
            <MobileNavbar/>
            <LayoutPlayground/>
            <Footer/>
        </>
    );
};

export default LayoutPlaygroundPage;

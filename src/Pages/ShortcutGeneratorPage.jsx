import React from 'react';

// components
import ShortcutGenerator from "../Tools/ShortcutGenerator/Index.jsx";
import Navbar from "@/Components/Home/Navbar.jsx";
import Footer from "@/Components/Home/Footer.jsx";
import MobileNavbar from "@/Components/Home/MobileNavbar.jsx";
import AnimatedDarkBg from "@shared/AnimatedDarkBg.jsx";

const ShortcutGeneratorPage = () => {
    return (
        <>
            <Navbar/>
            <MobileNavbar/>
            <ShortcutGenerator/>
            <Footer/>

            <AnimatedDarkBg/>
        </>
    );
};

export default ShortcutGeneratorPage;

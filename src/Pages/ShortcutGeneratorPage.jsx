import React from 'react';

// components
import ShortcutGenerator from "../Tools/ShortcutGenerator/Index.jsx";
import Navbar from "@/Components/Home/Navbar.jsx";
import Footer from "@/Components/Home/Footer.jsx";
import MobileNavbar from "@/Components/Home/MobileNavbar.jsx";
import AnimatedDarkBg from "@shared/AnimatedDarkBg.jsx";
import NewsBoard from "@/Components/Home/NewsBoard.jsx";

const ShortcutGeneratorPage = () => {
    return (
        <div>
            <Navbar/>
            <MobileNavbar/>
            <ShortcutGenerator/>
            <Footer/>

            <AnimatedDarkBg/>
        </div>
    );
};

export default ShortcutGeneratorPage;

import React from 'react';

// components
import AIGenerator from "../AIGenerator/Index.jsx"
import Navbar from "@/Components/Home/Navbar.jsx";
import Footer from "@/Components/Home/Footer.jsx";
import MobileNavbar from "@/Components/Home/MobileNavbar.jsx";
import AnimatedDarkBg from "@shared/AnimatedDarkBg.jsx";
import NewsBoard from "@/Components/Home/NewsBoard.jsx";

const AIGeneratorPage = () => {
    return (
        <div>
            <Navbar/>
            <MobileNavbar/>
            <AIGenerator/>
            <Footer/>

            <AnimatedDarkBg/>
        </div>
    );
};

export default AIGeneratorPage;

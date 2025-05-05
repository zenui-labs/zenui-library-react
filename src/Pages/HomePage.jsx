import React from "react";

// components
import Navbar from "../Components/Home/Navbar";
import Hero from "../Components/Home/Hero";
import Footer from "../Components/Home/Footer";
import MobileNavbar from "../Components/Home/MobileNavbar.jsx";
import Feedback from "../Components/Home/feedback.jsx";
import TemplatesSlider from "../Components/Home/TemplatesSlider.jsx";
import Sponsor from "../Components/Home/Sponsor.jsx";
import Faq from "../Components/Home/Faq.jsx";
import ZenUITools from "../Components/Home/ZenUITools.jsx";
import AnimatedDarkBg from "../Shared/AnimatedDarkBg.jsx";
import NewsBoard from "../Components/Home/NewsBoard.jsx";
import NewHero from "../Components/Home/NewHero.jsx";
import NewNav from "../Components/Home/NewNav.jsx";
import FeaturesCard from "../Components/Home/FeaturesCard.jsx";
import ComponentsSlider from "../Components/Home/ComponentsSlider.jsx";
import DarkModeSupport from "../Components/Home/DarkModeSupport.jsx";
import MetricsCard from "../Components/Home/MetricsCard.jsx";


const HomePage = () => {
    return (
        <div className='transition-all duration-500'>
            <NewNav/>
            <div className='overflow-x-hidden'>
                <MobileNavbar/>
                <NewHero/>
                <FeaturesCard/>
                <ComponentsSlider/>
                <DarkModeSupport/>
                <ZenUITools/>
                <Feedback/>
                <Faq/>
                <MetricsCard/>
                <Footer/>
            </div>

            <AnimatedDarkBg/>
        </div>
    );
};

export default HomePage;

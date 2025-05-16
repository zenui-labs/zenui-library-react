import React from "react";

// components
import Hero from "@/Components/Home/Hero";
import Footer from "@/Components/Home/Footer";
import MobileNavbar from "@/Components/Home/MobileNavbar.jsx";
import Feedback from "@/Components/Home/feedback.jsx";
import Faq from "@/Components/Home/Faq.jsx";
import ZenUITools from "@/Components/Home/ZenUITools.jsx";
import AnimatedDarkBg from "@shared/AnimatedDarkBg.jsx";
import FeaturesCard from "@/Components/Home/FeaturesCard.jsx";
import ComponentsSlider from "@/Components/Home/ComponentsSlider.jsx";
import DarkModeSupport from "@/Components/Home/DarkModeSupport.jsx";
import MetricsCard from "@/Components/Home/MetricsCard.jsx";
import Navbar from "@/Components/Home/Navbar.jsx";
import TemplatesSlider from "@/Components/Home/TemplatesSlider.jsx";
import AnimationsBentoGrid from "@/Components/Home/AnimatonsBentoGrid.jsx";


const HomePage = () => {
    return (
        <div className='transition-all duration-500'>
            <Navbar/>
            <div className='overflow-x-hidden'>
                <MobileNavbar/>
                <Hero/>
                <FeaturesCard/>
                <ComponentsSlider/>
                <AnimationsBentoGrid/>
                <DarkModeSupport/>
                <ZenUITools/>
                <Feedback/>
                <TemplatesSlider/>
                <Faq/>
                <MetricsCard/>
                <Footer/>
            </div>

            <AnimatedDarkBg/>
        </div>
    );
};

export default HomePage;

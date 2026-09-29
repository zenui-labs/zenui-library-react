
import SiteLayout from "@shared/SiteLayout.tsx";
import Hero from "@/Components/Home/Hero";
import HowItWorks from "@/Components/Home/HowItWorks.tsx";
import ComponentsSlider from "@/Components/Home/ComponentsSlider.tsx";
import AnimationsBentoGrid from "@/Components/Home/AnimatonsBentoGrid.tsx";
import DarkModeSupport from "@/Components/Home/DarkModeSupport.tsx";
import ZenUITools from "@/Components/Home/ZenUITools.tsx";
import TemplatesSlider from "@/Components/Home/TemplatesSlider.tsx";
import Feedback from "@/Components/Home/feedback.tsx";
import MetricsCard from "@/Components/Home/MetricsCard.tsx";
import Faq from "@/Components/Home/Faq.tsx";
import FinalCta from "@/Components/Home/FinalCta.tsx";

const HomePage = () => {
    return (
        <SiteLayout>
            <div className="overflow-x-clip">
                <Hero/>
                <HowItWorks/>
                <ComponentsSlider/>
                <AnimationsBentoGrid/>
                <DarkModeSupport/>
                <ZenUITools/>
                <TemplatesSlider/>
                <MetricsCard/>
                <Feedback/>
                <Faq/>
                <FinalCta/>
            </div>
        </SiteLayout>
    );
};

export default HomePage;

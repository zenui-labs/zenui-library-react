import {useLayoutEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import {LuArrowRight, LuArrowUpRight} from "react-icons/lu";
import {FiGithub} from "react-icons/fi";

import {HomeTemplatesData1, HomeTemplatesData2} from "@utils/HomeTemplatesData.ts";
import {Band, SectionIntro} from "@/Components/Home/LandingKit.tsx";

const templates = [...HomeTemplatesData1, ...HomeTemplatesData2].slice(0, 10);

const TemplateCard = ({template, index}) => (
    <article className="group w-[300px] shrink-0 640px:w-[420px]">
        <div className="relative overflow-hidden rounded-2xl border border-hairline bg-raised">
            <img src={template.image} alt={`${template.title} template`} loading="lazy"
                 className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"/>
            <div className="absolute inset-x-3 bottom-3 flex translate-y-2 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <a href={template.liveLink} target="_blank" rel="noreferrer"
                   className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/95 text-[0.8rem] font-medium text-gray-900 backdrop-blur hover:bg-white">
                    Live preview <LuArrowUpRight className="size-3.5"/>
                </a>
                <a href={template.githubLink} target="_blank" rel="noreferrer" aria-label={`${template.title} source on GitHub`}
                   className="flex size-9 items-center justify-center rounded-lg bg-gray-900/90 text-white backdrop-blur hover:bg-gray-900">
                    <FiGithub className="size-4"/>
                </a>
            </div>
        </div>
        <div className="mt-3.5 flex items-baseline gap-3">
            <span className="font-mono text-[0.72rem] text-ink-subtle">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="text-[0.95rem] font-medium capitalize text-ink">{template.title}</h3>
        </div>
    </article>
);

const TemplatesSlider = () => {
    const trackRef = useRef(null);
    const rowRef = useRef(null);
    const [distance, setDistance] = useState(0);

    useLayoutEffect(() => {
        const measure = () => {
            if (!rowRef.current) return;
            setDistance(Math.max(0, rowRef.current.scrollWidth - rowRef.current.parentElement.clientWidth));
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    const {scrollYProgress} = useScroll({target: trackRef, offset: ["start start", "end end"]});
    const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -distance]), {stiffness: 160, damping: 30, mass: 0.3});

    const intro = (
        <div className="flex flex-col gap-8 1024px:flex-row 1024px:items-end 1024px:justify-between">
            <SectionIntro
                label="Templates"
                title="Whole sites you can start from."
                description="20+ free templates for landing pages, shops and portfolios. Each one is open source on GitHub."
            />
            <Link to="/templates" className="btn-ghost group h-10 w-fit shrink-0">
                Browse templates
                <LuArrowRight className="size-4 transition-transform group-hover:translate-x-0.5"/>
            </Link>
        </div>
    );

    return (
        <Band>
            {/* Desktop: vertical scroll moves the row sideways */}
            <div ref={trackRef} className="relative hidden 1024px:block" style={{height: `calc(100vh + ${distance}px)`}}>
                <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16">
                    <div className="px-12">{intro}</div>
                    <motion.div ref={rowRef} style={{x}} className="mt-10 flex w-max gap-6 pl-12 pr-12">
                        {templates.map((template, index) => <TemplateCard key={template.title} template={template} index={index}/>)}
                    </motion.div>
                </div>
            </div>

            {/* Touch and small screens: native horizontal scroll */}
            <div className="py-16 1024px:hidden">
                <div className="px-5 640px:px-8">{intro}</div>
                <div className="scroll-none mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 640px:px-8">
                    {templates.map((template, index) => (
                        <div key={template.title} className="snap-start">
                            <TemplateCard template={template} index={index}/>
                        </div>
                    ))}
                </div>
            </div>
        </Band>
    );
};

export default TemplatesSlider;

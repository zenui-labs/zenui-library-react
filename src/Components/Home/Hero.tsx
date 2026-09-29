import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {LuArrowRight} from "react-icons/lu";
import {FaReact} from "react-icons/fa";
import {BiLogoTailwindCss} from "react-icons/bi";
import {TbBrandFramerMotion, TbBrandNextjs} from "react-icons/tb";
import {SiVite} from "react-icons/si";

import HeroCanvas from "@/Components/Home/HeroCanvas.tsx";
import {EASE} from "@/Components/Home/LandingKit.tsx";

const headline = ["React", "components", "you", "copy,", "not", "install."];

const stack = [
    {label: "React", icon: FaReact, url: "https://react.dev/learn"},
    {label: "Next.js", icon: TbBrandNextjs, url: "https://nextjs.org/docs"},
    {label: "Vite", icon: SiVite, url: "https://vite.dev/guide/"},
    {label: "Tailwind CSS", icon: BiLogoTailwindCss, url: "https://v3.tailwindcss.com/docs/installation"},
    {label: "Motion", icon: TbBrandFramerMotion, url: "https://motion.dev/docs"},
];

const fadeUp = (delay) => ({
    initial: {opacity: 0, y: 16, filter: "blur(6px)"},
    animate: {opacity: 1, y: 0, filter: "blur(0px)"},
    transition: {duration: 0.8, delay, ease: EASE},
});

// Pulled up under the transparent navbar so the glow and grid start at the top of the page.
const Hero = () => {
    return (
        <section className="relative -mt-[60px] overflow-hidden">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="hairline-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_12%,black,transparent_75%)]"/>
                <div className="absolute left-1/2 top-[-160px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent/[0.09] blur-[120px]"/>
            </div>

            <div className="shell relative pb-24 pt-[124px] 640px:pt-[156px]">
                <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
                    <motion.div {...fadeUp(0)}>
                        <Link to="/docs/whats-new"
                              className="group inline-flex h-8 items-center gap-2 rounded-full border border-hairline bg-surface/80 pl-1 pr-3 text-[0.8rem] text-ink-muted shadow-card backdrop-blur transition-colors hover:text-ink">
                            <span className="rounded-full bg-ink px-2 py-0.5 text-[0.68rem] font-semibold text-canvas">v4</span>
                            TypeScript, responsive previews and new blocks
                            <LuArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5"/>
                        </Link>
                    </motion.div>

                    <h1 className="mt-7 text-balance text-[2.75rem] font-semibold leading-[1] tracking-display text-ink 400px:text-[3.1rem] 640px:text-[4.25rem] 1024px:text-[5.25rem]">
                        {headline.map((word, index) => (
                            <motion.span
                                key={word}
                                className="mr-[0.22em] inline-block last:mr-0"
                                initial={{opacity: 0, y: "0.4em", filter: "blur(10px)"}}
                                animate={{opacity: 1, y: 0, filter: "blur(0px)"}}
                                transition={{duration: 0.9, delay: 0.08 + index * 0.06, ease: EASE}}
                            >
                                {index === 3 ? <span className="text-accent-strong">{word}</span> : word}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.p {...fadeUp(0.45)}
                              className="mt-6 max-w-[58ch] text-pretty text-[1.05rem] leading-relaxed text-ink-muted 640px:text-[1.15rem]">
                        More than 800 components, blocks, animations and templates built with Tailwind CSS.
                        Preview each one in light or dark, then paste the code into your project.
                    </motion.p>

                    <motion.div {...fadeUp(0.55)} className="mt-9 flex w-full flex-col items-center justify-center gap-3 425px:w-auto 425px:flex-row">
                        <Link to="/components/all-components" className="btn-primary group h-11 w-full px-5 425px:w-auto">
                            Browse components
                            <LuArrowRight className="size-4 transition-transform group-hover:translate-x-0.5"/>
                        </Link>
                        <Link to="/docs/installation" className="btn-ghost h-11 w-full px-5 425px:w-auto">
                            Read the docs
                        </Link>
                    </motion.div>

                    <motion.ul {...fadeUp(0.65)} className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3" aria-label="Works with">
                        <li className="eyebrow">Works with</li>
                        {stack.map(({label, icon: Icon, url}) => (
                            <li key={label}>
                                <a href={url} target="_blank" rel="noreferrer"
                                   className="flex items-center gap-1.5 text-[0.85rem] text-ink-subtle transition-colors hover:text-ink">
                                    <Icon className="size-4"/> {label}
                                </a>
                            </li>
                        ))}
                    </motion.ul>
                </div>

                <HeroCanvas/>
            </div>
        </section>
    );
};

export default Hero;

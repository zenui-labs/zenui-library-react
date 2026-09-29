import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {LuArrowRight} from "react-icons/lu";
import {FiGithub} from "react-icons/fi";

import {Band, EASE, Reveal} from "@/Components/Home/LandingKit.tsx";
import {GITHUB_URL} from "@/Components/Home/Navbar.tsx";
import {useGitHubStars} from "@/CustomHooks/useGithubStars.ts";

const names = [
    "Modal", "Toast", "Data table", "Calendar", "Stepper", "Drawer", "OTP input", "Pricing", "Tabs", "Carousel",
    "Timeline", "Tooltip", "Command menu", "Image cropper", "Rating", "Accordion", "Skeleton", "Pagination",
];

const Marquee = ({items, reverse = false}: {items: string[]; reverse?: boolean}) => (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee-x gap-3 pr-3" style={{"--marquee-duration": "55s", animationDirection: reverse ? "reverse" : "normal"}}>
            {[...items, ...items].map((name, index) => (
                <span key={`${name}-${index}`}
                      className="whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[0.8rem] text-white/55">
                    {name}
                </span>
            ))}
        </div>
    </div>
);

/**
 * Closing call to action. Always dark, whatever the site theme, with a light beam
 * travelling around the border and a moving grid floor.
 */
const FinalCta = () => {
    const {stars} = useGitHubStars("Asfak00", "zenui-library");

    return (
        <Band innerClassName="px-5 py-16 640px:px-8 1024px:px-12 1024px:py-20">
            <Reveal>
                {/* 1px frame with a light beam travelling around it */}
                <div className="relative overflow-hidden rounded-[30px] p-px">
                    {/* Centered with motion's x/y: a Tailwind translate class would be overwritten by the rotate transform. */}
                    <motion.div
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 aspect-square w-[160%]"
                        style={{
                            x: "-50%",
                            y: "-50%",
                            background: "conic-gradient(from 0deg, transparent 0 230deg, rgba(34,195,224,0.35) 280deg, rgba(125,230,255,1) 330deg, transparent 360deg)",
                        }}
                        animate={{rotate: 360}}
                        transition={{duration: 7, repeat: Infinity, ease: "linear"}}
                    />
                    <div className="absolute inset-0 rounded-[30px] border border-white/10"/>

                    <div
                        className="dark relative isolate overflow-hidden rounded-[29px] bg-[#06070b] px-6 pb-10 pt-16 text-center 640px:px-12 640px:pt-20"
                    >
                        {/* Grid floor */}
                        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[65%] overflow-hidden [perspective:420px]">
                            <div
                                className="absolute inset-x-[-50%] bottom-[-40%] h-[160%] origin-bottom animate-cta-grid [transform:rotateX(62deg)] [mask-image:linear-gradient(to_top,black_10%,transparent_75%)]"
                                style={{
                                    backgroundImage: "linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)",
                                    backgroundSize: "56px 56px",
                                }}
                            />
                        </div>
                        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-30%] -z-10 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-[#22c3e0]/20 blur-[120px]"/>

                        <motion.a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noreferrer"
                            initial={{opacity: 0, y: 10}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.6, ease: EASE}}
                            className="inline-flex h-8 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] pl-1.5 pr-3 text-[0.8rem] text-white/70 backdrop-blur transition-colors hover:text-white"
                        >
                            <span className="flex h-5 items-center rounded-full bg-[#22c3e0] px-2 text-[0.68rem] font-semibold text-[#03161b]">MIT</span>
                            Free and open source
                        </motion.a>

                        <h2 className="mx-auto mt-7 max-w-[15ch] text-balance bg-gradient-to-b from-white via-white to-white/45 bg-clip-text text-[2.6rem] font-semibold leading-[1] tracking-display text-transparent 640px:text-[4.25rem]">
                            Your next interface starts here.
                        </h2>
                        <p className="mx-auto mt-6 max-w-[46ch] text-[1.02rem] leading-relaxed text-white/60">
                            Pick a component, check it in both themes, paste it in. No package to install and nothing to configure.
                        </p>

                        <div className="mt-10 flex flex-col items-center justify-center gap-3 425px:flex-row">
                            <Link to="/components/all-components"
                                  className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-6 text-[0.92rem] font-medium text-[#06070b] shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_8px_30px_-6px_rgba(34,195,224,0.55)] transition-transform active:scale-[0.98] 425px:w-auto">
                                <span aria-hidden="true" className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#22c3e0]/35 to-transparent transition-[left] duration-700 ease-out group-hover:left-[120%]"/>
                                <span className="relative">Browse components</span>
                                <LuArrowRight className="relative size-4 transition-transform group-hover:translate-x-0.5"/>
                            </Link>
                            <a href={GITHUB_URL} target="_blank" rel="noreferrer"
                               className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 text-[0.92rem] font-medium text-white backdrop-blur transition-colors hover:border-white/25 hover:bg-white/[0.08] active:scale-[0.98] 425px:w-auto">
                                <FiGithub className="size-4"/>
                                Star on GitHub
                                {stars > 0 && <span className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.72rem] text-white/70">{stars}</span>}
                            </a>
                        </div>

                        <div className="mt-16 flex flex-col gap-3">
                            <Marquee items={names}/>
                            <Marquee items={[...names].reverse()} reverse/>
                        </div>
                    </div>
                </div>
            </Reveal>
        </Band>
    );
};

export default FinalCta;

import {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {AnimatePresence, motion, useInView} from 'framer-motion';
import {LuArrowRight} from "react-icons/lu";

import {toolsNavigation} from "@utils/DocsNavigation.ts";
import {navIcons} from "@shared/NavIcons.tsx";
import {Band, EASE, SectionIntro} from "@/Components/Home/LandingKit.tsx";
import {cn} from "@utils/Style.ts";

const DURATION = 6000;

const details = {
    "/shortcut-generator": {
        image: "/keyboard-shortcut-image.svg",
        text: "Press the keys you want, get a handler with the right modifier checks. Paste it into a component and you're done.",
    },
    "/icons": {
        image: "/icons-image.svg",
        text: "Browse 400+ free SVG icons. Change size, stroke and color, then copy the SVG or JSX.",
    },
    "/config-generator": {
        image: "/config-ai-image.svg",
        text: "Describe your brand in a sentence. Config AI writes a Tailwind CSS v4 theme with colors, fonts and spacing to match.",
    },
    "/color-palette": {
        image: "/color-palette-image.svg",
        text: "Paste a color to get every shade and opacity step in HEX, RGB and HSL, or pick colors straight from an image.",
    },
    "/semantic-tag-master": {
        image: "/semantic-tagmaster-image.svg",
        text: "A reference for semantic HTML tags: what each one means, when to use it and how it helps accessibility and SEO.",
    },
};

const tools = toolsNavigation.map((tool) => ({...tool, ...details[tool.url]}));

const ZenUITools = () => {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, {margin: "-20% 0px"});
    const running = inView && !paused;

    useEffect(() => {
        if (!running) return;
        const timer = setTimeout(() => setActive((index) => (index + 1) % tools.length), DURATION);
        return () => clearTimeout(timer);
    }, [active, running]);

    const current = tools[active];

    return (
        <Band innerClassName="px-5 py-16 640px:px-8 1024px:px-12 1024px:py-24">
            <SectionIntro
                label="Tools"
                title="Small tools for the jobs around the UI."
                description="Free and in the browser. No account needed."
            />

            <div ref={ref} className="mt-10 grid gap-8 1024px:grid-cols-[0.85fr_1.15fr] 1024px:gap-12"
                 onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
                <div role="tablist" aria-label="Tools" className="flex flex-col">
                    {tools.map((tool, index) => {
                        const Icon = navIcons[tool.icon];
                        const selected = index === active;
                        return (
                            <div key={tool.url} className="relative border-t border-hairline last:border-b">
                                <button
                                    role="tab"
                                    aria-selected={selected}
                                    onClick={() => setActive(index)}
                                    className="flex w-full items-center gap-4 py-4 text-left"
                                >
                                    <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors",
                                        selected ? "border-hairline-strong bg-surface text-accent-strong" : "border-hairline text-ink-subtle")}>
                                        <Icon className="size-4"/>
                                    </span>
                                    <span className={cn("text-[1.05rem] font-medium tracking-heading transition-colors", selected ? "text-ink" : "text-ink-subtle")}>
                                        {tool.title}
                                    </span>
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{height: selected ? "auto" : 0, opacity: selected ? 1 : 0}}
                                    transition={{duration: 0.45, ease: EASE}}
                                    className="overflow-hidden"
                                >
                                    <p className="pb-4 pl-[52px] text-[0.92rem] leading-relaxed text-ink-muted">{tool.text}</p>
                                    <Link to={tool.url} className="mb-5 ml-[52px] inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-ink hover:text-accent-strong">
                                        Open {tool.title}
                                        <LuArrowRight className="size-3.5"/>
                                    </Link>
                                </motion.div>
                                {selected && (
                                    <span className="absolute -top-px left-0 h-px w-full overflow-hidden">
                                        <motion.span
                                            key={`${active}-${running}`}
                                            className="block h-full origin-left bg-ink"
                                            initial={{scaleX: 0}}
                                            animate={{scaleX: running ? 1 : 0}}
                                            transition={{duration: running ? DURATION / 1000 : 0.2, ease: "linear"}}
                                        />
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="relative overflow-hidden rounded-shell border border-hairline bg-surface p-2 shadow-float">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-canvas">
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.img
                                key={current.image}
                                src={current.image}
                                alt={`${current.title} preview`}
                                className="absolute inset-0 h-full w-full object-contain"
                                initial={{opacity: 0, scale: 1.03, filter: "blur(8px)"}}
                                animate={{opacity: 1, scale: 1, filter: "blur(0px)"}}
                                exit={{opacity: 0, scale: 0.98, filter: "blur(8px)"}}
                                transition={{duration: 0.6, ease: EASE}}
                            />
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </Band>
    );
};

export default ZenUITools;

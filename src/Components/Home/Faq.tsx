import {useState} from 'react';
import {motion} from "framer-motion";
import {LuPlus} from "react-icons/lu";

import {Band, EASE, Reveal, SectionIntro} from "@/Components/Home/LandingKit.tsx";
import {DISCORD_URL} from "@/Components/Home/Navbar.tsx";
import {cn} from "@utils/Style.ts";

const questions = [
    {
        question: "What is ZenUI Library?",
        answer: "A free collection of React components, page blocks, animations, templates and SVG icons styled with Tailwind CSS. You copy the code for what you need into your own project.",
    },
    {
        question: "Is it really free?",
        answer: "Yes. ZenUI is open source under the MIT license, including for commercial projects.",
    },
    {
        question: "Do I need to install a package?",
        answer: "No. Most components are a single JSX file that only needs React and Tailwind CSS. A few animated components also use Framer Motion, and their pages say so.",
    },
    {
        question: "Is there TypeScript support?",
        answer: "Yes. Every example is written in strict TypeScript. Use the TS and JS switch above any code block to copy it as TypeScript or as plain JavaScript.",
    },
    {
        question: "Does it work with Next.js?",
        answer: "Yes. The components are plain React, so they work in Next.js, Vite, Remix and other React setups. Add \"use client\" to components that use state or effects in the Next.js App Router.",
    },
    {
        question: "Which Tailwind CSS version do the components use?",
        answer: "The examples are written for Tailwind CSS v3. The Installation page shows the setup they expect.",
    },
    {
        question: "Can I change how the components look?",
        answer: "Yes. Everything is Tailwind classes in your own code, so you edit colors, spacing and behavior directly. There is no theme layer to fight.",
    },
    {
        question: "Do I have to credit ZenUI?",
        answer: "No. A mention is appreciated, but it isn't required.",
    },
    {
        question: "Is there a Vue version?",
        answer: "Yes, ZenUI Library Vue is available at vueui.zenui.net.",
    },
    {
        question: "How can I contribute?",
        answer: "Open an issue or a pull request on GitHub, or follow the Become a ZenUI hero guide to submit components and templates. Contributors are listed on the Contributors page.",
    },
];

const Faq = () => {
    const [open, setOpen] = useState(0);

    return (
        <Band innerClassName="grid gap-12 px-5 py-16 640px:px-8 1024px:grid-cols-[0.8fr_1.2fr] 1024px:px-12 1024px:py-24">
            <div className="1024px:sticky 1024px:top-28 1024px:self-start">
                <SectionIntro
                    label="FAQ"
                    title="Questions, answered."
                    description={
                        <>
                            Something missing? Ask in our{" "}
                            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="text-ink underline decoration-hairline-strong underline-offset-4 hover:decoration-ink">
                                Discord
                            </a>{" "}
                            or email{" "}
                            <a href="mailto:zenuilibrary@gmail.com" className="text-ink underline decoration-hairline-strong underline-offset-4 hover:decoration-ink">
                                zenuilibrary@gmail.com
                            </a>.
                        </>
                    }
                />
            </div>

            <Reveal delay={0.05}>
                <ul className="border-b border-hairline">
                    {questions.map((item, index) => {
                        const expanded = open === index;
                        return (
                            <li key={item.question} className="border-t border-hairline">
                                <h3>
                                    <button
                                        onClick={() => setOpen(expanded ? -1 : index)}
                                        aria-expanded={expanded}
                                        aria-controls={`faq-${index}`}
                                        className="flex w-full items-center justify-between gap-6 py-5 text-left text-[1rem] font-medium text-ink 640px:text-[1.05rem]"
                                    >
                                        {item.question}
                                        <LuPlus className={cn("size-4 shrink-0 text-ink-subtle transition-transform duration-300 ease-out-expo", expanded && "rotate-45 text-ink")}/>
                                    </button>
                                </h3>
                                <motion.div
                                    id={`faq-${index}`}
                                    initial={false}
                                    animate={{height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0}}
                                    transition={{duration: 0.4, ease: EASE}}
                                    className="overflow-hidden"
                                >
                                    <p className="max-w-[60ch] pb-6 text-[0.95rem] leading-relaxed text-ink-muted">{item.answer}</p>
                                </motion.div>
                            </li>
                        );
                    })}
                </ul>
            </Reveal>
        </Band>
    );
};

export default Faq;

import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, useMotionValueEvent, useScroll} from "framer-motion";
import {LuBell, LuCheck, LuCode2, LuCopy, LuMonitor, LuMoon, LuSearch, LuSun} from "react-icons/lu";

import {Band, EASE, Reveal, SectionIntro} from "@/Components/Home/LandingKit.tsx";
import {cn} from "@utils/Style.ts";

const steps = [
    {
        title: "Find it",
        text: "Press ⌘K from any page and type what you need. Components, blocks, animations and tools share one search.",
    },
    {
        title: "Check it in both themes",
        text: "Every preview has its own Light and Dark switch, so you can see the dark variant without changing the whole site.",
    },
    {
        title: "Copy the code",
        text: "One JSX file with Tailwind classes. Leave the dark: classes in, or turn them off before you copy.",
    },
];

const WindowChrome = ({children, label}) => (
    <div className="overflow-hidden rounded-shell border border-hairline bg-surface">
        <div className="flex h-10 items-center gap-2 border-b border-hairline px-4">
            <span className="size-2.5 rounded-full bg-hairline-strong"/>
            <span className="size-2.5 rounded-full bg-hairline-strong"/>
            <span className="size-2.5 rounded-full bg-hairline-strong"/>
            <span className="ml-3 font-mono text-[0.7rem] text-ink-subtle">{label}</span>
        </div>
        {children}
    </div>
);

const SearchMock = () => {
    const query = "toast";
    const [typed, setTyped] = useState("");
    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            i = i > query.length + 6 ? 0 : i + 1;
            setTyped(query.slice(0, i));
        }, 160);
        return () => clearInterval(timer);
    }, []);
    const results = [["Toast", "Feedback"], ["Notification", "Feedback"], ["Alert", "Feedback"]];
    return (
        <div className="p-4">
            <div className="flex h-11 items-center gap-2.5 rounded-xl border border-hairline bg-canvas px-3.5">
                <LuSearch className="size-4 text-ink-subtle"/>
                <span className="text-[0.9rem] text-ink">{typed}</span>
                <span className="-ml-2 h-4 w-px animate-pulse bg-ink"/>
            </div>
            <p className="eyebrow mt-4 px-1">Components</p>
            <div className="mt-2 flex flex-col gap-1">
                {results.map(([title, group], index) => (
                    <div key={title} className={cn("flex items-center gap-3 rounded-lg px-3 py-2", index === 0 && typed.length > 1 && "bg-raised")}>
                        <span className="flex size-7 items-center justify-center rounded-md border border-hairline bg-surface text-ink-subtle"><LuBell className="size-3.5"/></span>
                        <span className="flex-1 text-[0.85rem] font-medium text-ink">{title}</span>
                        <span className="text-[0.75rem] text-ink-subtle">{group}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PreviewMock = () => {
    const [mode, setMode] = useState("light");
    useEffect(() => {
        const timer = setInterval(() => setMode((m) => (m === "light" ? "dark" : "light")), 1800);
        return () => clearInterval(timer);
    }, []);
    return (
        <div>
            <div className="flex items-center gap-1 border-b border-hairline p-2">
                {([["auto", LuMonitor], ["light", LuSun], ["dark", LuMoon]] as const).map(([id, Icon]) => (
                    <span key={id} className={cn("flex h-7 items-center gap-1.5 rounded-md px-2 text-[0.72rem] capitalize", mode === id ? "bg-raised text-ink" : "text-ink-subtle")}>
                        <Icon className="size-3.5"/>{id}
                    </span>
                ))}
            </div>
            <div className={cn("flex h-[230px] items-center justify-center p-6 transition-colors duration-500", mode === "dark" ? "bg-[#020617]" : "bg-white")}>
                <div className={cn("flex w-full max-w-[280px] items-start gap-3 rounded-xl border p-3.5 shadow-lg transition-colors duration-500",
                    mode === "dark" ? "border-slate-700 bg-slate-800 text-slate-100" : "border-gray-200 bg-white text-gray-900")}>
                    <span className="flex size-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500"><LuCheck className="size-4"/></span>
                    <div>
                        <p className="text-[0.82rem] font-medium">Invite sent</p>
                        <p className={cn("text-[0.72rem] transition-colors duration-500", mode === "dark" ? "text-slate-400" : "text-gray-500")}>
                            They will get an email in a minute.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CodeMock = () => {
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        const timer = setInterval(() => setCopied((c) => !c), 1600);
        return () => clearInterval(timer);
    }, []);
    const lines = [
        ["<div", " className=", "\"flex gap-3 rounded-xl border p-4", " dark:border-slate-700", "\">"],
        ["  <p", " className=", "\"text-gray-900", " dark:text-slate-100", "\">Invite sent</p>"],
        ["  <p", " className=", "\"text-gray-500", " dark:text-slate-400", "\">"],
        ["    They will get an email in a minute.", "", "", "", ""],
        ["  </p>", "", "", "", ""],
        ["</div>", "", "", "", ""],
    ];
    return (
        <div className="bg-[#0b0d12] font-mono text-[0.75rem] leading-[1.9] text-[#abb2bf]">
            <div className="flex h-10 items-center justify-between border-b border-white/[0.08] px-3">
                <span className="flex items-center gap-1.5 text-white/70"><LuCode2 className="size-3.5"/> Toast.jsx</span>
                <span className={cn("flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors", copied ? "bg-white/10 text-emerald-400" : "text-white/50")}>
                    {copied ? <LuCheck className="size-3.5"/> : <LuCopy className="size-3.5"/>}{copied ? "Copied" : "Copy"}
                </span>
            </div>
            <pre className="overflow-hidden p-4">
                {lines.map((line, index) => (
                    <div key={index} className="whitespace-pre">
                        <span className="mr-4 select-none text-white/20">{index + 1}</span>
                        <span className="text-[#e06c75]">{line[0]}</span>
                        <span className="text-[#d19a66]">{line[1]}</span>
                        <span className="text-[#98c379]">{line[2]}</span>
                        <span className="text-[#56b6c2]">{line[3]}</span>
                        <span className="text-[#98c379]">{line[4]}</span>
                    </div>
                ))}
            </pre>
        </div>
    );
};

const mocks = [
    {label: "Search", element: <SearchMock/>},
    {label: "components/toast", element: <PreviewMock/>},
    {label: "Toast.jsx", element: <CodeMock/>},
];

const HowItWorks = () => {
    const trackRef = useRef(null);
    const [active, setActive] = useState(0);
    const {scrollYProgress} = useScroll({target: trackRef, offset: ["start start", "end end"]});

    useMotionValueEvent(scrollYProgress, "change", (value) => {
        setActive(Math.min(steps.length - 1, Math.floor(value * steps.length)));
    });

    const jumpTo = (index) => {
        const track = trackRef.current;
        const top = track.getBoundingClientRect().top + window.scrollY;
        const distance = track.offsetHeight - window.innerHeight;
        window.scrollTo({top: top + distance * ((index + 0.5) / steps.length), behavior: "smooth"});
    };

    return (
        <Band>
            {/* Desktop: pinned while the three steps scroll by */}
            <div ref={trackRef} className="relative hidden h-[260vh] 1024px:block">
                <div className="sticky top-0 flex h-screen items-center">
                    <div className="grid w-full grid-cols-[1fr_1.15fr] items-center gap-16 px-12">
                        <div>
                            <SectionIntro label="How it works" title="From idea to working UI in three steps."/>
                            <ol className="mt-10 flex flex-col">
                                {steps.map((step, index) => (
                                    <li key={step.title}>
                                        <button onClick={() => jumpTo(index)}
                                                className="group flex w-full gap-5 border-t border-hairline py-5 text-left">
                                            <span className={cn("font-mono text-[0.8rem] transition-colors", active === index ? "text-accent-strong" : "text-ink-subtle")}>
                                                0{index + 1}
                                            </span>
                                            <span className="flex-1">
                                                <span className={cn("block text-[1.15rem] font-semibold tracking-heading transition-colors", active === index ? "text-ink" : "text-ink-subtle group-hover:text-ink-muted")}>
                                                    {step.title}
                                                </span>
                                                <motion.span
                                                    initial={false}
                                                    animate={{height: active === index ? "auto" : 0, opacity: active === index ? 1 : 0}}
                                                    transition={{duration: 0.5, ease: EASE}}
                                                    className="block overflow-hidden"
                                                >
                                                    <span className="block pt-2 text-[0.95rem] leading-relaxed text-ink-muted">{step.text}</span>
                                                </motion.span>
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active}
                                    initial={{opacity: 0, y: 24, scale: 0.98, filter: "blur(8px)"}}
                                    animate={{opacity: 1, y: 0, scale: 1, filter: "blur(0px)"}}
                                    exit={{opacity: 0, y: -16, scale: 0.98, filter: "blur(8px)"}}
                                    transition={{duration: 0.55, ease: EASE}}
                                >
                                    <WindowChrome label={mocks[active].label}>{mocks[active].element}</WindowChrome>
                                </motion.div>
                            </AnimatePresence>
                            <div className="mt-5 flex justify-center gap-1.5">
                                {steps.map((step, index) => (
                                    <span key={step.title} className={cn("h-1 rounded-full transition-all duration-500", active === index ? "w-8 bg-ink" : "w-3 bg-hairline-strong")}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile and tablet: stacked */}
            <div className="px-5 py-16 640px:px-8 1024px:hidden">
                <SectionIntro label="How it works" title="From idea to working UI in three steps."/>
                <div className="mt-12 flex flex-col gap-12">
                    {steps.map((step, index) => (
                        <Reveal key={step.title}>
                            <p className="font-mono text-[0.8rem] text-accent-strong">0{index + 1}</p>
                            <h3 className="mt-2 text-[1.2rem] font-semibold tracking-heading text-ink">{step.title}</h3>
                            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{step.text}</p>
                            <div className="mt-5"><WindowChrome label={mocks[index].label}>{mocks[index].element}</WindowChrome></div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </Band>
    );
};

export default HowItWorks;

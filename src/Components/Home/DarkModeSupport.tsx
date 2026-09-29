import {LuContrast, LuCopyCheck, LuPalette} from "react-icons/lu";

import ComparisonCard from "./ComparisonCard.tsx";
import {Band, Reveal, SectionIntro} from "@/Components/Home/LandingKit.tsx";

const points = [
    {
        icon: LuContrast,
        title: "Preview each theme on its own",
        text: "Switch a single preview to light or dark without touching the rest of the page.",
    },
    {
        icon: LuCopyCheck,
        title: "Copy with or without dark:",
        text: "Keep the dark: classes, or strip them in one click if your project is light only.",
    },
    {
        icon: LuPalette,
        title: "Plain Tailwind classes",
        text: "No theme provider and no CSS variables to wire up. Change a class and you are done.",
    },
];

const DarkModeSupport = () => {
    return (
        <Band innerClassName="grid gap-14 px-5 py-16 640px:px-8 1024px:grid-cols-[0.9fr_1.1fr] 1024px:items-center 1024px:px-12 1024px:py-24">
            <div>
                <SectionIntro
                    label="Dark mode"
                    title="Every example works in both themes."
                    description="Components and templates ship with dark mode classes. Drag the handle to compare."
                />
                <ul className="mt-10 flex flex-col">
                    {points.map((point, index) => (
                        <Reveal as="li" key={point.title} delay={0.05 * index} className="flex gap-4 border-t border-hairline py-5">
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface text-ink-muted">
                                <point.icon className="size-4"/>
                            </span>
                            <div>
                                <p className="text-[0.95rem] font-medium text-ink">{point.title}</p>
                                <p className="mt-1 text-[0.9rem] leading-relaxed text-ink-muted">{point.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </ul>
            </div>

            <Reveal delay={0.1}>
                <div className="overflow-hidden rounded-shell border border-hairline bg-surface p-2 shadow-float">
                    <div className="overflow-hidden rounded-[14px]">
                        <ComparisonCard/>
                    </div>
                    <div className="flex items-center justify-between px-3 pb-1 pt-3 text-[0.78rem] font-medium text-ink-subtle">
                        <span>Dark</span>
                        <span>Light</span>
                    </div>
                </div>
            </Reveal>
        </Band>
    );
};

export default DarkModeSupport;

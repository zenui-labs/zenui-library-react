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

// The classes on every card in the preview: one set of markup, both themes.
const classes = ["rounded-xl", "border", "border-zinc-200", "bg-white", "text-zinc-900", "dark:border-white/10", "dark:bg-zinc-900", "dark:text-zinc-50"];

const DarkModeSupport = () => {
    return (
        <Band innerClassName="grid gap-14 px-5 py-16 640px:px-8 1024px:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] 1024px:items-center 1024px:px-12 1024px:py-24">
            <div>
                <SectionIntro
                    label="Dark mode"
                    title="Every example works in both themes."
                    description="Every example is written once with Tailwind's dark: classes. The preview is one piece of markup shown in both themes."
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

            <Reveal delay={0.1} className="relative min-w-0">
                {/* closest-side keeps the glow fully transparent at its box edges, so it never ends in a hard line. */}
                <div aria-hidden="true" className="pointer-events-none absolute -inset-x-16 -inset-y-12 -z-10 bg-[radial-gradient(closest-side,rgb(var(--accent)/0.16),rgb(var(--accent)/0.05)_55%,transparent)]"/>
                <div className="overflow-hidden rounded-shell border border-hairline bg-surface shadow-float">
                    <div className="flex h-10 items-center gap-3 border-b border-hairline px-4">
                        <span className="flex gap-1.5" aria-hidden="true">
                            <span className="size-2.5 rounded-full bg-hairline-strong"/>
                            <span className="size-2.5 rounded-full bg-hairline-strong"/>
                            <span className="size-2.5 rounded-full bg-hairline-strong"/>
                        </span>
                        <span className="text-[0.75rem] text-ink-subtle">Drag the handle or use the arrow keys</span>
                    </div>
                    <ComparisonCard/>
                    <div className="scroll-none overflow-x-auto border-t border-hairline bg-[#0b0d12] px-4 py-3 font-mono text-[0.75rem]">
                        <code className="whitespace-nowrap">
                            {classes.map((token) => (
                                <span key={token} className={token.startsWith("dark:") ? "text-accent" : "text-white/75"}>{token} </span>
                            ))}
                        </code>
                    </div>
                </div>
            </Reveal>
        </Band>
    );
};

export default DarkModeSupport;

import {useMemo, useState} from "react";
import {AnimatePresence} from "framer-motion";
import {Helmet} from "react-helmet";
import {LuAccessibility, LuArrowLeft, LuArrowRight, LuCheck, LuSearch, LuX} from "react-icons/lu";

import SelectInput from "./SelectInput.tsx";
import AnimatedText from "./AnimatedText.tsx";
import AnimatedSection from "./AnimatedSection.tsx";
import ShowCode from "@shared/Component/ShowCode.tsx";
import {Callout} from "@shared/DocsProse.tsx";
import {semanticElements} from "@utils/HTMLTagsDetailsData.ts";
import {cn} from "@utils/Style.ts";

// How tags are grouped in the filter. Anything missing here lands in "Other".
const GROUPS = [
    {id: "structure", label: "Page structure", tags: ["header", "nav", "main", "section", "article", "aside", "footer"]},
    {id: "content", label: "Content", tags: ["figure", "figcaption", "details", "summary"]},
    {id: "text", label: "Text", tags: ["time", "mark"]},
    {id: "forms", label: "Forms", tags: ["form"]},
];

const TAGS = Object.keys(semanticElements);

const groupOf = (tag) => GROUPS.find((group) => group.tags.includes(tag)) ?? {id: "other", label: "Other"};

const plain = (text = "") => text.replace(/<\/?code>/g, "");

const matches = (tag, query) => {
    if (!query) return true;
    const needle = query.trim().toLowerCase().replace(/[<>/]/g, "");
    if (!needle) return true;
    return tag.includes(needle) || plain(semanticElements[tag].description).toLowerCase().includes(needle);
};

const sections = [
    {key: "bestPractice", title: "Best practices", icon: LuCheck, iconClass: "text-accent-strong"},
    {key: "commonMistake", title: "Common mistakes", icon: LuX, iconClass: "text-ink-subtle"},
    {key: "seoBenefits", title: "SEO benefits", icon: LuSearch, iconClass: "text-ink-subtle"},
];

const Index = () => {
    const [selectedElement, setSelectedElement] = useState(TAGS.includes("article") ? "article" : TAGS[0]);
    const [query, setQuery] = useState("");
    const [group, setGroup] = useState("all");

    const groups = useMemo(() => {
        const counts = TAGS.reduce((acc, tag) => {
            const id = groupOf(tag).id;
            acc[id] = (acc[id] ?? 0) + 1;
            return acc;
        }, {});
        const present = [...GROUPS, {id: "other", label: "Other"}].filter((item) => counts[item.id]);
        return [{id: "all", label: "All", count: TAGS.length}, ...present.map((item) => ({...item, count: counts[item.id]}))];
    }, []);

    const items = useMemo(
        () => TAGS.filter((tag) => (group === "all" || groupOf(tag).id === group) && matches(tag, query)),
        [group, query]
    );

    const element = semanticElements[selectedElement];
    const index = TAGS.indexOf(selectedElement);
    const previous = TAGS[index - 1];
    const next = TAGS[index + 1];

    return (
        <div className="shell pb-20 pt-10">
            <header className="max-w-[60ch]">
                <h1 className="text-[2.2rem] font-semibold leading-tight tracking-display text-ink 640px:text-[2.8rem]">
                    Semantic TagMaster
                </h1>
                <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink-muted">
                    A reference for HTML elements that describe what content is, not only how it looks. Pick a tag to see
                    when to use it, the mistakes people make with it, and an example you can copy. Semantic markup helps
                    screen readers, search engines and the next person who reads your code.
                </p>
            </header>

            <div className="mt-10 grid grid-cols-1 gap-8 1024px:grid-cols-[232px_minmax(0,1fr)] 1024px:gap-12">
                <aside className="min-w-0 1024px:sticky 1024px:top-24 1024px:self-start">
                    <SelectInput
                        query={query}
                        onQueryChange={setQuery}
                        groups={groups}
                        group={group}
                        onGroupChange={setGroup}
                        items={items}
                        value={selectedElement}
                        onChange={setSelectedElement}
                    />
                </aside>

                <AnimatePresence mode="wait" initial={false}>
                    <AnimatedSection key={selectedElement} className="min-w-0">
                        <article>
                            <div className="flex flex-wrap items-center gap-3">
                                <h2 className="font-mono text-[1.6rem] font-medium tracking-tight text-ink 640px:text-[1.9rem]">
                                    <span className="text-ink-subtle">&lt;</span>{selectedElement}<span className="text-ink-subtle">&gt;</span>
                                </h2>
                                <span className="rounded-full border border-hairline bg-raised px-2.5 py-0.5 text-[0.75rem] font-medium text-ink-muted">
                                    {groupOf(selectedElement).label}
                                </span>
                            </div>

                            <p className="mt-4 max-w-[68ch] text-[1rem] leading-relaxed text-ink-muted">
                                <AnimatedText text={element.description}/>
                            </p>

                            <div className="mt-8 grid grid-cols-1 gap-3 768px:grid-cols-2 1260px:grid-cols-3">
                                {sections.map(({key, title, icon: Icon, iconClass}) => (
                                    <section key={key} className="panel p-5 768px:last:col-span-2 1260px:last:col-span-1">
                                        <h3 className="text-[0.95rem] font-semibold tracking-heading text-ink">{title}</h3>
                                        <ul className="mt-3 flex flex-col gap-2.5">
                                            {(element[key] ?? []).map((text, itemIndex) => (
                                                <li key={itemIndex} className="flex gap-2.5 text-[0.9rem] leading-relaxed text-ink-muted">
                                                    <Icon className={cn("mt-[0.3rem] size-3.5 shrink-0", iconClass)} aria-hidden="true"/>
                                                    <span className="min-w-0"><AnimatedText text={text}/></span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                ))}
                            </div>

                            {element.accessibilityBenefits && (
                                <div className="mt-3 flex gap-3 rounded-panel border border-accent/30 bg-accent/[0.06] p-5">
                                    <LuAccessibility className="mt-0.5 size-4 shrink-0 text-accent-strong" aria-hidden="true"/>
                                    <div className="text-[0.92rem] leading-relaxed text-ink-muted">
                                        <p className="mb-1 font-medium text-ink">Accessibility</p>
                                        <AnimatedText text={element.accessibilityBenefits}/>
                                    </div>
                                </div>
                            )}

                            <section className="mt-10">
                                <h3 className="text-[1.05rem] font-semibold tracking-heading text-ink">Example</h3>
                                <div className="mt-3">
                                    <ShowCode
                                        code={[{id: selectedElement, displayText: `${selectedElement}.html`, language: "html", code: element.example}]}
                                    />
                                </div>
                            </section>

                            <nav aria-label="Other tags" className="mt-10 grid grid-cols-2 gap-3">
                                {previous ? (
                                    <button
                                        type="button"
                                        onClick={() => setSelectedElement(previous)}
                                        className="group flex flex-col items-start gap-1 rounded-panel border border-hairline bg-surface p-4 text-left transition-colors hover:border-hairline-strong hover:bg-raised/40"
                                    >
                                        <span className="flex items-center gap-1.5 text-[0.8rem] text-ink-subtle">
                                            <LuArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5"/> Previous
                                        </span>
                                        <span className="font-mono text-[0.9rem] text-ink">&lt;{previous}&gt;</span>
                                    </button>
                                ) : <span/>}
                                {next && (
                                    <button
                                        type="button"
                                        onClick={() => setSelectedElement(next)}
                                        className="group flex flex-col items-end gap-1 rounded-panel border border-hairline bg-surface p-4 text-right transition-colors hover:border-hairline-strong hover:bg-raised/40"
                                    >
                                        <span className="flex items-center gap-1.5 text-[0.8rem] text-ink-subtle">
                                            Next <LuArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5"/>
                                        </span>
                                        <span className="font-mono text-[0.9rem] text-ink">&lt;{next}&gt;</span>
                                    </button>
                                )}
                            </nav>
                        </article>
                    </AnimatedSection>
                </AnimatePresence>
            </div>

            <div className="mt-14 max-w-[72ch] 1024px:ml-[280px]">
                <Callout title="You still need div">
                    A <code className="rounded-md bg-raised px-1.5 py-0.5 font-mono text-[0.85em] text-ink">div</code> is
                    the right choice for wrappers that exist only for layout or styling. Use a semantic element when one
                    describes the content, and keep divs for everything else rather than building the whole page out of them.
                </Callout>
            </div>

            <Helmet>
                <title>Semantic TagMaster | ZenUI Library</title>
            </Helmet>
        </div>
    );
};

export default Index;

import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Helmet} from "react-helmet";

import ContentPageLayout from "@shared/ContentPageLayout.tsx";
import ContentHeader from "@shared/ContentHeader.tsx";
import ComponentDescription from "@shared/Component/ComponentDescription.tsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.tsx";
import ContentNavbar from "@shared/Component/ContentNavbar.tsx";
import ShowCode from "@shared/Component/ShowCode.tsx";
import ToggleTab from "@shared/Component/ToggleTab.tsx";
import OverviewFooter from "@shared/OverviewFooter.tsx";
import WarningMessageCard from "@shared/Component/WarningMessageCard.tsx";
import {DocsTitle} from "@shared/DocsProse.tsx";
import {useScrollSpy} from "@/CustomHooks/useScrollSpy.ts";
import {findExamplePage} from "@/Examples/registry.ts";
import type {Example} from "@/Examples/types.ts";
import type {CodeTab} from "@shared/Component/ShowCode.tsx";
import {cn} from "@utils/Style.ts";

const toFileName = (title: string) =>
    title.replace(/(^\w|[\s-]+\w)/g, (match) => match.replace(/[\s-]+/, "").toUpperCase()).replace(/[^\w]/g, "") + ".tsx";

// Reusable examples show each component file, then the usage that passes it data. Others show their single file.
const codeTabs = (example: Example): CodeTab[] =>
    example.files?.length
        ? [
            ...example.files.map((file) => ({id: `${example.id}-${file.name}`, displayText: file.name, language: "tsx", code: file.source})),
            {id: `${example.id}-usage`, displayText: "Usage.tsx", language: "tsx", code: example.source},
        ]
        : [{id: example.id, displayText: toFileName(example.title), language: "tsx", code: example.source}];

const ExampleBlock = ({example}: {example: Example}) => {
    const [preview, setPreview] = useState(true);
    const [, setCode] = useState(false);
    const Component = example.component;
    const full = example.layout === "full";

    return (
        <section className="mt-12 first:mt-8">
            <ContentHeader text={example.title} id={example.id} className="pt-0"/>
            <ComponentDescription text={example.description}/>
            <ToggleTab preview={preview} setPreview={setPreview} setCode={setCode}/>
            <ComponentWrapper>
                {preview ? (
                    <div
                        // overflow-clip (not hidden) clips to the frame without creating a scroll container,
                        // so `position: sticky` inside examples keeps working.
                        className={cn(full ? "w-full overflow-clip rounded-b-panel" : "flex w-full items-center justify-center overflow-clip p-4 640px:p-10")}
                        style={{minHeight: example.minHeight ?? 320}}
                    >
                        <Component/>
                    </div>
                ) : (
                    <ShowCode code={codeTabs(example)}/>
                )}
            </ComponentWrapper>
        </section>
    );
};

/** Renders any page registered in src/Examples: header, examples with preview and code, table of contents. */
const ExamplePage = () => {
    const {pathname} = useLocation();
    const page = findExamplePage(pathname);
    const [examples, setExamples] = useState<Example[] | null>(null);
    const activeSection = useScrollSpy((examples ?? []).map((example) => example.id));

    useEffect(() => {
        if (!page) return;
        let active = true;
        setExamples(null);
        page.load().then((module) => active && setExamples(module.default));
        return () => {
            active = false;
        };
    }, [page]);

    if (!page) return null;

    return (
        <ContentPageLayout>
            <aside>
                <div>
                    <DocsTitle title={page.title} lead={page.description}/>

                    {page.notice && (
                        <div className="mt-8 [&_code]:rounded [&_code]:bg-amber-500/10 [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.85em]">
                            <WarningMessageCard>
                                {page.notice.split(/`([^`]+)`/).map((part, index) => (index % 2 ? <code key={index}>{part}</code> : part))}
                            </WarningMessageCard>
                        </div>
                    )}

                    {examples === null ? (
                        <div className="mt-10 space-y-4" aria-label="Loading examples">
                            <div className="h-6 w-48 animate-pulse rounded-md bg-raised"/>
                            <div className="h-[320px] animate-pulse rounded-panel border border-hairline bg-surface"/>
                        </div>
                    ) : (
                        examples.map((example) => <ExampleBlock key={example.id} example={example}/>)
                    )}

                    <OverviewFooter/>
                </div>

                <ContentNavbar
                    contents={(examples ?? []).map((example, index) => ({id: index, title: example.title, href: `#${example.id}`}))}
                    activeSection={activeSection}
                />
            </aside>

            <Helmet>
                <title>{`${page.title} | ZenUI Library`}</title>
            </Helmet>
        </ContentPageLayout>
    );
};

export default ExamplePage;

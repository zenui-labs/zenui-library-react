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
import {DocsTitle} from "@shared/DocsProse.tsx";
import {useScrollSpy} from "@/CustomHooks/useScrollSpy.ts";
import {findExamplePage} from "@/Examples/registry.ts";
import type {Example} from "@/Examples/types.ts";
import {cn} from "@utils/Style.ts";

const toFileName = (title: string) =>
    title.replace(/(^\w|[\s-]+\w)/g, (match) => match.replace(/[\s-]+/, "").toUpperCase()).replace(/[^\w]/g, "") + ".tsx";

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
                    <ShowCode code={[{id: example.id, displayText: toFileName(example.title), language: "tsx", code: example.source}]}/>
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

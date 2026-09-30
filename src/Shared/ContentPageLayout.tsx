import React from 'react';
import type {ReactNode} from "react";
import {Link, useLocation} from "react-router-dom";
import {LuChevronRight} from "react-icons/lu";

import Navbar from "@/Components/Home/Navbar.tsx";
import Sidebar from "@/Components/Overview/Sidebar/index.tsx";
import Footer from "@/Components/Home/Footer.tsx";
import {PageActions} from "@shared/PageActions.tsx";
import {findDocsPage} from "@utils/DocsNavigation.ts";
import {isEmbed} from "@/Helpers/embed.ts";

const Breadcrumb = ({pathname}: {pathname: string}) => {
    const match = findDocsPage(pathname);
    if (!match) return <span/>;
    const {page} = match;
    const trail = [page.section, page.group].filter(Boolean);

    return (
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-[0.8rem] text-ink-subtle">
            <Link to="/docs/overview" className="hover:text-ink">Docs</Link>
            {trail.map((crumb) => (
                <React.Fragment key={crumb}>
                    <LuChevronRight className="size-3 shrink-0"/>
                    <span className="truncate">{crumb}</span>
                </React.Fragment>
            ))}
            <LuChevronRight className="size-3 shrink-0"/>
            <span className="truncate font-medium text-ink" aria-current="page">{page.title}</span>
        </nav>
    );
};

/** Docs shell: navbar, sidebar, content column (pages render their own table of contents) and footer. */
const ContentPageLayout = ({children}: {children: ReactNode}) => {
    const {pathname} = useLocation();

    // Embedded preview: only the page content is needed to find the requested frame (see ComponentWrapper).
    if (isEmbed) return <div className="docs-page">{children}</div>;

    return (
        <>
            <Navbar/>
            <div className="mx-auto flex w-full max-w-[1600px]">
                <Sidebar/>
                <main className="min-w-0 flex-1 px-5 pb-10 pt-6 640px:px-8 1260px:pl-12 1260px:pr-10">
                    <div className="mb-8 flex items-center justify-between gap-4">
                        <Breadcrumb pathname={pathname}/>
                        <PageActions/>
                    </div>
                    <div className="docs-page">
                        {children}
                    </div>
                </main>
            </div>
            <Footer/>
        </>
    );
};

export default ContentPageLayout;

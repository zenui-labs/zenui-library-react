import {Helmet} from "react-helmet";

import {AllBlocksData} from "@utils/AllBlocks.ts";
import CatalogGrid from "@shared/CatalogGrid.tsx";
import OverviewFooter from "@shared/OverviewFooter.tsx";
import {DocsTitle} from "@shared/DocsProse.tsx";

const groups = [
    {id: "section", label: "Sections"},
    {id: "form", label: "Forms"},
    {id: "empty_page", label: "Empty states"},
    {id: "random", label: "Other"},
];

const AllBlocks = () => {
    return (
        <div>
            <DocsTitle
                title="All blocks"
                lead="Larger pieces of a page, such as navbars, hero sections, pricing tables and forms. Each block is responsive and supports dark mode."
            />

            <CatalogGrid items={AllBlocksData} groups={groups} noun="blocks"/>

            <OverviewFooter/>

            <Helmet>
                <title>All blocks | ZenUI Library</title>
            </Helmet>
        </div>
    );
};

export default AllBlocks;

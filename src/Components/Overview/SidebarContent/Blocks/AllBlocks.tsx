import {Helmet} from "react-helmet";

import CatalogGrid from "@shared/CatalogGrid.tsx";
import OverviewFooter from "@shared/OverviewFooter.tsx";
import {DocsTitle} from "@shared/DocsProse.tsx";

const AllBlocks = () => {
    return (
        <div>
            <DocsTitle
                title="All blocks"
                lead="Larger pieces of a page, such as navbars, hero sections, pricing tables and forms. Each block is responsive and supports dark mode."
            />

            <CatalogGrid section="Blocks" noun="blocks"/>

            <OverviewFooter/>

            <Helmet>
                <title>All blocks | ZenUI Library</title>
            </Helmet>
        </div>
    );
};

export default AllBlocks;

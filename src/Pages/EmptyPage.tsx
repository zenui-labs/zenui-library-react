import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import {LuArrowLeft, LuSearch} from "react-icons/lu";

import SiteLayout from "@shared/SiteLayout.tsx";
import useZenuiStore from "@/Store/Index.ts";

const NotFoundPage = () => {
    const setSearchOpen = useZenuiStore((state) => state.setSearchOpen);

    return (
        <SiteLayout>
            <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
                <p className="font-mono text-[0.8rem] text-ink-subtle">404</p>
                <h1 className="mt-3 text-[2.4rem] font-semibold tracking-display text-ink 640px:text-[3rem]">Page not found</h1>
                <p className="mt-3 max-w-[44ch] text-[1rem] text-ink-muted">
                    The page may have moved when the docs were reorganized. Search for it, or head back home.
                </p>
                <div className="mt-8 flex flex-col gap-3 425px:flex-row">
                    <button onClick={() => setSearchOpen(true)} className="btn-primary h-11 px-5">
                        <LuSearch className="size-4"/> Search the docs
                    </button>
                    <Link to="/" className="btn-ghost h-11 px-5">
                        <LuArrowLeft className="size-4"/> Back home
                    </Link>
                </div>
            </div>
            <Helmet>
                <title>Page not found | ZenUI Library</title>
            </Helmet>
        </SiteLayout>
    );
};

export default NotFoundPage;

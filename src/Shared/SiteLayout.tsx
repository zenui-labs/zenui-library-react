import type {ReactNode} from "react";
import Navbar from "@/Components/Home/Navbar.tsx";
import Footer from "@/Components/Home/Footer.tsx";

/** Shell for pages outside the docs: navbar, content, footer. */
const SiteLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar/>
            <main className="flex-1">{children}</main>
            <Footer/>
        </div>
    );
};

export default SiteLayout;

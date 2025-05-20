import {useContext, useEffect, useRef} from "react";
import Content from "./Content";
import {MenuContext} from "@/Context/MenuContext.jsx";

const Sidebar = () => {
    const sidebarRef = useRef(null);
    const {scrollY, setScrollY} = useContext(MenuContext)
    useEffect(() => {
        const ele = sidebarRef.current;
        const scrollHandler = () => {
            setScrollY(ele.scrollTop)
        };
        ele.addEventListener("scroll", scrollHandler);
        return () => ele.removeEventListener("scroll", scrollHandler);
    }, [setScrollY])

    useEffect(() => {
        if (sidebarRef && sidebarRef.current) {
            sidebarRef.current.style.scrollBehavior = "auto";
            sidebarRef.current.scrollTop = scrollY;
            sidebarRef.current.style.scrollBehavior = "smooth";
        }
    }, [])
    return (
        <aside
            ref={sidebarRef}
            className="py-6 px-10 dark:bg-transparent transition-all duration-500 pr-7 dark:border-darkBorderColor border-r h-[calc(100vh-76px)] border-border flex-col gap-4 overflow-y-scroll sticky top-18 left-0 w-[320px] bg-secondary z-20 1024px:flex hidden"
        >
            <Content/>
        </aside>
    );
};

export default Sidebar;

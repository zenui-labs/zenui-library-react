import {useContext, useEffect, useRef} from "react";
import Content from "./Content";
import {MenuContext} from "@/Context/MenuContext.tsx";

const Sidebar = () => {
    const sidebarRef = useRef(null);
    const {scrollY, setScrollY} = useContext(MenuContext);

    // Each docs page mounts its own sidebar, so keep the scroll position between pages.
    useEffect(() => {
        const element = sidebarRef.current;
        element.scrollTop = scrollY;

        const active = element.querySelector('[data-sidebar-link][aria-current="page"]');
        if (active) {
            const {top, bottom} = active.getBoundingClientRect();
            const box = element.getBoundingClientRect();
            if (top < box.top + 48 || bottom > box.bottom - 24) active.scrollIntoView({block: "center"});
        }

        const onScroll = () => setScrollY(element.scrollTop);
        element.addEventListener("scroll", onScroll, {passive: true});
        return () => element.removeEventListener("scroll", onScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <aside
            ref={sidebarRef}
            className="scroll-thin sticky top-[60px] hidden h-[calc(100dvh-60px)] w-[264px] shrink-0 overflow-y-auto overscroll-contain border-r border-hairline pb-6 pl-5 pr-4 1024px:block"
        >
            <Content/>
        </aside>
    );
};

export default Sidebar;

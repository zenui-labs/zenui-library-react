import {useLayoutEffect} from "react";
import {useLocation} from "react-router-dom";

/**
 * Every page opens at the top: after a link, back or forward, or a reload. The browser's own scroll restoration is
 * turned off, because it would jump back down once a page's content finished loading. In-page `#hash` links only
 * change the hash, so they keep scrolling to their section.
 */
const useScrollToTop = () => {
    const {pathname} = useLocation();

    useLayoutEffect(() => {
        if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    }, []);

    useLayoutEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: "instant"});
    }, [pathname]);
};

export default useScrollToTop;

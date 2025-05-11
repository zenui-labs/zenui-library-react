import React, {useState, useEffect, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {routes} from "./Routes/RouteConfig.js";
import {MenuProvider} from "./Context/MenuContext.jsx";
import usePageTracking from "./CustomHooks/usePageTracking.js";
import FallbackLoader from "@shared/FallbackLoader.jsx";

const CookieModal = React.lazy(() => import("./Shared/CookieModal.jsx"));

const App = () => {
    const [isCookie, setIsCookie] = useState(false);

    usePageTracking();

    useEffect(() => {
        const originalTitle = document.title;

        const handleBlur = () => (document.title = "Get more components 😍");
        const handleFocus = () => (document.title = originalTitle);

        window.addEventListener("blur", handleBlur);
        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("focus", handleFocus);
        };
    }, []);

    useEffect(() => {
        const widget = document.querySelector('#replicate-widget-container');

        if (widget && widget.shadowRoot) {
            const shadowRoot = widget.shadowRoot;
            const style = document.createElement('style');
            style.textContent = `
                #feedbackWidget {
                    z-index: 1000 !important;
                }
                .eGjSGs {
                    background-color: #0FABCA !important;
                }
            `;
            shadowRoot.appendChild(style);
        }
    }, []);

    return (
        <Suspense fallback={<FallbackLoader/>}>
            <MenuProvider>
                <Routes>
                    {routes.map((route) => {

                        const LazyComponent = route.component;

                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<LazyComponent/>}
                            />
                        );
                    })}
                </Routes>

                <CookieModal isModalOpen={isCookie} setisModalOpen={setIsCookie}/>
            </MenuProvider>
        </Suspense>
    );
};

export default App;
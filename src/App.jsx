import React, {Suspense, useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {routes} from "./Routes/RouteConfig.js";
import {MenuProvider} from "./Context/MenuContext.jsx";
import usePageTracking from "./CustomHooks/usePageTracking.js";
import FallbackLoader from "@shared/FallbackLoader.jsx";
import ShortcutCheatsheetModal from "@shared/ShortcutCheatsheetModal.jsx";
import {useZenUIShortcuts} from "@/CustomHooks/useZenUIShortcut.js";
import ShortcutHintModal from "@shared/ShortcutHintModal.jsx";
import ReadmeStudioAds from "@shared/ReadmeStudioAds.jsx";
import DonationButton from "@shared/DonationButton.jsx";

const CookieModal = React.lazy(() => import("./Shared/CookieModal.jsx"));

const App = () => {
    const [isCookie, setIsCookie] = useState(false);
    const [isShortcutCheatsheetOpen, setIsShortcutCheatsheetOpen] = useState(false);
    const [isHintModalOpen, setIsHintModalOpen] = useState(false)

    usePageTracking();
    useZenUIShortcuts()

    useEffect(() => {
        const handleKeydown = (e) => {
            const isOnlySpace =
                e.code === "Space" &&
                !e.altKey &&
                !e.ctrlKey &&
                !e.metaKey &&
                e.shiftKey;

            if (isOnlySpace) {
                e.preventDefault();
                setIsShortcutCheatsheetOpen(true);
                document.querySelector('body').style.overflow = "hidden";
            }

            if (e.key === "Escape") {
                setIsShortcutCheatsheetOpen(false);
                document.querySelector('body').style.overflow = "auto";
            }
        };

        document.addEventListener("keydown", handleKeydown);
        return () => document.removeEventListener("keydown", handleKeydown);
    }, []);

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
        setIsHintModalOpen(true)

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

                {
                    isHintModalOpen && <ShortcutHintModal setIsOpen={setIsHintModalOpen}/>
                }
                <CookieModal isModalOpen={isCookie} setisModalOpen={setIsCookie}/>
                <ReadmeStudioAds/>
                <DonationButton/>
                <ShortcutCheatsheetModal isOpen={isShortcutCheatsheetOpen} setIsOpen={setIsShortcutCheatsheetOpen}/>
            </MenuProvider>
        </Suspense>
    );
};

export default App;
import React, {Suspense, useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {AnimatePresence, MotionConfig} from "framer-motion";
import {routes} from "./Routes/RouteConfig.ts";
import {MenuProvider} from "./Context/MenuContext.tsx";
import usePageTracking from "./CustomHooks/usePageTracking.ts";
import FallbackLoader from "@shared/FallbackLoader.tsx";
import ShortcutCheatsheetModal from "@shared/ShortcutCheatsheetModal.tsx";
import {useZenUIShortcuts} from "@/CustomHooks/useZenUIShortcut.ts";
import ShortcutHintModal from "@shared/ShortcutHintModal.tsx";
import DonationButton from "@shared/DonationButton.tsx";
import Search from "@/Components/Home/Search.tsx";
import useZenuiStore from "@/Store/Index.ts";
import {isEmbed} from "@/Helpers/embed.ts";

const CookieModal = React.lazy(() => import("./Shared/CookieModal.tsx"));

const HINT_KEY = "zenuiShortcutHintSeen";

const App = () => {
    const [isCookie, setIsCookie] = useState(false);
    const [isHintOpen, setIsHintOpen] = useState(false);
    const {shortcutsOpen, setShortcutsOpen} = useZenuiStore();

    usePageTracking();
    useZenUIShortcuts();

    // Shift + Space opens the shortcut sheet.
    useEffect(() => {
        const onKeyDown = (event) => {
            const typing = /^(input|textarea|select)$/i.test(event.target.tagName) || event.target.isContentEditable;
            if (event.code === "Space" && event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey && !typing) {
                event.preventDefault();
                setShortcutsOpen(true);
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [setShortcutsOpen]);

    // Show the shortcut hint once per browser.
    useEffect(() => {
        if (isEmbed) return;
        try {
            if (localStorage.getItem(HINT_KEY)) return;
        } catch {
            return;
        }
        const timer = setTimeout(() => setIsHintOpen(true), 2500);
        return () => clearTimeout(timer);
    }, []);

    const closeHint = () => {
        setIsHintOpen(false);
        try {
            localStorage.setItem(HINT_KEY, "1");
        } catch { /* storage blocked */ }
    };

    return (
        <MotionConfig reducedMotion="user">
            <MenuProvider>
                {/* Only routes suspend, so global overlays keep running while a page loads. */}
                <Suspense fallback={<FallbackLoader/>}>
                    <Routes>
                        {routes.map((route) => {
                            const LazyComponent = route.component;
                            return <Route key={route.path} path={route.path} element={<LazyComponent/>}/>;
                        })}
                    </Routes>
                </Suspense>

                {/* An embedded preview shows only the example, without site overlays. */}
                {!isEmbed && (
                <>
                <Search/>
                <AnimatePresence>
                    {isHintOpen && (
                        <ShortcutHintModal
                            setIsOpen={closeHint}
                            onOpenSheet={() => {
                                closeHint();
                                setShortcutsOpen(true);
                            }}
                        />
                    )}
                </AnimatePresence>
                <Suspense fallback={null}>
                    <CookieModal isModalOpen={isCookie} setisModalOpen={setIsCookie}/>
                </Suspense>
                <DonationButton/>
                <ShortcutCheatsheetModal isOpen={shortcutsOpen} setIsOpen={setShortcutsOpen}/>
                </>
                )}
            </MenuProvider>
        </MotionConfig>
    );
};

export default App;

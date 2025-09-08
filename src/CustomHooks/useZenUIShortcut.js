import {useEffect, useRef} from "react";
import useZenuiStore from "../Store";

export function useZenUIShortcuts() {
    const zTriggered = useRef(false);
    const timeout = useRef(null);

    const {toggleTheme} = useZenuiStore()

    const defaultActions = {
        t: () => toggleTheme(),
        h: () => navigateTo("/"),
        m: () => navigateTo("/templates"),
        c: () => navigateTo("/components/all-components"),
        b: () => navigateTo("/blocks/all-blocks"),
        a: () => navigateTo("/animations/installation"),
        r: () => navigateTo("/docs/resources"),
        i: () => navigateTo("/docs/installation"),
        k: () => navigateTo("/custom-hooks"),
        g: () => navigateTo("/config-generator"),
        p: () => navigateTo("/color-palette"),
        o: () => navigateTo("/icons"),
        s: () => navigateTo("/shortcut-generator"),
        n: () => window.open("https://www.npmjs.com/package/zenui-image-react", "_blank"),
    };

    useEffect(() => {
        const handler = (e) => {
            if (e.altKey && e.key.toLowerCase() === "z") {
                zTriggered.current = true;
                if (timeout.current) clearTimeout(timeout.current);
                timeout.current = setTimeout(() => {
                    zTriggered.current = false;
                }, 1000);
                return;
            }

            if (zTriggered.current) {
                const key = e.key.toLowerCase();
                const allActions = {...defaultActions};
                const action = allActions[key];
                if (action) {
                    e.preventDefault();
                    action();
                }
                zTriggered.current = false;
                if (timeout.current) clearTimeout(timeout.current);
            }
        };

        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);
}

function navigateTo(path) {
    window.location.href = path;
}

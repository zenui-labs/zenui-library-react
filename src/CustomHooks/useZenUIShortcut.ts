import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import useZenuiStore from "@/Store/Index.ts";
import {isEmbed} from "@/Helpers/embed.ts";

// Alt + Z, then one of these keys within a second.
const routes = {
    h: "/",
    m: "/templates",
    c: "/components/all-components",
    b: "/blocks/all-blocks",
    a: "/animations/installation",
    r: "/docs/resources",
    i: "/docs/installation",
    g: "/config-generator",
    p: "/color-palette",
    o: "/icons",
    s: "/shortcut-generator",
};

export function useZenUIShortcuts() {
    const armed = useRef(false);
    const timeout = useRef(null);
    const navigate = useNavigate();
    const toggleTheme = useZenuiStore((state) => state.toggleTheme);

    useEffect(() => {
        if (isEmbed) return;
        const handler = (event: KeyboardEvent) => {
            // event.code keeps working when Alt changes the typed character (macOS).
            if (event.altKey && event.code === "KeyZ") {
                event.preventDefault();
                armed.current = true;
                clearTimeout(timeout.current);
                timeout.current = setTimeout(() => (armed.current = false), 1000);
                return;
            }
            if (!armed.current) return;

            armed.current = false;
            clearTimeout(timeout.current);
            const key = event.code.replace("Key", "").toLowerCase();

            if (key === "t") {
                event.preventDefault();
                toggleTheme();
            } else if (key === "n") {
                event.preventDefault();
                window.open("https://www.npmjs.com/package/zenui-image-react", "_blank", "noopener");
            } else if (routes[key]) {
                event.preventDefault();
                navigate(routes[key]);
            }
        };

        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [navigate, toggleTheme]);
}

import {flushSync} from "react-dom";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const prefersReducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Run a DOM/state update behind a circular reveal that grows from (x, y).
 * `element` limits the reveal to that element; without it the whole page is revealed.
 * Falls back to a plain update when the View Transitions API is missing.
 */
interface RevealOptions {
    x?: number;
    y?: number;
    element?: HTMLElement | null;
}

export function circularReveal(update: () => void, {x, y, element}: RevealOptions = {}) {
    if (typeof document === "undefined" || !document.startViewTransition || prefersReducedMotion()) {
        update();
        return;
    }

    const rect = element ? element.getBoundingClientRect() : {left: 0, top: 0, width: innerWidth, height: innerHeight};
    const cx = (x ?? rect.left + rect.width / 2) - rect.left;
    const cy = (y ?? rect.top) - rect.top;
    const radius = Math.hypot(Math.max(cx, rect.width - cx), Math.max(cy, rect.height - cy));
    const name = element ? "zenui-preview" : "root";

    if (element) element.style.viewTransitionName = name;

    const transition = document.startViewTransition(() => flushSync(update));

    transition.ready.then(() => {
        document.documentElement.animate(
            {clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${radius}px at ${cx}px ${cy}px)`]},
            {duration: element ? 520 : 650, easing: EASE, pseudoElement: `::view-transition-new(${name})`}
        );
    }).catch(() => {});

    transition.finished.finally(() => {
        if (element) element.style.viewTransitionName = "";
    });
}

import {useEffect, useRef} from "react";
import type {PointerEvent} from "react";
import type {IconType} from "react-icons";
import {LuBellRing, LuRefreshCw, LuScrollText, LuShieldCheck} from "react-icons/lu";

interface Feature {
    title: string;
    description: string;
    icon: IconType;
}

const features: Feature[] = [
    {title: "Realtime sync", description: "Changes reach every device in under 200 ms, even on slow networks.", icon: LuRefreshCw},
    {title: "Access control", description: "Give each role the exact permissions it needs, down to a single field.", icon: LuShieldCheck},
    {title: "Audit log", description: "Every change is recorded with who made it, when and from where.", icon: LuScrollText},
    {title: "Usage alerts", description: "Get notified before a workspace reaches its plan limits.", icon: LuBellRing},
];

// One pointer listener on the grid moves a soft light across every card.
// Positions are written to CSS variables, so React never re-renders while the pointer moves.
const SpotlightGrid = () => {
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const frameRef = useRef<number | null>(null);

    useEffect(() => () => {
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    }, []);

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const {clientX, clientY} = event;
        if (frameRef.current !== null) return;

        frameRef.current = requestAnimationFrame(() => {
            frameRef.current = null;
            const cards = cardsRef.current.filter((card): card is HTMLDivElement => card !== null);
            // Read every rect first, then write, to avoid forcing layout between cards.
            const rects = cards.map((card) => card.getBoundingClientRect());
            cards.forEach((card, index) => {
                card.style.setProperty("--x", `${clientX - rects[index].left}px`);
                card.style.setProperty("--y", `${clientY - rects[index].top}px`);
            });
        });
    };

    return (
        <div
            onPointerMove={handlePointerMove}
            className="group grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2"
        >
            {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                    <div
                        key={feature.title}
                        ref={(element) => {
                            cardsRef.current[index] = element;
                        }}
                        className="relative rounded-2xl bg-gray-200 p-px dark:bg-slate-800"
                    >
                        {/* Border glow: sits under the card body and shows through the 1px gap. */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(260px_circle_at_var(--x)_var(--y),rgba(99,102,241,0.7),transparent_65%)] dark:bg-[radial-gradient(260px_circle_at_var(--x)_var(--y),rgba(129,140,248,0.8),transparent_65%)]"
                        />
                        <div className="relative h-full overflow-hidden rounded-[15px] bg-white p-6 dark:bg-slate-950">
                            {/* Inner light that follows the pointer. */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(360px_circle_at_var(--x)_var(--y),rgba(99,102,241,0.08),transparent_70%)] dark:bg-[radial-gradient(360px_circle_at_var(--x)_var(--y),rgba(129,140,248,0.12),transparent_70%)]"
                            />
                            <div className="relative">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-indigo-400">
                                    <Icon className="h-5 w-5" aria-hidden="true"/>
                                </span>
                                <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                                <p className="mt-1.5 text-sm leading-6 text-gray-600 dark:text-slate-400">{feature.description}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SpotlightGrid;

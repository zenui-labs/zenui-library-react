import {useCallback, useEffect, useRef, useState} from "react";
import type {ReactNode} from "react";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import {cn} from "@utils/Style.ts";

const FADE = "48px";

/**
 * Horizontal row that scrolls by touch, trackpad, mouse drag and arrow buttons.
 * Edges fade out only on the sides that have more content, and the matching arrow appears there.
 */
const ScrollRow = ({children, className, label}: {children: ReactNode; className?: string; label: string}) => {
    const ref = useRef(null);
    const drag = useRef(null);
    const [edges, setEdges] = useState({start: false, end: false});

    const measure = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        setEdges({
            start: el.scrollLeft > 2,
            end: el.scrollLeft + el.clientWidth < el.scrollWidth - 2,
        });
    }, []);

    useEffect(() => {
        const el = ref.current;
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(el);
        el.addEventListener("scroll", measure, {passive: true});
        return () => {
            observer.disconnect();
            el.removeEventListener("scroll", measure);
        };
    }, [measure]);

    const scrollBy = (direction) => {
        const el = ref.current;
        el.scrollBy({left: direction * el.clientWidth * 0.7, behavior: "smooth"});
    };

    // Mouse drag only; touch and pens already scroll natively.
    const onPointerDown = (event) => {
        if (event.pointerType !== "mouse" || event.button !== 0) return;
        drag.current = {x: event.clientX, left: ref.current.scrollLeft, moved: false};
    };

    const onPointerMove = (event) => {
        if (!drag.current) return;
        const dx = event.clientX - drag.current.x;
        if (!drag.current.moved && Math.abs(dx) < 5) return;
        if (!drag.current.moved) {
            drag.current.moved = true;
            ref.current.setPointerCapture(event.pointerId);
        }
        ref.current.scrollLeft = drag.current.left - dx;
    };

    const endDrag = (event) => {
        if (drag.current?.moved && ref.current.hasPointerCapture(event.pointerId)) {
            ref.current.releasePointerCapture(event.pointerId);
        }
    };

    // A drag should not also click the chip under the pointer.
    const onClickCapture = (event) => {
        if (drag.current?.moved) {
            event.preventDefault();
            event.stopPropagation();
        }
        drag.current = null;
    };

    const mask = `linear-gradient(to right, ${edges.start ? `transparent, black ${FADE}` : "black, black"}, ${edges.end ? `black calc(100% - ${FADE}), transparent` : "black, black"})`;

    return (
        <div className={cn("relative min-w-0", className)}>
            <div
                ref={ref}
                role="toolbar"
                aria-label={label}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onClickCapture={onClickCapture}
                style={{maskImage: mask, WebkitMaskImage: mask}}
                className="scroll-none flex select-none gap-1.5 overflow-x-auto overscroll-x-contain [&>*]:shrink-0"
            >
                {children}
            </div>

            {[
                {side: "start", direction: -1, icon: LuChevronLeft, position: "left-0"},
                {side: "end", direction: 1, icon: LuChevronRight, position: "right-0"},
            ].map(({side, direction, icon: Icon, position}) => (
                <button
                    key={side}
                    type="button"
                    tabIndex={-1}
                    aria-hidden={!edges[side]}
                    onClick={() => scrollBy(direction)}
                    className={cn(
                        "absolute top-1/2 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-surface text-ink-muted shadow-card transition-opacity duration-200 hover:text-ink 640px:flex",
                        position,
                        edges[side] ? "opacity-100" : "pointer-events-none opacity-0"
                    )}
                    aria-label={direction < 0 ? "Scroll left" : "Scroll right"}
                >
                    <Icon className="size-4"/>
                </button>
            ))}
        </div>
    );
};

export default ScrollRow;

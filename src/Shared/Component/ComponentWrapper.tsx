import {useCallback, useId, useLayoutEffect, useRef, useState} from 'react';
import type {MouseEvent, ReactNode} from "react";
import {createPortal} from "react-dom";
import type {IconType} from "react-icons";
import {motion} from "framer-motion";
import {LuGrid, LuMaximize2, LuMonitor, LuMoon, LuRotateCcw, LuSquare, LuSun} from "react-icons/lu";
import {RxDotsHorizontal} from "react-icons/rx";

import useZenuiStore, {type PreviewPattern} from "@/Store/Index.ts";
import {circularReveal} from "@/Helpers/viewTransition.ts";
import {embedIndex, isEmbed} from "@/Helpers/embed.ts";
import ResponsivePreview from "./ResponsivePreview.tsx";
import {cn} from "@utils/Style.ts";

type PreviewMode = "auto" | "light" | "dark";

const themeOptions: SegmentedOption<PreviewMode>[] = [
    {id: "auto", label: "Auto", icon: LuMonitor, hint: "Follow the site theme"},
    {id: "light", label: "Light", icon: LuSun, hint: "Preview in light mode"},
    {id: "dark", label: "Dark", icon: LuMoon, hint: "Preview in dark mode"},
];

const patternOptions: SegmentedOption<PreviewPattern>[] = [
    {id: "plain", icon: LuSquare, label: "Plain background"},
    {id: "dots", icon: RxDotsHorizontal, label: "Dot background"},
    {id: "grid", icon: LuGrid, label: "Grid background"},
];

interface SegmentedOption<T extends string> {
    id: T;
    label: string;
    hint?: string;
    icon: IconType;
}

interface SegmentedProps<T extends string> {
    options: SegmentedOption<T>[];
    value: T;
    onChange: (value: T, event: MouseEvent<HTMLButtonElement>) => void;
    layoutId: string;
    showLabels?: boolean;
}

const Segmented = <T extends string>({options, value, onChange, layoutId, showLabels = false}: SegmentedProps<T>) => (
    <div role="radiogroup" className="flex items-center rounded-lg border border-hairline bg-canvas p-0.5">
        {options.map((option) => {
            const active = option.id === value;
            return (
                <button
                    key={option.id}
                    role="radio"
                    aria-checked={active}
                    aria-label={option.hint ?? option.label}
                    title={option.hint ?? option.label}
                    onClick={(event) => onChange(option.id, event)}
                    className={cn(
                        "relative flex h-7 items-center gap-1.5 rounded-md px-2 text-[0.75rem] font-medium transition-colors",
                        active ? "text-ink" : "text-ink-subtle hover:text-ink-muted"
                    )}
                >
                    {active && (
                        <motion.span
                            layoutId={layoutId}
                            className="absolute inset-0 rounded-md border border-hairline bg-surface shadow-card"
                            transition={{type: "spring", stiffness: 520, damping: 38}}
                        />
                    )}
                    <option.icon className="relative size-3.5"/>
                    {showLabels && <span className="relative hidden 640px:inline">{option.label}</span>}
                </button>
            );
        })}
    </div>
);

const frameIndex = (frame: Element | null) => (frame ? [...document.querySelectorAll(".zp-frame")].indexOf(frame) : -1);

/** Text of the closest heading above the frame, used to label the fullscreen preview. */
const headingBefore = (frame: HTMLElement) => {
    const headings = [...document.querySelectorAll<HTMLElement>(".docs-page h1, .docs-page h2")];
    const before = headings.filter((heading) => heading.compareDocumentPosition(frame) & Node.DOCUMENT_POSITION_FOLLOWING);
    return before.at(-1)?.textContent?.replace(/#$/, "").trim() || "Preview";
};

/**
 * Embed mode (inside the responsive preview iframe): the page stays hidden and only the requested frame
 * renders its example, straight into <body>, so it gets the whole viewport. See Helpers/embed.ts.
 */
const EmbeddedFrame = ({children}: {children: ReactNode}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isTarget, setIsTarget] = useState(false);
    const pattern = useZenuiStore((state) => state.previewPattern);

    // Frames can appear later (lazy examples), so check on every render; React skips equal updates.
    useLayoutEffect(() => {
        setIsTarget(frameIndex(ref.current) === embedIndex);
    });

    return (
        <div ref={ref} className="zp-frame">
            {isTarget && createPortal(
                // Short examples sit in the middle of the viewport; tall ones (blocks) grow and scroll.
                <div data-bg={pattern} className="zp-stage flex min-h-screen flex-col justify-center [&>*]:w-full">{children}</div>,
                document.body
            )}
        </div>
    );
};

/**
 * Frame around a component example. Each frame can force its own theme (independent of the site),
 * switch the background pattern, replay the example, and open it full screen with a resizable width.
 */
const ComponentWrapper = ({children}: {children: ReactNode}) =>
    isEmbed ? <EmbeddedFrame>{children}</EmbeddedFrame> : <InteractiveFrame>{children}</InteractiveFrame>;

const InteractiveFrame = ({children}: {children: ReactNode}) => {
    const id = useId();
    const frameRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const [fullscreen, setFullscreen] = useState<{index: number; title: string} | null>(null);
    const closeFullscreen = useCallback(() => setFullscreen(null), []);
    const [mode, setMode] = useState<PreviewMode>("auto");
    const [replayKey, setReplayKey] = useState(0);
    const siteTheme = useZenuiStore((state) => state.theme);
    const pattern = useZenuiStore((state) => state.previewPattern);
    const setPattern = useZenuiStore((state) => state.setPreviewPattern);

    const resolved = mode === "auto" ? siteTheme : mode;

    const changeMode = (next: PreviewMode, event: MouseEvent<HTMLButtonElement>) => {
        if (next === mode) return;
        const nextResolved = next === "auto" ? siteTheme : next;
        const update = () => setMode(next);
        if (nextResolved === resolved) return update();
        circularReveal(update, {x: event.clientX, y: event.clientY, element: stageRef.current});
    };

    return (
        <div ref={frameRef} className="zp-frame mt-3 w-full rounded-panel border border-hairline bg-surface shadow-card">
            <div className="zp-toolbar flex h-11 items-center justify-between gap-2 rounded-t-panel border-b border-hairline px-2">
                <Segmented options={themeOptions} value={mode} onChange={changeMode} layoutId={`${id}-theme`} showLabels/>

                <div className="flex items-center gap-1.5">
                    <span className="hidden text-[0.75rem] font-medium capitalize text-ink-subtle 768px:inline">
                        {resolved}
                    </span>
                    <Segmented options={patternOptions} value={pattern} onChange={setPattern} layoutId={`${id}-pattern`}/>
                    <button
                        onClick={() => setReplayKey((key) => key + 1)}
                        className="flex size-8 items-center justify-center rounded-lg text-ink-subtle transition-colors hover:bg-raised hover:text-ink"
                        aria-label="Replay example"
                        title="Replay example"
                    >
                        <LuRotateCcw className="size-3.5"/>
                    </button>
                    <button
                        onClick={() => {
                            const frame = frameRef.current;
                            if (frame) setFullscreen({index: frameIndex(frame), title: headingBefore(frame)});
                        }}
                        className="flex size-8 items-center justify-center rounded-lg text-ink-subtle transition-colors hover:bg-raised hover:text-ink"
                        aria-label="Open full screen with resizable width"
                        title="Full screen and responsive preview"
                    >
                        <LuMaximize2 className="size-3.5"/>
                    </button>
                </div>
            </div>

            <div ref={stageRef} data-bg={pattern} className={cn("zp-stage relative rounded-b-panel [&:first-child]:rounded-t-panel", mode !== "auto" && mode)}>
                <div key={replayKey} className="animate-fade-up">
                    {children}
                </div>
            </div>

            <ResponsivePreview
                open={fullscreen !== null}
                onClose={closeFullscreen}
                index={fullscreen?.index ?? 0}
                title={fullscreen?.title ?? ""}
                theme={resolved}
                pattern={pattern}
            />
        </div>
    );
};

export default ComponentWrapper;

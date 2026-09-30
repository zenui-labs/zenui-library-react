import type {CSSProperties} from "react";
import {LuCheck, LuChevronDown, LuChevronLeft, LuChevronRight, LuFile, LuFolder, LuFolderOpen, LuHome, LuPlus, LuSearch, LuStar, LuX} from "react-icons/lu";
import {Button, Dot, EASE, Heading, Line, Panel, Scene} from "../ArtKit.tsx";
import type {Art} from "../ArtKit.tsx";
import {cn} from "@utils/Style.ts";

// A placeholder photo: a flat sky, a sun and two hills. `tint` paints it in the accent.
const Photo = ({className, tint = false}: {className?: string; tint?: boolean}) => (
    <span className={cn("relative block overflow-hidden", tint ? "bg-accent/15" : "bg-ink/[0.07]", className)}>
        <span className={cn("absolute left-[22%] top-[20%] size-2 rounded-full", tint ? "bg-accent/60" : "bg-ink/15")}/>
        <svg viewBox="0 0 60 30" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[58%] w-full">
            <path d="M0 30V18l14-10 12 9 10-7 24 14v6z" className={tint ? "fill-accent/35" : "fill-ink/[0.12]"}/>
            <path d="M0 30V24l20-9 18 8 22-6v13z" className={tint ? "fill-accent/60" : "fill-ink/[0.18]"}/>
        </svg>
    </span>
);

// A five-point star for the rating row.
const Star = ({className}: {className?: string}) => (
    <svg viewBox="0 0 24 24" className={cn("size-5 shrink-0", className)}>
        <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/>
    </svg>
);

/* ------------------------------------------------------------------ Surfaces */

// A two-column board. The lifted card carries across into the other column's drop slot on hover.
const DragAndDrop: Art = () => (
    <Scene>
        <div className="relative flex gap-3">
            {[0, 1].map((column) => (
                <div key={column} className="flex w-[70px] flex-col gap-1.5 rounded-lg bg-ink/[0.04] p-1.5 ring-1 ring-hairline">
                    <Line className={cn("mb-0.5 bg-ink/30", column === 0 ? "w-8" : "w-10")}/>
                    <Panel className="flex h-[22px] items-center rounded-md px-1.5"><Line className="w-10"/></Panel>
                    <span
                        className={cn(
                            "h-[22px] rounded-md border border-dashed transition-[opacity,background-color] duration-500",
                            column === 0 ? "border-ink/15" : cn("border-accent/70 bg-accent/0 opacity-40 group-hover:bg-accent/10 group-hover:opacity-100", EASE)
                        )}
                    />
                    <Panel className="flex h-[22px] items-center rounded-md px-1.5"><Line className={column === 0 ? "w-7" : "w-11"}/></Panel>
                </div>
            ))}
            <Panel
                className={cn(
                    "absolute left-1.5 top-[47px] flex h-[22px] w-[58px] items-center gap-1.5 rounded-md px-1.5 shadow-float transition-transform duration-700 motion-reduce:transition-none",
                    "-translate-y-1 translate-x-1 -rotate-[5deg] group-hover:translate-x-[82px] group-hover:translate-y-0 group-hover:rotate-0",
                    EASE
                )}
            >
                <span className="h-3 w-[3px] rounded-full bg-accent"/>
                <Line className="w-8 bg-ink/30"/>
            </Panel>
        </div>
    </Scene>
);

// A before/after image split by a draggable divider. The divider slides to reveal more of the "after" on hover.
const ComparisonCard: Art = () => (
    <Scene>
        <div className="relative h-[98px] w-[168px] overflow-hidden rounded-lg ring-1 ring-hairline">
            <Photo tint className="absolute inset-0"/>
            <div className={cn("absolute inset-y-0 left-0 w-1/2 overflow-hidden transition-[width] duration-700 group-hover:w-[26%] motion-reduce:transition-none", EASE)}>
                <Photo className="absolute inset-y-0 left-0 w-[168px] bg-raised grayscale"/>
            </div>
            <span className="absolute left-1.5 top-1.5 h-2.5 w-7 rounded-sm bg-ink/40 opacity-70"/>
            <span className="absolute right-1.5 top-1.5 h-2.5 w-6 rounded-sm bg-accent/70"/>
            <div className={cn("absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white shadow-card transition-[left] duration-700 group-hover:left-[26%] motion-reduce:transition-none", EASE)}>
                <span className="absolute left-1/2 top-1/2 flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-surface text-accent shadow-float">
                    <LuChevronLeft className="-mr-1 size-2.5"/>
                    <LuChevronRight className="-ml-1 size-2.5"/>
                </span>
            </div>
        </div>
    </Scene>
);

// A small hand of content cards. They fan out further on hover.
const Cards: Art = () => (
    <Scene>
        <div className="relative h-[92px] w-[68px]">
            {[
                "-translate-x-[26px] -rotate-[9deg] group-hover:-translate-x-[54px] group-hover:-rotate-[5deg]",
                "translate-x-[26px] rotate-[9deg] group-hover:translate-x-[54px] group-hover:rotate-[5deg]",
                "z-10 group-hover:-translate-y-1.5",
            ].map((pose, index) => (
                <Panel
                    key={pose}
                    className={cn("absolute inset-0 overflow-hidden p-1.5 transition-transform duration-500 motion-reduce:transition-none", index === 2 && "shadow-float", pose, EASE)}
                >
                    <Photo className="h-9 rounded-md"/>
                    <Heading className="mt-2 w-10 bg-ink/35"/>
                    <Line className="mt-1.5 w-12"/>
                    {index === 2 ? <span className="mt-2 block h-2.5 w-7 rounded-[4px] bg-accent"/> : <Line className="mt-1.5 w-8"/>}
                </Panel>
            ))}
        </div>
    </Scene>
);

// A page with a cart drawer peeking from the right edge. The drawer slides in over a dimmed page on hover.
const Drawer: Art = () => (
    <Scene>
        <Panel className="relative h-[104px] w-[184px] overflow-hidden">
            <div className="flex h-6 items-center gap-2 border-b border-hairline px-2.5">
                <Dot className="size-2.5 rounded-[4px] bg-ink/40"/>
                <Line className="w-7"/>
                <Line className="w-5"/>
            </div>
            <div className="space-y-1.5 p-2.5">
                <Heading className="w-20 bg-ink/25"/>
                <Line className="w-28"/>
                <Line className="w-24"/>
                <div className="flex gap-1.5 pt-1">
                    <span className="h-7 w-10 rounded-md bg-ink/[0.07]"/>
                    <span className="h-7 w-10 rounded-md bg-ink/[0.07]"/>
                </div>
            </div>
            <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10"/>
            <div
                className={cn(
                    "absolute inset-y-0 right-0 flex w-[76px] translate-x-[62px] flex-col gap-1.5 border-l border-hairline bg-surface p-2 shadow-float transition-transform duration-700 group-hover:translate-x-0 motion-reduce:transition-none",
                    EASE
                )}
            >
                <Heading className="w-9 bg-ink/35"/>
                {[0, 1].map((item) => (
                    <div key={item} className="flex items-center gap-1.5">
                        <span className="size-4 shrink-0 rounded bg-ink/10"/>
                        <div className="space-y-1"><Line className="w-8"/><Line className="w-5"/></div>
                    </div>
                ))}
                <Button accent className="mt-auto h-4 w-full"/>
            </div>
        </Panel>
    </Scene>
);

// A card with an accent circle tucked in its corner. The circle floods the whole card on hover.
const AnimatedCards: Art = () => (
    <Scene>
        <Panel className="relative h-[92px] w-[134px] overflow-hidden p-3">
            <span className={cn("absolute -bottom-5 -right-5 size-12 rounded-full bg-accent transition-transform duration-700 group-hover:scale-[7] motion-reduce:transition-none", EASE)}/>
            <div className="relative space-y-2">
                <span className="block size-5 rounded-md bg-ink/10 transition-colors duration-500 group-hover:bg-white/30 dark:group-hover:bg-[#04151a]/20"/>
                <Heading className="w-16 transition-colors duration-500 group-hover:bg-white/90 dark:group-hover:bg-[#04151a]/75"/>
                <Line className="w-20 transition-colors duration-500 group-hover:bg-white/55 dark:group-hover:bg-[#04151a]/40"/>
                <Line className="w-14 transition-colors duration-500 group-hover:bg-white/55 dark:group-hover:bg-[#04151a]/40"/>
            </div>
        </Panel>
    </Scene>
);

// A photo under a crop frame with thirds and handles. The frame slides and reshapes on hover.
const ImageCropper: Art = () => (
    <Scene>
        <Panel className="w-[172px] p-1.5">
            <div className="relative h-[80px] overflow-hidden rounded-md">
                <Photo className="absolute inset-0"/>
                <div
                    className={cn(
                        "absolute left-[16%] top-[14%] h-[64%] w-[42%] border border-accent shadow-[0_0_0_999px_rgb(0_0_0/0.38)] transition-[left,top,width,height] duration-700 motion-reduce:transition-none",
                        "group-hover:left-[40%] group-hover:top-[22%] group-hover:h-[60%] group-hover:w-[46%]",
                        EASE
                    )}
                >
                    <span className="absolute inset-y-0 left-1/3 w-px bg-white/40"/>
                    <span className="absolute inset-y-0 left-2/3 w-px bg-white/40"/>
                    <span className="absolute inset-x-0 top-1/3 h-px bg-white/40"/>
                    <span className="absolute inset-x-0 top-2/3 h-px bg-white/40"/>
                    {["-left-[3px] -top-[3px]", "-right-[3px] -top-[3px]", "-bottom-[3px] -left-[3px]", "-bottom-[3px] -right-[3px]"].map((corner) => (
                        <span key={corner} className={cn("absolute size-1.5 rounded-[1px] bg-accent", corner)}/>
                    ))}
                </div>
            </div>
            <div className="mt-1.5 flex items-center justify-end gap-1.5">
                <Button className="h-4 px-2"/>
                <Button accent className="h-4 px-2"/>
            </div>
        </Panel>
    </Scene>
);

// Three accordion rows. On hover the open row folds shut while the next one unfolds.
const According: Art = () => (
    <Scene>
        <div className="flex w-[168px] flex-col gap-1.5">
            {[0, 1, 2].map((row) => (
                <Panel key={row} className="rounded-md px-2.5">
                    <div className="flex h-5 items-center justify-between">
                        <Line className={cn("bg-ink/30", ["w-16", "w-20", "w-12"][row])}/>
                        <LuChevronDown
                            className={cn(
                                "size-3 transition-[transform,color] duration-500 motion-reduce:transition-none",
                                row === 0 && "rotate-180 text-accent group-hover:rotate-0 group-hover:text-ink/40",
                                row === 1 && "text-ink/40 group-hover:rotate-180 group-hover:text-accent",
                                row === 2 && "text-ink/40",
                                EASE
                            )}
                        />
                    </div>
                    {row < 2 && (
                        <div
                            className={cn(
                                "grid transition-[grid-template-rows] duration-500 motion-reduce:transition-none",
                                row === 0 ? "grid-rows-[1fr] group-hover:grid-rows-[0fr]" : "grid-rows-[0fr] group-hover:grid-rows-[1fr]",
                                EASE
                            )}
                        >
                            <div className="overflow-hidden">
                                <div className="space-y-1.5 pb-2">
                                    <Line className="w-32"/>
                                    <Line className="w-24"/>
                                </div>
                            </div>
                        </div>
                    )}
                </Panel>
            ))}
        </div>
    </Scene>
);

// A page topped by an app bar with nav, search, bell and avatar. The search field widens and focuses on hover.
const Appbar: Art = () => (
    <Scene>
        <Panel className="h-[100px] w-[188px] overflow-hidden">
            <div className="flex h-7 items-center gap-2 border-b border-hairline bg-raised px-2.5">
                <span className="size-3 shrink-0 rounded-[4px] bg-ink/70"/>
                <Line className="w-5 shrink-0"/>
                <Line className="w-4 shrink-0"/>
                <span className="flex-1"/>
                <span
                    className={cn(
                        "flex h-4 w-9 shrink-0 items-center gap-1 rounded-full border border-hairline-strong bg-surface px-1.5 transition-[width,border-color,box-shadow] duration-500 motion-reduce:transition-none",
                        "group-hover:w-[64px] group-hover:border-accent group-hover:shadow-[0_0_0_2px_rgb(var(--accent)/0.18)]",
                        EASE
                    )}
                >
                    <LuSearch className="size-2.5 shrink-0 text-ink/40 transition-colors duration-500 group-hover:text-accent"/>
                </span>
                <span className="size-2.5 shrink-0 rounded-full border-[1.5px] border-ink/30"/>
                <Dot className="size-4 bg-ink/20"/>
            </div>
            <div className="space-y-1.5 p-2.5">
                <Heading className="w-24 bg-ink/25"/>
                <Line className="w-32"/>
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <span className="h-6 rounded-md bg-ink/[0.06]"/>
                    <span className="h-6 rounded-md bg-ink/[0.06]"/>
                    <span className="h-6 rounded-md bg-ink/[0.06]"/>
                </div>
            </div>
        </Panel>
    </Scene>
);

// A bento photo grid with a featured tile. The featured photo zooms and its caption slides up on hover.
const ImageGallery: Art = () => (
    <Scene>
        <div className="grid h-[100px] w-[176px] grid-cols-[1.4fr_1fr_1fr] grid-rows-2 gap-1.5">
            <div className="relative row-span-2 overflow-hidden rounded-md ring-1 ring-hairline">
                <Photo className={cn("absolute inset-0 transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none", EASE)}/>
                <div className={cn("absolute inset-x-1 bottom-1 flex translate-y-7 items-center gap-1 rounded bg-surface/90 px-1.5 py-1 shadow-card transition-transform duration-500 group-hover:translate-y-0 motion-reduce:transition-none", EASE)}>
                    <Dot className="size-1.5 bg-accent"/>
                    <Line className="w-8 bg-ink/35"/>
                </div>
            </div>
            <Photo className="rounded-md ring-1 ring-hairline"/>
            <Photo className="rounded-md ring-1 ring-hairline"/>
            <Photo className="col-span-2 rounded-md ring-1 ring-hairline"/>
        </div>
    </Scene>
);

// A slide carousel with peeking neighbours, arrows and dots. The track advances one slide on hover.
const Carousel: Art = () => (
    <Scene>
        <div className="flex flex-col items-center gap-2.5">
            <div className="relative h-[72px] w-[184px]">
                <div className="absolute inset-0 overflow-hidden rounded-md">
                    <div className={cn("absolute inset-y-0 left-0 flex -translate-x-[68px] gap-2 transition-transform duration-700 group-hover:-translate-x-[176px] motion-reduce:transition-none", EASE)}>
                        {[0, 1, 2, 3].map((slide) => (
                            <Photo
                                key={slide}
                                className={cn(
                                    "h-full w-[100px] shrink-0 rounded-md ring-1 ring-hairline transition-[transform,opacity] duration-700",
                                    slide === 1 ? "group-hover:scale-90 group-hover:opacity-50" : slide === 2 ? "scale-90 opacity-50 group-hover:scale-100 group-hover:opacity-100" : "scale-90 opacity-50",
                                    EASE
                                )}
                            />
                        ))}
                    </div>
                </div>
                <span className="absolute -left-1 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-surface text-ink/50 shadow-card">
                    <LuChevronLeft className="size-3"/>
                </span>
                <span className="absolute -right-1 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-surface text-ink/50 shadow-card">
                    <LuChevronRight className="size-3"/>
                </span>
            </div>
            <div className="flex items-center gap-1">
                {[0, 1, 2, 3].map((dot) => (
                    <span
                        key={dot}
                        className={cn(
                            "h-1.5 rounded-full transition-[width,background-color] duration-500",
                            dot === 1 ? "w-4 bg-accent group-hover:w-1.5 group-hover:bg-ink/20" : dot === 2 ? "w-1.5 bg-ink/20 group-hover:w-4 group-hover:bg-accent" : "w-1.5 bg-ink/20",
                            EASE
                        )}
                    />
                ))}
            </div>
        </div>
    </Scene>
);

/* ---------------------------------------------------------------- Navigation */

// A row of page buttons between arrows. The current-page pill slides to the next page on hover.
const Pagination: Art = () => (
    <Scene>
        <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-1">
                <span className="flex size-5 items-center justify-center rounded-md border border-hairline-strong bg-surface text-ink/40"><LuChevronLeft className="size-3"/></span>
                <div className="relative flex gap-1">
                    <span className={cn("absolute left-0 top-0 size-5 translate-x-6 rounded-md bg-accent shadow-card transition-transform duration-500 group-hover:translate-x-12 motion-reduce:transition-none", EASE)}/>
                    {[1, 2, 3, 4, 5].map((page) => (
                        <span
                            key={page}
                            className={cn(
                                "relative flex size-5 items-center justify-center font-mono text-[9px] tabular-nums transition-colors duration-500",
                                page === 2 && "text-white group-hover:text-ink-muted dark:text-[#04151a]",
                                page === 3 && "text-ink-muted group-hover:text-white dark:group-hover:text-[#04151a]",
                                page !== 2 && page !== 3 && "text-ink-muted"
                            )}
                        >
                            {page}
                        </span>
                    ))}
                </div>
                <span className="flex size-5 items-center justify-center rounded-md border border-hairline-strong bg-surface text-ink/40"><LuChevronRight className="size-3"/></span>
            </div>
            <Line className="w-16"/>
        </div>
    </Scene>
);

// Progress bars: one with a floating tooltip, one striped, one thin. They fill further on hover.
const ProgressBar: Art = () => (
    <Scene>
        <div className="flex w-[168px] flex-col gap-3.5 pt-3">
            <div className="h-1.5 rounded-full bg-ink/10">
                <div className={cn("relative h-full w-[42%] rounded-full bg-accent transition-[width] duration-700 group-hover:w-[78%] motion-reduce:transition-none", EASE)}>
                    <span className="absolute -top-[18px] right-0 flex h-3 translate-x-1/2 items-center rounded bg-ink px-1.5 after:absolute after:left-1/2 after:top-full after:-ml-[3px] after:border-[3px] after:border-transparent after:border-t-ink">
                        <span className="block h-[3px] w-3 rounded-full bg-canvas/70"/>
                    </span>
                </div>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-ink/[0.07]">
                <div className={cn("h-full w-[58%] rounded-full bg-[image:repeating-linear-gradient(-45deg,rgb(var(--ink)/0.32)_0_4px,rgb(var(--ink)/0.16)_4px_8px)] transition-[width] delay-75 duration-700 group-hover:w-[90%] motion-reduce:transition-none", EASE)}/>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-1 flex-1 rounded-full bg-ink/10">
                    <div className={cn("h-full w-[30%] rounded-full bg-ink/35 transition-[width] delay-150 duration-700 group-hover:w-[64%] motion-reduce:transition-none", EASE)}/>
                </div>
                <Line className="w-4 bg-ink/25"/>
            </div>
        </div>
    </Scene>
);

// A cluster of chips: avatar, status, icon and removable ones. One chip becomes selected, check and all, on hover.
const Chip: Art = () => (
    <Scene>
        <div className="flex w-[176px] flex-wrap justify-center gap-1.5">
            <span className="flex h-5 items-center gap-1 rounded-full border border-hairline-strong bg-surface pl-0.5 pr-2">
                <Dot className="size-4 bg-ink/20"/>
                <Line className="w-8"/>
            </span>
            <span className="flex h-5 items-center gap-1 rounded-full bg-ink/[0.07] px-2">
                <Dot className="size-1.5 bg-ink/40"/>
                <Line className="w-6"/>
            </span>
            <span className="flex h-5 items-center gap-1 rounded-full border border-hairline-strong bg-surface px-2">
                <LuStar className="size-2.5 text-ink/40"/>
                <Line className="w-5"/>
            </span>
            <span
                className={cn(
                    "flex h-5 items-center rounded-full border border-hairline-strong bg-surface px-2 transition-colors duration-500 group-hover:border-accent group-hover:bg-accent/15",
                    EASE
                )}
            >
                <span className={cn("flex max-w-0 overflow-hidden opacity-0 transition-[max-width,opacity,margin] duration-500 group-hover:mr-1 group-hover:max-w-3 group-hover:opacity-100 motion-reduce:transition-none", EASE)}>
                    <LuCheck className="size-2.5 shrink-0 text-accent"/>
                </span>
                <Line className="w-9 transition-colors duration-500 group-hover:bg-accent/60"/>
            </span>
            <span className="flex h-5 items-center gap-1 rounded-full bg-ink/[0.07] px-2">
                <Line className="w-7"/>
                <LuX className="size-2.5 text-ink/40"/>
            </span>
            <span className="flex h-5 items-center rounded-full border border-dashed border-hairline-strong px-2">
                <Line className="w-5"/>
            </span>
        </div>
    </Scene>
);

// Three rows of logos scrolling in opposite directions behind soft edges. The strip tilts forward on hover.
const Marquee: Art = () => (
    <Scene>
        <div
            className={cn(
                "flex w-[188px] flex-col gap-1.5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)] transition-transform duration-700 group-hover:-rotate-3 group-hover:scale-105 motion-reduce:transition-none",
                EASE
            )}
        >
            {[0, 1, 2].map((row) => (
                <div
                    key={row}
                    style={{"--marquee-duration": `${10 + row * 3}s`} as CSSProperties}
                    className={cn("flex w-max animate-marquee-x motion-reduce:animate-none", row === 1 && "[animation-direction:reverse]")}
                >
                    {[0, 1].map((copy) => (
                        <div key={copy} className="flex gap-1.5 pr-1.5">
                            {[0, 1, 2, 3].map((logo) => (
                                <span key={logo} className="flex h-[22px] items-center gap-1 rounded-md border border-hairline bg-surface px-2">
                                    <Dot className={cn("size-2", row === 1 && logo === 1 ? "bg-accent" : "bg-ink/25")}/>
                                    <Line className={["w-6", "w-8", "w-5", "w-7"][(logo + row) % 4]}/>
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </Scene>
);

// A split-flap countdown: hours, minutes, seconds. The seconds digit rolls down to the next number on hover.
const Timer: Art = () => (
    <Scene className="gap-1.5">
        {[["0", "4"], ["2", "8"], ["3", "7"]].map(([tens, ones], box) => (
            <div key={box} className="flex items-center gap-1.5">
                {box > 0 && (
                    <span className="flex flex-col gap-1.5 pb-3">
                        <Dot className="size-1 bg-ink/30"/>
                        <Dot className="size-1 bg-ink/30"/>
                    </span>
                )}
                <div className="flex flex-col items-center gap-1.5">
                    <Panel className={cn("relative flex h-[44px] w-[42px] items-center justify-center font-mono text-[19px] font-semibold tabular-nums leading-[26px]", box === 2 ? "text-accent" : "text-ink")}>
                        <span className="absolute inset-x-0 top-1/2 h-px bg-hairline"/>
                        <span>{tens}</span>
                        {box === 2 ? (
                            <span className="h-[26px] overflow-hidden">
                                <span className={cn("flex flex-col transition-transform duration-500 group-hover:-translate-y-[26px] motion-reduce:transition-none", EASE)}>
                                    <span>{ones}</span>
                                    <span>6</span>
                                </span>
                            </span>
                        ) : (
                            <span>{ones}</span>
                        )}
                    </Panel>
                    <Line className="w-5"/>
                </div>
            </div>
        ))}
    </Scene>
);

// A breadcrumb trail over a page header. The middle crumb's dropdown of sibling pages opens on hover.
const Breadcrumb: Art = () => (
    <Scene>
        <div className="relative w-[180px]">
            <div className="flex items-center gap-1">
                <LuHome className="size-3 text-ink/40"/>
                <LuChevronRight className="size-2.5 text-ink/25"/>
                <Line className="w-7"/>
                <LuChevronRight className="size-2.5 text-ink/25"/>
                <span className="flex items-center gap-0.5">
                    <Line className="w-8 bg-ink/25"/>
                    <LuChevronDown className="size-2.5 text-ink/40"/>
                </span>
                <LuChevronRight className="size-2.5 text-ink/25"/>
                <span className="flex h-4 items-center rounded bg-accent/15 px-1.5"><Line className="w-6 bg-accent"/></span>
            </div>
            <Heading className="mt-4 w-28"/>
            <Line className="mt-2 w-36"/>
            <Line className="mt-1.5 w-24"/>
            <Panel
                className={cn(
                    "absolute left-[66px] top-5 w-[64px] -translate-y-1 scale-95 space-y-0.5 p-1 opacity-0 shadow-float transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none",
                    EASE
                )}
            >
                <span className="flex h-3.5 items-center rounded px-1"><Line className="w-8"/></span>
                <span className="flex h-3.5 items-center rounded bg-ink/[0.06] px-1"><Line className="w-10 bg-ink/30"/></span>
                <span className="flex h-3.5 items-center rounded px-1"><Line className="w-6"/></span>
            </Panel>
        </div>
    </Scene>
);

// A feedback card with a row of stars. The accent fill sweeps from two stars to four on hover.
const Rating: Art = () => (
    <Scene>
        <Panel className="flex w-[156px] flex-col items-center px-3 py-3">
            <div className="relative">
                <div className="flex gap-1 fill-ink/15">
                    {[0, 1, 2, 3, 4].map((star) => <Star key={star}/>)}
                </div>
                <div className={cn("absolute inset-y-0 left-0 w-[40%] overflow-hidden transition-[width] duration-700 group-hover:w-[81%] motion-reduce:transition-none", EASE)}>
                    <div className="flex w-max gap-1 fill-accent">
                        {[0, 1, 2, 3, 4].map((star) => <Star key={star}/>)}
                    </div>
                </div>
            </div>
            <Heading className="mt-2.5 w-16 bg-ink/30"/>
            <Line className="mt-1.5 w-24"/>
            <div className="mt-3 flex gap-1.5">
                <Button className="h-4 px-2"/>
                <Button accent className="h-4 px-2"/>
            </div>
        </Panel>
    </Scene>
);

// A three-step wizard above its step content. The next connector fills and step three lights up on hover.
const Stepper: Art = () => (
    <Scene>
        <div className="w-[176px]">
            <div className="flex items-start">
                <div className="flex w-9 flex-col items-center gap-1.5">
                    <span className="flex size-6 items-center justify-center rounded-full bg-accent text-white dark:text-[#04151a]"><LuCheck className="size-3"/></span>
                    <Line className="w-6"/>
                </div>
                <span className="mt-[11px] h-0.5 flex-1 rounded-full bg-accent"/>
                <div className="flex w-9 flex-col items-center gap-1.5">
                    <span className="relative flex size-6 items-center justify-center rounded-full border-2 border-accent bg-accent/0 font-mono text-[9px] font-semibold text-accent transition-colors duration-500 group-hover:bg-accent">
                        <span className="transition-opacity duration-300 group-hover:opacity-0">2</span>
                        <LuCheck className="absolute size-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-[#04151a]"/>
                    </span>
                    <Line className="w-6 bg-ink/30"/>
                </div>
                <span className="relative mt-[11px] h-0.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                    <span className={cn("absolute inset-y-0 left-0 w-0 bg-accent transition-[width] duration-500 group-hover:w-full motion-reduce:transition-none", EASE)}/>
                </span>
                <div className="flex w-9 flex-col items-center gap-1.5">
                    <span className="flex size-6 items-center justify-center rounded-full border-2 border-ink/15 font-mono text-[9px] font-semibold text-ink-subtle transition-colors delay-300 duration-300 group-hover:border-accent group-hover:text-accent">3</span>
                    <Line className="w-6"/>
                </div>
            </div>
            <Panel className="mt-3 flex items-end justify-between p-2">
                <div className="space-y-1.5">
                    <Heading className="w-14 bg-ink/30"/>
                    <Line className="w-20"/>
                </div>
                <Button accent className="h-4 px-2"/>
            </Panel>
        </div>
    </Scene>
);

// A confirm dialog over a dimmed page. The dialog settles into place as the backdrop deepens on hover.
const Modal: Art = () => (
    <Scene>
        <Panel className="relative h-[104px] w-[184px] overflow-hidden p-2.5">
            <Heading className="w-20 bg-ink/20"/>
            <Line className="mt-2 w-32"/>
            <Line className="mt-1.5 w-28"/>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
                <span className="h-9 rounded-md bg-ink/[0.06]"/>
                <span className="h-9 rounded-md bg-ink/[0.06]"/>
                <span className="h-9 rounded-md bg-ink/[0.06]"/>
            </div>
            <span className="absolute inset-0 bg-ink/[0.07] transition-colors duration-500 group-hover:bg-ink/[0.16]"/>
            <Panel
                className={cn(
                    "absolute left-1/2 top-1/2 flex w-[112px] -translate-x-1/2 -translate-y-[44%] scale-[0.93] flex-col items-center p-2.5 shadow-float transition-transform duration-500 group-hover:-translate-y-1/2 group-hover:scale-100 motion-reduce:transition-none",
                    EASE
                )}
            >
                <span className="flex size-5 items-center justify-center rounded-full bg-accent/15"><Dot className="size-2 bg-accent"/></span>
                <Heading className="mt-1.5 w-14 bg-ink/35"/>
                <Line className="mt-1.5 w-20"/>
                <div className="mt-2 flex gap-1.5">
                    <Button className="h-4 px-2"/>
                    <Button accent className="h-4 px-2"/>
                </div>
            </Panel>
        </Panel>
    </Scene>
);

// A tab bar with an underline indicator above its panel. The indicator slides to the next tab on hover.
const Tabs: Art = () => (
    <Scene>
        <div className="w-[180px]">
            <div className="relative flex border-b border-hairline">
                {[0, 1, 2, 3].map((tab) => (
                    <span key={tab} className="flex h-6 w-[45px] items-center justify-center">
                        <Line
                            className={cn(
                                "w-6 transition-colors duration-500",
                                tab === 0 && "bg-ink/50 group-hover:bg-ink/15",
                                tab === 1 && "group-hover:bg-ink/50"
                            )}
                        />
                    </span>
                ))}
                <span className={cn("absolute -bottom-px left-0 h-0.5 w-[45px] rounded-full bg-accent transition-transform duration-500 group-hover:translate-x-[45px] motion-reduce:transition-none", EASE)}/>
            </div>
            <Panel className="mt-2.5 space-y-1.5 p-2.5">
                <Heading className="w-16 bg-ink/30"/>
                <Line className="w-32"/>
                <Line className="w-28"/>
                <Line className="w-20"/>
            </Panel>
        </div>
    </Scene>
);

// A radial tool menu around a plus button. The tools burst outward along their ring and the plus turns on hover.
const SpatialNavigation: Art = () => (
    <Scene>
        <div className="relative size-[108px]">
            <span className={cn("absolute inset-[14px] scale-[0.6] rounded-full border border-dashed border-hairline-strong opacity-0 transition-[transform,opacity] duration-700 group-hover:scale-100 group-hover:opacity-100", EASE)}/>
            {[0, 60, 120, 180, 240, 300].map((angle, index) => {
                const radians = ((angle - 90) * Math.PI) / 180;
                return (
                    <span
                        key={angle}
                        style={{"--dx": `${Math.round(Math.cos(radians) * 40)}px`, "--dy": `${Math.round(Math.sin(radians) * 40)}px`, transitionDelay: `${index * 35}ms`} as CSSProperties}
                        className={cn(
                            "absolute left-1/2 top-1/2 -ml-3 -mt-3 flex size-6 items-center justify-center rounded-full border border-hairline bg-surface shadow-card transition-transform duration-500 motion-reduce:transition-none",
                            "[transform:translate(calc(var(--dx)*0.55),calc(var(--dy)*0.55))_scale(0.85)] group-hover:[transform:translate(var(--dx),var(--dy))_scale(1)]",
                            EASE
                        )}
                    >
                        <span className={cn("size-2 bg-ink/30", index % 2 === 0 ? "rounded-full" : "rounded-[2px]")}/>
                    </span>
                );
            })}
            <span
                className={cn(
                    "absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-float transition-transform duration-500 group-hover:rotate-45 motion-reduce:transition-none dark:text-[#04151a]",
                    EASE
                )}
            >
                <LuPlus className="size-4"/>
            </span>
        </div>
    </Scene>
);

// A command palette: search field with its shortcut, then results. The highlight steps down two results on hover.
const CommandPalette: Art = () => (
    <Scene>
        <Panel className="w-[176px] overflow-hidden shadow-float">
            <div className="flex h-6 items-center gap-1.5 border-b border-hairline px-2.5">
                <LuSearch className="size-3 text-ink/40"/>
                <Line className="w-10 bg-ink/35"/>
                <span className="h-2.5 w-px animate-pulse bg-accent motion-reduce:animate-none"/>
                <span className="ml-auto rounded border border-hairline-strong px-1 font-mono text-[8px] leading-[11px] text-ink-subtle">⌘K</span>
            </div>
            <div className="relative p-1">
                <span className={cn("absolute inset-x-1 top-1 h-4 rounded bg-accent/[0.12] transition-transform duration-500 group-hover:translate-y-8 motion-reduce:transition-none", EASE)}>
                    <span className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-accent"/>
                </span>
                {["w-14", "w-10", "w-16", "w-12"].map((width, row) => (
                    <div key={width} className="relative flex h-4 items-center gap-1.5 px-2">
                        <span className="size-2.5 rounded-[3px] bg-ink/15"/>
                        <Line className={width}/>
                        {row % 2 === 0 && <Line className="ml-auto w-4 bg-ink/10"/>}
                    </div>
                ))}
            </div>
        </Panel>
    </Scene>
);

// A file explorer tree with indent guides and a selected file. A collapsed folder unfolds its files on hover.
const FileTree: Art = () => (
    <Scene>
        <Panel className="w-[152px] p-2 text-ink/40">
            <div className="flex h-[15px] items-center gap-1">
                <LuChevronDown className="size-2.5"/>
                <LuFolderOpen className="size-3"/>
                <Line className="w-8 bg-ink/30"/>
            </div>
            <div className="ml-[5px] border-l border-hairline pl-1.5">
                <div className="flex h-[15px] items-center gap-1">
                    <LuChevronRight className={cn("size-2.5 transition-transform duration-500 group-hover:rotate-90 motion-reduce:transition-none", EASE)}/>
                    <LuFolder className="size-3"/>
                    <Line className="w-12"/>
                </div>
                <div className={cn("grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr] motion-reduce:transition-none", EASE)}>
                    <div className="overflow-hidden">
                        <div className="ml-[5px] border-l border-hairline pl-1.5">
                            <div className="flex h-[15px] items-center gap-1 pl-3"><LuFile className="size-3"/><Line className="w-10"/></div>
                            <div className="flex h-[15px] items-center gap-1 pl-3"><LuFile className="size-3"/><Line className="w-7"/></div>
                        </div>
                    </div>
                </div>
                <div className="-ml-1 flex h-[15px] items-center gap-1 rounded bg-accent/[0.12] pl-4 text-accent">
                    <LuFile className="size-3"/>
                    <Line className="w-9 bg-accent/70"/>
                </div>
                <div className="flex h-[15px] items-center gap-1 pl-3"><LuFile className="size-3"/><Line className="w-11"/></div>
            </div>
            <div className="flex h-[15px] items-center gap-1">
                <LuChevronRight className="size-2.5"/>
                <LuFolder className="size-3"/>
                <Line className="w-10"/>
            </div>
        </Panel>
    </Scene>
);

const art: Record<string, Art> = {
    "drag-and-drop": DragAndDrop,
    "comparison-card": ComparisonCard,
    "cards": Cards,
    "drawer": Drawer,
    "animated-cards": AnimatedCards,
    "image-cropper": ImageCropper,
    "according": According,
    "appbar": Appbar,
    "image-gallery": ImageGallery,
    "carousel": Carousel,
    "pagination": Pagination,
    "progress-bar": ProgressBar,
    "chip": Chip,
    "marquee": Marquee,
    "timer": Timer,
    "breadcrumb": Breadcrumb,
    "rating": Rating,
    "stepper": Stepper,
    "modal": Modal,
    "tabs": Tabs,
    "spatial-navigation": SpatialNavigation,
    "command-palette": CommandPalette,
    "file-tree": FileTree,
};

export default art;

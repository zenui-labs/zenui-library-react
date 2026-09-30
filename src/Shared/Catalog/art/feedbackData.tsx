import {
    LuAlertTriangle,
    LuBell,
    LuCheck,
    LuChevronLeft,
    LuChevronRight,
    LuCopy,
    LuFile,
    LuFolder,
    LuHeart,
    LuInfo,
    LuMail,
    LuMousePointer2,
    LuRedo2,
    LuShoppingCart,
    LuTrash2,
    LuUndo2,
    LuX
} from "react-icons/lu";
import {Button, Dot, EASE, Heading, Line, Panel, Scene} from "../ArtKit.tsx";
import type {Art} from "../ArtKit.tsx";
import {cn} from "@utils/Style.ts";

/* ---------------------------------------------------------------- Feedback */

// A right-click menu open at the pointer. On hover the "Move to" row lights up and its submenu slides out.
const ContextMenu: Art = () => (
    <Scene>
        <div className="relative h-[92px] w-[152px]">
            <LuMousePointer2 className="absolute left-0 top-0 size-3.5 fill-surface text-ink"/>
            <Panel className="absolute left-2.5 top-2.5 w-[96px] p-1 shadow-float">
                {[12, 16, 0, 14, 10].map((width, index) => (width === 0 ? (
                    <span key={index} className="mx-1 my-1 block h-px bg-hairline"/>
                ) : (
                    <span
                        key={index}
                        className={cn(
                            "flex h-[14px] items-center gap-1.5 rounded-[5px] px-1.5",
                            index === 3 && "transition-colors duration-300 group-hover:bg-accent/15"
                        )}
                    >
                        <Dot className="size-1.5 bg-ink/25"/>
                        <Line className="h-[4px] bg-ink/25" style={{width}}/>
                        {index === 3 && <LuChevronRight className="ml-auto size-2.5 text-ink-subtle"/>}
                    </span>
                )))}
            </Panel>
            <Panel
                className={cn(
                    "absolute left-[92px] top-[47px] w-[60px] -translate-x-1.5 p-1 opacity-0 shadow-float transition-[transform,opacity] duration-500 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none",
                    EASE
                )}
            >
                {[20, 14, 24].map((width, index) => (
                    <span key={index} className="flex h-[14px] items-center rounded-[5px] px-1.5">
                        <Line className="h-[4px] bg-ink/25" style={{width}}/>
                    </span>
                ))}
            </Panel>
        </div>
    </Scene>
);

// A profile card placeholder that pulses while it waits. On hover a band of light sweeps across it.
const Skeleton: Art = () => (
    <Scene>
        <Panel className="relative w-[150px] overflow-hidden p-2.5">
            <div className="animate-pulse motion-reduce:animate-none">
                <span className="block h-9 rounded-md bg-ink/10"/>
                <div className="-mt-4 flex items-end gap-2 px-1.5">
                    <span className="block size-8 shrink-0 rounded-full border-2 border-surface bg-ink/15"/>
                    <div className="mb-1 flex-1 space-y-1">
                        <Line className="w-14 bg-ink/15"/>
                        <Line className="w-9 bg-ink/10"/>
                    </div>
                </div>
                <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                    {[0, 1, 2].map((index) => (
                        <span key={index} className="block h-4 rounded bg-ink/[0.07]"/>
                    ))}
                </div>
            </div>
            <span
                className={cn(
                    "pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 group-hover:translate-x-[300%] motion-reduce:transition-none dark:via-white/10",
                    EASE
                )}
            />
        </Panel>
    </Scene>
);

// A folder tree with guide lines. On hover the closed folder opens and its files grow in under it.
const TreeDropdown: Art = () => (
    <Scene>
        <div className="w-[128px] text-ink-subtle">
            <span className="flex h-4 items-center gap-1">
                <LuChevronRight className="size-2.5 rotate-90"/>
                <LuFolder className="size-3"/>
                <Heading className="ml-0.5 h-[5px] w-14 bg-ink/35"/>
            </span>
            <div className="ml-[5px] border-l border-hairline-strong pl-2.5">
                <span className="flex h-4 items-center gap-1">
                    <LuFile className="size-3"/>
                    <Line className="ml-0.5 w-12"/>
                </span>
                <span className="flex h-4 items-center gap-1 transition-colors duration-300 group-hover:text-accent">
                    <LuChevronRight className={cn("size-2.5 transition-transform duration-500 group-hover:rotate-90 motion-reduce:transition-none", EASE)}/>
                    <LuFolder className="size-3"/>
                    <Line className="ml-0.5 w-10 bg-ink/25"/>
                </span>
                <div className={cn("grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr] motion-reduce:transition-none", EASE)}>
                    <div className="overflow-hidden">
                        <div className="ml-[5px] border-l border-accent/50 pl-2.5">
                            {[10, 14].map((width, index) => (
                                <span key={index} className="flex h-4 items-center gap-1">
                                    <LuFile className="size-3"/>
                                    <Line className="ml-0.5" style={{width: width * 4}}/>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <span className="flex h-4 items-center gap-1">
                    <LuFile className="size-3"/>
                    <Line className="ml-0.5 w-9"/>
                </span>
            </div>
        </div>
    </Scene>
);

// Info, warning and error alerts in their status colors. On hover the last one is dismissed and slides away.
const AlertMessage: Art = () => (
    <Scene>
        <div className="w-[164px] space-y-1.5">
            <div className="flex gap-2 rounded-md border border-accent/30 bg-accent/10 px-2 py-1.5">
                <LuInfo className="mt-px size-3 shrink-0 text-accent"/>
                <div className="flex-1 space-y-1">
                    <Heading className="h-[5px] w-14 bg-ink/40"/>
                    <Line className="w-full"/>
                </div>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-1.5">
                <LuAlertTriangle className="size-3 shrink-0 text-amber-600 dark:text-amber-400"/>
                <Line className="w-24"/>
            </div>
            <div
                className={cn(
                    "flex items-center gap-2 rounded-md border border-rose-500/30 bg-rose-500/10 px-2 py-1.5 transition-[transform,opacity] duration-500 group-hover:translate-x-8 group-hover:opacity-0 motion-reduce:transition-none",
                    EASE
                )}
            >
                <span className="size-3 shrink-0 rounded-full border-[1.5px] border-rose-500/70"/>
                <Line className="w-20"/>
                <LuX className="ml-auto size-3 text-ink-subtle"/>
            </div>
        </div>
    </Scene>
);

// A confirm dialog over a dimmed page. On hover the backdrop darkens and the dialog settles in.
const DialogMessage: Art = () => (
    <Scene>
        <div className="relative h-[100px] w-[168px] overflow-hidden rounded-[10px] border border-hairline bg-surface">
            <div className="space-y-1.5 p-2.5">
                <Heading className="w-16 bg-ink/25"/>
                <Line className="w-full"/>
                <Line className="w-28"/>
                <Line className="w-full"/>
                <Line className="w-24"/>
                <Line className="w-32"/>
            </div>
            <span className="absolute inset-0 bg-ink/10 transition-colors duration-500 group-hover:bg-ink/25"/>
            <Panel
                className={cn(
                    "absolute left-1/2 top-1/2 w-[112px] -translate-x-1/2 -translate-y-1/2 scale-90 p-2.5 shadow-float transition-transform duration-500 group-hover:scale-100 motion-reduce:transition-none",
                    EASE
                )}
            >
                <div className="flex items-center gap-2">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <LuTrash2 className="size-3"/>
                    </span>
                    <Heading className="w-14"/>
                </div>
                <Line className="mt-2 w-full"/>
                <div className="mt-2.5 flex justify-end gap-1">
                    <Button className="h-4 px-2">
                        <span className="block h-[3px] w-5 rounded-full bg-ink/30"/>
                    </Button>
                    <Button accent className="h-4 px-2">
                        <span className="block h-[3px] w-5 rounded-full bg-white/85 dark:bg-[#04151a]/70"/>
                    </Button>
                </div>
            </Panel>
        </div>
    </Scene>
);

// A quote card with the avatar resting on its top edge. On hover the five stars fill in one by one.
const Testimonials: Art = () => (
    <Scene>
        <Panel className="relative mt-3 flex w-[156px] flex-col items-center px-3 pb-2.5 pt-5">
            <span className="absolute -top-3.5 left-1/2 size-7 -translate-x-1/2 overflow-hidden rounded-full border-2 border-surface bg-raised">
                <span className="block size-full bg-gradient-to-br from-ink/30 to-ink/10"/>
            </span>
            <span className="absolute left-2.5 top-1 font-serif text-[22px] leading-none text-accent">&ldquo;</span>
            <div className="flex w-full flex-col items-center space-y-1">
                <Line className="w-full"/>
                <Line className="w-[86%]"/>
                <Line className="w-[64%]"/>
            </div>
            <span className="mt-2.5 flex gap-0.5">
                {[0, 1, 2, 3, 4].map((index) => (
                    <svg key={index} viewBox="0 0 24 24" className="size-2.5">
                        <path
                            d="M12 2l3 6.9 7.5.6-5.7 4.9 1.8 7.3L12 17.8 5.4 21.7l1.8-7.3L1.5 9.5 9 8.9z"
                            className="fill-ink/20 transition-colors duration-300 group-hover:fill-accent motion-reduce:transition-none"
                            style={{transitionDelay: `${index * 80}ms`}}
                        />
                    </svg>
                ))}
            </span>
            <Heading className="mt-2 h-[5px] w-12 bg-ink/35"/>
        </Panel>
    </Scene>
);

// A spinning ring beside a grid of tiles. The ring turns on its own; on hover the tiles flip in one after another.
const Loader: Art = () => (
    <Scene className="gap-7">
        <svg viewBox="0 0 48 48" className="size-12 animate-spin [animation-duration:1.4s] motion-reduce:animate-none">
            <circle cx="24" cy="24" r="20" fill="none" strokeWidth="4" className="stroke-ink/10"/>
            <circle cx="24" cy="24" r="20" fill="none" strokeWidth="4" strokeLinecap="round" pathLength={100} strokeDasharray="28 100" className="stroke-accent"/>
        </svg>
        <div className="grid grid-cols-3 gap-1 [perspective:200px]">
            {Array.from({length: 9}, (_, index) => (
                <span
                    key={index}
                    className={cn(
                        "block size-3 rounded-[3px] bg-ink/15 transition-[transform,background-color] duration-500 group-hover:bg-accent group-hover:[transform:rotateY(180deg)] motion-reduce:transition-none",
                        EASE
                    )}
                    style={{transitionDelay: `${((index % 3) + Math.floor(index / 3)) * 70}ms`}}
                />
            ))}
        </div>
    </Scene>
);

// A notification with a close icon and a timer bar in the corner of a window. On hover the bar runs down.
const Notification: Art = () => (
    <Scene>
        <div className="relative h-[96px] w-[168px] rounded-[10px] border border-hairline bg-surface/60 p-2.5">
            <Heading className="w-14 bg-ink/15"/>
            <div className="mt-9 space-y-1.5">
                <Line className="w-full bg-ink/10"/>
                <Line className="w-32 bg-ink/10"/>
                <Line className="w-24 bg-ink/10"/>
            </div>
            <Panel className="absolute right-2 top-2 w-[116px] overflow-hidden shadow-float">
                <div className="flex items-start gap-2 p-2">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent">
                        <LuBell className="size-3"/>
                    </span>
                    <div className="flex-1 space-y-1 pt-0.5">
                        <Heading className="h-[5px] w-12 bg-ink/40"/>
                        <Line className="w-full"/>
                    </div>
                    <LuX className="size-2.5 shrink-0 text-ink-subtle"/>
                </div>
                <span className="block h-[3px] bg-ink/[0.06]">
                    <span className={cn("block h-full w-full origin-left bg-accent transition-transform duration-700 group-hover:scale-x-[0.15] motion-reduce:transition-none", EASE)}/>
                </span>
            </Panel>
        </div>
    </Scene>
);

// Three toasts stacked at the bottom of the screen, the newest in front. On hover the stack fans out upward.
const Toast: Art = () => {
    const depths = [
        "-translate-y-4 scale-[0.86] opacity-60 group-hover:-translate-y-[68px] group-hover:scale-100 group-hover:opacity-100",
        "-translate-y-2 scale-[0.93] opacity-80 group-hover:-translate-y-[34px] group-hover:scale-100 group-hover:opacity-100",
        "",
    ];
    return (
        <Scene>
            <div className="relative h-[104px] w-[164px]">
                {depths.map((depth, index) => (
                    <Panel
                        key={index}
                        className={cn(
                            "absolute inset-x-0 bottom-4 flex h-8 items-center gap-2 px-2.5 shadow-float transition-[transform,opacity] duration-500 motion-reduce:transition-none",
                            EASE,
                            depth
                        )}
                    >
                        {index === 2 ? (
                            <>
                                <span className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-accent text-white dark:text-[#04151a]">
                                    <LuCheck className="size-2.5"/>
                                </span>
                                <Heading className="h-[5px] w-14 bg-ink/40"/>
                                <Button className="ml-auto h-4 px-1.5">
                                    <span className="block h-[3px] w-4 rounded-full bg-ink/30"/>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Dot className="size-3.5 bg-ink/15"/>
                                <Line className="w-16"/>
                            </>
                        )}
                    </Panel>
                ))}
            </div>
        </Scene>
    );
};

// A document over a paper shredder. On hover it feeds through the slot and comes out below as strips.
const ExpressiveFeedback: Art = () => (
    <Scene>
        <div className="flex flex-col items-center">
            <div className="h-[46px] w-[72px] overflow-hidden">
                <Panel
                    className={cn(
                        "mx-auto mt-1 h-[60px] w-[58px] space-y-1.5 rounded-[4px] p-2 transition-transform duration-700 group-hover:translate-y-[34px] motion-reduce:transition-none",
                        EASE
                    )}
                >
                    <Heading className="h-[4px] w-7 bg-ink/35"/>
                    <Line className="h-[3px] w-full"/>
                    <Line className="h-[3px] w-full"/>
                    <Line className="h-[3px] w-8"/>
                    <Line className="h-[3px] w-full"/>
                </Panel>
            </div>
            <div className="relative z-10 flex h-7 w-[108px] items-center justify-end rounded-md border border-hairline-strong bg-raised px-2 shadow-card">
                <span className="absolute inset-x-3 top-0 h-[3px] -translate-y-1/2 rounded-full bg-ink/60"/>
                <span className="size-1.5 animate-pulse rounded-full bg-accent motion-reduce:animate-none"/>
            </div>
            <div className="flex h-[28px] justify-center gap-[3px]">
                {Array.from({length: 9}, (_, index) => (
                    <span
                        key={index}
                        className={cn(
                            "block h-full w-[4px] origin-top scale-y-[0.2] rounded-b-[1px] border-x border-b border-hairline-strong bg-surface transition-transform duration-500 group-hover:scale-y-100 motion-reduce:transition-none",
                            EASE
                        )}
                        style={{transitionDelay: `${250 + (index % 3) * 60}ms`}}
                    />
                ))}
            </div>
        </div>
    </Scene>
);

/* ------------------------------------------------------------ Data display */

// A mail icon with an unread count, a cart and an online avatar. On hover the unread count rolls from 3 to 4.
const Badge: Art = () => (
    <Scene className="gap-6">
        <span className="relative flex size-11 items-center justify-center rounded-xl border border-hairline bg-surface text-ink-muted shadow-card">
            <LuMail className="size-5"/>
            <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] justify-center overflow-hidden rounded-full bg-accent px-1 font-mono text-[10px] font-semibold leading-[18px] text-white ring-2 ring-canvas dark:text-[#04151a]">
                <span className={cn("flex flex-col transition-transform duration-500 group-hover:-translate-y-1/2 motion-reduce:transition-none", EASE)}>
                    <span>3</span>
                    <span>4</span>
                </span>
            </span>
        </span>
        <span className="relative flex size-11 items-center justify-center rounded-xl border border-hairline bg-surface text-ink-muted shadow-card">
            <LuShoppingCart className="size-5"/>
            <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ink px-1 font-mono text-[10px] font-semibold text-canvas ring-2 ring-canvas">2</span>
        </span>
        <span className="relative size-11">
            <span className="block size-full overflow-hidden rounded-full bg-ink/10">
                <span className="mx-auto mt-2 block size-4 rounded-full bg-ink/25"/>
                <span className="mx-auto mt-1 block h-5 w-8 rounded-t-full bg-ink/25"/>
            </span>
            <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-canvas"/>
        </span>
    </Scene>
);

// A table with a checkbox on every row. On hover the second row gets checked and highlighted.
const Table: Art = () => (
    <Scene>
        <Panel className="w-[168px] overflow-hidden">
            <div className="grid h-6 grid-cols-[10px_1fr_26px_18px] items-center gap-2 border-b border-hairline bg-ink/[0.03] px-2.5">
                <span className="size-2.5 rounded-[3px] border border-hairline-strong"/>
                <Heading className="h-[5px] w-10 bg-ink/30"/>
                <Heading className="h-[5px] w-5 bg-ink/30"/>
                <Heading className="h-[5px] w-4 bg-ink/30"/>
            </div>
            {[18, 14, 20, 12].map((width, index) => (
                <div
                    key={index}
                    className={cn(
                        "grid h-[18px] grid-cols-[10px_1fr_26px_18px] items-center gap-2 border-b border-hairline px-2.5 last:border-0",
                        index === 1 && "transition-colors duration-300 group-hover:bg-accent/[0.08]"
                    )}
                >
                    <span className="relative size-2.5 overflow-hidden rounded-[3px] border border-hairline-strong">
                        {index === 1 && (
                            <span className={cn("absolute inset-0 flex scale-0 items-center justify-center bg-accent text-white transition-transform duration-300 group-hover:scale-100 motion-reduce:transition-none dark:text-[#04151a]", EASE)}>
                                <LuCheck className="size-2"/>
                            </span>
                        )}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Dot className="size-2.5 bg-ink/15"/>
                        <Line style={{width: width * 3}}/>
                    </span>
                    <span className="h-2 rounded-full bg-ink/[0.07]"/>
                    <Line className="w-3"/>
                </div>
            ))}
        </Panel>
    </Scene>
);

// An editor with undo and redo buttons. On hover the last edit is undone: the new line retracts and redo wakes up.
const RedoUndo: Art = () => (
    <Scene>
        <Panel className="w-[164px] overflow-hidden">
            <div className="flex items-center gap-1 border-b border-hairline px-2 py-1.5">
                <span className="flex size-5 items-center justify-center rounded-md text-ink-muted transition-colors duration-300 group-hover:bg-accent/15 group-hover:text-accent">
                    <LuUndo2 className="size-3"/>
                </span>
                <span className="flex size-5 items-center justify-center rounded-md text-ink/25 transition-colors duration-300 group-hover:text-ink-muted">
                    <LuRedo2 className="size-3"/>
                </span>
                <span className="ml-auto flex gap-0.5">
                    {["⌘", "Z"].map((key) => (
                        <kbd key={key} className="flex h-4 min-w-4 items-center justify-center rounded border border-hairline-strong bg-raised px-1 font-mono text-[8px] text-ink-muted">{key}</kbd>
                    ))}
                </span>
            </div>
            <div className="space-y-1.5 p-2.5">
                <Heading className="w-20 bg-ink/30"/>
                <Line className="w-full"/>
                <Line className="w-[80%]"/>
                <span className="flex items-center gap-0.5">
                    <Line className={cn("w-[72%] bg-ink/30 transition-[width] duration-500 group-hover:w-[24%] motion-reduce:transition-none", EASE)}/>
                    <span className="h-2.5 w-px animate-pulse bg-accent motion-reduce:animate-none"/>
                </span>
            </div>
        </Panel>
    </Scene>
);

// Daily activity levels (0 to 4) for 18 weeks by 7 days: pseudo-random but stable, with quiet days the most common.
const ACTIVITY = Array.from({length: 18 * 7}, (_, index) => {
    const noise = Math.abs(Math.sin(index * 12.9898) * 43758.5453) % 1;
    return Math.min(4, Math.floor(noise * noise * 5.5));
});

// A GitHub style contribution grid. On hover the most recent weeks fill in, one column after another.
const GithubActivityGraph: Art = () => (
    <Scene>
        <div>
            <div className="flex items-center gap-2">
                <Heading className="w-16 bg-ink/35"/>
                <Line className="w-10"/>
            </div>
            <div className="mt-2 grid grid-flow-col grid-rows-[repeat(7,7px)] gap-[2px]">
                {ACTIVITY.map((level, index) => {
                    const column = Math.floor(index / 7);
                    const recent = column >= 13;
                    const fill = level === 0 ? "rgb(var(--ink) / 0.07)" : `rgb(var(--accent) / ${level * 0.25})`;
                    return (
                        <span key={index} className="relative block size-[7px] rounded-[2px]" style={{background: recent ? "rgb(var(--ink) / 0.07)" : fill}}>
                            {recent && (
                                <span
                                    className="absolute inset-0 rounded-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
                                    style={{background: fill, transitionDelay: `${(column - 13) * 90}ms`}}
                                />
                            )}
                        </span>
                    );
                })}
            </div>
            <div className="mt-2 flex items-center justify-end gap-[2px]">
                <Line className="mr-1 w-4"/>
                {[0.07, 0.25, 0.5, 0.75, 1].map((alpha, index) => (
                    <span key={alpha} className="block size-[7px] rounded-[2px]" style={{background: index === 0 ? `rgb(var(--ink) / ${alpha})` : `rgb(var(--accent) / ${alpha})`}}/>
                ))}
            </div>
        </div>
    </Scene>
);

// A button with a tooltip above it. On hover the pointer reaches the button and the tooltip springs fully in.
const Tooltip: Art = () => (
    <Scene>
        <div className="relative flex flex-col items-center">
            <span
                className={cn(
                    "relative mb-2.5 flex h-6 translate-y-1 scale-95 items-center rounded-md bg-ink px-2.5 opacity-60 shadow-float transition-[transform,opacity] duration-500 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none",
                    EASE
                )}
            >
                <Line className="w-14 bg-canvas/70"/>
                <span className="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1 rotate-45 rounded-[1px] bg-ink"/>
            </span>
            <Button className="h-7 px-4 transition-colors duration-300 group-hover:border-accent">
                <LuInfo className="size-3 text-ink-subtle"/>
                <span className="block h-[4px] w-8 rounded-full bg-ink/30"/>
            </Button>
            <LuMousePointer2
                className={cn(
                    "absolute left-[calc(50%+30px)] top-[calc(100%+4px)] size-3.5 fill-surface text-ink transition-transform duration-500 group-hover:-translate-x-5 group-hover:-translate-y-3 motion-reduce:transition-none",
                    EASE
                )}
            />
        </div>
    </Scene>
);

// Path for a pie slice from `from` to `to`, both as a share of the whole (0 to 1), clockwise from 12 o'clock.
const slice = (from: number, to: number, radius = 30, center = 32) => {
    const point = (share: number) => [center + radius * Math.sin(share * 2 * Math.PI), center - radius * Math.cos(share * 2 * Math.PI)].map((value) => value.toFixed(2));
    const [x1, y1] = point(from);
    const [x2, y2] = point(to);
    return `M${center} ${center}L${x1} ${y1}A${radius} ${radius} 0 ${to - from > 0.5 ? 1 : 0} 1 ${x2} ${y2}Z`;
};

// A filled pie chart with its legend. On hover the highlighted slice pulls out of the pie.
const PieChart: Art = () => (
    <Scene className="gap-5">
        <svg viewBox="0 0 64 64" className="size-[76px] overflow-visible">
            <path d={slice(0.34, 0.62)} strokeWidth="1.5" className="fill-ink/40 stroke-surface"/>
            <path d={slice(0.62, 0.84)} strokeWidth="1.5" className="fill-ink/20 stroke-surface"/>
            <path d={slice(0.84, 1)} strokeWidth="1.5" className="fill-ink/10 stroke-surface"/>
            <path
                d={slice(0, 0.34)}
                strokeWidth="1.5"
                className={cn("fill-accent stroke-surface transition-transform duration-500 group-hover:translate-x-[3.5px] group-hover:-translate-y-[2px] motion-reduce:transition-none", EASE)}
            />
        </svg>
        <div className="space-y-2">
            {["bg-accent", "bg-ink/40", "bg-ink/20", "bg-ink/10"].map((color, index) => (
                <span key={color} className="flex items-center gap-1.5">
                    <span className={cn("block size-2 rounded-[2px]", color)}/>
                    <Line style={{width: [28, 22, 26, 16][index]}}/>
                </span>
            ))}
        </div>
    </Scene>
);

const GRAPH_LINE = "M0 62L24 54L48 58L72 36L96 42L120 22L144 28L168 12";

// An area chart on a light grid. On hover a data point with its value tag travels along the line.
const GraphChart: Art = () => (
    <Scene>
        <div className="relative h-[84px] w-[168px]">
            <svg viewBox="0 0 168 84" className="absolute inset-0 h-[84px] w-[168px] overflow-visible">
                <defs>
                    <linearGradient id="catalog-graph-chart-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" style={{stopColor: "rgb(var(--accent))", stopOpacity: 0.28}}/>
                        <stop offset="1" style={{stopColor: "rgb(var(--accent))", stopOpacity: 0}}/>
                    </linearGradient>
                </defs>
                {[14, 42, 70].map((y) => (
                    <line key={y} x1="0" x2="168" y1={y} y2={y} strokeDasharray="2 3" className="stroke-ink/10"/>
                ))}
                <line x1="0" x2="168" y1="84" y2="84" className="stroke-ink/20"/>
                <path d={`${GRAPH_LINE}L168 84L0 84Z`} fill="url(#catalog-graph-chart-fill)"/>
                <path d={GRAPH_LINE} fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className="stroke-accent"/>
            </svg>
            <span
                className={cn(
                    "absolute left-0 top-0 block size-2.5 rounded-full border-2 border-surface bg-accent shadow-card transition-[offset-distance] duration-700 [offset-distance:30%] group-hover:[offset-distance:84%] motion-reduce:transition-none",
                    EASE
                )}
                style={{offsetPath: `path("${GRAPH_LINE}")`, offsetRotate: "0deg"}}
            >
                <span className="absolute bottom-full left-1/2 mb-1 flex h-3 w-7 -translate-x-1/2 items-center justify-center rounded bg-ink">
                    <span className="block h-[3px] w-4 rounded-full bg-canvas/70"/>
                </span>
            </span>
        </div>
    </Scene>
);

// A vertical milestone timeline. On hover progress runs down the line and each milestone lights up in turn.
const Timeline: Art = () => (
    <Scene>
        <div className="relative w-[144px]">
            <span className="absolute bottom-4 left-[40px] top-4 w-[2px] rounded-full bg-ink/10"/>
            <span className={cn("absolute bottom-4 left-[40px] top-4 w-[2px] origin-top scale-y-0 rounded-full bg-accent transition-transform duration-700 group-hover:scale-y-100 motion-reduce:transition-none", EASE)}/>
            {[0, 1, 2].map((index) => (
                <div key={index} className="relative flex h-8 items-center gap-2">
                    <Line className="w-7 bg-ink/20"/>
                    <span
                        className={cn(
                            "block size-2.5 shrink-0 rounded-full border-2 transition-colors duration-300 motion-reduce:transition-none",
                            index === 0 ? "border-accent bg-accent" : "border-ink/20 bg-surface group-hover:border-accent group-hover:bg-accent"
                        )}
                        style={{transitionDelay: `${index * 180}ms`}}
                    />
                    <div className="space-y-1">
                        <Heading className="h-[5px] bg-ink/35" style={{width: [56, 44, 64][index]}}/>
                        <Line style={{width: [80, 72, 60][index]}}/>
                    </div>
                </div>
            ))}
        </div>
    </Scene>
);

// A month grid with a picked date range. On hover the range stretches across the week to its new end date.
const Calendar: Art = () => (
    <Scene>
        <Panel className="p-2">
            <div className="flex h-3.5 items-center justify-between text-ink-subtle">
                <LuChevronLeft className="size-3"/>
                <Heading className="h-[5px] w-12 bg-ink/35"/>
                <LuChevronRight className="size-3"/>
            </div>
            <div className="mt-1.5 grid grid-cols-[repeat(7,12px)] gap-x-[3px]">
                {Array.from({length: 7}, (_, index) => (
                    <span key={index} className="mx-auto block h-[3px] w-1.5 rounded-full bg-ink/30"/>
                ))}
            </div>
            <div className="relative mt-2 grid grid-cols-[repeat(7,12px)] gap-[3px]">
                <span className={cn("absolute left-[15px] top-[15px] h-3 w-[42px] rounded-full bg-accent/15 transition-[width] duration-500 group-hover:w-[72px] motion-reduce:transition-none", EASE)}/>
                {Array.from({length: 28}, (_, index) => (
                    <span key={index} className="relative flex size-3 items-center justify-center">
                        <span className="block h-[3px] w-1.5 rounded-full bg-ink/20"/>
                    </span>
                ))}
                <span className="absolute left-[15px] top-[15px] size-3 rounded-full bg-accent"/>
                <span className={cn("absolute left-[45px] top-[15px] size-3 rounded-full bg-accent transition-transform duration-500 group-hover:translate-x-[30px] motion-reduce:transition-none", EASE)}/>
            </div>
        </Panel>
    </Scene>
);

// Path for one density ridge sitting on `base`, peaking at `peak` with the given height.
const ridge = (base: number, peak: number, height: number) =>
    `M0 ${base}C${peak - 34} ${base} ${peak - 16} ${base - height} ${peak} ${base - height}S${peak + 34} ${base} 170 ${base}Z`;

// A ridgeline plot of stacked density curves. On hover the highlighted ridge lifts out of the stack.
const DataSculptures: Art = () => (
    <Scene>
        <svg viewBox="0 0 170 86" className="h-[81px] w-[160px] overflow-visible">
            {[[30, 62, 20], [44, 104, 26], [58, 76, 32], [72, 118, 22], [84, 58, 18]].map(([base, peak, height], index) => (
                <g
                    key={index}
                    className={cn(index === 2 && "transition-transform duration-500 group-hover:-translate-y-2 motion-reduce:transition-none", index === 2 && EASE)}
                >
                    <path d={ridge(base, peak, height)} className="fill-surface"/>
                    <path
                        d={ridge(base, peak, height)}
                        strokeWidth="1.25"
                        strokeLinejoin="round"
                        className={cn(
                            index === 2 ? "fill-accent/15 stroke-accent transition-[fill] duration-500 group-hover:fill-accent/30" : "fill-ink/[0.04] stroke-ink/35"
                        )}
                    />
                    {index === 2 && <line x1={peak} x2={peak} y1={base - height + 4} y2={base} strokeDasharray="2 2" className="stroke-accent"/>}
                </g>
            ))}
        </svg>
    </Scene>
);

// Overlapping avatars with a count for the rest. On hover the stack fans out.
const AvatarGroup: Art = () => {
    const fan = ["group-hover:-translate-x-5", "group-hover:-translate-x-2.5", "", "group-hover:translate-x-2.5", "group-hover:translate-x-5"];
    return (
        <Scene>
            <div className="flex items-center">
                {fan.map((shift, index) => (
                    <span
                        key={index}
                        className={cn(
                            "relative -ml-3 block size-10 overflow-hidden rounded-full border-2 border-canvas first:ml-0 transition-transform duration-500 motion-reduce:transition-none",
                            EASE,
                            shift
                        )}
                        style={{zIndex: 5 - index}}
                    >
                        {index === 4 ? (
                            <span className="flex size-full items-center justify-center bg-accent/15 font-mono text-[11px] font-semibold text-accent">+5</span>
                        ) : (
                            <span className="block size-full bg-raised">
                                <span className="block size-full" style={{background: `rgb(var(--ink) / ${[0.1, 0.16, 0.08, 0.13][index]})`}}>
                                    <span className="mx-auto block size-3.5 translate-y-2 rounded-full bg-ink/25"/>
                                    <span className="mx-auto mt-3 block h-4 w-7 rounded-t-full bg-ink/25"/>
                                </span>
                            </span>
                        )}
                    </span>
                ))}
            </div>
        </Scene>
    );
};

// A KPI card with a trend badge and sparkline next to a goal ring. On hover the ring fills toward the target.
const StatCard: Art = () => (
    <Scene>
        <div className="flex items-stretch gap-2">
            <Panel className="w-[104px] p-2.5">
                <Line className="w-10"/>
                <span className="mt-2 flex items-center gap-1.5">
                    <span className="font-mono text-[15px] font-semibold leading-none tracking-tight text-ink">24.8k</span>
                    <span className="rounded-full bg-emerald-500/15 px-1 font-mono text-[8px] font-medium leading-[12px] text-emerald-600 dark:text-emerald-400">+12%</span>
                </span>
                <svg viewBox="0 0 84 22" className="mt-2.5 h-[22px] w-full overflow-visible">
                    <path d="M0 18L12 15L24 16L36 10L48 12L60 6L72 8L84 2" fill="none" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" className="stroke-ink/40"/>
                </svg>
            </Panel>
            <Panel className="flex w-[72px] flex-col items-center justify-center p-2.5">
                <svg viewBox="0 0 48 48" className="size-12 -rotate-90">
                    <circle cx="24" cy="24" r="19" fill="none" strokeWidth="5" className="stroke-ink/10"/>
                    <circle
                        cx="24"
                        cy="24"
                        r="19"
                        fill="none"
                        strokeWidth="5"
                        strokeLinecap="round"
                        pathLength={100}
                        strokeDasharray="100 100"
                        className={cn("stroke-accent transition-[stroke-dashoffset] duration-700 [stroke-dashoffset:58] group-hover:[stroke-dashoffset:14] motion-reduce:transition-none", EASE)}
                    />
                </svg>
                <Line className="mt-2 w-10"/>
            </Panel>
        </div>
    </Scene>
);

/* -------------------------------------------------------------- E-commerce */

// A product card with an image, name, price and rating. On hover the product zooms and an add to cart bar slides up.
const ProductCard: Art = () => (
    <Scene>
        <Panel className="w-[120px] overflow-hidden p-1.5">
            <div className="relative h-[58px] overflow-hidden rounded-md bg-ink/[0.06]">
                <span className="absolute bottom-2.5 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-ink/10 blur-[2px]"/>
                <span className={cn("absolute left-1/2 top-2 size-9 -translate-x-1/2 rotate-12 rounded-[38%] bg-gradient-to-br from-ink/30 to-ink/10 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110 motion-reduce:transition-none", EASE)}/>
                <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-surface text-ink-subtle shadow-card">
                    <LuHeart className="size-2.5"/>
                </span>
                <span className={cn("absolute inset-x-1 bottom-1 flex h-4 translate-y-6 items-center justify-center gap-1 rounded bg-accent text-white transition-transform duration-500 group-hover:translate-y-0 motion-reduce:transition-none dark:text-[#04151a]", EASE)}>
                    <LuShoppingCart className="size-2.5"/>
                    <span className="block h-[3px] w-6 rounded-full bg-current opacity-80"/>
                </span>
            </div>
            <div className="px-1 pb-0.5 pt-2">
                <Heading className="h-[5px] w-16 bg-ink/35"/>
                <Line className="mt-1 w-10"/>
                <span className="mt-1.5 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold leading-none text-ink">$49</span>
                    <span className="flex gap-0.5">
                        {[0, 1, 2, 3, 4].map((index) => (
                            <span key={index} className={cn("block size-1.5 rounded-full", index < 4 ? "bg-ink/35" : "bg-ink/10")}/>
                        ))}
                    </span>
                </span>
            </div>
        </Panel>
    </Scene>
);

// A dark discount banner with a sale tag, copy, a button and a product. On hover the product turns to face you and grows.
const AdsCard: Art = () => (
    <Scene>
        <div className="relative flex h-[84px] w-[168px] items-center overflow-hidden rounded-[10px] bg-ink px-3 shadow-float">
            <span className="absolute -right-5 top-1/2 size-[96px] -translate-y-1/2 rounded-full bg-canvas/[0.07]"/>
            <div className="relative z-10">
                <span className="inline-flex rounded-full bg-accent px-1.5 font-mono text-[8px] font-semibold leading-[13px] text-white dark:text-[#04151a]">-30%</span>
                <span className="mt-2 block h-[7px] w-20 rounded-full bg-canvas/85"/>
                <span className="mt-1.5 block h-[7px] w-14 rounded-full bg-canvas/85"/>
                <span className="mt-2.5 flex h-4 w-12 items-center justify-center rounded-full bg-canvas">
                    <span className="block h-[3px] w-6 rounded-full bg-ink/60"/>
                </span>
            </div>
            <span
                className={cn(
                    "absolute right-5 top-1/2 size-12 -translate-y-1/2 rotate-[18deg] rounded-2xl bg-gradient-to-br from-canvas/60 to-canvas/15 shadow-[0_10px_20px_-8px_rgb(0_0_0/0.5)] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110 motion-reduce:transition-none",
                    EASE
                )}
            />
        </div>
    </Scene>
);

/* ------------------------------------------------------------------- Other */

// Rows of syntax tokens: [width in px, color] for each line, with the indent as a leading gap.
const CODE_LINES: [number, [number, string][]][] = [
    [0, [[20, "bg-accent/70"], [26, "bg-ink/35"], [14, "bg-ink/15"]]],
    [8, [[16, "bg-violet-400/60"], [34, "bg-ink/30"]]],
    [8, [[22, "bg-ink/30"], [30, "bg-amber-500/60"]]],
    [16, [[12, "bg-accent/70"], [24, "bg-ink/25"]]],
    [0, [[8, "bg-ink/20"]]],
];

// A code block with a window bar and highlighted syntax. On hover the line highlight moves down the block.
const Code: Art = () => (
    <Scene>
        <Panel className="w-[168px] overflow-hidden">
            <div className="flex h-6 items-center gap-1 border-b border-hairline px-2.5">
                {["bg-[#ff5f57]/80", "bg-[#febc2e]/80", "bg-[#28c840]/80"].map((color) => (
                    <span key={color} className={cn("block size-1.5 rounded-full", color)}/>
                ))}
                <Line className="ml-2 w-10 bg-ink/25"/>
                <LuCopy className="ml-auto size-3 text-ink-subtle"/>
            </div>
            <div className="relative py-2">
                <span className={cn("absolute inset-x-0 top-2 h-[13px] translate-y-[13px] border-l-2 border-accent bg-accent/10 transition-transform duration-500 group-hover:translate-y-[39px] motion-reduce:transition-none", EASE)}/>
                {CODE_LINES.map(([indent, tokens], line) => (
                    <div key={line} className="relative flex h-[13px] items-center px-2.5">
                        <span className="w-3 font-mono text-[7px] leading-none text-ink-subtle">{line + 1}</span>
                        <span className="flex items-center gap-1" style={{paddingLeft: indent}}>
                            {tokens.map(([width, color], index) => (
                                <span key={index} className={cn("block h-[4px] rounded-full", color)} style={{width}}/>
                            ))}
                        </span>
                    </div>
                ))}
            </div>
        </Panel>
    </Scene>
);

// Two command snippets with copy buttons. On hover the first copy icon turns into a check.
const Snippet: Art = () => (
    <Scene>
        <div className="w-[164px] space-y-2">
            <div className="flex h-8 items-center gap-2 rounded-lg bg-ink/[0.06] pl-3 pr-1.5">
                <span className="font-mono text-[10px] font-semibold text-accent">$</span>
                <Line className="w-16 bg-ink/35"/>
                <Line className="w-8 bg-ink/20"/>
                <span className="relative ml-auto flex size-5 items-center justify-center rounded-md border border-hairline-strong bg-surface text-ink-muted">
                    <LuCopy className="size-3 transition-[opacity,transform] duration-300 group-hover:scale-50 group-hover:opacity-0 motion-reduce:transition-none"/>
                    <LuCheck className={cn("absolute size-3 scale-50 text-accent opacity-0 transition-[opacity,transform] duration-300 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none", EASE)}/>
                </span>
            </div>
            <div className="flex h-8 items-center gap-2 rounded-lg border border-hairline-strong bg-surface pl-3 pr-1.5">
                <span className="font-mono text-[10px] font-semibold text-ink-subtle">$</span>
                <Line className="w-12 bg-ink/35"/>
                <Line className="w-10 bg-ink/20"/>
                <span className="ml-auto flex size-5 items-center justify-center rounded-md text-ink-subtle">
                    <LuCopy className="size-3"/>
                </span>
            </div>
        </div>
    </Scene>
);

/* ------------------------------------------------------------------- Media */

// A turntable with a record and a tonearm. On hover the tonearm swings onto the record and the platter spins.
const MediaPlayers: Art = () => (
    <Scene>
        <Panel className="relative h-[96px] w-[128px] rounded-xl bg-raised">
            <span
                className={cn(
                    "absolute left-2.5 top-2.5 flex size-[76px] items-center justify-center rounded-full bg-[repeating-radial-gradient(circle,#1f2229_0_1px,#121418_1px_3px)] shadow-[0_4px_10px_-4px_rgb(0_0_0/0.5)] ring-1 ring-ink/10 transition-transform duration-700 group-hover:rotate-[300deg] motion-reduce:transition-none",
                    EASE
                )}
            >
                <span className="relative size-6 rounded-full bg-accent">
                    <span className="absolute left-1/2 top-[3px] h-1.5 w-[2px] -translate-x-1/2 rounded-full bg-white/70"/>
                    <span className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#121418]"/>
                </span>
            </span>
            <span className="pointer-events-none absolute left-2.5 top-2.5 size-[76px] rounded-full bg-[conic-gradient(from_30deg,transparent_0_8%,rgb(255_255_255/0.09)_14%,transparent_22%_58%,rgb(255_255_255/0.09)_64%,transparent_72%)]"/>
            <span
                className={cn(
                    "absolute left-[109px] top-[14px] h-[58px] w-[3px] origin-top rotate-[4deg] rounded-full bg-ink/40 transition-transform duration-700 group-hover:rotate-[35deg] motion-reduce:transition-none",
                    EASE
                )}
            >
                <span className="absolute -left-[2px] bottom-0 h-2.5 w-[7px] rounded-sm bg-ink/60"/>
            </span>
            <span className="absolute left-[103px] top-[7px] size-4 rounded-full border border-hairline-strong bg-surface shadow-card"/>
            <span className="absolute bottom-2.5 right-2.5 size-2.5 rounded-full border border-hairline-strong bg-surface"/>
        </Panel>
    </Scene>
);

const art: Record<string, Art> = {
    "context-menu": ContextMenu,
    "skeleton": Skeleton,
    "tree-dropdown": TreeDropdown,
    "alert-message": AlertMessage,
    "dialog-message": DialogMessage,
    "testimonials": Testimonials,
    "loader": Loader,
    "notification": Notification,
    "toast": Toast,
    "expressive-feedback": ExpressiveFeedback,
    "badge": Badge,
    "table": Table,
    "redo-undo": RedoUndo,
    "github-activity-graph": GithubActivityGraph,
    "tooltip": Tooltip,
    "pie-chart": PieChart,
    "graph-chart": GraphChart,
    "timeline": Timeline,
    "calendar": Calendar,
    "data-sculptures": DataSculptures,
    "avatar-group": AvatarGroup,
    "stat-card": StatCard,
    "product-card": ProductCard,
    "ads-card": AdsCard,
    "code": Code,
    "snippet": Snippet,
    "media-players": MediaPlayers,
};

export default art;

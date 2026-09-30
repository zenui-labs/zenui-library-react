import {LuApple, LuArrowRight, LuCheck, LuChevronDown, LuColumns, LuCopy, LuEye, LuGithub, LuLayoutGrid, LuList, LuMinus, LuPencil, LuPlus, LuUpload, LuX} from "react-icons/lu";
import {Button, Dot, EASE, Heading, Line, Panel, Scene} from "../ArtKit.tsx";
import type {Art} from "../ArtKit.tsx";
import {cn} from "@utils/Style.ts";

// Text and icons that sit on an accent fill: white on the light theme, deep ink on the dark theme's bright accent.
const ON_ACCENT_TEXT = "text-white dark:text-[#04151a]";
const ON_ACCENT_LINE = "bg-white/85 dark:bg-[#04151a]/70";

// A labelled field whose caret blinks and whose focus ring grows in on hover.
const InputText: Art = () => (
    <Scene>
        <div className="w-[62%]">
            <Line className="w-10 bg-ink/30"/>
            <Panel className={cn("mt-2 flex h-8 items-center gap-1.5 px-2.5 transition-[box-shadow,border-color] duration-500 group-hover:border-accent group-hover:shadow-[0_0_0_3px_rgb(var(--accent)/0.18)] motion-reduce:transition-none", EASE)}>
                <Line className="w-14 bg-ink/35"/>
                <span className="h-3.5 w-px animate-pulse bg-accent motion-reduce:animate-none"/>
            </Panel>
            <Line className="mt-2 w-20"/>
        </div>
    </Scene>
);

// A required textarea with a resize grip. It grows taller on hover, as if dragged by the grip.
const InputTextarea: Art = () => (
    <Scene>
        <div className="w-[62%]">
            <div className="flex items-center gap-1">
                <Line className="w-12 bg-ink/30"/>
                <Dot className="size-1 bg-accent"/>
            </div>
            <Panel className={cn("relative mt-2 h-[50px] space-y-1.5 overflow-hidden px-2.5 py-2 transition-[height] duration-500 group-hover:h-[70px] motion-reduce:transition-none", EASE)}>
                <Line className="w-[88%] bg-ink/30"/>
                <Line className="w-[74%] bg-ink/30"/>
                <div className="flex items-center gap-1">
                    <Line className="w-[38%] bg-ink/30"/>
                    <span className="h-3 w-px animate-pulse bg-accent motion-reduce:animate-none"/>
                </div>
                <svg viewBox="0 0 10 10" className="absolute bottom-1 right-1 size-2.5">
                    <path d="M9 3 L3 9 M9 6.5 L6.5 9" strokeWidth="1.2" strokeLinecap="round" className="stroke-ink/30"/>
                </svg>
            </Panel>
            <Line className="ml-auto mt-2 w-8"/>
        </div>
    </Scene>
);

// A quantity stepper. The plus button presses and the value rolls up to the next number on hover.
const InputNumber: Art = () => (
    <Scene className="flex-col gap-2">
        <Line className="w-12 self-center bg-ink/30"/>
        <Panel className="flex h-10 items-center gap-1 p-1">
            <span className="flex size-8 items-center justify-center rounded-md border border-hairline text-ink/40">
                <LuMinus className="size-3.5"/>
            </span>
            <span className="relative h-5 w-12 overflow-hidden text-center font-mono text-[15px] font-medium leading-5 text-ink">
                <span className={cn("block transition-transform duration-500 group-hover:-translate-y-5 motion-reduce:transition-none", EASE)}>
                    <span className="block">12</span>
                    <span className="block text-accent">13</span>
                </span>
            </span>
            <span className={cn("flex size-8 items-center justify-center rounded-md bg-accent transition-transform duration-300 group-hover:scale-90 motion-reduce:transition-none", ON_ACCENT_TEXT, EASE)}>
                <LuPlus className="size-3.5"/>
            </span>
        </Panel>
    </Scene>
);

// A checklist of options. The middle box fills and its check mark draws in on hover.
const InputCheckbox: Art = () => (
    <Scene>
        <Panel className="w-[60%] space-y-2.5 p-3">
            {[0, 1, 2].map((index) => (
                <div key={index} className="flex items-center gap-2">
                    <span className={cn("relative size-3.5 shrink-0 overflow-hidden rounded-[4px] border", index === 0 ? "border-accent bg-accent" : "border-hairline-strong bg-surface")}>
                        {index === 1 && (
                            <span className={cn("absolute inset-0 scale-50 bg-accent opacity-0 transition-[transform,opacity] duration-300 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none", EASE)}/>
                        )}
                        {index < 2 && (
                            <svg viewBox="0 0 14 14" className="absolute inset-0">
                                <path
                                    d="M3.5 7.2 L6 9.6 L10.5 4.6"
                                    fill="none"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    pathLength={100}
                                    className={cn(
                                        "stroke-white [stroke-dasharray:100] dark:stroke-[#04151a]",
                                        index === 1 && "transition-[stroke-dashoffset] delay-100 duration-500 [stroke-dashoffset:100] group-hover:[stroke-dashoffset:0] motion-reduce:transition-none",
                                        EASE
                                    )}
                                />
                            </svg>
                        )}
                    </span>
                    <Line className={cn(index === 0 ? "w-16 bg-ink/35" : index === 1 ? "w-12 bg-ink/25" : "w-14")}/>
                </div>
            ))}
        </Panel>
    </Scene>
);

// A large pill switch beside two small ones. The big thumb slides across and the track fills on hover.
const InputSwitch: Art = () => (
    <Scene className="gap-6">
        <span className={cn("relative h-9 w-[68px] rounded-full bg-ink/15 p-1 transition-colors duration-500 group-hover:bg-accent motion-reduce:transition-none", EASE)}>
            <span className={cn("block size-7 rounded-full bg-surface shadow-[0_2px_6px_-1px_rgb(0_0_0/0.3)] transition-transform duration-500 group-hover:translate-x-8 motion-reduce:transition-none", EASE)}/>
        </span>
        <div className="space-y-3">
            {[true, false].map((on) => (
                <div key={String(on)} className="flex items-center gap-2">
                    <span className={cn("flex h-3.5 w-6 items-center rounded-[4px] p-0.5", on ? "justify-end bg-ink/40" : "bg-ink/15")}>
                        <span className="size-2.5 rounded-[3px] bg-surface"/>
                    </span>
                    <Line className={on ? "w-10 bg-ink/30" : "w-8"}/>
                </div>
            ))}
        </div>
    </Scene>
);

// A masked password field with a four-part strength meter. The meter's bars fill one by one on hover.
const StrongPassword: Art = () => (
    <Scene>
        <div className="w-[62%]">
            <Panel className="flex h-8 items-center gap-1 px-2.5">
                {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                    <Dot key={index} className="size-1.5 bg-ink/55"/>
                ))}
                <LuEye className="ml-auto size-3.5 text-ink/35"/>
            </Panel>
            <div className="mt-2.5 flex gap-1">
                {["", "delay-100", "delay-200", "delay-300"].map((delay, index) => (
                    <span key={index} className="relative h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
                        <span
                            className={cn(
                                "absolute inset-0 origin-left rounded-full bg-accent",
                                index === 0 ? "scale-x-100" : "scale-x-0 transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none",
                                delay,
                                EASE
                            )}
                        />
                    </span>
                ))}
            </div>
            <div className="mt-2.5 flex items-center gap-3">
                <span className="flex items-center gap-1.5"><Dot className="size-1.5 bg-accent"/><Line className="w-10"/></span>
                <span className="flex items-center gap-1.5"><Dot className="size-1.5"/><Line className="w-8"/></span>
            </div>
        </div>
    </Scene>
);

// A select with its menu open. The chevron flips and the highlight steps down to the next option on hover.
const InputSelect: Art = () => (
    <Scene>
        <div className="w-[58%]">
            <Panel className="flex h-7 items-center justify-between px-2.5">
                <Line className="w-14 bg-ink/35"/>
                <LuChevronDown className={cn("size-3.5 text-ink/40 transition-transform duration-500 group-hover:rotate-180 motion-reduce:transition-none", EASE)}/>
            </Panel>
            <Panel className="relative mt-1.5 p-1 shadow-float">
                <span className={cn("absolute inset-x-1 top-1 flex h-5 items-center justify-end rounded-md bg-accent/15 pr-1.5 transition-transform duration-500 group-hover:translate-y-5 motion-reduce:transition-none", EASE)}>
                    <LuCheck className="size-3 text-accent"/>
                </span>
                {["w-12", "w-16", "w-10"].map((width) => (
                    <div key={width} className="relative flex h-5 items-center px-1.5">
                        <Line className={cn(width, "bg-ink/30")}/>
                    </div>
                ))}
            </Panel>
        </div>
    </Scene>
);

// Three option tiles with radio dots. The selection moves from the first tile to the second on hover.
const InputRadio: Art = () => (
    <Scene className="gap-2">
        {[0, 1, 2].map((index) => (
            <Panel
                key={index}
                className={cn(
                    "w-[54px] p-2 transition-[border-color,box-shadow] duration-500 motion-reduce:transition-none",
                    index === 0 && "border-accent shadow-[0_0_0_3px_rgb(var(--accent)/0.15)] group-hover:border-hairline group-hover:shadow-card",
                    index === 1 && "group-hover:border-accent group-hover:shadow-[0_0_0_3px_rgb(var(--accent)/0.15)]",
                    EASE
                )}
            >
                <span
                    className={cn(
                        "relative block size-3 rounded-full border-[1.5px] transition-colors duration-500 motion-reduce:transition-none",
                        index === 0 ? "border-accent group-hover:border-hairline-strong" : index === 1 ? "border-hairline-strong group-hover:border-accent" : "border-hairline-strong"
                    )}
                >
                    {index < 2 && (
                        <span
                            className={cn(
                                "absolute inset-[2px] rounded-full bg-accent transition-transform duration-500 motion-reduce:transition-none",
                                index === 0 ? "scale-100 group-hover:scale-0" : "scale-0 group-hover:scale-100",
                                EASE
                            )}
                        />
                    )}
                </span>
                <Heading className="mt-3 w-7 bg-ink/35"/>
                <Line className="mt-1.5 w-9"/>
            </Panel>
        ))}
    </Scene>
);

// A slider with a value bubble over its handle. The handle glides along the track and the fill follows on hover.
const InputRange: Art = () => (
    <Scene>
        <div className="w-[66%]">
            <div className="relative h-1.5 rounded-full bg-ink/10">
                <span className={cn("absolute inset-0 origin-left scale-x-[0.3] rounded-full bg-accent transition-transform duration-700 group-hover:scale-x-[0.75] motion-reduce:transition-none", EASE)}/>
                <span className={cn("absolute inset-0 translate-x-[30%] transition-transform duration-700 group-hover:translate-x-[75%] motion-reduce:transition-none", EASE)}>
                    <span className="absolute left-0 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-surface shadow-card"/>
                    <span className="absolute bottom-4 left-0 flex h-4 -translate-x-1/2 items-center rounded-md bg-ink px-1.5">
                        <span className="block h-[4px] w-3.5 rounded-full bg-canvas/70"/>
                    </span>
                </span>
            </div>
            <div className="mt-3.5 flex justify-between px-px">
                {[0, 1, 2, 3, 4].map((index) => (
                    <span key={index} className="h-1.5 w-px bg-ink/25"/>
                ))}
            </div>
        </div>
    </Scene>
);

// A dashed drop zone with an upload icon. A file card drops into it and the border lights up on hover.
const InputFile: Art = () => (
    <Scene>
        <div className={cn("relative flex h-[82px] w-[60%] flex-col items-center justify-center rounded-[10px] border-[1.5px] border-dashed border-hairline-strong bg-surface/70 transition-colors duration-500 group-hover:border-accent group-hover:bg-accent/5 motion-reduce:transition-none", EASE)}>
            <LuUpload className="size-4 text-ink/40"/>
            <Line className="mt-2 w-16 bg-ink/25"/>
            <Line className="mt-1.5 w-10"/>
            <Panel
                className={cn(
                    "absolute -right-3 -top-4 h-9 w-7 rotate-12 px-1.5 pt-2 transition-transform duration-700 group-hover:-translate-x-[22px] group-hover:translate-y-[24px] group-hover:rotate-0 motion-reduce:transition-none",
                    EASE
                )}
            >
                <span className="absolute right-0 top-0 size-2 rounded-bl-[3px] border-b border-l border-hairline bg-canvas"/>
                <span className="block h-1.5 w-2.5 rounded-sm bg-accent"/>
                <Line className="mt-1.5 w-full"/>
                <Line className="mt-1 w-3"/>
            </Panel>
        </div>
    </Scene>
);

// A six-box code field waiting on the fourth digit. The last digits type themselves in, box by box, on hover.
const OtpInput: Art = () => (
    <Scene className="gap-1.5">
        {["4", "8", "1", "9", "2", "7"].map((digit, index) => (
            <span
                key={index}
                className={cn(
                    "relative flex h-9 w-6 items-center justify-center rounded-lg border bg-surface font-mono text-[13px] font-medium text-ink shadow-card",
                    index === 3 ? "border-accent shadow-[0_0_0_3px_rgb(var(--accent)/0.15)]" : "border-hairline"
                )}
            >
                {index < 3 ? digit : (
                    <>
                        <span
                            className={cn(
                                "translate-y-1 opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none",
                                index === 4 ? "delay-150" : index === 5 ? "delay-300" : "",
                                EASE
                            )}
                        >
                            {digit}
                        </span>
                        {index === 3 && <span className="absolute h-3.5 w-px animate-pulse bg-accent transition-opacity group-hover:opacity-0 motion-reduce:animate-none"/>}
                    </>
                )}
            </span>
        ))}
    </Scene>
);

// A machined knob and its LED arc. The knob turns and the arc fills on hover.
const TactileControls: Art = () => (
    <Scene className="gap-5">
        {[0, 1].map((index) => (
            <div key={index} className="relative size-[74px]">
                <svg viewBox="0 0 74 74" className="absolute inset-0">
                    <circle cx="37" cy="37" r="33" fill="none" strokeWidth="3" strokeDasharray="2 4.1" className="stroke-ink/15"/>
                    <circle
                        cx="37"
                        cy="37"
                        r="33"
                        fill="none"
                        strokeWidth="3"
                        strokeDasharray="2 4.1"
                        pathLength={100}
                        className={cn("stroke-accent transition-[stroke-dashoffset] duration-700 [stroke-dasharray:62_100] [stroke-dashoffset:40] group-hover:[stroke-dashoffset:10] motion-reduce:transition-none", EASE)}
                        style={{transformOrigin: "center", transform: "rotate(125deg)"}}
                    />
                </svg>
                <span
                    className={cn(
                        "absolute inset-[13px] rounded-full bg-[conic-gradient(from_0deg,#d4d8df,#f5f6f8,#9aa0aa,#eef0f3,#b9bec7,#f5f6f8,#d4d8df)] shadow-[0_6px_14px_-4px_rgb(0_0_0/0.45)] transition-transform duration-700 motion-reduce:transition-none dark:bg-[conic-gradient(from_0deg,#3a3f48,#6b717c,#23272e,#5a606a,#2d3139,#6b717c,#3a3f48)]",
                        index === 0 ? "-rotate-45 group-hover:rotate-[70deg]" : "rotate-12 group-hover:-rotate-[40deg]",
                        EASE
                    )}
                >
                    <span className="absolute left-1/2 top-1.5 h-3 w-[3px] -translate-x-1/2 rounded-full bg-ink/70"/>
                </span>
            </div>
        ))}
    </Scene>
);

// A mood slider with a drawn face. The handle slides right, the frown turns into a smile and the cheeks blush on hover.
const ExpressiveInputs: Art = () => (
    <Scene className="flex-col gap-3">
        <svg viewBox="0 0 56 56" className="size-14 drop-shadow-sm">
            <circle cx="28" cy="28" r="26" strokeWidth="1.5" className="fill-surface stroke-hairline-strong"/>
            {[15, 41].map((cx) => (
                <circle key={cx} cx={cx} cy="34" r="4" className={cn("fill-accent/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none", EASE)}/>
            ))}
            <circle cx="20" cy="24" r="2.2" className="fill-ink/70"/>
            <circle cx="36" cy="24" r="2.2" className="fill-ink/70"/>
            <path
                d="M19 36 Q28 43 37 36"
                fill="none"
                strokeWidth="2.2"
                strokeLinecap="round"
                className={cn("stroke-ink/70 -scale-y-100 transition-transform duration-700 group-hover:scale-y-100 motion-reduce:transition-none", EASE)}
                style={{transformBox: "fill-box", transformOrigin: "center"}}
            />
        </svg>
        <div className="relative h-1.5 w-[132px] rounded-full bg-ink/10">
            <span className={cn("absolute inset-0 origin-left scale-x-[0.2] rounded-full bg-accent transition-transform duration-700 group-hover:scale-x-[0.85] motion-reduce:transition-none", EASE)}/>
            <span className={cn("absolute inset-0 translate-x-[20%] transition-transform duration-700 group-hover:translate-x-[85%] motion-reduce:transition-none", EASE)}>
                <span className="absolute left-0 top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_3px_rgb(var(--accent)/0.2)]"/>
            </span>
        </div>
    </Scene>
);

// A field of tag chips with a caret. A new accent chip pops in before the caret on hover.
const TagInput: Art = () => (
    <Scene>
        <div className="w-[68%]">
            <Line className="w-10 bg-ink/30"/>
            <Panel className="mt-2 flex flex-wrap items-center gap-1.5 p-2">
                {["w-6", "w-9", "w-5"].map((width) => (
                    <span key={width} className="flex h-5 items-center gap-1 rounded-md border border-hairline bg-ink/[0.05] px-1.5">
                        <Line className={cn(width, "bg-ink/35")}/>
                        <LuX className="size-2.5 text-ink/35"/>
                    </span>
                ))}
                <span
                    className={cn(
                        "flex h-5 max-w-0 scale-75 items-center gap-1 overflow-hidden rounded-md border border-accent/40 bg-accent/15 px-0 opacity-0 transition-[max-width,opacity,transform,padding] duration-500 group-hover:max-w-[64px] group-hover:scale-100 group-hover:px-1.5 group-hover:opacity-100 motion-reduce:transition-none",
                        EASE
                    )}
                >
                    <Line className="w-7 shrink-0 bg-accent/70"/>
                    <LuX className="size-2.5 shrink-0 text-accent"/>
                </span>
                <span className="h-3.5 w-px animate-pulse bg-accent motion-reduce:animate-none"/>
            </Panel>
        </div>
    </Scene>
);

// Settings rows that read as plain text. The middle value turns into a focused field with a save tick on hover.
const InlineEdit: Art = () => (
    <Scene>
        <Panel className="w-[72%] divide-y divide-hairline">
            {[0, 1, 2].map((index) => (
                <div key={index} className="flex h-8 items-center justify-between gap-3 px-3">
                    <Line className={index === 1 ? "w-9 bg-ink/25" : "w-10"}/>
                    {index === 1 ? (
                        <span
                            className={cn(
                                "relative flex h-6 w-[84px] items-center gap-1 rounded-md border border-transparent px-1.5 transition-[border-color,box-shadow,background-color] duration-500 group-hover:border-accent group-hover:bg-canvas group-hover:shadow-[0_0_0_3px_rgb(var(--accent)/0.15)] motion-reduce:transition-none",
                                EASE
                            )}
                        >
                            <Line className="w-11 bg-ink/40"/>
                            <span className="h-3 w-px bg-accent opacity-0 transition-opacity duration-300 group-hover:animate-pulse group-hover:opacity-100 motion-reduce:animate-none"/>
                            <LuPencil className="absolute right-1.5 size-3 text-ink/35 transition-opacity duration-300 group-hover:opacity-0"/>
                            <LuCheck className={cn("absolute right-1.5 size-3 scale-50 text-accent opacity-0 transition-[transform,opacity] duration-300 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none", EASE)}/>
                        </span>
                    ) : (
                        <Line className={cn("mr-1.5 bg-ink/35", index === 0 ? "w-14" : "w-10")}/>
                    )}
                </div>
            ))}
        </Panel>
    </Scene>
);

// Three buttons, the primary one presses in on hover.
const NormalButton: Art = () => (
    <Scene className="gap-2">
        <Button accent className={cn("h-7 px-4 transition-transform duration-300 group-hover:scale-95 motion-reduce:transition-none", EASE)}/>
        <Button className="h-7 px-4"/>
        <span className="flex h-7 items-center gap-1.5 px-2">
            <Dot className="size-1.5 bg-accent"/>
            <Heading className="w-8 bg-ink/30"/>
        </span>
    </Scene>
);

// A stack of provider sign-in buttons: bordered, solid ink and accent. A sheen sweeps down the stack on hover.
const LoginButtons: Art = () => (
    <Scene>
        <div className="w-[62%] space-y-1.5">
            {[0, 1, 2].map((index) => (
                <span
                    key={index}
                    className={cn(
                        "relative flex h-7 items-center justify-center gap-2 overflow-hidden rounded-lg",
                        index === 0 && "border border-hairline-strong bg-surface",
                        index === 1 && "bg-ink",
                        index === 2 && "bg-accent"
                    )}
                >
                    {index === 0 && <span className="size-3 rounded-full bg-[conic-gradient(#e0685e_0_25%,#e8bf52_0_50%,#5aa872_0_75%,#5b8ee6_0)] [mask:radial-gradient(circle,transparent_2.5px,#000_3px)]"/>}
                    {index === 1 && <LuApple className="size-3.5 text-canvas"/>}
                    {index === 2 && <LuGithub className={cn("size-3.5", ON_ACCENT_TEXT)}/>}
                    <span className={cn("block h-[4px] w-14 rounded-full", index === 0 ? "bg-ink/30" : index === 1 ? "bg-canvas/70" : ON_ACCENT_LINE)}/>
                    <span
                        className={cn(
                            "absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent to-transparent transition-transform duration-700 group-hover:translate-x-[320%] motion-reduce:transition-none",
                            index === 0 ? "via-accent/20" : "via-white/30",
                            index === 1 ? "delay-100" : index === 2 ? "delay-200" : "",
                            EASE
                        )}
                    />
                </span>
            ))}
        </div>
    </Scene>
);

// A split button with a menu arrow. On hover it lifts and its menu of options drops open below it.
const DropdownButton: Art = () => (
    <Scene>
        <div className={cn("relative transition-transform duration-500 group-hover:-translate-y-9 motion-reduce:transition-none", EASE)}>
            <div className="flex h-8 overflow-hidden rounded-lg bg-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]">
                <span className="flex items-center px-3">
                    <span className={cn("block h-[4px] w-12 rounded-full", ON_ACCENT_LINE)}/>
                </span>
                <span className="flex w-7 items-center justify-center border-l border-white/25 dark:border-[#04151a]/20">
                    <LuChevronDown className={cn("size-3.5 transition-transform duration-500 group-hover:rotate-180 motion-reduce:transition-none", ON_ACCENT_TEXT, EASE)}/>
                </span>
            </div>
            <Panel
                className={cn(
                    "absolute left-0 top-10 w-[118px] origin-top -translate-y-1 scale-95 p-1 opacity-0 shadow-float transition-[transform,opacity] duration-500 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none",
                    EASE
                )}
            >
                {["w-12", "w-14", "w-10"].map((width, index) => (
                    <div key={width} className={cn("flex h-5 items-center gap-2 rounded-md px-1.5", index === 0 && "bg-ink/[0.06]")}>
                        <span className={cn("size-2.5 rounded-[3px]", index === 0 ? "bg-accent" : "bg-ink/20")}/>
                        <Line className={cn(width, index === 0 ? "bg-ink/35" : "bg-ink/25")}/>
                    </div>
                ))}
            </Panel>
        </div>
    </Scene>
);

// An outlined pill button. An accent fill grows out from its center and an arrow slides in on hover.
const AnimatedButton: Art = () => (
    <Scene>
        <span className="relative flex h-11 w-[148px] items-center justify-center overflow-hidden rounded-full border-[1.5px] border-accent bg-surface shadow-card">
            <span className={cn("absolute left-1/2 top-1/2 size-[164px] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-accent transition-transform duration-700 group-hover:scale-100 motion-reduce:transition-none", EASE)}/>
            <span className="relative flex items-center">
                <span className={cn("block h-[5px] w-14 rounded-full bg-accent/60 transition-colors duration-500 group-hover:bg-white/85 dark:group-hover:bg-[#04151a]/70 motion-reduce:transition-none", EASE)}/>
                <span className={cn("flex w-0 justify-end overflow-hidden opacity-0 transition-[width,opacity] duration-500 group-hover:w-5 group-hover:opacity-100 motion-reduce:transition-none", EASE)}>
                    <LuArrowRight className={cn("size-3.5 shrink-0", ON_ACCENT_TEXT)}/>
                </span>
            </span>
        </span>
    </Scene>
);

// A view switcher over a small billing toggle. The raised thumb slides from the first segment to the last on hover.
const SegmentedControl: Art = () => (
    <Scene className="flex-col gap-3">
        <div className="relative flex w-[176px] rounded-[10px] border border-hairline bg-ink/[0.05] p-1">
            <span className={cn("absolute bottom-1 left-1 top-1 w-[calc((100%-8px)/3)] rounded-md border border-hairline bg-surface shadow-card transition-transform duration-500 group-hover:translate-x-[200%] motion-reduce:transition-none", EASE)}/>
            {[LuLayoutGrid, LuList, LuColumns].map((Icon, index) => (
                <span key={index} className="relative flex h-7 flex-1 items-center justify-center gap-1.5">
                    <Icon
                        className={cn(
                            "size-3.5 transition-colors duration-500",
                            index === 0 ? "text-accent group-hover:text-ink/35" : index === 2 ? "text-ink/35 group-hover:text-accent" : "text-ink/35"
                        )}
                    />
                    <Line className={cn("w-4", index === 1 ? "bg-ink/20" : "bg-ink/30")}/>
                </span>
            ))}
        </div>
        <div className="flex rounded-full border border-hairline bg-surface p-0.5">
            <span className="flex h-5 items-center px-2.5"><Line className="w-7 bg-ink/25"/></span>
            <span className="flex h-5 items-center rounded-full bg-ink px-2.5"><span className="block h-[4px] w-7 rounded-full bg-canvas/70"/></span>
        </div>
    </Scene>
);

// A command field with a copy button. The icon swaps to a check and a small "Copied" tip pops up on hover.
const CopyButton: Art = () => (
    <Scene>
        <Panel className="flex h-9 w-[68%] items-center gap-2 pl-3 pr-1">
            <span className="font-mono text-[11px] font-medium leading-none text-accent">$</span>
            <Line className="w-8 bg-ink/40"/>
            <Line className="w-12 bg-ink/20"/>
            <span className="relative ml-auto flex size-7 items-center justify-center rounded-md border border-hairline bg-raised">
                <LuCopy className={cn("absolute size-3.5 text-ink/50 transition-[transform,opacity] duration-300 group-hover:scale-50 group-hover:opacity-0 motion-reduce:transition-none", EASE)}/>
                <LuCheck className={cn("absolute size-3.5 scale-50 text-accent opacity-0 transition-[transform,opacity] duration-300 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none", EASE)}/>
                <span
                    className={cn(
                        "absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-ink px-1.5 py-0.5 text-[9px] font-medium leading-tight text-canvas opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none",
                        EASE
                    )}
                >
                    Copied
                </span>
            </span>
        </Panel>
    </Scene>
);

const art: Record<string, Art> = {
    "input-text": InputText,
    "input-textarea": InputTextarea,
    "input-number": InputNumber,
    "input-checkbox": InputCheckbox,
    "input-switch": InputSwitch,
    "strong-password": StrongPassword,
    "input-select": InputSelect,
    "input-radio": InputRadio,
    "input-range": InputRange,
    "input-file": InputFile,
    "otp-input": OtpInput,
    "tactile-controls": TactileControls,
    "expressive-inputs": ExpressiveInputs,
    "tag-input": TagInput,
    "inline-edit": InlineEdit,
    "normal-button": NormalButton,
    "login-buttons": LoginButtons,
    "dropdown-button": DropdownButton,
    "animated-button": AnimatedButton,
    "segmented-control": SegmentedControl,
    "copy-button": CopyButton,
};

export default art;

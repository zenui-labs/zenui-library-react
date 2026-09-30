import type {CSSProperties} from "react";
import {
    LuArchive,
    LuBox,
    LuChevronDown,
    LuCloud,
    LuDatabase,
    LuFlame,
    LuGrab,
    LuHeart,
    LuLayoutGrid,
    LuList,
    LuMouse,
    LuMousePointer2,
    LuPaperclip,
    LuSearch,
    LuSend,
    LuSmile,
    LuThumbsUp,
    LuTrash2,
    LuTrendingUp,
    LuZap,
} from "react-icons/lu";
import {Button, Dot, EASE, Heading, Line, Panel, Scene} from "../ArtKit.tsx";
import type {Art} from "../ArtKit.tsx";
import {cn} from "@utils/Style.ts";

// A small landscape that stands in for a photo in the gallery, accordion and card thumbnails.
const Photo = ({className}: {className?: string}) => (
    <span className={cn("relative block overflow-hidden rounded-md bg-ink/10", className)}>
        <svg viewBox="0 0 40 30" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <circle cx="29" cy="9" r="3.5" className="fill-ink/20"/>
            <path d="M0 30 L12 15 L20 22 L28 12 L40 26 L40 30 Z" className="fill-ink/20"/>
        </svg>
    </span>
);

/* ---------------------------------------------------------------- Cards */

// A button with a preview panel that trails the pointer. The pointer moves on hover and the panel follows it.
const MagicCard: Art = () => (
    <Scene>
        <div className="relative h-[100px] w-[176px]">
            <Button accent className="absolute left-2 top-[72px] h-7 px-4"/>
            <Panel className={cn("absolute left-[44px] top-0 w-[92px] p-2 opacity-70 shadow-float transition-[transform,opacity] duration-700 group-hover:-translate-y-1 group-hover:translate-x-7 group-hover:opacity-100 motion-reduce:transition-none", EASE)}>
                <span className="block h-8 rounded-md bg-accent/20"/>
                <Line className="mt-1.5 w-14 bg-ink/30"/>
                <Line className="mt-1 w-10"/>
            </Panel>
            <LuMousePointer2 className={cn("absolute left-[58px] top-[80px] size-4 fill-ink text-surface transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:translate-x-7 motion-reduce:transition-none", EASE)}/>
        </div>
    </Scene>
);

// Swipeable list rows. On hover the middle row slides left and uncovers a delete action behind it.
const RevealCard: Art = () => (
    <Scene>
        <div className="flex w-[66%] max-w-[190px] flex-col gap-1.5">
            <Panel className="flex h-8 items-center gap-2 px-2.5 opacity-60">
                <Dot className="size-4"/>
                <Line className="w-16"/>
            </Panel>
            <div className="relative h-9 overflow-hidden rounded-[10px] bg-accent">
                <LuTrash2 className="absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-white dark:text-[#04151a]"/>
                <Panel className={cn("absolute inset-0 flex items-center gap-2 px-2.5 transition-transform duration-500 group-hover:-translate-x-11 motion-reduce:transition-none", EASE)}>
                    <Dot className="size-5 bg-ink/25"/>
                    <div className="flex flex-col gap-1">
                        <Line className="w-16 bg-ink/30"/>
                        <Line className="w-10"/>
                    </div>
                </Panel>
            </div>
            <Panel className="flex h-8 items-center gap-2 px-2.5 opacity-60">
                <Dot className="size-4"/>
                <Line className="w-12"/>
            </Panel>
        </div>
    </Scene>
);

// A card beside a pointer ringed by a magnetic field. On hover the card is pulled toward the pointer and tilts.
const MagnetCard: Art = () => (
    <Scene>
        <div className="relative h-[100px] w-[184px]">
            <span className="absolute left-[128px] top-[6px] size-14 rounded-full border border-dashed border-ink/15 transition-colors duration-500 group-hover:border-accent/50"/>
            <span className="absolute left-[142px] top-[20px] size-7 rounded-full border border-dashed border-ink/20 transition-colors duration-500 group-hover:border-accent/70"/>
            <LuMousePointer2 className="absolute left-[152px] top-[30px] size-4 fill-ink text-surface"/>
            <Panel className={cn("absolute left-3 top-4 w-[92px] p-2 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-5 group-hover:rotate-[7deg] motion-reduce:transition-none", EASE)}>
                <span className="block h-9 rounded-md bg-accent/20"/>
                <Heading className="mt-2 w-14"/>
                <Line className="mt-1.5 w-16"/>
            </Panel>
        </div>
    </Scene>
);

// A ticket with a perforated stub. On hover the stub tears away along the perforation.
const PaperEffects: Art = () => (
    <Scene>
        <div className="flex h-[72px] w-[180px] drop-shadow-[0_6px_10px_rgb(0_0_0/0.10)]">
            <div className="relative flex flex-1 flex-col justify-center gap-1.5 rounded-l-[10px] border border-r-0 border-hairline bg-surface px-3">
                <Line className="w-8 bg-accent"/>
                <Heading className="w-20"/>
                <Line className="w-14"/>
                <span className="absolute inset-y-2 right-0 w-px bg-[repeating-linear-gradient(to_bottom,rgb(var(--ink)/0.3)_0_3px,transparent_3px_6px)]"/>
            </div>
            <div className={cn("flex w-[50px] origin-bottom-left items-center justify-center gap-[2px] rounded-r-[10px] border border-l-0 border-hairline bg-surface transition-transform duration-500 group-hover:translate-x-2 group-hover:rotate-[9deg] motion-reduce:transition-none", EASE)}>
                {["w-[2px]", "w-px", "w-[3px]", "w-px", "w-[2px]", "w-[3px]", "w-px"].map((width, index) => (
                    <span key={index} className={cn("h-8 bg-ink/40", width)}/>
                ))}
            </div>
        </div>
    </Scene>
);

// A card with a beam running around its border, and a card whose spotlight glides across it on hover.
const GlowCards: Art = () => (
    <Scene className="gap-3">
        <div className="relative h-[92px] w-[84px] overflow-hidden rounded-[11px] bg-hairline p-px">
            <span
                className="absolute inset-[-40px] animate-spin [animation-duration:3.5s] motion-reduce:animate-none"
                style={{backgroundImage: "conic-gradient(from 0deg, transparent 0deg 260deg, rgb(var(--accent)) 340deg, transparent 360deg)"}}
            />
            <div className="relative flex h-full w-full flex-col justify-end gap-1.5 rounded-[10px] bg-surface p-2.5">
                <Dot className="mb-auto size-4 bg-accent/30"/>
                <Heading className="w-12"/>
                <Line className="w-14"/>
            </div>
        </div>
        <Panel className="relative flex h-[92px] w-[84px] flex-col justify-end gap-1.5 overflow-hidden p-2.5">
            <span className={cn("absolute -left-8 -top-8 size-20 rounded-full bg-accent/30 blur-xl transition-transform duration-700 group-hover:translate-x-14 group-hover:translate-y-10 motion-reduce:transition-none", EASE)}/>
            <Dot className="relative mb-auto size-4"/>
            <Heading className="relative w-12"/>
            <Line className="relative w-14"/>
        </Panel>
    </Scene>
);

// A card tilted in 3D with a strip of glare. On hover it tilts the other way and the glare sweeps across.
const TiltCard: Art = () => (
    <Scene className="[perspective:500px]">
        <Panel className={cn("relative h-[88px] w-[132px] overflow-hidden p-2.5 transition-[transform,box-shadow] duration-700 [transform:rotateX(10deg)_rotateY(16deg)] group-hover:shadow-float group-hover:[transform:rotateX(-8deg)_rotateY(-18deg)] motion-reduce:transition-none", EASE)}>
            <span className="block h-9 rounded-md bg-accent/20"/>
            <Heading className="mt-2 w-16"/>
            <Line className="mt-1.5 w-20"/>
            <span className={cn("absolute inset-y-[-10px] -left-12 w-10 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-[190px] motion-reduce:transition-none dark:via-white/15", EASE)}/>
        </Panel>
    </Scene>
);

// Two cards that flip over in 3D on hover and show their accent back side.
const FlipCards: Art = () => (
    <Scene className="gap-3 [perspective:600px]">
        {["", "delay-100"].map((delay, index) => (
            <div key={index} className={cn("relative h-[92px] w-[74px] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] motion-reduce:transition-none", delay, EASE)}>
                <Panel className="absolute inset-0 p-2 [backface-visibility:hidden]">
                    <Photo className="h-10"/>
                    <Heading className="mt-2 w-10"/>
                    <Line className="mt-1.5 w-12"/>
                </Panel>
                <div className="absolute inset-0 flex flex-col justify-end gap-1.5 rounded-[10px] bg-accent p-2.5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <span className="block h-[6px] w-10 rounded-full bg-white/85 dark:bg-[#04151a]/70"/>
                    <span className="block h-[4px] w-12 rounded-full bg-white/50 dark:bg-[#04151a]/40"/>
                </div>
            </div>
        ))}
    </Scene>
);

/* ---------------------------------------------------------------- Layouts */

// Bars of different heights in a shuffled order. On hover they slide into ascending order.
const SORT_BARS = [
    {height: "h-[40px]", move: "group-hover:translate-x-[48px]"},
    {height: "h-[70px]", move: "group-hover:translate-x-[72px]"},
    {height: "h-[25px]", move: "group-hover:-translate-x-[48px]"},
    {height: "h-[86px]", move: "group-hover:translate-x-[48px]", accent: true},
    {height: "h-[55px]", move: "group-hover:-translate-x-[24px]"},
    {height: "h-[32px]", move: "group-hover:-translate-x-[96px]"},
];

const SortingAnimation: Art = () => (
    <Scene>
        <div className="relative h-[92px] w-[148px] border-b border-hairline-strong">
            {SORT_BARS.map(({height, move, accent}, index) => (
                <span
                    key={index}
                    style={{left: index * 24 + 6}}
                    className={cn("absolute bottom-0 w-4 rounded-t-[4px] transition-transform duration-700 motion-reduce:transition-none", accent ? "bg-accent" : "bg-ink/20", height, move, EASE)}
                />
            ))}
        </div>
    </Scene>
);

// Four cards and a list/grid toggle. On hover the rows rearrange into a two by two grid and the toggle moves.
const SWITCH_ITEMS = [
    "top-[24px] group-hover:h-[32px] group-hover:w-[74px]",
    "top-[42px] delay-75 group-hover:left-[78px] group-hover:top-[24px] group-hover:h-[32px] group-hover:w-[74px]",
    "top-[60px] delay-100 group-hover:h-[32px] group-hover:w-[74px]",
    "top-[78px] delay-150 group-hover:left-[78px] group-hover:top-[60px] group-hover:h-[32px] group-hover:w-[74px]",
];

const LayoutSwitcher: Art = () => (
    <Scene>
        <div className="relative h-[94px] w-[152px]">
            <Heading className="absolute left-0 top-[6px] w-14"/>
            <div className="absolute right-0 top-0 flex h-[18px] items-center rounded-md border border-hairline bg-surface p-0.5">
                <span className={cn("absolute left-0.5 top-0.5 h-3 w-4 rounded-[4px] bg-accent/20 transition-transform duration-500 group-hover:translate-x-4 motion-reduce:transition-none", EASE)}/>
                <LuList className="relative size-4 p-0.5 text-ink-muted"/>
                <LuLayoutGrid className="relative size-4 p-0.5 text-ink-muted"/>
            </div>
            {SWITCH_ITEMS.map((position, index) => (
                <span
                    key={index}
                    className={cn(
                        "absolute left-0 flex h-[14px] w-[152px] items-center gap-1.5 rounded-md border border-hairline bg-surface px-1.5 transition-[left,top,width,height] duration-500 motion-reduce:transition-none",
                        position,
                        EASE
                    )}
                >
                    <Dot className={cn("size-1.5", index === 0 && "bg-accent")}/>
                    <Line className="h-1 w-10"/>
                </span>
            ))}
        </div>
    </Scene>
);

// A stack of cards with a grabbed top card. On hover the top card is swiped away and the next one moves up.
const DragAnimations: Art = () => (
    <Scene>
        <div className="relative -ml-12 h-[90px] w-[100px]">
            <Panel className="absolute inset-0 translate-y-3 scale-[0.86] opacity-50"/>
            <Panel className={cn("absolute inset-0 translate-y-1.5 scale-[0.93] p-2 transition-transform duration-500 group-hover:translate-y-0 group-hover:scale-100 motion-reduce:transition-none", EASE)}>
                <Photo className="h-10"/>
                <Heading className="mt-2 w-12"/>
            </Panel>
            <Panel className={cn("absolute inset-0 p-2 shadow-float transition-transform duration-500 group-hover:translate-x-[62px] group-hover:rotate-[14deg] motion-reduce:transition-none", EASE)}>
                <span className="block h-10 rounded-md bg-accent/25"/>
                <Heading className="mt-2 w-14"/>
                <Line className="mt-1.5 w-10"/>
                <LuGrab className="absolute bottom-3 right-3 size-4 text-ink"/>
            </Panel>
        </div>
    </Scene>
);

// Image panels side by side. On hover the open panel folds shut and the third panel opens with its caption.
const AnimatedAccordion: Art = () => (
    <Scene>
        <div className="flex h-[92px] w-[190px] gap-1.5">
            {[
                {grow: "flex-[4] group-hover:flex-[1]", caption: "opacity-100 group-hover:opacity-0", fill: "bg-accent/20"},
                {grow: "flex-[1]", caption: "opacity-0", fill: ""},
                {grow: "flex-[1] group-hover:flex-[4]", caption: "opacity-0 group-hover:opacity-100 delay-150", fill: "bg-ink/15"},
                {grow: "flex-[1]", caption: "opacity-0", fill: ""},
            ].map(({grow, caption, fill}, index) => (
                <div key={index} className={cn("relative min-w-0 overflow-hidden rounded-lg border border-hairline transition-[flex-grow] duration-700 motion-reduce:transition-none", grow, EASE)}>
                    <Photo className={cn("absolute inset-0 rounded-none", fill)}/>
                    <div className={cn("absolute inset-x-2 bottom-2 flex flex-col gap-1 transition-opacity duration-300", caption)}>
                        <Heading className="w-12 bg-ink/50"/>
                        <Line className="w-16 bg-ink/25"/>
                    </div>
                </div>
            ))}
        </div>
    </Scene>
);

// A dock of app icons under a window. On hover the icons grow around the pointer like a magnifier.
const Dock: Art = () => (
    <Scene>
        <div className="relative h-[104px] w-[196px]">
            <Panel className="absolute inset-x-5 top-0 h-[64px] p-2 opacity-60">
                <div className="flex gap-1">
                    <Dot className="size-1.5"/>
                    <Dot className="size-1.5"/>
                    <Dot className="size-1.5"/>
                </div>
                <Line className="mt-2 w-20"/>
            </Panel>
            <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 items-end gap-1.5 rounded-[14px] border border-hairline bg-surface/90 px-2 pb-1.5 pt-1.5 shadow-float backdrop-blur">
                {[
                    {size: "", fill: "bg-ink/15"},
                    {size: "group-hover:size-8", fill: "bg-ink/25"},
                    {size: "group-hover:size-[42px]", fill: "bg-accent"},
                    {size: "group-hover:size-8", fill: "bg-ink/20"},
                    {size: "", fill: "bg-ink/10"},
                ].map(({size, fill}, index) => (
                    <span key={index} className={cn("block size-6 rounded-[7px] transition-[width,height] duration-300 motion-reduce:transition-none", fill, size, EASE)}/>
                ))}
            </div>
        </div>
    </Scene>
);

// A row of small cards. On hover the first card grows out of its place into a detail dialog.
const ExpandableCard: Art = () => (
    <Scene>
        <div className="relative h-[96px] w-[184px]">
            <div className="absolute inset-x-0 top-[22px] flex gap-2 transition-opacity duration-500 group-hover:opacity-40">
                {["bg-accent/25", "", ""].map((fill, index) => (
                    <Panel key={index} className="h-[54px] flex-1 p-1.5">
                        <Photo className={cn("h-7", fill)}/>
                        <Line className="mt-1.5 w-8"/>
                    </Panel>
                ))}
            </div>
            <Panel className={cn("absolute inset-0 flex origin-[15%_52%] scale-[0.3] gap-2.5 p-2.5 opacity-0 shadow-overlay transition-[transform,opacity] duration-500 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none", EASE)}>
                <Photo className="h-full w-[68px] shrink-0 bg-accent/25"/>
                <div className="flex flex-1 flex-col gap-1.5 pt-1">
                    <Heading className="w-16"/>
                    <Line className="w-full"/>
                    <Line className="w-20"/>
                    <Button accent className="mt-auto self-start"/>
                </div>
            </Panel>
        </div>
    </Scene>
);

// A live feed. On hover a new item slides in on top and pushes the older ones down.
const AnimatedList: Art = () => (
    <Scene>
        <div className="relative h-[104px] w-[160px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
            <div className={cn("flex -translate-y-[36px] flex-col gap-1.5 transition-transform duration-500 group-hover:translate-y-0 motion-reduce:transition-none", EASE)}>
                <Panel className={cn("flex h-[30px] shrink-0 scale-90 items-center gap-2 border-accent/50 px-2 opacity-0 transition-[transform,opacity] duration-500 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none", EASE)}>
                    <Dot className="size-4 bg-accent"/>
                    <div className="flex flex-col gap-1">
                        <Line className="w-16 bg-ink/30"/>
                        <Line className="w-10"/>
                    </div>
                </Panel>
                {["w-14", "w-20", "w-12", "w-16"].map((width, index) => (
                    <Panel key={index} className="flex h-[30px] shrink-0 items-center gap-2 px-2">
                        <Dot className="size-4"/>
                        <div className="flex flex-col gap-1">
                            <Line className={cn("bg-ink/25", width)}/>
                            <Line className="w-8"/>
                        </div>
                    </Panel>
                ))}
            </div>
        </div>
    </Scene>
);

/* ---------------------------------------------------------------- Buttons */

// A social post with a Like action. On hover a reaction picker pops up above it, one reaction after another.
const REACTIONS = [
    {Icon: LuThumbsUp, color: "text-accent", delay: ""},
    {Icon: LuHeart, color: "text-rose-500 dark:text-rose-400", delay: "delay-75"},
    {Icon: LuSmile, color: "text-amber-500 dark:text-amber-400", delay: "delay-100"},
    {Icon: LuFlame, color: "text-orange-500 dark:text-orange-400", delay: "delay-150"},
];

const ReactionTrail: Art = () => (
    <Scene>
        <Panel className="relative w-[172px] p-2.5">
            <div className="flex items-center gap-1.5">
                <Dot className="size-4"/>
                <Line className="w-12 bg-ink/30"/>
            </div>
            <Line className="mt-2 w-full"/>
            <Line className="mt-1 w-24"/>
            <div className="mt-2.5 flex items-center gap-3 border-t border-hairline pt-2">
                <span className="flex items-center gap-1">
                    <LuThumbsUp className="size-3 text-accent"/>
                    <Line className="w-5 bg-accent/60"/>
                </span>
                <Line className="w-8"/>
                <Line className="w-6"/>
            </div>
            <div className={cn("absolute bottom-[26px] left-1.5 flex origin-bottom-left translate-y-1 scale-90 gap-1 rounded-full border border-hairline bg-surface p-1 opacity-0 shadow-float transition-[transform,opacity] duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none", EASE)}>
                {REACTIONS.map(({Icon, color, delay}, index) => (
                    <span key={index} className={cn("grid size-6 translate-y-2 place-items-center rounded-full bg-ink/5 opacity-0 transition-[transform,opacity] duration-500 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none", delay, EASE)}>
                        <Icon className={cn("size-3.5", color)}/>
                    </span>
                ))}
            </div>
        </Panel>
    </Scene>
);

// A row of overlapping avatars. On hover the middle avatar lifts and a name tooltip springs in above it.
const HoverEffects: Art = () => (
    <Scene>
        <div className="relative pt-10">
            <span className={cn("absolute left-1/2 top-0 flex -translate-x-1/2 translate-y-2 scale-75 flex-col gap-1 rounded-md bg-ink px-2.5 py-1.5 opacity-0 shadow-float transition-[transform,opacity] duration-500 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none", EASE)}>
                <span className="block h-[5px] w-12 rounded-full bg-canvas/80"/>
                <span className="block h-[4px] w-8 rounded-full bg-canvas/40"/>
                <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-ink"/>
            </span>
            <div className="flex -space-x-2">
                {["bg-ink/15", "bg-ink/25", "bg-accent/40", "bg-ink/20", "bg-ink/10"].map((fill, index) => (
                    <span
                        key={index}
                        className={cn(
                            "relative block size-9 overflow-hidden rounded-full ring-2 ring-canvas",
                            fill,
                            index === 2 && cn("z-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 motion-reduce:transition-none", EASE)
                        )}
                    >
                        <span className="absolute left-1/2 top-[9px] size-3 -translate-x-1/2 rounded-full bg-surface/60"/>
                        <span className="absolute -bottom-2 left-1/2 h-4 w-6 -translate-x-1/2 rounded-full bg-surface/60"/>
                    </span>
                ))}
            </div>
        </div>
    </Scene>
);

// A primary button with a shimmer passing over it. On hover it presses in and bursts into confetti.
const CONFETTI = [
    {move: "group-hover:-translate-x-[58px] group-hover:-translate-y-[24px] group-hover:-rotate-[30deg]", color: "bg-accent", shape: "h-1 w-2"},
    {move: "group-hover:-translate-x-[40px] group-hover:-translate-y-[36px] group-hover:rotate-[40deg]", color: "bg-amber-400", shape: "size-1.5"},
    {move: "group-hover:-translate-x-[14px] group-hover:-translate-y-[42px] group-hover:rotate-[12deg]", color: "bg-ink/40", shape: "h-1 w-2"},
    {move: "group-hover:translate-x-[16px] group-hover:-translate-y-[40px] group-hover:-rotate-[40deg]", color: "bg-rose-400", shape: "h-2 w-1"},
    {move: "group-hover:translate-x-[42px] group-hover:-translate-y-[32px] group-hover:rotate-[25deg]", color: "bg-accent", shape: "size-1.5 rounded-full"},
    {move: "group-hover:translate-x-[60px] group-hover:-translate-y-[16px] group-hover:-rotate-[15deg]", color: "bg-amber-400", shape: "h-1 w-2"},
    {move: "group-hover:-translate-x-[54px] group-hover:translate-y-[22px] group-hover:rotate-[50deg]", color: "bg-rose-400", shape: "size-1.5 rounded-full"},
    {move: "group-hover:translate-x-[52px] group-hover:translate-y-[24px] group-hover:-rotate-[50deg]", color: "bg-ink/40", shape: "h-2 w-1"},
    {move: "group-hover:-translate-x-[24px] group-hover:translate-y-[34px] group-hover:rotate-[20deg]", color: "bg-accent", shape: "h-1 w-2"},
    {move: "group-hover:translate-x-[26px] group-hover:translate-y-[36px] group-hover:rotate-[60deg]", color: "bg-amber-400", shape: "size-1.5"},
];

const InteractiveButtons: Art = () => (
    <Scene>
        <div className="relative">
            {CONFETTI.map(({move, color, shape}, index) => (
                <span
                    key={index}
                    className={cn("absolute left-1/2 top-1/2 block scale-0 rounded-[1px] opacity-0 transition-[transform,opacity] duration-700 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none", color, shape, move, EASE)}
                />
            ))}
            <Button accent className={cn("relative h-9 overflow-hidden rounded-lg px-6 transition-transform duration-300 group-hover:scale-95 motion-reduce:transition-none", EASE)}>
                <span className="absolute inset-y-0 left-0 w-1/3 animate-slide-x bg-gradient-to-r from-transparent via-white/40 to-transparent [animation-duration:2.4s] motion-reduce:animate-none"/>
                <span className="block h-[5px] w-12 rounded-full bg-white/85 dark:bg-[#04151a]/70"/>
            </Button>
        </div>
    </Scene>
);

// A switch, a like heart and a checkbox. On hover each one changes state in turn: flip, fill, tick.
const MicroInteractions: Art = () => (
    <Scene className="gap-2.5">
        <Panel className="grid size-[58px] place-items-center">
            <span className="relative block h-5 w-9 rounded-full bg-ink/15 transition-colors duration-300 group-hover:bg-accent motion-reduce:transition-none">
                <span className={cn("absolute left-0.5 top-0.5 size-4 rounded-full bg-surface shadow-card transition-transform duration-500 group-hover:translate-x-4 motion-reduce:transition-none", EASE)}/>
            </span>
        </Panel>
        <Panel className="grid size-[58px] place-items-center">
            <LuHeart className={cn("size-5 text-ink-subtle transition-[transform,color,fill] delay-100 duration-500 group-hover:scale-110 group-hover:fill-rose-500 group-hover:text-rose-500 motion-reduce:transition-none", EASE)}/>
        </Panel>
        <Panel className="grid size-[58px] place-items-center">
            <span className="block size-5 rounded-md border border-hairline-strong transition-colors delay-200 duration-300 group-hover:border-accent group-hover:bg-accent motion-reduce:transition-none">
                <svg viewBox="0 0 20 20" className="size-full">
                    <path
                        d="M5 10.5l3.2 3L15 6.5"
                        fill="none"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        pathLength={1}
                        className="stroke-white transition-[stroke-dashoffset] delay-300 duration-500 [stroke-dasharray:1] [stroke-dashoffset:1] group-hover:[stroke-dashoffset:0] motion-reduce:transition-none dark:stroke-[#04151a]"
                    />
                </svg>
            </span>
        </Panel>
    </Scene>
);

/* ---------------------------------------------------------------- Visuals */

// A word set in large letters. On hover a wave runs through it, letter by letter.
const WAVE = [
    "group-hover:-translate-y-1",
    "delay-75 group-hover:-translate-y-2.5",
    "delay-100 group-hover:-translate-y-3.5",
    "delay-150 group-hover:-translate-y-2.5",
    "delay-200 group-hover:-translate-y-1",
    "delay-300 group-hover:translate-y-0.5",
];

const TextEffects: Art = () => (
    <Scene>
        <div className="flex flex-col items-center gap-2.5">
            <div className="flex text-[34px] font-semibold leading-none tracking-display text-ink">
                {"Motion".split("").map((letter, index) => (
                    <span key={index} className={cn("inline-block transition-transform duration-500 motion-reduce:transition-none", index === 2 && "text-accent", WAVE[index], EASE)}>
                        {letter}
                    </span>
                ))}
            </div>
            <Line className="w-24"/>
        </div>
    </Scene>
);

// A field of short lines like iron filings. On hover they turn away from the pointer, rippling outward.
const FIELD = Array.from({length: 45}, (_, index) => {
    const x = (index % 9) * 20;
    const y = Math.floor(index / 9) * 20;
    const distance = Math.hypot(x - 110, y - 40);
    return {x, y, near: distance < 42, angle: Math.round((Math.atan2(y - 40, x - 110) * 180) / Math.PI), delay: Math.round(distance * 4)};
});

const BackgroundAnimations: Art = () => (
    <Scene>
        <Panel className="relative h-[104px] w-[192px] overflow-hidden">
            <div className="absolute left-[16px] top-[12px]">
                {FIELD.map(({x, y, near, angle, delay}, index) => (
                    <span
                        key={index}
                        style={{left: x, top: y, transitionDelay: `${delay}ms`, "--to": `rotate(${angle}deg)${near ? " scale(1.5)" : ""}`} as CSSProperties}
                        className={cn(
                            "absolute -ml-[5px] -mt-px block h-[2px] w-2.5 rounded-full bg-ink/25 transition-[transform,background-color] duration-700 [transform:rotate(-35deg)] group-hover:[transform:var(--to)] motion-reduce:transition-none",
                            near && "group-hover:bg-accent",
                            EASE
                        )}
                    />
                ))}
                <span className="absolute left-[106px] top-[36px] size-2 rounded-full bg-accent opacity-0 shadow-[0_0_0_4px_rgb(var(--accent)/0.2)] transition-opacity duration-300 group-hover:opacity-100"/>
            </div>
        </Panel>
    </Scene>
);

// A chat thread with a message input. On hover a new message pops in and the thread scrolls up.
const ChatScreen: Art = () => (
    <Scene>
        <Panel className="flex h-[112px] w-[172px] flex-col overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-hairline px-2 py-1.5">
                <Dot className="size-3.5 bg-ink/25"/>
                <Line className="w-12 bg-ink/30"/>
                <Dot className="ml-auto size-1.5 bg-emerald-500"/>
            </div>
            <div className="relative flex-1 overflow-hidden">
                <div className={cn("absolute inset-x-2 bottom-1.5 flex translate-y-[23px] flex-col gap-1.5 transition-transform duration-500 group-hover:translate-y-0 motion-reduce:transition-none", EASE)}>
                    <span className="flex flex-col gap-1 self-start rounded-lg rounded-bl-sm bg-ink/10 px-2 py-1.5">
                        <Line className="w-16 bg-ink/25"/>
                        <Line className="w-10 bg-ink/25"/>
                    </span>
                    <span className="self-end rounded-lg rounded-br-sm bg-accent/20 px-2 py-1.5">
                        <Line className="w-14 bg-accent/60"/>
                    </span>
                    <span className={cn("origin-bottom-right scale-75 self-end rounded-lg rounded-br-sm bg-accent px-2 py-1.5 opacity-0 transition-[transform,opacity] duration-500 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none", EASE)}>
                        <span className="block h-[5px] w-10 rounded-full bg-white/85 dark:bg-[#04151a]/70"/>
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-1.5 border-t border-hairline px-2 py-1.5">
                <LuPaperclip className="size-3 text-ink-subtle"/>
                <Line className="flex-1"/>
                <span className="grid size-4 place-items-center rounded-full bg-accent">
                    <LuSend className="size-2 text-white dark:text-[#04151a]"/>
                </span>
            </div>
        </Panel>
    </Scene>
);

// A dropdown trigger and its menu. On hover the chevron turns and the items drop in sharply one after another.
const DropdownAnimations: Art = () => (
    <Scene>
        <div className="relative h-[104px] w-[132px]">
            <Button className="absolute inset-x-0 top-0 h-7 justify-between px-2.5">
                <Line className="w-12 bg-ink/30"/>
                <LuChevronDown className={cn("size-3 text-ink-subtle transition-transform duration-300 group-hover:rotate-180 motion-reduce:transition-none", EASE)}/>
            </Button>
            <Panel className="absolute inset-x-0 top-[34px] p-1 shadow-float">
                {["w-14", "w-16", "w-10", "w-12"].map((width, index) => (
                    <span
                        key={index}
                        className={cn(
                            "flex h-[15px] -translate-y-1.5 items-center gap-1.5 rounded px-1.5 opacity-25 blur-[1.5px] transition-[opacity,transform,filter] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-[0px] motion-reduce:transition-none",
                            ["", "delay-75", "delay-150", "delay-200"][index],
                            index === 1 && "bg-accent/15",
                            EASE
                        )}
                    >
                        <Dot className={cn("size-1.5", index === 1 && "bg-accent")}/>
                        <Line className={cn(width, index === 1 && "bg-accent/60")}/>
                    </span>
                ))}
            </Panel>
        </div>
    </Scene>
);

// An overflowing tab bar above its panel. On hover the tabs scroll sideways and the active tab moves along.
const MouseNavigations: Art = () => (
    <Scene>
        <div className="w-[180px]">
            <div className="rounded-lg border border-hairline bg-surface p-1">
                <div className="overflow-hidden [mask-image:linear-gradient(to_right,black_80%,transparent)]">
                    <div className={cn("flex w-max gap-1 transition-transform duration-700 group-hover:-translate-x-[72px] motion-reduce:transition-none", EASE)}>
                        {["w-8", "w-10", "w-6", "w-9", "w-7", "w-10", "w-8"].map((width, index) => (
                            <span
                                key={index}
                                className={cn(
                                    "flex h-5 shrink-0 items-center rounded-md px-2 transition-colors duration-500",
                                    index === 0 && "bg-accent/15 group-hover:bg-transparent",
                                    index === 3 && "group-hover:bg-accent/15"
                                )}
                            >
                                <Line className={cn(width, (index === 0 || index === 3) && "bg-ink/35")}/>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <Panel className="relative mt-2 h-[52px] p-2.5">
                <Heading className="w-16"/>
                <Line className="mt-2 w-24"/>
                <span className="absolute bottom-2 right-2.5 flex flex-col items-center">
                    <LuMouse className="size-4 text-ink-subtle"/>
                    <span className="mt-0.5 block size-1 animate-bounce rounded-full bg-accent motion-reduce:animate-none"/>
                </span>
            </Panel>
        </div>
    </Scene>
);

// A grid of photos. On hover one photo lifts forward and the others blur and fade.
const GalleryView: Art = () => (
    <Scene>
        <div className="grid grid-cols-3 gap-1.5">
            {Array.from({length: 6}, (_, index) => (
                <Photo
                    key={index}
                    className={cn(
                        "h-[40px] w-[54px] transition-[transform,filter,opacity,box-shadow] duration-500 motion-reduce:transition-none",
                        index === 4
                            ? "z-10 bg-accent/25 group-hover:scale-[1.18] group-hover:shadow-float group-hover:ring-2 group-hover:ring-accent"
                            : "group-hover:opacity-50 group-hover:blur-[2px]",
                        EASE
                    )}
                />
            ))}
        </div>
    </Scene>
);

// A search field with recent chips. On hover the placeholder hint slides up and the next one takes its place.
const SearchPlaceholder: Art = () => (
    <Scene>
        <div className="w-[72%] max-w-[196px]">
            <Panel className="flex h-9 items-center gap-2 rounded-full px-3">
                <LuSearch className="size-3.5 shrink-0 text-ink-subtle"/>
                <span className="h-3.5 w-px shrink-0 animate-pulse bg-accent motion-reduce:animate-none"/>
                <span className="relative h-[14px] flex-1 overflow-hidden">
                    <span className={cn("flex flex-col transition-transform duration-500 group-hover:-translate-y-[14px] motion-reduce:transition-none", EASE)}>
                        <span className="flex h-[14px] items-center transition-opacity duration-300 group-hover:opacity-0">
                            <Line className="w-20"/>
                        </span>
                        <span className="flex h-[14px] items-center">
                            <Line className="w-14 bg-ink/25"/>
                        </span>
                    </span>
                </span>
                <span className="shrink-0 rounded border border-hairline px-1 py-0.5">
                    <Line className="h-1 w-3"/>
                </span>
            </Panel>
            <div className="mt-2.5 flex gap-1.5 px-2">
                {["w-8", "w-10", "w-6"].map((width, index) => (
                    <span key={index} className="rounded-full border border-hairline bg-surface px-2 py-1">
                        <Line className={cn("h-1", width)}/>
                    </span>
                ))}
            </div>
        </div>
    </Scene>
);

// Tags hanging on strings from a rail. On hover they swing on their strings, each by a different amount.
const TAGS = [
    {left: 18, string: 26, swing: "rotate-[3deg] group-hover:-rotate-[14deg]"},
    {left: 58, string: 42, swing: "-rotate-[2deg] delay-75 group-hover:rotate-[12deg]", accent: true},
    {left: 98, string: 20, swing: "rotate-[2deg] delay-100 group-hover:-rotate-[10deg]"},
    {left: 136, string: 34, swing: "-rotate-[3deg] delay-150 group-hover:rotate-[15deg]"},
];

const PhysicsPlayground: Art = () => (
    <Scene>
        <div className="relative h-[92px] w-[176px]">
            <span className="absolute inset-x-1 top-0 h-1 rounded-full bg-ink/30"/>
            {TAGS.map(({left, string, swing, accent}, index) => (
                <div key={index} style={{left}} className={cn("absolute top-1 flex origin-top flex-col items-center transition-transform duration-700 motion-reduce:transition-none", swing, EASE)}>
                    <span style={{height: string}} className="block w-px bg-ink/35"/>
                    <span className={cn("relative flex h-[34px] w-[24px] flex-col items-center gap-1 rounded-[5px] pt-1.5 shadow-card", accent ? "bg-accent" : "border border-hairline bg-surface")}>
                        <span className={cn("block size-1.5 rounded-full", accent ? "bg-white/70 dark:bg-[#04151a]/50" : "bg-ink/20")}/>
                        <span className={cn("mt-1 block h-[3px] w-3 rounded-full", accent ? "bg-white/70 dark:bg-[#04151a]/50" : "bg-ink/20")}/>
                    </span>
                </div>
            ))}
        </div>
    </Scene>
);

// Three sources wired through a hub to a destination. On hover light pulses travel along every wire.
const BEAM_PATHS = [
    {d: "M20 18 C55 18 55 50 90 50", delay: "delay-0"},
    {d: "M20 50 L90 50", delay: "delay-100"},
    {d: "M20 82 C55 82 55 50 90 50", delay: "delay-200"},
    {d: "M90 50 L160 50", delay: "delay-500"},
];

const AnimatedBeam: Art = () => (
    <Scene>
        <div className="relative h-[100px] w-[180px]">
            <svg viewBox="0 0 180 100" className="absolute inset-0">
                {BEAM_PATHS.map(({d, delay}, index) => (
                    <g key={index} fill="none" strokeLinecap="round">
                        <path d={d} strokeWidth="1.5" className="stroke-ink/15"/>
                        <path
                            d={d}
                            strokeWidth="2"
                            pathLength={100}
                            className={cn("stroke-accent transition-[stroke-dashoffset] duration-1000 [stroke-dasharray:22_100] [stroke-dashoffset:22] group-hover:[stroke-dashoffset:-100] motion-reduce:transition-none", delay, EASE)}
                        />
                    </g>
                ))}
            </svg>
            {[
                {Icon: LuDatabase, className: "left-[6px] top-[4px]"},
                {Icon: LuCloud, className: "left-[6px] top-[36px]"},
                {Icon: LuBox, className: "left-[6px] top-[68px]"},
                {Icon: LuArchive, className: "left-[146px] top-[36px]"},
            ].map(({Icon, className}, index) => (
                <span key={index} className={cn("absolute grid size-7 place-items-center rounded-full border border-hairline bg-surface shadow-card", className)}>
                    <Icon className="size-3.5 text-ink-muted"/>
                </span>
            ))}
            <span className="absolute left-[72px] top-[32px] grid size-9 place-items-center rounded-full border border-hairline-strong bg-surface shadow-float">
                <LuZap className="size-4 text-accent"/>
            </span>
        </div>
    </Scene>
);

// A hero section over a dot grid. On hover meteors streak across it at different speeds.
const METEORS = [
    {className: "left-[10px] top-[36px] duration-700", delay: ""},
    {className: "left-[50px] top-[70px] duration-1000", delay: "delay-100"},
    {className: "-left-[20px] top-[104px] duration-700", delay: "delay-200"},
    {className: "left-[30px] top-[136px] duration-1000", delay: "delay-75"},
];

const AmbientBackgrounds: Art = () => (
    <Scene>
        <Panel className="relative flex h-[104px] w-[188px] flex-col items-center justify-center gap-2 overflow-hidden bg-[radial-gradient(rgb(var(--ink)/0.14)_1px,transparent_1px)] [background-size:10px_10px]">
            <div className="absolute inset-[-40px] rotate-[32deg]">
                {METEORS.map(({className, delay}, index) => (
                    <span
                        key={index}
                        className={cn("absolute block h-[1.5px] w-14 rounded-full bg-gradient-to-l from-accent via-accent/40 to-transparent transition-transform group-hover:translate-x-[150px] motion-reduce:transition-none", className, delay, EASE)}
                    />
                ))}
            </div>
            <Heading className="relative h-[9px] w-24 bg-ink/50"/>
            <Line className="relative w-16"/>
        </Panel>
    </Scene>
);

// An article with a reading progress bar and a scrollbar. On hover the page scrolls, the bar fills and a block reveals.
const ScrollAnimations: Art = () => (
    <Scene>
        <Panel className="relative h-[104px] w-[164px] overflow-hidden">
            <span className="absolute inset-x-0 top-0 z-10 h-[3px] bg-ink/5">
                <span className={cn("block h-full w-full origin-left scale-x-[0.25] bg-accent transition-transform duration-700 group-hover:scale-x-[0.8] motion-reduce:transition-none", EASE)}/>
            </span>
            <div className={cn("px-3 pr-5 pt-3.5 transition-transform duration-700 group-hover:-translate-y-[46px] motion-reduce:transition-none", EASE)}>
                <Heading className="w-20"/>
                <Line className="mt-2 w-full"/>
                <Line className="mt-1 w-24"/>
                <Photo className="mt-2 h-8 w-full"/>
                <Line className="mt-2 w-full"/>
                <Line className="mt-1 w-20"/>
                <span className={cn("mt-2.5 flex translate-y-2 gap-1.5 opacity-20 transition-[transform,opacity] delay-200 duration-700 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none", EASE)}>
                    <span className="block h-7 flex-1 rounded-md bg-accent/20"/>
                    <span className="block h-7 flex-1 rounded-md bg-ink/10"/>
                </span>
            </div>
            <span className="absolute bottom-2 right-1.5 top-2 w-[3px] rounded-full bg-ink/5">
                <span className={cn("block h-6 w-full rounded-full bg-ink/25 transition-transform duration-700 group-hover:translate-y-[58px] motion-reduce:transition-none", EASE)}/>
            </span>
        </Panel>
    </Scene>
);

// A cursor dot with a trailing ring. On hover the dot darts to the button and the ring follows late and grows.
const CursorEffects: Art = () => (
    <Scene>
        <div className="relative h-[96px] w-[184px]">
            <Heading className="absolute left-1 top-2 w-24"/>
            <Line className="absolute left-1 top-[22px] w-32"/>
            <Line className="absolute left-1 top-[32px] w-20"/>
            <Button className="absolute right-3 top-[56px] h-7 px-4"/>
            <span className={cn("absolute left-[36px] top-[58px] block size-6 rounded-full border-[1.5px] border-accent transition-[transform,background-color] delay-100 duration-700 group-hover:translate-x-[93px] group-hover:scale-[2.1] group-hover:bg-accent/10 motion-reduce:transition-none", EASE)}/>
            <span className={cn("absolute left-[44px] top-[66px] block size-2 rounded-full bg-accent transition-transform duration-300 group-hover:translate-x-[93px] motion-reduce:transition-none", EASE)}/>
        </div>
    </Scene>
);

// A bar chart and a donut. On hover the bars grow one after another and the donut fills further.
const CHART_BARS = [
    "scale-y-[0.3] group-hover:scale-y-[0.5]",
    "scale-y-[0.5] delay-75 group-hover:scale-y-[0.7]",
    "scale-y-[0.35] delay-100 group-hover:scale-y-[0.6]",
    "scale-y-[0.6] delay-150 group-hover:scale-y-[0.85]",
    "scale-y-[0.45] delay-200 group-hover:scale-y-100",
    "scale-y-[0.4] delay-300 group-hover:scale-y-[0.75]",
];

const AnimatedCharts: Art = () => (
    <Scene className="gap-5">
        <div className="flex h-[82px] items-end gap-1.5 border-b border-hairline-strong">
            {CHART_BARS.map((scale, index) => (
                <span
                    key={index}
                    className={cn("block h-full w-3.5 origin-bottom rounded-t-[3px] transition-transform duration-700 motion-reduce:transition-none", index === 4 ? "bg-accent" : "bg-ink/20", scale, EASE)}
                />
            ))}
        </div>
        <svg viewBox="0 0 64 64" className="size-[64px] -rotate-90">
            <circle cx="32" cy="32" r="24" fill="none" strokeWidth="9" className="stroke-ink/10"/>
            <circle
                cx="32"
                cy="32"
                r="24"
                fill="none"
                strokeWidth="9"
                pathLength={100}
                className={cn("stroke-accent transition-[stroke-dashoffset] duration-700 [stroke-dasharray:100] [stroke-dashoffset:62] group-hover:[stroke-dashoffset:28] motion-reduce:transition-none", EASE)}
            />
        </svg>
    </Scene>
);

/* ---------------------------------------------------------------- Text */

// A row of Nixie tubes showing a clock. On hover the clock rolls over from 12:59 to 13:00 with a warm glow.
const NIXIE = [
    {from: "1", to: "1"},
    {from: "2", to: "3"},
    {from: "5", to: "0", delay: "delay-100"},
    {from: "9", to: "0", delay: "delay-200"},
];

const NixieDigit = ({digit, className}: {digit: string; className?: string}) => (
    <span className={cn("absolute inset-0 flex items-center justify-center pt-1 font-mono text-[28px] font-light leading-none text-[#e8792b] [text-shadow:0_0_6px_rgb(255_130_40/0.75)] dark:text-[#ff9a4a]", className)}>
        {digit}
    </span>
);

const RetroDisplays: Art = () => (
    <Scene>
        <div className="flex flex-col items-center">
            <div className="flex items-end gap-1.5">
                {NIXIE.map(({from, to, delay}, index) => (
                    <div key={index} className="flex items-end gap-1.5">
                        {index === 2 && (
                            <span className="mb-5 flex flex-col gap-2">
                                <span className="block size-1 rounded-full bg-[#e8792b] shadow-[0_0_4px_rgb(255_130_40/0.8)] dark:bg-[#ff9a4a]"/>
                                <span className="block size-1 rounded-full bg-[#e8792b] shadow-[0_0_4px_rgb(255_130_40/0.8)] dark:bg-[#ff9a4a]"/>
                            </span>
                        )}
                        <span className="relative block h-[64px] w-[36px] overflow-hidden rounded-b-[6px] rounded-t-[18px] border border-hairline-strong bg-gradient-to-b from-ink/[0.04] to-ink/[0.12]">
                            <span className="absolute inset-0 bg-[linear-gradient(rgb(var(--ink)/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--ink)/0.06)_1px,transparent_1px)] bg-[length:4px_4px]"/>
                            <span className="absolute inset-0 flex items-center justify-center pt-1 font-mono text-[28px] font-light leading-none text-ink/10">8</span>
                            {from === to ? (
                                <NixieDigit digit={from}/>
                            ) : (
                                <>
                                    <NixieDigit digit={from} className={cn("transition-opacity duration-500 group-hover:opacity-0 motion-reduce:transition-none", delay)}/>
                                    <NixieDigit digit={to} className={cn("opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none", delay)}/>
                                </>
                            )}
                        </span>
                    </div>
                ))}
            </div>
            <span className="mt-1 block h-2 w-[176px] rounded-[3px] bg-ink/25"/>
        </div>
    </Scene>
);

// A price counter whose digits sit on rolling columns. On hover each column rolls to a new digit.
const DIGITS = "0123456789".split("");
const TICKER = [
    "-translate-y-[34px] group-hover:-translate-y-[136px]",
    "-translate-y-[68px] delay-75 group-hover:-translate-y-[238px]",
    "-translate-y-[136px] delay-100 group-hover:-translate-y-[306px]",
    "-translate-y-[272px] delay-150 group-hover:-translate-y-[68px]",
];

const NumberTicker: Art = () => (
    <Scene>
        <div className="flex flex-col items-center gap-2.5">
            <div className="flex items-center font-mono text-[30px] font-semibold leading-none tabular-nums tracking-heading text-ink">
                <span className="mr-0.5 text-[20px] text-ink-subtle">$</span>
                {TICKER.map((roll, index) => (
                    <span key={index} className="flex items-center">
                        {index === 1 && <span className="text-ink-subtle">,</span>}
                        <span className="block h-[34px] overflow-hidden">
                            <span className={cn("flex flex-col transition-transform duration-700 motion-reduce:transition-none", roll, EASE)}>
                                {DIGITS.map((digit) => (
                                    <span key={digit} className="flex h-[34px] items-center">{digit}</span>
                                ))}
                            </span>
                        </span>
                    </span>
                ))}
            </div>
            <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5">
                <LuTrendingUp className="size-3 text-accent"/>
                <Line className="w-6 bg-accent/60"/>
            </span>
        </div>
    </Scene>
);

// A headline with one changing word. On hover the word rolls to the next one letter by letter.
const WordRotate: Art = () => (
    <Scene>
        <div className="flex flex-col items-start gap-2">
            <Heading className="h-[9px] w-24"/>
            <div className="flex items-center gap-2">
                <Heading className="h-[9px] w-12"/>
                <span className="flex h-[30px] items-start overflow-hidden rounded-md bg-accent/10 px-1.5 text-[22px] font-semibold leading-none tracking-heading text-accent">
                    {["fb", "ao", "sl", "td"].map((pair, index) => (
                        <span
                            key={index}
                            className={cn("flex flex-col transition-transform duration-500 group-hover:-translate-y-[30px] motion-reduce:transition-none", ["", "delay-75", "delay-150", "delay-200"][index], EASE)}
                        >
                            <span className="flex h-[30px] shrink-0 items-center justify-center">{pair[0]}</span>
                            <span className="flex h-[30px] shrink-0 items-center justify-center">{pair[1]}</span>
                        </span>
                    ))}
                </span>
            </div>
            <Line className="mt-1 w-28"/>
        </div>
    </Scene>
);

// A headline whose words are still out of focus. On hover they sharpen one by one and a highlighter sweeps one word.
const HEADLINE = [
    ["w-10", "w-7", "w-12"],
    ["w-8", "w-14", "w-6"],
];
const BLUR_DELAYS = ["", "delay-75", "delay-150", "delay-200", "delay-300", "delay-500"];

const TextAnimations: Art = () => (
    <Scene>
        <div className="flex flex-col gap-2">
            {HEADLINE.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1.5">
                    {row.map((width, index) => (
                        <span key={index} className="relative block">
                            {rowIndex === 1 && index === 1 && (
                                <span className={cn("absolute -inset-x-1 -inset-y-[3px] origin-left scale-x-0 rounded-sm bg-accent/30 transition-transform delay-700 duration-500 group-hover:scale-x-100 motion-reduce:transition-none", EASE)}/>
                            )}
                            <span
                                className={cn(
                                    "relative block h-[10px] rounded-full bg-ink/45 opacity-30 blur-[2px] transition-[opacity,filter] duration-500 group-hover:opacity-100 group-hover:blur-[0px] motion-reduce:transition-none",
                                    width,
                                    BLUR_DELAYS[rowIndex * 3 + index],
                                    EASE
                                )}
                            />
                        </span>
                    ))}
                </div>
            ))}
            <Line className="mt-1.5 w-32"/>
            <Line className="w-24"/>
        </div>
    </Scene>
);

const art: Record<string, Art> = {
    // Cards
    "magic-card": MagicCard,
    "reveal-card": RevealCard,
    "magnet-card": MagnetCard,
    "paper-effects": PaperEffects,
    "glow-cards": GlowCards,
    "tilt-card": TiltCard,
    "flip-cards": FlipCards,
    // Layouts
    "sorting-animation": SortingAnimation,
    "layout-switcher": LayoutSwitcher,
    "drag-animations": DragAnimations,
    "animated-accordion": AnimatedAccordion,
    "dock": Dock,
    "expandable-card": ExpandableCard,
    "animated-list": AnimatedList,
    // Buttons
    "reaction-trail": ReactionTrail,
    "hover-effects": HoverEffects,
    "interactive-buttons": InteractiveButtons,
    "micro-interactions": MicroInteractions,
    // Visuals
    "text-effects": TextEffects,
    "background-animations": BackgroundAnimations,
    "chat-screen": ChatScreen,
    "dropdown-animations": DropdownAnimations,
    "mouse-navigations": MouseNavigations,
    "gallery-view": GalleryView,
    "search-placeholder": SearchPlaceholder,
    "physics-playground": PhysicsPlayground,
    "animated-beam": AnimatedBeam,
    "ambient-backgrounds": AmbientBackgrounds,
    "scroll-animations": ScrollAnimations,
    "cursor-effects": CursorEffects,
    "animated-charts": AnimatedCharts,
    // Text
    "retro-displays": RetroDisplays,
    "number-ticker": NumberTicker,
    "word-rotate": WordRotate,
    "text-animations": TextAnimations,
};

export default art;

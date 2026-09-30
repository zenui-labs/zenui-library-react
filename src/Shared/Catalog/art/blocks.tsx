import {Button, Dot, EASE, Heading, Line, Panel, Scene} from "../ArtKit.tsx";
import type {Art} from "../ArtKit.tsx";
import {cn} from "@utils/Style.ts";
import {LuCheck, LuInbox, LuPlus, LuQuote, LuSearch, LuStar} from "react-icons/lu";

// A page topped by a navbar with an active link. The mega menu drops down from the bar on hover.
const ResponsiveNavbar: Art = () => (
    <Scene>
        <Panel className="relative h-[104px] w-[200px] overflow-hidden">
            <div className="flex h-7 items-center gap-2.5 border-b border-hairline px-2.5">
                <Dot className="size-2.5 rounded-[4px] bg-ink/40"/>
                <span className="relative">
                    <Line className="w-6 bg-ink/40"/>
                    <span className="absolute -bottom-[11px] left-0 h-[2px] w-6 rounded-full bg-accent"/>
                </span>
                <Line className="w-5"/>
                <Line className="w-6"/>
                <Button className="ml-auto h-4 px-2"/>
            </div>
            <div className="flex flex-col items-center gap-1.5 pt-6">
                <Heading className="w-24 bg-ink/20"/>
                <Line className="w-16 bg-ink/10"/>
                <Line className="w-12 bg-ink/10"/>
            </div>
            <Panel
                className={cn(
                    "absolute left-6 top-8 flex w-[140px] gap-2 p-2 opacity-0 shadow-float transition-[opacity,transform] duration-500 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none",
                    EASE
                )}
            >
                {[0, 1].map((column) => (
                    <div key={column} className="flex flex-1 flex-col gap-1.5">
                        {[0, 1, 2].map((row) => (
                            <div key={row} className="flex items-center gap-1.5">
                                <Dot className={cn("size-2.5 rounded-[3px]", column === 0 && row === 0 ? "bg-accent" : "bg-ink/15")}/>
                                <Line className="w-8"/>
                            </div>
                        ))}
                    </div>
                ))}
            </Panel>
        </Panel>
    </Scene>
);

// A landing page hero with a headline and two calls to action. The product shot rises into view on hover.
const HeroSection: Art = () => (
    <Scene>
        <Panel className="relative h-[108px] w-[196px] overflow-hidden">
            <div className="flex items-center gap-2 px-2.5 pt-2">
                <Dot className="size-2 bg-ink/40"/>
                <Line className="ml-auto w-5 bg-ink/10"/>
                <Line className="w-5 bg-ink/10"/>
                <Line className="w-5 bg-ink/10"/>
            </div>
            <div className="mt-3 flex flex-col items-center gap-1.5">
                <Heading className="h-2 w-28 bg-ink/45"/>
                <Heading className="h-2 w-20 bg-ink/45"/>
                <Line className="w-24"/>
                <div className="mt-1 flex gap-1.5">
                    <Button accent className="h-4 px-2"/>
                    <Button className="h-4 px-2"/>
                </div>
            </div>
            <div
                className={cn(
                    "absolute inset-x-6 top-[92px] h-12 rounded-t-lg border border-b-0 border-hairline-strong bg-raised p-1.5 transition-transform duration-700 group-hover:-translate-y-4 motion-reduce:transition-none",
                    EASE
                )}
            >
                <div className="flex gap-1">
                    <Dot className="size-1.5"/>
                    <Dot className="size-1.5"/>
                    <Dot className="size-1.5"/>
                </div>
                <div className="mt-1.5 flex gap-1.5">
                    <span className="h-6 w-8 rounded bg-ink/10"/>
                    <span className="h-6 flex-1 rounded bg-ink/5"/>
                </div>
            </div>
        </Panel>
    </Scene>
);

// Three plans under a billing switch, the middle one highlighted. The switch flips to yearly and prices drop on hover.
const PricingSection: Art = () => (
    <Scene className="flex-col gap-2.5">
        <div className="flex items-center gap-1.5">
            <Line className="w-5"/>
            <span className={cn("relative h-3.5 w-6 rounded-full bg-ink/20 transition-colors duration-500 group-hover:bg-ink/45 motion-reduce:transition-none", EASE)}>
                <span className={cn("absolute left-0.5 top-0.5 size-2.5 rounded-full bg-surface shadow-card transition-transform duration-500 group-hover:translate-x-2.5 motion-reduce:transition-none", EASE)}/>
            </span>
            <Line className="w-5"/>
        </div>
        <div className="flex items-end gap-1.5">
            {[0, 1, 2].map((plan) => (
                <Panel
                    key={plan}
                    className={cn(
                        "flex w-[54px] flex-col gap-1.5 p-2",
                        plan === 1 ? "border-accent pb-2.5 shadow-[0_0_0_3px_rgb(var(--accent)/0.12)]" : ""
                    )}
                >
                    <Line className={cn("w-6", plan === 1 && "bg-accent")}/>
                    <Heading className={cn("h-2 w-8 transition-[width] duration-500 group-hover:w-5 motion-reduce:transition-none", EASE)}/>
                    <div className="mt-0.5 flex flex-col gap-1">
                        {[0, 1, 2].map((row) => (
                            <span key={row} className="flex items-center gap-1">
                                <Dot className={cn("size-1", plan === 1 ? "bg-accent" : "bg-ink/30")}/>
                                <Line className="h-[4px] w-6"/>
                            </span>
                        ))}
                    </div>
                    <Button accent={plan === 1} className="mt-0.5 h-3.5 px-1"/>
                </Panel>
            ))}
        </div>
    </Scene>
);

// The bottom of a page with a link-column footer. The footer slides up to reveal its social row on hover.
const ResponsiveFooter: Art = () => (
    <Scene>
        <Panel className="relative h-[106px] w-[200px] overflow-hidden">
            <div className="flex flex-col gap-1.5 p-2.5">
                <Line className="w-24 bg-ink/10"/>
                <Line className="w-16 bg-ink/10"/>
            </div>
            <div
                className={cn(
                    "absolute inset-x-0 bottom-0 border-t border-hairline bg-raised px-2.5 pt-2.5 transition-transform duration-500 translate-y-[18px] group-hover:translate-y-0 motion-reduce:transition-none",
                    EASE
                )}
            >
                <div className="flex gap-3">
                    <div className="flex w-[64px] flex-col gap-1.5">
                        <Dot className="size-2.5 rounded-[4px] bg-ink/40"/>
                        <span className="flex h-3.5 items-center gap-1 rounded border border-hairline-strong bg-surface pl-1 pr-0.5">
                            <Line className="h-[3px] w-6"/>
                            <span className="ml-auto h-2.5 w-4 rounded-[3px] bg-accent"/>
                        </span>
                    </div>
                    {[0, 1, 2].map((column) => (
                        <div key={column} className="flex flex-col gap-1.5">
                            <Line className="w-6 bg-ink/35"/>
                            <Line className="w-7"/>
                            <Line className="w-5"/>
                            <Line className="w-6"/>
                        </div>
                    ))}
                </div>
                <div className="mt-2.5 flex items-center border-t border-hairline pt-2">
                    <Line className="w-12"/>
                    <span className="ml-auto flex gap-1">
                        <Dot className="size-2 bg-ink/25"/>
                        <Dot className="size-2 bg-ink/25"/>
                        <Dot className="size-2 bg-ink/25"/>
                    </span>
                </div>
            </div>
        </Panel>
    </Scene>
);

// A hero with a hanging lamp over its headline. The cord is pulled and the warm light switches on on hover.
const InteractiveHeroes: Art = () => (
    <Scene>
        <Panel className="relative h-[106px] w-[196px] overflow-hidden">
            <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-ink/30"/>
            <span className="absolute left-1/2 top-3 h-4 w-11 -translate-x-1/2 rounded-t-full bg-ink/70"/>
            <span className="absolute left-1/2 top-[26px] size-2 -translate-x-1/2 rounded-full bg-ink/20 transition-colors duration-300 group-hover:bg-amber-300 motion-reduce:transition-none"/>
            <span
                className="absolute left-1/2 top-7 h-[78px] w-[150px] -translate-x-1/2 bg-gradient-to-b from-amber-300/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none dark:from-amber-300/25"
                style={{clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)"}}
            />
            <span className="absolute left-[calc(50%+16px)] top-[26px] flex flex-col items-center">
                <span className={cn("h-5 w-px bg-ink/35 transition-[height] duration-300 group-hover:h-8 motion-reduce:transition-none", EASE)}/>
                <span className="size-1.5 rounded-full bg-ink/50"/>
            </span>
            <div className="absolute inset-x-0 bottom-3 flex flex-col items-center gap-1.5">
                <Heading className="h-2 w-24 bg-ink/15 transition-colors duration-500 group-hover:bg-ink/55 motion-reduce:transition-none"/>
                <Line className="w-16 bg-ink/10 transition-colors duration-500 group-hover:bg-ink/25 motion-reduce:transition-none"/>
            </div>
        </Panel>
    </Scene>
);

// A contact section with a details column and a form. The message field fills with text on hover.
const ContactForm: Art = () => (
    <Scene>
        <Panel className="flex h-[108px] w-[200px] overflow-hidden">
            <div className="flex w-[62px] flex-col gap-2 border-r border-hairline bg-raised p-2.5">
                <Heading className="w-9"/>
                {[0, 1, 2].map((row) => (
                    <span key={row} className="flex items-center gap-1">
                        <Dot className="size-2 rounded-[3px] bg-ink/25"/>
                        <Line className="h-[4px] w-6"/>
                    </span>
                ))}
            </div>
            <div className="flex flex-1 flex-col gap-1 p-2.5">
                <div className="flex gap-1.5">
                    <span className="h-3.5 flex-1 rounded border border-hairline-strong"/>
                    <span className="h-3.5 flex-1 rounded border border-hairline-strong"/>
                </div>
                <span className="h-3.5 rounded border border-hairline-strong"/>
                <span className="flex h-7 flex-col gap-[3px] rounded border border-hairline-strong p-1.5">
                    {["group-hover:w-[90%]", "group-hover:w-[70%]", "group-hover:w-[45%]"].map((width, index) => (
                        <Line
                            key={width}
                            className={cn("h-[3px] w-0 bg-ink/30 transition-[width] duration-500 motion-reduce:transition-none", width, EASE)}
                            style={{transitionDelay: `${index * 150}ms`}}
                        />
                    ))}
                </span>
                <Button accent className="ml-auto h-4 px-2"/>
            </div>
        </Panel>
    </Scene>
);

// A form split into steps with a progress track. The track fills to the next step on hover.
const MultiStepForm: Art = () => (
    <Scene>
        <Panel className="w-[184px] p-2.5">
            <div className="flex items-center">
                <span className="flex size-4 items-center justify-center rounded-full bg-accent">
                    <LuCheck className="size-2.5 text-white dark:text-[#04151a]" strokeWidth={3}/>
                </span>
                <span className="h-[2px] flex-1 bg-accent"/>
                <span className="flex size-4 items-center justify-center rounded-full border-2 border-accent bg-surface">
                    <span className="size-1.5 rounded-full bg-accent"/>
                </span>
                <span className="relative h-[2px] flex-1 bg-ink/15">
                    <span className={cn("absolute inset-y-0 left-0 w-0 bg-accent transition-[width] duration-500 group-hover:w-full motion-reduce:transition-none", EASE)}/>
                </span>
                <span className="size-4 rounded-full border-2 border-ink/20 bg-surface transition-colors delay-300 duration-300 group-hover:border-accent motion-reduce:transition-none"/>
            </div>
            <div className="mt-2.5 flex flex-col gap-1.5">
                <span className="h-3.5 rounded border border-hairline-strong"/>
                <span className="h-3.5 rounded border border-hairline-strong"/>
            </div>
            <div className="mt-2 flex justify-between">
                <Button className="h-4 px-2"/>
                <Button accent className="h-4 px-2"/>
            </div>
        </Panel>
    </Scene>
);

// An envelope above an email field and subscribe button. A letter rises out of the envelope on hover.
const NewsletterForm: Art = () => (
    <Scene className="flex-col gap-3">
        <div className="relative mt-3 h-[38px] w-[62px]">
            <Panel
                className={cn(
                    "absolute inset-x-2 top-0 flex h-[32px] flex-col gap-1 rounded-md p-1.5 transition-transform duration-500 group-hover:-translate-y-3 motion-reduce:transition-none",
                    EASE
                )}
            >
                <Line className="h-[4px] w-7 bg-ink/35"/>
                <Line className="h-[4px] w-9"/>
            </Panel>
            <span className="absolute inset-x-0 bottom-0 h-[26px] overflow-hidden rounded-md border border-hairline-strong bg-raised">
                <svg viewBox="0 0 62 26" className="absolute inset-0 size-full">
                    <polyline points="0,0 31,15 62,0" fill="none" strokeWidth="1" className="stroke-ink/20"/>
                </svg>
            </span>
        </div>
        <div className="flex h-6 w-[164px] items-center rounded-full border border-hairline-strong bg-surface pl-3 pr-1 shadow-card">
            <Line className="w-14"/>
            <Button accent className="ml-auto h-4 rounded-full px-2"/>
        </div>
    </Scene>
);

// A 404 card with a link back home. The hanging zero swings on hover.
const NotFoundPage: Art = () => (
    <Scene>
        <Panel className="flex h-[104px] w-[180px] flex-col items-center justify-center gap-2">
            <span className="flex items-start font-mono text-[34px] font-semibold leading-none tracking-tight text-ink/80">
                <span>4</span>
                <span className={cn("inline-block origin-top text-accent transition-transform duration-700 group-hover:rotate-[22deg] motion-reduce:transition-none", EASE)}>0</span>
                <span>4</span>
            </span>
            <Line className="w-20"/>
            <Button className="h-4 px-2"/>
        </Panel>
    </Scene>
);

// A dashed empty state with an inbox icon and a create button. The ghost cards fan out from behind the icon on hover.
const EmptyPage: Art = () => (
    <Scene>
        <div className="flex h-[104px] w-[176px] flex-col items-center justify-center gap-2 rounded-[10px] border border-dashed border-hairline-strong bg-surface/60">
            <span className="relative flex size-8 items-center justify-center">
                <span className={cn("absolute size-6 rounded-md border border-hairline bg-surface -rotate-6 transition-transform duration-500 group-hover:-translate-x-3 group-hover:-rotate-[18deg] motion-reduce:transition-none", EASE)}/>
                <span className={cn("absolute size-6 rounded-md border border-hairline bg-surface rotate-6 transition-transform duration-500 group-hover:translate-x-3 group-hover:rotate-[18deg] motion-reduce:transition-none", EASE)}/>
                <span className="relative flex size-8 items-center justify-center rounded-full border border-hairline bg-raised">
                    <LuInbox className="size-3.5 text-ink/50"/>
                </span>
            </span>
            <Heading className="w-16 bg-ink/30"/>
            <Line className="w-24"/>
            <Button accent className="h-4 gap-1 px-2">
                <LuPlus className="size-2.5 text-white dark:text-[#04151a]" strokeWidth={3}/>
                <span className="block h-[4px] w-5 rounded-full bg-white/85 dark:bg-[#04151a]/70"/>
            </Button>
        </div>
    </Scene>
);

// A store promo grid with one big sale tile. The products grow in every tile on hover.
const OfferGrid: Art = () => (
    <Scene>
        <div className="grid h-[100px] w-[196px] grid-cols-3 grid-rows-2 gap-1.5">
            <div className="relative col-span-2 row-span-2 overflow-hidden rounded-[10px] border border-accent/30 bg-accent/10 p-2.5">
                <span className="block font-mono text-[18px] font-semibold leading-none text-accent">-40%</span>
                <Line className="mt-2 w-12 bg-ink/25"/>
                <Button accent className="mt-2 h-4 w-fit px-2"/>
                <span className={cn("absolute -bottom-3 -right-2 size-16 rounded-full bg-accent/25 transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none", EASE)}/>
                <span className={cn("absolute bottom-3 right-4 h-9 w-6 rounded-md bg-surface shadow-card transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6 motion-reduce:transition-none", EASE)}/>
            </div>
            {[0, 1].map((tile) => (
                <Panel key={tile} className="relative flex flex-col justify-between overflow-hidden p-1.5">
                    <Line className="w-6 bg-ink/30"/>
                    <span
                        className={cn(
                            "ml-auto size-6 bg-ink/15 transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none",
                            tile === 0 ? "rounded-full" : "rounded-md",
                            EASE
                        )}
                    />
                </Panel>
            ))}
        </div>
    </Scene>
);

// A product page with a gallery, swatches and sizes. The selection ring moves to the next swatch on hover.
const ProductDetailsPage: Art = () => (
    <Scene>
        <Panel className="flex h-[110px] w-[200px] gap-2.5 p-2.5">
            <div className="flex w-[78px] flex-col gap-1.5">
                <span className="relative flex flex-1 items-center justify-center rounded-md bg-raised">
                    <span className="h-9 w-7 rounded-lg bg-ink/15"/>
                    <span className="absolute bottom-2 h-1 w-8 rounded-full bg-ink/10"/>
                </span>
                <div className="flex gap-1">
                    {[0, 1, 2].map((thumb) => (
                        <span key={thumb} className={cn("h-4 flex-1 rounded bg-raised", thumb === 0 && "ring-1 ring-ink/30")}/>
                    ))}
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-1">
                <Line className="w-8"/>
                <Heading className="w-16"/>
                <Heading className="h-2 w-8 bg-ink/60"/>
                <div className="relative mt-0.5 flex gap-1.5">
                    {["bg-ink/70", "bg-ink/35", "bg-ink/15", "bg-surface border border-hairline-strong"].map((tone) => (
                        <span key={tone} className={cn("size-3 rounded-full", tone)}/>
                    ))}
                    <span className={cn("absolute -left-[3px] -top-[3px] size-[18px] rounded-full border-[1.5px] border-accent transition-transform duration-500 group-hover:translate-x-[18px] motion-reduce:transition-none", EASE)}/>
                </div>
                <div className="flex gap-1">
                    {[0, 1, 2].map((size) => (
                        <span key={size} className="h-3 w-4 rounded-[3px] border border-hairline-strong"/>
                    ))}
                </div>
                <span className="mt-auto flex h-4 items-center justify-center rounded-md bg-ink/85">
                    <span className="block h-[4px] w-8 rounded-full bg-canvas/70"/>
                </span>
            </div>
        </Panel>
    </Scene>
);

// A checkout page: billing fields beside an order summary. A shine sweeps across the pay button on hover.
const CheckoutPage: Art = () => (
    <Scene>
        <Panel className="flex h-[106px] w-[204px] overflow-hidden">
            <div className="flex flex-1 flex-col gap-1 p-2.5">
                <Line className="w-10 bg-ink/35"/>
                <div className="flex gap-1.5">
                    <span className="h-3.5 flex-1 rounded border border-hairline-strong"/>
                    <span className="h-3.5 flex-1 rounded border border-hairline-strong"/>
                </div>
                <span className="h-3.5 rounded border border-hairline-strong"/>
                <Line className="mt-1 w-12 bg-ink/35"/>
                <span className="flex h-4 items-center gap-1 rounded border border-hairline-strong px-1">
                    <span className="h-2 w-3 rounded-[2px] bg-ink/25"/>
                    <Line className="h-[3px] w-10"/>
                </span>
            </div>
            <div className="flex w-[78px] flex-col gap-1.5 border-l border-hairline bg-raised p-2">
                {[0, 1].map((item) => (
                    <span key={item} className="flex items-center gap-1">
                        <span className="size-4 rounded bg-ink/15"/>
                        <Line className="h-[4px] w-6"/>
                        <Line className="ml-auto h-[4px] w-3 bg-ink/30"/>
                    </span>
                ))}
                <span className="mt-auto flex items-center border-t border-hairline pt-1.5">
                    <Line className="h-[4px] w-6"/>
                    <Heading className="ml-auto h-[6px] w-5"/>
                </span>
                <span className="relative flex h-4 items-center justify-center overflow-hidden rounded-md bg-accent">
                    <span className="block h-[4px] w-7 rounded-full bg-white/85 dark:bg-[#04151a]/70"/>
                    <span className={cn("absolute inset-y-0 left-0 w-4 -translate-x-6 skew-x-[-20deg] bg-white/50 transition-transform duration-700 group-hover:translate-x-[80px] motion-reduce:transition-none", EASE)}/>
                </span>
            </div>
        </Panel>
    </Scene>
);

// A search field with an open results panel. The highlighted result steps down a row on hover.
const ResponsiveSearchBar: Art = () => (
    <Scene className="flex-col gap-1.5">
        <Panel className="flex h-7 w-[180px] items-center gap-1.5 rounded-full px-2.5 shadow-[0_0_0_3px_rgb(var(--ink)/0.05)]">
            <LuSearch className="size-3 text-ink/50"/>
            <Line className="w-14 bg-ink/30"/>
            <span className="ml-auto flex h-3.5 items-center rounded border border-hairline-strong px-1 font-mono text-[8px] leading-none text-ink-subtle">K</span>
        </Panel>
        <Panel className="relative w-[180px] p-1.5 shadow-float">
            <Line className="mb-1.5 ml-1 h-[4px] w-8"/>
            <span className={cn("absolute inset-x-1.5 top-[18px] h-4 rounded bg-accent/15 transition-transform duration-500 group-hover:translate-y-[18px] motion-reduce:transition-none", EASE)}>
                <span className="absolute inset-y-1 left-0 w-[2px] rounded-full bg-accent"/>
            </span>
            <div className="relative flex flex-col gap-[2px]">
                {["w-16", "w-12", "w-20"].map((width) => (
                    <span key={width} className="flex h-4 items-center gap-1.5 px-1.5">
                        <span className="size-2.5 rounded-[3px] bg-ink/15"/>
                        <Line className={cn("h-[4px]", width)}/>
                        <Line className="ml-auto h-[4px] w-4 bg-ink/10"/>
                    </span>
                ))}
            </div>
        </Panel>
    </Scene>
);

// An app with a labelled sidebar. The sidebar collapses to an icon rail on hover.
const ResponsiveSidebar: Art = () => (
    <Scene>
        <Panel className="flex h-[104px] w-[196px] overflow-hidden">
            <div className={cn("flex w-[78px] shrink-0 flex-col gap-1 overflow-hidden border-r border-hairline bg-raised p-1.5 transition-[width] duration-500 group-hover:w-[28px] motion-reduce:transition-none", EASE)}>
                <span className="mb-1 flex h-3.5 items-center gap-1.5 px-1">
                    <Dot className="size-2.5 rounded-[4px] bg-ink/45"/>
                    <Line className="w-9 shrink-0 bg-ink/35"/>
                </span>
                {[0, 1, 2].map((item) => (
                    <span key={item} className={cn("flex h-3.5 items-center gap-1.5 rounded px-1", item === 1 && "bg-accent/15")}>
                        <span className={cn("size-2.5 shrink-0 rounded-[3px]", item === 1 ? "bg-accent" : "bg-ink/20")}/>
                        <Line className={cn("w-10 shrink-0", item === 1 && "bg-accent/60")}/>
                    </span>
                ))}
                <span className="mt-auto flex items-center gap-1.5 px-1">
                    <Dot className="size-2.5 bg-ink/30"/>
                    <Line className="w-8 shrink-0"/>
                </span>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-2.5">
                <Heading className="w-14"/>
                <div className="grid flex-1 grid-cols-2 gap-1.5">
                    {[0, 1, 2, 3].map((card) => (
                        <span key={card} className="rounded-md border border-hairline bg-canvas/60"/>
                    ))}
                </div>
            </div>
        </Panel>
    </Scene>
);

// A subway map timeline under a heading. The accent line draws on through its stations on hover.
const StorySections: Art = () => (
    <Scene>
        <Panel className="w-[200px] px-2.5 pb-2 pt-3">
            <Heading className="mx-auto w-20"/>
            <Line className="mx-auto mt-1.5 w-28 bg-ink/10"/>
            <svg viewBox="0 0 180 56" className="mt-1 h-[56px] w-full">
                <path d="M10 38 H170" fill="none" strokeWidth="3" strokeLinecap="round" className="stroke-ink/15"/>
                <path
                    d="M10 38 H48 C60 38 60 16 72 16 H116 C128 16 128 38 140 38 H170"
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                    pathLength={100}
                    className={cn("stroke-accent transition-[stroke-dashoffset] duration-700 [stroke-dasharray:100] [stroke-dashoffset:62] group-hover:[stroke-dashoffset:0] motion-reduce:transition-none", EASE)}
                />
                {[10, 50, 130, 170].map((x) => (
                    <circle key={x} cx={x} cy="38" r="3.5" strokeWidth="2" className="fill-surface stroke-ink/40"/>
                ))}
                {[80, 108].map((x) => (
                    <circle key={x} cx={x} cy="16" r="3.5" strokeWidth="2" className="fill-surface stroke-accent"/>
                ))}
                {[2, 42, 122, 162].map((x) => (
                    <rect key={x} x={x} y="47" width="16" height="4" rx="2" className="fill-ink/15"/>
                ))}
                {[72, 100].map((x) => (
                    <rect key={x} x={x} y="4" width="16" height="4" rx="2" className="fill-ink/15"/>
                ))}
            </svg>
        </Panel>
    </Scene>
);

// A bento grid of feature tiles, one with a chart. The chart bars grow on hover.
const FeatureSections: Art = () => (
    <Scene>
        <div className="grid h-[100px] w-[196px] grid-cols-4 grid-rows-2 gap-1.5">
            <Panel className="col-span-2 row-span-2 flex flex-col p-2">
                <Heading className="w-12"/>
                <Line className="mt-1.5 w-16"/>
                <div className="mt-auto flex h-10 items-end gap-1.5">
                    {[0.45, 0.7, 0.55, 0.9, 0.65].map((height, index) => (
                        <span
                            key={index}
                            className={cn("flex-1 origin-bottom rounded-t-[3px] bg-accent transition-transform duration-500 scale-y-[0.45] group-hover:scale-y-100 motion-reduce:transition-none", EASE)}
                            style={{height: `${height * 100}%`, transitionDelay: `${index * 60}ms`, opacity: 0.5 + height / 2}}
                        />
                    ))}
                </div>
            </Panel>
            <Panel className="col-span-2 flex items-center gap-2 p-2">
                <span className="size-5 shrink-0 rounded-md bg-ink/15"/>
                <div className="flex flex-col gap-1">
                    <Line className="w-10 bg-ink/35"/>
                    <Line className="w-8"/>
                </div>
            </Panel>
            <Panel className="flex items-center justify-center">
                <span className="size-5 rounded-full border-2 border-ink/20"/>
            </Panel>
            <Panel className="flex flex-col justify-center gap-1 p-2">
                <Line className="w-full bg-ink/30"/>
                <Line className="w-2/3"/>
            </Panel>
        </div>
    </Scene>
);

// A rated customer quote above a logo cloud. The logo row scrolls sideways like a marquee on hover.
const SocialProof: Art = () => (
    <Scene className="flex-col gap-2">
        <Panel className="w-[176px] p-2.5">
            <div className="flex items-center">
                <LuQuote className="size-3.5 text-ink/30"/>
                <span className="ml-auto flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((star) => (
                        <LuStar key={star} className="size-2.5 fill-accent text-accent"/>
                    ))}
                </span>
            </div>
            <div className="mt-1.5 flex flex-col gap-1">
                <Line className="w-full bg-ink/25"/>
                <Line className="w-3/4 bg-ink/25"/>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
                <Dot className="size-4 bg-ink/20"/>
                <div className="flex flex-col gap-1">
                    <Line className="h-[4px] w-10 bg-ink/35"/>
                    <Line className="h-[4px] w-7"/>
                </div>
            </div>
        </Panel>
        <div className="w-[176px] overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)]">
            <div className={cn("flex w-max items-center gap-4 transition-transform duration-700 group-hover:-translate-x-12 motion-reduce:transition-none", EASE)}>
                {[0, 1, 2, 3, 4, 5, 6].map((logo) => (
                    <span key={logo} className="flex items-center gap-1">
                        <span className={cn("size-2.5 bg-ink/25", logo % 2 === 0 ? "rounded-full" : "rotate-45 rounded-[2px]")}/>
                        <span className={cn("block h-[5px] rounded-full bg-ink/25", logo % 3 === 0 ? "w-7" : "w-5")}/>
                    </span>
                ))}
            </div>
        </div>
    </Scene>
);

// An FAQ heading over an accordion. The second question opens and its plus turns into a cross on hover.
const FaqSections: Art = () => (
    <Scene className="flex-col gap-2">
        <Heading className="w-20"/>
        <Panel className="w-[180px] divide-y divide-hairline">
            {[0, 1, 2, 3].map((row) => (
                <div key={row} className="px-2.5">
                    <div className="flex h-[17px] items-center">
                        <Line className={cn(row === 1 ? "w-20 bg-ink/40" : "w-16 bg-ink/25")}/>
                        <LuPlus
                            className={cn(
                                "ml-auto size-2.5",
                                row === 1 ? cn("text-accent transition-transform duration-500 group-hover:rotate-45 motion-reduce:transition-none", EASE) : "text-ink/35"
                            )}
                            strokeWidth={3}
                        />
                    </div>
                    {row === 1 && (
                        <div className={cn("grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr] motion-reduce:transition-none", EASE)}>
                            <div className="overflow-hidden">
                                <div className="flex flex-col gap-1 border-l-2 border-accent pb-2 pl-1.5">
                                    <Line className="h-[4px] w-full"/>
                                    <Line className="h-[4px] w-2/3"/>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </Panel>
    </Scene>
);

// A waitlist with a countdown and an email field. The seconds tick over on hover.
const CtaSections: Art = () => (
    <Scene>
        <Panel className="flex w-[184px] flex-col items-center gap-2 p-3">
            <Heading className="w-24"/>
            <div className="flex items-center gap-1 font-mono text-[11px] font-semibold tabular-nums text-ink/80">
                <span className="flex h-5 w-6 items-center justify-center rounded-md border border-hairline bg-raised">04</span>
                <span className="text-ink/30">:</span>
                <span className="flex h-5 w-6 items-center justify-center rounded-md border border-hairline bg-raised">12</span>
                <span className="text-ink/30">:</span>
                <span className="h-5 w-6 overflow-hidden rounded-md border border-hairline bg-raised">
                    <span className={cn("flex flex-col transition-transform duration-500 group-hover:-translate-y-[18px] motion-reduce:transition-none", EASE)}>
                        <span className="flex h-[18px] items-center justify-center">37</span>
                        <span className="flex h-[18px] items-center justify-center">36</span>
                    </span>
                </span>
            </div>
            <div className="mt-0.5 flex w-full items-center gap-1">
                <span className="flex h-5 flex-1 items-center rounded-md border border-hairline-strong px-1.5">
                    <Line className="w-10"/>
                </span>
                <Button accent className="h-5 px-2"/>
            </div>
        </Panel>
    </Scene>
);

// A plan-by-plan feature table with one highlighted column. The highlight slides to the next plan on hover.
const ComparisonTable: Art = () => {
    const rows = [[true, true, true], [false, true, true], [false, true, true], [false, false, true]];
    return (
        <Scene>
            <Panel className="relative w-[192px] overflow-hidden py-1">
                <span
                    className={cn(
                        "absolute inset-y-0 left-[108px] w-[42px] border-x border-accent/40 bg-accent/10 transition-transform duration-500 group-hover:translate-x-[42px] motion-reduce:transition-none",
                        EASE
                    )}
                />
                <div className="relative flex h-6 items-center">
                    <span className="w-[66px]"/>
                    {[0, 1, 2].map((plan) => (
                        <span key={plan} className="flex w-[42px] flex-col items-center gap-1">
                            <Line className="h-[4px] w-5 bg-ink/35"/>
                            <Heading className="h-[5px] w-4 bg-ink/25"/>
                        </span>
                    ))}
                </div>
                {rows.map((cells, row) => (
                    <div key={row} className="relative flex h-[17px] items-center border-t border-hairline">
                        <span className="w-[66px] pl-2.5">
                            <Line className={cn("h-[4px]", row % 2 === 0 ? "w-10" : "w-8")}/>
                        </span>
                        {cells.map((included, cell) => (
                            <span key={cell} className="flex w-[42px] justify-center">
                                {included ? <LuCheck className="size-2.5 text-ink/55" strokeWidth={3}/> : <span className="h-[2px] w-2 rounded-full bg-ink/20"/>}
                            </span>
                        ))}
                    </div>
                ))}
            </Panel>
        </Scene>
    );
};

// A grid of team portraits with names. Social links slide up over each portrait on hover.
const TeamSections: Art = () => (
    <Scene>
        <div className="grid w-[196px] grid-cols-4 gap-1.5">
            {[0, 1, 2, 3].map((member) => (
                <Panel key={member} className="flex flex-col gap-1 p-1">
                    <span className="relative flex h-[50px] items-end justify-center overflow-hidden rounded-md bg-raised">
                        <span className="absolute top-[12px] size-3.5 rounded-full bg-ink/20"/>
                        <span className="h-4 w-8 rounded-t-full bg-ink/20"/>
                        <span
                            className={cn("absolute inset-x-0 bottom-0 flex justify-center gap-1 bg-surface/80 py-1 backdrop-blur-sm transition-transform duration-500 translate-y-full group-hover:translate-y-0 motion-reduce:transition-none", EASE)}
                            style={{transitionDelay: `${member * 70}ms`}}
                        >
                            <Dot className="size-1.5 bg-accent"/>
                            <Dot className="size-1.5 bg-accent"/>
                            <Dot className="size-1.5 bg-accent"/>
                        </span>
                    </span>
                    <Line className="mx-auto mt-0.5 h-[4px] w-8 bg-ink/35"/>
                    <Line className="mx-auto mb-0.5 h-[4px] w-6"/>
                </Panel>
            ))}
        </div>
    </Scene>
);

// A blog grid with a featured post and two smaller cards. The featured cover zooms in on hover.
const BlogSections: Art = () => (
    <Scene>
        <div className="grid h-[104px] w-[200px] grid-cols-5 gap-1.5">
            <Panel className="col-span-3 flex flex-col overflow-hidden">
                <span className="relative h-[52px] overflow-hidden border-b border-hairline bg-raised">
                    <svg viewBox="0 0 110 52" preserveAspectRatio="xMidYMax slice" className={cn("absolute inset-0 size-full transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none", EASE)}>
                        <circle cx="80" cy="16" r="6" className="fill-ink/15"/>
                        <path d="M0 52 L30 26 L50 40 L70 22 L110 52 Z" className="fill-ink/15"/>
                    </svg>
                </span>
                <div className="flex flex-col gap-1.5 p-2">
                    <span className="flex h-3 w-9 items-center justify-center rounded-full bg-accent/15">
                        <span className="h-[3px] w-5 rounded-full bg-accent"/>
                    </span>
                    <Heading className="h-[6px] w-20"/>
                    <Line className="h-[4px] w-14"/>
                </div>
            </Panel>
            <div className="col-span-2 flex flex-col gap-1.5">
                {[0, 1].map((post) => (
                    <Panel key={post} className="flex flex-1 flex-col gap-1.5 p-1.5">
                        <span className="h-4 rounded bg-raised"/>
                        <Line className="h-[4px] w-full bg-ink/30"/>
                        <Line className="h-[4px] w-2/3"/>
                    </Panel>
                ))}
            </div>
        </div>
    </Scene>
);

// A split sign-in screen with social buttons and a password field. The password dots type themselves in on hover.
const Authentication: Art = () => (
    <Scene>
        <Panel className="flex h-[106px] w-[200px] overflow-hidden">
            <div className="flex w-[70px] flex-col justify-between border-r border-hairline bg-raised bg-[radial-gradient(rgb(var(--ink)/0.12)_1px,transparent_1px)] p-2 [background-size:7px_7px]">
                <Dot className="size-3 rounded-[4px] bg-ink/45"/>
                <div className="flex flex-col gap-1">
                    <Line className="h-[4px] w-full bg-ink/25"/>
                    <Line className="h-[4px] w-2/3 bg-ink/25"/>
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-[5px] p-2">
                <Heading className="h-[6px] w-12"/>
                <div className="flex gap-1">
                    <span className="flex h-3 flex-1 items-center justify-center rounded border border-hairline-strong">
                        <Dot className="size-1.5 bg-ink/35"/>
                    </span>
                    <span className="flex h-3 flex-1 items-center justify-center rounded border border-hairline-strong">
                        <Dot className="size-1.5 bg-ink/35"/>
                    </span>
                </div>
                <span className="flex items-center gap-1">
                    <span className="h-px flex-1 bg-hairline-strong"/>
                    <span className="size-1 rounded-full bg-ink/20"/>
                    <span className="h-px flex-1 bg-hairline-strong"/>
                </span>
                <span className="flex h-3 items-center rounded border border-hairline-strong px-1">
                    <Line className="h-[3px] w-12"/>
                </span>
                <span className="flex h-3 items-center gap-[3px] rounded border border-hairline-strong px-1 transition-colors duration-300 group-hover:border-accent motion-reduce:transition-none">
                    {[0, 1, 2, 3, 4, 5].map((dot) => (
                        <span
                            key={dot}
                            className="size-[3px] rounded-full bg-ink/60 opacity-0 transition-opacity duration-150 group-hover:opacity-100 motion-reduce:transition-none"
                            style={{transitionDelay: `${dot * 80}ms`}}
                        />
                    ))}
                </span>
                <Button accent className="h-3.5"/>
            </div>
        </Panel>
    </Scene>
);

// A dashboard shell: sidebar, top bar, stat cards and a chart. The chart line draws across on hover.
const ApplicationShells: Art = () => (
    <Scene>
        <Panel className="flex h-[108px] w-[204px] overflow-hidden">
            <div className="flex w-[30px] flex-col items-center gap-2 border-r border-hairline bg-raised py-2">
                <Dot className="size-3 rounded-[4px] bg-ink/45"/>
                {[0, 1, 2, 3].map((item) => (
                    <span key={item} className={cn("size-2.5 rounded-[3px]", item === 0 ? "bg-ink/45" : "bg-ink/15")}/>
                ))}
            </div>
            <div className="flex flex-1 flex-col">
                <div className="flex h-5 items-center border-b border-hairline px-2">
                    <Line className="h-[4px] w-12"/>
                    <Dot className="ml-auto size-2.5"/>
                </div>
                <div className="flex flex-1 flex-col gap-1.5 p-2">
                    <div className="flex gap-1.5">
                        {[0, 1, 2].map((stat) => (
                            <span key={stat} className="flex flex-1 flex-col gap-1 rounded-md border border-hairline p-1">
                                <Line className="h-[3px] w-5"/>
                                <Heading className="h-[5px] w-7"/>
                            </span>
                        ))}
                    </div>
                    <span className="flex flex-1 items-end overflow-hidden rounded-md border border-hairline px-1 pb-0.5">
                        <svg viewBox="0 0 150 36" className="h-[36px] w-full">
                            <path d="M2 32 L22 26 L40 29 L60 18 L80 22 L100 11 L120 15 L148 4 L148 36 L2 36 Z" className="fill-accent/10"/>
                            <path
                                d="M2 32 L22 26 L40 29 L60 18 L80 22 L100 11 L120 15 L148 4"
                                fill="none"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                pathLength={100}
                                className={cn("stroke-accent transition-[stroke-dashoffset] duration-700 [stroke-dasharray:100] [stroke-dashoffset:48] group-hover:[stroke-dashoffset:0] motion-reduce:transition-none", EASE)}
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </Panel>
    </Scene>
);

const art: Record<string, Art> = {
    "responsive-navbar": ResponsiveNavbar,
    "hero-section": HeroSection,
    "pricing-section": PricingSection,
    "responsive-footer": ResponsiveFooter,
    "interactive-heroes": InteractiveHeroes,
    "contact-form": ContactForm,
    "multi-step-form": MultiStepForm,
    "newsletter-form": NewsletterForm,
    "404-page": NotFoundPage,
    "empty-page": EmptyPage,
    "offer-grid": OfferGrid,
    "product-details-page": ProductDetailsPage,
    "checkout-page": CheckoutPage,
    "responsive-search-bar": ResponsiveSearchBar,
    "responsive-sidebar": ResponsiveSidebar,
    "story-sections": StorySections,
    "feature-sections": FeatureSections,
    "social-proof": SocialProof,
    "faq-sections": FaqSections,
    "cta-sections": CtaSections,
    "comparison-table": ComparisonTable,
    "team-sections": TeamSections,
    "blog-sections": BlogSections,
    "authentication": Authentication,
    "application-shells": ApplicationShells,
};

export default art;

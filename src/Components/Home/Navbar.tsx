import {useCallback, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {Link, NavLink, useLocation} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import {LuAnchor, LuArrowUpRight, LuChevronDown, LuMenu, LuPipette, LuSearch, LuStar, LuX} from "react-icons/lu";
import {SiVuedotjs} from "react-icons/si";
import {FiGithub} from "react-icons/fi";
import {RxDiscordLogo} from "react-icons/rx";

import useZenuiStore from "@/Store/Index.ts";
import {useGitHubStars} from "@/CustomHooks/useGithubStars.ts";
import {toolsNavigation} from "@utils/DocsNavigation.ts";
import {navIcons} from "@shared/NavIcons.tsx";
import SiteLogo from "@shared/SiteLogo.tsx";
import ThemeToggle from "@shared/ThemeToggle.tsx";
import VersionSelectBox from "@/Components/Home/VersionSelectBox.tsx";
import DocsNavTree from "@/Components/Overview/Sidebar/Content.tsx";
import {cn} from "@utils/Style.ts";

export const GITHUB_URL = "https://github.com/Asfak00/zenui-library";
export const DISCORD_URL = "https://discord.gg/qbwytm4WUG";

const primaryLinks = [
    {title: "Docs", url: "/docs/overview", match: "/docs"},
    {title: "Components", url: "/components/all-components", match: "/components"},
    {title: "Blocks", url: "/blocks/all-blocks", match: "/blocks"},
    {title: "Animations", url: "/animations/all-animations", match: "/animations"},
    {title: "Templates", url: "/templates", match: "/templates"},
];

// Tile color and Alt Z shortcut (see useZenUIShortcut) for each tool in the menu.
const toolLook = {
    keyboard: {tile: "bg-violet-500/10 text-violet-600 ring-violet-500/20 dark:text-violet-400", key: "S"},
    palette: {tile: "bg-rose-500/10 text-rose-600 ring-rose-500/20 dark:text-rose-400", key: "P"},
    icons: {tile: "bg-amber-500/10 text-amber-600 ring-amber-500/20 dark:text-amber-400", key: "O"},
    config: {tile: "bg-sky-500/10 text-sky-600 ring-sky-500/20 dark:text-sky-400", key: "G"},
    html: {tile: "bg-orange-500/10 text-orange-600 ring-orange-500/20 dark:text-orange-400"},
};

const featuredProduct = {
    title: "Readme Studio",
    description: "Build a GitHub profile README visually, then copy the Markdown.",
    url: "https://readmestudio.zenui.net/",
    image: "https://i.ibb.co.com/svzKxvxY/small-ads-for-zenui.png",
};

const relatedProducts = [
    {title: "ZenUI Vue", description: "The same library for Vue 3", url: "https://vueui.zenui.net/", icon: SiVuedotjs, tint: "text-emerald-500"},
    {title: "React Hooks", description: "Copy-ready custom hooks", url: "https://react-hooks.zenui.net/", icon: LuAnchor, tint: "text-sky-500"},
    {title: "Color Picker", description: "Pick and convert colors", url: "https://color-picker.zenui.net/", icon: LuPipette, tint: "text-rose-500"},
];

const formatStars = (stars) => (stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : String(stars || ""));

const SearchTrigger = ({className}) => {
    const setSearchOpen = useZenuiStore((state) => state.setSearchOpen);
    const isMac = typeof navigator !== "undefined" && /mac/i.test(navigator.platform);

    return (
        <button
            onClick={() => setSearchOpen(true)}
            className={cn(
                "group flex h-9 items-center gap-2 rounded-[10px] border border-hairline bg-surface pl-3 pr-1.5 text-[0.85rem] text-ink-subtle transition-colors hover:border-hairline-strong hover:text-ink-muted",
                className
            )}
        >
            <LuSearch className="size-4"/>
            <span className="flex-1 text-left">Search docs</span>
            <span className="flex items-center gap-0.5">
                <kbd className="kbd">{isMac ? "⌘" : "Ctrl"}</kbd>
                <kbd className="kbd">K</kbd>
            </span>
        </button>
    );
};

const ToolsMenu = () => {
    const [open, setOpen] = useState(false);
    const closeTimer = useRef(null);
    const menuRef = useRef(null);
    const location = useLocation();
    const isActive = toolsNavigation.some((tool) => tool.url === location.pathname);

    const show = () => {
        clearTimeout(closeTimer.current);
        setOpen(true);
    };
    const hide = () => {
        closeTimer.current = setTimeout(() => setOpen(false), 120);
    };

    useEffect(() => setOpen(false), [location.pathname]);

    useEffect(() => {
        if (!open) return;
        const onClick = (event) => !menuRef.current?.contains(event.target) && setOpen(false);
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, [open]);

    return (
        <div ref={menuRef} className="relative" onMouseEnter={show} onMouseLeave={hide}
             onKeyDown={(event) => event.key === "Escape" && setOpen(false)}>
            <button
                // Hover already opens it, so a click must not toggle it shut again.
                onClick={show}
                aria-expanded={open}
                className={cn(
                    "flex h-9 items-center gap-1 rounded-lg px-3 text-[0.875rem] transition-colors",
                    open || isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                )}
            >
                Tools
                <LuChevronDown className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")}/>
            </button>

            <AnimatePresence>
                {open && (
                    // Centered with motion's x so it composes with the y/scale animation.
                    <motion.div
                        initial={{opacity: 0, y: 6, scale: 0.98}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: 4, scale: 0.98, transition: {duration: 0.12}}}
                        transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
                        style={{x: "-50%", transformOrigin: "50% 0%"}}
                        className="absolute left-1/2 top-[calc(100%+10px)] grid w-[700px] grid-cols-[1fr_260px] overflow-hidden rounded-shell border border-hairline bg-surface shadow-float before:absolute before:inset-x-0 before:-top-3 before:h-3"
                    >
                        <div className="grid grid-cols-1 gap-0.5 p-2">
                            <p className="eyebrow px-2.5 pb-1 pt-1.5">Free tools, no sign-up</p>
                            {toolsNavigation.map((tool) => {
                                const Icon = navIcons[tool.icon];
                                const look = toolLook[tool.icon];
                                return (
                                    <Link key={tool.url} to={tool.url}
                                          className="group relative flex items-start gap-3.5 rounded-xl p-2.5 transition-colors hover:bg-raised">
                                        <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-[11px] ring-1 ring-inset transition-transform duration-300 ease-out-expo group-hover:-rotate-6 group-hover:scale-105", look.tile)}>
                                            <Icon className="size-[18px]"/>
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="flex items-center gap-2 text-[0.875rem] font-medium text-ink">
                                                {tool.title}
                                                {tool.status === "updated" && (
                                                    <span className="rounded-full bg-amber-500/15 px-1.5 py-px text-[0.64rem] font-semibold text-amber-600 dark:text-amber-400">Updated</span>
                                                )}
                                            </span>
                                            <span className="block text-[0.78rem] leading-snug text-ink-subtle">{tool.description}</span>
                                        </span>
                                        {look.key ? (
                                            <span className="absolute right-2.5 top-2.5 flex items-center gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true">
                                                <kbd className="kbd">⌥</kbd><kbd className="kbd">Z</kbd><kbd className="kbd">{look.key}</kbd>
                                            </span>
                                        ) : (
                                            <LuArrowUpRight className="absolute right-3 top-3 size-4 text-ink-subtle opacity-0 transition-opacity group-hover:opacity-100"/>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="flex flex-col gap-2 border-l border-hairline bg-canvas p-2">
                            <p className="eyebrow px-2 pb-0.5 pt-2">From ZenUI Labs</p>

                            <a href={featuredProduct.url} target="_blank" rel="noreferrer"
                               className="group overflow-hidden rounded-xl border border-hairline bg-surface transition-colors hover:border-hairline-strong">
                                <div className="relative aspect-[16/8] overflow-hidden bg-raised">
                                    <img src={featuredProduct.image} alt=""
                                         className="size-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.04]"/>
                                </div>
                                <div className="px-3 py-2.5">
                                    <p className="flex items-center justify-between text-[0.85rem] font-medium text-ink">
                                        {featuredProduct.title}
                                        <LuArrowUpRight className="size-3.5 text-ink-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"/>
                                    </p>
                                    <p className="mt-0.5 text-[0.75rem] leading-snug text-ink-subtle">{featuredProduct.description}</p>
                                </div>
                            </a>

                            <ul className="flex flex-col">
                                {relatedProducts.map(({icon: Icon, ...product}) => (
                                    <li key={product.url}>
                                        <a href={product.url} target="_blank" rel="noreferrer"
                                           className="group flex items-center gap-2.5 rounded-lg p-2 transition-colors hover:bg-surface">
                                            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface">
                                                <Icon className={cn("size-4", product.tint)}/>
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block text-[0.82rem] font-medium text-ink">{product.title}</span>
                                                <span className="block truncate text-[0.72rem] text-ink-subtle">{product.description}</span>
                                            </span>
                                            <LuArrowUpRight className="size-3.5 shrink-0 text-ink-subtle opacity-0 transition-opacity group-hover:opacity-100"/>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const MobileMenu = ({open, onClose, stars}) => {
    const setSearchOpen = useZenuiStore((state) => state.setSearchOpen);

    useEffect(() => {
        if (!open) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (event) => event.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = previous;
            document.removeEventListener("keydown", onKey);
        };
    }, [open, onClose]);

    return createPortal(
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[900] 1024px:hidden">
                    <motion.div className="absolute inset-0 bg-[rgb(8_9_13/0.4)] backdrop-blur-[2px]" onClick={onClose}
                                initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}/>
                    <motion.aside
                        role="dialog"
                        aria-modal="true"
                        aria-label="Site menu"
                        className="absolute inset-y-0 right-0 flex w-[min(360px,88vw)] flex-col border-l border-hairline bg-canvas"
                        initial={{x: "100%"}}
                        animate={{x: 0}}
                        exit={{x: "100%"}}
                        transition={{type: "spring", stiffness: 380, damping: 40}}
                    >
                        <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-hairline px-4">
                            <SiteLogo/>
                            <button onClick={onClose} className="icon-btn" aria-label="Close menu">
                                <LuX className="size-4"/>
                            </button>
                        </div>

                        <div className="scroll-thin flex-1 overflow-y-auto px-4 pt-4">
                            <button
                                onClick={() => {
                                    onClose();
                                    setSearchOpen(true);
                                }}
                                className="flex h-10 w-full items-center gap-2 rounded-[10px] border border-hairline bg-surface px-3 text-[0.9rem] text-ink-subtle"
                            >
                                <LuSearch className="size-4"/> Search docs
                            </button>

                            <div className="mt-4 grid grid-cols-2 gap-1.5">
                                {primaryLinks.map((link) => (
                                    <NavLink key={link.url} to={link.url} onClick={onClose}
                                             className="rounded-lg border border-hairline bg-surface px-3 py-2.5 text-[0.875rem] font-medium text-ink">
                                        {link.title}
                                    </NavLink>
                                ))}
                                <a href={GITHUB_URL} target="_blank" rel="noreferrer"
                                   className="flex items-center justify-between rounded-lg border border-hairline bg-surface px-3 py-2.5 text-[0.875rem] font-medium text-ink">
                                    GitHub
                                    <span className="flex items-center gap-1 text-[0.78rem] text-ink-subtle">
                                        <LuStar className="size-3.5"/>{formatStars(stars)}
                                    </span>
                                </a>
                            </div>

                            <p className="eyebrow mb-2 mt-6 px-1">Tools</p>
                            <div className="flex flex-col gap-px">
                                {toolsNavigation.map((tool) => (
                                    <NavLink key={tool.url} to={tool.url} onClick={onClose}
                                             className="rounded-lg px-3 py-2 text-[0.875rem] text-ink-muted hover:bg-raised hover:text-ink">
                                        {tool.title}
                                    </NavLink>
                                ))}
                            </div>

                            <div className="mt-6 border-t border-hairline pt-4">
                                <DocsNavTree onNavigate={onClose}/>
                            </div>
                        </div>
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

const Navbar = ({className}: {className?: string}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = useCallback(() => setMenuOpen(false), []);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const setSearchOpen = useZenuiStore((state) => state.setSearchOpen);
    const {stars} = useGitHubStars("Asfak00", "zenui-library");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 4);
        onScroll();
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => setMenuOpen(false), [location.pathname]);

    // Docs pages keep the bottom border from the first paint; elsewhere it appears once the page scrolls.
    const docsLayout = /^\/(docs|components|blocks|animations)(\/|$)/.test(location.pathname);

    return (
        <>
            <header
                className={cn(
                    "sticky top-0 z-[800] w-full border-b transition-[background-color,border-color] duration-300",
                    scrolled ? "border-hairline bg-canvas/80 backdrop-blur-xl backdrop-saturate-150" : cn("bg-transparent", docsLayout ? "border-hairline" : "border-transparent"),
                    className
                )}
            >
                <div className="mx-auto flex h-[60px] w-full max-w-[1480px] items-center gap-4 px-4 640px:px-6">
                    <div className="flex shrink-0 items-center gap-2.5">
                        <SiteLogo/>
                        <VersionSelectBox/>
                    </div>

                    <nav aria-label="Main" className="ml-4 hidden items-center 1024px:flex">
                        {primaryLinks.map((link) => {
                            const active = location.pathname.startsWith(link.match);
                            return (
                                <Link key={link.url} to={link.url}
                                      className={cn(
                                          "relative flex h-9 items-center rounded-lg px-3 text-[0.875rem] transition-colors",
                                          active ? "text-ink" : "text-ink-muted hover:text-ink"
                                      )}>
                                    {link.title}
                                    {active && (
                                        <motion.span layoutId="nav-active"
                                                     className="absolute inset-x-3 -bottom-[13px] h-px bg-ink"
                                                     transition={{type: "spring", stiffness: 500, damping: 40}}/>
                                    )}
                                </Link>
                            );
                        })}
                        <ToolsMenu/>
                    </nav>

                    <div className="ml-auto flex items-center gap-2">
                        {/* The full search field only fits next to the main links from 1260px; between 1024px and 1260px it collapses to an icon. */}
                        <SearchTrigger className="hidden w-[220px] 768px:flex 1024px:hidden 1260px:flex 1260px:w-[250px]"/>
                        <button onClick={() => setSearchOpen(true)} className="icon-btn 768px:hidden 1024px:inline-flex 1260px:hidden" aria-label="Search">
                            <LuSearch className="size-4"/>
                        </button>

                        <a href={GITHUB_URL} target="_blank" rel="noreferrer"
                           className="hidden h-9 items-center gap-2 rounded-[10px] border border-hairline bg-surface px-3 text-[0.82rem] font-medium text-ink-muted transition-colors hover:bg-raised hover:text-ink 640px:flex"
                           aria-label={`GitHub repository, ${stars} stars`}>
                            <FiGithub className="size-4"/>
                            {stars > 0 && <span className="tabular-nums">{formatStars(stars)}</span>}
                        </a>
                        <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="icon-btn hidden 1024px:inline-flex"
                           aria-label="Discord community">
                            <RxDiscordLogo className="size-4"/>
                        </a>
                        <ThemeToggle/>
                        <button onClick={() => setMenuOpen(true)} className="icon-btn 1024px:hidden" aria-label="Open menu"
                                aria-expanded={menuOpen}>
                            <LuMenu className="size-4"/>
                        </button>
                    </div>
                </div>
            </header>

            <MobileMenu open={menuOpen} onClose={closeMenu} stars={stars}/>
        </>
    );
};

export default Navbar;

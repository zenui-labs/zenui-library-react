import {LuFileText, LuFolder, LuHardDrive, LuTerminal, LuTrash2} from "react-icons/lu";
import {DesktopHero, type ChangelogEntry, type DesktopIcon, type TerminalLine} from "./DesktopHero";

const terminalLines: TerminalLine[] = [
    {typed: true, text: "curl -fsSL floppy.build/install | sh"},
    {text: "Downloading floppy 2.0.1 for darwin-arm64 (1.21 MB)"},
    {text: "Installed to ~/.local/bin/floppy", tone: "success"},
    {typed: true, text: "floppy new field-notes && cd field-notes"},
    {text: "Created 6 files from the 'journal' starter"},
    {typed: true, text: "floppy dev"},
    {text: "Built 42 pages in 38 ms"},
    {text: "Serving on http://localhost:4040 (reload in 9 ms)", tone: "success"},
];

const changelog: ChangelogEntry[] = [
    {
        version: "2.0.1",
        date: "Sep 24",
        items: ["RSS dates respect the site's time zone", "dev server survives a sleeping laptop"],
    },
    {
        version: "2.0.0",
        date: "Sep 09",
        items: ["AVIF and WebP with blurred placeholders", "Incremental builds: 9 ms p50 on 600 pages", "Dropped Windows 7. Sorry, Gary."],
    },
];

const icons: DesktopIcon[] = [
    {id: "disk", label: "Floppy HD", icon: LuHardDrive, opens: "readme"},
    {id: "sites", label: "Sites", icon: LuFolder},
    {id: "shell", label: "Terminal", icon: LuTerminal, opens: "terminal"},
    {id: "changes", label: "CHANGES.txt", icon: LuFileText, opens: "notes"},
    {id: "trash", label: "Trash", icon: LuTrash2},
];

const DesktopHeroExample = () => (
    <DesktopHero
        appName="Floppy"
        eyebrow="Floppy 2.0 · static sites"
        headline="The whole toolchain fits on a floppy."
        description="One 1.2 MB binary: Markdown in, plain HTML out, and a dev server that reloads before you look up. Nothing to npm install, nothing to upgrade on a Friday."
        primaryAction={{label: "Download for macOS", href: "#download"}}
        secondaryAction={{label: "Read the docs", href: "#docs"}}
        terminalTitle="zsh — field-notes"
        terminalLines={terminalLines}
        notesTitle="CHANGES.txt"
        changelog={changelog}
        icons={icons}
    />
);

export default DesktopHeroExample;

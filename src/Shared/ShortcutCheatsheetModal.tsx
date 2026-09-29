import {LuX} from "react-icons/lu";
import Dialog from "@shared/Dialog.tsx";

const isMac = typeof navigator !== "undefined" && /mac/i.test(navigator.platform);

const groups = [
    {
        title: "General",
        items: [
            {keys: [isMac ? "⌘" : "Ctrl", "K"], description: "Search"},
            {keys: ["/"], description: "Search"},
            {keys: ["Shift", "Space"], description: "Show this list"},
            {keys: ["Alt", "Z", "T"], description: "Toggle theme"},
        ],
    },
    {
        title: "Go to",
        items: [
            {keys: ["Alt", "Z", "H"], description: "Home"},
            {keys: ["Alt", "Z", "C"], description: "Components"},
            {keys: ["Alt", "Z", "B"], description: "Blocks"},
            {keys: ["Alt", "Z", "A"], description: "Animations"},
            {keys: ["Alt", "Z", "M"], description: "Templates"},
            {keys: ["Alt", "Z", "I"], description: "Installation"},
            {keys: ["Alt", "Z", "R"], description: "Resources"},
        ],
    },
    {
        title: "Tools",
        items: [
            {keys: ["Alt", "Z", "G"], description: "Config AI"},
            {keys: ["Alt", "Z", "P"], description: "Color palette"},
            {keys: ["Alt", "Z", "O"], description: "Icons"},
            {keys: ["Alt", "Z", "S"], description: "ShortKey"},
            {keys: ["Alt", "Z", "N"], description: "zenui-image-react on npm"},
        ],
    },
];

const Key = ({value}: {value: string}) => <kbd className="kbd h-6 min-w-6 px-1.5 text-[0.72rem]">{isMac && value === "Alt" ? "⌥" : value}</kbd>;

export default function ShortcutCheatsheetModal({isOpen, setIsOpen}: {isOpen: boolean; setIsOpen: (open: boolean) => void}) {
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} label="Keyboard shortcuts" className="max-w-[720px]">
            <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
                <div>
                    <h2 className="text-[1rem] font-semibold text-ink">Keyboard shortcuts</h2>
                    <p className="mt-0.5 text-[0.8rem] text-ink-subtle">Press Alt Z, then the letter.</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="icon-btn" aria-label="Close">
                    <LuX className="size-4"/>
                </button>
            </div>

            <div className="scroll-thin grid max-h-[70vh] grid-cols-1 gap-x-8 gap-y-6 overflow-y-auto p-5 640px:grid-cols-2">
                {groups.map((group) => (
                    <section key={group.title} className={group.title === "Go to" ? "640px:row-span-2" : ""}>
                        <p className="eyebrow mb-2">{group.title}</p>
                        <ul className="divide-y divide-hairline">
                            {group.items.map((item) => (
                                <li key={item.description + item.keys.join()} className="flex items-center justify-between gap-4 py-2">
                                    <span className="text-[0.875rem] text-ink-muted">{item.description}</span>
                                    <span className="flex items-center gap-1">
                                        {item.keys.map((key) => <Key key={key} value={key}/>)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </Dialog>
    );
}

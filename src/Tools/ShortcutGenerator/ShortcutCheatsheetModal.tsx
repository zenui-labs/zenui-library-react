import {LuX} from "react-icons/lu";

import Dialog from "@shared/Dialog.tsx";

const KeyGroup = ({title, description, keys, className}) => (
    <section>
        <h3 className="text-[0.9rem] font-semibold tracking-heading text-ink">{title}</h3>
        <p className="mt-0.5 text-[0.83rem] text-ink-muted">{description}</p>
        <ul className={className}>
            {keys.map((key) => (
                <li
                    key={key}
                    className="flex h-9 items-center justify-center rounded-[8px] border border-b-2 border-hairline-strong bg-surface px-2 font-mono text-[0.78rem] font-medium text-ink"
                >
                    {key}
                </li>
            ))}
        </ul>
    </section>
);

const ShortcutCheatsheetModal = ({VALID_MODIFIERS, VALID_KEYS, isOpen, setIsOpen}) => {
    const close = () => setIsOpen(false);

    return (
        <Dialog open={isOpen} onClose={close} label="Supported keys" className="max-w-[640px]">
            <div className="flex items-start justify-between gap-4 border-b border-hairline px-5 py-4 640px:px-6">
                <div>
                    <h2 className="text-[1.1rem] font-semibold tracking-heading text-ink">Supported keys</h2>
                    <p className="mt-0.5 text-[0.85rem] text-ink-muted">
                        Use these names when you type a shortcut, joined with +.
                    </p>
                </div>
                <button type="button" onClick={close} className="icon-btn shrink-0" aria-label="Close">
                    <LuX className="size-4"/>
                </button>
            </div>

            <div className="scroll-thin max-h-[70vh] space-y-7 overflow-y-auto px-5 py-5 640px:px-6 640px:py-6">
                <KeyGroup
                    title="Modifiers"
                    description="Held down together with another key."
                    keys={VALID_MODIFIERS}
                    className="mt-3 flex flex-wrap gap-2"
                />
                <KeyGroup
                    title="Keys"
                    description="Letters, numbers, arrows and a few special keys."
                    keys={VALID_KEYS}
                    className="mt-3 grid grid-cols-3 gap-2 425px:grid-cols-4 640px:grid-cols-6"
                />
            </div>
        </Dialog>
    );
};

export default ShortcutCheatsheetModal;

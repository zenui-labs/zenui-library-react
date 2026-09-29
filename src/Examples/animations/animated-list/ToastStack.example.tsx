import {useRef, useState} from "react";
import type {IconType} from "react-icons";
import {LuCheck, LuInfo, LuUpload} from "react-icons/lu";
import {ToastStack, type ToastItem, type ToastTone} from "./ToastStack";

type ToastContent = Omit<ToastItem, "id">;

const presets: Record<ToastTone, ToastContent[]> = {
    success: [
        {tone: "success", title: "Post published", detail: "\"Designing for slow networks\" is live."},
        {tone: "success", title: "Changes saved", detail: "Billing details updated for Acme Studio."},
    ],
    error: [
        {tone: "error", title: "Upload failed", detail: "brand-guide.pdf is larger than 25 MB."},
        {tone: "error", title: "Calendar sync failed", detail: "Google Calendar needs you to sign in again."},
    ],
    info: [
        {tone: "info", title: "Link copied", detail: "Anyone with the link can view this file."},
        {tone: "info", title: "Invite sent", detail: "Tomás will get an email in a minute."},
    ],
};

const triggers: {tone: ToastTone; label: string; icon: IconType}[] = [
    {tone: "success", label: "Publish", icon: LuCheck},
    {tone: "error", label: "Upload", icon: LuUpload},
    {tone: "info", label: "Share", icon: LuInfo},
];

const ToastStackExample = () => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const nextId = useRef(1);
    // Cycle through the presets of each tone so repeated presses show different toasts.
    const counts = useRef<Record<ToastTone, number>>({success: 0, error: 0, info: 0});

    const show = (tone: ToastTone) => {
        const preset = presets[tone][counts.current[tone]++ % presets[tone].length];
        setToasts((current) => [{...preset, id: nextId.current++}, ...current].slice(0, 6));
    };
    const dismiss = (id: number) => setToasts((current) => current.filter((toast) => toast.id !== id));

    return (
        <div className="relative flex h-[380px] w-full max-w-sm flex-col">
            <div className="flex flex-wrap justify-center gap-2">
                {triggers.map(({tone, label, icon: Icon}) => (
                    <button
                        key={tone}
                        type="button"
                        onClick={() => show(tone)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                    >
                        <Icon className="h-4 w-4 text-gray-400 dark:text-slate-500" aria-hidden="true"/>
                        {label}
                    </button>
                ))}
            </div>
            <p className="mt-3 text-center text-xs text-gray-500 dark:text-slate-400">
                {toasts.length ? "Hover the stack to expand it, swipe a toast to dismiss" : "Press a button to show a toast"}
            </p>
            <ToastStack toasts={toasts} onDismiss={dismiss} className="mt-auto"/>
        </div>
    );
};

export default ToastStackExample;

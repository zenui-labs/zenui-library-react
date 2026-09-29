// Source of the copyable toast.tsx file, shared by every example on the Toast page.
export const toastSource = `
/* ── toast.tsx  (copy this file into your project) ─────────────────── */
import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { MdOutlineDone, MdOutlineInfo } from "react-icons/md";
import { BiError } from "react-icons/bi";
import { IoWarningOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

export type ToastType = "default" | "success" | "error" | "warning" | "info" | "loading";
export type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export interface ToastOptions {
  type?: ToastType;
  description?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastData extends ToastOptions {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
  exiting: boolean;
}

type ToastEvent =
  | { action: "add"; item: ToastData }
  | { action: "dismiss"; id: number }
  | { action: "update"; id: number; data: Partial<ToastData> };

// Keyframe styles injected once at runtime — no tailwind.config changes.
const STYLES = \`
  @keyframes toastSlideInRight   { from { transform:translateX(110%);  opacity:0 } to { transform:translateX(0);    opacity:1 } }
  @keyframes toastSlideOutRight  { from { transform:translateX(0);     opacity:1 } to { transform:translateX(110%); opacity:0 } }
  @keyframes toastSlideInLeft    { from { transform:translateX(-110%); opacity:0 } to { transform:translateX(0);    opacity:1 } }
  @keyframes toastSlideOutLeft   { from { transform:translateX(0);     opacity:1 } to { transform:translateX(-110%);opacity:0 } }
  @keyframes toastSlideInTop     { from { transform:translateY(-110%); opacity:0 } to { transform:translateY(0);    opacity:1 } }
  @keyframes toastSlideOutTop    { from { transform:translateY(0);     opacity:1 } to { transform:translateY(-110%);opacity:0 } }
  @keyframes toastSlideInBottom  { from { transform:translateY(110%);  opacity:0 } to { transform:translateY(0);    opacity:1 } }
  @keyframes toastSlideOutBottom { from { transform:translateY(0);     opacity:1 } to { transform:translateY(110%); opacity:0 } }
\`;
const injectStyles = (() => {
  let done = false;
  return () => {
    if (done || typeof document === "undefined") return;
    const s = document.createElement("style");
    s.textContent = STYLES;
    document.head.appendChild(s);
    done = true;
  };
})();

// ── global event bus (no context, no redux) ──────────────────────────────────
let _listeners: ((event: ToastEvent) => void)[] = [];
let _id = 0;

export const toast = (message: string, options: ToastOptions = {}) => {
  const id = ++_id;
  _listeners.forEach((fn) => fn({ action: "add", item: { id, message, type: "default", duration: 3000, ...options, exiting: false } }));
  return id;
};
toast.success = (msg: string, opts?: ToastOptions) => toast(msg, { type: "success", ...opts });
toast.error   = (msg: string, opts?: ToastOptions) => toast(msg, { type: "error",   ...opts });
toast.warning = (msg: string, opts?: ToastOptions) => toast(msg, { type: "warning", ...opts });
toast.info    = (msg: string, opts?: ToastOptions) => toast(msg, { type: "info",    ...opts });
toast.dismiss = (id: number) => _listeners.forEach((fn) => fn({ action: "dismiss", id }));

toast.promise = (promise: Promise<unknown>, { loading, success, error }: { loading: string; success: string; error: string }) => {
  const id = toast(loading, { type: "loading", duration: 0 });
  promise
    .then(() => _listeners.forEach((fn) => fn({ action: "update", id, data: { message: success, type: "success", duration: 3000 } })))
    .catch(() => _listeners.forEach((fn) => fn({ action: "update", id, data: { message: error,   type: "error",   duration: 3000 } })));
  return id;
};

// ── internal hook ────────────────────────────────────────────────────────────
const useToastStore = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const timers = useRef(new Set<number>());

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.map((t) => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 320);
  }, []);

  useEffect(() => {
    const handler = (event: ToastEvent) => {
      if (event.action === "add")     setToasts((prev) => [...prev, event.item]);
      if (event.action === "dismiss") dismiss(event.id);
      if (event.action === "update") {
        const { id, data } = event;
        setToasts((prev) => prev.map((t) => t.id === id ? { ...t, ...data } : t));
        if (data.duration) setTimeout(() => dismiss(id), data.duration);
      }
    };
    _listeners.push(handler);
    return () => { _listeners = _listeners.filter((l) => l !== handler); };
  }, [dismiss]);

  useEffect(() => {
    toasts.forEach((t) => {
      if (t.duration === 0 || t.exiting || timers.current.has(t.id)) return;
      timers.current.add(t.id);
      setTimeout(() => dismiss(t.id), t.duration);
    });
  }, [toasts, dismiss]);

  return { toasts, dismiss };
};

// ── ToastItem ────────────────────────────────────────────────────────────────
const ICONS: Partial<Record<ToastType, ReactNode>> = {
  success: <MdOutlineDone    className="text-green-500  text-[1.15rem] shrink-0 mt-0.5" />,
  error:   <BiError          className="text-red-500    text-[1.15rem] shrink-0 mt-0.5" />,
  warning: <IoWarningOutline className="text-yellow-500 text-[1.15rem] shrink-0 mt-0.5" />,
  info:    <MdOutlineInfo    className="text-blue-500   text-[1.15rem] shrink-0 mt-0.5" />,
  loading: (
    <svg className="animate-spin text-blue-500 shrink-0 mt-0.5 w-[1.1rem] h-[1.1rem]" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  ),
};
const BORDER: Partial<Record<ToastType, string>> = {
  success: "border-l-green-500", error: "border-l-red-500",
  warning: "border-l-yellow-500", info: "border-l-blue-500",
  loading: "border-l-blue-500",
  default: "border-l-gray-300 dark:border-l-slate-600",
};
const getAnim = (pos: ToastPosition, exiting: boolean) => {
  const dir = pos.includes("right") ? "Right" : pos.includes("left") ? "Left"
            : pos.startsWith("top") ? "Top" : "Bottom";
  return \`toastSlide\${exiting ? "Out" : "In"}\${dir} 0.3s ease forwards\`;
};

interface ToastItemProps {
  toast: ToastData;
  onDismiss: (id: number) => void;
  position: ToastPosition;
}

const ToastItem = ({ toast: t, onDismiss, position }: ToastItemProps) => (
  <div style={{ animation: getAnim(position, t.exiting) }}
    className={\`flex items-start gap-3 px-4 py-3 min-w-[280px] max-w-[340px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 border-l-4 \${BORDER[t.type] ?? BORDER.default} rounded-lg shadow-lg\`}>
    {ICONS[t.type]}
    <div className="flex-1 min-w-0">
      <p className="text-[0.85rem] font-semibold dark:text-[#abc2d3] text-gray-800">{t.message}</p>
      {t.description && <p className="text-[0.75rem] text-gray-500 dark:text-slate-400 mt-0.5">{t.description}</p>}
      {t.action && <button onClick={t.action.onClick} className="mt-1.5 text-[0.72rem] font-semibold text-blue-500 hover:underline">{t.action.label}</button>}
    </div>
    <button onClick={() => onDismiss(t.id)}>
      <RxCross1 className="text-gray-400 dark:text-slate-500 hover:text-gray-600 text-[0.85rem]" />
    </button>
  </div>
);

// ── Toaster — place once at app root ─────────────────────────────────────────
const POS: Record<ToastPosition, string> = {
  "top-left":      "top-5 left-5 items-start",
  "top-center":    "top-5 left-1/2 -translate-x-1/2 items-center",
  "top-right":     "top-5 right-5 items-end",
  "bottom-left":   "bottom-5 left-5 items-start",
  "bottom-center": "bottom-5 left-1/2 -translate-x-1/2 items-center",
  "bottom-right":  "bottom-5 right-5 items-end",
};

interface ToasterProps {
  position?: ToastPosition;
}

export const Toaster = ({ position = "bottom-right" }: ToasterProps) => {
  const { toasts, dismiss } = useToastStore();
  useEffect(() => { injectStyles(); }, []);
  return (
    <div className={\`fixed \${POS[position]} flex flex-col gap-2 z-[9999] pointer-events-none\`}>
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem toast={t} onDismiss={dismiss} position={position} />
        </div>
      ))}
    </div>
  );
};

/* ── Usage ───────────────────────────────────────────────────────────────────
  // App.tsx
  import { Toaster } from "./toast";
  <Toaster position="bottom-right" />   // place once

  // Anywhere.tsx
  import { toast } from "./toast";
  toast("Plain message");
  toast.success("Saved!");
  toast.error("Failed!", { duration: 5000 });
  toast.warning("Warning!", { description: "Subtitle text." });
  toast.info("Info",   { action: { label: "Undo", onClick: () => {} } });
  toast.promise(promise, { loading: "Saving…", success: "Saved!", error: "Failed!" });
  toast.dismiss(id);
────────────────────────────────────────────────────────────────────────────── */
`;

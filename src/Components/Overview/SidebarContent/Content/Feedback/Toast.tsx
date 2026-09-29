import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';

// components
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';

// contents for scrollspy
import { toastContents } from '@utils/ContentsConfig/FeedbackContents';
import { useScrollSpy } from '@/CustomHooks/useScrollSpy';

// react helmet
import { Helmet } from 'react-helmet';

// icons
import { MdOutlineDone, MdOutlineInfo } from 'react-icons/md';
import { BiError } from 'react-icons/bi';
import { IoWarningOutline } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';

import Showcode from '@shared/Component/ShowCode.tsx';
import ToggleTab from '@shared/Component/ToggleTab.tsx';
import ContentNavbar from '@shared/Component/ContentNavbar.tsx';
import ComponentDescription from '@shared/Component/ComponentDescription.tsx';
import ComponentWrapper from '@shared/Component/ComponentWrapper.tsx';
import { toastSource } from './ToastCode.ts';

// ─────────────────────────────────────────────────────────────────────────────
//  CSS keyframes — injected once, no tailwind.config changes needed.
//  Users copy this style block along with the component.
// ─────────────────────────────────────────────────────────────────────────────
const TOAST_STYLES = `
@keyframes toastSlideInRight  { from { transform: translateX(110%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes toastSlideOutRight { from { transform: translateX(0);    opacity: 1; } to { transform: translateX(110%); opacity: 0; } }
@keyframes toastSlideInLeft   { from { transform: translateX(-110%);opacity: 0; } to { transform: translateX(0);    opacity: 1; } }
@keyframes toastSlideOutLeft  { from { transform: translateX(0);    opacity: 1; } to { transform: translateX(-110%);opacity: 0; } }
@keyframes toastSlideInTop    { from { transform: translateY(-110%);opacity: 0; } to { transform: translateY(0);    opacity: 1; } }
@keyframes toastSlideOutTop   { from { transform: translateY(0);    opacity: 1; } to { transform: translateY(-110%);opacity: 0; } }
@keyframes toastSlideInBottom { from { transform: translateY(110%); opacity: 0; } to { transform: translateY(0);    opacity: 1; } }
@keyframes toastSlideOutBottom{ from { transform: translateY(0);    opacity: 1; } to { transform: translateY(110%); opacity: 0; } }
`;

const injectToastStyles = (() => {
    let injected = false;
    return () => {
        if (injected || typeof document === 'undefined') return;
        const tag = document.createElement('style');
        tag.dataset.toastStyles = '1';
        tag.textContent = TOAST_STYLES;
        document.head.appendChild(tag);
        injected = true;
    };
})();

// ─────────────────────────────────────────────────────────────────────────────
//  Reusable Toast system
// ─────────────────────────────────────────────────────────────────────────────

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';
type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

interface ToastOptions {
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
    | { action: 'add'; item: ToastData }
    | { action: 'dismiss'; id: number }
    | { action: 'update'; id: number; data: Partial<ToastData> };

let _listeners: ((event: ToastEvent) => void)[] = [];
let _toastId   = 0;

/**
 * toast() — call from anywhere, no context needed.
 *
 *   toast('Message')
 *   toast.success('Saved!',  { description: 'Your file was saved.' })
 *   toast.error('Failed!',   { duration: 5000 })
 *   toast.promise(promise,   { loading: '…', success: 'Done', error: 'Oops' })
 */
export const toast = (message: string, options: ToastOptions = {}) => {
    const id = ++_toastId;
    const item: ToastData = { id, message, type: 'default', duration: 3000, ...options, exiting: false };
    _listeners.forEach((fn) => fn({ action: 'add', item }));
    return id;
};
toast.success = (msg: string, opts?: ToastOptions) => toast(msg, { type: 'success', ...opts });
toast.error   = (msg: string, opts?: ToastOptions) => toast(msg, { type: 'error',   ...opts });
toast.warning = (msg: string, opts?: ToastOptions) => toast(msg, { type: 'warning', ...opts });
toast.info    = (msg: string, opts?: ToastOptions) => toast(msg, { type: 'info',    ...opts });
toast.dismiss = (id: number) => _listeners.forEach((fn) => fn({ action: 'dismiss', id }));

toast.promise = (promise: Promise<unknown>, { loading, success, error }: { loading: string; success: string; error: string }) => {
    const id = toast(loading, { type: 'loading', duration: 0 });
    promise
        .then(() => _listeners.forEach((fn) => fn({ action: 'update', id, data: { message: success, type: 'success', duration: 3000 } })))
        .catch(() => _listeners.forEach((fn) => fn({ action: 'update', id, data: { message: error,   type: 'error',   duration: 3000 } })));
    return id;
};

// ── internal store hook ───────────────────────────────────────────────────────
const useToastStore = () => {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const dismiss = useCallback((id: number) => {
        setToasts((prev) => prev.map((t) => t.id === id ? { ...t, exiting: true } : t));
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 320);
    }, []);

    useEffect(() => {
        const handler = (event: ToastEvent) => {
            if (event.action === 'add') {
                const { item } = event;
                setToasts((prev) => [...prev, item]);
            } else if (event.action === 'dismiss') {
                dismiss(event.id);
            } else if (event.action === 'update') {
                const { id, data } = event;
                setToasts((prev) => prev.map((t) => t.id === id ? { ...t, ...data } : t));
                if (data.duration) setTimeout(() => dismiss(id), data.duration);
            }
        };
        _listeners.push(handler);
        return () => { _listeners = _listeners.filter((l) => l !== handler); };
    }, [dismiss]);

    // auto-dismiss
    const timerIds = useRef(new Set<number>());
    useEffect(() => {
        toasts.forEach((t) => {
            if (t.duration === 0 || t.exiting || timerIds.current.has(t.id)) return;
            timerIds.current.add(t.id);
            setTimeout(() => dismiss(t.id), t.duration);
        });
    }, [toasts, dismiss]);

    return { toasts, dismiss };
};

// ── icons & colors ────────────────────────────────────────────────────────────
const TYPE_ICON: Record<ToastType, ReactNode> = {
    success: <MdOutlineDone    className="text-green-500  text-[1.15rem] shrink-0 mt-0.5" />,
    error:   <BiError          className="text-red-500    text-[1.15rem] shrink-0 mt-0.5" />,
    warning: <IoWarningOutline className="text-yellow-500 text-[1.15rem] shrink-0 mt-0.5" />,
    info:    <MdOutlineInfo    className="text-blue-500   text-[1.15rem] shrink-0 mt-0.5" />,
    loading: (
        <svg className="animate-spin text-[#0FABCA] shrink-0 mt-0.5 w-[1.1rem] h-[1.1rem]"
            viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
        </svg>
    ),
    default: null,
};

const BORDER_COLOR: Record<ToastType, string> = {
    success: 'border-l-green-500',
    error:   'border-l-red-500',
    warning: 'border-l-yellow-500',
    info:    'border-l-blue-500',
    loading: 'border-l-[#0FABCA]',
    default: 'border-l-gray-300 dark:border-l-slate-600',
};

// animation name derived from position
const getAnimName = (pos: ToastPosition, exiting: boolean) => {
    const dir = pos.includes('right')  ? 'Right'
              : pos.includes('left')   ? 'Left'
              : pos.startsWith('top')  ? 'Top'
              : 'Bottom';
    return exiting ? `toastSlideOut${dir}` : `toastSlideIn${dir}`;
};

// ── ToastItem ─────────────────────────────────────────────────────────────────
interface ToastItemProps {
    toast: ToastData;
    onDismiss: (id: number) => void;
    position?: ToastPosition;
}

const ToastItem = ({ toast: t, onDismiss, position = 'bottom-right' }: ToastItemProps) => (
    <div
        style={{ animation: `${getAnimName(position, t.exiting)} 0.3s ease forwards` }}
        className={`
            flex items-start gap-3 px-4 py-3 min-w-[280px] max-w-[340px]
            bg-white dark:bg-slate-800
            border border-gray-200 dark:border-slate-700
            border-l-4 ${BORDER_COLOR[t.type] ?? BORDER_COLOR.default}
            rounded-lg shadow-lg
        `}
    >
        {TYPE_ICON[t.type]}
        <div className="flex-1 min-w-0">
            <p className="text-[0.85rem] font-semibold dark:text-[#abc2d3] text-gray-800 leading-snug">
                {t.message}
            </p>
            {t.description && (
                <p className="text-[0.75rem] dark:text-slate-400 text-gray-500 mt-0.5 leading-snug">
                    {t.description}
                </p>
            )}
            {t.action && (
                <button
                    onClick={t.action.onClick}
                    className="mt-1.5 text-[0.72rem] font-semibold text-[#0FABCA] hover:underline"
                >
                    {t.action.label}
                </button>
            )}
        </div>
        <button
            onClick={() => onDismiss(t.id)}
            className="shrink-0 mt-0.5 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
        >
            <RxCross1 className="text-[0.85rem]" />
        </button>
    </div>
);

// ── Toaster ───────────────────────────────────────────────────────────────────
const POSITION_CLASS: Record<ToastPosition, string> = {
    'top-left':      'top-5 left-5  items-start',
    'top-center':    'top-5 left-1/2 -translate-x-1/2 items-center',
    'top-right':     'top-5 right-5 items-end',
    'bottom-left':   'bottom-5 left-5  items-start',
    'bottom-center': 'bottom-5 left-1/2 -translate-x-1/2 items-center',
    'bottom-right':  'bottom-5 right-5 items-end',
};

/**
 * <Toaster position="bottom-right" />
 * Place once near the root of your app (e.g. App.jsx).
 */
export const Toaster = ({ position = 'bottom-right' }: { position?: ToastPosition }) => {
    const { toasts, dismiss } = useToastStore();
    const posClass = POSITION_CLASS[position] ?? POSITION_CLASS['bottom-right'];

    useEffect(() => { injectToastStyles(); }, []);

    return (
        <div className={`fixed ${posClass} flex flex-col gap-2 z-[9999] pointer-events-none`}>
            {toasts.map((t) => (
                <div key={t.id} className="pointer-events-auto">
                    <ToastItem toast={t} onDismiss={dismiss} position={position} />
                </div>
            ))}
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
//  Showcase page component
// ─────────────────────────────────────────────────────────────────────────────
const ToastShowcase = () => {
    const sectionIds = toastContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    useEffect(() => { injectToastStyles(); }, []);

    const [basicPreview,    setBasicPreview]    = useState(true);
    const [basicCode,       setBasicCode]       = useState(false);
    const [actionPreview,   setActionPreview]   = useState(true);
    const [actionCode,      setActionCode]      = useState(false);
    const [promisePreview,  setPromisePreview]  = useState(true);
    const [promiseCode,     setPromiseCode]     = useState(false);
    const [stackedPreview,  setStackedPreview]  = useState(true);
    const [stackedCode,     setStackedCode]     = useState(false);
    const [positionPreview, setPositionPreview] = useState(true);
    const [positionCode,    setPositionCode]    = useState(false);

    const [selectedPos, setSelectedPos] = useState<ToastPosition>('bottom-right');
    const POSITIONS: ToastPosition[] = ['top-left','top-center','top-right','bottom-left','bottom-center','bottom-right'];

    // stacked demo
    const [stack,   setStack]   = useState<{ id: number; message: string }[]>([]);
    const [hovered, setHovered] = useState(false);
    const counter = useRef(0);

    const pushStack = () => {
        const id = ++counter.current;
        setStack((prev) => [...prev.slice(-4), { id, message: `Notification #${id}` }]);
        setTimeout(() => setStack((prev) => prev.filter((t) => t.id !== id)), 4000);
    };

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div className='w-full 425px:w-[80%]'>

                    {/* ── 1. Basic ── */}
                    <ContentHeader text="basic toast" id="basic_toast" />
                    <ComponentDescription text="Call toast(), toast.success(), toast.error(), toast.warning(), or toast.info() from anywhere. No context or wrapper is needed." />
                    <ToggleTab preview={basicPreview} setPreview={setBasicPreview} code={basicCode} setCode={setBasicCode} />
                    <ComponentWrapper>
                        {basicPreview && (
                            <div className="p-8 flex flex-wrap gap-2 justify-center">
                                <button onClick={() => toast.success('Saved!', { description: 'Your changes have been saved.' })}
                                    className="px-4 py-1.5 text-sm rounded bg-green-500 text-white hover:opacity-90 transition-opacity">Success</button>
                                <button onClick={() => toast.error('Failed!', { description: 'Something went wrong.' })}
                                    className="px-4 py-1.5 text-sm rounded bg-red-500 text-white hover:opacity-90 transition-opacity">Error</button>
                                <button onClick={() => toast.warning('Heads up!', { description: 'Please review your input.' })}
                                    className="px-4 py-1.5 text-sm rounded bg-yellow-500 text-white hover:opacity-90 transition-opacity">Warning</button>
                                <button onClick={() => toast.info('Update available', { description: 'A new version is ready.' })}
                                    className="px-4 py-1.5 text-sm rounded bg-blue-500 text-white hover:opacity-90 transition-opacity">Info</button>
                                <Toaster position="bottom-right" />
                            </div>
                        )}
                        {basicCode && (
                            <Showcode code={[{id: 'toast', displayText: 'toast.tsx', language: 'tsx', code: toastSource}]} />
                        )}
                    </ComponentWrapper>

                    {/* ── 2. Action ── */}
                    <ContentHeader text="toast with action" id="toast_with_action" />
                    <ComponentDescription text="Pass an action object with a label and an onClick handler to add an inline button to any toast." />
                    <ToggleTab preview={actionPreview} setPreview={setActionPreview} code={actionCode} setCode={setActionCode} />
                    <ComponentWrapper>
                        {actionPreview && (
                            <div className="p-8 flex flex-wrap gap-3 justify-center">
                                <button
                                    onClick={() => toast.info('File deleted', {
                                        description: 'report.pdf was moved to trash.',
                                        action: { label: 'Undo', onClick: () => toast.success('Restored!') },
                                    })}
                                    className="px-5 py-2 text-sm rounded bg-[#0FABCA] text-white hover:opacity-90 transition-opacity">
                                    Delete File
                                </button>
                                <button
                                    onClick={() => toast.warning('Session expiring', {
                                        description: 'You will be logged out in 5 minutes.',
                                        duration: 6000,
                                        action: { label: 'Stay logged in', onClick: () => toast.success('Session extended!') },
                                    })}
                                    className="px-5 py-2 text-sm rounded bg-[#0FABCA] text-white hover:opacity-90 transition-opacity">
                                    Expire Session
                                </button>
                                <Toaster position="bottom-right" />
                            </div>
                        )}
                        {actionCode && (
                            <Showcode code={[
                                {id: 'example', displayText: 'Example.ts', language: 'ts', code: `
import { toast } from "./toast";

// replace these with your own logic
const restoreFile = () => toast.success("Restored!");
const refreshSession = () => toast.success("Session extended!");

// Pass action: { label, onClick } to any toast variant
toast.info("File deleted", {
  description: "report.pdf was moved to trash.",
  action: {
    label: "Undo",
    onClick: () => restoreFile(),
  },
});

toast.warning("Session expiring", {
  description: "You will be logged out in 5 minutes.",
  duration: 6000,
  action: {
    label: "Stay logged in",
    onClick: () => refreshSession(),
  },
});
            `},
                                {id: 'toast', displayText: 'toast.tsx', language: 'tsx', code: toastSource},
                            ]} />
                        )}
                    </ComponentWrapper>

                    {/* ── 3. Promise ── */}
                    <ContentHeader text="promise toast" id="promise_toast" />
                    <ComponentDescription text="Pass a promise along with loading, success, and error messages, and the toast updates automatically as the promise settles." />
                    <ToggleTab preview={promisePreview} setPreview={setPromisePreview} code={promiseCode} setCode={setPromiseCode} />
                    <ComponentWrapper>
                        {promisePreview && (
                            <div className="p-8 flex flex-wrap gap-3 justify-center">
                                <button
                                    onClick={() => {
                                        const p = new Promise((res) => setTimeout(res, 2000));
                                        toast.promise(p, { loading: 'Uploading file…', success: 'Upload complete!', error: 'Upload failed.' });
                                    }}
                                    className="px-5 py-2 text-sm rounded bg-[#0FABCA] text-white hover:opacity-90 transition-opacity">
                                    Upload (success)
                                </button>
                                <button
                                    onClick={() => {
                                        const p = new Promise((_, rej) => setTimeout(rej, 2000));
                                        toast.promise(p, { loading: 'Saving…', success: 'Saved!', error: 'Save failed.' });
                                    }}
                                    className="px-5 py-2 text-sm rounded bg-red-500 text-white hover:opacity-90 transition-opacity">
                                    Save (fail)
                                </button>
                                <Toaster position="bottom-right" />
                            </div>
                        )}
                        {promiseCode && (
                            <Showcode code={[
                                {id: 'example', displayText: 'upload.ts', language: 'ts', code: `
import { toast } from "./toast";

async function uploadFile(file: File) {
  const promise = fetch("/api/upload", { method: "POST", body: file });

  toast.promise(promise, {
    loading: "Uploading file…",
    success: "Upload complete!",
    error:   "Upload failed. Please try again.",
  });
}

// While pending → spinner + loading message
// On resolve    → success toast (auto-dismisses)
// On reject     → error toast   (auto-dismisses)
            `},
                                {id: 'toast', displayText: 'toast.tsx', language: 'tsx', code: toastSource},
                            ]} />
                        )}
                    </ComponentWrapper>

                    {/* ── 4. Stacked ── */}
                    <ContentHeader text="stacked toast" id="stacked_toast" />
                    <ComponentDescription text="Stacked toasts in the style of Sonner. Up to 3 are visible at once, and hovering fans them out." />
                    <ToggleTab preview={stackedPreview} setPreview={setStackedPreview} code={stackedCode} setCode={setStackedCode} />
                    <ComponentWrapper>
                        {stackedPreview && (
                            <div className="p-8 flex items-center justify-center">
                                <button onClick={pushStack}
                                    className="px-5 py-2 rounded bg-[#0FABCA] text-white text-sm hover:opacity-90 transition-opacity">
                                    Push Toast
                                </button>
                                <div
                                    className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end"
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                >
                                    {stack.map((t, i) => {
                                        const fromEnd    = stack.length - 1 - i;
                                        const scale      = hovered ? 1 : 1 - fromEnd * 0.04;
                                        const translateY = hovered ? fromEnd * -68 : fromEnd * -10;
                                        const opacity    = fromEnd >= 3 ? 0 : hovered ? 1 : 1 - fromEnd * 0.2;
                                        return (
                                            <div key={t.id} style={{
                                                position: 'absolute', bottom: 0,
                                                transform: `scale(${scale}) translateY(${translateY}px)`,
                                                opacity, transition: 'all 0.3s ease', zIndex: i,
                                            }}>
                                                <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg w-[280px]">
                                                    <MdOutlineDone className="text-green-500 text-[1.1rem] shrink-0" />
                                                    <p className="text-[0.85rem] dark:text-[#abc2d3] text-gray-800 flex-1">{t.message}</p>
                                                    <button onClick={() => setStack((p) => p.filter((x) => x.id !== t.id))}>
                                                        <RxCross1 className="text-gray-400 text-[0.85rem]" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        {stackedCode && (
                            <Showcode code='
import { useState, useRef } from "react";
import { MdOutlineDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

const VISIBLE = 3;

interface StackItem {
  id: number;
  message: string;
}

export default function StackedToast() {
  const [stack,   setStack]   = useState<StackItem[]>([]);
  const [hovered, setHovered] = useState(false);
  const counter = useRef(0);

  const push = () => {
    const id = ++counter.current;
    setStack((prev) => [...prev.slice(-4), { id, message: `Notification #${id}` }]);
    setTimeout(() => setStack((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  return (
    <>
      <button onClick={push}>Push Toast</button>

      <div
        className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {stack.map((t, i) => {
          const fromEnd    = stack.length - 1 - i;
          const scale      = hovered ? 1 : 1 - fromEnd * 0.04;
          const translateY = hovered ? fromEnd * -68 : fromEnd * -10;
          const opacity    = fromEnd >= VISIBLE ? 0 : hovered ? 1 : 1 - fromEnd * 0.2;

          return (
            <div key={t.id} style={{
              position: "absolute", bottom: 0,
              transform: `scale(${scale}) translateY(${translateY}px)`,
              opacity, transition: "all 0.3s ease", zIndex: i,
            }}>
              <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg w-[280px]">
                <MdOutlineDone className="text-green-500 text-[1.1rem] shrink-0" />
                <p className="flex-1 text-[0.85rem] text-gray-800 dark:text-[#abc2d3]">{t.message}</p>
                <button onClick={() => setStack((p) => p.filter((x) => x.id !== t.id))}>
                  <RxCross1 className="text-gray-400 text-[0.85rem]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
            ' />
                        )}
                    </ComponentWrapper>

                    {/* ── 5. Positions ── */}
                    <ContentHeader text="toast positions" id="toast_positions" />
                    <ComponentDescription text="Place toasts at any of 6 anchor points using the position prop on <Toaster />." />
                    <ToggleTab preview={positionPreview} setPreview={setPositionPreview} code={positionCode} setCode={setPositionCode} />
                    <ComponentWrapper>
                        {positionPreview && (
                            <div className="p-8 flex flex-col items-center gap-4">
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {POSITIONS.map((pos) => (
                                        <button key={pos} onClick={() => setSelectedPos(pos)}
                                            className={`px-3 py-1 text-xs rounded border transition-colors
                                                ${selectedPos === pos
                                                    ? 'bg-[#0FABCA] text-white border-[#0FABCA]'
                                                    : 'border-gray-300 dark:border-slate-600 dark:text-slate-300 text-gray-600 hover:border-[#0FABCA]'}`}>
                                            {pos}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => toast.success(selectedPos, { description: 'Toast rendered here.' })}
                                    className="px-5 py-2 text-sm rounded bg-[#0FABCA] text-white hover:opacity-90 transition-opacity">
                                    Show Toast
                                </button>
                                <Toaster position={selectedPos} />
                            </div>
                        )}
                        {positionCode && (
                            <Showcode code={[
                                {id: 'example', displayText: 'App.tsx', language: 'tsx', code: `
import { Toaster } from "./toast";

// Available positions:
// "top-left" | "top-center" | "top-right"
// "bottom-left" | "bottom-center" | "bottom-right"

// The slide-in direction is automatically derived from the position.
// right  → slides in from the right
// left   → slides in from the left
// top-*  → drops down from the top
// bottom-* → rises up from the bottom

export default function App() {
  return <Toaster position="top-right" />;
}
            `},
                                {id: 'toast', displayText: 'toast.tsx', language: 'tsx', code: toastSource},
                            ]} />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/notification'
                        backName='notification'
                        forwardName='badge'
                        forwardUrl='/components/badge'
                    />
                </div>

                <ContentNavbar contents={toastContents} activeSection={activeSection} />
            </aside>

            <Helmet>
                <title>Feedback - Toast</title>
            </Helmet>
        </>
    );
};

export default ToastShowcase;

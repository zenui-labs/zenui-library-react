// The toast API. Call toast() from anywhere; a <Toaster /> from Toaster.tsx shows the toasts.
// No context or provider is needed: toasts travel over a small module-level event bus.

export type ToastType = "default" | "success" | "error" | "warning" | "info" | "loading";

export interface ToastAction {
    label: string;
    onClick: () => void;
}

export interface ToastOptions {
    type?: ToastType;
    description?: string;
    /** Time on screen in milliseconds. 0 keeps the toast until it is dismissed. */
    duration?: number;
    /** Adds an inline button. The toast closes after the button runs its handler. */
    action?: ToastAction;
    /** Sends the toast to the <Toaster> with the same `toasterId`. Leave it out when your app has one toaster. */
    toasterId?: string;
}

export interface ToastData extends ToastOptions {
    id: number;
    message: string;
    type: ToastType;
    duration: number;
    exiting: boolean;
}

export interface ToastPromiseMessages {
    loading: string;
    success: string;
    error: string;
}

export type ToastEvent =
    | {kind: "add"; item: ToastData}
    | {kind: "dismiss"; id: number}
    | {kind: "update"; id: number; data: Partial<ToastData>};

type Listener = (event: ToastEvent) => void;

const DEFAULT_DURATION = 3000;

let listeners: Listener[] = [];
let lastId = 0;

const emit = (event: ToastEvent) => listeners.forEach((listener) => listener(event));

/** Used by <Toaster>. Returns a function that removes the listener. */
export const subscribeToToasts = (listener: Listener) => {
    listeners.push(listener);
    return () => {
        listeners = listeners.filter((item) => item !== listener);
    };
};

const show = (message: string, options: ToastOptions = {}) => {
    const id = ++lastId;
    emit({kind: "add", item: {id, message, type: "default", duration: DEFAULT_DURATION, ...options, exiting: false}});
    return id;
};

/**
 * toast("Message")
 * toast.success("Saved", {description: "Your file was saved."})
 * toast.error("Could not save", {duration: 5000})
 * toast.promise(request, {loading: "Saving…", success: "Saved", error: "Could not save"})
 * toast.dismiss(id)
 */
export const toast = Object.assign(show, {
    success: (message: string, options?: ToastOptions) => show(message, {...options, type: "success"}),
    error: (message: string, options?: ToastOptions) => show(message, {...options, type: "error"}),
    warning: (message: string, options?: ToastOptions) => show(message, {...options, type: "warning"}),
    info: (message: string, options?: ToastOptions) => show(message, {...options, type: "info"}),
    dismiss: (id: number) => emit({kind: "dismiss", id}),
    /** Shows a spinner while the promise is pending, then turns into a success or error toast. */
    promise: (promise: Promise<unknown>, messages: ToastPromiseMessages, options: Omit<ToastOptions, "type" | "duration"> = {}) => {
        const id = show(messages.loading, {...options, type: "loading", duration: 0});
        promise.then(
            () => emit({kind: "update", id, data: {message: messages.success, type: "success", duration: DEFAULT_DURATION}}),
            () => emit({kind: "update", id, data: {message: messages.error, type: "error", duration: DEFAULT_DURATION}}),
        );
        return id;
    },
});

import type {Example} from "../../types.ts";
import toastApiSource from "./toast.ts?raw";
import toasterComponentSource from "./Toaster.tsx?raw";
import BasicToast from "./BasicToast.example.tsx";
import basicToastSource from "./BasicToast.example.tsx?raw";
import ToastWithAction from "./ToastWithAction.example.tsx";
import toastWithActionSource from "./ToastWithAction.example.tsx?raw";
import PromiseToast from "./PromiseToast.example.tsx";
import promiseToastSource from "./PromiseToast.example.tsx?raw";
import StackedToast from "./StackedToast.example.tsx";
import stackedToastSource from "./StackedToast.example.tsx?raw";
import stackedToastComponentSource from "./StackedToast.tsx?raw";
import ToastPositions from "./ToastPositions.example.tsx";
import toastPositionsSource from "./ToastPositions.example.tsx?raw";

// The first four examples share one toast system: toast.ts holds the API and Toaster.tsx renders the toasts.
const toastFiles = [
    {name: "toast.ts", source: toastApiSource},
    {name: "Toaster.tsx", source: toasterComponentSource},
];

const examples: Example[] = [
    {
        id: "basic_toast",
        title: "Basic toast",
        description: "Call toast(), toast.success(), toast.error(), toast.warning() or toast.info() from anywhere. Place one <Toaster /> in your app and no context or provider is needed.",
        component: BasicToast,
        source: basicToastSource,
        files: toastFiles,
    },
    {
        id: "toast_with_action",
        title: "Toast with action",
        description: "Pass an action with a label and an onClick handler to add an inline button to any toast. The toast closes after the action runs.",
        component: ToastWithAction,
        source: toastWithActionSource,
        files: toastFiles,
    },
    {
        id: "promise_toast",
        title: "Promise toast",
        description: "Pass a promise with loading, success and error messages. The toast shows a spinner while the promise is pending and updates when it settles.",
        component: PromiseToast,
        source: promiseToastSource,
        files: toastFiles,
    },
    {
        id: "stacked_toast",
        title: "Stacked toast",
        description: "Toasts stacked in the style of Sonner. Up to three show at once, and hovering or focusing the stack fans them out.",
        component: StackedToast,
        source: stackedToastSource,
        files: [{name: "StackedToast.tsx", source: stackedToastComponentSource}],
    },
    {
        id: "toast_positions",
        title: "Toast positions",
        description: "Place toasts at any of six anchor points with the position prop on <Toaster />. The slide direction follows the position.",
        component: ToastPositions,
        source: toastPositionsSource,
        files: toastFiles,
    },
];

export default examples;

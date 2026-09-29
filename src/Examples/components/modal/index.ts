import type {Example} from "../../types.ts";
import AlertModal from "./AlertModal.example.tsx";
import alertModalSource from "./AlertModal.example.tsx?raw";
import alertModalComponentSource from "./AlertModal.tsx?raw";
import SuccessModal from "./SuccessModal.example.tsx";
import successModalSource from "./SuccessModal.example.tsx?raw";
import successModalComponentSource from "./SuccessModal.tsx?raw";
import InfoModal from "./InfoModal.example.tsx";
import infoModalSource from "./InfoModal.example.tsx?raw";
import infoModalComponentSource from "./InfoModal.tsx?raw";
import ConsentModal from "./ConsentModal.example.tsx";
import consentModalSource from "./ConsentModal.example.tsx?raw";
import consentModalComponentSource from "./ConsentModal.tsx?raw";
import SignInModal from "./SignInModal.example.tsx";
import signInModalSource from "./SignInModal.example.tsx?raw";
import signInModalComponentSource from "./SignInModal.tsx?raw";
import DeleteConfirmModal from "./DeleteConfirmModal.example.tsx";
import deleteConfirmModalSource from "./DeleteConfirmModal.example.tsx?raw";
import deleteConfirmModalComponentSource from "./DeleteConfirmModal.tsx?raw";
import FocusedModal from "./FocusedModal.example.tsx";
import focusedModalSource from "./FocusedModal.example.tsx?raw";
import focusedModalComponentSource from "./FocusedModal.tsx?raw";

const examples: Example[] = [
    {
        id: "alert_modal",
        title: "Alert modal",
        description: "A confirmation modal that scales in to draw attention to an action that can't be undone.",
        component: AlertModal,
        source: alertModalSource,
        files: [{name: "AlertModal.tsx", source: alertModalComponentSource}],
    },
    {
        id: "success_modal",
        title: "Success modal",
        description: "A modal with a check icon that confirms an action has completed.",
        component: SuccessModal,
        source: successModalSource,
        files: [{name: "SuccessModal.tsx", source: successModalComponentSource}],
    },
    {
        id: "Info_modal",
        title: "Info modal",
        description: "A modal with a header, body and actions that slides down from the top to present information.",
        component: InfoModal,
        source: infoModalSource,
        files: [{name: "InfoModal.tsx", source: infoModalComponentSource}],
    },
    {
        id: "Permission_modal",
        title: "Permission modal",
        description: "A modal that asks users to accept or decline terms or a permission request.",
        component: ConsentModal,
        source: consentModalSource,
        files: [{name: "ConsentModal.tsx", source: consentModalComponentSource}],
    },
    {
        id: "Form_modal",
        title: "Form modal",
        description: "A sign in form in a modal, for collecting details without leaving the page. The values come back through `onSubmit`.",
        component: SignInModal,
        source: signInModalSource,
        files: [{name: "SignInModal.tsx", source: signInModalComponentSource}],
    },
    {
        id: "delete_modal",
        title: "Delete modal",
        description: "A delete confirmation that keeps the delete button off until the user types DELETE, so nothing is removed by accident.",
        component: DeleteConfirmModal,
        source: deleteConfirmModalSource,
        files: [{name: "DeleteConfirmModal.tsx", source: deleteConfirmModalComponentSource}],
    },
    {
        id: "blur_background_modal",
        title: "Focused modal",
        description: "A modal over a blurred, frosted glass backdrop that keeps attention on the dialog while the page stays visible behind it.",
        component: FocusedModal,
        source: focusedModalSource,
        files: [{name: "FocusedModal.tsx", source: focusedModalComponentSource}],
    },
];

export default examples;

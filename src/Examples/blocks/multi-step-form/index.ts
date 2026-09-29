import type {Example} from "../../types.ts";
import JobApplicationForm from "./JobApplicationForm.example.tsx";
import jobApplicationFormSource from "./JobApplicationForm.example.tsx?raw";
import jobApplicationFormComponentSource from "./JobApplicationForm.tsx?raw";
import AccountSetupForm from "./AccountSetupForm.example.tsx";
import accountSetupFormSource from "./AccountSetupForm.example.tsx?raw";
import accountSetupFormComponentSource from "./AccountSetupForm.tsx?raw";

const examples: Example[] = [
    {
        id: "multi_step_form_1",
        title: "Multi-step form 1",
        description: "A job application split into location, role and profile steps, with a labeled progress bar, a file upload and a confirmation screen. Use it when a long form reads better one section at a time.",
        component: JobApplicationForm,
        source: jobApplicationFormSource,
        files: [{name: "JobApplicationForm.tsx", source: jobApplicationFormComponentSource}],
        layout: "full",
        minHeight: 640,
    },
    {
        id: "multi_step_form_2",
        title: "Multi-step form 2",
        description: "A three step sign-up form with a numbered progress bar for account type, personal details and profile details. Use it for account creation or onboarding.",
        component: AccountSetupForm,
        source: accountSetupFormSource,
        files: [{name: "AccountSetupForm.tsx", source: accountSetupFormComponentSource}],
        layout: "full",
        minHeight: 560,
    },
];

export default examples;

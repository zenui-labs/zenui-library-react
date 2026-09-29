import {LuCode, LuMegaphone, LuPalette, LuUsers} from "react-icons/lu";
import {OnboardingSteps, type OnboardingUseCase} from "./OnboardingSteps";

const useCases: OnboardingUseCase[] = [
    {id: "engineering", label: "Engineering", hint: "Sprints, bugs and releases", icon: LuCode, sections: ["Backlog", "Current sprint", "Releases"]},
    {id: "design", label: "Design", hint: "Reviews, specs and handoff", icon: LuPalette, sections: ["Reviews", "Specs", "Handoff"]},
    {id: "marketing", label: "Marketing", hint: "Campaigns and content", icon: LuMegaphone, sections: ["Campaigns", "Content calendar", "Launches"]},
    {id: "operations", label: "Operations", hint: "Hiring, IT and requests", icon: LuUsers, sections: ["Requests", "Hiring", "IT"]},
];

const OnboardingStepsExample = () => (
    <OnboardingSteps
        useCases={useCases}
        defaultWorkspace="Brightline Studio"
        defaultInvites={["jordan@brightline.studio"]}
        resetLabel="Start over"
    />
);

export default OnboardingStepsExample;

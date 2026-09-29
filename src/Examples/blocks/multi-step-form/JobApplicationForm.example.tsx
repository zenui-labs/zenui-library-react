import {JobApplicationForm, type JobRole} from "./JobApplicationForm";

const locations = ["Moulvibazar", "Sylhet", "Juri", "BuwaiBazar"];

const roles: JobRole[] = [
    {id: "front-end", title: "Front-End Developer", description: "Build and ship interfaces in React and TypeScript.", hourlyRate: 50},
    {id: "back-end", title: "Back-End Developer", description: "Design APIs and keep the databases behind them fast.", hourlyRate: 100},
    {id: "laravel", title: "Laravel Developer", description: "Maintain PHP services and the admin tools built on them.", hourlyRate: 80},
    {id: "mern", title: "MERN Stack Developer", description: "Work across MongoDB, Express, React and Node.", hourlyRate: 110},
];

// Send the answers to your API in onSubmit. The form moves to its confirmation step on its own.
const JobApplicationFormExample = () => (
    <div className="p-4 sm:p-8">
        <JobApplicationForm locationSuggestions={locations} roles={roles}/>
    </div>
);

export default JobApplicationFormExample;

import {TitledAlert, type AlertVariant} from "./TitledAlert";

const alerts: {variant: AlertVariant; title: string; message: string}[] = [
    {variant: "success", title: "Message title", message: "This is a success alert."},
    {variant: "info", title: "Message title", message: "This is an info alert."},
    {variant: "error", title: "Message title", message: "This is an error alert."},
    {variant: "warning", title: "Message title", message: "This is a warning alert."},
];

const TitledAlertExample = () => (
    <div className="w-full flex flex-col gap-4">
        {alerts.map((alert) => (
            <TitledAlert key={alert.variant} variant={alert.variant} title={alert.title} message={alert.message}/>
        ))}
    </div>
);

export default TitledAlertExample;

import {SoftAlert, type AlertVariant} from "./SoftAlert";

const alerts: {variant: AlertVariant; message: string}[] = [
    {variant: "success", message: "This is a success alert."},
    {variant: "info", message: "This is an info alert."},
    {variant: "error", message: "This is an error alert."},
    {variant: "warning", message: "This is a warning alert."},
];

const SoftAlertExample = () => (
    <div className="w-full flex flex-col gap-4">
        {alerts.map((alert) => (
            <SoftAlert key={alert.variant} variant={alert.variant} message={alert.message}/>
        ))}
    </div>
);

export default SoftAlertExample;

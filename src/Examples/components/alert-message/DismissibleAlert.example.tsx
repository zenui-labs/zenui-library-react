import {useState} from "react";

import {DismissibleAlert, type AlertVariant} from "./DismissibleAlert";

const alerts: {variant: AlertVariant; message: string}[] = [
    {variant: "success", message: "This is a success alert."},
    {variant: "info", message: "This is an info alert."},
    {variant: "error", message: "This is an error alert."},
    {variant: "warning", message: "This is a warning alert."},
];

const DismissibleAlertExample = () => {
    const [dismissed, setDismissed] = useState(0);
    // Changing the key remounts the alerts, which brings closed ones back.
    const [round, setRound] = useState(0);

    const reset = () => {
        setDismissed(0);
        setRound((value) => value + 1);
    };

    return (
        <div className="w-full flex flex-col gap-4">
            {alerts.map((alert) => (
                <DismissibleAlert
                    key={`${round}-${alert.variant}`}
                    variant={alert.variant}
                    message={alert.message}
                    onDismiss={() => setDismissed((count) => count + 1)}
                />
            ))}
            {dismissed === alerts.length && (
                <button
                    type="button"
                    onClick={reset}
                    className="self-center px-4 py-1.5 text-sm rounded border border-gray-300 dark:border-slate-600 text-gray-600 dark:text-slate-300 hover:border-[#0FABCA] transition-colors"
                >
                    Show alerts again
                </button>
            )}
        </div>
    );
};

export default DismissibleAlertExample;

import {useState} from "react";
import {FromToDatePicker} from "./FromToDatePicker";

const format = (date: Date) => date.toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"});

const FromToDatePickerExample = () => {
    const [confirmed, setConfirmed] = useState<string | null>(null);

    return (
        <div className="flex w-full flex-col items-center gap-3">
            <FromToDatePicker
                onChange={() => setConfirmed(null)}
                onConfirm={({from, to}) => setConfirmed(`Booked ${format(from)} to ${format(to)}`)}
            />
            {confirmed && (
                <p className="text-sm text-gray-600 dark:text-slate-300" role="status">
                    {confirmed}
                </p>
            )}
        </div>
    );
};

export default FromToDatePickerExample;

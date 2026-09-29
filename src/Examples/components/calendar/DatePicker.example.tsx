import {useState} from "react";
import {DatePicker} from "./DatePicker";

const DatePickerExample = () => {
    const [date, setDate] = useState<Date | null>(null);

    return <DatePicker value={date} onChange={setDate}/>;
};

export default DatePickerExample;

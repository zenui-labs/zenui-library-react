import {useState} from "react";
import {DateRangePicker, type DateRange} from "./DateRangePicker";

const DateRangePickerExample = () => {
    const [range, setRange] = useState<DateRange>({start: null, end: null});

    return <DateRangePicker value={range} onChange={setRange}/>;
};

export default DateRangePickerExample;

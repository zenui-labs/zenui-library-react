import {useState} from "react";
import {DrumPicker, type DrumColumn} from "./DrumPicker";

const pad = (n: number) => String(n).padStart(2, "0");
const today = new Date();

const days = Array.from({length: 120}, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    const label = i === 0 ? "Today" : date.toLocaleDateString("en-GB", {weekday: "short", day: "numeric", month: "short"});
    return {value: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`, label};
});

const columns: DrumColumn[] = [
    {id: "day", label: "Sailing", options: days, grow: 2.3, align: "end"},
    {id: "hour", label: "Hr", loop: true, options: Array.from({length: 12}, (_, i) => ({value: String(i + 1), label: String(i + 1)}))},
    {id: "minute", label: "Min", loop: true, options: Array.from({length: 12}, (_, i) => ({value: pad(i * 5), label: pad(i * 5)}))},
    {id: "meridiem", label: "AM/PM", options: [{value: "AM", label: "AM"}, {value: "PM", label: "PM"}], align: "start"},
];

// Split to Stari Grad takes 2 h 5 min on the car ferry.
const CROSSING = 125;

const DrumPickerExample = () => {
    const [value, setValue] = useState({day: days[1].value, hour: "7", minute: "35", meridiem: "AM"});
    const start = (Number(value.hour) % 12 + (value.meridiem === "PM" ? 12 : 0)) * 60 + Number(value.minute);
    const arrive = (start + CROSSING) % (24 * 60);
    const arrival = `${(Math.floor(arrive / 60) % 12) || 12}:${pad(arrive % 60)} ${arrive >= 720 ? "PM" : "AM"}`;
    const day = days.find((d) => d.value === value.day)?.label;

    return (
        <div className="w-full max-w-md">
            <div className="mb-4 flex items-end justify-between gap-4 px-1">
                <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">Split → Stari Grad</p>
                    <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-white">
                        {day}, <span className="tabular-nums">{value.hour}:{value.minute} {value.meridiem}</span>
                    </p>
                </div>
                <p className="text-right text-xs text-zinc-500 dark:text-zinc-400">
                    Arrives <span className="font-medium tabular-nums text-zinc-900 dark:text-white">{arrival}</span>
                    <br/>2 h 5 min crossing
                </p>
            </div>
            <DrumPicker
                label="Departure"
                columns={columns}
                value={value}
                onChange={(id, next) => setValue((current) => ({...current, [id]: next}))}
            />
        </div>
    );
};

export default DrumPickerExample;

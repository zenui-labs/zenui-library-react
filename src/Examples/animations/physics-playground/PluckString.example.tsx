import {Fragment} from "react";
import {PluckString, type PluckStringProps} from "./PluckString";

// Top to bottom like guitar tab: high E first, low E last.
const strings: PluckStringProps[] = [
    {note: "E4", gauge: ".010", thickness: 0.8},
    {note: "B3", gauge: ".013", thickness: 1},
    {note: "G3", gauge: ".017", thickness: 1.3},
    {note: "D3", gauge: ".026", thickness: 1.7, wound: true},
    {note: "A2", gauge: ".036", thickness: 2.2, wound: true},
    {note: "E2", gauge: ".046", thickness: 2.7, wound: true},
];

const running = [
    {time: "19:00", title: "Doors", detail: "Bar open, cloakroom downstairs"},
    {time: "19:45", title: "Marlow Fen", detail: "Support · 35 min"},
    {time: "20:40", title: "The Quiet Arcade", detail: "Headline · 80 min"},
    {time: "22:05", title: "Encore", detail: "Two songs, no promises"},
    {time: "22:30", title: "Curfew", detail: "Venue clear by 23:00"},
];

const PluckStringExample = () => (
    <section className="w-full max-w-2xl">
        <header className="mb-2 flex items-baseline justify-between pl-[52px]">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-zinc-100">Running order</h3>
            <p className="font-mono text-[11px] text-stone-400 dark:text-zinc-500">The Lexington · Thu 2 Oct</p>
        </header>
        {strings.map((string, index) => (
            <Fragment key={string.note}>
                <PluckString {...string}/>
                {running[index] && (
                    <div className="grid grid-cols-[3rem_1fr] gap-x-3 py-1.5 pl-[52px] sm:grid-cols-[3rem_1fr_auto]">
                        <span className="font-mono text-xs tabular-nums text-stone-400 dark:text-zinc-500">{running[index].time}</span>
                        <span className="text-sm font-medium text-stone-900 dark:text-zinc-100">{running[index].title}</span>
                        <span className="col-start-2 text-xs text-stone-500 dark:text-zinc-400 sm:col-start-auto">{running[index].detail}</span>
                    </div>
                )}
            </Fragment>
        ))}
    </section>
);

export default PluckStringExample;

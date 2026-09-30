import {DotMatrixSign, type DotMatrixMessage} from "./DotMatrixSign";

const tram: DotMatrixMessage[] = [
    {text: "Martim Moniz", effect: "wipe", hold: 3},
    {text: "via Graça · Estrela · Prazeres", effect: "scroll"},
];

const counter: DotMatrixMessage[] = [
    {text: "Now serving", effect: "wipe", hold: 1.2},
    {text: "A-047  Desk 3", effect: "blink", hold: 3},
    {text: "Please have your passport and appointment letter ready", effect: "scroll"},
];

const DotMatrixSignExample = () => (
    <div className="flex w-full max-w-3xl flex-col items-center gap-6">
        <DotMatrixSign badge="28" messages={tram} color="amber" columns={76} label="Tram 28 destination sign"/>
        <DotMatrixSign messages={counter} color="red" columns={64} speed={26} label="Queue display"/>
    </div>
);

export default DotMatrixSignExample;

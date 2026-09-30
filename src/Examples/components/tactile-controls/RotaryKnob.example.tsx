import {RotaryKnob} from "./RotaryKnob";

const hertz = (value: number) => (value >= 1000 ? `${Number((value / 1000).toFixed(value >= 10000 ? 1 : 2))} kHz` : `${Math.round(value)} Hz`);

const RotaryKnobExample = () => (
    <div className="w-full max-w-lg rounded-xl border border-stone-300 bg-gradient-to-b from-stone-100 to-stone-200 px-4 pb-5 pt-3 shadow-[inset_0_1px_0_white] dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="mb-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500 dark:text-zinc-500">
            <span>Ladder filter · VCF-2</span>
            <span>Ch 1</span>
        </div>
        <div className="flex flex-wrap items-start justify-around gap-x-4 gap-y-6">
            <RotaryKnob label="Cutoff" min={20} max={20000} defaultValue={2400} scale="log" detents={101} format={hertz}/>
            <RotaryKnob label="Resonance" min={0} max={100} defaultValue={35} detents={101} format={(v) => `${Math.round(v)} %`}/>
            <RotaryKnob label="Drive" min={0} max={24} defaultValue={6} detents={49} format={(v) => `+${v.toFixed(1)} dB`}/>
        </div>
    </div>
);

export default RotaryKnobExample;

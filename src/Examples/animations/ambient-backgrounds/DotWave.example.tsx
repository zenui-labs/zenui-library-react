import {DotWave} from "./DotWave";

const DotWaveExample = () => (
    <DotWave>
        <div className="pointer-events-none relative max-w-md text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>
                All systems operational
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Every node, one network
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">
                Traffic from 2,400 edge nodes, routed in real time. Click the grid to send a pulse.
            </p>
        </div>
    </DotWave>
);

export default DotWaveExample;

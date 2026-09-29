import {useReducedMotion} from "framer-motion";
import {ParticleTrail} from "./ParticleTrail";

const ParticleTrailExample = () => {
    const reduceMotion = useReducedMotion();

    return (
        <ParticleTrail>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Launch week, day 3</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Every edit, live for everyone</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-slate-400">
                Multiplayer cursors are now in every workspace.{" "}
                {reduceMotion ? "The trail is off because reduced motion is on." : "Move your pointer here to leave a trail."}
            </p>
        </ParticleTrail>
    );
};

export default ParticleTrailExample;

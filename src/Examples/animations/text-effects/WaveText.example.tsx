import {useState} from "react";
import {VscDebugRestart} from "react-icons/vsc";
import {WaveText} from "./WaveText";

const WaveTextExample = () => {
    // Changing the key remounts the text, which plays the animation again.
    const [run, setRun] = useState(0);

    return (
        <div className="w-full flex items-center gap-12 justify-center flex-col">
            <WaveText key={run} text="Text Wave Animation"/>

            <button
                type="button"
                onClick={() => setRun((value) => value + 1)}
                className="py-1.5 px-3 bg-[#3B9DF8]/30 text-[0.9rem] hover:bg-[#3B9DF8]/40 active:scale-[0.95] transition-all duration-200 dark:text-[#abc2d3] rounded-lg flex items-center gap-2"
            >
                <VscDebugRestart aria-hidden="true"/>
                Restart
            </button>
        </div>
    );
};

export default WaveTextExample;

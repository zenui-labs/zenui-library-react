import {useState} from "react";
import {VscDebugRestart} from "react-icons/vsc";
import {SpoilerText} from "./SpoilerText";

const SpoilerTextExample = () => {
    // Changing the key remounts the heading, which hides every spoiler again.
    const [run, setRun] = useState(0);

    return (
        <div className="w-full flex items-center gap-12 justify-center flex-col max-w-[800px]">
            <h5 key={run} className="text-3xl text-center leading-relaxed font-bold mt-3 text-gray-800 dark:text-gray-100">
                Build your project with{" "}
                <SpoilerText>free UI components,</SpoilerText>{" "}
                <SpoilerText>customizable icons,</SpoilerText>{" "}
                and a{" "}
                <SpoilerText>color palette</SpoilerText>
                . No{" "}
                <SpoilerText>dependencies</SpoilerText>{" "}
                required 🤫
            </h5>

            <button
                type="button"
                onClick={() => setRun((value) => value + 1)}
                className="py-1.5 px-3 bg-blue-500/30 text-sm hover:bg-blue-500/40 active:scale-95 transition-all duration-200 text-gray-700 dark:text-gray-300 rounded-lg flex items-center gap-2"
            >
                <VscDebugRestart aria-hidden="true"/>
                Restart
            </button>
        </div>
    );
};

export default SpoilerTextExample;

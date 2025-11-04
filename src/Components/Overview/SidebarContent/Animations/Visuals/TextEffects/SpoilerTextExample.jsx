import {useRef} from "react";
import {VscDebugRestart} from "react-icons/vsc";
import SpoilerAnimationCore from "@animations/Visuals/TextEffects/SpoilerAnimationCore.jsx";

const SpoilerTextExample = () => {
    const spoilerRefs = useRef([]);

    const registerRef = (el, index) => {
        if (el) spoilerRefs.current[index] = el;
    };

    const handleRestart = () => {
        spoilerRefs.current.forEach((ref) => ref?.restart());
    };

    return (
        <div className="w-full flex items-center gap-12 justify-center flex-col max-w-[800px]">
            <h5 className="text-3xl text-center leading-relaxed font-bold mt-3 text-gray-800 dark:text-gray-100">
                Elevate your project with{" "}
                <SpoilerAnimationCore ref={(el) => registerRef(el, 0)}>
                    free UI components,
                </SpoilerAnimationCore>{" "}
                <SpoilerAnimationCore ref={(el) => registerRef(el, 1)}>
                    customizable icons,
                </SpoilerAnimationCore>{" "}
                and a{" "}
                <SpoilerAnimationCore ref={(el) => registerRef(el, 2)}>
                    color palette
                </SpoilerAnimationCore>
                . No{" "}
                <SpoilerAnimationCore ref={(el) => registerRef(el, 3)}>
                    dependencies
                </SpoilerAnimationCore>{" "}
                required 🤫
            </h5>

            <button
                onClick={handleRestart}
                className="py-1.5 px-3 bg-blue-500/30 text-sm hover:bg-blue-500/40 active:scale-95 transition-all duration-200 text-gray-700 dark:text-gray-300 rounded-lg flex items-center gap-2"
            >
                <VscDebugRestart/>
                Restart
            </button>
        </div>
    );
};

export default SpoilerTextExample;

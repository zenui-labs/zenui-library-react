import {useState} from "react";
import {LuLayers, LuMic, LuMicOff, LuRadio, LuVideo} from "react-icons/lu";
import {Keycap, KeycapPad} from "./KeycapButtons";

// A small stream deck: two toggle keys, a push key that counts presses and a disabled key.
const KeycapButtonsExample = () => {
    const [muted, setMuted] = useState(false);
    const [recording, setRecording] = useState(true);
    const [scenes, setScenes] = useState(0);

    return (
        <div className="flex flex-col items-center gap-5">
            <KeycapPad>
                <Keycap label={muted ? "Unmute" : "Mute mic"} icon={muted ? LuMicOff : LuMic} pressed={muted} onPress={() => setMuted((value) => !value)}/>
                <Keycap label="Record" icon={LuVideo} tone="red" pressed={recording} onPress={() => setRecording((value) => !value)}/>
                <Keycap label="Next scene" icon={LuLayers} tone="indigo" onPress={() => setScenes((value) => value + 1)}/>
                <Keycap label="Go live" icon={LuRadio} disabled/>
            </KeycapPad>
            <p className="text-xs text-gray-500 dark:text-slate-400" aria-live="polite">
                Mic {muted ? "muted" : "on"}, {recording ? "recording" : "not recording"}, scene {(scenes % 4) + 1} of 4
            </p>
        </div>
    );
};

export default KeycapButtonsExample;

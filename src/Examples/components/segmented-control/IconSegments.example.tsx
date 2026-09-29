import {useEffect, useState} from "react";
import {LuAlignJustify, LuLaptop, LuList, LuMoon, LuStretchVertical, LuSun} from "react-icons/lu";
import {IconSegments, SettingRow, SettingsCard, type IconOption} from "./IconSegments";

type Theme = "light" | "dark" | "system";
type Density = "compact" | "default" | "comfortable";

const themes: IconOption<Theme>[] = [
    {value: "light", label: "Light", icon: LuSun},
    {value: "dark", label: "Dark", icon: LuMoon},
    {value: "system", label: "Match system", icon: LuLaptop},
];

const densities: IconOption<Density>[] = [
    {value: "compact", label: "Compact", icon: LuAlignJustify},
    {value: "default", label: "Default", icon: LuList},
    {value: "comfortable", label: "Comfortable", icon: LuStretchVertical},
];

const rowHeight: Record<Density, string> = {compact: "h-6", default: "h-8", comfortable: "h-10"};

const inbox = ["Quarterly planning notes", "Design review moved to 3 PM", "Invoice #4821 is ready", "New comment on ENG-482"];

// A small inbox that follows the chosen theme and density.
const InboxPreview = ({dark, density}: {dark: boolean; density: Density}) => (
    <div className={`rounded-xl border p-2 shadow-sm transition-colors duration-300 ${dark ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-white"}`}>
        {inbox.map((subject, index) => (
            <div
                key={subject}
                className={`flex items-center gap-2.5 rounded-md px-2 text-xs transition-all duration-300 ${rowHeight[density]} ${
                    index === 0 ? (dark ? "bg-white/[0.06]" : "bg-zinc-100") : ""
                } ${dark ? "text-zinc-300" : "text-zinc-700"}`}
            >
                <span className={`size-1.5 rounded-full ${index < 2 ? "bg-indigo-500" : "bg-transparent"}`}/>
                <span className="truncate">{subject}</span>
            </div>
        ))}
    </div>
);

const IconSegmentsExample = () => {
    const [theme, setTheme] = useState<Theme>("system");
    const [density, setDensity] = useState<Density>("default");
    const [systemDark, setSystemDark] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const sync = () => setSystemDark(media.matches);
        sync();
        media.addEventListener("change", sync);
        return () => media.removeEventListener("change", sync);
    }, []);

    const dark = theme === "dark" || (theme === "system" && systemDark);

    return (
        <SettingsCard preview={<InboxPreview dark={dark} density={density}/>}>
            <SettingRow title="Appearance" detail={themes.find((option) => option.value === theme)?.label}>
                <IconSegments label="Appearance" options={themes} value={theme} onChange={(next) => setTheme(next)}/>
            </SettingRow>
            <SettingRow title="Row density" detail={densities.find((option) => option.value === density)?.label}>
                <IconSegments label="Row density" options={densities} value={density} onChange={(next) => setDensity(next)}/>
            </SettingRow>
        </SettingsCard>
    );
};

export default IconSegmentsExample;

import {FisheyeIndex} from "./FisheyeIndex";

const parts = ["Getting started", "Recording", "Microphones", "Monitoring", "Playback and editing", "Files", "Reference"];

// Chapter, title, first page, one-line summary.
const toc: [string, string, number, string][] = [
    ["1.1", "In the box", 4, "What ships with the T-4 and what to buy separately."],
    ["1.2", "Controls at a glance", 6, "Every button, dial and port, front and back."],
    ["1.3", "Power and batteries", 10, "AA cells, USB-C power and the external 12 V input."],
    ["1.4", "Memory cards", 13, "Formatting microSD cards and choosing a speed class."],
    ["1.5", "Setting the clock", 15, "Date, time and time zone for file names and timecode."],
    ["1.6", "Firmware updates", 16, "Updating from a card without losing your presets."],
    ["2.1", "Choosing inputs", 18, "Internal pair, the two XLR combo jacks, or both."],
    ["2.2", "Setting levels", 21, "Peak around −12 dBFS and leave room for surprises."],
    ["2.3", "Limiter and low cut", 25, "Taming transients and wind rumble before they hit the file."],
    ["2.4", "Dual-level safety track", 28, "A second copy 12 dB quieter, in case someone shouts."],
    ["2.5", "Pre-record buffer", 30, "Keep the two seconds before you pressed record."],
    ["2.6", "Timecode", 32, "Jamming, free run and syncing with a camera."],
    ["2.7", "Markers", 35, "Dropping marks while recording and finding them later."],
    ["3.1", "Internal X/Y pair", 37, "Angle, pattern and when to switch to A-B."],
    ["3.2", "Plug-in power", 40, "Powering lavalier mics from the 3.5 mm input."],
    ["3.3", "Phantom power", 41, "+24 V and +48 V, and what they do to battery life."],
    ["3.4", "Wind and handling noise", 43, "Foam, fur and holding the recorder still."],
    ["3.5", "Mid/side decoding", 46, "Recording M/S and choosing the width later."],
    ["4.1", "Headphone output", 49, "Level, impedance and the soft limiter."],
    ["4.2", "Meters", 51, "Reading peak hold and the clip counter."],
    ["4.3", "Monitor mix", 53, "Blending inputs in your ears without touching the file."],
    ["5.1", "Playback", 55, "Scrubbing, looping and variable speed."],
    ["5.2", "Trimming takes", 58, "Cutting the heads and tails of a take in place."],
    ["5.3", "Normalising", 60, "Raising a quiet take to a target peak."],
    ["5.4", "Renaming files", 61, "Scene and take naming, and the on-screen keyboard."],
    ["5.5", "Deleting takes", 63, "Moving takes to the trash folder and emptying it."],
    ["6.1", "Folder structure", 64, "How projects, days and takes are laid out on the card."],
    ["6.2", "File formats", 66, "WAV and BWF at 44.1 to 192 kHz, 24-bit or 32-bit float."],
    ["6.3", "Metadata", 69, "Scene, take, notes and iXML fields."],
    ["6.4", "USB transfer", 71, "Mounting the card on a computer or phone."],
    ["6.5", "Audio interface mode", 73, "Using the T-4 as a 4-in, 2-out interface."],
    ["7.1", "Menu map", 76, "Every menu item on one spread."],
    ["7.2", "Specifications", 80, "Noise floor, gain range, weight and size."],
    ["7.3", "Battery life table", 82, "Hours by input, format and phantom voltage."],
    ["7.4", "Error messages", 83, "What each code means and what to do about it."],
    ["7.5", "Troubleshooting", 85, "Hum, clicks, dropouts and files that will not open."],
    ["7.6", "Care and storage", 88, "Cold, heat, damp and long periods unused."],
    ["7.7", "Warranty", 89, "Two years, and what it covers."],
];

const chapters = toc.map(([marker, label, page, summary], index) => ({
    id: `ch-${marker}`,
    marker,
    label,
    page,
    pages: (toc[index + 1]?.[2] ?? 91) - page,
    summary,
    part: parts[Number(marker[0]) - 1],
}));

const FisheyeIndexExample = () => (
    <FisheyeIndex
        label="Tern T-4 field recorder manual"
        items={chapters}
        initialIndex={8}
        renderPreview={(chapter) => (
            <article>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
                    Part {chapter.marker[0]} · {chapter.part}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    <span className="mr-2 font-mono font-normal text-orange-600 dark:text-orange-400">{chapter.marker}</span>
                    {chapter.label}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{chapter.summary}</p>
                <p className="mt-6 font-mono text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
                    p. {chapter.page}{chapter.pages > 1 ? `–${chapter.page + chapter.pages - 1}` : ""} · {chapter.pages} {chapter.pages === 1 ? "page" : "pages"}
                </p>
            </article>
        )}
    />
);

export default FisheyeIndexExample;

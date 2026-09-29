import {useRef, useState} from 'react';
import tinycolor from 'tinycolor2';
import {generate} from '@ant-design/colors';
import {LuArrowRight} from "react-icons/lu";

import {cn} from "@utils/Style.ts";
import ColorCodeCopyModal from "./ColorCodeCopyModal.tsx";
import ColorPickerFromImage from "./ColorPickerFromImage.tsx";

// Labels for the ten steps @ant-design/colors returns. Step 500 is the color you entered.
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const generateShades = (baseColor) => {
    const color = tinycolor(baseColor);
    if (color.isValid()) {
        return generate(baseColor);
    }
    return [];
};

const ShadePalette = () => {
    const [colors, setColors] = useState([
        '#FF2056', '#F6339A', '#E12AFB', '#AD46FF',
        '#8E51FF', '#2B7FFF', '#00A6F4', '#00B8DB',
        '#00BBA7', '#00C951', '#FB2C36',
        '#FE9A00', '#90A1B9', '#D6D3D1', '#FFB86A',
        '#9933FF', '#FF3399', '#8A0194', '#A50036',
    ]);
    const [colorInput, setColorInput] = useState('');
    const [isCopyClicked, setIsCopyClicked] = useState(false);
    const [clipboardColor, setClipboardColor] = useState({});
    const [invalidColorCode, setInvalidColorCode] = useState(false);
    const invalidTimer = useRef(null);

    const preview = tinycolor(colorInput);
    const hasPreview = colorInput.trim() !== '' && preview.isValid();

    const addColor = (event) => {
        event?.preventDefault();
        const color = tinycolor(colorInput);

        if (color.isValid()) {
            setColors([colorInput, ...colors]);
            setColorInput('');
            setInvalidColorCode(false);
        } else {
            setInvalidColorCode(true);
            clearTimeout(invalidTimer.current);
            invalidTimer.current = setTimeout(() => setInvalidColorCode(false), 5000);
        }
    };

    const addColorFromImage = (color) => setColors((current) => [color, ...current]);

    const copyToClipboard = (color, step) => {
        const tiny = tinycolor(color);

        if (!tiny.isValid()) return;

        setClipboardColor({
            hex: tiny.toHexString().toUpperCase(),
            rgb: tiny.toRgbString(),
            hsl: tiny.toHslString(),
            step,
        });
        setIsCopyClicked(true);
    };

    return (
        <div className="shell pb-20 pt-10">
            <header className="max-w-[62ch]">
                <h1 className="text-[2.2rem] font-semibold leading-tight tracking-display text-ink 640px:text-[2.8rem]">
                    Color palette
                </h1>
                <p className="mt-3 text-[1rem] leading-relaxed text-ink-muted 640px:text-[1.05rem]">
                    Enter any color to get a ten-step scale from light to dark. Click a swatch to copy it as HEX, RGB
                    or HSL, or sample a starting color from an image.
                </p>
            </header>

            <div className="mt-8 grid grid-cols-1 gap-6 1024px:grid-cols-[minmax(0,1fr)_300px] 1260px:grid-cols-[minmax(0,1fr)_340px]">
                {/* Color input */}
                <form onSubmit={addColor} className="panel min-w-0 self-start p-4 640px:p-5 1024px:col-start-1 1024px:row-start-1" noValidate>
                    <label htmlFor="base-color" className="text-[0.9rem] font-medium text-ink">Base color</label>
                    <div className="mt-2.5 flex flex-col gap-2 425px:flex-row">
                        <div className={cn(
                            "flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-[10px] border bg-surface pl-2 pr-3 transition-colors",
                            invalidColorCode ? "border-[#e5484d]" : "border-hairline-strong focus-within:border-ink-subtle"
                        )}>
                            <span
                                className={cn(
                                    "relative size-7 shrink-0 overflow-hidden rounded-md border border-hairline-strong",
                                    !hasPreview && "bg-raised"
                                )}
                                style={hasPreview ? {backgroundColor: preview.toRgbString()} : undefined}
                            >
                                <input
                                    type="color"
                                    value={hasPreview ? preview.toHexString() : '#0fabca'}
                                    onChange={(event) => {
                                        setColorInput(event.target.value.toUpperCase());
                                        setInvalidColorCode(false);
                                    }}
                                    aria-label="Open color picker"
                                    className="absolute inset-0 size-full cursor-pointer opacity-0"
                                />
                            </span>
                            <input
                                id="base-color"
                                className="w-full min-w-0 bg-transparent font-mono text-[0.9rem] text-ink outline-none placeholder:font-sans placeholder:text-ink-subtle focus-visible:outline-none"
                                placeholder="#0FABCA, rgb(15 171 202) or teal"
                                maxLength={50}
                                value={colorInput}
                                autoComplete="off"
                                spellCheck={false}
                                aria-invalid={invalidColorCode}
                                aria-describedby="base-color-help"
                                onChange={(event) => {
                                    setColorInput(event.target.value);
                                    setInvalidColorCode(false);
                                }}
                            />
                        </div>
                        <button type="submit" className="btn-primary h-11 px-5">
                            Generate
                            <LuArrowRight className="size-4"/>
                        </button>
                    </div>
                    <p id="base-color-help" aria-live="polite"
                       className={cn("mt-2 text-[0.8rem]", invalidColorCode ? "text-[#e5484d]" : "text-ink-subtle")}>
                        {invalidColorCode
                            ? "That doesn't look like a color. Try a HEX, RGB or HSL value, or a CSS color name."
                            : "Accepts HEX, RGB, HSL and CSS color names. Click the swatch to use a color picker."}
                    </p>
                </form>

                {/* Image extractor */}
                <aside className="min-w-0 1024px:col-start-2 1024px:row-span-2 1024px:row-start-1">
                    <div className="1024px:sticky 1024px:top-[84px]">
                        <ColorPickerFromImage onAddColor={addColorFromImage}/>
                    </div>
                </aside>

                {/* Palettes */}
                <section aria-labelledby="palettes-title" className="min-w-0 1024px:col-start-1 1024px:row-start-2">
                    <h2 id="palettes-title" className="text-[1.05rem] font-semibold tracking-heading text-ink">Palettes</h2>

                    <ul className="mt-4 flex flex-col gap-3">
                        {colors.map((color, index) => {
                            const shades = generateShades(color);
                            return (
                                <li key={`${color}-${colors.length - index}`} className="panel p-3 640px:p-4">
                                    <div className="mb-3 flex items-center gap-2">
                                        <span className="size-3.5 shrink-0 rounded-[4px] border border-hairline-strong"
                                              style={{backgroundColor: color}}/>
                                        <span className="truncate font-mono text-[0.8rem] text-ink-muted">{color}</span>
                                    </div>
                                    <div className="grid grid-cols-5 gap-1 768px:grid-cols-10">
                                        {shades.map((shade, shadeIndex) => {
                                            const step = STEPS[shadeIndex];
                                            const light = tinycolor(shade).isLight();
                                            return (
                                                <button
                                                    key={shadeIndex}
                                                    type="button"
                                                    onClick={() => copyToClipboard(shade, step)}
                                                    aria-label={`Step ${step}, ${shade.toUpperCase()}. Copy value`}
                                                    className={cn(
                                                        "relative flex h-16 min-w-0 flex-col justify-between rounded-lg p-1.5 text-left transition-[box-shadow,transform] duration-200 ease-out-expo hover:-translate-y-0.5 hover:shadow-float 640px:h-[72px]",
                                                        light ? "text-[#0b0d12]" : "text-white"
                                                    )}
                                                    style={{backgroundColor: shade}}
                                                >
                                                    <span className="flex items-center justify-between text-[0.66rem] font-medium opacity-75">
                                                        {step}
                                                        {shadeIndex === 5 && (
                                                            <span className="size-1.5 rounded-full bg-current" title="Your color"/>
                                                        )}
                                                    </span>
                                                    <span className="truncate font-mono text-[0.64rem] 1260px:text-[0.68rem]">
                                                        {shade.replace('#', '').toUpperCase()}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            </div>

            <ColorCodeCopyModal
                open={isCopyClicked}
                onClose={() => setIsCopyClicked(false)}
                clipboardColor={clipboardColor}
            />
        </div>
    );
};

export default ShadePalette;

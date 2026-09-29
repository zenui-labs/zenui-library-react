import {useMemo, useState} from 'react';
import tinycolor from "tinycolor2";
import {LuBan, LuCheck, LuCode, LuCopy, LuDownload, LuMinus, LuPlus, LuRotateCcw, LuX} from "react-icons/lu";

import {cn} from "@utils/Style.ts";

const DEFAULTS = {color: '#616161', strokeColor: '#000', size: 50};
const MAX_SIZE = 100;

const hasStrokeAttribute = (svgCode = '') => /stroke="[^"]*"/.test(svgCode);

// Native color inputs only accept #rrggbb.
const toPickerValue = (value) => {
    const color = tinycolor(value);
    return color.isValid() ? color.toHexString() : '#000000';
};

const toComponentName = (name = 'Icon') => {
    const pascal = name
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .trim()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
    return /^[A-Z]/.test(pascal) ? `${pascal}Icon` : `Icon${pascal}`;
};

// SVG markup to a React component: kebab-case and namespaced attributes become camelCase.
const toJsx = (svgCode, name) => {
    const markup = svgCode
        .replace(/\sclass="/g, ' className="')
        .replace(/\s([a-z]+(?:[-:][a-z]+)+)=/g, (match, attr) =>
            ' ' + attr.replace(/[-:]([a-z])/g, (_, letter) => letter.toUpperCase()) + '=')
        .trim()
        .split('\n')
        .map((line) => `        ${line}`)
        .join('\n');

    return `const ${toComponentName(name)} = () => {\n    return (\n${markup}\n    );\n};\n`;
};

const Label = ({children, htmlFor}) => (
    <label htmlFor={htmlFor} className="text-[0.8rem] font-medium text-ink-muted">{children}</label>
);

const ColorField = ({id, label, value, onChange, transparent, onToggleTransparent}) => (
    <div className="flex flex-col gap-1.5">
        <Label htmlFor={id}>{label}</Label>
        <div className="flex items-center gap-2">
            <div className={cn(
                "flex h-9 min-w-0 flex-1 items-center gap-2 rounded-[10px] border border-hairline bg-surface pl-1.5 pr-2 transition-opacity focus-within:border-hairline-strong",
                transparent && "opacity-60"
            )}>
                <span className="relative size-6 shrink-0 overflow-hidden rounded-md border border-hairline-strong"
                      style={{backgroundColor: transparent ? 'transparent' : toPickerValue(value)}}>
                    {transparent && <span className="absolute left-1/2 top-[-2px] h-[140%] w-px rotate-45 bg-ink-subtle"/>}
                    <input
                        type="color"
                        value={toPickerValue(value)}
                        onChange={(event) => onChange(event.target.value)}
                        aria-label={`${label} picker`}
                        className="absolute inset-0 size-full cursor-pointer opacity-0"
                    />
                </span>
                <input
                    id={id}
                    type="text"
                    maxLength={8}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    spellCheck={false}
                    className="w-full min-w-0 bg-transparent font-mono text-[0.82rem] text-ink outline-none focus-visible:outline-none"
                />
            </div>
            <button
                type="button"
                onClick={onToggleTransparent}
                aria-pressed={transparent}
                title={transparent ? `Use a ${label.toLowerCase()} color` : `Remove ${label.toLowerCase()}`}
                className={cn(
                    "flex h-9 shrink-0 items-center gap-1.5 rounded-[10px] border px-2.5 text-[0.8rem] transition-colors",
                    transparent
                        ? "border-ink bg-ink text-canvas"
                        : "border-hairline text-ink-muted hover:border-hairline-strong hover:text-ink"
                )}
            >
                <LuBan className="size-3.5"/>
                None
            </button>
        </div>
    </div>
);

interface IconSidebarProps {
    iconData: {id: string; name: string; iconCode: string; groupName?: string};
    onClose?: () => void;
}

const IconSidebar = ({iconData, onClose}: IconSidebarProps) => {
    const [copied, setCopied] = useState(null);
    const [color, setColor] = useState(DEFAULTS.color);
    const [strokeColor, setStrokeColor] = useState(DEFAULTS.strokeColor);
    const [size, setSize] = useState(DEFAULTS.size);
    const [isStrokeTransparent, setIsStrokeTransparent] = useState(false);
    const [isFillTransparent, setIsFillTransparent] = useState(false);

    const hasStroke = hasStrokeAttribute(iconData?.iconCode);

    const updatedSvgCode = useMemo(() => {
        if (!iconData || !iconData.iconCode) return '';

        let svgCode = iconData.iconCode
            .replace(/<svg[^>]+>/, (match) =>
                match.replace(/width="[^"]*"/, `width="${size}"`)
                    .replace(/height="[^"]*"/, `height="${size}"`)
                    .replace(/fill="[^"]*"/g, `fill="${color}"`)
            );

        if (isFillTransparent) {
            svgCode = svgCode.replace(/fill="[^"]*"/g, 'fill="none"');
        } else {
            svgCode = svgCode.replace(/fill="[^"]*"/g, `fill="${color}"`);
        }

        if (hasStrokeAttribute(iconData.iconCode)) {
            if (isStrokeTransparent) {
                svgCode = svgCode.replace(/stroke="[^"]*"/g, 'stroke="none"');
            } else {
                svgCode = svgCode.replace(/stroke="[^"]*"/g, `stroke="${strokeColor}"`);
            }
        }

        return svgCode;
    }, [color, size, strokeColor, isStrokeTransparent, isFillTransparent, iconData]);

    const flashCopied = (key) => {
        setCopied(key);
        setTimeout(() => setCopied((current) => (current === key ? null : current)), 1500);
    };

    const handleCopySvgCode = () => {
        navigator.clipboard.writeText(updatedSvgCode);
        flashCopied('svg');
    };

    const handleCopyJsx = () => {
        navigator.clipboard.writeText(toJsx(updatedSvgCode, iconData.name));
        flashCopied('jsx');
    };

    const handleDownloadSvg = () => {
        if (!iconData || !updatedSvgCode) return;

        const blob = new Blob([updatedSvgCode], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${iconData.name}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleDownloadPng = () => {
        if (!iconData || !updatedSvgCode) return;

        const img = new Image();
        img.src = 'data:image/svg+xml;base64,' + btoa(updatedSvgCode);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);

            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `${iconData.name}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    };

    const clampSize = (value) => Math.min(MAX_SIZE, Math.max(0, Number(value) || 0));

    const handleFillColorChange = (value) => {
        setIsFillTransparent(false);
        setColor(value);
    };

    const handleStrokeColorChange = (value) => {
        setIsStrokeTransparent(false);
        setStrokeColor(value);
    };

    const handleRefresh = () => {
        setColor(DEFAULTS.color);
        setSize(DEFAULTS.size);
        setStrokeColor(DEFAULTS.strokeColor);
        setIsFillTransparent(false);
        setIsStrokeTransparent(false);
    };

    if (!iconData) return null;

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 border-b border-hairline py-3 pl-4 pr-3">
                <h2 className="min-w-0 flex-1 truncate text-[0.95rem] font-semibold tracking-heading text-ink">
                    {iconData.name}
                </h2>
                <button type="button" onClick={handleRefresh} className="icon-btn size-8" title="Reset to defaults"
                        aria-label="Reset to defaults">
                    <LuRotateCcw className="size-3.5"/>
                </button>
                {onClose && (
                    <button type="button" onClick={onClose} className="icon-btn size-8" aria-label="Close">
                        <LuX className="size-4"/>
                    </button>
                )}
            </div>

            <div className="p-4">
                <div className="light zp-stage flex h-[168px] items-center justify-center overflow-hidden rounded-xl border border-hairline"
                     data-bg="grid">
                    <div key={iconData.id} className="animate-fade-up" dangerouslySetInnerHTML={{__html: updatedSvgCode}}/>
                </div>

                <div className="mt-5 flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="icon-size">Size</Label>
                            <span className="font-mono text-[0.75rem] text-ink-subtle">{size}px</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="range"
                                min={0}
                                max={MAX_SIZE}
                                value={size ?? 0}
                                onChange={(event) => setSize(clampSize(event.target.value))}
                                aria-label="Size slider"
                                className="h-1 min-w-0 flex-1 cursor-pointer accent-[rgb(var(--accent))]"
                            />
                            <div className="flex h-9 shrink-0 items-center rounded-[10px] border border-hairline bg-surface">
                                <button type="button" onClick={() => setSize((value) => clampSize(value - 1))}
                                        aria-label="Decrease size"
                                        className="flex h-full w-8 items-center justify-center rounded-l-[10px] text-ink-muted hover:bg-raised hover:text-ink">
                                    <LuMinus className="size-3.5"/>
                                </button>
                                <input
                                    id="icon-size"
                                    type="number"
                                    min={0}
                                    max={MAX_SIZE}
                                    value={size}
                                    onChange={(event) => setSize(clampSize(event.target.value))}
                                    className="h-full w-11 border-x border-hairline bg-transparent text-center font-mono text-[0.82rem] text-ink outline-none focus-visible:outline-none"
                                />
                                <button type="button" onClick={() => setSize((value) => clampSize(value + 1))}
                                        aria-label="Increase size"
                                        className="flex h-full w-8 items-center justify-center rounded-r-[10px] text-ink-muted hover:bg-raised hover:text-ink">
                                    <LuPlus className="size-3.5"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <ColorField
                        id="icon-fill"
                        label="Fill"
                        value={color}
                        onChange={handleFillColorChange}
                        transparent={isFillTransparent}
                        onToggleTransparent={() => setIsFillTransparent((value) => !value)}
                    />

                    {hasStroke && (
                        <ColorField
                            id="icon-stroke"
                            label="Stroke"
                            value={strokeColor}
                            onChange={handleStrokeColorChange}
                            transparent={isStrokeTransparent}
                            onToggleTransparent={() => setIsStrokeTransparent((value) => !value)}
                        />
                    )}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2">
                    <button type="button" onClick={handleCopySvgCode} className="btn-primary h-9 px-3 text-[0.85rem]">
                        {copied === 'svg' ? <LuCheck className="size-4"/> : <LuCopy className="size-4"/>}
                        {copied === 'svg' ? 'Copied' : 'Copy SVG'}
                    </button>
                    <button type="button" onClick={handleCopyJsx} className="btn-ghost h-9 px-3 text-[0.85rem]">
                        {copied === 'jsx' ? <LuCheck className="size-4"/> : <LuCode className="size-4"/>}
                        {copied === 'jsx' ? 'Copied' : 'Copy JSX'}
                    </button>
                    <button type="button" onClick={handleDownloadSvg} className="btn-ghost h-9 px-3 text-[0.85rem]"
                            title="Download as SVG">
                        <LuDownload className="size-4"/>
                        SVG
                    </button>
                    <button type="button" onClick={handleDownloadPng} className="btn-ghost h-9 px-3 text-[0.85rem]"
                            title="Download as PNG">
                        <LuDownload className="size-4"/>
                        PNG
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IconSidebar;

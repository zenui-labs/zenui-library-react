import {useEffect, useRef, useState} from 'react';
import {LuCheck, LuCopy, LuImagePlus, LuPipette, LuPlus, LuTrash2} from "react-icons/lu";

import {cn} from "@utils/Style.ts";

const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();

const CopyValue = ({label, value}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="group flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-raised"
        >
            <span className="w-8 shrink-0 text-[0.72rem] font-medium text-ink-subtle">{label}</span>
            <span className="min-w-0 flex-1 truncate font-mono text-[0.82rem] text-ink">{value}</span>
            {copied
                ? <LuCheck className="size-3.5 shrink-0 text-accent-strong" aria-label="Copied"/>
                : <LuCopy className="size-3.5 shrink-0 text-ink-subtle group-hover:text-ink" aria-label={`Copy ${label}`}/>}
        </button>
    );
};

const ColorPickerFromImage = ({onAddColor}) => {
    const [image, setImage] = useState(null);
    const [picked, setPicked] = useState(null);
    const [hover, setHover] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [added, setAdded] = useState(false);
    const canvasRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !image) return;
        const ctx = canvas.getContext('2d', {willReadFrequently: true});

        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
        img.src = image;
    }, [image]);

    const readFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target.result);
            setPicked(null);
            setHover(null);
        };
        reader.readAsDataURL(file);
    };

    const handleImageUpload = (event) => {
        readFile(event.target.files[0]);
        event.target.value = '';
    };

    const sample = (event) => {
        const canvas = canvasRef.current;
        if (!canvas || !canvas.width) return null;
        const ctx = canvas.getContext('2d', {willReadFrequently: true});
        const rect = canvas.getBoundingClientRect();

        const x = Math.min(canvas.width - 1, Math.max(0, (event.clientX - rect.left) * (canvas.width / rect.width)));
        const y = Math.min(canvas.height - 1, Math.max(0, (event.clientY - rect.top) * (canvas.height / rect.height)));
        const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;

        return {
            hex: rgbToHex(r, g, b),
            rgb: `rgb(${r}, ${g}, ${b})`,
            left: event.clientX - rect.left,
            top: event.clientY - rect.top,
        };
    };

    const handleMouseMove = (event) => setHover(sample(event));

    const handleCanvasClick = (event) => {
        const result = sample(event);
        if (result) setPicked({hex: result.hex, rgb: result.rgb});
    };

    const handleAdd = () => {
        if (!picked) return;
        onAddColor(picked.rgb);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    const handleRemove = () => {
        setImage(null);
        setPicked(null);
        setHover(null);
    };

    const dropProps = {
        onDragOver: (event) => {
            event.preventDefault();
            setDragging(true);
        },
        onDragLeave: (event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setDragging(false);
        },
        onDrop: (event) => {
            event.preventDefault();
            setDragging(false);
            readFile(event.dataTransfer.files[0]);
        },
    };

    return (
        <section aria-labelledby="image-picker-title" className="panel overflow-hidden">
            <div className="border-b border-hairline px-4 py-3.5">
                <h2 id="image-picker-title" className="text-[0.95rem] font-semibold tracking-heading text-ink">
                    Pick from an image
                </h2>
                <p className="mt-0.5 text-[0.82rem] leading-relaxed text-ink-muted">
                    Upload a photo or screenshot, then click anywhere on it to sample that pixel.
                </p>
            </div>

            <input ref={inputRef} accept="image/*" onChange={handleImageUpload} type="file" id="uploadImage"
                   className="hidden"/>

            <div className="p-4">
                {!image ? (
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        {...dropProps}
                        className={cn(
                            "flex w-full flex-col items-center justify-center rounded-xl border border-dashed px-4 py-10 text-center transition-colors",
                            dragging ? "border-accent bg-accent/5" : "border-hairline-strong hover:bg-raised"
                        )}
                    >
                        <span className="flex size-10 items-center justify-center rounded-xl border border-hairline bg-surface text-ink-muted shadow-card">
                            <LuImagePlus className="size-[18px]"/>
                        </span>
                        <span className="mt-3 text-[0.88rem] font-medium text-ink">Choose an image</span>
                        <span className="mt-0.5 text-[0.8rem] text-ink-subtle">or drop one here. It stays in your browser.</span>
                    </button>
                ) : (
                    <>
                        <div
                            {...dropProps}
                            className={cn(
                                "flex justify-center rounded-xl border bg-raised p-2 transition-colors",
                                dragging ? "border-accent" : "border-hairline"
                            )}
                        >
                            <div className="relative inline-block max-w-full">
                                <canvas
                                    ref={canvasRef}
                                    onMouseMove={handleMouseMove}
                                    onClick={handleCanvasClick}
                                    onMouseLeave={() => setHover(null)}
                                    className="block h-auto max-h-[340px] w-auto max-w-full cursor-crosshair rounded-md"
                                    aria-label="Uploaded image. Click to sample a color."
                                />
                                {hover && (
                                    <div
                                        className="pointer-events-none absolute z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-surface py-1 pl-1 pr-2.5 shadow-float"
                                        style={{
                                            left: hover.left,
                                            top: hover.top > 56 ? hover.top - 48 : hover.top + 20,
                                        }}
                                    >
                                        <span className="size-5 rounded-full border border-hairline-strong"
                                              style={{backgroundColor: hover.hex}}/>
                                        <span className="font-mono text-[0.72rem] text-ink">{hover.hex}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-2 flex items-center justify-end gap-1">
                            <button type="button" onClick={() => inputRef.current?.click()}
                                    className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[0.8rem] text-ink-muted transition-colors hover:bg-raised hover:text-ink">
                                <LuImagePlus className="size-3.5"/>
                                Replace
                            </button>
                            <button type="button" onClick={handleRemove}
                                    className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[0.8rem] text-ink-muted transition-colors hover:bg-raised hover:text-ink">
                                <LuTrash2 className="size-3.5"/>
                                Remove
                            </button>
                        </div>
                    </>
                )}

                <div className="mt-4 rounded-xl border border-hairline">
                    <div className="flex items-center gap-3 border-b border-hairline p-2.5">
                        <span
                            className={cn(
                                "flex size-11 shrink-0 items-center justify-center rounded-lg border border-hairline-strong",
                                !picked && "bg-raised text-ink-subtle"
                            )}
                            style={picked ? {backgroundColor: picked.hex} : undefined}
                        >
                            {!picked && <LuPipette className="size-4"/>}
                        </span>
                        <div className="min-w-0">
                            <p className="text-[0.85rem] font-medium text-ink">Selected color</p>
                            <p className="text-[0.78rem] text-ink-subtle">
                                {picked ? "Click the image again to change it." : image ? "Click the image to sample a color." : "Nothing picked yet."}
                            </p>
                        </div>
                    </div>

                    {picked && (
                        <div className="p-1.5">
                            <CopyValue label="HEX" value={picked.hex}/>
                            <CopyValue label="RGB" value={picked.rgb}/>
                        </div>
                    )}
                </div>

                <button type="button" onClick={handleAdd} disabled={!picked} className="btn-primary mt-3 w-full">
                    {added ? <LuCheck className="size-4"/> : <LuPlus className="size-4"/>}
                    {added ? "Added to palettes" : "Add to palettes"}
                </button>
            </div>
        </section>
    );
};

export default ColorPickerFromImage;

import {useState} from "react";
import {Helmet} from "react-helmet";
import {LazyLoadImage} from "zenui-image-react";
import {LuRotateCw} from "react-icons/lu";

import Select from "./Select.tsx";
import Slider from "./Slider.tsx";
import Switch from "./Switch.tsx";
import ShowCode from "@shared/Component/ShowCode.tsx";
import {InstallCommand} from "@shared/DocsProse.tsx";

const demoImages = [
    {src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0", alt: "Mountain lake"},
    {src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e", alt: "Sunset over a forest"},
    {src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", alt: "Beach at sunrise"},
    {src: "https://plus.unsplash.com/premium_photo-1675826774815-35b8a48ddc2c", alt: "Autumn forest"},
    {src: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa", alt: "Snowy mountains"},
    {src: "https://images.unsplash.com/photo-1495584816685-4bdbf1b5057e", alt: "Tropical waterfall"},
    {src: "https://images.unsplash.com/photo-1483058712412-4245e9b90334", alt: "Forest trail"},
    {src: "https://images.unsplash.com/photo-1475776408506-9a5371e7a068", alt: "Flower field"},
    {src: "https://images.unsplash.com/photo-1505820013142-f86a3439c5b2", alt: "Canyon"},
    {src: "https://plus.unsplash.com/premium_photo-1675368244123-082a84cf3072", alt: "Lake in morning mist"},
    {src: "https://images.unsplash.com/photo-1498842812179-c81beecf902c", alt: "Stars over mountains"},
    {src: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2", alt: "Rainforest path"},
    {src: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6", alt: "Desert dunes"},
    {src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07", alt: "Mountain stream"},
    {src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", alt: "Pine trees in winter"},
];

const placeholderOptions = [
    {value: "none", label: "None"},
    {value: "effect", label: "Effect"},
    {value: "image", label: "Image"},
    {value: "custom", label: "Custom"},
];

const effectOptions = [
    {value: "blur", label: "Blur"},
    {value: "opacity", label: "Opacity"},
    {value: "color", label: "Color"},
];

// A tiny, low quality copy of the same photo works as the "image" placeholder.
const smallCopy = (src) => `${src}?w=24&q=20`;

const skeleton = <div className="size-full animate-pulse bg-raised"/>;

const buildCode = (settings) => {
    const props = [
        `src="your-image.jpg"`,
        `alt="Your alt text"`,
        `placeholderType="${settings.placeholderType}"`,
    ];

    if (settings.placeholderType === "effect") {
        props.push(`effectType="${settings.effectType}"`, `effectAmount={${settings.effectAmount}}`);
        if (settings.effectType === "color") props.push(`backgroundColor="${settings.backgroundColor}"`);
    }
    if (settings.placeholderType === "image") props.push(`placeholderImage="your-image-small.jpg"`);
    if (settings.placeholderType === "custom") props.push(`customPlaceholder={<div className="animate-pulse bg-gray-200" />}`);

    props.push(`optimize={${settings.optimize}}`);
    if (settings.optimize) props.push(`quality={${settings.quality}}`);
    props.push(`offset={${settings.offset}}`, `useIntersectionObserver={${settings.useIntersectionObserver}}`);

    return `import { LazyLoadImage } from "zenui-image-react";

<LazyLoadImage
${props.map((prop) => `  ${prop}`).join("\n")}
/>`;
};

const Divider = () => <div className="h-px bg-hairline"/>;

const Index = () => {
    const [galleryKey, setGalleryKey] = useState(0);
    const [settings, setSettings] = useState({
        placeholderType: "effect",
        effectType: "blur",
        effectAmount: 10,
        optimize: true,
        quality: 80,
        useIntersectionObserver: true,
        offset: 100,
        backgroundColor: "#f0f0f0",
    });

    const handleSettingChange = (setting, value) => {
        setSettings((prev) => ({...prev, [setting]: value}));
    };

    const code = buildCode(settings);

    return (
        <div className="shell pb-20 pt-10">
            <header className="max-w-[60ch]">
                <h1 className="text-[2.2rem] font-semibold leading-tight tracking-display text-ink 640px:text-[2.8rem]">
                    ZenUI Image React playground
                </h1>
                <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink-muted">
                    Change the settings of the <code className="rounded-md bg-raised px-1.5 py-0.5 font-mono text-[0.85em] text-ink">LazyLoadImage</code> component
                    from zenui-image-react and see how the images below respond. The code updates as you go, so you can
                    copy the configuration you like.
                </p>
                <div className="mt-6 max-w-[460px]">
                    <InstallCommand pkg="zenui-image-react"/>
                </div>
            </header>

            <div className="mt-12 grid grid-cols-1 gap-8 1024px:grid-cols-[340px_minmax(0,1fr)] 1024px:gap-10">
                <aside className="min-w-0 1024px:sticky 1024px:top-24 1024px:self-start">
                    <div className="panel scroll-thin flex flex-col gap-5 p-5 1024px:max-h-[calc(100vh-7.5rem)] 1024px:overflow-y-auto">
                        <h2 className="text-[0.95rem] font-semibold tracking-heading text-ink">Settings</h2>

                        <Select
                            label="Placeholder type"
                            value={settings.placeholderType}
                            onChange={(value) => handleSettingChange("placeholderType", value)}
                            options={placeholderOptions}
                        />

                        {settings.placeholderType === "effect" && (
                            <>
                                <Select
                                    label="Effect type"
                                    value={settings.effectType}
                                    onChange={(value) => handleSettingChange("effectType", value)}
                                    options={effectOptions}
                                />

                                {settings.effectType === "color" && (
                                    <label className="flex items-center justify-between gap-3">
                                        <span className="text-[0.85rem] font-medium text-ink">Placeholder color</span>
                                        <span className="flex items-center gap-2">
                                            <span className="font-mono text-[0.78rem] text-ink-muted">{settings.backgroundColor}</span>
                                            <input
                                                type="color"
                                                value={settings.backgroundColor}
                                                onChange={(event) => handleSettingChange("backgroundColor", event.target.value)}
                                                className="size-8 cursor-pointer rounded-lg border border-hairline-strong bg-surface p-0.5"
                                            />
                                        </span>
                                    </label>
                                )}

                                <Slider
                                    label="Effect amount"
                                    value={settings.effectAmount}
                                    onChange={(value) => handleSettingChange("effectAmount", value)}
                                    min={0}
                                    max={20}
                                    step={1}
                                />
                            </>
                        )}

                        <Divider/>

                        <Switch
                            label="Optimize images"
                            description="Requests a smaller file sized for the screen."
                            checked={settings.optimize}
                            onChange={(checked) => handleSettingChange("optimize", checked)}
                        />

                        {settings.optimize && (
                            <Slider
                                label="Quality"
                                value={settings.quality}
                                onChange={(value) => handleSettingChange("quality", value)}
                                min={1}
                                max={100}
                                step={1}
                            />
                        )}

                        <Switch
                            label="Use Intersection Observer"
                            description="Loads each image only when it gets close to the viewport."
                            checked={settings.useIntersectionObserver}
                            onChange={(checked) => handleSettingChange("useIntersectionObserver", checked)}
                        />

                        <Divider/>

                        <label className="flex items-center justify-between gap-3">
                            <span className="text-[0.85rem] font-medium text-ink">Loading offset</span>
                            <span className="relative">
                                <input
                                    type="number"
                                    min={0}
                                    max={1000}
                                    value={settings.offset}
                                    onChange={(event) => handleSettingChange("offset", Number(event.target.value))}
                                    className="h-9 w-28 rounded-[10px] border border-hairline-strong bg-surface pl-3 pr-8 font-mono text-[0.85rem] tabular-nums text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                                />
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[0.75rem] text-ink-subtle">px</span>
                            </span>
                        </label>
                    </div>
                </aside>

                <div className="min-w-0">
                    <ShowCode code={[{id: "usage", displayText: "Example.jsx", language: "jsx", code}]}/>

                    <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
                        <div className="max-w-[52ch]">
                            <h2 className="flex items-baseline gap-2.5 text-[1.15rem] font-semibold tracking-heading text-ink">
                                Preview
                                <span className="font-mono text-[0.8rem] font-normal text-ink-subtle">{demoImages.length}</span>
                            </h2>
                            <p className="mt-1 text-[0.88rem] leading-relaxed text-ink-muted">
                                Open the Network tab in your browser&apos;s developer tools, then scroll to watch each image
                                load as it comes into view.
                            </p>
                        </div>
                        <button type="button" onClick={() => setGalleryKey((key) => key + 1)} className="btn-ghost h-9 px-3 text-[0.85rem]">
                            <LuRotateCw className="size-3.5"/>
                            Reload images
                        </button>
                    </div>

                    <div key={galleryKey} className="mt-5 grid grid-cols-1 gap-4 640px:grid-cols-2">
                        {demoImages.map((image) => (
                            <figure key={image.src} className="min-w-0">
                                <div className="relative aspect-video overflow-hidden rounded-panel border border-hairline bg-raised">
                                    <LazyLoadImage
                                        className="h-full w-full"
                                        optimize={settings.optimize}
                                        src={image.src}
                                        alt={image.alt}
                                        placeholderType={settings.placeholderType}
                                        placeholderImage={smallCopy(image.src)}
                                        customPlaceholder={skeleton}
                                        effectType={settings.effectType}
                                        effectAmount={settings.effectAmount}
                                        backgroundColor={settings.backgroundColor}
                                        quality={settings.quality}
                                        useIntersectionObserver={settings.useIntersectionObserver}
                                        offset={settings.offset}
                                    />
                                </div>
                                <figcaption className="mt-2 text-[0.8rem] text-ink-subtle">{image.alt}</figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </div>

            <Helmet>
                <title>ZenUI Image React playground | ZenUI Library</title>
            </Helmet>
        </div>
    );
};

export default Index;

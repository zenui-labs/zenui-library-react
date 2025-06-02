import React, {useState} from "react";
import {LazyLoadImage} from 'zenui-image-react';
import {dracula} from "react-syntax-highlighter/dist/cjs/styles/prism/index.js";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import Select from "./Select.jsx";
import Slider from "./Slider.jsx";
import Switch from "./Switch.jsx";
import {BiCopy} from "react-icons/bi";
import {MdDone} from "react-icons/md";

const Index = () => {

    const demoImages = [
        {
            src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
            alt: "Mountain Lake",
            title: "Serene Mountain Lake"
        },
        {
            src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
            alt: "Sunset Over Forest",
            title: "Golden Sunset in the Forest"
        },
        {
            src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            alt: "Beach Sunrise",
            title: "Peaceful Beach Sunrise"
        },
        {
            src: "https://plus.unsplash.com/premium_photo-1675826774815-35b8a48ddc2c",
            alt: "Autumn Forest",
            title: "Vibrant Autumn Forest"
        },
        {
            src: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
            alt: "Snowy Mountains",
            title: "Majestic Snow-Capped Mountains"
        },
        {
            src: "https://images.unsplash.com/photo-1495584816685-4bdbf1b5057e",
            alt: "Tropical Waterfall",
            title: "Crystal-Clear Tropical Waterfall"
        },
        {
            src: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
            alt: "Forest Trail",
            title: "Mystical Forest Trail"
        },
        {
            src: "https://images.unsplash.com/photo-1475776408506-9a5371e7a068",
            alt: "Flower Field",
            title: "Blooming Flower Field"
        },
        {
            src: "https://images.unsplash.com/photo-1505820013142-f86a3439c5b2",
            alt: "Canyon Landscape",
            title: "Dramatic Canyon Landscape"
        },
        {
            src: "https://plus.unsplash.com/premium_photo-1675368244123-082a84cf3072",
            alt: "Lake in the Morning",
            title: "Misty Morning by the Lake"
        },
        {
            src: "https://images.unsplash.com/photo-1498842812179-c81beecf902c",
            alt: "Starry Night",
            title: "Starry Sky Over Mountains"
        },
        {
            src: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2",
            alt: "Rainforest Path",
            title: "Lush Green Rainforest Path"
        },
        {
            src: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6",
            alt: "Desert Dunes",
            title: "Golden Sand Desert Dunes"
        },
        {
            src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
            alt: "Mountain Stream",
            title: "Mountain Stream with Rocks"
        },
        {
            src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            alt: "Pine Trees",
            title: "Towering Pine Trees in Winter"
        }
    ];

    const [isCopied, setIsCopied] = useState(false)

    const [settings, setSettings] = useState({
        placeholderType: 'effect',
        effectType: 'blur',
        effectAmount: 10,
        optimize: true,
        quality: 80,
        useIntersectionObserver: true,
        offset: 100,
        backgroundColor: '#f0f0f0'
    });

    const handleSettingChange = (setting, value) => {
        setSettings(prev => ({
            ...prev,
            [setting]: value
        }));
    };

    const CodePreview = `<LazyLoadImage
  src="your-image.jpg"
  alt="Your alt text"
  placeholderType="${settings.placeholderType}"
  ${settings.placeholderType === 'effect' ? `effectType="${settings.effectType}"
  effectAmount={${settings.effectAmount}}` : ''}
  optimize={${settings.optimize}}
  ${settings.optimize ? `quality={${settings.quality}}` : ''}
  offset={${settings.offset}}
 useIntersectionObserver={${settings.useIntersectionObserver}}
/>`

    const handleCopy = (code) => {
        window.navigator.clipboard.writeText(code)
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 1000)
    }

    return (
        <div
            className="min-h-screen flex flex-col 1024px:flex-row px-8 640px:px-12 py-8 justify-between gap-[50px] max-w-[1615px] mx-auto">
            <div className='flex-1'>
                <h1 className="text-[2rem] 640px:text-[2.5rem] font-[700] leading-[45px] 640px:leading-[55px] text-[#0499B6]">ZenUI
                    Image React Playground</h1>
                <p className="text-gray-600 mb-8 dark:text-darkSubTextColor max-w-[90%] leading-[30px] mt-2">Experiment
                    with different settings to see how the LazyLoadImage
                    component behaves. ( open network tab in the browser developer tool and scroll images to see lazy
                    loading ) </p>

                {/* Configuration Card */}
                <div className="mb-8 max-w-[500px]">
                    <div className="grid flex-1 grid-cols-1 gap-6">
                        <Select
                            label="Placeholder Type"
                            value={settings.placeholderType}
                            onChange={(value) => handleSettingChange('placeholderType', value)}
                            options={[
                                {value: 'none', label: 'None'},
                                {value: 'effect', label: 'Effect'},
                                {value: 'image', label: 'Image'},
                                {value: 'custom', label: 'Custom'}
                            ]}
                        />

                        {settings.placeholderType === 'effect' && (
                            <>
                                <Select
                                    label="Effect Type"
                                    value={settings.effectType}
                                    onChange={(value) => handleSettingChange('effectType', value)}
                                    options={[
                                        {value: 'blur', label: 'Blur'},
                                        {value: 'opacity', label: 'Opacity'},
                                        {value: 'color', label: 'Color'}
                                    ]}
                                />

                                <Slider
                                    label="Effect Amount"
                                    value={settings.effectAmount}
                                    onChange={(value) => handleSettingChange('effectAmount', value)}
                                    min={0}
                                    max={20}
                                    step={1}
                                />
                            </>
                        )}

                        <div className='flex flex-col 640px:flex-row 640px:items-center gap-2 640px:gap-[30px]'>
                            <Switch
                                label="Optimize Images"
                                checked={settings.optimize}
                                onChange={(checked) => handleSettingChange('optimize', checked)}
                            />

                            <Switch
                                label="Use Intersection observer"
                                checked={settings.useIntersectionObserver}
                                onChange={(checked) => handleSettingChange('useIntersectionObserver', checked)}
                            />
                        </div>

                        {settings.optimize && (
                            <Slider
                                label="Quality"
                                value={settings.quality}
                                onChange={(value) => handleSettingChange('quality', value)}
                                min={1}
                                max={100}
                                step={1}
                            />
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="text-sm dark:text-darkSubTextColor font-medium text-gray-700">Loading
                                Offset (px)</label>
                            <input
                                type="number"
                                min={0}
                                max={1000}
                                value={settings.offset}
                                onChange={(event) => handleSettingChange('offset', Number(event.target.value))}
                                className="w-full dark:border-slate-700 dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-darkSubTextColor px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#0499B6] focus:border-blue-500"
                            />
                        </div>

                        <div className='relative'>
                            {
                                isCopied ? <MdDone
                                        className='text-slate-300 bg-black p-2 text-[2.5rem] rounded-bl absolute top-2 right-0.5'/> :
                                    <BiCopy onClick={() => handleCopy(CodePreview)}
                                            className='text-slate-300 bg-black p-2 cursor-pointer text-[2.5rem] rounded-bl absolute top-2 right-0.5'/>
                            }

                            <SyntaxHighlighter language="html" className='text-[14px]' style={dracula} showLineNumbers>
                                {CodePreview}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Images */}
            <div style={{scrollbarWidth: 'none'}} className='640px:max-h-[900px] mt-5 flex-1 640px:overflow-auto'>
                <div className="flex flex-col gap-8">
                    {demoImages.map((image, index) => (
                        <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                            <LazyLoadImage
                                optimize={settings.optimize}
                                src={image.src}
                                alt={image.alt}
                                placeholderType={settings.placeholderType}
                                effectType={settings.effectType}
                                effectAmount={settings.effectAmount}
                                quality={settings.quality}
                                useIntersectionObserver={settings.useIntersectionObserver}
                                offset={settings.offset}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Index;
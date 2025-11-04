export const TextSpoilerCodes = [
    {
        id: "container",
        displayText: "App.jsx",
        language: "jsx",
        code: 'import SpoilerAnimationCore from "./SpoilerAnimation.jsx";\n' +
            '\n' +
            'const App = () => {\n' +
            '    return (\n' +
            '        <div className="w-full flex items-center gap-12 justify-center flex-col">\n' +
            '            <h5 className="text-3xl text-center leading-relaxed font-bold mt-3 text-gray-800 dark:text-gray-100">\n' +
            '                Elevate your project with{" "}\n' +
            '                <SpoilerAnimationCore>\n' +
            '                    free UI components,\n' +
            '                </SpoilerAnimationCore>{" "}\n' +
            '                <SpoilerAnimationCore>\n' +
            '                    customizable icons,\n' +
            '                </SpoilerAnimationCore>{" "}\n' +
            '                and a{" "}\n' +
            '                <SpoilerAnimationCore>\n' +
            '                    color palette\n' +
            '                </SpoilerAnimationCore>\n' +
            '                . No{" "}\n' +
            '                <SpoilerAnimationCore>\n' +
            '                    dependencies\n' +
            '                </SpoilerAnimationCore>{" "}\n' +
            '                required 🤫\n' +
            '            </h5>\n' +
            '        </div>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default App;\n'
    },
    {
        id: "animated_text",
        displayText: "SpoilerAnimation.jsx",
        language: "jsx",
        code: 'import {useEffect, useRef, useState} from "react";\n' +
            '\n' +
            'const SpoilerAnimation = ({children}) => {\n' +
            '    const [isRevealed, setIsRevealed] = useState(false);\n' +
            '    const canvasRef = useRef(null);\n' +
            '    const containerRef = useRef(null);\n' +
            '    const animationRef = useRef(null);\n' +
            '    const particlesRef = useRef([]);\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        if (!canvasRef.current || !containerRef.current) return;\n' +
            '\n' +
            '        const canvas = canvasRef.current;\n' +
            '        const ctx = canvas.getContext("2d");\n' +
            '        const container = containerRef.current;\n' +
            '        const rect = container.getBoundingClientRect();\n' +
            '\n' +
            '        canvas.width = rect.width;\n' +
            '        canvas.height = rect.height;\n' +
            '\n' +
            '        const particleCount = Math.floor((rect.width * rect.height) / 50);\n' +
            '        const initialParticles = [];\n' +
            '\n' +
            '        for (let i = 0; i < particleCount; i++) {\n' +
            '            initialParticles.push({\n' +
            '                x: Math.random() * rect.width,\n' +
            '                y: Math.random() * rect.height,\n' +
            '                vx: (Math.random() - 0.5) * 1.5,\n' +
            '                vy: (Math.random() - 0.5) * 1.5,\n' +
            '                life: 1,\n' +
            '                size: Math.random() * 2.5 + 1,\n' +
            '                opacity: Math.random() * 0.5 + 0.5,\n' +
            '            });\n' +
            '        }\n' +
            '\n' +
            '        particlesRef.current = initialParticles;\n' +
            '\n' +
            '        const animate = () => {\n' +
            '            ctx.clearRect(0, 0, canvas.width, canvas.height);\n' +
            '\n' +
            '            if (isRevealed) {\n' +
            '                particlesRef.current = particlesRef.current\n' +
            '                    .map(p => ({\n' +
            '                        ...p,\n' +
            '                        x: p.x + p.vx * 4,\n' +
            '                        y: p.y + p.vy * 4,\n' +
            '                        vx: p.vx * 1.05,\n' +
            '                        vy: p.vy * 1.05,\n' +
            '                        life: p.life - 0.02,\n' +
            '                        opacity: p.life,\n' +
            '                    }))\n' +
            '                    .filter(p => p.life > 0);\n' +
            '\n' +
            '                particlesRef.current.forEach(p => {\n' +
            '                    ctx.fillStyle = `rgba(107, 114, 128, ${p.opacity * p.life})`;\n' +
            '                    ctx.fillRect(p.x, p.y, p.size, p.size);\n' +
            '                });\n' +
            '\n' +
            '                if (particlesRef.current.length > 0) {\n' +
            '                    animationRef.current = requestAnimationFrame(animate);\n' +
            '                }\n' +
            '            } else {\n' +
            '                particlesRef.current.forEach(p => {\n' +
            '                    p.x += p.vx;\n' +
            '                    p.y += p.vy;\n' +
            '\n' +
            '                    if (p.x < 0 || p.x > rect.width) {\n' +
            '                        p.vx *= -1;\n' +
            '                        p.x = Math.max(0, Math.min(rect.width, p.x));\n' +
            '                    }\n' +
            '                    if (p.y < 0 || p.y > rect.height) {\n' +
            '                        p.vy *= -1;\n' +
            '                        p.y = Math.max(0, Math.min(rect.height, p.y));\n' +
            '                    }\n' +
            '\n' +
            '                    ctx.fillStyle = `rgba(107, 114, 128, ${p.opacity})`;\n' +
            '                    ctx.fillRect(p.x, p.y, p.size, p.size);\n' +
            '                });\n' +
            '\n' +
            '                animationRef.current = requestAnimationFrame(animate);\n' +
            '            }\n' +
            '        };\n' +
            '\n' +
            '        animate();\n' +
            '\n' +
            '        return () => {\n' +
            '            if (animationRef.current) {\n' +
            '                cancelAnimationFrame(animationRef.current);\n' +
            '            }\n' +
            '        };\n' +
            '    }, [isRevealed]);\n' +
            '\n' +
            '    const handleReveal = () => {\n' +
            '        if (!isRevealed) {\n' +
            '            setIsRevealed(true);\n' +
            '        }\n' +
            '    };\n' +
            '\n' +
            '    return (\n' +
            '        <span\n' +
            '            ref={containerRef}\n' +
            '            className="relative inline-block cursor-pointer select-none px-1"\n' +
            '            onClick={handleReveal}\n' +
            '            style={{minHeight: "0.9rem"}}\n' +
            '        >\n' +
            '            <span className={`relative z-10 ${isRevealed ? "animate-wave-reveal" : "opacity-0"}`}>\n' +
            '                {children}\n' +
            '            </span>\n' +
            '            <canvas\n' +
            '                ref={canvasRef}\n' +
            '                className="absolute inset-0 z-20 pointer-events-none"\n' +
            '            />\n' +
            '        </span>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default SpoilerAnimation;'
    },
    {
        id: "css",
        displayText: "Index.css",
        language: "css",
        code: '@keyframes wave-reveal {\n' +
            '    0% {\n' +
            '        opacity: 0;\n' +
            '        clip-path: polygon(\n' +
            '                0% 50%,\n' +
            '                10% 45%,\n' +
            '                20% 50%,\n' +
            '                30% 55%,\n' +
            '                40% 50%,\n' +
            '                50% 45%,\n' +
            '                60% 50%,\n' +
            '                70% 55%,\n' +
            '                80% 50%,\n' +
            '                90% 45%,\n' +
            '                100% 50%,\n' +
            '                100% 50%,\n' +
            '                90% 45%,\n' +
            '                80% 50%,\n' +
            '                70% 55%,\n' +
            '                60% 50%,\n' +
            '                50% 45%,\n' +
            '                40% 50%,\n' +
            '                30% 55%,\n' +
            '                20% 50%,\n' +
            '                10% 45%,\n' +
            '                0% 50%\n' +
            '        );\n' +
            '    }\n' +
            '    50% {\n' +
            '        opacity: 0.7;\n' +
            '        clip-path: polygon(\n' +
            '                0% 0%,\n' +
            '                10% 5%,\n' +
            '                20% 0%,\n' +
            '                30% -5%,\n' +
            '                40% 0%,\n' +
            '                50% 5%,\n' +
            '                60% 0%,\n' +
            '                70% -5%,\n' +
            '                80% 0%,\n' +
            '                90% 5%,\n' +
            '                100% 0%,\n' +
            '                100% 100%,\n' +
            '                90% 95%,\n' +
            '                80% 100%,\n' +
            '                70% 105%,\n' +
            '                60% 100%,\n' +
            '                50% 95%,\n' +
            '                40% 100%,\n' +
            '                30% 105%,\n' +
            '                20% 100%,\n' +
            '                10% 95%,\n' +
            '                0% 100%\n' +
            '        );\n' +
            '    }\n' +
            '    100% {\n' +
            '        opacity: 1;\n' +
            '        clip-path: polygon(\n' +
            '                0% 0%,\n' +
            '                100% 0%,\n' +
            '                100% 100%,\n' +
            '                0% 100%\n' +
            '        );\n' +
            '    }\n' +
            '}\n' +
            '\n' +
            '.animate-wave-reveal {\n' +
            '    animation: wave-reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n' +
            '}'
    }
]
export const TextRevealCodes = [
    {
        id: "container",
        displayText: "App.jsx",
        language: "jsx",
        code: 'import React from "react"\n' +
            'import TextReveal from "./TextReveal.jsx";\n' +
            '\n' +
            'const App = () => {\n' +
            '    \n' +
            '    return (\n' +
            '        <div className="w-full flex items-center gap-12 justify-center flex-col">\n' +
            '            <TextReveal text="Text Reveal Animation"/>\n' +
            '        </div>\n' +
            '    );\n' +
            '}\n' +
            '\n' +
            'export default App;\n'
    },
    {
        id: "animated_text",
        displayText: "TextReveal.jsx",
        language: "jsx",
        code: 'import {useEffect} from "react";\n' +
            'import {useAnimationControls, motion} from "framer-motion";\n' +
            '\n' +
            'const TextReveal = ({text}) => {\n' +
            '    const controls = useAnimationControls();\n' +
            '\n' +
            '    const textReveal = {\n' +
            '        hidden: {\n' +
            '            clipPath: "inset(0 100% 0 0)", opacity: 0,\n' +
            '        }, visible: {\n' +
            '            clipPath: "inset(0 0% 0 0)", opacity: 1, transition: {\n' +
            '                duration: 2, ease: "easeInOut",\n' +
            '            },\n' +
            '        },\n' +
            '    };\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        controls.start("visible");\n' +
            '    }, []);\n' +
            '\n' +
            '    return (\n' +
            '        <motion.div\n' +
            '            className="text-3xl font-bold inline-block text-center dark:text-[#d2e5f5]"\n' +
            '            initial="hidden"\n' +
            '            animate={controls}\n' +
            '            variants={textReveal}\n' +
            '        >\n' +
            '            {text}\n' +
            '        </motion.div>\n' +
            '    );\n' +
            '}\n' +
            '\n' +
            'export default TextReveal;\n'
    },
]

export const ThreeDTransformCodes = [
    {
        id: 'container',
        displayText: 'App.jsx',
        language: 'jsx',
        code: 'import React from "react";\n' +
            'import ThreeDTransformText from "./ThreeDTransformText.jsx";\n' +
            '\n' +
            'const App = () => {\n' +
            '\n' +
            '    return (\n' +
            '        <div className="w-full flex items-center gap-12 justify-center flex-col">\n' +
            '            <ThreeDTransformText text="Text 3D Transform Animation"/>\n' +
            '        </div>\n' +
            '    );\n' +
            '}\n' +
            '\n' +
            'export default App;'
    },
    {
        id: 'transform_animated_text',
        displayText: 'ThreeDTransformText.jsx',
        language: 'jsx',
        code: 'import {useEffect} from "react";\n' +
            'import {motion, useAnimationControls} from "framer-motion";\n' +
            '\n' +
            'const ThreeDTransformText = ({text}) => {\n' +
            '\n' +
            '    const controls = useAnimationControls();\n' +
            '\n' +
            '    const transformText = {\n' +
            '        hidden: {opacity: 0},\n' +
            '        visible: {\n' +
            '            opacity: 1,\n' +
            '            transition: {\n' +
            '                staggerChildren: 0.08,\n' +
            '            },\n' +
            '        },\n' +
            '        exit: {\n' +
            '            opacity: 0,\n' +
            '            transition: {\n' +
            '                duration: 0.3,\n' +
            '                staggerChildren: 0.05,\n' +
            '                staggerDirection: -1,\n' +
            '            },\n' +
            '        },\n' +
            '    };\n' +
            '\n' +
            '    const transformChar = {\n' +
            '        hidden: {\n' +
            '            opacity: 0,\n' +
            '            scale: 2,\n' +
            '            rotateX: 180,\n' +
            '            filter: "blur(10px)"\n' +
            '        },\n' +
            '        visible: {\n' +
            '            opacity: 1,\n' +
            '            scale: 1,\n' +
            '            rotateX: 0,\n' +
            '            filter: "blur(0px)",\n' +
            '            transition: {\n' +
            '                type: "spring",\n' +
            '                damping: 15,\n' +
            '                stiffness: 100\n' +
            '            }\n' +
            '        },\n' +
            '        exit: {\n' +
            '            opacity: 0,\n' +
            '            scale: 5,\n' +
            '            rotateX: -180,\n' +
            '            filter: "blur(10px)",\n' +
            '            transition: {\n' +
            '                duration: 0.3\n' +
            '            }\n' +
            '        }\n' +
            '    };\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        controls.start("visible");\n' +
            '    }, []);\n' +
            '\n' +
            '    return (\n' +
            '        <motion.div\n' +
            '            variants={transformText}\n' +
            '            initial="hidden"\n' +
            '            animate={controls}\n' +
            '            exit="exit"\n' +
            '            className="text-3xl text-center font-bold dark:text-[#d2e5f5] perspective-1000"\n' +
            '            style={{perspective: "1000px", transformStyle: "preserve-3d"}}\n' +
            '        >\n' +
            '            {text.split("").map((char, i) => (\n' +
            '                <motion.span\n' +
            '                    key={i}\n' +
            '                    variants={transformChar}\n' +
            '                    className="inline-block"\n' +
            '                    style={{transformStyle: "preserve-3d"}}\n' +
            '                >\n' +
            '                    {char === " " ? "\u00A0" : char}\n' +
            '                </motion.span>\n' +
            '            ))}\n' +
            '        </motion.div>\n' +
            '    );\n' +
            '}\n' +
            '\n' +
            'export default ThreeDTransformText;'
    },
]

export const ScrambleTextCodes = [
    {
        id: 'container',
        displayText: 'App.jsx',
        language: 'jsx',
        code: 'import React from "react";\n' +
            'import ScrambleText from "./ScrambleText.jsx";\n' +
            '\n' +
            'const App = () => {\n' +
            '\n' +
            '    return (\n' +
            '        <div className="w-full flex items-center gap-12 justify-center flex-col">\n' +
            '            <ScrambleText text="Text Scramble Animation"/>\n' +
            '        </div>\n' +
            '    );\n' +
            '}\n' +
            '\n' +
            'export default App;'
    },
    {
        id: 'scramble_text_animation',
        displayText: 'ScrambleText.jsx',
        language: 'jsx',
        code: 'import {useState, useEffect} from "react";\n' +
            'import {motion} from "framer-motion";\n' +
            '\n' +
            'const ScrambleText = ({text}) => {\n' +
            '    const [scrambledText, setScrambledText] = useState([]);\n' +
            '\n' +
            '    const finalText = text.split("");\n' +
            '\n' +
            '    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";\n' +
            '\n' +
            '    const scrambleText = {\n' +
            '        hidden: {opacity: 0},\n' +
            '        visible: {\n' +
            '            opacity: 1,\n' +
            '            transition: {\n' +
            '                staggerChildren: 0.03\n' +
            '            }\n' +
            '        }\n' +
            '    };\n' +
            '\n' +
            '    const elasticChar = {\n' +
            '        hidden: {\n' +
            '            opacity: 0,\n' +
            '            x: -20,\n' +
            '            scaleX: 1.5,\n' +
            '            scaleY: 0.5\n' +
            '        },\n' +
            '        visible: {\n' +
            '            opacity: 1,\n' +
            '            x: 0,\n' +
            '            scaleX: 1,\n' +
            '            scaleY: 1,\n' +
            '            transition: {\n' +
            '                type: "spring",\n' +
            '                damping: 10,\n' +
            '                stiffness: 200,\n' +
            '            }\n' +
            '        }\n' +
            '    };\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        const initialScrambled = finalText.map(() => " ");\n' +
            '        setScrambledText(initialScrambled);\n' +
            '\n' +
            '        let iterations = 0;\n' +
            '        const maxIterations = 20;\n' +
            '\n' +
            '        const interval = setInterval(() => {\n' +
            '            iterations++;\n' +
            '\n' +
            '            setScrambledText(prev =>\n' +
            '                prev.map((char, i) => {\n' +
            '                    if (finalText[i] === " ") return " ";\n' +
            '\n' +
            '                    if (iterations >= maxIterations) {\n' +
            '                        clearInterval(interval);\n' +
            '                        return finalText[i];\n' +
            '                    }\n' +
            '\n' +
            '                    if (char === finalText[i]) return char;\n' +
            '\n' +
            '                    return characters[Math.floor(Math.random() * characters.length)];\n' +
            '                })\n' +
            '            );\n' +
            '\n' +
            '            if (iterations > 5) {\n' +
            '                const randomIndex = Math.floor(Math.random() * finalText.length);\n' +
            '                setScrambledText(prev => {\n' +
            '                    const updated = [...prev];\n' +
            '                    if (finalText[randomIndex] !== " ") {\n' +
            '                        updated[randomIndex] = finalText[randomIndex];\n' +
            '                    }\n' +
            '                    return updated;\n' +
            '                });\n' +
            '            }\n' +
            '\n' +
            '            if (iterations >= maxIterations) {\n' +
            '                clearInterval(interval);\n' +
            '            }\n' +
            '        }, 60);\n' +
            '\n' +
            '        return () => clearInterval(interval);\n' +
            '    }, []);\n' +
            '\n' +
            '    return (\n' +
            '        <motion.div\n' +
            '            variants={scrambleText}\n' +
            '            initial="hidden"\n' +
            '            animate="visible"\n' +
            '            className="font-mono text-3xl text-center dark:text-[#d2e5f5] font-bold"\n' +
            '        >\n' +
            '            {scrambledText.map((char, index) => (\n' +
            '                <motion.span\n' +
            '                    key={index}\n' +
            '                    variants={elasticChar}\n' +
            '                    className="inline-block"\n' +
            '                >\n' +
            '                    {char === " " ? "\u00A0" : char}\n' +
            '                </motion.span>\n' +
            '            ))}\n' +
            '        </motion.div>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default ScrambleText;\n'
    },
]

export const WaveTextAnimationCodes = [
    {
        id: 'container',
        displayText: 'App.jsx',
        language: 'jsx',
        code: 'import React from "react";\n' +
            'import WaveText from "./WaveText.jsx";\n' +
            '\n' +
            'const App = () => {\n' +
            '\n' +
            '    return (\n' +
            '        <div className="w-full flex items-center gap-12 justify-center flex-col">\n' +
            '            <WaveText text="Text Wave Animation"/>\n' +
            '        </div>\n' +
            '    );\n' +
            '}\n' +
            '\n' +
            'export default App;'
    },
    {
        id: 'wave_animation_text',
        displayText: 'WaveText.jsx',
        language: 'jsx',
        code: 'import {motion, useAnimationControls} from "framer-motion";\n' +
            'import {useEffect} from "react";\n' +
            '\n' +
            'const WaveText = ({text}) => {\n' +
            '    const controls = useAnimationControls();\n' +
            '\n' +
            '    const waveAnimation = {\n' +
            '        hidden: {},\n' +
            '        visible: {\n' +
            '            transition: {\n' +
            '                staggerChildren: 0.05,\n' +
            '            },\n' +
            '        },\n' +
            '    };\n' +
            '\n' +
            '    const waveLetter = {\n' +
            '        hidden: {y: 0},\n' +
            '        visible: (i) => ({\n' +
            '            y: [0, -12, 0],\n' +
            '            transition: {\n' +
            '                delay: i * 0.05,\n' +
            '                duration: 0.5,\n' +
            '                ease: "easeInOut",\n' +
            '            },\n' +
            '        }),\n' +
            '    };\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        controls.start("visible");\n' +
            '    }, []);\n' +
            '\n' +
            '    return (\n' +
            '        <motion.div\n' +
            '            className="text-3xl font-bold text-center dark:text-[#d2e5f5]"\n' +
            '            initial="hidden"\n' +
            '            animate={controls}\n' +
            '            variants={waveAnimation}\n' +
            '        >\n' +
            '            {text.split("").map((char, i) => (\n' +
            '                <motion.span\n' +
            '                    key={i}\n' +
            '                    custom={i}\n' +
            '                    variants={waveLetter}\n' +
            '                    className="inline-block"\n' +
            '                >\n' +
            '                    {char === " " ? "\u00A0" : char}\n' +
            '                </motion.span>\n' +
            '            ))}\n' +
            '        </motion.div>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default WaveText;\n'
    },
]

export const ThreeDRotationCodes = [
    {
        id: 'container',
        displayText: 'App.jsx',
        language: 'jsx',
        code: 'import React from "react";\n' +
            'import ThreeDRotation from "./ThreeDRotation.jsx";\n' +
            '\n' +
            'const App = () => {\n' +
            '\n' +
            '    return (\n' +
            '        <div className="w-full flex items-center gap-12 justify-center flex-col">\n' +
            '            <ThreeDRotation text="Text 3D Rotation Animation"/>\n' +
            '        </div>\n' +
            '    );\n' +
            '}\n' +
            '\n' +
            'export default App;'
    },
    {
        id: 'threed_rataion_text',
        displayText: 'ThreeDRotation.jsx',
        language: 'jsx',
        code: 'import {motion, useAnimationControls} from "framer-motion";\n' +
            'import {useEffect} from "react";\n' +
            '\n' +
            'const ThreeDRotation = ({text}) => {\n' +
            '    const controls = useAnimationControls();\n' +
            '\n' +
            '    const rotateAnimation = {\n' +
            '        hidden: {},\n' +
            '        visible: {\n' +
            '            transition: {\n' +
            '                staggerChildren: 0.06,\n' +
            '            },\n' +
            '        },\n' +
            '    };\n' +
            '\n' +
            '    const rotateLetter = {\n' +
            '        hidden: {\n' +
            '            rotateX: 90,\n' +
            '            opacity: 0,\n' +
            '            transformOrigin: "center",\n' +
            '        },\n' +
            '        visible: (i) => ({\n' +
            '            rotateX: 0,\n' +
            '            opacity: 1,\n' +
            '            transition: {\n' +
            '                delay: i * 0.05,\n' +
            '                duration: 0.6,\n' +
            '                ease: "easeInOut",\n' +
            '            },\n' +
            '        }),\n' +
            '    };\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        controls.start("visible");\n' +
            '    }, []);\n' +
            '\n' +
            '    return (\n' +
            '        <motion.div\n' +
            '            className="text-3xl font-bold text-center dark:text-[#d2e5f5]"\n' +
            '            style={{perspective: "1000px", transformStyle: "preserve-3d"}}\n' +
            '            initial="hidden"\n' +
            '            animate={controls}\n' +
            '            variants={rotateAnimation}\n' +
            '        >\n' +
            '            {text.split("").map((char, i) => (\n' +
            '                <motion.span\n' +
            '                    key={i}\n' +
            '                    custom={i}\n' +
            '                    variants={rotateLetter}\n' +
            '                    className="inline-block"\n' +
            '                    style={{transformStyle: "preserve-3d"}}\n' +
            '                >\n' +
            '                    {char === " " ? "\u00A0" : char}\n' +
            '                </motion.span>\n' +
            '            ))}\n' +
            '        </motion.div>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default ThreeDRotation;\n'
    },
]

export const MagneticTextCodes = [
    {
        id: 'container',
        displayText: 'App.jsx',
        language: 'jsx',
        code: 'import React from "react";\n' +
            'import MagneticText from "./MagneticText.jsx";\n' +
            '\n' +
            'const App = () => {\n' +
            '\n' +
            '    return (\n' +
            '        <div className="w-full flex items-center gap-12 justify-center flex-col">\n' +
            '            <MagneticText text="Text Magnetic Animation"/>\n' +
            '        </div>\n' +
            '    );\n' +
            '}\n' +
            '\n' +
            'export default App;'
    },
    {
        id: 'magnetic_animation_text',
        displayText: 'MagneticText.jsx',
        language: 'jsx',
        code: 'import {useEffect} from "react";\n' +
            'import {motion, useAnimationControls} from "framer-motion";\n' +
            '\n' +
            'const MagneticText = ({text}) => {\n' +
            '\n' +
            '    const controls = useAnimationControls();\n' +
            '\n' +
            '    const magneticText = {\n' +
            '        hidden: {opacity: 0},\n' +
            '        visible: {\n' +
            '            opacity: 1,\n' +
            '            transition: {\n' +
            '                staggerChildren: 0.04,\n' +
            '            }\n' +
            '        }\n' +
            '    };\n' +
            '\n' +
            '    const magneticChar = {\n' +
            '        hidden: {\n' +
            '            opacity: 0,\n' +
            '            y: 100,\n' +
            '        },\n' +
            '        visible: (i) => ({\n' +
            '            opacity: 1,\n' +
            '            y: [100, -20, 0],\n' +
            '            transition: {\n' +
            '                type: "spring",\n' +
            '                damping: 12,\n' +
            '                stiffness: 200,\n' +
            '                delay: i * 0.04\n' +
            '            }\n' +
            '        })\n' +
            '    };\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        controls.start("visible");\n' +
            '    }, []);\n' +
            '\n' +
            '    return (\n' +
            '        <motion.div\n' +
            '            variants={magneticText}\n' +
            '            initial="hidden"\n' +
            '            animate={controls}\n' +
            '            className="text-3xl font-bold text-center dark:text-[#d2e5f5] overflow-hidden"\n' +
            '        >\n' +
            '            {text.split("").map((char, i) => (\n' +
            '                <motion.span\n' +
            '                    key={i}\n' +
            '                    custom={i}\n' +
            '                    variants={magneticChar}\n' +
            '                    className="inline-block"\n' +
            '                >\n' +
            '                    {char === " " ? "\u00A0" : char}\n' +
            '                </motion.span>\n' +
            '            ))}\n' +
            '        </motion.div>\n' +
            '    )\n' +
            '\n' +
            '}\n' +
            '\n' +
            'export default MagneticText;'
    },
]

export const TextTypeWriterCodes = [
    {
        id: 'container',
        displayText: 'App.jsx',
        language: 'jsx',
        code: 'import React from "react";\n' +
            'import TypewriterEffect from "./TypewriterEffect.jsx";\n' +
            '\n' +
            'const App = () => {\n' +
            '\n' +
            '    return (\n' +
            '        <div className="w-full flex items-center gap-12 justify-center flex-col">\n' +
            '            <TypewriterEffect fullText="Text Typewriter Animation"/>\n' +
            '        </div>\n' +
            '    );\n' +
            '}\n' +
            '\n' +
            'export default App;'
    },
    {
        id: 'type_writer_animation',
        displayText: 'TypewriterEffect.jsx',
        language: 'jsx',
        code: 'import {useState, useEffect, useRef} from "react";\n' +
            'import {motion} from "framer-motion";\n' +
            '\n' +
            'const TypewriterEffect = ({fullText}) => {\n' +
            '    const [displayText, setDisplayText] = useState("");\n' +
            '\n' +
            '    const typingSpeed = 100;\n' +
            '    const pauseBeforeRestart = 2000;\n' +
            '\n' +
            '    const typingTimerRef = useRef(null);\n' +
            '    const cursorTimerRef = useRef(null);\n' +
            '\n' +
            '    const startTypingAnimation = () => {\n' +
            '        setDisplayText("");\n' +
            '\n' +
            '        let currentIndex = 0;\n' +
            '\n' +
            '        if (typingTimerRef.current) {\n' +
            '            clearInterval(typingTimerRef.current);\n' +
            '        }\n' +
            '\n' +
            '        typingTimerRef.current = setInterval(() => {\n' +
            '            setDisplayText(fullText.substring(0, currentIndex + 1));\n' +
            '\n' +
            '            currentIndex++;\n' +
            '\n' +
            '            if (currentIndex >= fullText.length) {\n' +
            '                clearInterval(typingTimerRef.current);\n' +
            '\n' +
            '                setTimeout(() => {\n' +
            '                    startTypingAnimation();\n' +
            '                }, pauseBeforeRestart);\n' +
            '            }\n' +
            '        }, typingSpeed);\n' +
            '    };\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        startTypingAnimation();\n' +
            '\n' +
            '        return () => {\n' +
            '            if (typingTimerRef.current) clearInterval(typingTimerRef.current);\n' +
            '            if (cursorTimerRef.current) clearInterval(cursorTimerRef.current);\n' +
            '        };\n' +
            '    }, []);\n' +
            '\n' +
            '    return (\n' +
            '        <div className="w-full font-mono text-2xl text-center">\n' +
            '            <div className="relative inline">\n' +
            '                <span className="text-3xl font-bold dark:text-[#d2e5f5]">{displayText}</span>\n' +
            '                <motion.span\n' +
            '                    className="inline-block w-[3px] h-7 bg-black dark:bg-white ml-1 align-text-top"\n' +
            '                    animate={{opacity: [1, 0]}}\n' +
            '                    transition={{\n' +
            '                        duration: 0.8, repeat: Infinity, repeatType: "reverse",\n' +
            '                    }}\n' +
            '                />\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default TypewriterEffect;\n'
    },
]

export const TextFloatingAnimationCodes = [
    {
        id: 'container',
        displayText: 'App.jsx',
        language: 'jsx',
        code: 'import React from "react";\n' +
            'import FloatingText from "./FloatingText.jsx";\n' +
            '\n' +
            'const App = () => {\n' +
            '\n' +
            '    return (\n' +
            '        <div className="w-full flex items-center gap-12 justify-center flex-col">\n' +
            '            <FloatingText fullText="Text Floating Animation"/>\n' +
            '        </div>\n' +
            '    );\n' +
            '}\n' +
            '\n' +
            'export default App;'
    },
    {
        id: 'floating_text_animation',
        displayText: 'FloatingText.jsx',
        language: 'jsx',
        code: 'import {useEffect} from "react";\n' +
            'import {motion, useAnimationControls} from "framer-motion";\n' +
            '\n' +
            'const FloatingText = ({text}) => {\n' +
            '\n' +
            '    const controls = useAnimationControls();\n' +
            '\n' +
            '    const floatingText = {\n' +
            '        hidden: {opacity: 0},\n' +
            '        visible: {\n' +
            '            opacity: 1,\n' +
            '            transition: {\n' +
            '                staggerChildren: 0.08,\n' +
            '                delayChildren: 0.1\n' +
            '            }\n' +
            '        }\n' +
            '    };\n' +
            '\n' +
            '    const floatingChar = {\n' +
            '        hidden: {\n' +
            '            opacity: 0,\n' +
            '            y: 20\n' +
            '        },\n' +
            '        visible: (i) => ({\n' +
            '            opacity: 1,\n' +
            '            y: [20, 0, -10, 0, -5, 0],\n' +
            '            transition: {\n' +
            '                times: [0, 0.2, 0.4, 0.6, 0.8, 1],\n' +
            '                duration: 1.5,\n' +
            '                delay: i * 0.06,\n' +
            '                ease: "easeInOut"\n' +
            '            }\n' +
            '        })\n' +
            '    };\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        controls.start("visible");\n' +
            '    }, []);\n' +
            '\n' +
            '    return (\n' +
            '        <motion.div\n' +
            '            variants={floatingText}\n' +
            '            initial="hidden"\n' +
            '            animate={controls}\n' +
            '            className="text-3xl text-center dark:text-[#d2e5f5] font-bold"\n' +
            '        >\n' +
            '            {text.split("").map((char, i) => (\n' +
            '                <motion.span\n' +
            '                    key={i}\n' +
            '                    custom={i}\n' +
            '                    variants={floatingChar}\n' +
            '                    className="inline-block"\n' +
            '                >\n' +
            '                    {char === " " ? "\u00A0" : char}\n' +
            '                </motion.span>\n' +
            '            ))}\n' +
            '        </motion.div>\n' +
            '    );\n' +
            '}\n' +
            '\n' +
            'export default FloatingText;'
    },
]

export const ElasticTextAnimationCodes = [
    {
        id: 'container',
        displayText: 'App.jsx',
        language: 'jsx',
        code: 'import React from "react";\n' +
            'import ElasticText from "./ElasticText.jsx";\n' +
            '\n' +
            'const App = () => {\n' +
            '\n' +
            '    return (\n' +
            '        <div className="w-full flex items-center gap-12 justify-center flex-col">\n' +
            '            <ElasticText fullText="Text Elastic Animation"/>\n' +
            '        </div>\n' +
            '    );\n' +
            '}\n' +
            '\n' +
            'export default App;'
    },
    {
        id: 'elastic_text_animation',
        displayText: 'ElasticText.jsx',
        language: 'jsx',
        code: 'import {motion} from "framer-motion";\n' +
            '\n' +
            'const ElasticText = ({text}) => {\n' +
            '    const elasticChar = {\n' +
            '        hidden: {\n' +
            '            opacity: 0,\n' +
            '            x: -20,\n' +
            '            scaleX: 2,\n' +
            '            scaleY: 0.5\n' +
            '        },\n' +
            '        visible: {\n' +
            '            opacity: 1,\n' +
            '            x: 0,\n' +
            '            scaleX: 1,\n' +
            '            scaleY: 1,\n' +
            '            transition: {\n' +
            '                type: "spring",\n' +
            '                damping: 9,\n' +
            '                stiffness: 300\n' +
            '            }\n' +
            '        }\n' +
            '    };\n' +
            '\n' +
            '    return (\n' +
            '        <motion.div\n' +
            '            initial="hidden"\n' +
            '            animate="visible"\n' +
            '            className="text-3xl font-bold text-center dark:text-[#d2e5f5] overflow-hidden"\n' +
            '        >\n' +
            '            {text.split("").map((char, i) => (\n' +
            '                <motion.span\n' +
            '                    key={i}\n' +
            '                    variants={elasticChar}\n' +
            '                    className="inline-block"\n' +
            '                    transition={{delay: i * 0.05}}\n' +
            '                >\n' +
            '                    {char === " " ? "\u00A0" : char}\n' +
            '                </motion.span>\n' +
            '            ))}\n' +
            '        </motion.div>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default ElasticText;\n'
    },
]
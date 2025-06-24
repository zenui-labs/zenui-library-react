export const CelebrationButtonCodes = [
    {
        id: "Main",
        displayText: "App.jsx",
        language: "jsx",
        code: 'import React from "react";\n' +
            'import CelebrationButton from "./Button.jsx";\n' +
            '\n' +
            'const App = () => {\n' +
            '    return (\n' +
            '        <>\n' +
            '            <CelebrationButton/>\n' +
            '        </>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default App;'
    },
    {
        id: "Button",
        displayText: "Button.jsx",
        language: "jsx",
        code: 'import React, {useEffect, useRef, useState} from "react";\n' +
            'import {PARTICLE_COUNT, COLORS, GRAVITY, DRAG, SHAPES} from "./Constant.js"\n' +
            '\n' +
            'function CelebrationButton({\n' +
            '                               label = "Claim",\n' +
            '                               successText = "Success"\n' +
            '                           }) {\n' +
            '    const [particles, setParticles] = useState([]);\n' +
            '    const [isLoading, setIsLoading] = useState(false);\n' +
            '    const [buttonText, setButtonText] = useState(label);\n' +
            '    const buttonRef = useRef(null);\n' +
            '    const animationRef = useRef(null);\n' +
            '\n' +
            '    function randomRange(min, max) {\n' +
            '        return Math.random() * (max - min) + min;\n' +
            '    }\n' +
            '\n' +
            '    function createParticles() {\n' +
            '        if (!buttonRef.current) return;\n' +
            '        const rect = buttonRef.current.getBoundingClientRect();\n' +
            '        const originX = rect.left + rect.width / 2;\n' +
            '        const originY = rect.top + rect.height / 2;\n' +
            '        const newParticles = [];\n' +
            '        for (let i = 0; i < PARTICLE_COUNT; i++) {\n' +
            '            const angle = randomRange(40, 140) * (Math.PI / 180);\n' +
            '            const speed = randomRange(10, 20);\n' +
            '            newParticles.push({\n' +
            '                id: Math.random().toString(36).slice(2),\n' +
            '                x: originX,\n' +
            '                y: originY,\n' +
            '                vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1) * randomRange(0.5, 1),\n' +
            '                vy: -Math.sin(angle) * speed,\n' +
            '                color: COLORS[Math.floor(Math.random() * COLORS.length)],\n' +
            '                size: randomRange(4, 10),\n' +
            '                life: 50 + Math.floor(Math.random() * 30),\n' +
            '                shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],\n' +
            '                rotationZ: randomRange(0, 360),\n' +
            '                rotationZSpeed: randomRange(-20, 20),\n' +
            '                rotationY: randomRange(0, 360),\n' +
            '                rotationYSpeed: randomRange(-15, 15),\n' +
            '                scale: 1,\n' +
            '                scaleSpeed: randomRange(-0.015, -0.005),\n' +
            '                opacity: 1,\n' +
            '            });\n' +
            '        }\n' +
            '        setParticles(newParticles);\n' +
            '    }\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        if (particles.length === 0) return;\n' +
            '\n' +
            '        function animate() {\n' +
            '            setParticles((oldParticles) =>\n' +
            '                oldParticles\n' +
            '                    .map((p) => {\n' +
            '                        let {x, y, vx, vy, life, rotationZ, rotationY, opacity, scale, scaleSpeed} = p;\n' +
            '                        vy += GRAVITY;\n' +
            '                        vx *= DRAG;\n' +
            '                        vy *= DRAG;\n' +
            '                        x += vx;\n' +
            '                        y += vy;\n' +
            '                        rotationZ += p.rotationZSpeed;\n' +
            '                        rotationY += p.rotationYSpeed;\n' +
            '                        life -= 1;\n' +
            '                        if (life < 30) {\n' +
            '                            opacity = Math.max(0, life / 30);\n' +
            '                        }\n' +
            '                        scale += scaleSpeed;\n' +
            '                        if (scale < 0) scale = 0;\n' +
            '                        return {...p, x, y, vx, vy, life, rotationZ, rotationY, opacity, scale};\n' +
            '                    })\n' +
            '                    .filter((p) => p.life > 0 && p.y < window.innerHeight + 100)\n' +
            '            );\n' +
            '            animationRef.current = requestAnimationFrame(animate);\n' +
            '        }\n' +
            '\n' +
            '        animationRef.current = requestAnimationFrame(animate);\n' +
            '        return () => cancelAnimationFrame(animationRef.current);\n' +
            '    }, [particles.length]);\n' +
            '\n' +
            '    function renderParticle(p) {\n' +
            '        const {id, x, y, color, size, shape, rotationZ, rotationY, opacity, scale} = p;\n' +
            '        const baseStyle = {\n' +
            '            position: "absolute",\n' +
            '            left: x,\n' +
            '            top: y,\n' +
            '            opacity,\n' +
            '            pointerEvents: "none",\n' +
            '            transform: `translate(-50%, -50%) rotateZ(${rotationZ}deg) rotateY(${rotationY}deg) scale(${scale})`,\n' +
            '            filter: "drop-shadow(0 0 2px rgba(0,0,0,0.15))",\n' +
            '            willChange: "transform, opacity",\n' +
            '        };\n' +
            '        switch (shape) {\n' +
            '            case "line":\n' +
            '                return (\n' +
            '                    <div\n' +
            '                        key={id}\n' +
            '                        style={{\n' +
            '                            ...baseStyle,\n' +
            '                            width: size * 0.3,\n' +
            '                            height: size * 1.8,\n' +
            '                            backgroundColor: color,\n' +
            '                            borderRadius: size * 0.15,\n' +
            '                        }}\n' +
            '                    />\n' +
            '                );\n' +
            '            case "rect":\n' +
            '                return (\n' +
            '                    <div\n' +
            '                        key={id}\n' +
            '                        style={{\n' +
            '                            ...baseStyle,\n' +
            '                            width: size,\n' +
            '                            height: size * 0.6,\n' +
            '                            backgroundColor: color,\n' +
            '                            borderRadius: size * 0.2,\n' +
            '                        }}\n' +
            '                    />\n' +
            '                );\n' +
            '            case "circle":\n' +
            '                return (\n' +
            '                    <div\n' +
            '                        key={id}\n' +
            '                        style={{\n' +
            '                            ...baseStyle,\n' +
            '                            width: size,\n' +
            '                            height: size,\n' +
            '                            backgroundColor: color,\n' +
            '                            borderRadius: "50%",\n' +
            '                        }}\n' +
            '                    />\n' +
            '                );\n' +
            '            case "triangle":\n' +
            '                return (\n' +
            '                    <div\n' +
            '                        key={id}\n' +
            '                        style={{...baseStyle, width: size, height: size}}\n' +
            '                        aria-hidden="true"\n' +
            '                    >\n' +
            '                        <Triangle size={size} color={color}/>\n' +
            '                    </div>\n' +
            '                );\n' +
            '            case "star":\n' +
            '                return (\n' +
            '                    <div\n' +
            '                        key={id}\n' +
            '                        style={{...baseStyle, width: size * 2, height: size * 2}}\n' +
            '                        aria-hidden="true"\n' +
            '                    >\n' +
            '                        <Star size={size} color={color}/>\n' +
            '                    </div>\n' +
            '                );\n' +
            '            default:\n' +
            '                return null;\n' +
            '        }\n' +
            '    }\n' +
            '\n' +
            '    function Triangle({size, color}) {\n' +
            '        const path = `\n' +
            '          M 0 ${size}\n' +
            '          L ${size / 2} 0\n' +
            '          L ${size} ${size}\n' +
            '          Z\n' +
            '        `;\n' +
            '        return (\n' +
            '            <svg\n' +
            '                width={size}\n' +
            '                height={size}\n' +
            '                viewBox={`0 0 ${size} ${size}`}\n' +
            '                fill={color}\n' +
            '                style={{display: "block"}}\n' +
            '            >\n' +
            '                <path d={path}/>\n' +
            '            </svg>\n' +
            '        );\n' +
            '    }\n' +
            '\n' +
            '    function Star({size, color}) {\n' +
            '        const cx = size;\n' +
            '        const cy = size;\n' +
            '        const spikes = 5;\n' +
            '        const outerRadius = size;\n' +
            '        const innerRadius = size / 2.5;\n' +
            '        let rot = Math.PI / 2 * 3;\n' +
            '        let x = cx;\n' +
            '        let y = cy;\n' +
            '        const step = Math.PI / spikes;\n' +
            '        let path = "";\n' +
            '\n' +
            '        for (let i = 0; i < spikes; i++) {\n' +
            '            x = cx + Math.cos(rot) * outerRadius;\n' +
            '            y = cy + Math.sin(rot) * outerRadius;\n' +
            '            path += `L${x} ${y} `;\n' +
            '            rot += step;\n' +
            '\n' +
            '            x = cx + Math.cos(rot) * innerRadius;\n' +
            '            y = cy + Math.sin(rot) * innerRadius;\n' +
            '            path += `L${x} ${y} `;\n' +
            '            rot += step;\n' +
            '        }\n' +
            '        path += "L" + cx + " " + (cy - outerRadius) + " Z";\n' +
            '\n' +
            '        return (\n' +
            '            <svg\n' +
            '                width={size * 2}\n' +
            '                height={size * 2}\n' +
            '                viewBox={`0 0 ${size * 2} ${size * 2}`}\n' +
            '                fill={color}\n' +
            '                style={{display: "block"}}\n' +
            '            >\n' +
            '                <path d={path}/>\n' +
            '            </svg>\n' +
            '        );\n' +
            '    }\n' +
            '\n' +
            '    function handleClick() {\n' +
            '        setIsLoading(true);\n' +
            '        setTimeout(() => {\n' +
            '            setIsLoading(false);\n' +
            '            setButtonText(successText);\n' +
            '            createParticles();\n' +
            '            setTimeout(() => setButtonText(label), 2000);\n' +
            '        }, 1000);\n' +
            '    }\n' +
            '\n' +
            '    return (\n' +
            '        <div className="relative">\n' +
            '            <button\n' +
            '                ref={buttonRef}\n' +
            '                onClick={handleClick}\n' +
            '                disabled={isLoading}\n' +
            '                className={`w-32 px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold rounded-lg shadow-lg shadow-pink-500/50 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition-all duration-300 active:scale-90 relative overflow-hidden ${\n' +
            '                    isLoading ? "opacity-50 cursor-not-allowed" : ""\n' +
            '                }`}\n' +
            '            >\n' +
            '                {isLoading ? (\n' +
            '                    <span className="flex items-center justify-center">\n' +
            '                            <svg\n' +
            '                                className="animate-spin h-5 w-5 text-white"\n' +
            '                                xmlns="http://www.w3.org/2000/svg"\n' +
            '                                fill="none"\n' +
            '                                viewBox="0 0 24 24"\n' +
            '                            >\n' +
            '                                <circle\n' +
            '                                    className="opacity-25"\n' +
            '                                    cx="12"\n' +
            '                                    cy="12"\n' +
            '                                    r="10"\n' +
            '                                    stroke="currentColor"\n' +
            '                                    strokeWidth="4"\n' +
            '                                ></circle>\n' +
            '                                <path\n' +
            '                                    className="opacity-75"\n' +
            '                                    fill="currentColor"\n' +
            '                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"\n' +
            '                                ></path>\n' +
            '                            </svg>\n' +
            '                        </span>\n' +
            '                ) : (\n' +
            '                    buttonText\n' +
            '                )}\n' +
            '            </button>\n' +
            '            <div\n' +
            '                style={{\n' +
            '                    position: "fixed",\n' +
            '                    top: 0,\n' +
            '                    left: 0,\n' +
            '                    width: "100vw",\n' +
            '                    height: "100vh",\n' +
            '                    overflow: "hidden",\n' +
            '                    pointerEvents: "none",\n' +
            '                    zIndex: 9999,\n' +
            '                    perspective: "800px",\n' +
            '                }}\n' +
            '            >\n' +
            '                {particles.map(renderParticle)}\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    );\n' +
            '}\n' +
            '\n' +
            'export default CelebrationButton;'
    },
    {
        id: "Constant",
        displayText: "Constant.js",
        language: "js",
        code: 'export const PARTICLE_COUNT = 90;\n' +
            'export const COLORS = [\n' +
            '    "#f87171", "#60a5fa", "#34d399", "#fbbf24",\n' +
            '    "#a78bfa", "#f472b6", "#f59e0b", "#10b981",\n' +
            '];\n' +
            'export const GRAVITY = 0.35;\n' +
            'export const DRAG = 0.92;\n' +
            'export const SHAPES = ["rect", "line", "circle", "triangle", "star"];'
    },
]
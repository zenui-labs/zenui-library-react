export const GridDistroyCodes = [
    {
        id: 'container',
        displayText: 'App.jsx',
        language: 'jsx',
        code: 'import React from \'react\';\n' +
            'import {IoChevronForward} from "react-icons/io5";\n' +
            'import GridDistortion from "./GridDistortion.jsx"\n' +
            '\n' +
            'const App = () => {\n' +
            '    return (\n' +
            '        <GridDistortion>\n' +
            '            <div\n' +
            '                className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center max-w-[700px] mx-auto px-5 py-10 md:py-0 lg:lg:px-0 text-white">\n' +
            '                <button\n' +
            '                    className="py-1.5 pl-5 backdrop-blur-md pr-6 border-gray-600 rounded-full text-[0.9rem] border mb-4">\n' +
            '                    ✨ Introducing ZenUI v2.3\n' +
            '                </button>\n' +
            '\n' +
            '                <h1\n' +
            '                    className="text-[2rem] lg:text-[3rem] font-bold leading-[40px] lg:leading-[50px]">\n' +
            '                    Open-Source UI Components & Templates Library\n' +
            '                </h1>\n' +
            '\n' +
            '                <p\n' +
            '                    className="text-white/80 max-w-[700px] mt-3">\n' +
            '                    ZenUI Library is an Tailwind CSS components library for any needs. Comes with UI examples &\n' +
            '                    blocks,\n' +
            '                    templates, Icons, Color Palette and more.\n' +
            '                </p>\n' +
            '\n' +
            '                <div\n' +
            '                    className="flex items-center flex-col md:flex-row gap-3 justify-center 425px:gap-6 mt-10 md:mt-12">\n' +
            '                    <button\n' +
            '                        className="bg-[#0FABCA] pl-5 pr-4 border border-[#0FABCA] rounded-lg py-3 flex items-center gap-2 text-[1rem] group"\n' +
            '                    >\n' +
            '                        Browse Components\n' +
            '                        <IoChevronForward className="group-hover:ml-1 transition-all duration-200"/>\n' +
            '                    </button>\n' +
            '                    <button\n' +
            '                        className="border-2 border-[#0FABCA] pl-5 pr-4 rounded-lg py-3 flex items-center gap-2 text-[1rem] group">\n' +
            '                        Browse Templates\n' +
            '                        <IoChevronForward className="group-hover:ml-1 transition-all duration-200"/>\n' +
            '                    </button>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </GridDistortion>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default App;\n'
    },
    {
        id: 'grid_distroy_animation',
        displayText: 'GridDistortion.jsx',
        language: 'jsx',
        code: 'import {useState, useEffect, useRef} from "react"\n' +
            '\n' +
            'const GridDistortion = ({children}) => {\n' +
            '    const canvasRef = useRef(null)\n' +
            '    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})\n' +
            '    const [dimensions, setDimensions] = useState({width: 0, height: 0})\n' +
            '    const animationRef = useRef(null)\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        const handleResize = () => {\n' +
            '            if (canvasRef.current) {\n' +
            '                const canvas = canvasRef.current\n' +
            '                const {width, height} = canvas.getBoundingClientRect()\n' +
            '\n' +
            '                const dpr = window.devicePixelRatio || 1\n' +
            '                canvas.width = width * dpr\n' +
            '                canvas.height = height * dpr\n' +
            '\n' +
            '                const ctx = canvas.getContext("2d")\n' +
            '                ctx.scale(dpr, dpr)\n' +
            '\n' +
            '                setDimensions({width, height})\n' +
            '            }\n' +
            '        }\n' +
            '\n' +
            '        handleResize()\n' +
            '        window.addEventListener("resize", handleResize)\n' +
            '\n' +
            '        return () => {\n' +
            '            window.removeEventListener("resize", handleResize)\n' +
            '            if (animationRef.current) {\n' +
            '                cancelAnimationFrame(animationRef.current)\n' +
            '            }\n' +
            '        }\n' +
            '    }, [])\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        const handleMouseMove = (e) => {\n' +
            '            if (canvasRef.current) {\n' +
            '                const {left, top} = canvasRef.current.getBoundingClientRect()\n' +
            '                setMousePosition({\n' +
            '                    x: e.clientX - left,\n' +
            '                    y: e.clientY - top,\n' +
            '                })\n' +
            '            }\n' +
            '        }\n' +
            '\n' +
            '        window.addEventListener("mousemove", handleMouseMove)\n' +
            '        return () => window.removeEventListener("mousemove", handleMouseMove)\n' +
            '    }, [])\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        if (!canvasRef.current || dimensions.width === 0) return\n' +
            '\n' +
            '        const canvas = canvasRef.current\n' +
            '        const ctx = canvas.getContext("2d")\n' +
            '\n' +
            '        const drawGrid = () => {\n' +
            '            const {width, height} = dimensions\n' +
            '\n' +
            '            ctx.clearRect(0, 0, width, height)\n' +
            '\n' +
            '            const cellSize = 30\n' +
            '            const rows = Math.ceil(height / cellSize) + 1\n' +
            '            const cols = Math.ceil(width / cellSize) + 1\n' +
            '\n' +
            '            const maxDistance = 200\n' +
            '            const maxDisplacement = 20\n' +
            '\n' +
            '            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"\n' +
            '            ctx.lineWidth = 0.5\n' +
            '\n' +
            '            const points = []\n' +
            '\n' +
            '            for (let y = 0; y < rows; y++) {\n' +
            '                const row = []\n' +
            '                for (let x = 0; x < cols; x++) {\n' +
            '                    const baseX = x * cellSize\n' +
            '                    const baseY = y * cellSize\n' +
            '\n' +
            '                    const dx = baseX - mousePosition.x\n' +
            '                    const dy = baseY - mousePosition.y\n' +
            '                    const distance = Math.sqrt(dx * dx + dy * dy)\n' +
            '\n' +
            '                    let distortionX = 0\n' +
            '                    let distortionY = 0\n' +
            '\n' +
            '                    if (distance < maxDistance) {\n' +
            '                        const force = (1 - distance / maxDistance) * maxDisplacement\n' +
            '                        distortionX = (dx / distance) * force || 0\n' +
            '                        distortionY = (dy / distance) * force || 0\n' +
            '                    }\n' +
            '\n' +
            '                    row.push({\n' +
            '                        x: baseX + distortionX,\n' +
            '                        y: baseY + distortionY,\n' +
            '                    })\n' +
            '                }\n' +
            '                points.push(row)\n' +
            '            }\n' +
            '\n' +
            '            for (let y = 0; y < rows; y++) {\n' +
            '                ctx.beginPath()\n' +
            '                for (let x = 0; x < cols; x++) {\n' +
            '                    const point = points[y][x]\n' +
            '                    if (x === 0) {\n' +
            '                        ctx.moveTo(point.x, point.y)\n' +
            '                    } else {\n' +
            '                        ctx.lineTo(point.x, point.y)\n' +
            '                    }\n' +
            '                }\n' +
            '                ctx.stroke()\n' +
            '            }\n' +
            '\n' +
            '            for (let x = 0; x < cols; x++) {\n' +
            '                ctx.beginPath()\n' +
            '                for (let y = 0; y < rows; y++) {\n' +
            '                    const point = points[y][x]\n' +
            '                    if (y === 0) {\n' +
            '                        ctx.moveTo(point.x, point.y)\n' +
            '                    } else {\n' +
            '                        ctx.lineTo(point.x, point.y)\n' +
            '                    }\n' +
            '                }\n' +
            '                ctx.stroke()\n' +
            '            }\n' +
            '\n' +
            '            ctx.fillStyle = "rgba(255, 255, 255, 0.4)"\n' +
            '            for (let y = 0; y < rows; y++) {\n' +
            '                for (let x = 0; x < cols; x++) {\n' +
            '                    const point = points[y][x]\n' +
            '                    ctx.beginPath()\n' +
            '                    ctx.arc(point.x, point.y, 1, 0, Math.PI * 2)\n' +
            '                    ctx.fill()\n' +
            '                }\n' +
            '            }\n' +
            '\n' +
            '            ctx.beginPath()\n' +
            '            ctx.arc(mousePosition.x, mousePosition.y, 8, 0, Math.PI * 2)\n' +
            '\n' +
            '            const gradient = ctx.createRadialGradient(\n' +
            '                mousePosition.x,\n' +
            '                mousePosition.y,\n' +
            '                0,\n' +
            '                mousePosition.x,\n' +
            '                mousePosition.y,\n' +
            '                30,\n' +
            '            )\n' +
            '            gradient.addColorStop(0, "rgba(100, 200, 255, 0.8)")\n' +
            '            gradient.addColorStop(1, "rgba(100, 200, 255, 0)")\n' +
            '\n' +
            '            ctx.fillStyle = gradient\n' +
            '            ctx.fill()\n' +
            '\n' +
            '            animationRef.current = requestAnimationFrame(drawGrid)\n' +
            '        }\n' +
            '\n' +
            '        drawGrid()\n' +
            '\n' +
            '        return () => {\n' +
            '            if (animationRef.current) {\n' +
            '                cancelAnimationFrame(animationRef.current)\n' +
            '            }\n' +
            '        }\n' +
            '    }, [dimensions, mousePosition])\n' +
            '\n' +
            '    return (\n' +
            '        <div\n' +
            '            className="relative w-full min-h-[500px] flex items-center justify-center flex-col overflow-hidden rounded-high bg-gray-900">\n' +
            '            \n' +
            '            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"/>\n' +
            '\n' +
            '            {children}\n' +
            '        </div>\n' +
            '    )\n' +
            '}\n' +
            '\n' +
            'export default GridDistortion;\n'
    },
]

export const CircuitBoardCodes = [
    {
        id: 'container',
        displayText: 'App.jsx',
        language: 'jsx',
        code: 'import React from \'react\';\n' +
            'import {IoChevronForward} from "react-icons/io5";\n' +
            'import CircuitBoard from "./CircuitBoard.jsx"\n' +
            '\n' +
            'const App = () => {\n' +
            '    return (\n' +
            '        <CircuitBoard>\n' +
            '            <div\n' +
            '                className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center max-w-[700px] mx-auto px-5 py-10 md:py-0 lg:lg:px-0 text-white">\n' +
            '                <button\n' +
            '                    className="py-1.5 pl-5 backdrop-blur-md pr-6 border-gray-600 rounded-full text-[0.9rem] border mb-4">\n' +
            '                    ✨ Introducing ZenUI v2.3\n' +
            '                </button>\n' +
            '\n' +
            '                <h1\n' +
            '                    className="text-[2rem] lg:text-[3rem] font-bold leading-[40px] lg:leading-[50px]">\n' +
            '                    Open-Source UI Components & Templates Library\n' +
            '                </h1>\n' +
            '\n' +
            '                <p\n' +
            '                    className="text-white/80 max-w-[700px] mt-3">\n' +
            '                    ZenUI Library is an Tailwind CSS components library for any needs. Comes with UI examples &\n' +
            '                    blocks,\n' +
            '                    templates, Icons, Color Palette and more.\n' +
            '                </p>\n' +
            '\n' +
            '                <div\n' +
            '                    className="flex items-center flex-col md:flex-row gap-3 justify-center 425px:gap-6 mt-10 md:mt-12">\n' +
            '                    <button\n' +
            '                        className="bg-[#0FABCA] pl-5 pr-4 border border-[#0FABCA] rounded-lg py-3 flex items-center gap-2 text-[1rem] group"\n' +
            '                    >\n' +
            '                        Browse Components\n' +
            '                        <IoChevronForward className="group-hover:ml-1 transition-all duration-200"/>\n' +
            '                    </button>\n' +
            '                    <button\n' +
            '                        className="border-2 border-[#0FABCA] pl-5 pr-4 rounded-lg py-3 flex items-center gap-2 text-[1rem] group">\n' +
            '                        Browse Templates\n' +
            '                        <IoChevronForward className="group-hover:ml-1 transition-all duration-200"/>\n' +
            '                    </button>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </CircuitBoard>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default App;\n'
    },
    {
        id: 'CircuitBoard_animation',
        displayText: 'CircuitBoard.jsx',
        language: 'jsx',
        code: 'import {useRef, useEffect, useState} from "react"\n' +
            '\n' +
            'const CircuitBoard = ({children}) => {\n' +
            '    const canvasRef = useRef(null)\n' +
            '    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})\n' +
            '    const [dimensions, setDimensions] = useState({width: 0, height: 0})\n' +
            '    const circuitNodesRef = useRef([])\n' +
            '    const circuitPathsRef = useRef([])\n' +
            '    const animationRef = useRef(null)\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        const canvas = canvasRef.current\n' +
            '        const ctx = canvas.getContext("2d")\n' +
            '\n' +
            '        const handleResize = () => {\n' +
            '            const {innerWidth, innerHeight, devicePixelRatio = 1} = window\n' +
            '\n' +
            '            canvas.width = innerWidth * devicePixelRatio\n' +
            '            canvas.height = innerHeight * devicePixelRatio\n' +
            '            canvas.style.width = `${innerWidth}px`\n' +
            '            canvas.style.height = `${innerHeight}px`\n' +
            '\n' +
            '            ctx.setTransform(1, 0, 0, 1, 0, 0) \n' +
            '            ctx.scale(devicePixelRatio, devicePixelRatio)\n' +
            '\n' +
            '            setDimensions({width: innerWidth, height: innerHeight})\n' +
            '            generateCircuit(innerWidth, innerHeight)\n' +
            '        }\n' +
            '\n' +
            '        const generateCircuit = (width, height) => {\n' +
            '            const nodeCount = width < 768 ? 30 : 50\n' +
            '            const nodes = []\n' +
            '            const gridSize = Math.sqrt(nodeCount)\n' +
            '            const cellWidth = width / gridSize\n' +
            '            const cellHeight = height / gridSize\n' +
            '\n' +
            '            for (let i = 0; i < gridSize; i++) {\n' +
            '                for (let j = 0; j < gridSize; j++) {\n' +
            '                    const x = i * cellWidth + Math.random() * (cellWidth * 0.6) + cellWidth * 0.2\n' +
            '                    const y = j * cellHeight + Math.random() * (cellHeight * 0.6) + cellHeight * 0.2\n' +
            '\n' +
            '                    nodes.push({\n' +
            '                        x,\n' +
            '                        y,\n' +
            '                        size: Math.random() * 3 + 2,\n' +
            '                        isActive: false,\n' +
            '                        activationLevel: 0,\n' +
            '                    })\n' +
            '                }\n' +
            '            }\n' +
            '\n' +
            '            const paths = []\n' +
            '            for (let i = 0; i < nodes.length; i++) {\n' +
            '                const node = nodes[i]\n' +
            '                const connections = findClosestNodes(node, nodes, 2 + Math.floor(Math.random() * 3))\n' +
            '                for (const target of connections) {\n' +
            '                    const exists = paths.some(\n' +
            '                        (p) => (p.from === i && p.to === target) || (p.from === target && p.to === i)\n' +
            '                    )\n' +
            '                    if (!exists && i !== target) {\n' +
            '                        paths.push({\n' +
            '                            from: i,\n' +
            '                            to: target,\n' +
            '                            isActive: false,\n' +
            '                            activationLevel: 0,\n' +
            '                        })\n' +
            '                    }\n' +
            '                }\n' +
            '            }\n' +
            '\n' +
            '            circuitNodesRef.current = nodes\n' +
            '            circuitPathsRef.current = paths\n' +
            '        }\n' +
            '\n' +
            '        const findClosestNodes = (node, nodes, count) => {\n' +
            '            const distances = nodes.map((n, index) => {\n' +
            '                const dx = node.x - n.x\n' +
            '                const dy = node.y - n.y\n' +
            '                return {index, distance: Math.sqrt(dx * dx + dy * dy)}\n' +
            '            })\n' +
            '\n' +
            '            return distances\n' +
            '                .filter((d) => d.distance > 0)\n' +
            '                .sort((a, b) => a.distance - b.distance)\n' +
            '                .slice(0, count)\n' +
            '                .map((d) => d.index)\n' +
            '        }\n' +
            '\n' +
            '        handleResize()\n' +
            '        window.addEventListener("resize", handleResize)\n' +
            '\n' +
            '        return () => {\n' +
            '            window.removeEventListener("resize", handleResize)\n' +
            '            if (animationRef.current) cancelAnimationFrame(animationRef.current)\n' +
            '        }\n' +
            '    }, [])\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        const handleMouseMove = (e) => {\n' +
            '            const rect = canvasRef.current.getBoundingClientRect()\n' +
            '            const x = e.clientX - rect.left\n' +
            '            const y = e.clientY - rect.top\n' +
            '            setMousePosition({x, y})\n' +
            '        }\n' +
            '\n' +
            '        window.addEventListener("mousemove", handleMouseMove)\n' +
            '        return () => window.removeEventListener("mousemove", handleMouseMove)\n' +
            '    }, [])\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        if (!dimensions.width) return\n' +
            '\n' +
            '        const canvas = canvasRef.current\n' +
            '        const ctx = canvas.getContext("2d")\n' +
            '\n' +
            '        const animate = () => {\n' +
            '            ctx.clearRect(0, 0, dimensions.width, dimensions.height)\n' +
            '\n' +
            '            const nodes = circuitNodesRef.current\n' +
            '            const paths = circuitPathsRef.current\n' +
            '\n' +
            '            for (let i = 0; i < nodes.length; i++) {\n' +
            '                const node = nodes[i]\n' +
            '                const dx = node.x - mousePosition.x\n' +
            '                const dy = node.y - mousePosition.y\n' +
            '                const distance = Math.sqrt(dx * dx + dy * dy)\n' +
            '\n' +
            '                if (distance < 150) {\n' +
            '                    node.isActive = true\n' +
            '                    node.activationLevel = Math.min(1, node.activationLevel + 0.05)\n' +
            '                } else {\n' +
            '                    node.activationLevel = Math.max(0, node.activationLevel - 0.02)\n' +
            '                    if (node.activationLevel <= 0) node.isActive = false\n' +
            '                }\n' +
            '            }\n' +
            '\n' +
            '            for (const path of paths) {\n' +
            '                const fromNode = nodes[path.from]\n' +
            '                const toNode = nodes[path.to]\n' +
            '\n' +
            '                if (fromNode.isActive || toNode.isActive) {\n' +
            '                    path.isActive = true\n' +
            '                    path.activationLevel = Math.min(1, path.activationLevel + 0.03)\n' +
            '                } else {\n' +
            '                    path.activationLevel = Math.max(0, path.activationLevel - 0.01)\n' +
            '                    if (path.activationLevel <= 0) path.isActive = false\n' +
            '                }\n' +
            '            }\n' +
            '\n' +
            '            ctx.strokeStyle = "rgba(50, 50, 70, 0.3)"\n' +
            '            ctx.lineWidth = 1\n' +
            '            for (const path of paths) {\n' +
            '                if (!path.isActive) {\n' +
            '                    const fromNode = nodes[path.from]\n' +
            '                    const toNode = nodes[path.to]\n' +
            '                    ctx.beginPath()\n' +
            '                    ctx.moveTo(fromNode.x, fromNode.y)\n' +
            '                    ctx.lineTo(toNode.x, toNode.y)\n' +
            '                    ctx.stroke()\n' +
            '                }\n' +
            '            }\n' +
            '\n' +
            '            for (const path of paths) {\n' +
            '                if (path.isActive && path.activationLevel > 0) {\n' +
            '                    const fromNode = nodes[path.from]\n' +
            '                    const toNode = nodes[path.to]\n' +
            '\n' +
            '                    ctx.strokeStyle = `rgba(0, 200, 255, ${path.activationLevel * 0.2})`\n' +
            '                    ctx.lineWidth = 3\n' +
            '                    ctx.beginPath()\n' +
            '                    ctx.moveTo(fromNode.x, fromNode.y)\n' +
            '                    ctx.lineTo(toNode.x, toNode.y)\n' +
            '                    ctx.stroke()\n' +
            '\n' +
            '                    ctx.strokeStyle = `rgba(100, 220, 255, ${path.activationLevel})`\n' +
            '                    ctx.lineWidth = 1\n' +
            '                    ctx.beginPath()\n' +
            '                    ctx.moveTo(fromNode.x, fromNode.y)\n' +
            '                    ctx.lineTo(toNode.x, toNode.y)\n' +
            '                    ctx.stroke()\n' +
            '                }\n' +
            '            }\n' +
            '\n' +
            '            for (const node of nodes) {\n' +
            '                if (!node.isActive) {\n' +
            '                    ctx.fillStyle = "rgba(100, 100, 120, 0.5)"\n' +
            '                    ctx.beginPath()\n' +
            '                    ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)\n' +
            '                    ctx.fill()\n' +
            '                } else {\n' +
            '                    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 3)\n' +
            '                    gradient.addColorStop(0, `rgba(0, 200, 255, ${node.activationLevel})`)\n' +
            '                    gradient.addColorStop(1, "rgba(0, 200, 255, 0)")\n' +
            '                    ctx.fillStyle = gradient\n' +
            '                    ctx.beginPath()\n' +
            '                    ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2)\n' +
            '                    ctx.fill()\n' +
            '\n' +
            '                    ctx.fillStyle = `rgba(100, 220, 255, ${node.activationLevel})`\n' +
            '                    ctx.beginPath()\n' +
            '                    ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)\n' +
            '                    ctx.fill()\n' +
            '                }\n' +
            '            }\n' +
            '\n' +
            '            const gradient = ctx.createRadialGradient(\n' +
            '                mousePosition.x,\n' +
            '                mousePosition.y,\n' +
            '                0,\n' +
            '                mousePosition.x,\n' +
            '                mousePosition.y,\n' +
            '                150\n' +
            '            )\n' +
            '            gradient.addColorStop(0, "rgba(0, 200, 255, 0.1)")\n' +
            '            gradient.addColorStop(1, "rgba(0, 200, 255, 0)")\n' +
            '            ctx.fillStyle = gradient\n' +
            '            ctx.beginPath()\n' +
            '            ctx.arc(mousePosition.x, mousePosition.y, 150, 0, Math.PI * 2)\n' +
            '            ctx.fill()\n' +
            '\n' +
            '            animationRef.current = requestAnimationFrame(animate)\n' +
            '        }\n' +
            '\n' +
            '        animate()\n' +
            '\n' +
            '        return () => {\n' +
            '            if (animationRef.current) cancelAnimationFrame(animationRef.current)\n' +
            '        }\n' +
            '    }, [dimensions, mousePosition])\n' +
            '\n' +
            '    return (\n' +
            '        <div\n' +
            '            className="relative w-full min-h-[500px] flex items-center justify-center flex-col overflow-hidden rounded-high bg-gray-900">\n' +
            '            \n' +
            '            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"/>\n' +
            '\n' +
            '            {children}\n' +
            '        </div>\n' +
            '    )\n' +
            '}\n' +
            '\n' +
            'export default CircuitBoard;\n'
    },
]

export const MagneticFieldCodes = [
    {
        id: 'container',
        displayText: 'App.jsx',
        language: 'jsx',
        code: 'import React from \'react\';\n' +
            'import {IoChevronForward} from "react-icons/io5";\n' +
            'import MagneticField from "./MagneticField.jsx"\n' +
            '\n' +
            'const App = () => {\n' +
            '    return (\n' +
            '        <MagneticField>\n' +
            '            <div\n' +
            '                className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center max-w-[700px] mx-auto px-5 py-10 md:py-0 lg:lg:px-0 text-white">\n' +
            '                <button\n' +
            '                    className="py-1.5 pl-5 backdrop-blur-md pr-6 border-gray-600 rounded-full text-[0.9rem] border mb-4">\n' +
            '                    ✨ Introducing ZenUI v2.3\n' +
            '                </button>\n' +
            '\n' +
            '                <h1\n' +
            '                    className="text-[2rem] lg:text-[3rem] font-bold leading-[40px] lg:leading-[50px]">\n' +
            '                    Open-Source UI Components & Templates Library\n' +
            '                </h1>\n' +
            '\n' +
            '                <p\n' +
            '                    className="text-white/80 max-w-[700px] mt-3">\n' +
            '                    ZenUI Library is an Tailwind CSS components library for any needs. Comes with UI examples &\n' +
            '                    blocks,\n' +
            '                    templates, Icons, Color Palette and more.\n' +
            '                </p>\n' +
            '\n' +
            '                <div\n' +
            '                    className="flex items-center flex-col md:flex-row gap-3 justify-center 425px:gap-6 mt-10 md:mt-12">\n' +
            '                    <button\n' +
            '                        className="bg-[#0FABCA] pl-5 pr-4 border border-[#0FABCA] rounded-lg py-3 flex items-center gap-2 text-[1rem] group"\n' +
            '                    >\n' +
            '                        Browse Components\n' +
            '                        <IoChevronForward className="group-hover:ml-1 transition-all duration-200"/>\n' +
            '                    </button>\n' +
            '                    <button\n' +
            '                        className="border-2 border-[#0FABCA] pl-5 pr-4 rounded-lg py-3 flex items-center gap-2 text-[1rem] group">\n' +
            '                        Browse Templates\n' +
            '                        <IoChevronForward className="group-hover:ml-1 transition-all duration-200"/>\n' +
            '                    </button>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </MagneticField>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default App;\n'
    },
    {
        id: 'MagneticField_animation',
        displayText: 'MagneticField.jsx',
        language: 'jsx',
        code: 'import {useRef, useEffect, useState} from "react"\n' +
            '\n' +
            'const MagneticField = ({children}) => {\n' +
            '    const canvasRef = useRef(null)\n' +
            '    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})\n' +
            '    const animationRef = useRef(null)\n' +
            '    const devicePixelRatio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        const canvas = canvasRef.current\n' +
            '        const ctx = canvas.getContext("2d")\n' +
            '\n' +
            '        const handleResize = () => {\n' +
            '            const width = window.innerWidth\n' +
            '            const height = window.innerHeight\n' +
            '\n' +
            '            canvas.width = width * devicePixelRatio\n' +
            '            canvas.height = height * devicePixelRatio\n' +
            '            canvas.style.width = `${width}px`\n' +
            '            canvas.style.height = `${height}px`\n' +
            '\n' +
            '            ctx.setTransform(1, 0, 0, 1, 0, 0)\n' +
            '            ctx.scale(devicePixelRatio, devicePixelRatio)\n' +
            '        }\n' +
            '\n' +
            '        handleResize()\n' +
            '        window.addEventListener("resize", handleResize)\n' +
            '\n' +
            '        return () => {\n' +
            '            window.removeEventListener("resize", handleResize)\n' +
            '            if (animationRef.current) {\n' +
            '                cancelAnimationFrame(animationRef.current)\n' +
            '            }\n' +
            '        }\n' +
            '    }, [])\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        const handleMouseMove = (e) => {\n' +
            '            const rect = canvasRef.current.getBoundingClientRect()\n' +
            '            setMousePosition({\n' +
            '                x: e.clientX - rect.left,\n' +
            '                y: e.clientY - rect.top,\n' +
            '            })\n' +
            '        }\n' +
            '\n' +
            '        window.addEventListener("mousemove", handleMouseMove)\n' +
            '        return () => window.removeEventListener("mousemove", handleMouseMove)\n' +
            '    }, [])\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        const canvas = canvasRef.current\n' +
            '        const ctx = canvas.getContext("2d")\n' +
            '\n' +
            '        const drawMagneticField = () => {\n' +
            '            const width = canvas.width / devicePixelRatio\n' +
            '            const height = canvas.height / devicePixelRatio\n' +
            '\n' +
            '            ctx.clearRect(0, 0, width, height)\n' +
            '\n' +
            '            const lineSpacing = width < 768 ? 40 : 30\n' +
            '            const fieldStrength = 150\n' +
            '            const lineLength = 15\n' +
            '\n' +
            '            for (let x = 0; x < width; x += lineSpacing) {\n' +
            '                for (let y = 0; y < height; y += lineSpacing) {\n' +
            '                    const dx = x - mousePosition.x\n' +
            '                    const dy = y - mousePosition.y\n' +
            '                    const distance = Math.sqrt(dx * dx + dy * dy)\n' +
            '\n' +
            '                    if (distance < 30) continue\n' +
            '\n' +
            '                    let angle = Math.atan2(dy, dx)\n' +
            '                    angle += Math.sin(x / 100) * 0.2 + Math.cos(y / 100) * 0.2\n' +
            '\n' +
            '                    const strength = Math.min(1, fieldStrength / distance)\n' +
            '\n' +
            '                    const startX = x - Math.cos(angle) * lineLength * strength\n' +
            '                    const startY = y - Math.sin(angle) * lineLength * strength\n' +
            '                    const endX = x + Math.cos(angle) * lineLength * strength\n' +
            '                    const endY = y + Math.sin(angle) * lineLength * strength\n' +
            '\n' +
            '                    ctx.beginPath()\n' +
            '                    ctx.moveTo(startX, startY)\n' +
            '                    ctx.lineTo(endX, endY)\n' +
            '\n' +
            '                    const hue = ((angle * 180) / Math.PI + 180) % 360\n' +
            '                    const opacity = 0.2 + strength * 0.8\n' +
            '                    ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${opacity})`\n' +
            '                    ctx.lineWidth = strength * 2\n' +
            '                    ctx.stroke()\n' +
            '\n' +
            '                    ctx.beginPath()\n' +
            '                    ctx.arc(x, y, 1, 0, Math.PI * 2)\n' +
            '                    ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${opacity * 0.7})`\n' +
            '                    ctx.fill()\n' +
            '                }\n' +
            '            }\n' +
            '\n' +
            '            const gradient = ctx.createRadialGradient(\n' +
            '                mousePosition.x,\n' +
            '                mousePosition.y,\n' +
            '                0,\n' +
            '                mousePosition.x,\n' +
            '                mousePosition.y,\n' +
            '                50,\n' +
            '            )\n' +
            '            gradient.addColorStop(0, "rgba(33,33,33,0.2)")\n' +
            '            gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)")\n' +
            '\n' +
            '            ctx.beginPath()\n' +
            '            ctx.arc(mousePosition.x, mousePosition.y, 50, 0, Math.PI * 2)\n' +
            '            ctx.fillStyle = gradient\n' +
            '            ctx.fill()\n' +
            '\n' +
            '            animationRef.current = requestAnimationFrame(drawMagneticField)\n' +
            '        }\n' +
            '\n' +
            '        drawMagneticField()\n' +
            '\n' +
            '        return () => {\n' +
            '            if (animationRef.current) {\n' +
            '                cancelAnimationFrame(animationRef.current)\n' +
            '            }\n' +
            '        }\n' +
            '    }, [mousePosition])\n' +
            '\n' +
            '    return (\n' +
            '        <div\n' +
            '            className="relative w-full min-h-[500px] flex items-center justify-center flex-col overflow-hidden rounded-high bg-gray-900">\n' +
            '            \n' +
            '            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"/>\n' +
            '\n' +
            '            {children}\n' +
            '        </div>\n' +
            '    )\n' +
            '}\n' +
            '\n' +
            'export default MagneticField;\n'
    },
]

export const StringArtCodes = [
    {
        id: 'container',
        displayText: 'App.jsx',
        language: 'jsx',
        code: 'import React from \'react\';\n' +
            'import {IoChevronForward} from "react-icons/io5";\n' +
            'import StringArt from "./StringArt.jsx"\n' +
            '\n' +
            'const App = () => {\n' +
            '    return (\n' +
            '        <StringArt>\n' +
            '            <div\n' +
            '                className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center max-w-[700px] mx-auto px-5 py-10 md:py-0 lg:lg:px-0 text-white">\n' +
            '                <button\n' +
            '                    className="py-1.5 pl-5 backdrop-blur-md pr-6 border-gray-600 rounded-full text-[0.9rem] border mb-4">\n' +
            '                    ✨ Introducing ZenUI v2.3\n' +
            '                </button>\n' +
            '\n' +
            '                <h1\n' +
            '                    className="text-[2rem] lg:text-[3rem] font-bold leading-[40px] lg:leading-[50px]">\n' +
            '                    Open-Source UI Components & Templates Library\n' +
            '                </h1>\n' +
            '\n' +
            '                <p\n' +
            '                    className="text-white/80 max-w-[700px] mt-3">\n' +
            '                    ZenUI Library is an Tailwind CSS components library for any needs. Comes with UI examples &\n' +
            '                    blocks,\n' +
            '                    templates, Icons, Color Palette and more.\n' +
            '                </p>\n' +
            '\n' +
            '                <div\n' +
            '                    className="flex items-center flex-col md:flex-row gap-3 justify-center 425px:gap-6 mt-10 md:mt-12">\n' +
            '                    <button\n' +
            '                        className="bg-[#0FABCA] pl-5 pr-4 border border-[#0FABCA] rounded-lg py-3 flex items-center gap-2 text-[1rem] group"\n' +
            '                    >\n' +
            '                        Browse Components\n' +
            '                        <IoChevronForward className="group-hover:ml-1 transition-all duration-200"/>\n' +
            '                    </button>\n' +
            '                    <button\n' +
            '                        className="border-2 border-[#0FABCA] pl-5 pr-4 rounded-lg py-3 flex items-center gap-2 text-[1rem] group">\n' +
            '                        Browse Templates\n' +
            '                        <IoChevronForward className="group-hover:ml-1 transition-all duration-200"/>\n' +
            '                    </button>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </StringArt>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default App;\n'
    },
    {
        id: 'StringArt_animation',
        displayText: 'StringArt.jsx',
        language: 'jsx',
        code: 'import {useRef, useEffect, useState} from "react"\n' +
            '\n' +
            'const StringArt = ({children}) => {\n' +
            '    const canvasRef = useRef(null)\n' +
            '    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})\n' +
            '    const [dimensions, setDimensions] = useState({width: 0, height: 0})\n' +
            '    const anchorPointsRef = useRef([])\n' +
            '    const animationRef = useRef(null)\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        const canvas = canvasRef.current\n' +
            '        const ctx = canvas.getContext("2d")\n' +
            '\n' +
            '        const handleResize = () => {\n' +
            '            const dpr = window.devicePixelRatio || 1\n' +
            '            const width = window.innerWidth\n' +
            '            const height = window.innerHeight\n' +
            '\n' +
            '            canvas.width = width * dpr\n' +
            '            canvas.height = height * dpr\n' +
            '            canvas.style.width = `${width}px`\n' +
            '            canvas.style.height = `${height}px`\n' +
            '\n' +
            '            ctx.setTransform(1, 0, 0, 1, 0, 0)\n' +
            '            ctx.scale(dpr, dpr)\n' +
            '\n' +
            '            setDimensions({width, height})\n' +
            '            generateAnchorPoints(width, height)\n' +
            '        }\n' +
            '\n' +
            '        const generateAnchorPoints = (width, height) => {\n' +
            '            const points = []\n' +
            '            const pointCount = width < 768 ? 40 : 60\n' +
            '            const radius = Math.min(width, height) * 0.3\n' +
            '            const centerX = width / 2\n' +
            '            const centerY = height / 2\n' +
            '\n' +
            '            for (let i = 0; i < pointCount; i++) {\n' +
            '                const angle = (i / pointCount) * Math.PI * 2\n' +
            '                const x = centerX + Math.cos(angle) * radius\n' +
            '                const y = centerY + Math.sin(angle) * radius\n' +
            '                points.push({x, y})\n' +
            '            }\n' +
            '\n' +
            '            anchorPointsRef.current = points\n' +
            '        }\n' +
            '\n' +
            '        handleResize()\n' +
            '        window.addEventListener("resize", handleResize)\n' +
            '        return () => {\n' +
            '            window.removeEventListener("resize", handleResize)\n' +
            '            if (animationRef.current) cancelAnimationFrame(animationRef.current)\n' +
            '        }\n' +
            '    }, [])\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        const handleMouseMove = (e) => {\n' +
            '            const rect = canvasRef.current.getBoundingClientRect()\n' +
            '            setMousePosition({\n' +
            '                x: e.clientX - rect.left,\n' +
            '                y: e.clientY - rect.top,\n' +
            '            })\n' +
            '        }\n' +
            '\n' +
            '        window.addEventListener("mousemove", handleMouseMove)\n' +
            '        return () => window.removeEventListener("mousemove", handleMouseMove)\n' +
            '    }, [])\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        if (!dimensions.width) return\n' +
            '        const canvas = canvasRef.current\n' +
            '        const ctx = canvas.getContext("2d")\n' +
            '\n' +
            '        const animate = () => {\n' +
            '            ctx.clearRect(0, 0, dimensions.width, dimensions.height)\n' +
            '\n' +
            '            const anchorPoints = anchorPointsRef.current\n' +
            '\n' +
            '            ctx.fillStyle = "rgba(255, 255, 255, 0.5)"\n' +
            '            for (const point of anchorPoints) {\n' +
            '                ctx.beginPath()\n' +
            '                ctx.arc(point.x, point.y, 2.5, 0, Math.PI * 2)\n' +
            '                ctx.fill()\n' +
            '            }\n' +
            '\n' +
            '            for (const point of anchorPoints) {\n' +
            '                const dx = point.x - mousePosition.x\n' +
            '                const dy = point.y - mousePosition.y\n' +
            '                const distance = Math.sqrt(dx * dx + dy * dy)\n' +
            '                const angle = Math.atan2(dy, dx)\n' +
            '                const skipFactor = Math.abs(Math.sin(angle * 5)) < 0.3\n' +
            '                if (skipFactor) continue\n' +
            '\n' +
            '                const maxDistance = Math.max(dimensions.width, dimensions.height) * 0.7\n' +
            '                const opacity = 0.1 + 0.4 * (1 - Math.min(1, distance / maxDistance))\n' +
            '                const hue = ((angle * 180) / Math.PI + 180) % 360\n' +
            '\n' +
            '                ctx.beginPath()\n' +
            '                ctx.moveTo(point.x, point.y)\n' +
            '                ctx.lineTo(mousePosition.x, mousePosition.y)\n' +
            '                ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${opacity})`\n' +
            '                ctx.lineWidth = 0.6\n' +
            '                ctx.stroke()\n' +
            '            }\n' +
            '\n' +
            '            const gradient = ctx.createRadialGradient(\n' +
            '                mousePosition.x,\n' +
            '                mousePosition.y,\n' +
            '                0,\n' +
            '                mousePosition.x,\n' +
            '                mousePosition.y,\n' +
            '                30\n' +
            '            )\n' +
            '            gradient.addColorStop(0, "rgba(33,33,33,0.2)")\n' +
            '            gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)")\n' +
            '\n' +
            '            ctx.fillStyle = gradient\n' +
            '            ctx.beginPath()\n' +
            '            ctx.arc(mousePosition.x, mousePosition.y, 30, 0, Math.PI * 2)\n' +
            '            ctx.fill()\n' +
            '\n' +
            '            animationRef.current = requestAnimationFrame(animate)\n' +
            '        }\n' +
            '\n' +
            '        animate()\n' +
            '        return () => {\n' +
            '            if (animationRef.current) cancelAnimationFrame(animationRef.current)\n' +
            '        }\n' +
            '    }, [dimensions, mousePosition])\n' +
            '\n' +
            '    return (\n' +
            '        <div\n' +
            '            className="relative w-full min-h-[500px] flex items-center justify-center flex-col overflow-hidden rounded-high bg-gray-900">\n' +
            '            \n' +
            '            <canvas ref={canvasRef}\n' +
            '                    className="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] w-[50%] h-[50%]"/>\n' +
            '\n' +
            '            {children}\n' +
            '        </div>\n' +
            '    )\n' +
            '}\n' +
            '\n' +
            'export default StringArt;\n'
    },
]

export const StarFieldWrapCodes = [
    {
        id: 'container',
        displayText: 'App.jsx',
        language: 'jsx',
        code: 'import React from \'react\';\n' +
            'import {IoChevronForward} from "react-icons/io5";\n' +
            'import StarfieldWarp from "./StarfieldWarp.jsx"\n' +
            '\n' +
            'const App = () => {\n' +
            '    return (\n' +
            '        <StarfieldWarp>\n' +
            '            <div\n' +
            '                className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center max-w-[700px] mx-auto px-5 py-10 md:py-0 lg:lg:px-0 text-white">\n' +
            '                <button\n' +
            '                    className="py-1.5 pl-5 backdrop-blur-md pr-6 border-gray-600 rounded-full text-[0.9rem] border mb-4">\n' +
            '                    ✨ Introducing ZenUI v2.3\n' +
            '                </button>\n' +
            '\n' +
            '                <h1\n' +
            '                    className="text-[2rem] lg:text-[3rem] font-bold leading-[40px] lg:leading-[50px]">\n' +
            '                    Open-Source UI Components & Templates Library\n' +
            '                </h1>\n' +
            '\n' +
            '                <p\n' +
            '                    className="text-white/80 max-w-[700px] mt-3">\n' +
            '                    ZenUI Library is an Tailwind CSS components library for any needs. Comes with UI examples &\n' +
            '                    blocks,\n' +
            '                    templates, Icons, Color Palette and more.\n' +
            '                </p>\n' +
            '\n' +
            '                <div\n' +
            '                    className="flex items-center flex-col md:flex-row gap-3 justify-center 425px:gap-6 mt-10 md:mt-12">\n' +
            '                    <button\n' +
            '                        className="bg-[#0FABCA] pl-5 pr-4 border border-[#0FABCA] rounded-lg py-3 flex items-center gap-2 text-[1rem] group"\n' +
            '                    >\n' +
            '                        Browse Components\n' +
            '                        <IoChevronForward className="group-hover:ml-1 transition-all duration-200"/>\n' +
            '                    </button>\n' +
            '                    <button\n' +
            '                        className="border-2 border-[#0FABCA] pl-5 pr-4 rounded-lg py-3 flex items-center gap-2 text-[1rem] group">\n' +
            '                        Browse Templates\n' +
            '                        <IoChevronForward className="group-hover:ml-1 transition-all duration-200"/>\n' +
            '                    </button>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </StarfieldWarp>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default App;\n'
    },
    {
        id: 'StarfieldWarp_animation',
        displayText: 'StarfieldWarp.jsx',
        language: 'jsx',
        code: 'import {useRef, useEffect, useState} from "react";\n' +
            '\n' +
            'const StarfieldWarp = ({children}) => {\n' +
            '    const wrapperRef = useRef(null);\n' +
            '    const canvasRef = useRef(null);\n' +
            '    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});\n' +
            '    const [dimensions, setDimensions] = useState({width: 0, height: 0});\n' +
            '    const starsRef = useRef([]);\n' +
            '    const warpSpeedRef = useRef(0);\n' +
            '    const animationRef = useRef(null);\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        const canvas = canvasRef.current;\n' +
            '        const ctx = canvas.getContext("2d");\n' +
            '\n' +
            '        const handleResize = () => {\n' +
            '            if (!wrapperRef.current) return;\n' +
            '\n' +
            '            const rect = wrapperRef.current.getBoundingClientRect();\n' +
            '            const {width, height} = rect;\n' +
            '            const devicePixelRatio = window.devicePixelRatio || 1;\n' +
            '\n' +
            '            canvas.width = width * devicePixelRatio;\n' +
            '            canvas.height = height * devicePixelRatio;\n' +
            '\n' +
            '            canvas.style.width = `${width}px`;\n' +
            '            canvas.style.height = `${height}px`;\n' +
            '\n' +
            '            ctx.setTransform(1, 0, 0, 1, 0, 0);\n' +
            '            ctx.scale(devicePixelRatio, devicePixelRatio);\n' +
            '\n' +
            '            setDimensions({width, height});\n' +
            '\n' +
            '            initStars(width, height);\n' +
            '        };\n' +
            '\n' +
            '        const initStars = (width, height) => {\n' +
            '            const starCount = width < 768 ? 300 : 500;\n' +
            '            const stars = [];\n' +
            '\n' +
            '            for (let i = 0; i < starCount; i++) {\n' +
            '                stars.push({\n' +
            '                    x: Math.random() * width - width / 2,\n' +
            '                    y: Math.random() * height - height / 2,\n' +
            '                    z: Math.random() * 1000,\n' +
            '                    size: Math.random() * 2 + 1,\n' +
            '                    color: `hsl(${Math.random() * 60 + 200}, 100%, ${Math.random() * 30 + 70}%)`,\n' +
            '                });\n' +
            '            }\n' +
            '\n' +
            '            starsRef.current = stars;\n' +
            '            warpSpeedRef.current = 0;\n' +
            '        };\n' +
            '\n' +
            '        handleResize();\n' +
            '        window.addEventListener("resize", handleResize);\n' +
            '\n' +
            '        return () => {\n' +
            '            window.removeEventListener("resize", handleResize);\n' +
            '            if (animationRef.current) {\n' +
            '                cancelAnimationFrame(animationRef.current);\n' +
            '            }\n' +
            '        };\n' +
            '    }, []);\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        const handleMouseMove = (e) => {\n' +
            '            if (!wrapperRef.current) return;\n' +
            '\n' +
            '            const rect = wrapperRef.current.getBoundingClientRect();\n' +
            '            setMousePosition({\n' +
            '                x: e.clientX - rect.left,\n' +
            '                y: e.clientY - rect.top,\n' +
            '            });\n' +
            '        };\n' +
            '\n' +
            '        window.addEventListener("mousemove", handleMouseMove);\n' +
            '        return () => window.removeEventListener("mousemove", handleMouseMove);\n' +
            '    }, []);\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        if (!dimensions.width || !dimensions.height) return;\n' +
            '\n' +
            '        const canvas = canvasRef.current;\n' +
            '        const ctx = canvas.getContext("2d");\n' +
            '\n' +
            '        const animate = () => {\n' +
            '            ctx.fillStyle = "rgba(10, 10, 20, 0.2)";\n' +
            '            ctx.fillRect(0, 0, dimensions.width, dimensions.height);\n' +
            '\n' +
            '            const stars = starsRef.current;\n' +
            '            const centerX = dimensions.width / 2;\n' +
            '            const centerY = dimensions.height / 2;\n' +
            '\n' +
            '            const dx = mousePosition.x - centerX;\n' +
            '            const dy = mousePosition.y - centerY;\n' +
            '            const distance = Math.sqrt(dx * dx + dy * dy);\n' +
            '            const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);\n' +
            '            const targetWarpSpeed = Math.min(1, distance / maxDistance) * 15;\n' +
            '\n' +
            '            warpSpeedRef.current += (targetWarpSpeed - warpSpeedRef.current) * 0.05;\n' +
            '\n' +
            '            for (const star of stars) {\n' +
            '                star.z -= warpSpeedRef.current;\n' +
            '\n' +
            '                if (star.z <= 0 || star.z > 1000) {\n' +
            '                    star.x = Math.random() * dimensions.width - centerX;\n' +
            '                    star.y = Math.random() * dimensions.height - centerY;\n' +
            '                    star.z = 1000;\n' +
            '                    star.size = Math.random() * 2 + 1;\n' +
            '                }\n' +
            '\n' +
            '                const projectedX = (star.x / star.z) * 500 + centerX;\n' +
            '                const projectedY = (star.y / star.z) * 500 + centerY;\n' +
            '                const projectedSize = star.size * (1 - star.z / 1000);\n' +
            '\n' +
            '                if (\n' +
            '                    projectedX < -10 ||\n' +
            '                    projectedX > dimensions.width + 10 ||\n' +
            '                    projectedY < -10 ||\n' +
            '                    projectedY > dimensions.height + 10\n' +
            '                )\n' +
            '                    continue;\n' +
            '\n' +
            '                if (warpSpeedRef.current > 5 && star.z < 500) {\n' +
            '                    const prevX = (star.x / (star.z + warpSpeedRef.current * 2)) * 500 + centerX;\n' +
            '                    const prevY = (star.y / (star.z + warpSpeedRef.current * 2)) * 500 + centerY;\n' +
            '\n' +
            '                    ctx.beginPath();\n' +
            '                    ctx.moveTo(projectedX, projectedY);\n' +
            '                    ctx.lineTo(prevX, prevY);\n' +
            '                    ctx.strokeStyle = star.color;\n' +
            '                    ctx.lineWidth = projectedSize;\n' +
            '                    ctx.stroke();\n' +
            '                } else {\n' +
            '                    ctx.beginPath();\n' +
            '                    ctx.arc(projectedX, projectedY, projectedSize, 0, Math.PI * 2);\n' +
            '                    ctx.fillStyle = star.color;\n' +
            '                    ctx.fill();\n' +
            '                }\n' +
            '            }\n' +
            '\n' +
            '            if (warpSpeedRef.current > 1) {\n' +
            '                const gradient = ctx.createRadialGradient(\n' +
            '                    centerX,\n' +
            '                    centerY,\n' +
            '                    0,\n' +
            '                    centerX,\n' +
            '                    centerY,\n' +
            '                    100 * warpSpeedRef.current\n' +
            '                );\n' +
            '                gradient.addColorStop(0, `rgba(100, 200, 255, ${warpSpeedRef.current * 0.05})`);\n' +
            '                gradient.addColorStop(1, "rgba(100, 200, 255, 0)");\n' +
            '\n' +
            '                ctx.fillStyle = gradient;\n' +
            '                ctx.beginPath();\n' +
            '                ctx.arc(centerX, centerY, 100 * warpSpeedRef.current, 0, Math.PI * 2);\n' +
            '                ctx.fill();\n' +
            '            }\n' +
            '\n' +
            '            animationRef.current = requestAnimationFrame(animate);\n' +
            '        };\n' +
            '\n' +
            '        animate();\n' +
            '\n' +
            '        return () => {\n' +
            '            if (animationRef.current) {\n' +
            '                cancelAnimationFrame(animationRef.current);\n' +
            '            }\n' +
            '        };\n' +
            '    }, [dimensions, mousePosition]);\n' +
            '\n' +
            '    return (\n' +
            '        <div\n' +
            '            ref={wrapperRef}\n' +
            '            className="relative w-full min-h-[500px] flex items-center justify-center flex-col overflow-hidden rounded-high bg-gray-900"\n' +
            '        >\n' +
            '            \n' +
            '            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"/>\n' +
            '\n' +
            '            {children}\n' +
            '        </div>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default StarfieldWarp;\n'
    },
]
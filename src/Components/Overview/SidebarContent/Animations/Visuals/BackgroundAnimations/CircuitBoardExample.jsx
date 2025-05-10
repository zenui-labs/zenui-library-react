import {useRef, useEffect, useState} from "react"

const CircuitBoardExample = () => {
    const canvasRef = useRef(null)
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
    const [dimensions, setDimensions] = useState({width: 0, height: 0})
    const circuitNodesRef = useRef([])
    const circuitPathsRef = useRef([])
    const animationRef = useRef(null)

    // Initialize canvas and generate nodes/paths
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const handleResize = () => {
            const {innerWidth, innerHeight, devicePixelRatio = 1} = window

            canvas.width = innerWidth * devicePixelRatio
            canvas.height = innerHeight * devicePixelRatio
            canvas.style.width = `${innerWidth}px`
            canvas.style.height = `${innerHeight}px`

            ctx.setTransform(1, 0, 0, 1, 0, 0) // Reset before scale
            ctx.scale(devicePixelRatio, devicePixelRatio)

            setDimensions({width: innerWidth, height: innerHeight})
            generateCircuit(innerWidth, innerHeight)
        }

        const generateCircuit = (width, height) => {
            const nodeCount = width < 768 ? 30 : 50
            const nodes = []
            const gridSize = Math.sqrt(nodeCount)
            const cellWidth = width / gridSize
            const cellHeight = height / gridSize

            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    const x = i * cellWidth + Math.random() * (cellWidth * 0.6) + cellWidth * 0.2
                    const y = j * cellHeight + Math.random() * (cellHeight * 0.6) + cellHeight * 0.2

                    nodes.push({
                        x,
                        y,
                        size: Math.random() * 3 + 2,
                        isActive: false,
                        activationLevel: 0,
                    })
                }
            }

            const paths = []
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i]
                const connections = findClosestNodes(node, nodes, 2 + Math.floor(Math.random() * 3))
                for (const target of connections) {
                    const exists = paths.some(
                        (p) => (p.from === i && p.to === target) || (p.from === target && p.to === i)
                    )
                    if (!exists && i !== target) {
                        paths.push({
                            from: i,
                            to: target,
                            isActive: false,
                            activationLevel: 0,
                        })
                    }
                }
            }

            circuitNodesRef.current = nodes
            circuitPathsRef.current = paths
        }

        const findClosestNodes = (node, nodes, count) => {
            const distances = nodes.map((n, index) => {
                const dx = node.x - n.x
                const dy = node.y - n.y
                return {index, distance: Math.sqrt(dx * dx + dy * dy)}
            })

            return distances
                .filter((d) => d.distance > 0)
                .sort((a, b) => a.distance - b.distance)
                .slice(0, count)
                .map((d) => d.index)
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [])

    // Track mouse with canvas-relative coordinates
    useEffect(() => {
        const handleMouseMove = (e) => {
            const rect = canvasRef.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            setMousePosition({x, y})
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    // Animate nodes + paths
    useEffect(() => {
        if (!dimensions.width) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const animate = () => {
            ctx.clearRect(0, 0, dimensions.width, dimensions.height)

            const nodes = circuitNodesRef.current
            const paths = circuitPathsRef.current

            // Activate nodes near mouse
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i]
                const dx = node.x - mousePosition.x
                const dy = node.y - mousePosition.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < 150) {
                    node.isActive = true
                    node.activationLevel = Math.min(1, node.activationLevel + 0.05)
                } else {
                    node.activationLevel = Math.max(0, node.activationLevel - 0.02)
                    if (node.activationLevel <= 0) node.isActive = false
                }
            }

            // Update path activation
            for (const path of paths) {
                const fromNode = nodes[path.from]
                const toNode = nodes[path.to]

                if (fromNode.isActive || toNode.isActive) {
                    path.isActive = true
                    path.activationLevel = Math.min(1, path.activationLevel + 0.03)
                } else {
                    path.activationLevel = Math.max(0, path.activationLevel - 0.01)
                    if (path.activationLevel <= 0) path.isActive = false
                }
            }

            // Draw inactive paths
            ctx.strokeStyle = "rgba(50, 50, 70, 0.3)"
            ctx.lineWidth = 1
            for (const path of paths) {
                if (!path.isActive) {
                    const fromNode = nodes[path.from]
                    const toNode = nodes[path.to]
                    ctx.beginPath()
                    ctx.moveTo(fromNode.x, fromNode.y)
                    ctx.lineTo(toNode.x, toNode.y)
                    ctx.stroke()
                }
            }

            // Draw active paths
            for (const path of paths) {
                if (path.isActive && path.activationLevel > 0) {
                    const fromNode = nodes[path.from]
                    const toNode = nodes[path.to]

                    // Glow line
                    ctx.strokeStyle = `rgba(0, 200, 255, ${path.activationLevel * 0.2})`
                    ctx.lineWidth = 3
                    ctx.beginPath()
                    ctx.moveTo(fromNode.x, fromNode.y)
                    ctx.lineTo(toNode.x, toNode.y)
                    ctx.stroke()

                    // Bright line
                    ctx.strokeStyle = `rgba(100, 220, 255, ${path.activationLevel})`
                    ctx.lineWidth = 1
                    ctx.beginPath()
                    ctx.moveTo(fromNode.x, fromNode.y)
                    ctx.lineTo(toNode.x, toNode.y)
                    ctx.stroke()
                }
            }

            // Draw nodes
            for (const node of nodes) {
                if (!node.isActive) {
                    ctx.fillStyle = "rgba(100, 100, 120, 0.5)"
                    ctx.beginPath()
                    ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
                    ctx.fill()
                } else {
                    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 3)
                    gradient.addColorStop(0, `rgba(0, 200, 255, ${node.activationLevel})`)
                    gradient.addColorStop(1, "rgba(0, 200, 255, 0)")
                    ctx.fillStyle = gradient
                    ctx.beginPath()
                    ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2)
                    ctx.fill()

                    ctx.fillStyle = `rgba(100, 220, 255, ${node.activationLevel})`
                    ctx.beginPath()
                    ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
                    ctx.fill()
                }
            }

            // Draw glowing mouse aura
            const gradient = ctx.createRadialGradient(
                mousePosition.x,
                mousePosition.y,
                0,
                mousePosition.x,
                mousePosition.y,
                150
            )
            gradient.addColorStop(0, "rgba(0, 200, 255, 0.1)")
            gradient.addColorStop(1, "rgba(0, 200, 255, 0)")
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(mousePosition.x, mousePosition.y, 150, 0, Math.PI * 2)
            ctx.fill()

            animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [dimensions, mousePosition])

    return (
        <div className="relative w-full h-[500px] overflow-hidden rounded-high bg-gray-900">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"/>

            <div
                className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center pointer-events-none">
                <h1 className="text-4xl font-bold text-white md:text-6xl">Circuit Board</h1>
                <p className="mt-4 text-lg text-white/70">Move your mouse to activate the circuits</p>
            </div>
        </div>
    )
}

export default CircuitBoardExample

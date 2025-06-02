import {useState, useEffect, useRef} from "react"
import {IoChevronForward} from "react-icons/io5";

const GridDistortionExample = () => {
    const canvasRef = useRef(null)
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
    const [dimensions, setDimensions] = useState({width: 0, height: 0})
    const animationRef = useRef(null)

    // Set up canvas and handle resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current
                const {width, height} = canvas.getBoundingClientRect()

                // Set canvas dimensions with device pixel ratio for sharp rendering
                const dpr = window.devicePixelRatio || 1
                canvas.width = width * dpr
                canvas.height = height * dpr

                const ctx = canvas.getContext("2d")
                ctx.scale(dpr, dpr)

                setDimensions({width, height})
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [])

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (canvasRef.current) {
                const {left, top} = canvasRef.current.getBoundingClientRect()
                setMousePosition({
                    x: e.clientX - left,
                    y: e.clientY - top,
                })
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    // Draw grid with distortion
    useEffect(() => {
        if (!canvasRef.current || dimensions.width === 0) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const drawGrid = () => {
            const {width, height} = dimensions

            // Clear canvas
            ctx.clearRect(0, 0, width, height)

            // Grid settings
            const cellSize = 30
            const rows = Math.ceil(height / cellSize) + 1
            const cols = Math.ceil(width / cellSize) + 1

            // Mouse influence settings
            const maxDistance = 200
            const maxDisplacement = 20

            // Draw grid
            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
            ctx.lineWidth = 0.5

            // Create grid points with distortion
            const points = []

            for (let y = 0; y < rows; y++) {
                const row = []
                for (let x = 0; x < cols; x++) {
                    const baseX = x * cellSize
                    const baseY = y * cellSize

                    // Calculate distance from mouse
                    const dx = baseX - mousePosition.x
                    const dy = baseY - mousePosition.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    // Apply distortion based on mouse position
                    let distortionX = 0
                    let distortionY = 0

                    if (distance < maxDistance) {
                        const force = (1 - distance / maxDistance) * maxDisplacement
                        distortionX = (dx / distance) * force || 0
                        distortionY = (dy / distance) * force || 0
                    }

                    row.push({
                        x: baseX + distortionX,
                        y: baseY + distortionY,
                    })
                }
                points.push(row)
            }

            // Draw horizontal lines
            for (let y = 0; y < rows; y++) {
                ctx.beginPath()
                for (let x = 0; x < cols; x++) {
                    const point = points[y][x]
                    if (x === 0) {
                        ctx.moveTo(point.x, point.y)
                    } else {
                        ctx.lineTo(point.x, point.y)
                    }
                }
                ctx.stroke()
            }

            // Draw vertical lines
            for (let x = 0; x < cols; x++) {
                ctx.beginPath()
                for (let y = 0; y < rows; y++) {
                    const point = points[y][x]
                    if (y === 0) {
                        ctx.moveTo(point.x, point.y)
                    } else {
                        ctx.lineTo(point.x, point.y)
                    }
                }
                ctx.stroke()
            }

            // Draw intersection points
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)"
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const point = points[y][x]
                    ctx.beginPath()
                    ctx.arc(point.x, point.y, 1, 0, Math.PI * 2)
                    ctx.fill()
                }
            }

            // Draw mouse position with glow
            ctx.beginPath()
            ctx.arc(mousePosition.x, mousePosition.y, 8, 0, Math.PI * 2)

            // Create radial gradient for glow effect
            const gradient = ctx.createRadialGradient(
                mousePosition.x,
                mousePosition.y,
                0,
                mousePosition.x,
                mousePosition.y,
                30,
            )
            gradient.addColorStop(0, "rgba(100, 200, 255, 0.8)")
            gradient.addColorStop(1, "rgba(100, 200, 255, 0)")

            ctx.fillStyle = gradient
            ctx.fill()

            animationRef.current = requestAnimationFrame(drawGrid)
        }

        drawGrid()

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [dimensions, mousePosition])

    return (
        <div
            className="relative w-full min-h-[500px] flex items-center justify-center flex-col overflow-hidden rounded-high bg-gray-900">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"/>

            <div
                className="z-10 flex flex-col items-center justify-center w-full h-full text-center max-w-[700px] mx-auto px-5 py-10 640px:py-0 1024px:1024px:px-0 text-white">
                <button
                    className='py-1.5 pl-5 backdrop-blur-md pr-6 border-gray-600 rounded-full text-[0.9rem] border mb-4'>
                    ✨ Introducing ZenUI v2.3
                </button>

                <h1
                    className="text-[2rem] 1024px:text-[3rem] font-bold leading-[40px] 1024px:leading-[50px]">
                    Open-Source UI Components & Templates Library
                </h1>

                <p
                    className="text-white/80 max-w-[700px] mt-3">
                    ZenUI Library is an Tailwind CSS components library for any needs. Comes with UI examples &
                    blocks,
                    templates, Icons, Color Palette and more.
                </p>

                <div
                    className="flex items-center flex-col 640px:flex-row gap-3 justify-center 425px:gap-6 mt-10 640px:mt-12">
                    <button
                        className='bg-brandColor pl-5 pr-4 border border-brandColor rounded-lg py-3 flex items-center gap-2 text-[1rem] group'
                    >
                        Browse Components
                        <IoChevronForward className='group-hover:ml-1 transition-all duration-200'/>
                    </button>
                    <button
                        className='border-2 border-brandColor pl-5 pr-4 rounded-lg py-3 flex items-center gap-2 text-[1rem] group'>
                        Browse Templates
                        <IoChevronForward className='group-hover:ml-1 transition-all duration-200'/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GridDistortionExample

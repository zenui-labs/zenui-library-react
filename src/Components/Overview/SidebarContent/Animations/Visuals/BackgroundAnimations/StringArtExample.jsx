import {useRef, useEffect, useState} from "react"
import {IoChevronForward} from "react-icons/io5";

const StringArtExample = () => {
    const canvasRef = useRef(null)
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
    const [dimensions, setDimensions] = useState({width: 0, height: 0})
    const anchorPointsRef = useRef([])
    const animationRef = useRef(null)

    // Setup canvas and points
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1
            const width = window.innerWidth
            const height = window.innerHeight

            canvas.width = width * dpr
            canvas.height = height * dpr
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`

            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.scale(dpr, dpr)

            setDimensions({width, height})
            generateAnchorPoints(width, height)
        }

        const generateAnchorPoints = (width, height) => {
            const points = []
            const pointCount = width < 768 ? 40 : 60
            const radius = Math.min(width, height) * 0.3
            const centerX = width / 2
            const centerY = height / 2

            for (let i = 0; i < pointCount; i++) {
                const angle = (i / pointCount) * Math.PI * 2
                const x = centerX + Math.cos(angle) * radius
                const y = centerY + Math.sin(angle) * radius
                points.push({x, y})
            }

            anchorPointsRef.current = points
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
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    // Draw animation
    useEffect(() => {
        if (!dimensions.width) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const animate = () => {
            ctx.clearRect(0, 0, dimensions.width, dimensions.height)

            const anchorPoints = anchorPointsRef.current

            // Draw anchor points
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
            for (const point of anchorPoints) {
                ctx.beginPath()
                ctx.arc(point.x, point.y, 2.5, 0, Math.PI * 2)
                ctx.fill()
            }

            // Draw strings to mouse
            for (const point of anchorPoints) {
                const dx = point.x - mousePosition.x
                const dy = point.y - mousePosition.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const angle = Math.atan2(dy, dx)
                const skipFactor = Math.abs(Math.sin(angle * 5)) < 0.3
                if (skipFactor) continue

                const maxDistance = Math.max(dimensions.width, dimensions.height) * 0.7
                const opacity = 0.1 + 0.4 * (1 - Math.min(1, distance / maxDistance))
                const hue = ((angle * 180) / Math.PI + 180) % 360

                ctx.beginPath()
                ctx.moveTo(point.x, point.y)
                ctx.lineTo(mousePosition.x, mousePosition.y)
                ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${opacity})`
                ctx.lineWidth = 0.6
                ctx.stroke()
            }

            // Mouse glow
            const gradient = ctx.createRadialGradient(
                mousePosition.x,
                mousePosition.y,
                0,
                mousePosition.x,
                mousePosition.y,
                30
            )
            gradient.addColorStop(0, "rgba(33,33,33,0.2)")
            gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)")

            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(mousePosition.x, mousePosition.y, 30, 0, Math.PI * 2)
            ctx.fill()

            animationRef.current = requestAnimationFrame(animate)
        }

        animate()
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [dimensions, mousePosition])

    return (
        <div
            className="relative w-full min-h-[500px] flex items-center justify-center flex-col overflow-hidden rounded-high bg-gray-900">
            <canvas ref={canvasRef}
                    className="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] w-[50%] h-[50%]"/>
            <div
                className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center pointer-events-none max-w-[700px] mx-auto text-white">
                <button
                    className='py-1.5 pl-5 backdrop-blur-md pr-6 border-gray-600 rounded-full text-[0.9rem] border mb-4'>
                    ✨ Introducing ZenUI v2.3
                </button>

                <h1
                    className="text-[3rem] font-bold leading-[50px]">
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

export default StringArtExample

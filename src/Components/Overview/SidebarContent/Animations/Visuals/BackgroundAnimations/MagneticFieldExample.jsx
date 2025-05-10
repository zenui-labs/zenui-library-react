import {useRef, useEffect, useState} from "react"

const MagneticFieldExample = () => {
    const canvasRef = useRef(null)
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
    const animationRef = useRef(null)
    const devicePixelRatio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const handleResize = () => {
            const width = window.innerWidth
            const height = window.innerHeight

            canvas.width = width * devicePixelRatio
            canvas.height = height * devicePixelRatio
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`

            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.scale(devicePixelRatio, devicePixelRatio)
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

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const drawMagneticField = () => {
            const width = canvas.width / devicePixelRatio
            const height = canvas.height / devicePixelRatio

            ctx.clearRect(0, 0, width, height)

            const lineSpacing = width < 768 ? 40 : 30
            const fieldStrength = 150
            const lineLength = 15

            for (let x = 0; x < width; x += lineSpacing) {
                for (let y = 0; y < height; y += lineSpacing) {
                    const dx = x - mousePosition.x
                    const dy = y - mousePosition.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 30) continue

                    let angle = Math.atan2(dy, dx)
                    angle += Math.sin(x / 100) * 0.2 + Math.cos(y / 100) * 0.2

                    const strength = Math.min(1, fieldStrength / distance)

                    const startX = x - Math.cos(angle) * lineLength * strength
                    const startY = y - Math.sin(angle) * lineLength * strength
                    const endX = x + Math.cos(angle) * lineLength * strength
                    const endY = y + Math.sin(angle) * lineLength * strength

                    ctx.beginPath()
                    ctx.moveTo(startX, startY)
                    ctx.lineTo(endX, endY)

                    const hue = ((angle * 180) / Math.PI + 180) % 360
                    const opacity = 0.2 + strength * 0.8
                    ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${opacity})`
                    ctx.lineWidth = strength * 2
                    ctx.stroke()

                    ctx.beginPath()
                    ctx.arc(x, y, 1, 0, Math.PI * 2)
                    ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${opacity * 0.7})`
                    ctx.fill()
                }
            }

            const gradient = ctx.createRadialGradient(
                mousePosition.x,
                mousePosition.y,
                0,
                mousePosition.x,
                mousePosition.y,
                50,
            )
            gradient.addColorStop(0, "rgba(33,33,33,0.2)")
            gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)")

            ctx.beginPath()
            ctx.arc(mousePosition.x, mousePosition.y, 50, 0, Math.PI * 2)
            ctx.fillStyle = gradient
            ctx.fill()

            animationRef.current = requestAnimationFrame(drawMagneticField)
        }

        drawMagneticField()

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [mousePosition])

    return (
        <div className="relative w-full h-[500px] overflow-hidden rounded-high bg-gray-900">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"/>
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center">
                <h1 className="text-4xl font-bold text-white md:text-6xl">Magnetic Field</h1>
                <p className="mt-4 text-lg text-white/70">Move your mouse to distort the field lines</p>
            </div>
        </div>
    )
}

export default MagneticFieldExample

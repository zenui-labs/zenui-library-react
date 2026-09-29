import {useEffect, useRef} from "react";
import type {ReactNode} from "react";

interface Point {
    x: number;
    y: number;
}

export interface StringArtProps {
    /** Content shown above the strings, such as a hero message. */
    children?: ReactNode;
    /** Number of pins around the ring. Defaults to 40 on sections narrower than 768px and 60 otherwise. */
    pointCount?: number;
    /** Ring radius as a fraction of the section's shorter side. */
    radius?: number;
    /** Canvas color for the pins. */
    pinColor?: string;
    className?: string;
}

// Pins sit on a ring and colored threads run from them to the pointer.
export const StringArt = ({
    children,
    pointCount,
    radius = 0.3,
    pinColor = "rgba(255, 255, 255, 0.5)",
    className = "",
}: StringArtProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Kept in a ref so pointer moves do not re-render the component.
    const pointerRef = useRef<Point>({x: 0, y: 0});

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const canvas = canvasRef.current;
        if (!wrapper || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let frame = 0;
        let anchorPoints: Point[] = [];

        const createAnchorPoints = () => {
            const count = pointCount ?? (width < 768 ? 40 : 60);
            const ringRadius = Math.min(width, height) * radius;
            anchorPoints = Array.from({length: count}, (_, i) => {
                const angle = (i / count) * Math.PI * 2;
                return {x: width / 2 + Math.cos(angle) * ringRadius, y: height / 2 + Math.sin(angle) * ringRadius};
            });
        };

        const resize = () => {
            const rect = wrapper.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            width = rect.width;
            height = rect.height;
            createAnchorPoints();
        };

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            pointerRef.current = {x: event.clientX - rect.left, y: event.clientY - rect.top};
        };

        const animate = () => {
            frame = requestAnimationFrame(animate);
            if (!width) return;

            const pointer = pointerRef.current;
            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = pinColor;
            for (const point of anchorPoints) {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 2.5, 0, Math.PI * 2);
                ctx.fill();
            }

            const maxDistance = Math.max(width, height) * 0.7;
            for (const point of anchorPoints) {
                const dx = point.x - pointer.x;
                const dy = point.y - pointer.y;
                const angle = Math.atan2(dy, dx);
                // Skipping some angles leaves gaps that form the petal pattern.
                if (Math.abs(Math.sin(angle * 5)) < 0.3) continue;

                const distance = Math.sqrt(dx * dx + dy * dy);
                const opacity = 0.1 + 0.4 * (1 - Math.min(1, distance / maxDistance));
                const hue = ((angle * 180) / Math.PI + 180) % 360;

                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(pointer.x, pointer.y);
                ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${opacity})`;
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }

            const gradient = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 30);
            gradient.addColorStop(0, "rgba(33, 33, 33, 0.2)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(pointer.x, pointer.y, 30, 0, Math.PI * 2);
            ctx.fill();
        };

        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(wrapper);
        window.addEventListener("mousemove", handleMouseMove);
        animate();

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(frame);
        };
    }, [pointCount, radius, pinColor]);

    return (
        <div
            ref={wrapperRef}
            className={`relative isolate flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-gray-900 ${className}`}
        >
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full"/>
            {children}
        </div>
    );
};

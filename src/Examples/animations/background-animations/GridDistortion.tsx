import {useEffect, useRef} from "react";
import type {ReactNode} from "react";

interface GridPoint {
    x: number;
    y: number;
}

export interface GridDistortionProps {
    /** Content shown above the grid, such as a hero message. */
    children?: ReactNode;
    /** Distance between grid lines in px. */
    cellSize?: number;
    /** How far from the pointer, in px, the grid still bends. */
    radius?: number;
    /** Largest distance in px a grid point is pushed away from the pointer. */
    strength?: number;
    /** Canvas color for the grid lines. */
    lineColor?: string;
    /** Canvas color for the dots where lines cross. */
    dotColor?: string;
    /** Comma separated red, green and blue values for the glow under the pointer, for example "100, 200, 255". */
    glowColor?: string;
    className?: string;
}

// A grid drawn on a canvas that bends away from the pointer.
export const GridDistortion = ({
    children,
    cellSize = 30,
    radius = 200,
    strength = 20,
    lineColor = "rgba(255, 255, 255, 0.2)",
    dotColor = "rgba(255, 255, 255, 0.4)",
    glowColor = "100, 200, 255",
    className = "",
}: GridDistortionProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Kept in a ref so pointer moves do not re-render the component.
    const pointerRef = useRef<GridPoint>({x: 0, y: 0});

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const canvas = canvasRef.current;
        if (!wrapper || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let frame = 0;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            width = rect.width;
            height = rect.height;
        };

        const handleMouseMove = (event: MouseEvent) => {
            const {left, top} = canvas.getBoundingClientRect();
            pointerRef.current = {x: event.clientX - left, y: event.clientY - top};
        };

        const drawGrid = () => {
            frame = requestAnimationFrame(drawGrid);
            if (width === 0) return;

            const pointer = pointerRef.current;
            ctx.clearRect(0, 0, width, height);

            const rows = Math.ceil(height / cellSize) + 1;
            const cols = Math.ceil(width / cellSize) + 1;

            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5;

            // Each point is pushed away from the pointer, more strongly the closer it is.
            const points: GridPoint[][] = [];
            for (let y = 0; y < rows; y++) {
                const row: GridPoint[] = [];
                for (let x = 0; x < cols; x++) {
                    const baseX = x * cellSize;
                    const baseY = y * cellSize;
                    const dx = baseX - pointer.x;
                    const dy = baseY - pointer.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    let distortionX = 0;
                    let distortionY = 0;
                    if (distance < radius) {
                        const force = (1 - distance / radius) * strength;
                        distortionX = (dx / distance) * force || 0;
                        distortionY = (dy / distance) * force || 0;
                    }

                    row.push({x: baseX + distortionX, y: baseY + distortionY});
                }
                points.push(row);
            }

            for (let y = 0; y < rows; y++) {
                ctx.beginPath();
                for (let x = 0; x < cols; x++) {
                    const point = points[y][x];
                    if (x === 0) ctx.moveTo(point.x, point.y);
                    else ctx.lineTo(point.x, point.y);
                }
                ctx.stroke();
            }

            for (let x = 0; x < cols; x++) {
                ctx.beginPath();
                for (let y = 0; y < rows; y++) {
                    const point = points[y][x];
                    if (y === 0) ctx.moveTo(point.x, point.y);
                    else ctx.lineTo(point.x, point.y);
                }
                ctx.stroke();
            }

            ctx.fillStyle = dotColor;
            for (const row of points) {
                for (const point of row) {
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            const gradient = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 30);
            gradient.addColorStop(0, `rgba(${glowColor}, 0.8)`);
            gradient.addColorStop(1, `rgba(${glowColor}, 0)`);
            ctx.beginPath();
            ctx.arc(pointer.x, pointer.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        };

        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(wrapper);
        window.addEventListener("mousemove", handleMouseMove);
        drawGrid();

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(frame);
        };
    }, [cellSize, radius, strength, lineColor, dotColor, glowColor]);

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

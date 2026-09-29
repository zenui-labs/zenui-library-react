import {useEffect, useRef} from "react";
import type {ReactNode} from "react";

export interface MagneticFieldProps {
    /** Content shown above the field, such as a hero message. */
    children?: ReactNode;
    /** Distance between field lines in px. Defaults to 40 on sections narrower than 768px and 30 otherwise. */
    spacing?: number;
    /** Distance in px within which lines stay at full length and brightness. Farther lines fade and shrink. */
    fieldStrength?: number;
    /** Half the length of a line at full strength, in px. */
    lineLength?: number;
    className?: string;
}

// Short colored lines point away from the pointer like iron filings around a magnet.
export const MagneticField = ({
    children,
    spacing,
    fieldStrength = 150,
    lineLength = 15,
    className = "",
}: MagneticFieldProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Kept in a ref so pointer moves do not re-render the component.
    const pointerRef = useRef({x: 0, y: 0});

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
            const rect = wrapper.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            width = rect.width;
            height = rect.height;
        };

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            pointerRef.current = {x: event.clientX - rect.left, y: event.clientY - rect.top};
        };

        const draw = () => {
            frame = requestAnimationFrame(draw);
            if (!width || !height) return;

            const pointer = pointerRef.current;
            ctx.clearRect(0, 0, width, height);

            const step = spacing ?? (width < 768 ? 40 : 30);

            for (let x = 0; x < width; x += step) {
                for (let y = 0; y < height; y += step) {
                    const dx = x - pointer.x;
                    const dy = y - pointer.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 30) continue;

                    // A slight wave keeps the field from looking perfectly radial.
                    let angle = Math.atan2(dy, dx);
                    angle += Math.sin(x / 100) * 0.2 + Math.cos(y / 100) * 0.2;

                    const strength = Math.min(1, fieldStrength / distance);
                    const length = lineLength * strength;

                    ctx.beginPath();
                    ctx.moveTo(x - Math.cos(angle) * length, y - Math.sin(angle) * length);
                    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);

                    const hue = ((angle * 180) / Math.PI + 180) % 360;
                    const opacity = 0.2 + strength * 0.8;
                    ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${opacity})`;
                    ctx.lineWidth = strength * 2;
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.arc(x, y, 1, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${opacity * 0.7})`;
                    ctx.fill();
                }
            }

            const gradient = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 50);
            gradient.addColorStop(0, "rgba(33, 33, 33, 0.2)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");

            ctx.beginPath();
            ctx.arc(pointer.x, pointer.y, 50, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        };

        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(wrapper);
        window.addEventListener("mousemove", handleMouseMove);
        draw();

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(frame);
        };
    }, [spacing, fieldStrength, lineLength]);

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

import {useEffect, useRef} from "react";
import type {ReactNode} from "react";

interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
    color: string;
}

export interface StarfieldWarpProps {
    /** Content shown above the stars, such as a hero message. */
    children?: ReactNode;
    /** Number of stars. Defaults to 300 on sections narrower than 768px and 500 otherwise. */
    starCount?: number;
    /** Top warp speed, reached when the pointer is at a corner of the section. */
    maxSpeed?: number;
    /** Lowest star hue in degrees. Stars get a random hue from here up to 60 degrees higher. */
    hue?: number;
    /** Comma separated red, green and blue values for the glow in the center, for example "100, 200, 255". */
    glowColor?: string;
    /** Canvas color painted over each frame. Its alpha sets how long the star trails stay visible. */
    trailColor?: string;
    className?: string;
}

// Stars fly toward the viewer. The farther the pointer is from the center, the faster they go.
export const StarfieldWarp = ({
    children,
    starCount,
    maxSpeed = 15,
    hue = 200,
    glowColor = "100, 200, 255",
    trailColor = "rgba(10, 10, 20, 0.2)",
    className = "",
}: StarfieldWarpProps) => {
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
        let warpSpeed = 0;
        let stars: Star[] = [];

        const createStars = () => {
            const count = starCount ?? (width < 768 ? 300 : 500);
            stars = Array.from({length: count}, () => ({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * 1000,
                size: Math.random() * 2 + 1,
                color: `hsl(${Math.random() * 60 + hue}, 100%, ${Math.random() * 30 + 70}%)`,
            }));
            warpSpeed = 0;
        };

        const resize = () => {
            const rect = wrapper.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            width = rect.width;
            height = rect.height;
            createStars();
        };

        const handleMouseMove = (event: MouseEvent) => {
            const rect = wrapper.getBoundingClientRect();
            pointerRef.current = {x: event.clientX - rect.left, y: event.clientY - rect.top};
        };

        const animate = () => {
            frame = requestAnimationFrame(animate);
            if (!width || !height) return;

            ctx.fillStyle = trailColor;
            ctx.fillRect(0, 0, width, height);

            const pointer = pointerRef.current;
            const centerX = width / 2;
            const centerY = height / 2;

            const dx = pointer.x - centerX;
            const dy = pointer.y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
            const targetSpeed = Math.min(1, distance / maxDistance) * maxSpeed;

            // Eases toward the target so speed changes feel smooth.
            warpSpeed += (targetSpeed - warpSpeed) * 0.05;

            for (const star of stars) {
                star.z -= warpSpeed;

                if (star.z <= 0 || star.z > 1000) {
                    star.x = Math.random() * width - centerX;
                    star.y = Math.random() * height - centerY;
                    star.z = 1000;
                    star.size = Math.random() * 2 + 1;
                }

                const projectedX = (star.x / star.z) * 500 + centerX;
                const projectedY = (star.y / star.z) * 500 + centerY;
                const projectedSize = star.size * (1 - star.z / 1000);

                if (projectedX < -10 || projectedX > width + 10 || projectedY < -10 || projectedY > height + 10) continue;

                // Close stars become streaks at high speed.
                if (warpSpeed > 5 && star.z < 500) {
                    const prevX = (star.x / (star.z + warpSpeed * 2)) * 500 + centerX;
                    const prevY = (star.y / (star.z + warpSpeed * 2)) * 500 + centerY;

                    ctx.beginPath();
                    ctx.moveTo(projectedX, projectedY);
                    ctx.lineTo(prevX, prevY);
                    ctx.strokeStyle = star.color;
                    ctx.lineWidth = projectedSize;
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.arc(projectedX, projectedY, projectedSize, 0, Math.PI * 2);
                    ctx.fillStyle = star.color;
                    ctx.fill();
                }
            }

            if (warpSpeed > 1) {
                const glowRadius = 100 * warpSpeed;
                const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowRadius);
                gradient.addColorStop(0, `rgba(${glowColor}, ${warpSpeed * 0.05})`);
                gradient.addColorStop(1, `rgba(${glowColor}, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
                ctx.fill();
            }
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
    }, [starCount, maxSpeed, hue, glowColor, trailColor]);

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

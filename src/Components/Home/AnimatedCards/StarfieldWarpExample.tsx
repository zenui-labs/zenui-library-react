import {useEffect, useRef} from "react";
import {useReducedMotion} from "framer-motion";

interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
    color: string;
}

const DEPTH = 1000;
const IDLE_SPEED = 1.5;
const MAX_SPEED = 15;

const createStar = (width: number, height: number, z = Math.random() * DEPTH): Star => ({
    x: Math.random() * width - width / 2,
    y: Math.random() * height - height / 2,
    z,
    size: Math.random() * 2 + 1,
    color: `hsl(${Math.random() * 60 + 200}, 100%, ${Math.random() * 30 + 70}%)`,
});

/**
 * Landing page version of the starfield warp. It fills its positioned parent, follows the parent's size with a
 * ResizeObserver, and only animates while on screen. Moving the pointer away from the center speeds up the warp.
 */
const StarfieldWarpExample = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!wrapper || !canvas || !ctx) return;

        let width = 0;
        let height = 0;
        let stars: Star[] = [];
        let speed = IDLE_SPEED;
        let target = IDLE_SPEED;
        let frame = 0;
        let visible = false;

        const resize = () => {
            // Layout size, not getBoundingClientRect: the card may be mid scale-in animation when this runs.
            if (!wrapper.clientWidth || !wrapper.clientHeight) return;
            width = wrapper.clientWidth;
            height = wrapper.clientHeight;
            const ratio = window.devicePixelRatio || 1;
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
            ctx.fillStyle = "rgb(10, 10, 20)";
            ctx.fillRect(0, 0, width, height);
            stars = Array.from({length: width < 640 ? 260 : 420}, () => createStar(width, height));
        };

        const draw = () => {
            ctx.fillStyle = "rgba(10, 10, 20, 0.22)";
            ctx.fillRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;
            speed += (target - speed) * 0.05;

            for (const star of stars) {
                star.z -= speed;
                if (star.z <= 0) Object.assign(star, createStar(width, height, DEPTH));

                const px = (star.x / star.z) * 500 + cx;
                const py = (star.y / star.z) * 500 + cy;
                if (px < -10 || px > width + 10 || py < -10 || py > height + 10) continue;
                const size = star.size * (1 - star.z / DEPTH);

                if (speed > 5 && star.z < 500) {
                    const trail = star.z + speed * 2;
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo((star.x / trail) * 500 + cx, (star.y / trail) * 500 + cy);
                    ctx.strokeStyle = star.color;
                    ctx.lineWidth = size;
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.arc(px, py, size, 0, Math.PI * 2);
                    ctx.fillStyle = star.color;
                    ctx.fill();
                }
            }

            if (speed > 1) {
                const radius = 100 * speed;
                const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
                glow.addColorStop(0, `rgba(100, 200, 255, ${speed * 0.04})`);
                glow.addColorStop(1, "rgba(100, 200, 255, 0)");
                ctx.fillStyle = glow;
                ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
            }
        };

        const loop = () => {
            draw();
            frame = requestAnimationFrame(loop);
        };

        const start = () => {
            if (!frame && visible && !reduceMotion) frame = requestAnimationFrame(loop);
        };
        const stop = () => {
            cancelAnimationFrame(frame);
            frame = 0;
        };

        const onPointerMove = (event: PointerEvent) => {
            const rect = wrapper.getBoundingClientRect();
            const dx = event.clientX - rect.left - rect.width / 2;
            const dy = event.clientY - rect.top - rect.height / 2;
            const reach = Math.hypot(rect.width / 2, rect.height / 2);
            target = Math.max(IDLE_SPEED, Math.min(1, Math.hypot(dx, dy) / reach) * MAX_SPEED);
        };
        const onPointerLeave = () => {
            target = IDLE_SPEED;
        };

        const resizeObserver = new ResizeObserver(() => {
            resize();
            if (reduceMotion) draw();
        });
        const intersectionObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) start();
            else stop();
        });

        resize();
        if (reduceMotion) draw();
        resizeObserver.observe(wrapper);
        intersectionObserver.observe(wrapper);
        wrapper.addEventListener("pointermove", onPointerMove);
        wrapper.addEventListener("pointerleave", onPointerLeave);

        return () => {
            stop();
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            wrapper.removeEventListener("pointermove", onPointerMove);
            wrapper.removeEventListener("pointerleave", onPointerLeave);
        };
    }, [reduceMotion]);

    return (
        <div ref={wrapperRef} className="absolute inset-0 overflow-hidden bg-[#0a0a14]">
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full"/>
            <div className="pointer-events-none relative flex h-full flex-col items-center justify-center px-6 text-center">
                <p className="text-3xl font-semibold tracking-tight text-white 640px:text-4xl">Starfield warp</p>
                <p className="mt-2 text-sm text-white/65">Move your pointer away from the center to go faster</p>
            </div>
        </div>
    );
};

export default StarfieldWarpExample;

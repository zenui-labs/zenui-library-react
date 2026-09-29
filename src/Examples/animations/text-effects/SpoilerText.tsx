import {useEffect, useRef, useState, type ReactNode} from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    size: number;
    opacity: number;
}

// The reveal uses a clip-path wave, which is easier to write as CSS keyframes than as motion values.
const revealStyles = `
@keyframes spoiler-text-wave-reveal {
    0% {
        opacity: 0;
        clip-path: polygon(0% 50%, 10% 45%, 20% 50%, 30% 55%, 40% 50%, 50% 45%, 60% 50%, 70% 55%, 80% 50%, 90% 45%, 100% 50%, 100% 50%, 90% 45%, 80% 50%, 70% 55%, 60% 50%, 50% 45%, 40% 50%, 30% 55%, 20% 50%, 10% 45%, 0% 50%);
    }
    50% {
        opacity: 0.7;
        clip-path: polygon(0% 0%, 10% 5%, 20% 0%, 30% -5%, 40% 0%, 50% 5%, 60% 0%, 70% -5%, 80% 0%, 90% 5%, 100% 0%, 100% 100%, 90% 95%, 80% 100%, 70% 105%, 60% 100%, 50% 95%, 40% 100%, 30% 105%, 20% 100%, 10% 95%, 0% 100%);
    }
    100% {
        opacity: 1;
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    }
}
.spoiler-text-reveal {
    animation: spoiler-text-wave-reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
`;

export interface SpoilerTextProps {
    /** The hidden words. */
    children: ReactNode;
    /** Controlled state. Leave it out to let the component track the reveal itself. */
    revealed?: boolean;
    defaultRevealed?: boolean;
    /** Called with `true` when the reader clicks the hidden words. */
    onRevealedChange?: (revealed: boolean) => void;
    /** Particle color as red, green and blue values from 0 to 255. */
    particleColor?: [number, number, number];
    /** Square pixels of text per particle. Lower values give a denser cover. */
    pixelsPerParticle?: number;
    /** Accessible name of the hidden words before they are revealed. */
    revealLabel?: string;
    className?: string;
}

// Covers inline words with drifting particles. A click scatters the particles and waves the words in.
export const SpoilerText = ({
    children,
    revealed,
    defaultRevealed = false,
    onRevealedChange,
    particleColor = [107, 114, 128],
    pixelsPerParticle = 50,
    revealLabel = "Reveal hidden text",
    className = "",
}: SpoilerTextProps) => {
    const [internalRevealed, setInternalRevealed] = useState(defaultRevealed);
    const isRevealed = revealed ?? internalRevealed;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLButtonElement>(null);
    const animationRef = useRef<number | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const [red, green, blue] = particleColor;

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const rect = containerRef.current.getBoundingClientRect();

        canvas.width = rect.width;
        canvas.height = rect.height;

        const particleCount = Math.floor((rect.width * rect.height) / pixelsPerParticle);
        const initialParticles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
            initialParticles.push({
                x: Math.random() * rect.width,
                y: Math.random() * rect.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                life: 1,
                size: Math.random() * 2.5 + 1,
                opacity: Math.random() * 0.5 + 0.5,
            });
        }

        particlesRef.current = initialParticles;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (isRevealed) {
                // Particles speed up and fade out, then the loop stops.
                particlesRef.current = particlesRef.current
                    .map((p) => ({
                        ...p,
                        x: p.x + p.vx * 4,
                        y: p.y + p.vy * 4,
                        vx: p.vx * 1.05,
                        vy: p.vy * 1.05,
                        life: p.life - 0.02,
                        opacity: p.life,
                    }))
                    .filter((p) => p.life > 0);

                particlesRef.current.forEach((p) => {
                    ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${p.opacity * p.life})`;
                    ctx.fillRect(p.x, p.y, p.size, p.size);
                });

                if (particlesRef.current.length > 0) {
                    animationRef.current = requestAnimationFrame(animate);
                }
            } else {
                // Particles drift and bounce off the edges of the words.
                particlesRef.current.forEach((p) => {
                    p.x += p.vx;
                    p.y += p.vy;

                    if (p.x < 0 || p.x > rect.width) {
                        p.vx *= -1;
                        p.x = Math.max(0, Math.min(rect.width, p.x));
                    }
                    if (p.y < 0 || p.y > rect.height) {
                        p.vy *= -1;
                        p.y = Math.max(0, Math.min(rect.height, p.y));
                    }

                    ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${p.opacity})`;
                    ctx.fillRect(p.x, p.y, p.size, p.size);
                });

                animationRef.current = requestAnimationFrame(animate);
            }
        };

        animate();

        return () => {
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isRevealed, red, green, blue, pixelsPerParticle]);

    const handleReveal = () => {
        if (isRevealed) return;
        setInternalRevealed(true);
        onRevealedChange?.(true);
    };

    return (
        <button
            type="button"
            ref={containerRef}
            onClick={handleReveal}
            aria-label={isRevealed ? undefined : revealLabel}
            className={`relative inline-block cursor-pointer select-none px-1 ${className}`}
            style={{minHeight: "0.9rem"}}
        >
            <style>{revealStyles}</style>
            <span className={`relative z-10 ${isRevealed ? "spoiler-text-reveal" : "opacity-0"}`}>
                {children}
            </span>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-20 pointer-events-none"
                aria-hidden="true"
            />
        </button>
    );
};

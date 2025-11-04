import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';

const SpoilerAnimationCore = forwardRef(({children, onRestart}, ref) => {
    const [isRevealed, setIsRevealed] = useState(false);
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const particlesRef = useRef([]);

    useImperativeHandle(ref, () => ({
        restart: () => {
            setIsRevealed(false);
            if (onRestart) onRestart();
        },
    }));

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();

        canvas.width = rect.width;
        canvas.height = rect.height;

        const particleCount = Math.floor((rect.width * rect.height) / 50);
        const createParticles = () => {
            const particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * rect.width,
                    y: Math.random() * rect.height,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    life: 1,
                    size: Math.random() * 2.5 + 1,
                    opacity: Math.random() * 0.5 + 0.5,
                });
            }
            return particles;
        };

        particlesRef.current = createParticles();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (isRevealed) {
                particlesRef.current = particlesRef.current
                    .map(p => ({
                        ...p,
                        x: p.x + p.vx * 4,
                        y: p.y + p.vy * 4,
                        vx: p.vx * 1.05,
                        vy: p.vy * 1.05,
                        life: p.life - 0.02,
                        opacity: p.life,
                    }))
                    .filter(p => p.life > 0);

                particlesRef.current.forEach(p => {
                    ctx.fillStyle = `rgba(107, 114, 128, ${p.opacity * p.life})`;
                    ctx.fillRect(p.x, p.y, p.size, p.size);
                });

                if (particlesRef.current.length > 0) {
                    animationRef.current = requestAnimationFrame(animate);
                }
            } else {
                particlesRef.current.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > rect.width) p.vx *= -1;
                    if (p.y < 0 || p.y > rect.height) p.vy *= -1;
                    ctx.fillStyle = `rgba(107, 114, 128, ${p.opacity})`;
                    ctx.fillRect(p.x, p.y, p.size, p.size);
                });
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        animate();

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isRevealed]);

    const handleReveal = () => {
        if (!isRevealed) setIsRevealed(true);
    };

    return (
        <span
            ref={containerRef}
            className="relative inline-block cursor-pointer select-none px-1"
            onClick={handleReveal}
            style={{minHeight: '0.9rem'}}
        >
            <span className={`relative z-10 ${isRevealed ? 'animate-wave-reveal' : 'opacity-0'}`}>
                {children}
            </span>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-20 pointer-events-none"
            />
        </span>
    );
});

SpoilerAnimationCore.displayName = 'SpoilerAnimationCore';

export default SpoilerAnimationCore;

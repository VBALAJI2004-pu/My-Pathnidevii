// PetalEffects.jsx — Floating rose petals and particles
import { useEffect, useRef } from 'react';

const PETAL_EMOJI = ['🌸', '🌹', '🍀', '✨', '❤️'];
const PETAL_COUNT = 18;

export default function PetalEffects({ intensity = 1 }) {
  const containerRef = useRef(null);
  const petalsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reduce on low-power devices
    const count = Math.floor(PETAL_COUNT * intensity);
    const petals = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 100;
        font-size: ${10 + Math.random() * 14}px;
        opacity: 0;
        will-change: transform, opacity;
        user-select: none;
        left: ${Math.random() * 100}vw;
        top: ${-20 - Math.random() * 20}px;
      `;
      el.textContent = PETAL_EMOJI[Math.floor(Math.random() * PETAL_EMOJI.length)];
      document.body.appendChild(el);
      petals.push({
        el,
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.8,
        vy: 0.4 + Math.random() * 0.8,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 2,
        opacity: 0.4 + Math.random() * 0.5,
        scale: 0.7 + Math.random() * 0.7,
        delay: Math.random() * 8000,
        born: performance.now() + Math.random() * 8000,
      });
    }

    petalsRef.current = petals;

    function animate(now) {
      for (const p of petals) {
        if (now < p.born) continue;
        p.y += p.vy;
        p.x += p.vx + Math.sin(now / 2000 + p.rot) * 0.3;
        p.rot += p.rotSpeed;

        if (p.y > window.innerHeight + 40) {
          p.y = -30;
          p.x = Math.random() * window.innerWidth;
          p.born = now + Math.random() * 3000;
        }

        p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg) scale(${p.scale})`;
        p.el.style.opacity = p.opacity;
      }
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      petals.forEach(p => p.el.remove());
    };
  }, [intensity]);

  return <div ref={containerRef} aria-hidden="true" />;
}

// Floating heart burst
export function HeartBurst({ x, y, count = 8 }) {
  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (i / count) * 360,
    dist: 40 + Math.random() * 60,
    delay: i * 60,
  }));

  return (
    <div
      style={{ position: 'fixed', left: x, top: y, pointerEvents: 'none', zIndex: 200 }}
      aria-hidden="true"
    >
      {hearts.map(h => (
        <div
          key={h.id}
          style={{
            position: 'absolute',
            fontSize: '16px',
            animation: `heartFloat 1.2s ${h.delay}ms ease-out forwards`,
            transform: `rotate(${h.angle}deg) translateY(-${h.dist}px)`,
            opacity: 0,
          }}
        >
          ❤️
        </div>
      ))}
      <style>{`
        @keyframes heartFloat {
          0% { opacity: 1; transform: rotate(var(--a, 0deg)) translateY(0) scale(0.5); }
          50% { opacity: 1; transform: rotate(var(--a, 0deg)) translateY(-60px) scale(1.2); }
          100% { opacity: 0; transform: rotate(var(--a, 0deg)) translateY(-100px) scale(0.8); }
        }
      `}</style>
    </div>
  );
}

// OpeningScene.jsx — Full-screen cinematic opening, premium & sincere
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opening } from '../content/storyContent';

/* ---- Ambient particle field ---- */
function AmbientParticles() {
  const pts = Array.from({ length: 55 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: 0.8 + Math.random() * 2.2,
    delay: Math.random() * 9,
    dur: 4 + Math.random() * 5,
    op: 0.25 + Math.random() * 0.55,
  }));
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} aria-hidden="true">
      {pts.map(p => (
        <motion.circle key={p.id} cx={`${p.x}%`} cy={`${p.y}%`} r={p.r} fill="#D8B56A"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, p.op, 0] }}
          transition={{ repeat: Infinity, duration: p.dur, delay: p.delay, ease: 'easeInOut' }} />
      ))}
    </svg>
  );
}

/* ---- Soft drifting rose petals ---- */
function RosePetals() {
  const petals = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 14,
    dur: 14 + Math.random() * 10,
    drift: (Math.random() - 0.5) * 100,
    size: 12 + Math.random() * 14,
    sym: i % 3 === 0 ? '🌸' : i % 3 === 1 ? '🌹' : '🌺',
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }} aria-hidden="true">
      {petals.map(p => (
        <motion.div key={p.id}
          style={{ position: 'absolute', left: `${p.x}%`, top: '-40px', fontSize: p.size }}
          animate={{ y: ['0vh', '108vh'], x: [0, p.drift], opacity: [0, 0.5, 0.4, 0] }}
          transition={{ repeat: Infinity, duration: p.dur, delay: p.delay, ease: 'linear' }}>
          {p.sym}
        </motion.div>
      ))}
    </div>
  );
}

/* ---- Cinematic radial light layers ---- */
function LightLayers() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} aria-hidden="true">
      <motion.div style={{
        position: 'absolute', width: '140vw', height: '140vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(109,41,63,0.22) 0%, rgba(216,181,106,0.05) 32%, transparent 65%)',
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      }}
        animate={{ scale: [1, 1.09, 1] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }} />
      {/* Corner vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 88% 88% at 50% 50%, transparent 38%, rgba(0,0,0,0.6) 100%)' }} />
    </div>
  );
}

/* ---- Animated SVG heart ---- */
function GlowHeart() {
  return (
    <motion.div className="opening-heart"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 1.4, ease: [0.34, 1.56, 0.64, 1] }}>
      <svg viewBox="0 0 80 80" width="88" height="88" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <radialGradient id="heartGrad" cx="50%" cy="32%">
            <stop offset="0%" stopColor="#fde0e8" />
            <stop offset="55%" stopColor="#e8a6b7" />
            <stop offset="100%" stopColor="#b5445e" />
          </radialGradient>
          <filter id="heartGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Outer glow shape */}
        <path d="M40 68C40 68 10 50 10 28C10 17 18 10 28 10C33 10 40 14 40 14C40 14 47 10 52 10C62 10 70 17 70 28C70 50 40 68 40 68Z"
          fill="rgba(232,166,183,0.12)" transform="scale(1.18) translate(-5.5,-4)" />
        {/* Main heart */}
        <path d="M40 68C40 68 10 50 10 28C10 17 18 10 28 10C33 10 40 14 40 14C40 14 47 10 52 10C62 10 70 17 70 28C70 50 40 68 40 68Z"
          fill="url(#heartGrad)" filter="url(#heartGlow)" />
        {/* Shine */}
        <ellipse cx="31" cy="24" rx="6.5" ry="4.5" fill="rgba(255,255,255,0.28)" transform="rotate(-22 31 24)" />
      </svg>
    </motion.div>
  );
}

export default function OpeningScene({ onStart }) {
  const [lineIndex, setLineIndex] = useState(-1);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const timers = [];
    opening.lines.forEach((_, i) => {
      timers.push(setTimeout(() => setLineIndex(i), 1600 + i * 2800));
    });
    timers.push(setTimeout(() => setShowBtn(true), 1600 + opening.lines.length * 2800 + 700));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="opening-scene" aria-label="Opening — Shalu, my Monkuu">
      <LightLayers />
      <AmbientParticles />
      <RosePetals />

      {/* Centred content */}
      <div style={{
        position: 'relative', zIndex: 10, maxWidth: 760, width: '100%',
        padding: '0 28px', display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <GlowHeart />

        <motion.h1 className="opening-name"
          initial={{ opacity: 0, y: 28, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.85, ease: [0.4, 0, 0.2, 1] }}>
          {opening.title}
        </motion.h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', alignItems: 'center', minHeight: '200px', width: '100%' }}>
          {opening.lines.map((line, i) => (
            <AnimatePresence key={i}>
              {lineIndex >= i && (
                <motion.p className="opening-line"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}>
                  {line}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>

        <AnimatePresence>
          {showBtn && (
            <motion.div style={{ marginTop: '56px' }}
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}>
              <button className="btn-primary" onClick={onStart} id="start-story-btn">
                {opening.buttonText}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom ornament */}
      <motion.div aria-hidden="true"
        style={{
          position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: '14px',
        }}
        initial={{ opacity: 0 }} animate={{ opacity: 0.22 }} transition={{ delay: 5, duration: 2 }}>
        <span style={{ width: '44px', height: '1px', background: '#D8B56A', display: 'block' }} />
        <span style={{ color: '#D8B56A', fontSize: '10px', letterSpacing: '0.18em', fontFamily: 'Lato, sans-serif', textTransform: 'uppercase' }}>Shalu · My Monkuu</span>
        <span style={{ width: '44px', height: '1px', background: '#D8B56A', display: 'block' }} />
      </motion.div>
    </div>
  );
}

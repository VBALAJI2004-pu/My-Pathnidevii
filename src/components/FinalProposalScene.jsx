// FinalProposalScene.jsx — Full-screen cinematic grand finale, big teddies
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { finalProposal } from '../content/storyContent';
import { HuggingTeddies, OlderTeddies } from './TeddyCharacters';

/* ---- Full-screen garden background with butterflies, fireflies, petals ---- */
function GardenBackground({ active }) {
  return (
    <div className="final-garden-bg" aria-hidden="true">
      {/* Layered colour atmosphere */}
      <div style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 60% at 32% 58%, rgba(109,41,63,0.38) 0%, transparent 62%)' }} />
      <div style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 55% 50% at 75% 25%, rgba(216,181,106,0.08) 0%, transparent 62%)' }} />

      {/* Floating rose petals — only when garden is revealed */}
      {active && Array.from({ length: 20 }, (_, i) => (
        <motion.div key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`, top: '-35px',
            fontSize: `${11 + Math.random() * 15}px`,
          }}
          animate={{ y: ['0vh', '108vh'], x: [(Math.random() - 0.5) * 70, (Math.random() - 0.5) * 110], rotate: [0, 720], opacity: [0, 0.65, 0.5, 0] }}
          transition={{ duration: 7 + Math.random() * 8, delay: Math.random() * 4, repeat: Infinity, ease: 'linear' }}>
          {['🌹', '🌸', '🌺'][Math.floor(Math.random() * 3)]}
        </motion.div>
      ))}

      {/* Butterflies */}
      {active && Array.from({ length: 8 }, (_, i) => (
        <motion.div key={i + 100}
          style={{ position: 'absolute', left: `${6 + i * 12}%`, top: `${14 + (i % 3) * 18}%`, fontSize: '22px' }}
          animate={{ x: [0, 36, -18, 0], y: [0, -26, 12, 0], opacity: [0.35, 0.72, 0.35] }}
          transition={{ duration: 5.5 + i * 0.9, repeat: Infinity, delay: i * 0.65 }}>
          🦋
        </motion.div>
      ))}

      {/* Fireflies */}
      {Array.from({ length: 16 }, (_, i) => (
        <motion.div key={i + 200}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            width: '5px', height: '5px', borderRadius: '50%',
            background: '#D8B56A', boxShadow: '0 0 10px 4px rgba(216,181,106,0.7)',
          }}
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{ repeat: Infinity, duration: 2.8 + Math.random() * 2.2, delay: Math.random() * 5 }} />
      ))}
    </div>
  );
}

/* ---- Heart glow on YES ---- */
function HeartGlow({ show }) {
  if (!show) return null;
  return (
    <motion.div aria-hidden="true"
      style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 1 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 0.7, 0.35], scale: [0, 1.7, 1.25] }}
      transition={{ duration: 2.4, ease: 'easeOut' }}>
      <svg viewBox="0 0 500 500" width="520" height="520" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="hglow">
            <stop offset="0%" stopColor="#D8B56A" stopOpacity="0.6" />
            <stop offset="55%" stopColor="#E8A6B7" stopOpacity="0.18" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <path d="M250 430C250 430 50 290 50 160C50 90 100 50 162 50C195 50 225 70 250 96C275 70 305 50 338 50C400 50 450 90 450 160C450 290 250 430 250 430Z"
          fill="url(#hglow)" />
      </svg>
    </motion.div>
  );
}

/* ---- Heart explosion ---- */
function HeartExplosion() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 5 }}>
      {Array.from({ length: 28 }, (_, i) => (
        <motion.div key={i}
          style={{
            position: 'absolute',
            left: `${8 + Math.random() * 84}%`,
            top: `${8 + Math.random() * 84}%`,
            fontSize: `${14 + Math.random() * 26}px`,
          }}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0.4], y: -120 - Math.random() * 100 }}
          transition={{ duration: 2.2, delay: Math.random() * 1.6, ease: 'easeOut' }}>
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

export default function FinalProposalScene({ onRestart }) {
  const [phase, setPhase] = useState(0);
  const [showGarden, setShowGarden] = useState(false);
  const [showHeartGlow, setShowHeartGlow] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  const advance = () => setPhase(p => p + 1);

  const handleYes = () => {
    setPhase(4);
    setShowHeartGlow(true);
    setShowExplosion(true);
    setTimeout(() => setShowExplosion(false), 3200);
  };

  return (
    <div className="final-scene" aria-label="Final proposal scene">
      <GardenBackground active={showGarden} />
      <HeartGlow show={showHeartGlow} />
      {showExplosion && <HeartExplosion />}

      {/* Cinematic fade-in overlay */}
      <motion.div aria-hidden="true"
        style={{ position: 'absolute', inset: 0, background: '#0a0305', pointerEvents: 'none', zIndex: 2 }}
        animate={{ opacity: phase === 0 ? 0.45 : 0 }}
        transition={{ duration: 2.2 }} />

      <div style={{
        position: 'relative', zIndex: 10, maxWidth: 760, width: '100%',
        padding: '0 28px', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '18px', textAlign: 'center',
      }}>
        <motion.p className="section-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}>
          In Every Lifetime
        </motion.p>

        {/* PHASE 0 + 1 — Opening declaration */}
        <AnimatePresence>
          {phase >= 0 && (
            <motion.div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', width: '100%' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3 }}>
              <motion.p className="final-line1"
                initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1.1 }}>
                {finalProposal.line1}
              </motion.p>
              <motion.p className="final-line2"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 1 }}>
                {finalProposal.line2}
              </motion.p>
              {phase === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
                  <button className="next-btn" onClick={advance} id="final-next-1">There's more… →</button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHASE 1 — Personal note */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
              <motion.p className="final-personal">{finalProposal.personal}</motion.p>
              {phase === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                  <button className="next-btn" onClick={() => { advance(); setShowGarden(true); }} id="final-next-2">
                    And now… →
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHASE 2 — Big teddies + hero text */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}
              initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.3 }}>
              <motion.div
                initial={{ scale: 0.82, opacity: 0 }}
                animate={{ scale: phase === 4 ? 1.18 : 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 85 }}>
                <HuggingTeddies scale={1.6} />
              </motion.div>
              <motion.h1 className="final-hero"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1.3 }}>
                {finalProposal.heroText}
              </motion.h1>
              {phase === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                  <button className="next-btn" onClick={advance} id="final-next-3">One last thing… →</button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHASE 3 — Proposal + YES button */}
        <AnimatePresence>
          {phase >= 3 && phase < 4 && (
            <motion.div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', width: '100%' }}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
              <motion.p className="final-proposal-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                {finalProposal.proposalText}
              </motion.p>
              <motion.div
                initial={{ scale: 0.82, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 160 }}>
                <button className="btn-yes" onClick={handleYes} id="final-yes-btn"
                  style={{ fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', padding: '24px 64px' }}>
                  {finalProposal.yesButton}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHASE 4 — After YES */}
        <AnimatePresence>
          {phase === 4 && (
            <motion.div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '22px', width: '100%' }}
              initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.3 }}>
              <motion.p className="final-after-yes"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1.1 }}>
                {finalProposal.afterYes}
              </motion.p>
              <motion.p className="final-declaration"
                initial={{ opacity: 0, letterSpacing: '0.04em' }}
                animate={{ opacity: 1, letterSpacing: '0.16em' }}
                transition={{ delay: 1.4, duration: 1.6 }}>
                {finalProposal.declaration}
              </motion.p>
              {/* Ornament */}
              <motion.div className="ornament-divider" initial={{ opacity: 0 }} animate={{ opacity: 0.38 }} transition={{ delay: 2.6 }} aria-hidden="true">
                ❤️
              </motion.div>
              {/* Replay */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.4 }}>
                <button className="replay-btn" onClick={onRestart} id="replay-btn">
                  ↺ Replay our story from the beginning
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

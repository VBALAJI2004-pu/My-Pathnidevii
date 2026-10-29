// StorybookScene.jsx — Full-screen, bigger teddies, cinematic 5-stage animation
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storybook } from '../content/storyContent';
import { BoyTeddy, GirlTeddy, HuggingTeddies } from './TeddyCharacters';

const STAGES = [
  { boyX: -160, girlX: 160, showHug: false, boyExpr: 'default', girlExpr: 'default', boyScale: 1, girlScale: 1 },
  { boyX: -110, girlX: 110, showHug: false, boyExpr: 'happy',   girlExpr: 'happy',   boyScale: 1.05, girlScale: 1.05 },
  { boyX: -60,  girlX: 60,  showHug: false, boyExpr: 'love',    girlExpr: 'love',    boyScale: 1.1,  girlScale: 1.1 },
  { boyX: -20,  girlX: 20,  showHug: false, boyExpr: 'love',    girlExpr: 'love',    boyScale: 1.15, girlScale: 1.15 },
  { boyX: 0,    girlX: 0,   showHug: true,  boyExpr: 'love',    girlExpr: 'love',    boyScale: 1.2,  girlScale: 1.2 },
];

function LoveLightBeam({ visible }) {
  return (
    <motion.div aria-hidden="true"
      style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '380px', height: '160px',
        background: 'radial-gradient(ellipse at center, rgba(216,181,106,0.22) 0%, transparent 72%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.4 }} />
  );
}

export default function StorybookScene({ onNext }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(-1);
  const [showFinal, setShowFinal] = useState(false);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    const timers = [];
    STAGES.forEach((_, i) => timers.push(setTimeout(() => setStageIndex(i), i * 2400)));
    storybook.lines.forEach((_, i) => timers.push(setTimeout(() => setLineIndex(i), 800 + i * 2400)));
    const base = 800 + storybook.lines.length * 2400;
    timers.push(setTimeout(() => setShowFinal(true), base + 700));
    timers.push(setTimeout(() => setShowNext(true), base + 2200));
    return () => timers.forEach(clearTimeout);
  }, []);

  const stage = STAGES[Math.min(stageIndex, STAGES.length - 1)];

  return (
    <div className="storybook-scene" aria-label="The story of us">
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 55% at 50% 55%, rgba(109,41,63,0.25) 0%, transparent 65%)',
      }} />

      <motion.p className="section-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
        style={{ position: 'relative', zIndex: 5 }}>
        The Story of Us
      </motion.p>

      {/* Teddy Stage — large prominent display */}
      <div className="teddy-stage" style={{ position: 'relative', zIndex: 5, marginBottom: '12px' }}>
        <LoveLightBeam visible={stageIndex >= 2} />

        <AnimatePresence mode="wait">
          {stage.showHug ? (
            <motion.div key="hug"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: 'spring', stiffness: 90 }}
              style={{ zIndex: 3 }}>
              <HuggingTeddies scale={1.55} />
            </motion.div>
          ) : (
            <motion.div key="duo" style={{ position: 'relative', width: '100%', height: '100%', zIndex: 3 }}>
              {/* Boy teddy */}
              <motion.div style={{ position: 'absolute', bottom: 0, left: '50%' }}
                animate={{ x: stage.boyX, scale: stage.boyScale, rotate: stageIndex >= 3 ? -5 : 0 }}
                transition={{ duration: 1.3, type: 'spring', stiffness: 70, damping: 18 }}>
                <BoyTeddy expression={stage.boyExpr} holding={stageIndex >= 2 ? 'heart' : undefined} scale={1.55} />
              </motion.div>
              {/* Girl teddy */}
              <motion.div style={{ position: 'absolute', bottom: 0, left: '50%' }}
                animate={{ x: stage.girlX, scale: stage.girlScale, rotate: stageIndex >= 3 ? 5 : 0 }}
                transition={{ duration: 1.3, type: 'spring', stiffness: 70, damping: 18 }}>
                <GirlTeddy expression={stage.girlExpr} scale={1.55} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating hearts when close */}
        {stageIndex >= 3 && !stage.showHug && (
          <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', pointerEvents: 'none', zIndex: 4 }}>
            {[0, 1, 2].map(i => (
              <motion.div key={i} style={{ position: 'absolute', left: (i - 1) * 34, fontSize: 16 + i * 5 }}
                animate={{ y: [0, -60 - i * 14], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2.4, delay: i * 0.55 }}>
                ❤️
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Story text */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'center',
        minHeight: '230px', padding: '0 24px', maxWidth: 720, width: '100%',
        position: 'relative', zIndex: 5,
      }}>
        {storybook.lines.map((line, i) => (
          <AnimatePresence key={i}>
            {lineIndex >= i && (
              <motion.p className="story-text"
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}>
                {line}
              </motion.p>
            )}
          </AnimatePresence>
        ))}

        <AnimatePresence>
          {showFinal && (
            <motion.p className="story-final-line"
              style={{ marginTop: '12px' }}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}>
              {storybook.finalLine}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showNext && (
          <motion.div style={{ marginTop: '36px', position: 'relative', zIndex: 5 }}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}>
            <button className="btn-primary" onClick={onNext} id="storybook-next-btn">
              A question from my heart ❤️
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

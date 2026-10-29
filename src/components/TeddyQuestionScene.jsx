// TeddyQuestionScene.jsx — Full-screen, big teddies, YES fixed / NO dodges, no skip
import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { teddyQuestion } from '../content/storyContent';
import { BoyTeddy, GirlTeddy, HuggingTeddies } from './TeddyCharacters';

// Predefined dodge positions relative to initial NO anchor
const DODGE_POSITIONS = [
  { x: 50,  y: -90  },
  { x: 120, y:  28  },
  { x: 60,  y:  80  },
  { x: -30, y: -100 },
  { x: 100, y: -55  },
  { x: 155, y:  16  },
  { x: 40,  y:  100 },
  { x: -70, y:  60  },
  { x: 130, y: -90  },
  { x: 70,  y: -110 },
];

function RisingHearts() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 4 }}>
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div key={i}
          style={{
            position: 'absolute',
            left: `${28 + Math.random() * 44}%`,
            bottom: '35%',
            fontSize: `${16 + Math.random() * 20}px`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -(220 + Math.random() * 160), opacity: [0, 0.9, 0], x: (Math.random() - 0.5) * 70 }}
          transition={{ duration: 2.8 + Math.random() * 1.5, delay: Math.random() * 1.8, repeat: Infinity }}>
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

function SparkBurst() {
  const sparks = Array.from({ length: 22 }, (_, i) => {
    const angle = (i / 22) * Math.PI * 2;
    const d = 80 + Math.random() * 100;
    return { id: i, tx: Math.cos(angle) * d, ty: Math.sin(angle) * d, c: ['#D8B56A','#E8A6B7','#f9d0dc','#fff'][i % 4] };
  });
  return (
    <div aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', pointerEvents: 'none', zIndex: 20 }}>
      {sparks.map(s => (
        <motion.div key={s.id}
          style={{
            position: 'absolute', width: 8, height: 8, borderRadius: '50%',
            background: s.c, marginLeft: -4, marginTop: -4, boxShadow: `0 0 8px ${s.c}`,
          }}
          animate={{ x: s.tx, y: s.ty, opacity: [1, 0], scale: [1, 0] }}
          transition={{ duration: 1, ease: 'easeOut' }} />
      ))}
    </div>
  );
}

export default function TeddyQuestionScene({ onNext }) {
  const [answered, setAnswered] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [dodgeIndex, setDodgeIndex] = useState(0);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [isDodging, setIsDodging] = useState(false);
  const [reactionText, setReactionText] = useState('');
  const [showSpark, setShowSpark] = useState(false);
  const noBtnRef = useRef(null);
  const lastDodge = useRef(0);

  const triggerDodge = useCallback(() => {
    const now = Date.now();
    if (now - lastDodge.current < 280) return;
    lastDodge.current = now;
    const nextIdx = (dodgeIndex + 1) % DODGE_POSITIONS.length;
    setDodgeIndex(nextIdx);
    setNoOffset(DODGE_POSITIONS[nextIdx]);
    setIsDodging(true);
    setNoAttempts(prev => {
      const n = prev + 1;
      setReactionText(teddyQuestion.noReactions[Math.min(n - 1, teddyQuestion.noReactions.length - 1)]);
      return n;
    });
    setTimeout(() => setIsDodging(false), 380);
  }, [dodgeIndex]);

  const handlePointerMove = useCallback((e) => {
    if (answered || isDodging) return;
    const btn = noBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    if (Math.hypot(e.clientX - cx, e.clientY - cy) < 100) triggerDodge();
  }, [answered, isDodging, triggerDodge]);

  const handleTouchMove = useCallback((e) => {
    if (answered || isDodging) return;
    const btn = noBtnRef.current;
    if (!btn) return;
    const t = e.touches[0];
    if (!t) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    if (Math.hypot(t.clientX - cx, t.clientY - cy) < 120) triggerDodge();
  }, [answered, isDodging, triggerDodge]);

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handlePointerMove, handleTouchMove]);

  const handleYes = () => {
    setAnswered(true);
    setShowSpark(true);
    setTimeout(() => setShowSpark(false), 1400);
    setTimeout(() => onNext(), 5500);
  };

  return (
    <div className="teddy-question-scene" aria-label="Teddy question scene">
      {/* Warm background glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 65% 55% at 50% 44%, rgba(109,41,63,0.28) 0%, transparent 65%)',
      }} />

      {answered && <RisingHearts />}
      {showSpark && <SparkBurst />}

      <motion.p className="section-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
        style={{ position: 'relative', zIndex: 5 }}>
        A Question from My Heart
      </motion.p>

      <AnimatePresence mode="wait">
        {!answered ? (
          /* ---- Question state ---- */
          <motion.div key="q"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: '24px', zIndex: 5, position: 'relative', width: '100%', padding: '0 20px',
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.96 }}>

            {/* Big teddy duo */}
            <div className="teddy-duo-stage">
              <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.25, type: 'spring', stiffness: 70 }}>
                <BoyTeddy expression="shy" holding="heart" scale={1.65} />
              </motion.div>
              <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.55, type: 'spring', stiffness: 70 }}>
                <GirlTeddy expression="happy" scale={1.65} />
              </motion.div>
            </div>

            {/* Question */}
            <motion.h2 className="question-text"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}>
              {teddyQuestion.question}
            </motion.h2>

            {/* Reaction */}
            <AnimatePresence mode="wait">
              {reactionText ? (
                <motion.p key={reactionText} className="reaction-text"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }} role="status" aria-live="polite">
                  {reactionText}
                </motion.p>
              ) : <div style={{ height: '2.2em' }} />}
            </AnimatePresence>

            {/* Button arena — YES left anchor, NO right dodger */}
            <motion.div className="button-arena"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9 }}>

              {/* YES — never moves */}
              <div className="yes-anchor">
                <button className="btn-yes" onClick={handleYes} id="yes-btn" aria-label="Yes I love you">
                  {teddyQuestion.yesText}
                </button>
              </div>

              {/* NO — dodges with spring physics */}
              <motion.div ref={noBtnRef}
                className="no-floater"
                animate={{ x: `calc(120px + ${noOffset.x}px)`, y: `calc(-50% + ${noOffset.y}px)` }}
                initial={{ x: 'calc(120px)', y: '-50%' }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                <button className="btn-no"
                  onMouseEnter={triggerDodge}
                  onTouchStart={(e) => { e.preventDefault(); triggerDodge(); }}
                  onClick={(e) => { e.preventDefault(); triggerDodge(); }}
                  id="no-btn" aria-label="No (tries to dodge!)" tabIndex={0}>
                  {teddyQuestion.noText}
                </button>
              </motion.div>
            </motion.div>

            {/* Accessible keyboard shortcut — hidden */}
            <span className="sr-only">
              <button onClick={handleYes} tabIndex={0} id="accessible-yes-btn">Continue the story</button>
            </span>
          </motion.div>
        ) : (
          /* ---- YES answered celebration ---- */
          <motion.div key="yes"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: '24px', zIndex: 5, position: 'relative', padding: '0 28px',
            }}
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1 }}>

            <motion.div initial={{ scale: 0.82, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, type: 'spring', stiffness: 90 }}>
              <HuggingTeddies scale={1.65} />
            </motion.div>

            <motion.p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              color: '#F4D9E1', textAlign: 'center', fontStyle: 'italic',
              maxWidth: '540px', lineHeight: 1.9, fontWeight: 300,
            }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}>
              {teddyQuestion.afterYes}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
